"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { Tire } from "@/lib/db"

interface TireTableProps {
  tires: Tire[]
  onEdit: (tire: Tire) => void
  onDelete: (id: number) => Promise<void>
}

export function TireTable({ tires, onEdit, onDelete }: TireTableProps) {
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    if (deleteId === null) return

    setDeleting(true)
    try {
      await onDelete(deleteId)
      setDeleteId(null)
    } finally {
      setDeleting(false)
    }
  }

  const seasonColors = {
    Letnja: "bg-orange-500/10 text-orange-700 dark:text-orange-400",
    Zimska: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
    Allseason: "bg-green-500/10 text-green-700 dark:text-green-400",
  }

  return (
    <>
      <div className="rounded-md border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Brend</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Dimenzije</TableHead>
              <TableHead>Sezona</TableHead>
              <TableHead>Stanje</TableHead>
              <TableHead>Količina</TableHead>
              <TableHead>Cena</TableHead>
              <TableHead className="text-right">Akcije</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tires.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  Nema guma u bazi podataka
                </TableCell>
              </TableRow>
            ) : (
              tires.map((tire) => (
                <TableRow key={tire.id}>
                  <TableCell className="font-medium">{tire.brand}</TableCell>
                  <TableCell>{tire.model}</TableCell>
                  <TableCell className="font-mono">
                    {tire.width}/{tire.aspect_ratio} R{tire.diameter}
                  </TableCell>
                  <TableCell>
                    <Badge className={seasonColors[tire.season]}>{tire.season}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">{tire.condition}</span>
                  </TableCell>
                  <TableCell>{tire.quantity} kom.</TableCell>
                  <TableCell className="font-semibold">{tire.price.toLocaleString("sr-RS")} EUR</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button size="sm" variant="outline" onClick={() => onEdit(tire)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => setDeleteId(tire.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Potvrdite brisanje</AlertDialogTitle>
            <AlertDialogDescription>
              Da li ste sigurni da želite da obrišete ovu gumu? Ova akcija se ne može poništiti.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Otkaži</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleting}>
              {deleting ? "Brisanje..." : "Obriši"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
