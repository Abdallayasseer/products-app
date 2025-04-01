import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { GetServerSideProps } from 'next';

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const res = await fetch(`http://localhost:3000/api/products/${id}`);
  const product = await res.json();
  return { props: { product } };
};

export default function ProductDetails({ product }: { product: Product }) {
  const handleDelete = async () => {
    await fetch(`/api/products/${product.id}`, { method: 'DELETE' });
    window.location.href = '/';
  };

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>{product.title} - AQTAR Task</title>
        <meta name="description" content={product.description.slice(0, 150)} />
      </Head>
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <Image
        src={product.image}
        alt={product.title}
        width={300}
        height={300}
        className="object-contain mx-auto mb-4"
      />
      <p className="text-gray-700 mb-4">{product.description}</p>
      <p className="text-lg">
        Price: <span className="font-semibold">${product.price}</span>
      </p>
      <div className="mt-6 space-x-4">
        <Link href={`/product/edit/${product.id}`} className="text-blue-500 hover:underline">
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}