import { useState } from 'react'
import { BlogForm } from '@/components/BlogForm'
import { BlogList } from '@/components/BlogList'
import { BlogDetailModal } from '@/components/BlogDetailModal'

export function Dashboard() {
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [selectedBlog, setSelectedBlog] = useState(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const handleBlogGenerated = (blog) => {
    // Refresh the blog list
    setRefreshTrigger((prev) => prev + 1)
  }

  const handleViewBlog = (blog) => {
    setSelectedBlog(blog)
    setIsDetailOpen(true)
  }

  const handleCloseDetail = () => {
    setIsDetailOpen(false)
    setTimeout(() => setSelectedBlog(null), 300)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-blue-600 mb-4">
            <span className="text-2xl">📚</span>
          </div>
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600">
            Blog Generation System
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Generate professional, AI-powered blogs in seconds. Research, write, and publish with a single click.
          </p>
        </div>

        {/* Layout: Form on left, List on right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <BlogForm onBlogGenerated={handleBlogGenerated} />
          </div>

          {/* Blogs List Section */}
          <div className="lg:col-span-2">
            <BlogList refresh={refreshTrigger} onViewBlog={handleViewBlog} />
          </div>
        </div>
      </div>

      {/* Blog Detail Modal */}
      <BlogDetailModal blog={selectedBlog} isOpen={isDetailOpen} onClose={handleCloseDetail} />
    </div>
  )
}
