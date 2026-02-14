import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { LoadingSpinner } from './LoadingSpinner'
import blogApi from '@/api/blogApi'

export function BlogForm({ onBlogGenerated }) {
  const [topic, setTopic] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!topic.trim()) {
      setError('Please enter a topic')
      return
    }

    setLoading(true)
    setError('')

    try {
      const result = await blogApi.generateBlog(topic)
      setTopic('')
      if (onBlogGenerated) {
        onBlogGenerated(result)
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to generate blog')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border-0 sticky top-8">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            ✨ Generate Blog
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            Enter any topic and let AI create a professional blog
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Blog Topic
            </label>
            <Input
              placeholder="e.g., Machine Learning in Healthcare, Climate Change Solutions..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={loading}
              className="text-base py-6 border-2 border-gray-200 dark:border-gray-700 focus:border-indigo-500 dark:focus:border-indigo-500 transition"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm">
              ⚠️ {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full py-6 text-base font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-lg transition-all duration-300 disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <LoadingSpinner />
                <span>Generating Blog... (30-60s)</span>
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span>🚀</span>
                <span>Generate Blog</span>
              </span>
            )}
          </Button>

          {loading && (
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg text-blue-700 dark:text-blue-300 text-sm text-center">
              🔬 Researching your topic... 📝 Writing the blog...
            </div>
          )}
        </form>

        {/* Tips */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">💡 Tips:</p>
          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            <li>• Be specific: "AI in Healthcare" &gt; "AI"</li>
            <li>• Generation takes 30-60 seconds</li>
            <li>• Your blogs are auto-saved</li>
          </ul>
        </div>
      </div>
    </Card>
  )
}
