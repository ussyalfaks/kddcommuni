export interface Post {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  location: string;
  likes: number;
  comments: number;
  reports: number;
  createdAt: Date;
  anonymous: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  parentId?: string;
  content: string;
  createdAt: Date;
  anonymous: boolean;
  author?: {
    id: string;
    name: string;
  };
  reactions: {
    like: number;
    helpful: number;
    insightful: number;
  };
  status: 'pending' | 'approved' | 'rejected';
  replies?: Comment[];
}

export type CommentReaction = 'like' | 'helpful' | 'insightful';

export interface CommentSort {
  field: 'createdAt' | 'reactions.like' | 'reactions.helpful' | 'reactions.insightful';
  order: 'asc' | 'desc';
}