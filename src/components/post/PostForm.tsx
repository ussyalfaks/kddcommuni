import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { ImageUpload } from './ImageUpload';
import { LocationSelect } from './LocationSelect';
import { useCreatePost } from '../../hooks/usePosts';

interface PostFormProps {
  onSuccess?: () => void;
}

export function PostForm({ onSuccess }: PostFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [isAnonymous, setIsAnonymous] = useState(false);
  const createPost = useCreatePost();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !location) return;

    // Create a FormData object
    const formData = new FormData();
    formData.append('title', title.trim());
    formData.append('description', description.trim());
    formData.append('location', location);
    if (imageUrl) {
      formData.append('imageUrl', imageUrl);
    }
    formData.append('anonymous', isAnonymous.toString());

    try {
      await createPost.mutate(formData, {
        onSuccess: () => {
          onSuccess?.();
        },
      });
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="What's the issue?"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Provide more details about the issue..."
          required
        />
      </div>

      <LocationSelect value={location} onChange={setLocation} />

      <ImageUpload value={imageUrl} onChange={setImageUrl} />

      <div className="flex items-center">
        <input
          type="checkbox"
          id="anonymous"
          checked={isAnonymous}
          onChange={(e) => setIsAnonymous(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-700">
          Post anonymously
        </label>
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="submit"
          disabled={createPost.isLoading || !title.trim() || !description.trim() || !location}
        >
          {createPost.isLoading ? 'Creating...' : 'Create Report'}
        </Button>
      </div>
    </form>
  );
}
