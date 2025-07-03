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
import { Checkbox } from "@/components/ui/checkbox"
import { Star, ArrowLeft } from "lucide-react"

const usBanks = [
  "JPMorgan Chase Bank",
  "Bank of America",
  "Wells Fargo Bank",
  "Citibank",
  "U.S. Bank",
  "PNC Bank",
  "Goldman Sachs Bank",
  "Truist Bank",
  "Capital One Bank",
  "TD Bank",
  "Bank of New York Mellon",
  "State Street Bank",
  "American Express Bank",
  "USAA Bank",
  "Charles Schwab Bank",
  "Ally Bank",
  "Discover Bank",
  "Marcus by Goldman Sachs",
  "Synchrony Bank",
  "CIT Bank",
]

export default function TransferToOthersPage() {
  const router = useRouter()
  const [fromAccount, setFromAccount] = useState("")
  const [amount, setAmount] = useState("")
  const [bankName, setBankName] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [description, setDescription] = useState("")
  const [saveBeneficiary, setSaveBeneficiary] = useState(false)

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault()
    // Store transaction details and redirect to verification
    localStorage.setItem(
      "pendingTransaction",
      JSON.stringify({
        type: "transfer_others",
        fromAccount,
        amount,
        bankName,
        accountNumber,
        description,
        saveBeneficiary,
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
            <CardTitle className="text-2xl text-center text-white">Transfer to Others</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTransfer} className="space-y-4">
              <div>
                <Label htmlFor="fromAccount" className="text-white">
                  Account to Transfer From
                </Label>
                <Select value={fromAccount} onValueChange={setFromAccount} required>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Choose account" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">Main Account - 4789-2156-8934-7721</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="amount" className="text-white">
                  Amount to Transfer
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
                <Label htmlFor="bankName" className="text-white">
                  Bank Name
                </Label>
                <Select value={bankName} onValueChange={setBankName} required>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select bank" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {usBanks.map((bank) => (
                      <SelectItem key={bank} value={bank}>
                        {bank}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="accountNumber" className="text-white">
                  Account Number
                </Label>
                <Input
                  id="accountNumber"
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  placeholder="Enter account number"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-white">
                  Transfer Description
                </Label>
                <Input
                  id="description"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  placeholder="Enter description"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="saveBeneficiary"
                  checked={saveBeneficiary}
                  onCheckedChange={setSaveBeneficiary}
                  className="border-white/20"
                />
                <Label htmlFor="saveBeneficiary" className="text-white text-sm">
                  Save account as beneficiary
                </Label>
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
