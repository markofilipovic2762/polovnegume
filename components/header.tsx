"use client"

import Link from "next/link"
import { Car, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 glass">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 animate-slideIn group">
          <div className="flex h-32 w-32 items-center justify-center hover:scale-110 transition-all duration-500">
            <img src={"/logo3.png"} ></img>
          </div>
          {/* <span className="text-xl font-bold"> Denkić</span> */}
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {/* <Link 
            href="/" 
            className="text-sm font-medium text-foreground hover:text-secondary transition-all relative group"
          >
            Početna
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all group-hover:w-full" />
          </Link> */}
          {/* <Link 
            href="/admin" 
            className="text-sm font-medium text-foreground hover:text-secondary transition-all relative group"
          >
            Admin
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all group-hover:w-full" />
          </Link> */}
          <div className="flex items-center gap-12 text-sm text-muted-foreground">
            <a 
              href="tel:+38164361424" 
              className="flex items-center gap-2 hover:text-secondary transition-all hover:scale-105"
            >
              <Phone className="h-4 w-4" />
              <span>064 361 04 24</span>
            </a>
            <a
              href="mailto:milos@autogume.rs"
              className="flex items-center gap-2 hover:text-secondary transition-all hover:scale-105"
            >
              <Mail className="h-4 w-4" />
              <span>milos@autogume.rs</span>
            </a>
          </div>
        </nav>

        <Button asChild className="hidden md:inline-flex bg-linear-to-r from-primary to-secondary hover:opacity-90 transition-all hover:scale-105">
          <Link href="#kontakt">Kontaktirajte nas</Link>
        </Button>
      </div>
    </header>
  )
}