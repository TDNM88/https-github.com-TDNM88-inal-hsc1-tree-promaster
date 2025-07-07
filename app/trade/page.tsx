"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserMenu } from "@/components/user-menu"

export default function TradePage() {
  const user = { username: "user", role: "user" }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Trading Platform</h1>
            <UserMenu user={user} />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Card>
            <CardHeader>
              <CardTitle>Welcome to Trading Platform</CardTitle>
              <CardDescription>Start trading binary options with our advanced platform</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Trading interface will be implemented here. This is a placeholder for the user trading dashboard.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
