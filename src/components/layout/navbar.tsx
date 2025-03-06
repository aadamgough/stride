import Link from "next/link"
import Image from "next/image"

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* Replace with your actual logo */}
          <Image 
            src="/images/logo.png"
            alt="Stride Logo"
            width={32}
            height={32}
          />
          <span className="font-bold text-xl">Stride</span>
        </div>
        
        <Link 
          href="/questionnaire"
          className="px-4 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition"
        >
          Product Questionnaire
        </Link>
      </div>
    </nav>
  )
}