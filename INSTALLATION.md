# Installation and Setup Guide

## Quick Start (5 minutes)

### 1. Prerequisites Check
```bash
python --version  # Should be 3.8 or higher
```

### 2. Environment Setup
```bash
# Navigate to project
cd bloggen

# Create virtual environment (Windows)
python -m venv venv
venv\Scripts\activate

# Or on macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure API Key
```bash
# On Windows: Copy .env.example to .env
copy .env.example .env

# On macOS/Linux
cp .env.example .env

# Edit .env and add your OpenAI API key:
# OPENAI_API_KEY=sk-your-actual-key-here
```

### 5. Verify Installation
```bash
python -c "from src.blog_generator import BlogGenerator; print('✓ Installation successful')"
```

### 6. Run the System
```bash
python main.py
```

## Detailed Troubleshooting

### Issue: "ModuleNotFoundError: No module named 'langchain'"
**Solution:**
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### Issue: "OPENAI_API_KEY is not set"
1. Ensure `.env` file exists in project root
2. Verify the API key format starts with `sk-`
3. Check for typos in the file
4. Restart Python/terminal after editing .env

### Issue: "Connection timeout during research"
1. Check internet connection
2. Try again after 30 seconds
3. Wikipedia/DuckDuckGo may be temporarily unavailable

### Issue: Wikipedia import error
```bash
pip install wikipedia --upgrade
```

## API Key Setup

### Getting Your OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Sign up or log in to your account
3. Click "Create new secret key"
4. Copy the key (it starts with `sk-`)
5. Add to `.env` file

### Alternative: Environment Variable
```bash
# Windows
set OPENAI_API_KEY=sk-your-key

# macOS/Linux
export OPENAI_API_KEY=sk-your-key
```

## Performance Tips

- **Faster blogging**: Use `gpt-3.5-turbo` (faster and cheaper)
- **Better quality**: Increase `TEMPERATURE` to 0.9
- **Longer blogs**: Increase `MAX_TOKENS` to 4000

Edit `.env` to adjust these settings.
