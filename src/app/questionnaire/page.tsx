'use client'

import { useRouter } from 'next/navigation'

export default function QuestionnairePage() {
  const router = useRouter()

  const questions = [
    
  ]
  
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={() => router.push('/')} 
          className="mb-8 text-white/60 hover:text-white"
        >
          ← Back
        </button>
        
        <h1 className="text-3xl font-bold mb-6">Product Questionnaire</h1>
        
        
      </div>
    </main>
  )
}