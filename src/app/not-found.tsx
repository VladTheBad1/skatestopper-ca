import Link from 'next/link'
export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#FAFAFA] px-6">
      <div className="text-center max-w-lg">
        <p className="text-6xl font-extrabold text-[#1B5E20] mb-4">404</p>
        <h1 className="text-2xl font-bold text-[#1e293b] mb-4">
          Page Not Found
        </h1>
        <p className="text-[#64748b] mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-[#1B5E20] hover:bg-[#0D3B13] text-white rounded-xl font-semibold transition-all"
          >
            Go Home
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 bg-white border border-gray-200 hover:border-[#1B5E20] text-[#1e293b] rounded-xl font-semibold transition-all"
          >
            Contact Us
          </Link>
          <Link
            href="/cities"
            className="px-6 py-3 bg-white border border-gray-200 hover:border-[#1B5E20] text-[#1e293b] rounded-xl font-semibold transition-all"
          >
            Service Areas
          </Link>
        </div>
      </div>
    </main>
  )
}
