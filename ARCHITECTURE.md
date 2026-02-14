# System Architecture & Design

## Overview

The Blog Generation System is built on a **modular, agent-based architecture** that leverages LangChain and OpenAI's GPT model. The system follows clean code principles for maintainability and extensibility.

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER INTERFACE                            │
│                      (main.py, examples.py)                      │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      BLOG GENERATOR AGENT                        │
│                 (src/blog_generator.py)                          │
│  - Orchestrates research and generation phases                   │
│  - Manages LangChain ReAct agent                                 │
│  - Handles file I/O and metadata                                 │
└────────────────────────────┬────────────────────────────────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
        ┌─────────────┐ ┌──────────────┐ ┌──────────────┐
        │ RESEARCH    │ │ GENERATION   │ │ FILE STORAGE │
        │ TOOLS       │ │ TOOLS        │ │              │
        │             │ │              │ │              │
        │ -Wikipedia  │ │ -LLM Calls   │ │ -Markdown    │
        │  Search     │ │ -Prompting   │ │  Files       │
        │ -Web Search │ │ -Formatting  │ │ -Metadata    │
        │ -Multi-      │ │              │ │              │
        │  source      │ │              │ │              │
        └──────┬───────┘ └──────┬───────┘ └──────┬───────┘
               │                │                │
               └────────────────┼────────────────┘
                                │
                ┌───────────────┼───────────────┐
                │               │               │
                ▼               ▼               ▼
        ┌──────────────┐ ┌─────────────┐ ┌──────────────┐
        │  Wikipedia   │ │ DuckDuckGo  │ │   OpenAI     │
        │     API      │ │   Search    │ │   GPT-3.5    │
        └──────────────┘ └─────────────┘ └──────────────┘
```

## Component Architecture

### 1. **Entry Points**

#### main.py
- Interactive CLI interface
- Takes user topic as input
- Manages the complete workflow
- Displays results to user

#### examples.py
- Demonstration scripts
- Various usage patterns
- Educational resource

#### demo.py
- Comprehensive system demonstration
- Performance metrics
- Statistics

### 2. **Core System**

#### src/blog_generator.py
The main orchestrator module containing:

```python
BlogGenerator
├── __init__()              # Initialize LLM and tools
├── _setup_agent()         # Configure LangChain ReAct agent
├── research_topic()       # Task: Research using tools
├── generate_blog()        # Task: Generate blogs from research
├── generate_complete_blog()  # Task: End-to-end generation
├── save_blog()            # Task: Persist to disk
└── _extract_title()       # Utility: Title extraction
```

**Key Features:**
- Uses LangChain ReAct (Reasoning + Acting) pattern
- Manages agent-tool interactions
- Error handling with fallbacks
- Comprehensive logging

#### src/tools.py
Tool implementations for agent use:

```python
ResearchTool
├── search_wikipedia()      # Wikipedia API integration
├── web_search()           # DuckDuckGo integration
└── search_all_sources()   # Combined research

ContentProcessor
├── extract_key_points()   # NLP-like extraction
└── format_blog_section()  # Markdown formatting
```

### 3. **Configuration**

#### config/settings.py
- Environment variable loading
- Configuration validation
- Central settings management
- API key handling

#### config/advanced_settings.py
- Preset profiles (fast, balanced, quality)
- Temperature settings
- Token limits
- Output formatting options

### 4. **File Structure**

```
bloggen/
├── src/                       # Core application
│   ├── __init__.py
│   ├── blog_generator.py      # Main agent
│   └── tools.py               # Research & processing tools
├── config/                    # Configuration
│   ├── settings.py            # Env-based settings
│   └── advanced_settings.py   # Preset profiles
├── output/                    # Generated blogs (auto-created)
├── samples/                   # Example outputs
├── main.py                    # CLI entry point
├── examples.py                # Usage examples
├── demo.py                    # Demonstration
├── requirements.txt           # Python dependencies
├── .env.example              # Environment template
├── README.md                 # Main documentation
├── INSTALLATION.md           # Setup guide
├── USAGE_GUIDE.md            # How to use
├── CHALLENGES_AND_IMPROVEMENTS.md  # Lessons learned
└── ARCHITECTURE.md           # This file
```

## Design Patterns

### 1. **Agent Pattern (LangChain ReAct)**

The system implements the ReAct (Reasoning + Acting) pattern:

```
┌─────────────────┐
│  Task Input     │
│  (Blog Topic)   │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────┐
│ LLM Reasoning Phase         │
│ - Analyze task              │
│ - Decide which tool to use  │
└────────┬────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│ Tool Action Phase           │
│ - Call Wikipedia/Web search │
│ - Get tool output           │
└────────┬────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│ Observation Loop            │
│ - Feed results back to LLM  │
│ - More tools needed?        │
│ - YES: Go to Reasoning      │
│ - NO: Continue              │
└────────┬────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│ Final Generation            │
│ - Generate blog content     │
│ - Format output             │
└────────┬────────────────────┘
         │
         ▼
┌─────────────────┐
│ Blog Output     │
└─────────────────┘
```

### 2. **Strategy Pattern (Configuration Profiles)**

```python
get_profile("fast")       # GPT-3.5, 0.5 temp, 1500 tokens
get_profile("balanced")   # GPT-3.5, 0.7 temp, 2000 tokens
get_profile("quality")    # GPT-4, 0.7 temp, 3000 tokens
get_profile("creative")   # GPT-3.5, 0.95 temp, 3000 tokens
get_profile("technical")  # GPT-3.5, 0.3 temp, 2500 tokens
```

### 3. **Adapter Pattern (Tool Integration)**

Tools are adapted to LangChain's Tool interface:

```python
Tool(
    name="Wikipedia Search",
    func=ResearchTool.search_wikipedia,
    description="..."
)
```

### 4. **Facade Pattern (BlogGenerator)**

Complex operations are simplified:

```python
# Complex operation hidden behind simple interface
result = generator.generate_complete_blog("Topic")
```

---

**Document Version**: 1.0  
**Last Updated**: 2026-02-14  
**Author**: Blog Generation Team
