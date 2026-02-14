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
    <Card className="p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-l-indigo-600 hover:border-l-indigo-700">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1 min-w-0">
            <h3
              className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 cursor-pointer hover:text-indigo-600 transition"
              onClick={() => onView && onView(blog)}
            >
              {blog.title}
            </h3>
          </div>
          <Badge variant="secondary" className="whitespace-nowrap">
            {formatDate(blog.createdAt)}
          </Badge>
        </div>

        {/* Preview */}
        <p className="text-gray-600 dark:text-gray-300 line-clamp-3 text-sm leading-relaxed">
          {blog.content.substring(0, 150).replace(/#/g, '').trim()}...
        </p>

        {/* Stats */}
        <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400 py-3 border-t border-b border-gray-200 dark:border-gray-700">
          <span className="flex items-center gap-1">
            📖 {Math.ceil(blog.content.length / 200)} min
          </span>
          <span className="flex items-center gap-1">
            📝 {blog.content.length} chars
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 flex-wrap pt-2">
          <Button
            variant="default"
            size="sm"
            onClick={() => onView && onView(blog)}
            className="flex-1 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700"
          >
            <Eye className="w-4 h-4 mr-1" />
            View Full
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
