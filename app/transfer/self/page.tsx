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

export default function TransferToSelfPage() {
  const router = useRouter()
  const [debitAccount, setDebitAccount] = useState("")
  const [creditAccount, setCreditAccount] = useState("")
  const [amount, setAmount] = useState("")

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault()
    // Store transaction details and redirect to verification
    localStorage.setItem(
      "pendingTransaction",
      JSON.stringify({
        type: "transfer_self",
        debitAccount,
        creditAccount,
        amount,
      }),
    )
    router.push("/verification")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header */}
      <header className="p-6 flex items-center justify-between border-b border-yellow-400/20">
        <div className="flex items-center space-x-3">
          <Link href="/transfer">
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
            <CardTitle className="text-2xl text-center text-white">Transfer to Self</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTransfer} className="space-y-4">
              <div>
                <Label htmlFor="debitAccount" className="text-white">
                  Account to Debit
                </Label>
                <Select value={debitAccount} onValueChange={setDebitAccount} required>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Choose account to debit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">Main Account - 4789-2156-8934-7721</SelectItem>
                    <SelectItem value="savings">Savings Account - 4789-2156-8934-7722</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="amount" className="text-white">
                  Amount to Debit
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

              <div>
                <Label htmlFor="creditAccount" className="text-white">
                  Account to Credit
                </Label>
                <Select value={creditAccount} onValueChange={setCreditAccount} required>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Choose account to credit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">Main Account - 4789-2156-8934-7721</SelectItem>
                    <SelectItem value="savings">Savings Account - 4789-2156-8934-7722</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                Proceed with Transfer
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
