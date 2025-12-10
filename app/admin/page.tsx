"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TireForm } from "@/components/admin/tire-form"
import { TireTable } from "@/components/admin/tire-table"
import { Plus, ArrowLeft } from "lucide-react"
import type { Tire } from "@/lib/db"
import { useToast } from "@/hooks/use-toast"

export default function AdminPage() {
  const [tires, setTires] = useState<Tire[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingTire, setEditingTire] = useState<Tire | undefined>(undefined)
  const { toast } = useToast()

  const loadTires = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/tires")
      const data = await response.json()
      setTires(data.tires || [])
    } catch (error) {
      console.error("[v0] Error loading tires:", error)
      toast({
        title: "Greška",
        description: "Nije moguće učitati gume",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTires()
  }, [])

  const handleAddNew = () => {
    setEditingTire(undefined)
    setShowForm(true)
  }

  const handleEdit = (tire: Tire) => {
    setEditingTire(tire)
    setShowForm(true)
  }

  const handleSubmit = async (data: any) => {
    try {
      if (editingTire) {
        const response = await fetch(`/api/admin/tires/${editingTire.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })

        if (!response.ok) throw new Error("Failed to update")

        toast({
          title: "Uspešno",
          description: "Guma je uspešno ažurirana",
        })
      } else {
        const response = await fetch("/api/admin/tires", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })

        if (!response.ok) throw new Error("Failed to add")

        toast({
          title: "Uspešno",
          description: "Guma je uspešno dodana",
        })
      }

      setShowForm(false)
      setEditingTire(undefined)
      await loadTires()
    } catch (error) {
      console.error("[v0] Error saving tire:", error)
      toast({
        title: "Greška",
        description: "Nije moguće sačuvati gumu",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/admin/tires/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete")

      toast({
        title: "Uspješno",
        description: "Guma je uspješno obrisana",
      })

      await loadTires()
    } catch (error) {
      console.error("Error deleting tire:", error)
      toast({
        title: "Greška",
        description: "Nije moguće obrisati gumu",
        variant: "destructive",
      })
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingTire(undefined)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-4">
              <Link href="/" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Nazad na početnu
              </Link>
            </Button>

            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
                <p className="text-muted-foreground mt-1">Upravljanje inventarom guma</p>
              </div>

              {!showForm && (
                <Button onClick={handleAddNew} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Dodaj novu gumu
                </Button>
              )}
            </div>
          </div>

          {showForm ? (
            <Card className="animate-fadeIn">
              <CardHeader>
                <CardTitle>{editingTire ? "Uredi Gumu" : "Dodaj Novu Gumu"}</CardTitle>
                <CardDescription>Popunite sve potrebne informacije o gumi</CardDescription>
              </CardHeader>
              <CardContent>
                <TireForm tire={editingTire} onSubmit={handleSubmit} onCancel={handleCancel} />
              </CardContent>
            </Card>
          ) : loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Učitavanje...</p>
            </div>
          ) : (
            <Card className="animate-fadeIn">
              <CardHeader>
                <CardTitle>Sve Gume ({tires.length})</CardTitle>
                <CardDescription>Pregled i upravljanje svim gumama u bazi podataka</CardDescription>
              </CardHeader>
              <CardContent>
                <TireTable tires={tires} onEdit={handleEdit} onDelete={handleDelete} />
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
