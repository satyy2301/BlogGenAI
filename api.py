"""
FastAPI backend for Blog Generation System
Provides REST API endpoints for blog generation and management
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
from datetime import datetime
from pathlib import Path
import logging
from src.blog_generator import BlogGenerator

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="Blog Generation API",
    description="API for generating blogs using AI",
    version="1.0.0"
)

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data models
class BlogGenerationRequest(BaseModel):
    topic: str


class BlogResponse(BaseModel):
    id: str
    title: str
    content: str
    createdAt: str
    metadata: dict = {}


# Initialize storage directory
BLOGS_DIR = Path("output")
BLOGS_DIR.mkdir(exist_ok=True)


def _save_blog(blog_data):
    """Save blog to JSON file"""
    blog_file = BLOGS_DIR / f"blog_{blog_data['id']}.json"
    blog_file.write_text(json.dumps(blog_data, indent=2))
    return blog_file


def _load_blog(blog_id):
    """Load blog from JSON file"""
    blog_file = BLOGS_DIR / f"blog_{blog_id}.json"
    if not blog_file.exists():
        raise HTTPException(status_code=404, detail="Blog not found")
    return json.loads(blog_file.read_text())


def _load_all_blogs():
    """Load all blogs from storage"""
    blogs = []
    for blog_file in sorted(BLOGS_DIR.glob("blog_*.json"), reverse=True):
        try:
            blog = json.loads(blog_file.read_text())
            blogs.append(blog)
        except Exception as e:
            logger.error(f"Error loading blog {blog_file}: {e}")
    return blogs


# API Routes

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "ok",
        "message": "Blog Generation API is running",
        "version": "1.0.0"
    }


@app.post("/api/generate")
async def generate_blog(request: BlogGenerationRequest):
    """
    Generate a new blog post
    
    Args:
        request: BlogGenerationRequest with topic
        
    Returns:
        BlogResponse with generated blog content
    """
    try:
        if not request.topic or not request.topic.strip():
            raise HTTPException(status_code=400, detail="Topic cannot be empty")

        logger.info(f"Generating blog for topic: {request.topic}")
        
        # Generate blog using the blog generator
        generator = BlogGenerator()
        blog_result = generator.generate_complete_blog(request.topic)
        
        # Create blog data with metadata
        blog_id = str(datetime.now().timestamp()).replace(".", "_")
        blog_data = {
            "id": blog_id,
            "title": request.topic,
            "content": blog_result['content'],
            "createdAt": datetime.now().isoformat(),
            "metadata": {
                "character_count": len(blog_result['content']),
                "read_time_minutes": max(1, len(blog_result['content']) // 200),
            }
        }
        
        # Save blog to storage
        _save_blog(blog_data)
        logger.info(f"Blog saved with ID: {blog_id}")
        
        return blog_data
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error generating blog: {str(e)}")
        raise HTTPException(
            status_code=500, 
            detail=f"Failed to generate blog: {str(e)}"
        )


@app.get("/api/blogs")
async def get_all_blogs():
    """
    Get all generated blogs
    
    Returns:
        List of BlogResponse objects sorted by creation date (newest first)
    """
    try:
        blogs = _load_all_blogs()
        return blogs
    except Exception as e:
        logger.error(f"Error loading blogs: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to load blogs")


@app.get("/api/blogs/{blog_id}")
async def get_blog(blog_id: str):
    """
    Get a specific blog by ID
    
    Args:
        blog_id: Blog ID
        
    Returns:
        BlogResponse with blog content
    """
    try:
        blog = _load_blog(blog_id)
        return blog
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error loading blog {blog_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to load blog")


@app.delete("/api/blogs/{blog_id}")
async def delete_blog(blog_id: str):
    """
    Delete a blog by ID
    
    Args:
        blog_id: Blog ID
        
    Returns:
        Status message
    """
    try:
        blog_file = BLOGS_DIR / f"blog_{blog_id}.json"
        if not blog_file.exists():
            raise HTTPException(status_code=404, detail="Blog not found")
        
        blog_file.unlink()
        logger.info(f"Blog deleted: {blog_id}")
        
        return {"status": "success", "message": "Blog deleted"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting blog {blog_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete blog")


@app.get("/api/blogs/{blog_id}/export")
async def export_blog(blog_id: str, format: str = "md"):
    """
    Export blog in specified format
    
    Args:
        blog_id: Blog ID
        format: Export format (md, txt, etc.)
        
    Returns:
        Exported blog content
    """
    try:
        blog = _load_blog(blog_id)
        
        if format == "md":
            return {
                "content": blog['content'],
                "filename": f"{blog['title']}.md",
                "format": "markdown"
            }
        elif format == "txt":
            return {
                "content": blog['content'],
                "filename": f"{blog['title']}.txt",
                "format": "text"
            }
        else:
            raise HTTPException(
                status_code=400, 
                detail=f"Unsupported format: {format}"
            )
            
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error exporting blog {blog_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to export blog")


@app.get("/api/stats")
async def get_stats():
    """
    Get blog generation statistics
    
    Returns:
        Stats including total blogs, total characters, etc.
    """
    try:
        blogs = _load_all_blogs()
        
        total_chars = sum(len(blog['content']) for blog in blogs)
        total_topics = len(blogs)
        
        return {
            "total_blogs": total_topics,
            "total_characters": total_chars,
            "average_blog_length": total_chars // max(1, total_topics),
            "last_generated": blogs[0]['createdAt'] if blogs else None
        }
        
    except Exception as e:
        logger.error(f"Error getting stats: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to get stats")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
