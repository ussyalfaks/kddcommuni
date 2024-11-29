import React, { useCallback } from 'react';
import { ImagePlus, X } from 'lucide-react';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string | undefined) => void;
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // In a real application, you would upload the file to your server or cloud storage
      // For now, we'll create a local URL for preview
      const url = URL.createObjectURL(file);
      onChange(url);
    } catch (error) {
      console.error('Failed to upload image:', error);
    }
  }, [onChange]);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Add Image (Optional)
      </label>
      
      {value ? (
        <div className="relative">
          <img
            src={value}
            alt="Preview"
            className="h-48 w-full rounded-lg object-cover"
          />
          <button
            type="button"
            onClick={() => onChange(undefined)}
            className="absolute top-2 right-2 rounded-full bg-white p-1 shadow-md hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label className="flex h-48 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400">
          <div className="space-y-1 text-center">
            <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
            <div className="text-sm text-gray-600">
              Click to upload an image
            </div>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
      )}
    </div>
  );
}