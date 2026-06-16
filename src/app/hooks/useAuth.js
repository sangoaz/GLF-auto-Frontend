"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function useAuth() {
  const router = useRouter()
  const [token, setToken] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me')
        if (!res.ok) {
          router.push("/admin/login")
          return
        }
        const data = await res.json()
        setToken(data.token)
        setReady(true)
      } catch {
        router.push("/admin/login")
      }
    }

    checkAuth()
  }, [router])

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push("/admin/login")
  }

  function authHeaders() {
    return {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    }
  }

  return { token, ready, logout, authHeaders }
}
