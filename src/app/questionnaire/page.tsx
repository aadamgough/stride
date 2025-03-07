'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

// Create Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const questions = [
  {
    id: 1,
    text: "Please enter your email",
    type: "text-input",
    placeholder: "you@email.com"
  },
  {
    id: 2,
    text: "How many forms of traditional cardio workouts do you do?",
    options: ["One", "Two", "Three", "More than three"]
  },
  {
    id: 3,
    text: "What is your preferred workout environment?",
    options: ["Home", "Gym", "Outdoors", "Group Classes"]
  },
  {
    id: 4,
    text: "How open are you to trying new forms of cardio workouts?",
    options: ["Not open", "I would consider trying new forms", "I want to try new forms", "I'm always trying new forms"]
  },
  {
    id: 5,
    text: "If you have a roadblock to being disciplined with your workouts, what is it?",
    options: ["Lack of knowledge", "Lack of time", "Lack of motivation", "Lack of equipment", "N/A"]
  },
  {
    id: 6,
    text: "How would you describe yourself when it comes to fitness?",
    options: ["Casual Mover: I enjoy staying active but do not follow a structured routine.", "Consistent Enthusiast : I work out regularly and prioritize fitness in my lifestyle.", "Goal-Driven Athlete : I train with specific goals in mind, such as performance or competition.", "Rebuilding or Starting Fresh : I am getting back into fitness or just beginning my journey."]
  },
  {
    id: 7,
    text: "Are you active on fitness social media apps (e.g. Strava, Nike Run Club, etc.)?",
    options: ["Yes", "No", "No, but I would be open to it", "No, and I don't plan to start"]
  },
  {
    id: 8,
    text: "How much would you be willing to pay for access to a personal trainer who guides you through a workout, where you'd also be able to track your stats, progress, and discover new workouts?",
    options: ["$0/month", "$10/month", "$20/month", "$30/month"]
  },
]


export default function QuestionnairePage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: answer
    }))
  }

  const handleNext = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      // Format responses for Supabase
      const formattedResponses = questions.map(q => ({
        question: q.text,
        answer: answers[q.id]
      }))

      setIsSubmitting(true)
      try {
        const { error } = await supabase
          .from('questionnaire_responses')
          .insert([{ responses: formattedResponses }])

        if (error) throw error
        router.push('/')
      } catch (error) {
        console.error('Error submitting responses:', error)
        alert('There was an error submitting your responses. Please try again.')
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-4 sm:py-8">
        <button 
          onClick={() => router.push('/')} 
          className="mb-4 sm:mb-8 text-sm sm:text-base text-white/60 hover:text-white"
        >
          ← Back
        </button>
        
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Product Questionnaire</h1>
          
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-lg sm:text-xl mb-3 sm:mb-4">{questions[currentQuestion].text}</h2>
            
            <div className="space-y-2 sm:space-y-3">
              {questions[currentQuestion].type === "text-input" ? (
                <input
                  type="text"
                  placeholder={questions[currentQuestion].placeholder}
                  value={answers[questions[currentQuestion].id] || ''}
                  onChange={(e) => handleAnswer(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full p-3 sm:p-4 text-base sm:text-lg rounded-lg bg-white/10 text-white 
                    placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 
                    transition disabled:opacity-50 disabled:cursor-not-allowed"
                />
              ) : (
                questions[currentQuestion].options?.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    disabled={isSubmitting}
                    className={`w-full p-3 sm:p-4 text-sm sm:text-base text-left rounded-lg transition
                      ${answers[questions[currentQuestion].id] === option 
                        ? 'bg-white/30' 
                        : 'bg-white/10 hover:bg-white/20'}
                      disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {option}
                  </button>
                ))
              )}
            </div>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
              <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                {currentQuestion > 0 && (
                  <button
                    onClick={handlePreviousQuestion}
                    className="px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg bg-white/10 hover:bg-white/20 transition"
                  >
                    Previous
                  </button>
                )}
                <div className="text-xs sm:text-sm text-gray-400">
                  Question {currentQuestion + 1} of {questions.length}
                </div>
              </div>

              <button
                onClick={handleNext}
                disabled={!answers[questions[currentQuestion].id] || isSubmitting}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 text-sm sm:text-base rounded-lg 
                  bg-white/10 hover:bg-white/20 transition disabled:opacity-50 
                  disabled:cursor-not-allowed"
              >
                {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
              </button>
            </div>

            <div className="w-full h-1.5 sm:h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white/30 transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}