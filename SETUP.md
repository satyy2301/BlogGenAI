# Blog Generation System - Full Stack Setup Guide

## 🚀 Quick Start (Development)

### Prerequisites
- Python 3.10+
- Node.js 18+
- OpenAI API Key
- Git

---

## **Backend Setup (Python/FastAPI)**

### Step 1: Install Backend Dependencies

```bash
# Navigate to project root
cd path/to/bloggen

# Activate virtual environment
venv\Scripts\activate  # Windows
# OR
source venv/bin/activate  # Mac/Linux

# Install Python packages
pip install -r requirements.txt
```

### Step 2: Configure Environment

```bash
# Copy the environment template
cp .env.example .env

# Edit .env and add your OpenAI API key
# OPENAI_API_KEY=sk_your_key_here
```

### Step 3: Run Backend Server

```bash
# From project root
python -m uvicorn api:app --reload --port 8000
```

**Backend runs at:** `http://localhost:8000`

API Documentation available at: `http://localhost:8000/docs`

---

## **Frontend Setup (React/Vite)**

### Step 1: Install Frontend Dependencies

```bash
# Navigate to frontend directory
cd frontend

# Install npm packages
npm install
```

### Step 2: Run Development Server

```bash
# From frontend directory
npm run dev
```

**Frontend runs at:** `http://localhost:5173`

---

## **Running Both Services (Full Stack)**

### Option 1: Two Terminal Windows (Development)

**Terminal 1 - Backend:**
```bash
cd path/to/bloggen
venv\Scripts\activate  # Windows
python -m uvicorn api:app --reload --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd path/to/bloggen/frontend
npm run dev
```

### Option 2: Docker Compose (Recommended)

```bash
# Build and run both services
docker-compose up

# To rebuild after code changes
docker-compose up --build

# To stop services
docker-compose down
```

---

## **API Endpoints**

### Health Check
```
GET /
```

### Generate Blog
```
POST /api/generate
Content-Type: application/json

{
  "topic": "Machine Learning in Healthcare"
}
```

**Response:**
```json
{
  "id": "1707944400.123",
  "title": "Machine Learning in Healthcare",
  "content": "# Full blog content here...",
  "createdAt": "2026-02-14T21:25:17.579597",
  "metadata": {
    "character_count": 2779,
    "read_time_minutes": 10
  }
}
```

### Get All Blogs
```
GET /api/blogs
```

### Get Single Blog
```
GET /api/blogs/{blog_id}
```

### Delete Blog
```
DELETE /api/blogs/{blog_id}
```

### Export Blog
```
GET /api/blogs/{blog_id}/export?format=md
```

### Get Statistics
```
GET /api/stats
```

---

## **Frontend Usage**

1. **Open** `http://localhost:5173` in your browser
2. **Enter** a blog topic (e.g., "Artificial Intelligence")
3. **Click** "Generate Blog"
4. **Wait** for generation (30-60 seconds)
5. **View** your blog in the list
6. **Actions**:
   - 📖 View Full - See complete blog
   - 📋 Copy - Copy blog to clipboard
   - ⬇️ Download - Download as markdown
   - 🗑️ Delete - Remove from your list

---

## **Project Structure**

```
bloggen/
├── backend/
│   ├── src/
│   │   ├── blog_generator.py      # Core blog generation
│   │   ├── tools.py               # Research tools
│   │   └── __init__.py
│   ├── config/
│   │   ├── settings.py
│   │   └── advanced_settings.py
│   ├── api.py                      # FastAPI application
│   ├── main.py                     # CLI interface
│   ├── requirements.txt            # Python dependencies
│   ├── .env                        # Environment variables (secret)
│   └── .env.example                # Environment template
│
├── frontend/                       # React UI
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/                # shadcn/ui components
│   │   │   ├── BlogForm.jsx
│   │   │   ├── BlogCard.jsx
│   │   │   ├── BlogList.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   ├── api/
│   │   │   └── blogApi.js
│   │   ├── lib/
│   │   │   └── utils.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── output/                         # Generated blogs (storage)
├── docker-compose.yml              # Docker multi-container setup
├── Dockerfile.backend              # Backend container
└── README.md                       # Project documentation
```

---

## **Troubleshooting**

### Backend Issues

**Port 8000 already in use:**
```bash
# Use different port
python -m uvicorn api:app --reload --port 8001
```

**CORS errors:**
The backend is configured to accept frontend requests from `http://localhost:5173`
Make sure frontend is running on this address.

**API Key errors:**
```bash
# Verify .env file exists and has valid OPENAI_API_KEY
cat .env
# Should show: OPENAI_API_KEY=sk_...
```

### Frontend Issues

**Dependencies not installed:**
```bash
cd frontend
npm install
npm run dev
```

**Port 5173 already in use:**
```bash
# Vite will automatically use next available port
npm run dev
# Check output for actual port
```

**Cannot connect to backend:**
- Verify backend is running on port 8000
- Check browser console for CORS errors
- Ensure firewall allows connections

---

## **Development Workflow**

### Making Changes

**Backend Changes:**
- Edit Python files in `src/` or `api.py`
- Backend auto-reloads with `--reload` flag
- Test via http://localhost:8000/docs

**Frontend Changes:**
- Edit React files in `frontend/src/`
- Vite hot-reloads automatically
- Changes appear instantly

### Building for Production

**Backend:**
```bash
# Create optimized Python package
pip install -r requirements.txt
python -m py_compile src/blog_generator.py
```

**Frontend:**
```bash
cd frontend
npm run build
# Output in frontend/dist/
```

---

## **Database/Storage**

Blogs are stored as JSON files in the `output/` directory:
```
output/
├── blog_1707944400.123.json
├── blog_1707944500.456.json
└── ...
```

Each file contains:
```json
{
  "id": "1707944400.123",
  "title": "Blog Topic",
  "content": "Full blog content...",
  "createdAt": "2026-02-14T21:25:17",
  "metadata": {...}
}
```

---

## **Environment Variables**

Create `.env` file:
```env
# OpenAI Configuration
OPENAI_API_KEY=sk_your_api_key_here
MODEL_NAME=gpt-3.5-turbo
TEMPERATURE=0.7
MAX_TOKENS=2000

# Blog Generation Settings
MAX_RESEARCH_DEPTH=3
BLOG_MIN_LENGTH=1500
```

---

## **Performance Tips**

1. **Blog generation takes 30-60 seconds**: This is normal. Model needs time to research and generate.

2. **Large blog list slow?**: Use search/filter feature to narrow results.

3. **Vite development slow?**: This is normal for first build. Subsequent changes are fast.

4. **High API costs?**: Monitor usage. Each blog costs ~0.01-0.05 USD.

---

## **Next Steps**

1. ✅ Setup and run both services
2. ✅ Generate your first blog
3. ✅ Explore the UI features
4. ✅ Try different topics
5. ✅ Deploy to production (optional)

---

## **Common Tasks**

### View Generated Blogs
```bash
ls -la output/
# Lists all blog JSON files
```

### Clear All Blogs
```bash
rm output/blog_*.json
```

### Reset to Fresh State
```bash
# Backend: Just delete output folder files
rm -r output/

# Frontend: Clear browser cache
# In browser: F12 → Application → Clear All
```

---

## **Support**

For issues or questions:
1. Check the troubleshooting section above
2. Review logs in terminal output
3. Check API docs at http://localhost:8000/docs
4. Review component code in frontend/src/

---

## **License**

This project is part of a Machine Learning assignment.

---

**Happy Blog Generating!** 🚀📚
