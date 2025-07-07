import { LoginForm } from "@/components/login-form"
import { getUser } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function LoginPage() {
  const user = await getUser()

  if (user) {
    redirect("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoginForm />
    </div>
  )
}
