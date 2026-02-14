"""
Example usage scripts for the blog generation system.
Demonstrates various ways to use the blog generator.
"""

# Example 1: Simple Usage
def example_simple_usage():
    """Generate a simple blog on a topic."""
    from src.blog_generator import BlogGenerator
    
    generator = BlogGenerator()
    blog_result = generator.generate_complete_blog("Blockchain Technology")
    
    print("Generated Blog:")
    print(blog_result['content'])


# Example 2: Save Multiple Blogs
def example_batch_generation():
    """Generate multiple blogs and save them."""
    from src.blog_generator import BlogGenerator
    
    topics = [
        "Machine Learning",
        "Cloud Computing",
        "Internet of Things"
    ]
    
    generator = BlogGenerator()
    
    for topic in topics:
        print(f"\nGenerating blog on: {topic}")
        blog_result = generator.generate_complete_blog(topic)
        filepath = generator.save_blog(blog_result)
        print(f"✓ Saved to: {filepath}")


# Example 3: Custom Research with Direct Tool Usage
def example_custom_research():
    """Use tools directly for custom research."""
    from src.tools import ResearchTool, ContentProcessor
    
    # Research a topic
    research = ResearchTool.search_all_sources("Renewable Energy")
    print("Research Results:")
    print(research)
    
    # Extract key points
    key_points = ContentProcessor.extract_key_points(research)
    print("\nKey Points:")
    for i, point in enumerate(key_points, 1):
        print(f"{i}. {point}")


# Example 4: Error Handling
def example_error_handling():
    """Demonstrate error handling."""
    from src.blog_generator import BlogGenerator
    
    try:
        generator = BlogGenerator()
        blog_result = generator.generate_complete_blog("Very Specific Technical Topic")
        print("Blog generated successfully!")
    except Exception as e:
        print(f"Error occurred: {e}")
        print("The system will use fallback mechanisms")


# Example 5: Access Research Data Separately
def example_separate_research():
    """Access research data independently."""
    from src.blog_generator import BlogGenerator
    
    generator = BlogGenerator()
    topic = "Natural Language Processing"
    
    # Conduct research
    print("Researching...")
    research_data = generator.research_topic(topic)
    
    # Use research data
    print("Research completed:")
    print(research_data[:500] + "...")  # Print first 500 chars
    
    # Generate blog with research data
    print("\nGenerating blog...")
    blog = generator.generate_blog(topic, research_data=research_data)
    print(blog)


# Example 6: File Operations
def example_file_operations():
    """Save and manage generated blogs."""
    from src.blog_generator import BlogGenerator
    import os
    
    generator = BlogGenerator()
    blog_result = generator.generate_complete_blog("Cybersecurity")
    
    # Save with default name
    filepath1 = generator.save_blog(blog_result)
    
    # Save with custom name
    filepath2 = generator.save_blog(blog_result, filename="cybersecurity_blog.md")
    
    # Check files exist
    if os.path.exists(filepath2):
        print(f"✓ Blog saved successfully at: {filepath2}")
        
        # Read and display
        with open(filepath2, 'r', encoding='utf-8') as f:
            content = f.read()
            print(f"✓ Blog size: {len(content)} characters")


if __name__ == "__main__":
    print("Blog Generation System - Example Usage Scripts")
    print("=" * 50)
    print("\nSelect an example to run:")
    print("1. Simple usage")
    print("2. Batch generation")
    print("3. Custom research")
    print("4. Error handling")
    print("5. Separate research")
    print("6. File operations")
    
    choice = input("\nEnter choice (1-6): ").strip()
    
    examples = {
        "1": example_simple_usage,
        "2": example_batch_generation,
        "3": example_custom_research,
        "4": example_error_handling,
        "5": example_separate_research,
        "6": example_file_operations,
    }
    
    if choice in examples:
        print("\nRunning example...\n")
        examples[choice]()
    else:
        print("Invalid choice!")
