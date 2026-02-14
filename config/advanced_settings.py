"""
Configuration module for advanced settings.
Allows fine-tuning of the blog generation system.
"""

# ============================================================================
# LANGUAGE MODEL CONFIGURATION
# ============================================================================

# Model Selection
# Options: gpt-3.5-turbo, gpt-4, gpt-4-turbo
MODEL_SELECTION = {
    "fast": "gpt-3.5-turbo",      # Fastest, most affordable
    "balanced": "gpt-3.5-turbo",  # Good balance
    "powerful": "gpt-4",           # Most capable, most expensive
}

# Temperature Controls Creativity
# 0.0 = Deterministic (same result every time)
# 0.5 = Balanced (good for most blogs)
# 1.0 = Very creative (more varied outputs)
TEMPERATURE_PROFILES = {
    "technical": 0.3,      # For factual, technical content
    "balanced": 0.7,       # Default, good for most topics
    "creative": 0.95,      # For creative writing
}

# Token Limits
TOKEN_PROFILES = {
    "short": 1000,         # 400-600 words
    "medium": 2000,        # 700-1000 words
    "long": 4000,          # 1500-2000 words
    "extended": 8000,      # Very long form
}

# ============================================================================
# RESEARCH CONFIGURATION
# ============================================================================

# Research Depth
RESEARCH_DEPTHS = {
    "quick": 1,            # Fast research
    "standard": 3,         # Default, balanced
    "thorough": 5,         # Deep research
    "comprehensive": 10,   # Very thorough
}

# Web Search Results to Include
WEB_SEARCH_RESULTS = {
    "minimal": 1,          # Just one source
    "standard": 3,         # Few sources
    "comprehensive": 5,    # Multiple sources
}

# ============================================================================
# BLOG STRUCTURE CONFIGURATION
# ============================================================================

# Blog Section Lengths (approximate word count)
SECTION_LENGTHS = {
    "introduction": (100, 150),
    "content": (300, 600),
    "summary": (100, 150),
}

# Minimum Content Lengths
MIN_CONTENT_LENGTH = {
    "short": 500,
    "medium": 1500,
    "long": 3000,
}

# Number of Content Subsections
CONTENT_SUBSECTIONS = {
    "minimal": 2,
    "standard": 3,
    "comprehensive": 5,
}

# ============================================================================
# OUTPUT CONFIGURATION
# ============================================================================

# Save Formats
SUPPORTED_FORMATS = ["markdown", "html", "json"]
DEFAULT_FORMAT = "markdown"

# Output Paths
OUTPUT_PATHS = {
    "default": "output/",
    "archive": "output/archive/",
    "samples": "samples/",
}

# File Naming Patterns
FILE_NAMING = {
    "timestamp": "blog_{topic}_{timestamp}.md",
    "simple": "blog_{topic}.md",
    "dated": "{date}_{topic}.md",
}

# ============================================================================
# ADVANCED SETTINGS
# ============================================================================

# Error Handling
MAX_RETRIES = 3
RETRY_DELAY = 2  # seconds

# Timeout Settings
RESEARCH_TIMEOUT = 30  # seconds
GENERATION_TIMEOUT = 120  # seconds

# Agent Configuration
MAX_AGENT_ITERATIONS = 10
AGENT_VERBOSE = True

# Logging
LOG_LEVEL = "INFO"  # DEBUG, INFO, WARNING, ERROR
LOG_FILE = "blog_generator.log"

# ============================================================================
# QUALITY ASSURANCE
# ============================================================================

# Content Validation
VALIDATE_STRUCTURE = True
VALIDATE_LENGTH = True
VALIDATE_UNIQUENESS = False

# Minimum Requirements
MINIMUM_SECTIONS = ["Introduction", "Content", "Summary"]
MINIMUM_CONTENT_LENGTH = 1500

# ============================================================================
# PRESET PROFILES
# ============================================================================

def get_profile(profile_name: str) -> dict:
    """Get a preset configuration profile."""
    profiles = {
        "fast": {
            "model": "gpt-3.5-turbo",
            "temperature": 0.5,
            "max_tokens": 1500,
            "research_depth": 1,
        },
        "balanced": {
            "model": "gpt-3.5-turbo",
            "temperature": 0.7,
            "max_tokens": 2000,
            "research_depth": 3,
        },
        "quality": {
            "model": "gpt-4",
            "temperature": 0.7,
            "max_tokens": 3000,
            "research_depth": 5,
        },
        "creative": {
            "model": "gpt-3.5-turbo",
            "temperature": 0.95,
            "max_tokens": 3000,
            "research_depth": 3,
        },
        "technical": {
            "model": "gpt-3.5-turbo",
            "temperature": 0.3,
            "max_tokens": 2500,
            "research_depth": 5,
        },
    }
    
    return profiles.get(profile_name, profiles["balanced"])


# ============================================================================
# USAGE EXAMPLE
# ============================================================================

"""
from config.advanced_settings import get_profile, TEMPERATURE_PROFILES

# Get a profile
config = get_profile("quality")

# Use in generator
from src.blog_generator import BlogGenerator
gen = BlogGenerator()

# Apply custom settings
gen.llm.temperature = config['temperature']
gen.llm.max_tokens = config['max_tokens']
"""
