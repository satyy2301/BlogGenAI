# Blog Generation System

**A powerful agent-based blog generation system using LangChain and OpenAI GPT-3.5**

## Overview

This project implements an intelligent blog generation system that leverages:
- **LangChain** - For building agent-based systems with tools
- **OpenAI GPT-3.5** - For natural language generation
- **Wikipedia API** - For reliable information retrieval
- **Web Search (DuckDuckGo)** - For current and diverse information sources

The system acts as an autonomous agent that researches topics using multiple tools and generates well-structured, informative blog posts automatically.

## Features

✨ **Key Features:**
- 🤖 Agent-based architecture using LangChain ReAct pattern
- 🔍 Multi-source research (Wikipedia + Web Search)
- 📝 Structured blog generation with multiple sections
- 🎯 Automatic research and content synthesis
- 💾 Export blogs to markdown files
- 📊 Comprehensive logging and error handling
- 🛠️ Easy to extend with custom tools

## Project Structure

```
bloggen/
├── src/
│   ├── __init__.py
│   ├── blog_generator.py      # Main blog generation agent
│   └── tools.py               # Research and processing tools
├── config/
│   └── settings.py            # Configuration management
├── output/                    # Generated blog files
├── samples/                   # Example outputs
├── main.py                    # Entry point
├── requirements.txt           # Dependencies
├── .env.example               # Environment variables template
└── README.md                  # This file
```

## Installation

### Prerequisites
- Python 3.8 or higher
- OpenAI API key (get from https://platform.openai.com/api-keys)

### Step 1: Clone/Download the Project
```bash
cd bloggen
```

### Step 2: Create Virtual Environment (Recommended)
```bash
# On Windows
python -m venv venv
venv\Scripts\activate

# On macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 4: Configure Environment
1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Edit `.env` and add your OpenAI API key:
```
OPENAI_API_KEY=sk-your-actual-api-key-here
MODEL_NAME=gpt-3.5-turbo
TEMPERATURE=0.7
MAX_TOKENS=2000
```

## Usage

### Basic Usage

Run the interactive blog generator:

```bash
python main.py
```

Then follow the prompts:
```
===============================================
Welcome to the Blog Generation System
===============================================

Enter the blog topic: Artificial Intelligence in Healthcare
```

The system will:
1. 🔍 Research the topic using Wikipedia and web search
2. 📝 Generate a structured blog with introduction, content, and summary
3. 💾 Save the blog to `output/` directory

### Programmatic Usage

```python
from src.blog_generator import BlogGenerator

# Initialize the generator
generator = BlogGenerator()

# Generate a complete blog
blog_result = generator.generate_complete_blog("Machine Learning")

# Access the content
print(blog_result['content'])

# Save to file
filepath = generator.save_blog(blog_result, filename="my_blog.md")
print(f"Saved to: {filepath}")
```

### Advanced Usage: Custom Research

```python
from src.blog_generator import BlogGenerator
from src.tools import ResearchTool

# Initialize
generator = BlogGenerator()

# Conduct custom research
research = ResearchTool.search_all_sources("Python Programming")

# Generate blog with specific research
blog = generator.generate_blog("Python Programming", research_data=research)

print(blog)
```

## Blog Output Structure

The generated blogs follow this structure:

```
# Main Topic Title

## Introduction
Engaging introduction paragraph (100-150 words)

## Content Section 1
Detailed information with subsections...

## Content Section 2
More detailed content...

## Summary
Comprehensive summary and key takeaways (100-150 words)
```

## System Architecture

### Agent-Based Design

The system uses the **ReAct (Reasoning + Acting)** pattern:

1. **Reasoning**: The LLM analyzes the task and decides which tools to use
2. **Acting**: The agent calls the appropriate tools (Wikipedia search, web search)
3. **Observation**: The tool results are fed back to the LLM
4. **Loop**: Steps repeat until the agent has enough information

### Available Tools

| Tool | Purpose | Source |
|------|---------|--------|
| Wikipedia Search | Get overview and background info | Wikipedia API |
| Web Search | Find current and diverse perspectives | DuckDuckGo |
| Research Multiple Sources | Comprehensive research combining both | Both |

## Configuration Options

Edit `.env` file to customize:

```
# LLM Settings
OPENAI_API_KEY=your_key              # Required: Your OpenAI API key
MODEL_NAME=gpt-3.5-turbo             # LLM model to use
TEMPERATURE=0.7                      # Creativity (0-1, higher = more creative)
MAX_TOKENS=2000                      # Max response length

# Blog Settings
MAX_RESEARCH_DEPTH=3                 # Research iterations
BLOG_MIN_LENGTH=1500                 # Minimum blog length
```

## Example Outputs

### Sample 1: Quick Start
```bash
python main.py
Enter the blog topic: Climate Change
```

**Output**: Well-structured blog on climate change with:
- Comprehensive introduction
- Discussion of causes and effects
- Current research findings
- Summary with key takeaways

### Sample 2: Academic Topic
```bash
python main.py
Enter the blog topic: Quantum Computing
```

**Output**: Technical yet accessible blog covering:
- Basic quantum principles
- Current applications
- Recent breakthroughs
- Future prospects

## Common Use Cases

1. **Content Marketing**: Quickly generate blog posts for websites
2. **Research Assistance**: Get well-researched overviews of topics
3. **Learning**: Understand new topics through structured blogs
4. **Documentation**: Auto-generate documentation content

## Troubleshooting

### Error: "OPENAI_API_KEY is not set"
**Solution**: Make sure `.env` file exists in the project root with your API key

### Error: "Rate limit exceeded"
**Solution**: OpenAI has rate limits. Wait a few moments and try again.

### Error: "Wikipedia article not found"
**Solution**: The system falls back to web search. Make sure your topic name is correct.

### Error: "Connection timeout"
**Solution**: Check your internet connection and try again.

## Performance & Limitations

### Performance
- **Research Phase**: 10-30 seconds (depends on network)
- **Blog Generation**: 20-60 seconds (depends on LLM response time)
- **Total Time**: Typically 1-2 minutes per blog

### Limitations
- Requires active internet connection
- Subject to OpenAI API rate limits
- Blog quality depends on research source availability
- Wikipedia may not have all niche topics

## Future Enhancements

🚀 **Planned Features:**
- [ ] Image searching and inclusion
- [ ] Citation management and footnotes
- [ ] Multi-language support
- [ ] Interactive blog editing
- [ ] SEO optimization
- [ ] Custom tone/style options
- [ ] Batch blog generation
- [ ] Web UI interface

## Code Quality

### Best Practices Implemented
- ✅ Proper error handling and logging
- ✅ Type hints for better code clarity
- ✅ Modular design with separation of concerns
- ✅ Configuration management
- ✅ Comprehensive documentation
- ✅ Graceful fallbacks for failures

### Testing
To test the system:

```python
# Unit test example
from src.tools import ResearchTool

result = ResearchTool.search_wikipedia("Python")
assert len(result) > 0, "Wikipedia search failed"
print("✓ Test passed")
```

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| langchain | 0.1.0 | Agent framework |
| langchain-openai | 0.0.13 | OpenAI integration |
| openai | 1.3.0 | OpenAI API |
| wikipedia | 1.4.0 | Wikipedia data |
| requests | 2.31.0 | HTTP requests |
| duckduckgo-search | 3.9.2 | Web search |
| python-dotenv | 1.0.0 | Env variables |

## Contributing

Contributions are welcome! To extend the system:

1. **Add Custom Tools**: Modify `src/tools.py`
2. **Improve Agent**: Update `src/blog_generator.py`
3. **Add Features**: Create new modules in `src/`

## License

MIT License - Feel free to use and modify

## Contact & Support

For issues, questions, or suggestions:
- Review the README and troubleshooting section
- Check error messages and logs
- Verify your OpenAI API key is valid
- Ensure all dependencies are installed correctly

## Demo & Presentation

For demo purposes, follow these steps:

1. **Setup**: Install dependencies and configure `.env`
2. **Run**: Execute `python main.py`
3. **Input**: Enter a topic like "Artificial Intelligence"
4. **Show**: Display the generated blog
5. **Explain**: 
   - Show how the agent researches
   - Highlight the structured output
   - Discuss the tool usage
   - Mention scalability options

## Key Achievements

✅ Fully functional agent-based blog generation
✅ Multi-source research capability
✅ Well-structured and organized code
✅ Comprehensive documentation
✅ Error handling and logging
✅ Easy to use and extend
✅ Production-ready

---

**Created**: 2026
**Version**: 1.0.0
**Status**: Production Ready

Happy blogging! 🚀
