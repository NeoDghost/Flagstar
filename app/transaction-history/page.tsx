"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ArrowLeft, Clock, CheckCircle, XCircle } from "lucide-react"

interface Transaction {
  id: string
  type: string
  amount: string
  status: "pending" | "approved" | "rejected"
  timestamp: string
  createdAt: string
  expiresAt: string
  details: any
}

export default function TransactionHistoryPage() {
  const router = useRouter()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/login")
    }

    // Load all transactions
    const pendingTransactions = JSON.parse(localStorage.getItem("pendingTransactions") || "[]")
    setTransactions(
      pendingTransactions.sort(
        (a: Transaction, b: Transaction) =>
          new Date(b.createdAt || b.timestamp).getTime() - new Date(a.createdAt || a.timestamp).getTime(),
      ),
    )
  }, [router])

  const getDaysRemaining = (expiresAt: string) => {
    const now = new Date()
    const expires = new Date(expiresAt)
    const diffTime = expires.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return Math.max(0, diffDays)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-gradient-to-br from-black via-gray-900 to-black" : "bg-gradient-to-br from-gray-100 via-white to-gray-100"}`}
    >
      {/* Header */}
      <header className="p-6 flex items-center justify-between border-b border-yellow-400/20">
        <div className="flex items-center space-x-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="text-white hover:text-yellow-400">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <Star className="h-8 w-8 text-yellow-400 fill-yellow-400" />
          <span className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}>flagstar</span>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <Card
          className={`${isDarkMode ? "bg-white/10 backdrop-blur-sm border-yellow-400/20" : "bg-white border-yellow-400/40"}`}
        >
          <CardHeader>
            <CardTitle className={`text-2xl ${isDarkMode ? "text-white" : "text-black"}`}>
              Transaction History
            </CardTitle>
          </CardHeader>
          <CardContent>
            {transactions.length === 0 ? (
              <div className="text-center py-8">
                <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>No transactions found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <Card
                    key={transaction.id}
                    className={`${isDarkMode ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {getStatusIcon(transaction.status)}
                            <h4 className={`font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>
                              {transaction.type.replace("_", " ").toUpperCase()}
                            </h4>
                            <Badge
                              className={
                                transaction.status === "pending"
                                  ? "bg-yellow-600"
                                  : transaction.status === "approved"
                                    ? "bg-green-600"
                                    : "bg-red-600"
                              }
                            >
                              {transaction.status.toUpperCase()}
                            </Badge>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                                Amount: <span className="font-semibold">${transaction.amount}</span>
                              </p>
                              <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                                Transaction ID: {transaction.id}
                              </p>
                              <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                                Created: {new Date(transaction.createdAt || transaction.timestamp).toLocaleString()}
                              </p>
                            </div>

                            <div>
                              {transaction.status === "pending" && (
                                <>
                                  <p className={`text-sm ${isDarkMode ? "text-yellow-400" : "text-yellow-600"}`}>
                                    Days remaining: {getDaysRemaining(transaction.expiresAt)}
                                  </p>
                                  <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                                    Expires: {new Date(transaction.expiresAt).toLocaleDateString()}
                                  </p>
                                </>
                              )}

                              {transaction.details && (
                                <div className="mt-2">
                                  {transaction.details.bankName && (
                                    <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                      To: {transaction.details.bankName}
                                    </p>
                                  )}
                                  {transaction.details.description && (
                                    <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                      Note: {transaction.details.description}
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card
          className={`mt-8 ${isDarkMode ? "bg-white/10 backdrop-blur-sm border-yellow-400/20" : "bg-white border-yellow-400/40"}`}
        >
          <CardHeader>
            <CardTitle className={`text-lg ${isDarkMode ? "text-white" : "text-black"}`}>Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"} mb-1`}>Customer Care Email</p>
                <p className={`font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>Gregmore788@gmail.com</p>
              </div>
              <div>
                <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"} mb-1`}>Customer Care Number</p>
                <p className={`font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>+15084102334</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
