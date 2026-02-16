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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 md:p-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-3 mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600 mb-4 shadow-xl transform hover:scale-110 transition-transform duration-300 cursor-pointer">
            <span className="text-3xl">🤖</span>
          </div>
          <h1 className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 drop-shadow-sm">
            BlogGen AI
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-medium leading-relaxed">
            ✨ Generate professional, AI-powered blogs in seconds • Research • Write • Publish ✨
          </p>
          <div className="flex gap-3 justify-center items-center pt-2">
            <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-semibold">🔥 Powered by GPT-3.5</span>
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold">⚡ 30-60s Generation</span>
          </div>
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
