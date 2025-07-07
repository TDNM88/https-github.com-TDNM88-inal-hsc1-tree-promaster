"use client"

import { useEffect, useRef, useState, memo } from "react"

const TradingViewTickerTape = memo(function TradingViewTickerTape() {
  const container = useRef<HTMLDivElement>(null)
  const [symbolCount, setSymbolCount] = useState(10)
  const [isLoaded, setIsLoaded] = useState(false)

  const allSymbols = [
    { proName: "FX_IDC:EURUSD", title: "EUR/USD" },
    { proName: "BITSTAMP:BTCUSD", title: "BTC/USD" },
    { proName: "BITSTAMP:ETHUSD", title: "ETH/USD" },
    { description: "APPLE", proName: "NASDAQ:AAPL" },
    { description: "AMAZON", proName: "NASDAQ:AMZN" },
    { description: "VN30", proName: "HOSE:VN30" },
    { description: "VN INDEX", proName: "HOSE:VNINDEX" },
    { description: "FPT", proName: "HOSE:FPT" },
    { description: "MBB", proName: "HOSE:MBB" },
    { description: "TCB", proName: "HOSE:TCB" },
  ]

  useEffect(() => {
    const updateSymbolCount = () => {
      const width = window.innerWidth
      if (width < 480) {
        setSymbolCount(2)
      } else if (width < 640) {
        setSymbolCount(3)
      } else if (width < 1024) {
        setSymbolCount(5)
      } else {
        setSymbolCount(10)
      }
    }

    updateSymbolCount()

    let resizeTimer: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        updateSymbolCount()
      }, 300)
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      clearTimeout(resizeTimer)
    }
  }, [])

  useEffect(() => {
    if (!container.current) return
    setIsLoaded(false)

    const widgetContainer = container.current.querySelector(".tradingview-widget-container__widget")
    if (!widgetContainer) {
      const div = document.createElement("div")
      div.className = "tradingview-widget-container__widget"
      container.current.appendChild(div)
    }

    const timer = setTimeout(() => {
      if (!container.current) return

      const existingScripts = container.current.querySelectorAll("script")
      existingScripts.forEach((script) => script.remove())

      const script = document.createElement("script")
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js"
      script.async = true
      script.type = "text/javascript"
      script.innerHTML = JSON.stringify({
        symbols: allSymbols.slice(0, symbolCount),
        showSymbolLogo: true,
        colorTheme: "light",
        isTransparent: false,
        displayMode: "adaptive",
        locale: "vi_VN",
      })

      script.onload = () => {
        setIsLoaded(true)
      }

      container.current.appendChild(script)
    }, 300)

    return () => {
      clearTimeout(timer)
      if (container.current) {
        const scripts = container.current.querySelectorAll("script")
        scripts.forEach((script) => script.remove())
      }
    }
  }, [symbolCount])

  return (
    <div className="w-full overflow-hidden">
      {!isLoaded && <div className="h-10 bg-gray-100 animate-pulse w-full rounded" />}
      <div
        ref={container}
        className={`tradingview-widget-container w-full ${!isLoaded ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
        style={{
          height: "46px",
          marginBottom: "8px",
        }}
      >
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </div>
  )
})

export default TradingViewTickerTape
