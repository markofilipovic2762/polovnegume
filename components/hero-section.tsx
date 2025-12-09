"use client"

import { Button } from "@/components/ui/button"
import { Search, ArrowRight } from "lucide-react"

export function HeroSection() {
  const scrollToSearch = () => {
    const searchSection = document.querySelector('section[class*="py-16"]')
    searchSection?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-secondary/20 to-accent/20 animate-gradientShift" />
      
      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 opacity-30" style={{ background: 'var(--gradient-mesh)' }} />

      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url('/car-tires-background-pattern.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center animate-fadeIn">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl text-balance">
            Kvalitetne <span className="gradient-text">Polovne Gume</span> za Vaše Vozilo
          </h1>
          <p className="mb-8 text-lg text-muted-foreground md:text-xl text-pretty">
            Pronađite savršene gume po najboljim cenama. Sve gume su proverene, sigurne i spremne za upotrebu. Brza
            dostava i stručna pomoć pri izboru.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center animate-slideIn" style={{ animationDelay: '200ms' }}>
            <Button 
              size="lg" 
              className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all hover:scale-105 group" 
              onClick={scrollToSearch}
            >
              <Search className="h-5 w-5 group-hover:rotate-12 transition-transform" />
              Pretražite gume
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="glass border-2 hover:bg-accent/10 transition-all hover:scale-105 group"
              onClick={() => document.querySelector("#kontakt")?.scrollIntoView({ behavior: "smooth" })}
            >
              Saznajte više
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}