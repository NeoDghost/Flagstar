"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, LogOut, CreditCard, Send, History, DollarSign, Moon, Sun } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userEmail")
    router.push("/")
  }

  const handleLoanApplication = () => {
    alert("Try again")
  }

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-gradient-to-br from-black via-gray-900 to-black" : "bg-gradient-to-br from-gray-100 via-white to-gray-100"}`}
    >
      {/* Header */}
      <header className="p-6 flex items-center justify-between border-b border-yellow-400/20">
        <div className="flex items-center space-x-3">
          <Star className="h-8 w-8 text-yellow-400 fill-yellow-400" />
          <span className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}>flagstar</span>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={isDarkMode ? "text-white hover:text-yellow-400" : "text-black hover:text-yellow-600"}
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
        {/* Account Info */}
        <Card
          className={`mb-8 ${isDarkMode ? "bg-white/10 backdrop-blur-sm border-yellow-400/20" : "bg-white border-yellow-400/40"}`}
        >
          <CardHeader>
            <CardTitle className={`text-2xl ${isDarkMode ? "text-white" : "text-black"}`}>Account Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"} mb-1`}>Account Name</p>
                <p className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>
                  Kathleen Mary Theresa
                </p>
              </div>
              <div>
                <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"} mb-1`}>Account Number</p>
                <p className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>
                  4789-2156-8934-7721
                </p>
              </div>
            </div>

            <div className="mt-6">
              <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"} mb-1`}>Available Balance</p>
              <p className="text-3xl font-bold text-green-500">$5,748,085,179.09</p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/fund-account">
            <Card
              className={`hover:scale-105 transition-transform cursor-pointer ${isDarkMode ? "bg-white/10 backdrop-blur-sm border-yellow-400/20 hover:border-yellow-400/40" : "bg-white border-yellow-400/40 hover:border-yellow-400/60"}`}
            >
              <CardContent className="p-6 text-center">
                <CreditCard className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-black"} mb-2`}>
                  Fund Account
                </h3>
                <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Add money to your account</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/transfer">
            <Card
              className={`hover:scale-105 transition-transform cursor-pointer ${isDarkMode ? "bg-white/10 backdrop-blur-sm border-yellow-400/20 hover:border-yellow-400/40" : "bg-white border-yellow-400/40 hover:border-yellow-400/60"}`}
            >
              <CardContent className="p-6 text-center">
                <Send className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-black"} mb-2`}>
                  Make Transfer
                </h3>
                <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Send money to others</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/transaction-history">
            <Card
              className={`hover:scale-105 transition-transform cursor-pointer ${isDarkMode ? "bg-white/10 backdrop-blur-sm border-yellow-400/20 hover:border-yellow-400/40" : "bg-white border-yellow-400/40 hover:border-yellow-400/60"}`}
            >
              <CardContent className="p-6 text-center">
                <History className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-black"} mb-2`}>
                  Check History
                </h3>
                <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>View transaction history</p>
              </CardContent>
            </Card>
          </Link>

          <Card
            className={`hover:scale-105 transition-transform cursor-pointer ${isDarkMode ? "bg-white/10 backdrop-blur-sm border-yellow-400/20 hover:border-yellow-400/40" : "bg-white border-yellow-400/40 hover:border-yellow-400/60"}`}
            onClick={handleLoanApplication}
          >
            <CardContent className="p-6 text-center">
              <DollarSign className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-black"} mb-2`}>
                Apply for Loan
              </h3>
              <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Get low interest loans</p>
            </CardContent>
          </Card>
        </div>

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
