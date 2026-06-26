'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(false)

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (!res.ok) {
        setError(true)
        setLoading(false)
        return
      }

      router.push('/admin')
    } catch {
      setError(true)
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted p-4">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <div className="text-center">
            <Image
              src="/logo.png"
              alt="XM Charity Foundation"
              width={160}
              height={45}
              className="mx-auto h-10 w-auto invert"
              priority
            />
            <h1 className="mt-5 font-heading text-xl font-bold">
              Admin Login
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1.5">
                <Input
                  id="password"
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  autoFocus
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  aria-label={show ? 'Hide password' : 'Show password'}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-destructive">
                Invalid password. Please try again.
              </p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading || !password}
            >
              {loading ? (
                'Signing in...'
              ) : (
                <>
                  <LogIn className="size-4" />
                  Sign In
                </>
              )}
            </Button>
          </form>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Default password: <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">admin123</code>
        </p>
      </div>
    </div>
  )
}
