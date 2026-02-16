import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export function BlogDetailModal({ blog, isOpen, onClose }) {
  if (!isOpen || !blog) return null

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <Card 
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white shadow-2xl rounded-2xl animate-slide-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 text-white p-8 flex justify-between items-start gap-4 shadow-lg z-10">
          <div className="flex-1">
            <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold mb-3">
              🎉 AI Generated Blog
            </div>
            <h1 className="text-4xl font-extrabold mb-3 leading-tight">{blog.title}</h1>
            <div className="flex items-center gap-4 text-indigo-100">
              <span className="flex items-center gap-2">
                <span>📅</span>
                {new Date(blog.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-2">
                <span>📖</span>
                {Math.ceil(blog.content.length / 200)} min read
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-xl p-3 transition-all hover:scale-110 transform"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-10 bg-gradient-to-b from-white to-gray-50">
          <div className="prose prose-lg max-w-none">
            {blog.content.split('\n').map((paragraph, idx) => {
              if (paragraph.trim().startsWith('#')) {
                const level = paragraph.match(/^#+/)[0].length
                const text = paragraph.replace(/^#+\s/, '')
                if (level === 1) {
                  return (
                    <h1 key={idx} className="text-4xl font-extrabold mt-8 mb-6 text-gray-900 border-b-4 border-indigo-500 pb-3">
                      {text}
                    </h1>
                  )
                } else if (level === 2) {
                  return (
                    <h2 key={idx} className="text-3xl font-bold mt-8 mb-4 text-gray-800 flex items-center gap-3">
                      <span className="w-2 h-8 bg-gradient-to-b from-indigo-500 to-blue-500 rounded-full"></span>
                      {text}
                    </h2>
                  )
                } else if (level === 3) {
                  return (
                    <h3 key={idx} className="text-2xl font-semibold mt-6 mb-3 text-gray-700">
                      {text}
                    </h3>
                  )
                }
              }

              if (paragraph.trim().startsWith('-') || paragraph.trim().startsWith('•')) {
                return (
                  <li key={idx} className="ml-6 mb-3 text-gray-700 list-disc text-lg leading-relaxed">
                    {paragraph.replace(/^[-•]\s/, '')}
                  </li>
                )
              }

              if (paragraph.trim()) {
                return (
                  <p key={idx} className="text-gray-700 mb-5 leading-loose text-lg">
                    {paragraph.trim()}
                  </p>
                )
              }

              return null
            })}
          </div>

          {/* Footer Stats */}
          <div className="border-t-2 border-indigo-100 mt-10 pt-8 grid grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl">
              <div className="text-3xl mb-2">📝</div>
              <div className="text-2xl font-bold text-gray-900">{blog.content.length.toLocaleString()}</div>
              <div className="text-sm text-gray-600 font-medium">Characters</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
              <div className="text-3xl mb-2">⏱️</div>
              <div className="text-2xl font-bold text-gray-900">{Math.ceil(blog.content.length / 200)}</div>
              <div className="text-sm text-gray-600 font-medium">Minutes Read</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl">
              <div className="text-3xl mb-2">📅</div>
              <div className="text-sm font-bold text-gray-900">{new Date(blog.createdAt).toLocaleDateString()}</div>
              <div className="text-sm text-gray-600 font-medium">Created At</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="border-t-2 border-gray-200 bg-gradient-to-r from-gray-50 to-indigo-50 p-8 flex gap-4 justify-end">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="px-8 py-6 text-base font-semibold hover:bg-white transition-all"
          >
            Close
          </Button>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(blog.content)
              alert('✅ Blog copied to clipboard!')
            }}
            className="px-8 py-6 text-base font-semibold bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 hover:from-indigo-700 hover:via-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            📋 Copy Blog
          </Button>
        </div>
      </Card>
    </div>
  )
}
