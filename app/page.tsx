"use client"

import { ThemeProvider } from "../components/theme-provider"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <ThemeProvider />
}
