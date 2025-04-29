import Link from "next/link"
import ZodiacSearch from "@/components/zodiac-search"
import { zodiacSigns } from "@/lib/zodiac-data"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Zodiac Explorer
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover the mysteries of the zodiac and learn about your astrological sign
        </p>
      </header>

      <ZodiacSearch />

      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-8 text-center">All Zodiac Signs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {zodiacSigns.map((sign) => (
            <Link key={sign.name} href={`/zodiac/${sign.slug}`} className="group">
              <div className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                <div className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                  <div className="w-24 h-24 flex items-center justify-center">
                    <img
                      src={`/images/${sign.slug}.svg`}
                      alt={sign.name}
                      className="w-16 h-16 group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
                <div className="p-4 flex-grow">
                  <h3 className="text-xl font-medium text-center">{sign.name}</h3>
                  <p className="text-sm text-muted-foreground text-center mt-1">{sign.date}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
