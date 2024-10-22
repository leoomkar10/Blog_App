import React from 'react';
import { auth } from '../../config/firebase';

const BlogPost = ({ post, onDelete }) => {
  const isOwner = auth.currentUser?.uid === post.userId;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4 hover:shadow-lg transition">
      <h2 className="text-xl font-bold mb-2">{post.title}</h2>
      <p className="text-gray-600 mb-4 whitespace-pre-wrap">{post.content}</p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>By {post.author}</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
      {isOwner && (
        <button
          onClick={() => onDelete(post.id)}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default BlogPost;

