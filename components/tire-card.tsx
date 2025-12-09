"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"
import type { Tire } from "@/lib/db"

interface TireCardProps {
  tire: Tire
}

export function TireCard({ tire }: TireCardProps) {
  const seasonColors = {
    Letnja: "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20",
    Zimska: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
    Cjelogodisnja: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
  }

  const conditionColors = {
    Odlicno: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
    "Vrlo dobro": "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20",
    Dobro: "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20",
  }

  return (
    <Card className="group overflow-hidden glass card-hover border-2">
      <CardHeader className="p-0">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={tire.image_url || "/placeholder.svg?height=400&width=400&query=tire"}
            alt={`${tire.brand} ${tire.model}`}
            className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-2"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute right-2 top-2 flex flex-col gap-2">
            <Badge className={`${seasonColors[tire.season]} border backdrop-blur-sm`}>{tire.season}</Badge>
            <Badge className={`${conditionColors[tire.condition]} border backdrop-blur-sm`}>{tire.condition}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {tire.brand} {tire.model}
        </h3>
        <p className="mt-1 text-2xl font-bold gradient-text">
          {tire.width}/{tire.aspect_ratio} R{tire.diameter}
        </p>
        {tire.description && <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{tire.description}</p>}
        <div className="mt-3 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Cena (set od 4)</p>
            <p className="text-2xl font-bold text-foreground">{tire.price.toLocaleString("sr-RS")} EUR</p>
          </div>
          <Badge variant="outline" className="glass">{tire.quantity} kom.</Badge>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full gap-2 bg-linear-to-r from-primary to-secondary hover:opacity-90 transition-all group" size="lg">
          <Phone className="h-4 w-4 group-hover:rotate-12 transition-transform" />
          Pozovite za narudžbu
        </Button>
      </CardFooter>
    </Card>
  )
}