"""
Main entry point for the blog generation system.
Run this file to generate blogs on any topic.
"""
import logging
import sys
from src.blog_generator import BlogGenerator
from pathlib import Path

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


def main():
    """Main function to run the blog generator."""
    
    print("\n" + "="*60)
    print("Welcome to the Blog Generation System")
    print("="*60 + "\n")
    
    try:
        # Initialize the blog generator
        print("Initializing blog generator...")
        generator = BlogGenerator()
        print("✓ Blog generator initialized successfully\n")
        
        # Get topic from user
        topic = input("Enter the blog topic: ").strip()
        
        if not topic:
            print("Error: Topic cannot be empty")
            sys.exit(1)
        
        print(f"\nGenerating blog on topic: '{topic}'")
        print("-" * 60)
        
        # Generate blog
        print("\nPhase 1: Researching topic...")
        print("(This may take a moment...)\n")
        
        blog_result = generator.generate_complete_blog(topic)
        
        print("\n" + "-" * 60)
        print("\n✓ Blog generated successfully!\n")
        
        # Display the blog
        print("Generated Blog:")
        print("=" * 60)
        print(blog_result['content'])
        print("=" * 60 + "\n")
        
        # Save the blog
        filepath = generator.save_blog(blog_result)
        print(f"✓ Blog saved to: {filepath}")
        
        print("\nGeneration Statistics:")
        print(f"  - Topic: {blog_result['topic']}")
        print(f"  - Generated at: {blog_result['generated_at']}")
        print(f"  - Content length: {len(blog_result['content'])} characters")
        
        print("\n" + "="*60)
        print("Thank you for using the Blog Generation System!")
        print("="*60 + "\n")
        
    except KeyboardInterrupt:
        print("\n\nOperation cancelled by user.")
        sys.exit(0)
    except Exception as e:
        logger.error(f"An error occurred: {e}", exc_info=True)
        print(f"\nError: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
