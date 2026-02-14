import { useState, useEffect } from 'react'
import { BlogCard } from './BlogCard'
import { Input } from '@/components/ui/input'
import blogApi from '@/api/blogApi'

export function BlogList({ refresh, onViewBlog }) {
  const [blogs, setBlogs] = useState([])
  const [filteredBlogs, setFilteredBlogs] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBlogs()
  }, [refresh])

  const loadBlogs = async () => {
    try {
      setLoading(true)
      const data = await blogApi.getAllBlogs()
      setBlogs(data)
      setFilteredBlogs(data)
    } catch (err) {
      console.error('Failed to load blogs:', err)
      alert('Failed to load blogs')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
    setFilteredBlogs(
      blogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(term.toLowerCase()) ||
          blog.content.toLowerCase().includes(term.toLowerCase())
      )
    )
  }

  const handleDelete = (id) => {
    setBlogs(blogs.filter((b) => b.id !== id))
    setFilteredBlogs(filteredBlogs.filter((b) => b.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Your Blogs</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {blogs.length} blog{blogs.length !== 1 ? 's' : ''} generated
          </p>
        </div>
        <div className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-100 rounded-full font-semibold">
          {blogs.length}
        </div>
      </div>

      <Input
        placeholder="🔍 Search blogs by title or content..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        className="text-base py-6"
      />

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your blogs...</p>
          </div>
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📝</div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {blogs.length === 0
              ? 'No blogs yet. Create your first one!'
              : 'No blogs match your search.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
          {filteredBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              onDelete={handleDelete}
              onView={onViewBlog}
            />
          ))}
        </div>
      )}
    </div>
  )
}
