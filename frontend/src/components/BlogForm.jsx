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
    <Card className="p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-indigo-100 dark:border-indigo-900/50 sticky top-8 hover:shadow-indigo-200 dark:hover:shadow-indigo-900/50 transition-all duration-300">
      <div className="space-y-6">
        {/* Header */}
        <div className="relative">
          <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl opacity-20 blur-lg"></div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 relative">
            <span className="text-3xl">✨</span>
            <span>Create New Blog</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            Enter any topic and let AI create a professional blog using research and GPT-3.5
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
            className="w-full py-7 text-base font-bold bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 hover:from-indigo-700 hover:via-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl hover:scale-105 transform"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <LoadingSpinner />
                <span className="font-semibold">Generating Blog... (30-60s)</span>
              </span>
            ) : (
              <span className="flex items-center justify-center gap-3">
                <span className="text-xl">🚀</span>
                <span>Generate Blog with AI</span>
              </span>
            )}
          </Button>

          {loading && (
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl text-blue-700 dark:text-blue-300 text-sm text-center animate-pulse">
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <span>🔬</span>
                  <span className="font-semibold">AI Research in Progress...</span>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Searching Wikipedia & Web • Analyzing Data • Writing Content</div>
              </div>
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
