export type ZodiacSign = {
  name: string
  slug: string
  date: string
  element: string
  rulingPlanet: string
  symbol: string
  personalityTraits: string
  strengths: string[]
  weaknesses: string[]
  compatibility: {
    description: string
    bestMatches: string[]
  }
}

export const zodiacSigns: ZodiacSign[] = [
  {
    name: "Aries",
    slug: "aries",
    date: "March 21 - April 19",
    element: "Fire",
    rulingPlanet: "Mars",
    symbol: "Ram",
    personalityTraits:
      "Aries is a cardinal fire sign known for being bold, ambitious, and energetic. People born under this sign are natural leaders who approach life with enthusiasm and determination. They're not afraid to take risks and often dive headfirst into new challenges.",
    strengths: [
      "Courageous and determined",
      "Confident and enthusiastic",
      "Honest and passionate",
      "Natural leader",
      "Energetic and dynamic",
    ],
    weaknesses: [
      "Impatient and impulsive",
      "Short-tempered",
      "Competitive to a fault",
      "Can be selfish at times",
      "May lack follow-through on projects",
    ],
    compatibility: {
      description:
        "Aries pairs well with other fire signs for passion and excitement, and with air signs for intellectual stimulation. They need partners who can match their energy and independence.",
      bestMatches: ["Leo", "Sagittarius", "Gemini", "Aquarius"],
    },
  },
  {
    name: "Taurus",
    slug: "taurus",
    date: "April 20 - May 20",
    element: "Earth",
    rulingPlanet: "Venus",
    symbol: "Bull",
    personalityTraits:
      "Taurus is a fixed earth sign characterized by reliability, practicality, and a love of comfort and luxury. Those born under this sign are known for their patience, determination, and appreciation for beauty and the finer things in life.",
    strengths: [
      "Reliable and patient",
      "Practical and devoted",
      "Responsible and stable",
      "Loyal and dependable",
      "Appreciates beauty and comfort",
    ],
    weaknesses: [
      "Stubborn and inflexible",
      "Possessive and materialistic",
      "Resistant to change",
      "Can be lazy or indulgent",
      "Sometimes overly cautious",
    ],
    compatibility: {
      description:
        "Taurus connects well with other earth signs for stability and shared values, and with water signs for emotional depth. They need partners who appreciate their steadfastness and sensuality.",
      bestMatches: ["Virgo", "Capricorn", "Cancer", "Pisces"],
    },
  },
  {
    name: "Gemini",
    slug: "gemini",
    date: "May 21 - June 20",
    element: "Air",
    rulingPlanet: "Mercury",
    symbol: "Twins",
    personalityTraits:
      "Gemini is a mutable air sign known for being curious, adaptable, and communicative. People born under this sign are intellectually driven, quick-witted, and socially versatile. They have a natural gift for language and tend to be the life of any party.",
    strengths: [
      "Adaptable and versatile",
      "Outgoing and communicative",
      "Intellectual and curious",
      "Quick-witted and clever",
      "Youthful and lively",
    ],
    weaknesses: [
      "Inconsistent and indecisive",
      "Restless and easily bored",
      "May be superficial at times",
      "Nervous or anxious energy",
      "Can be two-faced or gossipy",
    ],
    compatibility: {
      description:
        "Gemini connects well with other air signs for intellectual stimulation, and with fire signs for shared enthusiasm. They need partners who can keep up with their mental energy and love of variety.",
      bestMatches: ["Libra", "Aquarius", "Aries", "Leo"],
    },
  },
  {
    name: "Cancer",
    slug: "cancer",
    date: "June 21 - July 22",
    element: "Water",
    rulingPlanet: "Moon",
    symbol: "Crab",
    personalityTraits:
      "Cancer is a cardinal water sign characterized by emotional depth, intuition, and nurturing tendencies. Those born under this sign are deeply connected to home and family, with a strong protective instinct and remarkable emotional intelligence.",
    strengths: [
      "Deeply caring and nurturing",
      "Intuitive and empathetic",
      "Loyal and protective",
      "Tenacious and persuasive",
      "Imaginative and creative",
    ],
    weaknesses: [
      "Moody and overly sensitive",
      "Clingy or dependent",
      "Manipulative when hurt",
      "Holds grudges",
      "Avoids direct confrontation",
    ],
    compatibility: {
      description:
        "Cancer connects deeply with other water signs for emotional understanding, and with earth signs for security and stability. They need partners who respect their sensitivity and offer emotional security.",
      bestMatches: ["Scorpio", "Pisces", "Taurus", "Virgo"],
    },
  },
  {
    name: "Leo",
    slug: "leo",
    date: "July 23 - August 22",
    element: "Fire",
    rulingPlanet: "Sun",
    symbol: "Lion",
    personalityTraits:
      "Leo is a fixed fire sign known for being confident, charismatic, and creative. People born under this sign have natural leadership abilities, a flair for the dramatic, and a generous spirit. They light up any room they enter and inspire others with their warmth and enthusiasm.",
    strengths: [
      "Confident and charismatic",
      "Generous and warm-hearted",
      "Creative and passionate",
      "Loyal and protective",
      "Natural leader",
    ],
    weaknesses: [
      "Arrogant or self-centered",
      "Stubborn and inflexible",
      "Dramatic or attention-seeking",
      "Can be domineering",
      "Sensitive to criticism",
    ],
    compatibility: {
      description:
        "Leo pairs wonderfully with other fire signs for shared passion, and with air signs who appreciate their warmth and creativity. They need partners who admire them while maintaining their own identity.",
      bestMatches: ["Aries", "Sagittarius", "Gemini", "Libra"],
    },
  },
  {
    name: "Virgo",
    slug: "virgo",
    date: "August 23 - September 22",
    element: "Earth",
    rulingPlanet: "Mercury",
    symbol: "Maiden",
    personalityTraits:
      "Virgo is a mutable earth sign characterized by analytical thinking, attention to detail, and practicality. Those born under this sign are methodical problem-solvers with a desire for improvement and perfection. They have a natural ability to see what needs fixing and the skills to make it better.",
    strengths: [
      "Analytical and practical",
      "Meticulous attention to detail",
      "Reliable and hardworking",
      "Intelligent and observant",
      "Helpful and service-oriented",
    ],
    weaknesses: [
      "Overly critical (of self and others)",
      "Perfectionist tendencies",
      "Worrying and overthinking",
      "Can be judgmental",
      "Difficulty relaxing",
    ],
    compatibility: {
      description:
        "Virgo connects well with other earth signs for shared practicality, and with water signs who appreciate their helpfulness. They need partners who value their intelligence and aren't put off by their attention to detail.",
      bestMatches: ["Taurus", "Capricorn", "Cancer", "Scorpio"],
    },
  },
  {
    name: "Libra",
    slug: "libra",
    date: "September 23 - October 22",
    element: "Air",
    rulingPlanet: "Venus",
    symbol: "Scales",
    personalityTraits:
      "Libra is a cardinal air sign known for being diplomatic, fair-minded, and relationship-oriented. People born under this sign value harmony and balance, with a natural gift for seeing all sides of a situation. They have a refined aesthetic sense and a strong desire for partnership.",
    strengths: [
      "Diplomatic and fair-minded",
      "Social and cooperative",
      "Gracious and charming",
      "Idealistic and peacekeeping",
      "Appreciates beauty and harmony",
    ],
    weaknesses: [
      "Indecisive and avoids confrontation",
      "Can be superficial",
      "People-pleasing tendencies",
      "May be unreliable or flaky",
      "Can hold grudges while appearing fine",
    ],
    compatibility: {
      description:
        "Libra connects beautifully with other air signs for intellectual rapport, and with fire signs who bring passion to the relationship. They need partners who value partnership while respecting their need for balance.",
      bestMatches: ["Gemini", "Aquarius", "Leo", "Sagittarius"],
    },
  },
  {
    name: "Scorpio",
    slug: "scorpio",
    date: "October 23 - November 21",
    element: "Water",
    rulingPlanet: "Pluto, Mars",
    symbol: "Scorpion",
    personalityTraits:
      "Scorpio is a fixed water sign characterized by intensity, passion, and emotional depth. Those born under this sign are determined and resourceful, with an uncanny ability to see beneath the surface. They approach life with a transformative energy and unwavering focus.",
    strengths: [
      "Passionate and determined",
      "Resourceful and brave",
      "Loyal and protective",
      "Perceptive and intuitive",
      "Magnetic and charismatic",
    ],
    weaknesses: [
      "Jealous and possessive",
      "Secretive and suspicious",
      "Manipulative when threatened",
      "Vengeful and unforgiving",
      "Can be obsessive",
    ],
    compatibility: {
      description:
        "Scorpio connects deeply with other water signs who understand their emotional intensity, and with earth signs who provide stability. They need partners who aren't afraid of depth and can handle their powerful nature.",
      bestMatches: ["Cancer", "Pisces", "Virgo", "Capricorn"],
    },
  },
  {
    name: "Sagittarius",
    slug: "sagittarius",
    date: "November 22 - December 21",
    element: "Fire",
    rulingPlanet: "Jupiter",
    symbol: "Archer",
    personalityTraits:
      "Sagittarius is a mutable fire sign known for being adventurous, optimistic, and freedom-loving. People born under this sign have a philosophical outlook, a love of learning, and a desire to explore both physically and mentally. They bring enthusiasm and honesty to everything they do.",
    strengths: [
      "Optimistic and enthusiastic",
      "Adventurous and freedom-loving",
      "Honest and straightforward",
      "Intellectual and philosophical",
      "Generous and good-humored",
    ],
    weaknesses: [
      "Tactless and careless with words",
      "Restless and impatient",
      "Commitment-phobic",
      "Promises more than can deliver",
      "Can be irresponsible",
    ],
    compatibility: {
      description:
        "Sagittarius connects well with other fire signs who share their enthusiasm, and with air signs who appreciate their ideas and independence. They need partners who give them freedom while joining their adventures.",
      bestMatches: ["Aries", "Leo", "Gemini", "Libra"],
    },
  },
  {
    name: "Capricorn",
    slug: "capricorn",
    date: "December 22 - January 19",
    element: "Earth",
    rulingPlanet: "Saturn",
    symbol: "Goat",
    personalityTraits:
      "Capricorn is a cardinal earth sign characterized by ambition, discipline, and practicality. Those born under this sign are patient, strategic planners with a strong work ethic and determination to succeed. They approach life with responsibility and a desire for achievement and recognition.",
    strengths: [
      "Ambitious and disciplined",
      "Patient and practical",
      "Responsible and reliable",
      "Strategic and resourceful",
      "Loyal and traditional",
    ],
    weaknesses: [
      "Pessimistic or fatalistic",
      "Workaholic tendencies",
      "Can be rigid and stubborn",
      "Status-conscious",
      "Can be unforgiving",
    ],
    compatibility: {
      description:
        "Capricorn connects well with other earth signs who share their practicality, and with water signs who add emotional depth to their lives. They need partners who respect their ambition and traditional values.",
      bestMatches: ["Taurus", "Virgo", "Scorpio", "Pisces"],
    },
  },
  {
    name: "Aquarius",
    slug: "aquarius",
    date: "January 20 - February 18",
    element: "Air",
    rulingPlanet: "Uranus, Saturn",
    symbol: "Water Bearer",
    personalityTraits:
      "Aquarius is a fixed air sign known for being innovative, progressive, and humanitarian. People born under this sign are independent thinkers with a vision for the future and a desire to make the world a better place. They approach life with originality and a strong sense of community.",
    strengths: [
      "Original and innovative",
      "Humanitarian and progressive",
      "Independent and intellectual",
      "Loyal to causes and friends",
      "Visionary and inventive",
    ],
    weaknesses: [
      "Emotionally detached",
      "Unpredictable and stubborn",
      "Aloof or impersonal",
      "Rebellious for its own sake",
      "Can be extremist in views",
    ],
    compatibility: {
      description:
        "Aquarius connects well with other air signs who share their intellectual approach, and with fire signs who appreciate their vision and independence. They need partners who respect their uniqueness and share their ideals.",
      bestMatches: ["Gemini", "Libra", "Aries", "Sagittarius"],
    },
  },
  {
    name: "Pisces",
    slug: "pisces",
    date: "February 19 - March 20",
    element: "Water",
    rulingPlanet: "Neptune, Jupiter",
    symbol: "Fish",
    personalityTraits:
      "Pisces is a mutable water sign characterized by compassion, intuition, and artistic sensitivity. Those born under this sign are empathetic dreamers with a rich inner life and spiritual inclination. They approach life with imagination and a desire to connect deeply with others and the universe.",
    strengths: [
      "Compassionate and empathetic",
      "Intuitive and psychic",
      "Artistic and creative",
      "Gentle and wise",
      "Selfless and unworldly",
    ],
    weaknesses: [
      "Escapist tendencies",
      "Overly sensitive or emotional",
      "Can be gullible or naive",
      "Prone to victim mentality",
      "Difficulty with boundaries",
    ],
    compatibility: {
      description:
        "Pisces connects deeply with other water signs who understand their emotional nature, and with earth signs who provide grounding. They need partners who appreciate their sensitivity and imagination.",
      bestMatches: ["Cancer", "Scorpio", "Taurus", "Capricorn"],
    },
  },
]

export function getZodiacBySlug(slug: string): ZodiacSign | undefined {
  return zodiacSigns.find((sign) => sign.slug === slug)
}

export function getZodiacByName(name: string): ZodiacSign | undefined {
  return zodiacSigns.find((sign) => sign.name.toLowerCase() === name.toLowerCase())
}
