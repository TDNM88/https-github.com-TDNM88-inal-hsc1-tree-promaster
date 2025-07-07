"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useAuth } from "@/lib/useAuth"
import { Loader2 } from "lucide-react"

// Market ticker data
const marketData = [
  { symbol: "US 500 Cash CFD", value: "27,472.5", change: "-7.00 (-0.13%)", color: "text-red-500" },
  { symbol: "EUR to USD", value: "1.0743", change: "-0.01 (-0.49%)", color: "text-red-500" },
  { symbol: "Gold", value: "3,384.44", change: "-0.36 (-0.01%)", color: "text-red-500" },
  { symbol: "Oil", value: "66.15", change: "-0.63 (-0.94%)", color: "text-red-500" },
  { symbol: "S&P 500 Index", value: "5,797", change: "", color: "text-gray-600" },
]

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

// Market ticker component
function MarketTicker() {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #f0f0f0",
        padding: "8px 0",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 16px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            overflowX: "auto",
            whiteSpace: "nowrap",
            gap: "16px",
          }}
        >
          {marketData.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "0 8px",
              }}
            >
              <div style={{ fontSize: "12px", color: "rgba(0, 0, 0, 0.45)" }}>{item.symbol}</div>
              <div style={{ fontWeight: "bold" }}>{item.value}</div>
              <div style={{ fontSize: "12px", color: item.color }}>{item.change}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Chart tabs component with improved responsiveness
function ChartTabs() {
  // Hook for tracking active tabs could be added here
  // const [chartType, setChartType] = useState('line');
  // const [timeRange, setTimeRange] = useState('1Y');

  // Common button styles for DRY code
  const chartTypeStyle = (isActive: boolean) => ({
    padding: "6px 8px",
    backgroundColor: isActive ? "#1677ff" : "#f0f0f0",
    color: isActive ? "white" : "rgba(0, 0, 0, 0.65)",
    borderRadius: "2px",
    cursor: "pointer",
    fontSize: "clamp(11px, 2.5vw, 14px)",
    fontWeight: isActive ? 500 : 400,
    transition: "all 0.2s ease",
    textAlign: "center" as const,
    minWidth: "70px",
  })

  const timeRangeStyle = (isActive: boolean) => ({
    padding: "4px 6px",
    backgroundColor: isActive ? "#1677ff" : "#f0f0f0",
    color: isActive ? "white" : "rgba(0, 0, 0, 0.65)",
    borderRadius: "2px",
    cursor: "pointer",
    fontSize: "clamp(10px, 2vw, 12px)",
    fontWeight: isActive ? 500 : 400,
    transition: "all 0.2s ease",
    textAlign: "center" as const,
    minWidth: "32px",
  })

  return (
    <div className="flex flex-col w-full px-1 sm:px-0" style={{ marginBottom: "24px" }}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0 mb-3">
        {/* Chart type selection */}
        <div className="grid grid-cols-3 sm:flex sm:flex-wrap gap-2 w-full sm:w-auto">
          <div style={chartTypeStyle(true)}>Line</div>
          <div style={chartTypeStyle(false)}>Candlestick</div>
          <div style={chartTypeStyle(false)}>OHLC</div>
        </div>

        {/* Time range selection */}
        <div className="grid grid-cols-4 sm:flex sm:flex-wrap gap-2 w-full sm:w-auto">
          <div style={timeRangeStyle(false)}>1D</div>
          <div style={timeRangeStyle(false)}>1W</div>
          <div style={timeRangeStyle(false)}>1M</div>
          <div style={timeRangeStyle(true)}>1Y</div>
        </div>
      </div>

      {/* Chart container with responsive height */}
      <div
        className="w-full rounded-md overflow-hidden"
        style={{
          height: "clamp(220px, 40vh, 400px)",
          backgroundColor: "#f5f5f5",
          marginBottom: "16px",
        }}
      >
        {/* Chart placeholder - would be replaced with actual chart */}
        <div className="flex items-center justify-center h-full text-gray-400">
          <span>Biểu đồ tại đây</span>
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const { user, isLoading, isAuthenticated, isAdmin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return

    if (!isAuthenticated()) {
      router.push("/login")
      return
    }

    // Redirect based on user role
    if (isAdmin()) {
      router.push("/admin")
    } else {
      router.push("/trade")
    }
  }, [isLoading, isAuthenticated, isAdmin, router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  )
}
