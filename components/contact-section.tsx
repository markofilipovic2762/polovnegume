"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export function ContactSection() {
  return (
    <section id="kontakt" className="py-16 md:py-24 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative">
        <div className="mx-auto max-w-2xl text-center mb-12 animate-fadeIn">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance gradient-text">
            Kontaktirajte Nas
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Imate pitanja? Spremni smo da vam pomognemo u odabiru pravih guma
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6 animate-slideIn">
            <Card className="glass border-2 card-hover">
              <CardHeader>
                <CardTitle className="gradient-text">Kontakt Informacije</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 group">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-card-foreground">Adresa</p>
                    <p className="text-sm text-muted-foreground">
                      Revolucije 103
                      <br />
                      11300 Smederevo, Srbija
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 group">
                  <div className="p-2 rounded-lg bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                    <Phone className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium text-card-foreground">Telefon</p>
                    <p className="text-sm text-muted-foreground">
                      +381 64 361 04 24
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 group">
                  <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                    <Mail className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-card-foreground">Email</p>
                    <p className="text-sm text-muted-foreground">info@autogume.rs</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 group">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-card-foreground">Radno Vreme</p>
                    <p className="text-sm text-muted-foreground">
                      Pon - Pet: 08:00 - 17:00
                      <br />
                      Subota: 08:00 - 14:00
                      <br />
                      Nedelja: Zatvoreno
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="glass border-2 card-hover animate-slideIn" style={{ animationDelay: '200ms' }}>
            <CardHeader>
              <CardTitle className="gradient-text">Pošaljite Poruku</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                      Ime i prezime
                    </label>
                    <Input 
                      id="name" 
                      placeholder="Vaše ime" 
                      className="glass border-2 focus:border-primary transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-foreground">
                      Telefon
                    </label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="061 234 567"
                      className="glass border-2 focus:border-primary transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email
                  </label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="vas@email.rs"
                    className="glass border-2 focus:border-primary transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    Poruka
                  </label>
                  <Textarea 
                    id="message" 
                    placeholder="Napišite vašu poruku..." 
                    rows={5}
                    className="glass border-2 focus:border-primary transition-all resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-linear-to-r from-primary to-secondary hover:opacity-90 transition-all duration-800 hover:scale-105" 
                  size="lg"
                >
                  Pošalji Poruku
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}