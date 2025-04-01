import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { GetServerSideProps } from 'next';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/api/products');
  const products = await res.json();
  return { props: { products } };
};

export default function Home({ products }: { products: Product[] }) {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Products - AQTAR Task</title>
        <meta name="description" content="Browse our collection of products" />
      </Head>
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      <Link href="/product/new" className="text-blue-500 mb-4 inline-block hover:underline">
        Add New Product
      </Link>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id}>
              <div className="border rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={100}
                  height={100}
                  className="object-contain mx-auto"
                />
                <h2 className="text-lg font-semibold mt-2 truncate">{product.title}</h2>
                <p className="text-gray-600">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}