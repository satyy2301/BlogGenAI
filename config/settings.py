"""
Configuration settings for the blog generation system.
"""
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# OpenAI Configuration
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
MODEL_NAME = os.getenv("MODEL_NAME", "gpt-3.5-turbo")
TEMPERATURE = float(os.getenv("TEMPERATURE", "0.7"))
MAX_TOKENS = int(os.getenv("MAX_TOKENS", "2000"))

# Blog Generation Settings
MAX_RESEARCH_DEPTH = int(os.getenv("MAX_RESEARCH_DEPTH", "3"))
BLOG_MIN_LENGTH = int(os.getenv("BLOG_MIN_LENGTH", "1500"))

# Validation
if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY is not set in .env file")
