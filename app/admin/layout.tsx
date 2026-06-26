'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Heart,
  Users,
  Calendar,
  BookOpen,
  Image as ImageIcon,
  LogOut,
  ChevronLeft,
  Menu,
  BarChart3,
  Sun,
  Moon,
} from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Programs', href: '/admin/programs', icon: BookOpen },
  { label: 'Events', href: '/admin/events', icon: Calendar },
  { label: 'Media', href: '/admin/media', icon: ImageIcon },
  { label: 'Donations', href: '/admin/donations', icon: Heart },
  { label: 'Subscribers', href: '/admin/subscribers', icon: Users },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  const handleLogout = () => {
    document.cookie = 'admin_session=; path=/; max-age=0'
    router.push('/admin/login')
  }

  const sidebar = (
    <div className="flex h-full flex-col bg-card">
      <div className="flex h-16 items-center gap-2.5 border-b border-border px-6">
        <Link href="/admin" className="flex items-center gap-3 px-1">
          <Image
            src="/logo-transparent.png"
            alt="XM Charity Foundation"
            width={120}
            height={34}
            className="h-8 w-auto"
            priority
          />
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                active
                  ? 'bg-primary/10 text-primary shadow-sm'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              <span className={cn(
                'flex size-8 items-center justify-center rounded-lg transition-colors',
                active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground',
              )}>
                <item.icon className="size-4" />
              </span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-border p-3 space-y-1">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
          onClick={handleLogout}
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-muted">
            <LogOut className="size-4" />
          </span>
          Logout
        </Button>
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-muted">
            <ChevronLeft className="size-4" />
          </span>
          Back to site
        </Link>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-muted/30">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-border bg-card shadow-sm lg:block">
        {sidebar}
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative h-full w-64 bg-card shadow-xl animate-in slide-in-from-left">
            {sidebar}
          </aside>
        </div>
      )}

      <div className="flex flex-1 flex-col lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/95 px-4 backdrop-blur-md sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            className="inline-flex size-10 items-center justify-center rounded-lg hover:bg-muted lg:hidden"
          >
            <Menu className="size-5" />
          </button>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BarChart3 className="size-4" />
            <span className="hidden sm:inline">XM Charity Foundation</span>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            {mounted && (
              <button
                type="button"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="inline-flex size-9 items-center justify-center rounded-lg hover:bg-muted transition-colors"
                aria-label="Toggle dark mode"
              >
                {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
              </button>
            )}
            <span className="hidden sm:inline text-sm text-muted-foreground">Admin Panel</span>
            <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
              A
            </span>
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
