"use client"

import { Shield, Truck, ThumbsUp, Clock } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Proverene Gume",
    description: "Sve gume su detaljno pregledane i proverene pre prodaje. Garantujemo kvalitet i sigurnost.",
  },
  {
    icon: Truck,
    title: "Brza Dostava",
    description: "Dostavljamo širom Srbije u roku od 24-48 sati. Mogućnost preuzimanja na licu mesta.",
  },
  {
    icon: ThumbsUp,
    title: "Najbolje Cijene",
    description: "Kvalitetne polovne gume po pristupačnim cenama. Odličan odnos cene i kvaliteta.",
  },
  {
    icon: Clock,
    title: "Stručna Pomoć",
    description: "Naš tim je dostupan da vam pomogne u odabiru pravih guma za vaše vozilo.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
            Zašto Kupiti od Nas?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Pružamo kompletan servis i podršku pri kupovini polovnih guma
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all hover:shadow-lg animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                  <Icon className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-card-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
