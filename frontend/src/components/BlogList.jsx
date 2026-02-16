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
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
            <span className="text-3xl">📚</span>Your Blogs
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-base">
            {blogs.length} blog{blogs.length !== 1 ? 's' : ''} generated • Total {blogs.reduce((acc, b) => acc + b.content.length, 0).toLocaleString()} characters
          </p>
        </div>
        <div className="px-6 py-3 bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-indigo-900 dark:to-blue-900 text-indigo-800 dark:text-indigo-100 rounded-2xl font-bold text-xl shadow-lg">
          {blogs.length}
        </div>
      </div>

      <div className="relative">
        <Input
          placeholder="🔍 Search blogs by title or content..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="text-base py-7 pl-4 border-2 border-indigo-200 dark:border-indigo-800 focus:border-indigo-500 dark:focus:border-indigo-500 rounded-xl shadow-sm"
        />
        {searchTerm && (
          <button
            onClick={() => handleSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            ✕
          </button>
        )}
      </div>

      {loading ? (
        <div className="text-center py-16">
          <div className="inline-block">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600 shadow-lg"></div>
            <p className="mt-6 text-gray-600 dark:text-gray-400 text-lg font-medium">Loading your blogs...</p>
          </div>
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="text-center py-20 px-6">
          <div className="inline-block p-6 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-3xl mb-6">
            <div className="text-7xl mb-2">📝</div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-xl font-semibold mb-2">
            {blogs.length === 0
              ? 'No blogs yet'
              : 'No blogs match your search'}
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            {blogs.length === 0
              ? 'Create your first blog using the form on the left!'
              : 'Try a different search term'}
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
