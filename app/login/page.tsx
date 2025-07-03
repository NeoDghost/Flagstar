"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [accountType, setAccountType] = useState("individual")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // Check credentials
    if (email === "Katiedubay0@gmail.com" && password === "Katiedub1783") {
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userEmail", email)
      router.push("/dashboard")
    } else {
      alert("Invalid credentials")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center space-x-3 mb-4">
            <Star className="h-10 w-10 text-yellow-400 fill-yellow-400" />
            <span className="text-2xl font-bold text-white">flagstar</span>
          </Link>
        </div>

        <Card className="bg-white/10 backdrop-blur-sm border-yellow-400/20">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-white">Login to Your Account</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={accountType} onValueChange={setAccountType} className="mb-6">
              <TabsList className="grid w-full grid-cols-2 bg-white/5">
                <TabsTrigger
                  value="individual"
                  className="text-white data-[state=active]:bg-yellow-400 data-[state=active]:text-black"
                >
                  Individual
                </TabsTrigger>
                <TabsTrigger
                  value="business"
                  className="text-white data-[state=active]:bg-yellow-400 data-[state=active]:text-black"
                >
                  Business
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                Confirm Login
              </Button>
            </form>

            <div className="mt-6 space-y-3 text-center">
              <Button variant="link" className="text-orange-400 hover:text-orange-300">
                Reactivate Account
              </Button>

              <div>
                <span className="text-gray-300">Don't have an account? </span>
                <Link href="/signup" className="text-yellow-400 hover:text-yellow-300 underline">
                  Sign up here
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <footer className="mt-8 text-center text-gray-400 text-sm">
          <p>Powered by Flagstar Bank, Licensed by FDIC, OCC, and Federal Reserve</p>
        </footer>
      </div>
    </div>
  )
}
