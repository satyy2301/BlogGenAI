#!/usr/bin/env python3
"""
Demo script to generate a sample blog.
"""
import os
from src.blog_generator import BlogGenerator

def main():
    print("=" * 60)
    print("Blog Generation System - Demo")
    print("=" * 60)
    print()
    
    try:
        # Initialize the generator
        print("1. Initializing Blog Generator...")
        generator = BlogGenerator()
        print("   ✓ Generator initialized\n")
        
        # Research the topic
        topic = "Artificial Intelligence"
        print(f"2. Researching: '{topic}'...")
        research = generator.research_topic(topic)
        print(f"   ✓ Research completed ({len(research)} chars)\n")
        print("   Research Summary (first 400 chars):")
        print("   " + "-" * 56)
        print("   " + research[:400].replace("\n", "\n   "))
        print("   " + "-" * 56)
        print()
        
        # Generate the blog
        print("3. Generating Blog...")
        blog_content = generator.generate_blog(topic, research_data=research)
        print(f"   ✓ Blog generated ({len(blog_content)} chars)\n")
        print("   Blog Preview (first 500 chars):")
        print("   " + "-" * 56)
        print("   " + blog_content[:500].replace("\n", "\n   "))
        print("   " + "-" * 56)
        print()
        
        # Save the blog
        print("4. Saving Blog...")
        filepath = generator.save_blog({
            'topic': topic,
            'title': topic,
            'content': blog_content,
            'research_summary': research,
            'generated_at': 'now',
            'status': 'success'
        })
        print(f"   ✓ Blog saved to: {filepath}\n")
        
        print("=" * 60)
        print("✅ Demo Complete!")
        print("=" * 60)
        print("\nYour system is working perfectly!")
        print("You can now run: python main.py")
        print("And generate blogs on any topic you want!")
        
    except Exception as e:
        print(f"\n❌ Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
