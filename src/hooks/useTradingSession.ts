"use client"

import { useState, useEffect } from "react"

interface TradingSession {
  sessionId: string
  result: "UP" | "DOWN" | null
  startTime: string
  endTime: string
  status: "active" | "completed" | "scheduled"
}

export const useTradingSession = () => {
  const [currentSession, setCurrentSession] = useState<TradingSession | null>(null)
  const [nextSessions, setNextSessions] = useState<TradingSession[]>([])
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  const fetchSession = async () => {
    try {
      const response = await fetch("/api/sessions")
      if (!response.ok) {
        throw new Error("Failed to fetch session")
      }

      const data = await response.json()

      if (data.currentSession) {
        setCurrentSession(data.currentSession)

        // Tính thời gian còn lại
        const now = new Date()
        const endTime = new Date(data.currentSession.endTime)
        const timeDiff = Math.max(0, Math.floor((endTime.getTime() - now.getTime()) / 1000))
        setTimeLeft(timeDiff)
      }

      if (data.nextSessions) {
        setNextSessions(data.nextSessions)
      }

      setLastUpdate(new Date())
      setError(null)
    } catch (err) {
      setError("Không thể tải thông tin phiên giao dịch")
      console.error("Error fetching session:", err)
    } finally {
      setIsLoading(false)
    }
  }

  // Lấy thông tin phiên ban đầu
  useEffect(() => {
    fetchSession()

    // Cập nhật thông tin mỗi giây
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          fetchSession() // Làm mới thông tin khi hết giờ
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return {
    currentSession,
    nextSessions,
    timeLeft,
    isLoading,
    error,
    lastUpdate,
  }
}
