"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, X } from "lucide-react"

interface SearchFiltersProps {
  onSearch: (filters: SearchFilters) => void
}

export interface SearchFilters {
  width?: number
  aspect_ratio?: number
  diameter?: number
  season?: string
  brand?: string
  minPrice?: number
  maxPrice?: number
}

export function SearchFilters({ onSearch }: SearchFiltersProps) {
  const [filters, setFilters] = useState<SearchFilters>({})
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSearch = () => {
    onSearch(filters)
  }

  const handleReset = () => {
    setFilters({})
    onSearch({})
  }

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
    }))
  }

  const hasActiveFilters = Object.values(filters).some((v) => v !== undefined && v !== "")

  return (
    <Card className="animate-fadeIn">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Pretraga Guma
          </span>
          <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? "Sakrij" : "Prikaži sve filtere"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main tire size filters - always visible */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="width">Širina (mm)</Label>
            <Input
              id="width"
              type="number"
              placeholder="npr. 195"
              value={filters.width || ""}
              onChange={(e) => updateFilter("width", e.target.value ? Number.parseInt(e.target.value) : undefined)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="aspect">Visina (%)</Label>
            <Input
              id="aspect"
              type="number"
              placeholder="npr. 65"
              value={filters.aspect_ratio || ""}
              onChange={(e) =>
                updateFilter("aspect_ratio", e.target.value ? Number.parseInt(e.target.value) : undefined)
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="diameter">Prečnik (inch)</Label>
            <Input
              id="diameter"
              type="number"
              placeholder="npr. 15"
              value={filters.diameter || ""}
              onChange={(e) => updateFilter("diameter", e.target.value ? Number.parseInt(e.target.value) : undefined)}
            />
          </div>
        </div>

        {/* Expandable filters */}
        {isExpanded && (
          <div className="space-y-4 pt-4 border-t border-border animate-fadeIn">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="season">Sezona</Label>
                <Select value={filters.season || ""} onValueChange={(value) => updateFilter("season", value)}>
                  <SelectTrigger id="season">
                    <SelectValue placeholder="Izaberite sezonu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Letnja">Letnja</SelectItem>
                    <SelectItem value="Zimska">Zimska</SelectItem>
                    <SelectItem value="Allseason">Allseason</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="brand">Brend</Label>
                <Input
                  id="brand"
                  placeholder="npr. Michelin"
                  value={filters.brand || ""}
                  onChange={(e) => updateFilter("brand", e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="minPrice">Min. cena (EUR)</Label>
                <Input
                  id="minPrice"
                  type="number"
                  placeholder="0"
                  value={filters.minPrice || ""}
                  onChange={(e) =>
                    updateFilter("minPrice", e.target.value ? Number.parseFloat(e.target.value) : undefined)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxPrice">Max. cena (EUR)</Label>
                <Input
                  id="maxPrice"
                  type="number"
                  placeholder="10000"
                  value={filters.maxPrice || ""}
                  onChange={(e) =>
                    updateFilter("maxPrice", e.target.value ? Number.parseFloat(e.target.value) : undefined)
                  }
                />
              </div>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-3 pt-2">
          <Button onClick={handleSearch} className="flex-1 gap-2 cursor-pointer bg-linear-to-r from-primary to-secondary hover:opacity-90 transition-all">
            <Search className="h-4 w-4" />
            Pretraži
          </Button>
          {hasActiveFilters && (
            <Button onClick={handleReset} variant="outline" className="gap-2 bg-transparent">
              <X className="h-4 w-4" />
              Resetuj
            </Button>
          )}
        </div>

        {/* Active filters display */}
        {hasActiveFilters && (
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">Aktivni filteri:</p>
            <div className="flex flex-wrap gap-2">
              {filters.width && (
                <span className="text-xs bg-secondary/20 text-secondary-foreground px-2 py-1 rounded">
                  Širina: {filters.width}mm
                </span>
              )}
              {filters.aspect_ratio && (
                <span className="text-xs bg-secondary/20 text-secondary-foreground px-2 py-1 rounded">
                  Visina: {filters.aspect_ratio}
                </span>
              )}
              {filters.diameter && (
                <span className="text-xs bg-secondary/20 text-secondary-foreground px-2 py-1 rounded">
                  Prečnik: {filters.diameter}"
                </span>
              )}
              {filters.season && filters.season !== "all" && (
                <span className="text-xs bg-secondary/20 text-secondary-foreground px-2 py-1 rounded">
                  {filters.season}
                </span>
              )}
              {filters.brand && (
                <span className="text-xs bg-secondary/20 text-secondary-foreground px-2 py-1 rounded">
                  Brend: {filters.brand}
                </span>
              )}
              {(filters.minPrice || filters.maxPrice) && (
                <span className="text-xs bg-secondary/20 text-secondary-foreground px-2 py-1 rounded">
                  Cena: {filters.minPrice || 0} - {filters.maxPrice || "∞"} EUR
                </span>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
