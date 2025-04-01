'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Use next/router for Pages Router
import Head from 'next/head';

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query; // Access id from router.query
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (!id) return; // Wait until id is available from router.query

    async function fetchProduct() {
      const res = await fetch(`/api/products/${id}`);
      if (!res.ok) {
        console.error('Failed to fetch product');
        return;
      }
      const data = await res.json();
      setTitle(data.title);
      setPrice(data.price.toString());
      setDescription(data.description);
      setImage(data.image);
      setCategory(data.category);
    }
    fetchProduct();
  }, [id]); // Dependency on id

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, price, description, image, category }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      router.push(`/product/${id}`);
    } else {
      alert('Failed to update product');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Edit Product - AQTAR Task</title>
        <meta name="description" content="Edit an existing product" />
      </Head>
      <h1 className="text-3xl font-bold mb-4">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border p-2 w-full rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="border p-2 w-full rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="border p-2 w-full rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            className="border p-2 w-full rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="border p-2 w-full rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}