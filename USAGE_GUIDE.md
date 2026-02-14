# Usage Guide - Blog Generation System

## Getting Started

### First Run
```bash
python main.py
```

You'll see:
```
============================================================
Welcome to the Blog Generation System
============================================================

Initializing blog generator...
✓ Blog generator initialized successfully

Enter the blog topic: 
```

### Enter Your Topic
Examples:
- "Climate Change"
- "Quantum Computing"
- "Mental Health in Digital Age"
- "Future of Space Exploration"

The system will then:
1. **Research** (10-30 seconds): Gather information from multiple sources
2. **Generate** (20-60 seconds): Create structured blog content
3. **Save**: Output file is saved to `output/` directory

## Understanding the Output

### File Naming
Blogs are saved as: `blog_[topic]_[timestamp].md`

Example: `blog_artificial_intelligence_20260214_103000.md`

### File Structure
```markdown
# Blog Generation Report
Generated: [timestamp]
Topic: [Your Topic]

---

# Main Article Content

## Introduction
...

## Content
...

## Summary
...

---

## Research Summary
[Sources used and key findings]
```

## Advanced Usage

### Using Examples
```bash
python examples.py
```

Select from:
- Simple usage
- Batch generation
- Custom research
- Error handling
- Separate research phases
- File operations

### Programmatic Access
```python
from src.blog_generator import BlogGenerator

# Create generator
gen = BlogGenerator()

# Generate blog
result = gen.generate_complete_blog("Your Topic")

# Access components
print(result['content'])        # The blog content
print(result['title'])          # Extracted title
print(result['research_summary']) # Research data
print(result['generated_at'])   # Generation timestamp
```

### Custom Research
```python
from src.tools import ResearchTool

# Wikipedia only
wiki = ResearchTool.search_wikipedia("Python Programming")

# Web search only
web = ResearchTool.web_search("Python Programming")

# Both sources
comprehensive = ResearchTool.search_all_sources("Python Programming")
```

## Tips for Best Results

### 1. Topic Selection
- **Good**: "Artificial Intelligence", "Climate Change", "Machine Learning"
- **Better**: "AI Applications in Healthcare", "Climate Change in Coastal Cities"
- **Best**: Be specific but not too obscure

### 2. Configuration Tuning
Edit `.env` for different outputs:

```
# For faster blogs
TEMPERATURE=0.5
MAX_TOKENS=1500

# For more creative blogs
TEMPERATURE=0.9
MAX_TOKENS=3000

# For technical topics
MODEL_NAME=gpt-3.5-turbo
TEMPERATURE=0.3
```

### 3. Review & Edit
Generated content is excellent but should be reviewed for:
- Factual accuracy for critical topics
- Brand alignment
- Tone consistency
- SEO keywords (for content marketing)

### 4. Batch Processing
Generate multiple blogs efficiently:
```python
from src.blog_generator import BlogGenerator

topics = ["AI", "ML", "Deep Learning", "NLP"]
gen = BlogGenerator()

for topic in topics:
    result = gen.generate_complete_blog(topic)
    gen.save_blog(result)
    print(f"✓ Generated: {topic}")
```

## Troubleshooting Common Issues

### Blog Seems Generic
**Solution**: 
- Choose a more specific topic
- Increase TEMPERATURE to 0.8-0.9
- Increase MAX_TOKENS to allow longer content

### Takes Too Long
**Solution**:
- Reduce MAX_RESEARCH_DEPTH in .env
- Use simpler search queries
- Topics with better Wikipedia coverage are faster

### Missing Information
**Solution**:
- Topic may be too niche (Wikipedia has limited coverage)
- Try a related but broader topic
- Review research summary to see what was found

### API Errors
**Solution**:
- Check internet connection
- Verify OpenAI API key is valid
- Check OpenAI account balance
- Wait 30 seconds and retry (rate limit)

## Performance Expectations

| Task | Time | Range |
|------|------|-------|
| Research | 10-30s | Depends on topic & sources |
| Generation | 20-60s | Longer for more tokens |
| Total | 30-90s | Usually < 2 minutes |
| File I/O | 1-5s | Negligible |

## Output Quality Factors

**Improves Output:**
- ✅ Well-known topics with abundant sources
- ✅ Specific, clear topic descriptions
- ✅ Higher TEMPERATURE (more creative)
- ✅ Higher MAX_TOKENS (longer content)

**May Reduce Quality:**
- ❌ Very niche or emerging topics
- ❌ Controversial topics
- ❌ Very low MAX_TOKENS (truncated content)
- ❌ Very low TEMPERATURE (generic content)

## Best Practices

1. **Start Simple**: Begin with common topics to understand the system
2. **Experiment Settings**: Try different temperature and token settings
3. **Review Output**: Check blogs for accuracy before publishing
4. **Iterate**: Use feedback to refine queries and settings
5. **Document Process**: Keep notes on what settings produce best results for your use case

## Integration Examples

### Save to Custom Folder
```python
import os
gen = BlogGenerator()
result = gen.generate_complete_blog("Topic")

# Custom path
os.makedirs("my_blogs", exist_ok=True)
with open("my_blogs/blog.md", 'w') as f:
    f.write(result['content'])
```

### Extract Metadata
```python
result = gen.generate_complete_blog("Topic")

meta = {
    'title': result['title'],
    'topic': result['topic'],
    'date': result['generated_at'],
    'length': len(result['content'])
}

print(meta)
```

### Chain Multiple Operations
```python
gen = BlogGenerator()

# Research first
research = gen.research_topic("AI")

# Use research for multiple blogs
blog1 = gen.generate_blog("AI Basics", research)
blog2 = gen.generate_blog("AI Applications", research)
```

## Advanced Customization

### Modify Prompts
Edit `src/blog_generator.py` to customize:
- Blog structure (add/remove sections)
- Section lengths
- Content style and tone
- Output format

### Add Your Tools
Edit `src/tools.py` to integrate:
- Custom databases
- Internal knowledge bases
- Specialized APIs
- Domain-specific sources

### Extend Agent
In `src/blog_generator.py`:
- Add new tool chains
- Implement filtering
- Add validation steps
- Create specialized agents

## Getting Help

1. **Check README.md** - Overview and features
2. **See INSTALLATION.md** - Setup issues
3. **Read CHALLENGES_AND_IMPROVEMENTS.md** - Known issues and solutions
4. **Review examples.py** - Sample code
5. **Check logs** - Detailed error information

---

**Happy blogging!** 🚀

For questions or issues, refer to the main README.md file.
