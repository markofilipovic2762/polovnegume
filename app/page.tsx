"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { TireCard } from "@/components/tire-card"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { SearchFilters, type SearchFilters as SearchFiltersType } from "@/components/search-filters"
import type { Tire } from "@/lib/db"

export default function HomePage() {
  const [tires, setTires] = useState<Tire[]>([])
  const [loading, setLoading] = useState(true)
  const [currentFilters, setCurrentFilters] = useState<SearchFiltersType>({})

  async function loadTires(filters: SearchFiltersType = {}) {
    setLoading(true)
    try {
      const params = new URLSearchParams()

      if (filters.width) params.append("width", filters.width.toString())
      if (filters.aspect_ratio) params.append("aspect_ratio", filters.aspect_ratio.toString())
      if (filters.diameter) params.append("diameter", filters.diameter.toString())
      if (filters.season && filters.season !== "all") params.append("season", filters.season)
      if (filters.brand) params.append("brand", filters.brand)
      if (filters.minPrice) params.append("minPrice", filters.minPrice.toString())
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice.toString())

      const response = await fetch(`/api/tires?${params.toString()}`)
      const data = await response.json()
      setTires(data.tires || [])
    } catch (error) {
      console.error("[v0] Error loading tires:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTires()
  }, [])

  const handleSearch = (filters: SearchFiltersType) => {
    setCurrentFilters(filters)
    loadTires(filters)
  }

  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturesSection />

      <section className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-12 animate-fadeIn">
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance gradient-text">
              Dostupne Gume
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Pregledajte našu ponudu kvalitetnih polovnih guma
            </p>
          </div>

          <div className="mb-8 max-w-4xl mx-auto animate-slideIn">
            <SearchFilters onSearch={handleSearch} />
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-shimmer h-8 w-48 rounded-lg bg-muted" />
            </div>
          ) : tires.length === 0 ? (
            <div className="text-center py-12 animate-fadeIn">
              <div className="glass max-w-md mx-auto p-8 rounded-xl">
                <p className="text-muted-foreground">
                  {Object.keys(currentFilters).length > 0
                    ? "Nema guma koje odgovaraju vašoj pretrazi. Pokušajte sa drugim filterima."
                    : "Trenutno nema dostupnih guma."}
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6 text-center animate-fadeIn">
                <div className="inline-flex items-center gap-2 glass px-6 py-3 rounded-full">
                  <p className="text-sm text-muted-foreground">
                    Pronađeno: <span className="font-semibold text-foreground gradient-text">{tires.length}</span>{" "}
                    {tires.length === 1 ? "guma" : "guma"}
                  </p>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {tires.map((tire, index) => (
                  <div 
                    key={tire.id} 
                    className="animate-fadeIn" 
                    style={{ 
                      animationDelay: `${index * 50}ms`,
                      animationFillMode: 'both'
                    }}
                  >
                    <TireCard tire={tire} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <ContactSection />
      <Footer />
    </div>
  )
}