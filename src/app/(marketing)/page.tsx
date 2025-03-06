'use client'

import { Navbar } from "../../components/layout/navbar"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LandingPage() {
  return (
    <main className="min-h-screen relative">
      <Navbar />
      
      {/* Background Images */}
      <div className="fixed inset-0 -z-10">
        <div className="w-full h-[50vh]">
          <Image
            src="/images/top-bg.jpg"
            alt="Background top"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="w-full h-[50vh] flex">
          <div className="w-1/2 h-full relative">
            <Image
              src="/images/bottom-left-bg.jpg"
              alt="Background bottom left"
              fill
              className="object-cover"
            />
          </div>
          <div className="w-1/2 h-full relative">
            <Image
              src="/images/bottom-right-bg.jpg"
              alt="Background bottom right"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pt-24">
        <div className="grid grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg">
              <h1 className="text-4xl font-bold mb-4">Transform Your Workouts</h1>
              <p className="text-lg text-gray-700">
                Experience immersive audio-led workouts that adapt to your rhythm.
                Our innovative platform brings personal training to your ears,
                guiding you through expertly crafted sessions.
              </p>
            </div>

            <div className="relative w-full aspect-[9/16] max-w-sm mx-auto">
              <Image
                src="/images/app-mockup.png"
                alt="App mockup"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-3">Personalized Experience</h2>
              <p className="text-gray-700">
                Our AI-powered system learns from your preferences and performance,
                delivering customized workout experiences that evolve with you.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-3">Expert Guidance</h2>
              <p className="text-gray-700">
                Access professional trainers' expertise through crystal-clear audio
                instruction, perfectly timed to your workout intensity.
              </p>
            </div>

            {/* Waitlist Form */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Join the Waitlist</h3>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-1"
                  />
                  <Button>Join</Button>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    // Replace with your actual audio file URL
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
    </main>
  )
}