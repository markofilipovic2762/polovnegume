"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Tire } from "@/lib/db"
import { Upload, X } from "lucide-react"
import Image from "next/image"

interface TireFormProps {
  tire?: Tire
  onSubmit: (data: any) => Promise<void>
  onCancel: () => void
}

export function TireForm({ tire, onSubmit, onCancel }: TireFormProps) {
  const [formData, setFormData] = useState({
    brand: tire?.brand || "",
    model: tire?.model || "",
    width: tire?.width?.toString() || "",
    aspect_ratio: tire?.aspect_ratio?.toString() || "",
    diameter: tire?.diameter?.toString() || "",
    season: tire?.season || "Letnja",
    condition: tire?.condition || "Odlicno",
    quantity: tire?.quantity?.toString() || "4",
    price: tire?.price?.toString() || "",
    description: tire?.description || "",
    image_url: tire?.image_url || "",
  })

  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(tire?.image_url || null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSubmit(formData)
    } finally {
      setLoading(false)
    }
  }

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Upload failed")
      }

      const data = await response.json()
      updateField("image_url", data.url)
      setImagePreview(data.url)
    } catch (error) {
      console.error("[v0] Error uploading image:", error)
      alert("Greška pri upload-u slike. Pokušajte ponovo.")
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveImage = () => {
    updateField("image_url", "")
    setImagePreview(null)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="brand">Brend *</Label>
          <Select value={formData.season} onValueChange={(value) => updateField("brand", value)}>
            <SelectTrigger id="brand">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
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

        <div className="space-y-2">
          <Label htmlFor="model">Model *</Label>
          <Input
            id="model"
            required
            value={formData.model}
            onChange={(e) => updateField("model", e.target.value)}
            placeholder="npr. Pilot Sport 4"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="width">Širina (mm) *</Label>
          <Select value={formData.width} onValueChange={(value) => updateField("width", value)}>
            <SelectTrigger id="width">
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
          <Select value={formData.aspect_ratio} onValueChange={(value) => updateField("aspect_ratio", value)}>
            <SelectTrigger id="aspect_ratio">
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
          <Label htmlFor="diameter">Prečnik gume *</Label>
          {/* <Input
            id="diameter"
            type="number"
            required
            value={formData.diameter}
            onChange={(e) => updateField("diameter", e.target.value)}
            placeholder="15"
          /> */}
          <Select value={formData.diameter} onValueChange={(value) => updateField("diametar", value)}>
            <SelectTrigger id="diameter">
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

        <div className="space-y-2">
          <Label htmlFor="season">Sezona *</Label>
          <Select value={formData.season} onValueChange={(value) => updateField("season", value)}>
            <SelectTrigger id="season">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Letnja">Letnja</SelectItem>
              <SelectItem value="Zimska">Zimska</SelectItem>
              <SelectItem value="Cjelogodisnja">Allseason</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="condition">Stanje *</Label>
          <Select value={formData.condition} onValueChange={(value) => updateField("condition", value)}>
            <SelectTrigger id="condition">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Odlicno">Odlično</SelectItem>
              <SelectItem value="Vrlo dobro">Vrlo dobro</SelectItem>
              <SelectItem value="Dobro">Dobro</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity">Količina *</Label>
          <Input
            id="quantity"
            type="number"
            required
            value={formData.quantity}
            onChange={(e) => updateField("quantity", e.target.value)}
            placeholder="4"
            min="1"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Cena (EUR) *</Label>
          <Input
            id="price"
            type="number"
            step="1"
            required
            value={formData.price}
            onChange={(e) => updateField("price", e.target.value)}
            placeholder="30"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Slika guma</Label>
        {imagePreview ? (
          <div className="relative w-full h-48 rounded-lg border border-border overflow-hidden bg-muted">
            <Image src={imagePreview || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="relative">
            <input
              type="file"
              id="image"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleImageUpload}
              disabled={uploading}
              className="sr-only"
            />
            <label
              htmlFor="image"
              className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-lg cursor-pointer bg-muted/50 hover:bg-muted transition-colors"
            >
              <Upload className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                {uploading ? "Upload u toku..." : "Kliknite ili prevucite sliku"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">JPEG, PNG ili WebP (max 5MB)</p>
            </label>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Opis</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => updateField("description", e.target.value)}
          placeholder="Dodajte detaljan opis guma..."
          rows={4}
        />
      </div>

      <div className="flex gap-3 justify-end pt-4 border-t border-border">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          Otkaži
        </Button>
        <Button type="submit" disabled={loading || uploading}>
          {loading ? "Čuvanje..." : tire ? "Ažuriraj" : "Dodaj"}
        </Button>
      </div>
    </form>
  )
}
