import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 handwriting mb-4">PrintEase</h1>
        <p className="text-xl text-gray-600 mb-8">Your Digital Printing Partner</p>
        <div className="space-x-4">
          <Link href="/auth/signin" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors">
            Sign In
          </Link>
          <Link href="/auth/signup" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-xl font-semibold transition-colors">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}