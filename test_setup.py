#!/usr/bin/env python3
"""
Quick test to verify the blog generation system is set up correctly.
"""
import os
import sys

# Set a test API key for verification
os.environ['OPENAI_API_KEY'] = 'sk-test-key-for-verification'

try:
    print("Testing Blog Generation System Setup...\n")
    
    print("1. Testing imports...")
    from src.tools import ResearchTool, ContentProcessor, create_langchain_tools
    print("   ✓ Tools imported successfully")
    
    from src.blog_generator import BlogGenerator
    print("   ✓ Blog generator imported successfully")
    
    print("\n2. Testing tool creation...")
    tools = create_langchain_tools()
    print(f"   ✓ Created {len(tools)} tools: {[t.name for t in tools]}")
    
    print("\n3. Testing ResearchTool...")
    wiki_result = ResearchTool.search_wikipedia("Python")
    print(f"   ✓ Wikipedia search works ({len(wiki_result)} chars returned)")
    
    print("\n✅ Blog Generation System is properly installed and configured!")
    print("\nNext steps:")
    print("1. Edit .env file and add your OpenAI API key")
    print("2. Run: python main.py")
    print("3. Enter a blog topic when prompted")
    
except Exception as e:
    print(f"\n❌ Error during setup verification: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)
