import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { zodiacSigns, getZodiacBySlug } from "@/lib/zodiac-data"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  return zodiacSigns.map((sign) => ({
    sign: sign.slug,
  }))
}

export default function ZodiacSignPage({ params }: { params: { sign: string } }) {
  const zodiacSign = getZodiacBySlug(params.sign)

  if (!zodiacSign) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all signs
        </Button>
      </Link>

      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="w-40 h-40 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full flex items-center justify-center p-8">
            <img src={`/images/${zodiacSign.slug}.svg`} alt={zodiacSign.name} className="w-full h-full" />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2">{zodiacSign.name}</h1>
            <p className="text-xl text-muted-foreground">{zodiacSign.date}</p>
            <div className="flex flex-wrap gap-3 mt-4">
              <div className="bg-muted px-3 py-1 rounded-full text-sm">Element: {zodiacSign.element}</div>
              <div className="bg-muted px-3 py-1 rounded-full text-sm">Ruling Planet: {zodiacSign.rulingPlanet}</div>
              <div className="bg-muted px-3 py-1 rounded-full text-sm">Symbol: {zodiacSign.symbol}</div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Personality Traits</h2>
            <p className="text-muted-foreground leading-relaxed">{zodiacSign.personalityTraits}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Strengths</h2>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              {zodiacSign.strengths.map((strength, index) => (
                <li key={index}>{strength}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Weaknesses</h2>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              {zodiacSign.weaknesses.map((weakness, index) => (
                <li key={index}>{weakness}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Compatibility</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{zodiacSign.compatibility.description}</p>
            <div className="flex flex-wrap gap-3">
              <h3 className="text-lg font-medium mr-2">Best Matches:</h3>
              {zodiacSign.compatibility.bestMatches.map((match, index) => (
                <Link
                  key={index}
                  href={`/zodiac/${match.toLowerCase().replace(" ", "-")}`}
                  className="bg-primary/10 hover:bg-primary/20 px-3 py-1 rounded-full text-sm transition-colors"
                >
                  {match}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
