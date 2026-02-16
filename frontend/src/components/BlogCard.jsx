import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Copy, Download, Trash2, Eye } from 'lucide-react'
import blogApi from '@/api/blogApi'

export function BlogCard({ blog, onDelete, onView }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(blog.content)
    alert('✅ Blog copied to clipboard!')
  }

  const handleDownload = async () => {
    try {
      const data = await blogApi.exportBlog(blog.id, 'md')
      const element = document.createElement('a')
      element.href =
        'data:text/markdown;charset=utf-8,' + encodeURIComponent(data.content)
      element.download = `${blog.title}.md`
      element.click()
    } catch (err) {
      console.error('Download failed:', err)
      alert('Failed to download blog')
    }
  }

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogApi.deleteBlog(blog.id)
        if (onDelete) {
          onDelete(blog.id)
        }
      } catch (err) {
        console.error('Delete failed:', err)
        alert('Failed to delete blog')
      }
    }
  }

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    } catch {
      return 'Unknown date'
    }
  }

  return (
    <Card className="p-6 hover:shadow-2xl transition-all duration-300 border-l-4 border-l-indigo-600 hover:border-l-blue-600 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:scale-[1.02] group">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1 min-w-0">
            <h3
              className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group-hover:underline decoration-indigo-500 decoration-2 underline-offset-4"
              onClick={() => onView && onView(blog)}
            >
              {blog.title}
            </h3>
          </div>
          <Badge variant="secondary" className="whitespace-nowrap bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200">
            📅 {formatDate(blog.createdAt)}
          </Badge>
        </div>

        {/* Preview */}
        <p className="text-gray-600 dark:text-gray-300 line-clamp-3 text-sm leading-relaxed">
          {blog.content.substring(0, 150).replace(/#/g, '').trim()}...
        </p>

        {/* Stats */}
        <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-400 py-3 px-4 bg-gradient-to-r from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-900/20 rounded-lg">
          <span className="flex items-center gap-2 font-medium">
            <span className="text-base">📖</span> {Math.ceil(blog.content.length / 200)} min read
          </span>
          <span className="flex items-center gap-2 font-medium">
            <span className="text-base">📝</span> {blog.content.length.toLocaleString()} chars
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 flex-wrap pt-2">
          <Button
            variant="default"
            size="sm"
            onClick={() => onView && onView(blog)}
            className="flex-1 bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 hover:from-indigo-700 hover:via-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transform hover:scale-105 transition-all font-semibold"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Full Blog
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            title="Copy to clipboard"
            className="hover:bg-indigo-50"
          >
            <Copy className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            title="Download as markdown"
            className="hover:bg-blue-50"
          >
            <Download className="w-4 h-4" />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            title="Delete blog"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
