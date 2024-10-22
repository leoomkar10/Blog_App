// import React, { useState } from 'react';
// import { addDoc, collection } from 'firebase/firestore';
// import { auth, db } from '../../config/firebase';

// const CreatePost = () => {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [error, setError] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!title.trim() || !content.trim()) return;

//     setIsSubmitting(true);
//     try {
//       const user = auth.currentUser;
//       await addDoc(collection(db, 'posts'), {
//         title,
//         content,
//         author: user.email,
//         userId: user.uid,
//         createdAt: new Date().toISOString()
//       });
//       setTitle('');
//       setContent('');
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold mb-6">Create New Post</h2>
//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <input
//             type="text"
//             placeholder="Title"
//             className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>
//         <div>
//           <textarea
//             placeholder="Content"
//             className="w-full p-2 border rounded h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//           />
//         </div>
//         <button 
//           type="submit"
//           disabled={isSubmitting}
//           className={`bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition ${
//             isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
//           }`}
//         >
//           {isSubmitting ? 'Creating...' : 'Create Post'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreatePost;
// 2
import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { Plus } from 'lucide-react';

const CreatePost = () => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsSubmitting(true);
    try {
      const user = auth.currentUser;
      await addDoc(collection(db, 'posts'), {
        title,
        content,
        author: user.email,
        userId: user.uid,
        createdAt: new Date().toISOString()
      });
      setTitle('');
      setContent('');
      setShowModal(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setTitle('');
    setContent('');
    setError('');
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center z-50"
        aria-label="Create new post"
      >
        <Plus className="w-6 h-6 text-white" />
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Create New Post</h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            {error && <p className="text-red-500 mb-4">{error}</p>}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Title"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <textarea
                  placeholder="Content"
                  className="w-full p-2 border rounded h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-gray-500 hover:text-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Creating...' : 'Create Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePost;

