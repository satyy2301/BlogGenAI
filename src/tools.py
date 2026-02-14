"""
Custom tools for the blog generation agent.
Includes Wikipedia search, web search, and content processing.
"""
import wikipedia
from typing import Optional
from duckduckgo_search import DDGS
import requests
from bs4 import BeautifulSoup
import logging

logger = logging.getLogger(__name__)


class ResearchTool:
    """Tool for researching blog topics using various sources."""
    
    @staticmethod
    def search_wikipedia(query: str) -> str:
        """
        Search Wikipedia for information about a topic.
        
        Args:
            query: The search query
            
        Returns:
            Summary of the Wikipedia article
        """
        try:
            result = wikipedia.summary(query, sentences=5)
            return result
        except wikipedia.exceptions.DisambiguationError as e:
            # If disambiguation page, try the first option
            try:
                result = wikipedia.summary(e.options[0], sentences=5)
                return result
            except Exception as ex:
                logger.warning(f"Error searching Wikipedia for {query}: {ex}")
                return f"Could not find Wikipedia information for {query}"
        except wikipedia.exceptions.PageError:
            return f"No Wikipedia page found for {query}"
        except Exception as e:
            logger.error(f"Error searching Wikipedia: {e}")
            return f"Error searching Wikipedia: {str(e)}"
    
    @staticmethod
    def web_search(query: str, max_results: int = 5) -> str:
        """
        Perform web search using DuckDuckGo.
        
        Args:
            query: The search query
            max_results: Maximum number of results to return
            
        Returns:
            Formatted search results
        """
        try:
            ddgs = DDGS()
            results = ddgs.text(query, max_results=max_results)
            
            formatted_results = f"Web search results for '{query}':\n"
            for i, result in enumerate(results, 1):
                formatted_results += f"\n{i}. {result['title']}\n   {result['body']}\n"
            
            return formatted_results
        except Exception as e:
            logger.error(f"Error during web search: {e}")
            return f"Error performing web search: {str(e)}"
    
    @staticmethod
    def search_all_sources(query: str) -> str:
        """
        Search multiple sources for comprehensive information.
        
        Args:
            query: The search query
            
        Returns:
            Combined research results
        """
        results = "=== RESEARCH RESULTS ===\n\n"
        
        # Wikipedia search
        wiki_result = ResearchTool.search_wikipedia(query)
        results += f"[Wikipedia Source]\n{wiki_result}\n\n"
        
        # Web search
        web_result = ResearchTool.web_search(query, max_results=3)
        results += f"[Web Search Results]\n{web_result}\n"
        
        return results


class ContentProcessor:
    """Tool for processing and formatting content."""
    
    @staticmethod
    def extract_key_points(content: str) -> list:
        """
        Extract key points from content.
        
        Args:
            content: The content to process
            
        Returns:
            List of key points
        """
        # Simple implementation - can be enhanced with NLP
        sentences = content.split('.')
        key_points = [s.strip() for s in sentences if len(s.strip()) > 50][:5]
        return key_points
    
    @staticmethod
    def format_blog_section(title: str, content: str, level: int = 1) -> str:
        """
        Format a blog section with markdown heading.
        
        Args:
            title: Section title
            content: Section content
            level: Heading level (1-6)
            
        Returns:
            Formatted section
        """
        heading = "#" * level
        return f"\n{heading} {title}\n\n{content}\n"


def create_langchain_tools():
    """
    Create LangChain tool definitions for the agent.
    This is used by the agent to understand available tools.
    """
    from langchain_core.tools import Tool
    
    tools = [
        Tool(
            name="Wikipedia Search",
            func=ResearchTool.search_wikipedia,
            description="Search Wikipedia for information about a topic. Useful for getting overview and background information."
        ),
        Tool(
            name="Web Search",
            func=ResearchTool.web_search,
            description="Perform web search to find recent information and diverse sources about a topic."
        ),
        Tool(
            name="Research Multiple Sources",
            func=ResearchTool.search_all_sources,
            description="Search multiple sources (Wikipedia and web) for comprehensive information about a topic."
        ),
    ]
    
    return tools
