import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product = await response.json();
    res.status(200).json(product);
  } else if (req.method === 'PUT') {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(req.body),
      headers: { 'Content-Type': 'application/json' },
    });
    const updatedProduct = await response.json();
    res.status(200).json(updatedProduct);
  } else if (req.method === 'DELETE') {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    res.status(200).json(result);
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}