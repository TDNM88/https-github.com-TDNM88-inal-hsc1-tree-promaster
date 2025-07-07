import { getUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import { AdminDashboard } from "@/components/admin-dashboard"

export default async function HomePage() {
  const user = await getUser()

  if (!user) {
    redirect("/login")
  }

  if (user.role === "user") {
    redirect("/trade")
  }

  if (user.role === "admin") {
    return <AdminDashboard />
  }

  redirect("/login")
}
