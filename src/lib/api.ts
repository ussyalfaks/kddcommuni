import axios from 'axios';

const API_URL = 'https://server-two-smoky.vercel.app/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const adminApi = {
  register: async (email: string, password: string) => {
    const response = await api.post('/admin/auth/register', { email, password });
    return response.data;
  },
  
  login: async (email: string, password: string) => {
    const response = await api.post('/admin/auth/login', { email, password });
    return response.data;
  },

  getStats: async () => {
    const response = await api.get('/admin/stats');
    return response.data;
  },

  getRecentPosts: async () => {
    const response = await api.get('/admin/posts/recent');
    return response.data;
  },

  getReportedContent: async () => {
    const response = await api.get('/admin/reports');
    return response.data;
  },

  approveReport: async (reportId: string) => {
    const response = await api.post(`/admin/reports/${reportId}/approve`);
    return response.data;
  },

  rejectReport: async (reportId: string) => {
    const response = await api.post(`/admin/reports/${reportId}/reject`);
    return response.data;
  }
};

export const postsApi = {
  getPosts: async (params?: { location?: string; search?: string }) => {
    const response = await api.get('/posts', { params });
    return response.data;
  },

  getPost: async (id: string) => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },

  createPost: async (data: {
    title: string;
    description: string;
    location: string;
    imageUrl?: string;
    anonymous: boolean;
  }) => {
    const response = await api.post('/posts', data);
    return response.data;
  },

  likePost: async (id: string) => {
    const response = await api.post(`/posts/${id}/like`);
    return response.data;
  },

  reportPost: async (id: string, reason: string) => {
    const response = await api.post(`/posts/${id}/report`, { reason });
    return response.data;
  },
};

export const commentsApi = {
  getComments: async (postId: string) => {
    const response = await api.get(`/comments/${postId}`);
    return response.data;
  },

  createComment: async (postId: string, data: { content: string; anonymous: boolean }) => {
    const response = await api.post(`/comments/${postId}`, data);
    return response.data;
  },
};