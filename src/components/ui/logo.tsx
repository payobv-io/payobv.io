import Link from 'next/link';

export const Logo = () => {
  return (
    <Link
      className="mb-2 flex items-end justify-center rounded-md p-4"
      href="/"
    >
      <div className="w-32 md:w-40 flex text-2xl justify-center font-bold">
        <span>payobv.</span>
        <span className="text-blue-600">io</span>
      </div>
    </Link>
  );
};
