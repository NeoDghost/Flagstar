"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Star, LogOut, Moon, Sun, Pause, Play, Check, X, Bell, Trash2, RefreshCw } from "lucide-react"

interface Transaction {
  id: string
  type: string
  amount: string
  status: "pending" | "approved" | "rejected"
  timestamp: string
  createdAt: string
  expiresAt: string
  details: any
  verificationComplete?: boolean
}

export default function AdminPage() {
  const router = useRouter()
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [notifications, setNotifications] = useState(0)
  const [currentTransactionCode, setCurrentTransactionCode] = useState("Txcfl368300")
  const [newCodeSuffix, setNewCodeSuffix] = useState("")

  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn")
    if (!isAdminLoggedIn) {
      router.push("/admin-login")
    }

    // Load pending transactions
    loadPendingTransactions()
  }, [router])

  const loadPendingTransactions = () => {
    const pendingTransactions = JSON.parse(localStorage.getItem("pendingTransactions") || "[]")
    setTransactions(pendingTransactions)
    setNotifications(pendingTransactions.filter((t: Transaction) => t.status === "pending").length)
  }

  const generateNewTransactionCode = () => {
    if (newCodeSuffix.length >= 6) {
      const newCode = `Txc${newCodeSuffix}`
      setCurrentTransactionCode(newCode)
      localStorage.setItem("currentTransactionCode", newCode)
      setNewCodeSuffix("")
      alert(`New transaction code generated: ${newCode}`)
    } else {
      alert("Code suffix must be at least 6 characters")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn")
    router.push("/admin-login")
  }

  const handleTransactionAction = (id: string, action: "approve" | "reject" | "pause" | "resume") => {
    const updatedTransactions = transactions.map((transaction) =>
      transaction.id === id
        ? {
            ...transaction,
            status: action === "approve" ? "approved" : action === "reject" ? "rejected" : transaction.status,
          }
        : transaction,
    )

    setTransactions(updatedTransactions)
    localStorage.setItem("pendingTransactions", JSON.stringify(updatedTransactions))

    if (action === "approve" || action === "reject") {
      setNotifications((prev) => Math.max(0, prev - 1))
    }
  }

  const deleteTransaction = (id: string) => {
    if (confirm("Are you sure you want to delete this transaction? This action cannot be undone.")) {
      const updatedTransactions = transactions.filter((t) => t.id !== id)
      setTransactions(updatedTransactions)
      localStorage.setItem("pendingTransactions", JSON.stringify(updatedTransactions))
      setNotifications(updatedTransactions.filter((t) => t.status === "pending").length)
    }
  }

  const getDaysRemaining = (expiresAt: string) => {
    const now = new Date()
    const expires = new Date(expiresAt)
    const diffTime = expires.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return Math.max(0, diffDays)
  }

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-gradient-to-br from-red-900 via-gray-900 to-black" : "bg-gradient-to-br from-red-100 via-white to-gray-100"}`}
    >
      {/* Header */}
      <header className="p-6 flex items-center justify-between border-b border-red-400/20">
        <div className="flex items-center space-x-3">
          <Star className="h-8 w-8 text-red-400 fill-red-400" />
          <span className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}>flagstar admin</span>
          {notifications > 0 && (
            <Badge className="bg-red-600 text-white flex items-center space-x-1">
              <Bell className="h-3 w-3" />
              <span>{notifications}</span>
            </Badge>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={isDarkMode ? "text-white hover:text-red-400" : "text-black hover:text-red-600"}
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <Button
            variant="ghost"
            onClick={handleLogout}
            className={`${isDarkMode ? "text-white hover:text-red-400" : "text-black hover:text-red-600"} flex items-center space-x-2`}
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Transaction Code Generator */}
        <Card
          className={`mb-8 ${isDarkMode ? "bg-white/10 backdrop-blur-sm border-red-400/20" : "bg-white border-red-400/40"}`}
        >
          <CardHeader>
            <CardTitle className={`text-xl ${isDarkMode ? "text-white" : "text-black"}`}>
              Transaction Code Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"} mb-1`}>
                  Current Transaction Code
                </p>
                <p className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-black"} mb-4`}>
                  {currentTransactionCode}
                </p>
              </div>
              <div>
                <Label htmlFor="newCodeSuffix" className={`${isDarkMode ? "text-white" : "text-black"}`}>
                  Generate New Code (Txc + suffix)
                </Label>
                <div className="flex space-x-2 mt-1">
                  <Input
                    id="newCodeSuffix"
                    value={newCodeSuffix}
                    onChange={(e) => setNewCodeSuffix(e.target.value)}
                    placeholder="Enter 6+ characters"
                    className={`${isDarkMode ? "bg-white/10 border-white/20 text-white" : "bg-white border-gray-300"}`}
                  />
                  <Button onClick={generateNewTransactionCode} className="bg-red-600 hover:bg-red-700 text-white">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Admin Info */}
        <Card
          className={`mb-8 ${isDarkMode ? "bg-white/10 backdrop-blur-sm border-red-400/20" : "bg-white border-red-400/40"}`}
        >
          <CardHeader>
            <CardTitle className={`text-2xl ${isDarkMode ? "text-white" : "text-black"}`}>Admin Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"} mb-1`}>Admin Email</p>
                <p className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>
                  Gregmore788@gmail.com
                </p>
              </div>
              <div>
                <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"} mb-1`}>Active Transactions</p>
                <p className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>
                  {transactions.filter((t) => t.status === "pending").length} Pending
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transaction Management */}
        <Card
          className={`mb-8 ${isDarkMode ? "bg-white/10 backdrop-blur-sm border-red-400/20" : "bg-white border-red-400/40"}`}
        >
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className={`text-xl ${isDarkMode ? "text-white" : "text-black"}`}>
                Transaction Management
              </CardTitle>
              <Button
                onClick={loadPendingTransactions}
                variant="outline"
                size="sm"
                className={isDarkMode ? "border-white/20 text-white" : "border-gray-300"}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {transactions.length === 0 ? (
              <p className={`text-center ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>No transactions found</p>
            ) : (
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <Card
                    key={transaction.id}
                    className={`${isDarkMode ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className={`font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>
                            Transaction #{transaction.id}
                          </h4>
                          <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                            Type: {transaction.type.replace("_", " ").toUpperCase()}
                          </p>
                          <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                            Amount: ${transaction.amount}
                          </p>
                          <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                            Created: {new Date(transaction.createdAt || transaction.timestamp).toLocaleString()}
                          </p>
                          {transaction.status === "pending" && (
                            <p className={`text-sm ${isDarkMode ? "text-yellow-400" : "text-yellow-600"}`}>
                              Days remaining: {getDaysRemaining(transaction.expiresAt)}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
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
                          <Button size="sm" variant="destructive" onClick={() => deleteTransaction(transaction.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {transaction.status === "pending" && (
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            className="bg-yellow-600 hover:bg-yellow-700 text-white"
                            onClick={() => handleTransactionAction(transaction.id, "pause")}
                          >
                            <Pause className="h-4 w-4 mr-1" />
                            Pause
                          </Button>
                          <Button
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={() => handleTransactionAction(transaction.id, "resume")}
                          >
                            <Play className="h-4 w-4 mr-1" />
                            Resume
                          </Button>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => handleTransactionAction(transaction.id, "approve")}
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            className="bg-red-600 hover:bg-red-700 text-white"
                            onClick={() => handleTransactionAction(transaction.id, "reject")}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card
          className={`${isDarkMode ? "bg-white/10 backdrop-blur-sm border-red-400/20" : "bg-white border-red-400/40"}`}
        >
          <CardHeader>
            <CardTitle className={`text-lg ${isDarkMode ? "text-white" : "text-black"}`}>Customer Support</CardTitle>
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
