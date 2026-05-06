"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function useAuth() {
  const router = useRouter()
  const [token, setToken] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("glf_admin_token")
    if (!stored) {
      router.push("/admin/login")
    } else {
      setToken(stored)
      setReady(true)
    }
  }, [router])

  function logout() {
    localStorage.removeItem("glf_admin_token")
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