"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, ArrowLeft } from "lucide-react"

export default function FundAccountPage() {
  const router = useRouter()
  const [amount, setAmount] = useState("")
  const [cardType, setCardType] = useState("")
  const [cardNumber, setCardNumber] = useState("")

  const handleFundAccount = (e: React.FormEvent) => {
    e.preventDefault()
    // Store transaction details and redirect to verification
    localStorage.setItem(
      "pendingTransaction",
      JSON.stringify({
        type: "fund",
        amount: amount,
        cardType: cardType,
        cardNumber: cardNumber,
      }),
    )
    router.push("/verification")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header */}
      <header className="p-6 flex items-center justify-between border-b border-yellow-400/20">
        <div className="flex items-center space-x-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="text-white hover:text-yellow-400">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <Star className="h-8 w-8 text-yellow-400 fill-yellow-400" />
          <span className="text-xl font-bold text-white">flagstar</span>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-md">
        <Card className="bg-white/10 backdrop-blur-sm border-yellow-400/20">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-white">Fund Your Account</CardTitle>
            <p className="text-center text-gray-300">Add funds using card</p>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <p className="text-sm text-gray-300 mb-2">Acceptable cards:</p>
              <p className="text-white">Visa Card, Mastercard, or Verve</p>
              <p className="text-xs text-gray-400 mt-1">Must be linked to a bank in the USA</p>
            </div>

            <form onSubmit={handleFundAccount} className="space-y-4">
              <div>
                <Label htmlFor="cardType" className="text-white">
                  Card Type
                </Label>
                <Select value={cardType} onValueChange={setCardType} required>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select card type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="visa">Visa Card</SelectItem>
                    <SelectItem value="mastercard">Mastercard</SelectItem>
                    <SelectItem value="verve">Verve</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="cardNumber" className="text-white">
                  Card Number
                </Label>
                <Input
                  id="cardNumber"
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  placeholder="Enter card number"
                  required
                />
              </div>

              <div>
                <Label htmlFor="amount" className="text-white">
                  Amount to Add
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  placeholder="Enter amount"
                  min="1"
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                Add Funds
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
