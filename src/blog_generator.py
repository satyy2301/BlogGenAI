"""
Main blog generation agent using LangChain and OpenAI.
"""
from typing import Optional, cast
from langchain_openai import ChatOpenAI
from langgraph.prebuilt import create_react_agent
from src.tools import create_langchain_tools, ResearchTool, ContentProcessor
from config.settings import (
    OPENAI_API_KEY, MODEL_NAME, TEMPERATURE, MAX_TOKENS
)
import logging
from datetime import datetime

logger = logging.getLogger(__name__)


class BlogGenerator:
    """
    Agent-based blog generation system using LangChain.
    Utilizes multiple tools for research and content generation.
    """
    
    def __init__(self):
        """Initialize the blog generator with LLM and tools."""
        # ChatOpenAI automatically reads OPENAI_API_KEY from environment
        self.llm = ChatOpenAI(  # type: ignore
            model=MODEL_NAME,
            temperature=TEMPERATURE
        )
        
        self.tools = create_langchain_tools()
        self.agent = self._setup_agent()
    
    def _setup_agent(self):
        """
        Set up the LangChain agent with tools using LangGraph.
        
        Returns:
            Compiled agent runnable
        """
        # Create the ReAct agent using LangGraph
        agent = create_react_agent(self.llm, self.tools)
        
        return agent
    
    def research_topic(self, topic: str) -> str:
        """
        Research a topic using available tools.
        
        Args:
            topic: The blog topic to research
            
        Returns:
            Research findings
        """
        logger.info(f"Starting research on: {topic}")
        
        research_prompt = f"""
        Please research the following topic thoroughly: {topic}
        
        Use the available tools to:
        1. Search Wikipedia for general information
        2. Perform web searches for recent updates and diverse perspectives
        3. Gather comprehensive information that can be used for a blog
        
        Provide a well-organized summary of findings.
        """
        
        try:
            # Use the agent with the proper input format for LangGraph
            result = self.agent.invoke({"messages": [("user", research_prompt)]})
            
            # Extract the final response
            if isinstance(result, dict) and "messages" in result:
                messages = result["messages"]
                if messages and hasattr(messages[-1], 'content'):
                    return messages[-1].content
            
            return str(result)
        except Exception as e:
            logger.error(f"Error during research: {e}")
            # Fallback to direct research without agent
            return ResearchTool.search_all_sources(topic)
    
    def generate_blog(self, topic: str, research_data: Optional[str] = None) -> str:
        """
        Generate a complete blog post on the given topic.
        
        Args:
            topic: The blog topic
            research_data: Optional pre-researched information
            
        Returns:
            Complete blog post
        """
        logger.info(f"Generating blog on: {topic}")
        
        # If no research data provided, conduct research
        if not research_data:
            research_data = self.research_topic(topic)
        
        # Generate the blog using the LLM directly for better structure
        blog_generation_prompt = f"""
        Based on the following research data, write a comprehensive blog post on "{topic}".
        
        Research Data:
        {research_data}
        
        Create a well-structured blog with the following sections:
        
        1. **Heading**: A clear, engaging title about {topic}
        
        2. **Introduction**: A compelling introduction paragraph (100-150 words) that hooks the reader and introduces the main theme
        
        3. **Content**: Detailed, informative content divided into 3-4 subsections with clear headings. Each subsection should:
           - Provide valuable information about {topic}
           - Use the research data provided
           - Be well-organized and easy to read
           - Include specific examples or facts when possible
        
        4. **Summary**: A comprehensive summary (100-150 words) that:
           - Recaps the main points
           - Provides key takeaways
           - Offers a closing thought or reflection
        
        Format the output with clear markdown formatting:
        - Use # for main heading
        - Use ## for section headings (Introduction, Content subsections, Summary)
        - Use ### for subsection headings within Content
        - Use bold for key terms
        - Use bullet points where appropriate
        
        Ensure the final blog is at least 1500 characters long and flows naturally.
        """
        
        try:
            response = self.llm.invoke(blog_generation_prompt)
            blog_content = cast(str, response.content)
            logger.info("Blog generated successfully")
            return blog_content
        except Exception as e:
            logger.error(f"Error generating blog: {e}")
            raise
    
    def generate_complete_blog(self, topic: str) -> dict:
        """
        Generate a complete blog with metadata.
        
        Args:
            topic: The blog topic
            
        Returns:
            Dictionary with blog content and metadata
        """
        logger.info(f"Starting complete blog generation for: {topic}")
        
        # Research phase
        research_data = self.research_topic(topic)
        
        # Blog generation phase
        blog_content = self.generate_blog(topic, research_data)
        
        # Compile result
        result = {
            "topic": topic,
            "title": self._extract_title(blog_content),
            "content": blog_content,
            "research_summary": research_data,
            "generated_at": datetime.now().isoformat(),
            "status": "success"
        }
        
        return result
    
    @staticmethod
    def _extract_title(blog_content: str) -> str:
        """Extract title from blog content."""
        lines = blog_content.split('\n')
        for line in lines:
            if line.startswith('#') and not line.startswith('##'):
                return line.replace('#', '').strip()
        return "Untitled Blog"
    
    def save_blog(self, blog_result: dict, filename: Optional[str] = None) -> str:
        """
        Save the generated blog to a file.
        
        Args:
            blog_result: The blog result dictionary
            filename: Optional custom filename
            
        Returns:
            Path to saved file
        """
        if not filename:
            topic_slug = blog_result["topic"].lower().replace(" ", "_")
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"blog_{topic_slug}_{timestamp}.md"
        
        filepath = f"output/{filename}"
        
        # Format output
        output_content = f"""# Blog Generation Report
Generated: {blog_result['generated_at']}
Topic: {blog_result['topic']}

---

{blog_result['content']}

---

## Research Summary
{blog_result['research_summary']}
"""
        
        try:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(output_content)
            logger.info(f"Blog saved to: {filepath}")
            return filepath
        except Exception as e:
            logger.error(f"Error saving blog: {e}")
            raise
