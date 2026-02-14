import axios from 'axios'

const API_BASE = 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const blogApi = {
  // Generate new blog
  generateBlog: async (topic) => {
    const response = await api.post('/generate', { topic })
    return response.data
  },

  // Get all blogs
  getAllBlogs: async () => {
    const response = await api.get('/blogs')
    return response.data
  },

  // Get single blog
  getBlogById: async (id) => {
    const response = await api.get(`/blogs/${id}`)
    return response.data
  },

  // Delete blog
  deleteBlog: async (id) => {
    await api.delete(`/blogs/${id}`)
  },

  // Export blog
  exportBlog: async (id, format = 'md') => {
    const response = await api.get(`/blogs/${id}/export?format=${format}`)
    return response.data
  },
}

export default blogApi
