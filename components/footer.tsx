import Link from "next/link"
import { Car } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                <Car className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">PolovneGume Denkić</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Vaš pouzdan partner za kvalitetne polovne gume. Provereno, sigurno, pristupačno.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Navigacija</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-secondary transition-colors">
                  Početna
                </Link>
              </li>
              <li>
                <Link href="#kontakt" className="text-muted-foreground hover:text-secondary transition-colors">
                  Kontakt
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-muted-foreground hover:text-secondary transition-colors">
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Kategorije</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">Letnje gume</li>
              <li className="text-muted-foreground">Zimske gume</li>
              <li className="text-muted-foreground">Allseason gume</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Kontakt</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Smederevo, Srbija</li>
              <li>+381 64 361 04 24</li>
              <li>info@autogume.rs</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} PolovneGume Denkić. Sva prava zadržana.</p>
        </div>
      </div>
    </footer>
  )
}
