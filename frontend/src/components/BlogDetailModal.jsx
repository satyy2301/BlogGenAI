import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export function BlogDetailModal({ blog, isOpen, onClose }) {
  if (!isOpen || !blog) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6 flex justify-between items-start gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
            <p className="text-indigo-100">
              {new Date(blog.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-lg p-2 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="prose prose-sm max-w-none">
            {blog.content.split('\n').map((paragraph, idx) => {
              if (paragraph.trim().startsWith('#')) {
                const level = paragraph.match(/^#+/)[0].length
                const text = paragraph.replace(/^#+\s/, '')
                if (level === 1) {
                  return (
                    <h1 key={idx} className="text-3xl font-bold mt-6 mb-4 text-gray-900">
                      {text}
                    </h1>
                  )
                } else if (level === 2) {
                  return (
                    <h2 key={idx} className="text-2xl font-semibold mt-6 mb-3 text-gray-800">
                      {text}
                    </h2>
                  )
                } else if (level === 3) {
                  return (
                    <h3 key={idx} className="text-xl font-semibold mt-4 mb-2 text-gray-700">
                      {text}
                    </h3>
                  )
                }
              }

              if (paragraph.trim().startsWith('-') || paragraph.trim().startsWith('•')) {
                return (
                  <li key={idx} className="ml-6 mb-2 text-gray-700 list-disc">
                    {paragraph.replace(/^[-•]\s/, '')}
                  </li>
                )
              }

              if (paragraph.trim()) {
                return (
                  <p key={idx} className="text-gray-700 mb-4 leading-relaxed">
                    {paragraph.trim()}
                  </p>
                )
              }

              return null
            })}
          </div>

          {/* Footer Stats */}
          <div className="border-t mt-8 pt-6 flex gap-6 text-sm text-gray-600">
            <div>
              <span className="font-semibold">📝 Characters:</span> {blog.content.length}
            </div>
            <div>
              <span className="font-semibold">⏱️ Read Time:</span> {Math.ceil(blog.content.length / 200)} min
            </div>
            <div>
              <span className="font-semibold">📅 Created:</span>{' '}
              {new Date(blog.createdAt).toLocaleString()}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="border-t bg-gray-50 p-6 flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(blog.content)
              alert('Blog copied to clipboard!')
            }}
          >
            Copy Blog
          </Button>
        </div>
      </Card>
    </div>
  )
}
