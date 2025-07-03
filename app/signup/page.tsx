"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star } from "lucide-react"

export default function SignupPage() {
  const [accountType, setAccountType] = useState("individual")

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
            <CardTitle className="text-2xl text-center text-white">Create Your Account</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={accountType} onValueChange={setAccountType}>
              <TabsList className="grid w-full grid-cols-2 bg-white/5 mb-6">
                <TabsTrigger
                  value="individual"
                  className="text-white data-[state=active]:bg-yellow-400 data-[state=active]:text-black"
                >
                  Individual Account
                </TabsTrigger>
                <TabsTrigger
                  value="business"
                  className="text-white data-[state=active]:bg-yellow-400 data-[state=active]:text-black"
                >
                  Business Account
                </TabsTrigger>
              </TabsList>

              <TabsContent value="individual" className="space-y-4">
                <div className="text-center text-white mb-4">
                  <p className="mb-4">Do you already have a US Bank Corp account?</p>
                  <div className="space-y-3">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                      Yes, I have an existing account
                    </Button>
                    <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black">
                      No, Create new account
                    </Button>
                  </div>
                </div>

                <div className="text-center mt-6">
                  <p className="text-gray-300 text-sm">
                    If you already have an existing account, please{" "}
                    <Link href="/login" className="text-yellow-400 hover:text-yellow-300 underline">
                      login here
                    </Link>
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="business" className="space-y-4">
                <div className="text-center text-white mb-4">
                  <p className="mb-4">Do you already have a US Bank Corp business account?</p>
                  <div className="space-y-3">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                      Yes, I have an existing business account
                    </Button>
                    <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black">
                      No, Create new business account
                    </Button>
                  </div>
                </div>

                <div className="text-center mt-6">
                  <p className="text-gray-300 text-sm">
                    If you already have an existing account, please{" "}
                    <Link href="/login" className="text-yellow-400 hover:text-yellow-300 underline">
                      login here
                    </Link>
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-8 text-center">
              <Link href="/login" className="text-yellow-400 hover:text-yellow-300 underline">
                Already have an account? Login here
              </Link>
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
