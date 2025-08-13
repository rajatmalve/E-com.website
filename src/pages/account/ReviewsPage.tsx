import React, { useMemo, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

type Review = {
  id: number;
  productId: number;
  productName: string;
  rating: number;
  comment: string;
  date: string;
};

export default function ReviewsPage() {
  const { isAuthenticated } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [productName, setProductName] = useState('');

  const reviews = useMemo<Review[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('reviews') || '[]');
    } catch {
      return [];
    }
  }, []);

  if (!isAuthenticated) return <Navigate to="/" replace />;

  const addReview = (e: React.FormEvent) => {
    e.preventDefault();
    const newReview: Review = {
      id: Date.now(),
      productId: Math.floor(Math.random() * 1000),
      productName: productName || 'Product',
      rating,
      comment,
      date: new Date().toISOString(),
    };
    const existing = JSON.parse(localStorage.getItem('reviews') || '[]');
    existing.unshift(newReview);
    localStorage.setItem('reviews', JSON.stringify(existing));
    setComment('');
    setProductName('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">My Reviews</h1>
      <form onSubmit={addReview} className="bg-white p-4 rounded-xl border mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input className="px-3 py-2 border rounded-lg md:col-span-2" placeholder="Product name" value={productName} onChange={(e) => setProductName(e.target.value)} />
        <select className="px-3 py-2 border rounded-lg" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Star{r>1?'s':''}</option>)}
        </select>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Add Review</button>
        <textarea className="px-3 py-2 border rounded-lg md:col-span-4" placeholder="Write your comment..." value={comment} onChange={(e) => setComment(e.target.value)} />
      </form>

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-gray-600">You haven't posted any reviews yet.</p>
        ) : (
          reviews.map((rev) => (
            <div key={rev.id} className="bg-white p-4 rounded-xl border">
              <div className="flex justify-between text-sm text-gray-500">
                <span>{new Date(rev.date).toLocaleString()}</span>
                <span>{rev.rating}★</span>
              </div>
              <div className="font-semibold">{rev.productName}</div>
              <div className="text-gray-700">{rev.comment}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}


