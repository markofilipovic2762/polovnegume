"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";

interface SearchFiltersProps {
  onSearch: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  width?: string;
  aspect_ratio?: string;
  diameter?: string;
  season?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
}

export function SearchFilters({ onSearch }: SearchFiltersProps) {
  const [filters, setFilters] = useState<SearchFilters>({});
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleReset = () => {
    setFilters({});
    onSearch({});
  };

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
    }));
  };

  const hasActiveFilters = Object.values(filters).some(
    (v) => v !== undefined && v !== ""
  );

  return (
    <Card className="animate-fadeIn">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Pretraga Guma
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Sakrij" : "Prikaži sve filtere"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main tire size filters - always visible */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="width">Širina (mm) *</Label>
            <Select
              value={filters.width}
              onValueChange={(value) => updateFilter("width", value)}
            >
              <SelectTrigger id="width" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="145">145</SelectItem>
                <SelectItem value="155">155</SelectItem>
                <SelectItem value="165">165</SelectItem>
                <SelectItem value="175">175</SelectItem>
                <SelectItem value="185">185</SelectItem>
                <SelectItem value="195">195</SelectItem>
                <SelectItem value="205">205</SelectItem>
                <SelectItem value="215">215</SelectItem>
                <SelectItem value="225">225</SelectItem>
                <SelectItem value="235">235</SelectItem>
                <SelectItem value="245">245</SelectItem>
                <SelectItem value="255">255</SelectItem>
                <SelectItem value="265">265</SelectItem>
                <SelectItem value="275">275</SelectItem>
                <SelectItem value="285">285</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="aspect_ratio">Visina gume *</Label>
            <Select
              value={filters.aspect_ratio}
              onValueChange={(value) => updateFilter("aspect_ratio", value)}
            >
              <SelectTrigger id="aspect_ratio" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="30">30</SelectItem>
                <SelectItem value="35">35</SelectItem>
                <SelectItem value="40">40</SelectItem>
                <SelectItem value="45">45</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="55">55</SelectItem>
                <SelectItem value="60">60</SelectItem>
                <SelectItem value="65">65</SelectItem>
                <SelectItem value="70">70</SelectItem>
                <SelectItem value="75">75</SelectItem>
                <SelectItem value="80">80</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="diameter">Prečnik (inch)</Label>
            <Select
              value={filters.diameter}
              onValueChange={(value) => updateFilter("diameter", value)}
            >
              <SelectTrigger id="diameter" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="13">13</SelectItem>
                <SelectItem value="14">14</SelectItem>
                <SelectItem value="15">15</SelectItem>
                <SelectItem value="16">16</SelectItem>
                <SelectItem value="17">17</SelectItem>
                <SelectItem value="18">18</SelectItem>
                <SelectItem value="19">19</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="21">21</SelectItem>
                <SelectItem value="22">22</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Expandable filters */}
        {isExpanded && (
          <div className="space-y-4 pt-4 border-t border-border animate-fadeIn">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="season">Sezona</Label>
                <Select
                  value={filters.season || ""}
                  onValueChange={(value) => updateFilter("season", value)}
                >
                  <SelectTrigger id="season">
                    <SelectValue placeholder="Izaberite sezonu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="letnja">Letnja</SelectItem>
                    <SelectItem value="zimska">Zimska</SelectItem>
                    <SelectItem value="allseason">Allseason</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="brand">Brend *</Label>
                <Select
                  value={filters.brand}
                  onValueChange={(value) => updateFilter("brand", value)}
                >
                  <SelectTrigger id="brand" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    <SelectItem value="Tigar">Tigar</SelectItem>
                    <SelectItem value="Sava">Sava</SelectItem>
                    <SelectItem value="Nexen">Nexen</SelectItem>
                    <SelectItem value="Riken">Riken</SelectItem>
                    <SelectItem value="Taurus">Taurus</SelectItem>
                    <SelectItem value="Linglong">Linglong</SelectItem>
                    <SelectItem value="Michelin">Michelin</SelectItem>
                    <SelectItem value="Bridgestone">Bridgestone</SelectItem>
                    <SelectItem value="Continental">Continental</SelectItem>
                    <SelectItem value="Pirelli">Pirelli</SelectItem>
                    <SelectItem value="Goodyear">Goodyear</SelectItem>
                    <SelectItem value="Dunlop">Dunlop</SelectItem>
                    <SelectItem value="Hankook">Hankook</SelectItem>
                    <SelectItem value="Yokohama">Yokohama</SelectItem>
                    <SelectItem value="Falken">Falken</SelectItem>
                    <SelectItem value="Kumho">Kumho</SelectItem>
                    <SelectItem value="Toyo">Toyo</SelectItem>
                    <SelectItem value="Nokian">Nokian</SelectItem>
                    <SelectItem value="Vredestein">Vredestein</SelectItem>
                  </SelectContent>
                </Select>
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
                    updateFilter(
                      "minPrice",
                      e.target.value
                        ? Number.parseFloat(e.target.value)
                        : undefined
                    )
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
                    updateFilter(
                      "maxPrice",
                      e.target.value
                        ? Number.parseFloat(e.target.value)
                        : undefined
                    )
                  }
                />
              </div>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-3 pt-2">
          <Button
            onClick={handleSearch}
            className="flex-1 gap-2 cursor-pointer bg-linear-to-r from-primary to-secondary hover:opacity-90 transition-all"
          >
            <Search className="h-4 w-4" />
            Pretraži
          </Button>
          {hasActiveFilters && (
            <Button
              onClick={handleReset}
              variant="outline"
              className="gap-2 bg-transparent"
            >
              <X className="h-4 w-4" />
              Resetuj
            </Button>
          )}
        </div>

        {/* Active filters display */}
        {hasActiveFilters && (
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">
              Aktivni filteri:
            </p>
            <div className="flex flex-wrap gap-2">
              {filters.width && (
                <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                  Širina: {filters.width}mm
                </span>
              )}
              {filters.aspect_ratio && (
                <span className="text-xs bg-blue-400 text-secondary-foreground px-2 py-1 rounded">
                  Visina: {filters.aspect_ratio}
                </span>
              )}
              {filters.diameter && (
                <span className="text-xs bg-red-400 text-secondary-foreground px-2 py-1 rounded">
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
  );
}
