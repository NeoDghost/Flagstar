"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const scrollingMessages = [
  "Sign up with ease (get a Flagstar Bank account in less than 10 mins and start transacting)",
  "Fund your account from other bank (you can fund your account seamlessly from your other bank accounts)",
  "Easy access to loan (apply for low interest loan with ease)",
]

export default function HomePage() {
  const [currentMessage, setCurrentMessage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % scrollingMessages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header */}
      <header className="p-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Star className="h-10 w-10 text-yellow-400 fill-yellow-400" />
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 blur-sm"></div>
          </div>
          <span className="text-2xl font-bold text-white">flagstar</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-6">
            Welcome to <span className="text-yellow-400">Flagstar Bank</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">Your trusted partner in financial excellence</p>

          <div className="flex justify-center space-x-6 mb-12">
            <Link href="/login">
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 text-lg">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 text-lg">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>

        {/* Scrolling Messages */}
        <Card className="bg-white/10 backdrop-blur-sm border-yellow-400/20 mb-12">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="h-16 flex items-center justify-center">
                <p className="text-white text-lg animate-pulse">{scrollingMessages[currentMessage]}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-white/5 backdrop-blur-sm border-yellow-400/20 hover:border-yellow-400/40 transition-colors">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Quick Setup</h3>
              <p className="text-gray-300">Get your account ready in under 10 minutes</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-yellow-400/20 hover:border-yellow-400/40 transition-colors">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Easy Funding</h3>
              <p className="text-gray-300">Transfer funds seamlessly from other banks</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-yellow-400/20 hover:border-yellow-400/40 transition-colors">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Low Interest Loans</h3>
              <p className="text-gray-300">Apply for competitive rate loans with ease</p>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 p-6 text-center text-gray-400">
        <p>Powered by Flagstar Bank, Licensed by FDIC, OCC, and Federal Reserve</p>
      </footer>
    </div>
  )
}
