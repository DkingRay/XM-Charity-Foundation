'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Heart,
  Users,
  Calendar,
  BookOpen,
  Image,
  LogOut,
  ChevronLeft,
  Menu,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Donations', href: '/admin/donations', icon: Heart },
  { label: 'Subscribers', href: '/admin/subscribers', icon: Users },
  { label: 'Events', href: '/admin/events', icon: Calendar },
  { label: 'Programs', href: '/admin/programs', icon: BookOpen },
  { label: 'Media', href: '/admin/media', icon: Image },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  const handleLogout = () => {
    document.cookie = 'admin_session=; path=/; max-age=0'
    router.push('/admin/login')
  }

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center gap-2 border-b border-border px-6">
        <Link href="/admin" className="flex items-center gap-2 font-heading font-bold text-lg">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xs font-bold">XM</span>
          Admin
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                active
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>
      <div className="border-t border-border p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground"
          onClick={handleLogout}
        >
          <LogOut className="size-4" />
          Logout
        </Button>
        <Link
          href="/"
          className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="size-3" />
          Back to site
        </Link>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 border-r border-border bg-card lg:block">
        {sidebar}
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/50"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative h-full w-60 bg-card shadow-xl">
            {sidebar}
          </aside>
        </div>
      )}

      <div className="flex flex-1 flex-col lg:pl-60">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/90 px-4 backdrop-blur-md sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            className="lg:hidden"
          >
            <Menu className="size-5" />
          </button>
          <div className="flex-1" />
          <span className="text-sm text-muted-foreground">Admin Panel</span>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
