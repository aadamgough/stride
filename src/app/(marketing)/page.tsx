'use client'

import { useRouter } from 'next/navigation'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import WaveBackground from "@/components/marketing/wave"
import { motion } from 'framer-motion'
import { createClient } from '@supabase/supabase-js'
import { useState } from 'react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)


export default function LandingPage() {
    const router = useRouter();
    const [email, setEmail] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isJoined, setIsJoined] = useState(false)

    const handleWaitlistSubmit = async () => {
        if (!email || isSubmitting) return
    
        setIsSubmitting(true)
        try {
          const { error } = await supabase
            .from('waitlist')
            .insert([{ email }])
    
          if (error) throw error
          
          setIsJoined(true)
          setEmail('')
        } catch (error) {
          console.error('Error submitting to waitlist:', error)
          alert('There was an error joining the waitlist. Please try again.')
        } finally {
          setIsSubmitting(false)
        }
      }

  return (
    <main className="min-h-screen relative overflow-hidden">
      <WaveBackground />
      {/* Content */}
      <div className="container mx-auto px-4">
        {/* Navbar - now mobile responsive */}
        <div className="flex justify-between items-center h-16 pt-4">
            <div className="flex items-center space-x-2">
                <div className="relative w-6 h-6 sm:w-8 sm:h-8">
                    <Image
                        src="https://res.cloudinary.com/dmsgmyybq/image/upload/v1741297817/image_mbquew.png"
                        alt="Stride logo"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
                <span className="text-lg sm:text-xl text-white" style={{ fontFamily: 'var(--font-lexend-zetta)' }}>Stride</span>
            </div>
          
            <button 
                onClick={() => router.push('/questionnaire')}
                className="text-sm sm:text-base px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition"
            >
                Product Questionnaire
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center pt-8 sm:pt-16">
          {/* Left Column */}
          <div className="space-y-8 md:space-y-12 fade-in">
            <div>
            <h1 className="text-3xl font-bold sm:text-4xl mb-4 sm:mb-6 text-white">
              Move the way you&apos;re meant to
              </h1>
              <p className="text-base sm:text-lg text-gray-300">
              Stride puts movement first with audio-guided cardio workouts led by 
              expert athletes and coaches. Whether you&apos;re running, rucking, hiking, 
              rowing, or paddling, our workouts adapt to your skill level—helping you 
              stay motivated and track your progress. At the heart of Stride, we aim to 
              reshape movement into a way of life, inspiring a deeper connection to the 
              world around us.
              </p>
            </div>
            
            <div className="relative w-full max-w-[280px] sm:max-w-sm aspect-[9/16] mx-auto">
              <motion.div
                className="absolute inset-0"
                whileHover={{
                    scale: 1.025,
                    filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.3))',
                    transition: { duration: 0.3 }
                }}
              >
                <Image
                  src="https://res.cloudinary.com/dmsgmyybq/image/upload/v1741287961/iMockup_-_iPhone_15_Pro_Max_rphey1.png"
                  alt="App mockup"
                  fill
                  className="object-contain transition-all duration-300"
                  style={{ 
                    filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.2))'
                  }}
                />
              </motion.div>
            </div>
          </div>

          <div className="space-y-8 md:space-y-12 fade-in pt-8 md:pt-16" style={{ animationDelay: '0.2s' }}>
          <div className="my-34 md:my-38"></div>
            <div>
              <h2 className="text-3xl sm:text-3xl mb-2 sm:mb-3 text-white">
                What do you get with Stride?
              </h2>
              <br></br>
              <div className="flex items-center gap-2 mb-2">
                <Image src="https://res.cloudinary.com/dmsgmyybq/image/upload/v1741392971/Vector_2_n66pid.png" alt="Guided workouts" width={24} height={24} className="text-white" />
                <h1 className="text-1xl sm:text-1xl text-white">
                  Guided workouts
                </h1>
              </div>
              <p className="text-gray-300">
                Explore the coaching styles of our expert athletes in your ear as they motivate and guide you through workouts that range in duration and intensity.
              </p>
              <br/>

              {/* Progress tracking section */}
              <div className="flex items-center gap-2 mb-2">
                <Image src="https://res.cloudinary.com/dmsgmyybq/image/upload/v1741392971/Group_sogd0p.png" alt="Progress tracking" width={24} height={24} className="w-6 h-6 text-white" />
                <h1 className="text-1xl sm:text-1xl text-white">
                  Progress tracking
                </h1>
              </div>
              <p className="text-gray-300">
                Monitor your progress with AI-powered tracking tools that analyze your performance, adapt to your goals, and provide personalized insights to keep you moving forward.
              </p>
              <br/>

              {/* Diverse workout section */}
              <div className="flex items-center gap-2 mb-2">
                <Image src="https://res.cloudinary.com/dmsgmyybq/image/upload/v1741392971/Vector_3_h622ll.png" alt="Diverse workout selection" width={24} height={24} className="w-6 h-6 text-white" />
                <h1 className="text-1xl sm:text-1xl text-white">
                  Diverse workout selection
                </h1>
              </div>
              <p className="text-gray-300">
                Awaken your body to new experiences through Stride&apos;s diverse set of workouts to help you seek adventure, push your boundaries, and build consistency.
              </p>
              <br/>
            </div>

            <div>
            <h2 className="text-3xl sm:text-3xl mb-2 sm:mb-3 text-white">
              Get early access
            </h2>
              <p className="text-gray-300">
              Join the waitlist today to be among the first to try Stride. Once you sign up, you&apos;ll 
              unlock access to download the demo.
              </p>
            </div>

            {/* Waitlist Form */}
            <div>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2">
                  <Input 
                    type="email" 
                    placeholder="you@email.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting||isJoined}
                    className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                  <Button 
                    onClick={handleWaitlistSubmit}
                    disabled={!email || isSubmitting || isJoined}
                    className={`${
                      isJoined 
                        ? 'bg-green-500 hover:bg-green-600' 
                        : 'bg-white hover:bg-gray-200'
                    } text-black transition-colors w-full sm:w-auto`}
                  >
                    {isJoined ? 'Joined!' : 'Join Waitlist'}
                  </Button>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full bg-white hover:bg-gray-200 text-black border-0"
                  onClick={() => {
                    const audioUrl = '/audio/demo.mp3'
                    const link = document.createElement('a')
                    link.href = audioUrl
                    link.download = 'stride-demo.mp3'
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                  }}
                >
                  Download Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-20 md:my-28"></div>
    </main>
  )
}

