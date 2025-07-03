"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, ArrowLeft, Users, User, Calendar } from "lucide-react"

export default function TransferPage() {
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
            <CardTitle className="text-2xl text-center text-white">Make a Transfer</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="others" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white/5">
                <TabsTrigger
                  value="others"
                  className="text-white data-[state=active]:bg-yellow-400 data-[state=active]:text-black"
                >
                  To Others
                </TabsTrigger>
                <TabsTrigger
                  value="self"
                  className="text-white data-[state=active]:bg-yellow-400 data-[state=active]:text-black"
                >
                  To Self
                </TabsTrigger>
                <TabsTrigger
                  value="schedule"
                  className="text-white data-[state=active]:bg-yellow-400 data-[state=active]:text-black"
                >
                  Schedule
                </TabsTrigger>
              </TabsList>

              <TabsContent value="others" className="mt-6">
                <Link href="/transfer/others">
                  <Card className="bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <Users className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-white mb-2">Transfer to Others</h3>
                      <p className="text-sm text-gray-300">Send money to other bank accounts</p>
                    </CardContent>
                  </Card>
                </Link>
              </TabsContent>

              <TabsContent value="self" className="mt-6">
                <Link href="/transfer/self">
                  <Card className="bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <User className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-white mb-2">Transfer to Self</h3>
                      <p className="text-sm text-gray-300">Transfer between your own accounts</p>
                    </CardContent>
                  </Card>
                </Link>
              </TabsContent>

              <TabsContent value="schedule" className="mt-6">
                <Card className="bg-red-500/20 border-red-500/40">
                  <CardContent className="p-6 text-center">
                    <Calendar className="h-12 w-12 text-red-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">AN ERROR OCCURRED</h3>
                    <p className="text-sm text-gray-300">Please contact customer service or admin officer.</p>
                    <div className="mt-4 text-sm text-gray-300">
                      <p>Email: Gregmore788@gmail.com</p>
                      <p>Phone: +15084102334</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
