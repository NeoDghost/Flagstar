"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Star, ArrowLeft, Camera } from "lucide-react"

export default function VerificationPage() {
  const router = useRouter()
  const [stage, setStage] = useState(1)
  const [pin, setPin] = useState("")
  const [transactionCode, setTransactionCode] = useState("")
  const [showCamera, setShowCamera] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pin === "1783") {
      setStage(2)
      setPin("")
    } else {
      alert("Invalid transaction PIN")
    }
  }

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const currentCode = localStorage.getItem("currentTransactionCode") || "Txcfl368300"
    if (transactionCode === currentCode) {
      setStage(3)
      setTransactionCode("")
    } else {
      alert("Invalid transaction code. Please contact admin for the correct code.")
    }
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setShowCamera(true)
      }
    } catch (error) {
      alert("Camera access denied")
    }
  }

  const completeFaceVerification = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      // Stop camera
      const stream = video.srcObject as MediaStream
      stream?.getTracks().forEach((track) => track.stop())
      setShowCamera(false)

      // Create pending transaction
      const transactionData = JSON.parse(localStorage.getItem("pendingTransaction") || "{}")
      const pendingTransaction = {
        id: Date.now().toString(),
        ...transactionData,
        status: "pending",
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days
        verificationComplete: true,
      }

      // Save to pending transactions
      const existingPending = JSON.parse(localStorage.getItem("pendingTransactions") || "[]")
      existingPending.push(pendingTransaction)
      localStorage.setItem("pendingTransactions", JSON.stringify(existingPending))

      // Clear the temporary transaction
      localStorage.removeItem("pendingTransaction")

      alert(
        "Transaction verification complete. Your transaction is now pending approval and will be processed within 3 working days.",
      )
      router.push("/dashboard")
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      const context = canvas.getContext("2d")

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      context?.drawImage(video, 0, 0)

      // Stop camera
      const stream = video.srcObject as MediaStream
      stream?.getTracks().forEach((track) => track.stop())
      setShowCamera(false)

      // Create pending transaction
      const transactionData = JSON.parse(localStorage.getItem("pendingTransaction") || "{}")
      const pendingTransaction = {
        id: Date.now().toString(),
        ...transactionData,
        status: "pending",
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days
        verificationComplete: true,
        timestamp: new Date().toLocaleString(),
      }

      // Save to pending transactions
      const existingPending = JSON.parse(localStorage.getItem("pendingTransactions") || "[]")
      existingPending.push(pendingTransaction)
      localStorage.setItem("pendingTransactions", JSON.stringify(existingPending))

      // Clear the temporary transaction
      localStorage.removeItem("pendingTransaction")

      alert(
        "Transaction verification complete. Your transaction is now pending approval and will be processed within 3 working days.",
      )
      router.push("/dashboard")
    }
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
            <CardTitle className="text-2xl text-center text-white">Transaction Verification</CardTitle>
            <p className="text-center text-gray-300">Stage {stage} of 3</p>
          </CardHeader>
          <CardContent>
            {stage === 1 && (
              <form onSubmit={handlePinSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="pin" className="text-white">
                    Enter Transaction PIN
                  </Label>
                  <Input
                    id="pin"
                    type="password"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    placeholder="Enter your 4-digit PIN"
                    maxLength={4}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                  Verify PIN
                </Button>
              </form>
            )}

            {stage === 2 && (
              <form onSubmit={handleCodeSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="transactionCode" className="text-white">
                    Enter Transaction Code
                  </Label>
                  <Input
                    id="transactionCode"
                    type="text"
                    value={transactionCode}
                    onChange={(e) => setTransactionCode(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    placeholder="Enter transaction code from admin"
                    required
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Contact admin for transaction code: Gregmore788@gmail.com
                  </p>
                </div>
                <Button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                  Verify Code
                </Button>
              </form>
            )}

            {stage === 3 && (
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white mb-4">Identity Verification</h3>
                  <p className="text-gray-300 mb-4">Face verification required</p>

                  {!showCamera ? (
                    <Button
                      onClick={startCamera}
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
                    >
                      <Camera className="mr-2 h-4 w-4" />
                      Open Camera
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg" />
                      <Button
                        onClick={capturePhoto}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
                      >
                        Capture Photo
                      </Button>
                    </div>
                  )}

                  <canvas ref={canvasRef} className="hidden" />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
