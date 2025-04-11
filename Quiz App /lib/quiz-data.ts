export interface Question {
  question: string
  options: string[]
  correctAnswer: string
  difficulty: "easy" | "medium" | "hard"
}

// Function to get random questions from the question bank
export function getRandomQuestions(count: number): Question[] {
  // Shuffle the array using Fisher-Yates algorithm
  const shuffled = [...questionBank].sort(() => 0.5 - Math.random())
  // Return the first 'count' elements
  return shuffled.slice(0, count)
}

export function calculateIQ(score: number, totalQuestions: number): number {
  // This is a simplified mock calculation
  // Real IQ calculations are much more complex and standardized
  const baseIQ = 100
  const maxDeviation = 50

  // Calculate percentage correct
  const percentageCorrect = score / totalQuestions

  // Map percentage to IQ range (50-150)
  // 0% = 50 IQ, 50% = 100 IQ, 100% = 150 IQ
  const iqScore = Math.round(baseIQ + (percentageCorrect - 0.5) * 2 * maxDeviation)

  // Ensure IQ is within reasonable bounds
  return Math.max(50, Math.min(150, iqScore))
}

export function getFunnyReply(iqScore: number, name: string): string {
  if (iqScore < 70) {
    return `${name}, your brain might be on vacation, but at least your sense of humor is working overtime!`
  } else if (iqScore < 90) {
    return `${name}, you're not Einstein, but hey, he never had your amazing taste in online quizzes!`
  } else if (iqScore < 110) {
    return `${name}, perfectly average! Like a human Swiss Army knife - not spectacular at anything, but handy in most situations.`
  } else if (iqScore < 130) {
    return `${name}, you're smarter than most people, but still dumb enough to be fun at parties!`
  } else if (iqScore < 145) {
    return `${name}, with that brain of yours, you could probably explain quantum physics to a toddler... or at least convince them you can.`
  } else {
    return `${name}, your IQ is so high, you probably find normal conversations as exciting as watching paint dry. Our condolences to your friends!`
  }
}

// Large question bank with 200+ questions
export const questionBank: Question[] = [
  // MATH - EASY
  {
    question: "What is 8 × 7?",
    options: ["54", "56", "64", "72"],
    correctAnswer: "56",
    difficulty: "easy",
  },
  {
    question: "Which number should come next in this series: 2, 4, 8, 16, ...?",
    options: ["24", "32", "30", "36"],
    correctAnswer: "32",
    difficulty: "easy",
  },
  {
    question: "What is 15% of 200?",
    options: ["15", "30", "20", "25"],
    correctAnswer: "30",
    difficulty: "easy",
  },
  {
    question: "If you have 12 apples and give away 5, how many do you have left?",
    options: ["5", "7", "8", "6"],
    correctAnswer: "7",
    difficulty: "easy",
  },
  {
    question: "What is the square root of 81?",
    options: ["8", "9", "7", "10"],
    correctAnswer: "9",
    difficulty: "easy",
  },
  {
    question: "If a shirt costs $25 and is on sale for 20% off, what is the sale price?",
    options: ["$15", "$20", "$22", "$18"],
    correctAnswer: "$20",
    difficulty: "easy",
  },
  {
    question: "What is 3² + 4²?",
    options: ["25", "24", "7", "49"],
    correctAnswer: "25",
    difficulty: "easy",
  },
  {
    question: "If a rectangle has a length of 8 cm and a width of 5 cm, what is its area?",
    options: ["13 cm²", "40 cm²", "26 cm²", "35 cm²"],
    correctAnswer: "40 cm²",
    difficulty: "easy",
  },
  {
    question: "What is the next number in the sequence: 1, 4, 9, 16, 25, ...?",
    options: ["30", "36", "49", "64"],
    correctAnswer: "36",
    difficulty: "easy",
  },
  {
    question: "If 3x = 21, what is x?",
    options: ["6", "7", "8", "9"],
    correctAnswer: "7",
    difficulty: "easy",
  },

  // MATH - MEDIUM
  {
    question:
      "If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?",
    options: ["5 minutes", "100 minutes", "20 minutes", "500 minutes"],
    correctAnswer: "5 minutes",
    difficulty: "medium",
  },
  {
    question: "What is the value of x in the equation 2x² - 8 = 0?",
    options: ["2", "4", "±2", "±4"],
    correctAnswer: "±2",
    difficulty: "medium",
  },
  {
    question: "A car travels at 60 mph. How far will it travel in 2 hours and 30 minutes?",
    options: ["120 miles", "150 miles", "180 miles", "90 miles"],
    correctAnswer: "150 miles",
    difficulty: "medium",
  },
  {
    question: "If the probability of an event occurring is 0.3, what is the probability of it not occurring?",
    options: ["0.3", "0.7", "0.6", "1.3"],
    correctAnswer: "0.7",
    difficulty: "medium",
  },
  {
    question: "What is the sum of the interior angles of a hexagon?",
    options: ["540°", "720°", "900°", "1080°"],
    correctAnswer: "720°",
    difficulty: "medium",
  },
  {
    question: "If log₁₀(x) = 2, what is x?",
    options: ["20", "100", "200", "1000"],
    correctAnswer: "100",
    difficulty: "medium",
  },
  {
    question: "What is the value of 5! (5 factorial)?",
    options: ["25", "120", "60", "720"],
    correctAnswer: "120",
    difficulty: "medium",
  },
  {
    question: "If a triangle has sides of length 3, 4, and 5, what is its area?",
    options: ["6", "10", "12", "15"],
    correctAnswer: "6",
    difficulty: "medium",
  },
  {
    question: "What is the solution to the equation |2x - 6| = 8?",
    options: ["x = -1 or x = 7", "x = 1 or x = 7", "x = -1 or x = -7", "x = 1 or x = -7"],
    correctAnswer: "x = -1 or x = 7",
    difficulty: "medium",
  },
  {
    question: "If f(x) = x² - 3x + 2, what is f(4)?",
    options: ["6", "10", "14", "18"],
    correctAnswer: "10",
    difficulty: "medium",
  },

  // MATH - HARD
  {
    question: "What is the derivative of f(x) = x³ - 4x² + 2x - 7?",
    options: ["f'(x) = 3x² - 8x + 2", "f'(x) = 3x² - 4x + 2", "f'(x) = 3x² - 8x - 7", "f'(x) = x² - 8x + 2"],
    correctAnswer: "f'(x) = 3x² - 8x + 2",
    difficulty: "hard",
  },
  {
    question: "In a group of 7 people, how many different ways can a committee of 3 people be formed?",
    options: ["21", "35", "42", "210"],
    correctAnswer: "35",
    difficulty: "hard",
  },
  {
    question: "What is the sum of the infinite geometric series 1 + 1/3 + 1/9 + 1/27 + ...?",
    options: ["3/2", "4/3", "5/4", "3"],
    correctAnswer: "3/2",
    difficulty: "hard",
  },
  {
    question: "If the standard deviation of a data set is 5, what is the variance?",
    options: ["5", "10", "25", "√5"],
    correctAnswer: "25",
    difficulty: "hard",
  },
  {
    question: "What is the value of sin(π/4) + cos(π/4)?",
    options: ["1", "√2", "2", "0"],
    correctAnswer: "√2",
    difficulty: "hard",
  },
  {
    question: "Solve for x: log₃(x) + log₃(x+6) = 2",
    options: ["x = 3", "x = 2", "x = 6", "x = 9"],
    correctAnswer: "x = 3",
    difficulty: "hard",
  },
  {
    question: "What is the limit of (sin x)/x as x approaches 0?",
    options: ["0", "1", "∞", "Does not exist"],
    correctAnswer: "1",
    difficulty: "hard",
  },
  {
    question: "If a fair die is rolled twice, what is the probability of getting a sum of 7?",
    options: ["1/6", "5/36", "1/12", "6/36"],
    correctAnswer: "6/36",
    difficulty: "hard",
  },
  {
    question: "What is the determinant of the matrix [[2, 3], [1, 4]]?",
    options: ["5", "7", "8", "10"],
    correctAnswer: "5",
    difficulty: "hard",
  },
  {
    question: "What is the solution to the differential equation dy/dx = 2xy with y(0) = 1?",
    options: ["y = e^(x²)", "y = e^(x²/2)", "y = e^x", "y = xe^x"],
    correctAnswer: "y = e^(x²)",
    difficulty: "hard",
  },

  // LOGIC - EASY
  {
    question: "If all Bloops are Razzies and all Razzies are Lazzies, then:",
    options: ["All Bloops are Lazzies", "All Lazzies are Bloops", "No Bloops are Lazzies", "None of the above"],
    correctAnswer: "All Bloops are Lazzies",
    difficulty: "easy",
  },
  {
    question: "Which number is the odd one out: 2, 3, 7, 12, 13, 17, 22",
    options: ["3", "12", "13", "22"],
    correctAnswer: "12",
    difficulty: "easy",
  },
  {
    question: "If CAT is coded as 312, how would DOG be coded?",
    options: ["415", "413", "412", "315"],
    correctAnswer: "415",
    difficulty: "easy",
  },
  {
    question: "If FRIEND is coded as GSJFOE, how would ENEMY be coded?",
    options: ["FOFNZ", "FOZNF", "OFNFZ", "FOFNX"],
    correctAnswer: "FOFNZ",
    difficulty: "easy",
  },
  {
    question: "Which word does NOT belong with the others?",
    options: ["Apple", "Banana", "Carrot", "Orange"],
    correctAnswer: "Carrot",
    difficulty: "easy",
  },
  {
    question: "If you rearrange the letters 'CIFAIPC', you would have the name of a:",
    options: ["City", "Animal", "Ocean", "Country"],
    correctAnswer: "Ocean",
    difficulty: "easy",
  },
  {
    question: "Which of the following can be arranged into a 5-letter English word?",
    options: ["H R G S T", "R I L S A", "T O M T A", "W Q R G S"],
    correctAnswer: "R I L S A",
    difficulty: "easy",
  },
  {
    question: "A is to Z as 1 is to:",
    options: ["26", "25", "24", "27"],
    correctAnswer: "26",
    difficulty: "easy",
  },
  {
    question: "Book is to Reading as Fork is to:",
    options: ["Drawing", "Writing", "Eating", "Walking"],
    correctAnswer: "Eating",
    difficulty: "easy",
  },
  {
    question: "Complete the analogy: Pen is to Writer as Brush is to:",
    options: ["Artist", "Painting", "Canvas", "Color"],
    correctAnswer: "Artist",
    difficulty: "easy",
  },

  // LOGIC - MEDIUM
  {
    question: "If it takes 8 men 6 hours to build a wall, how long would it take 4 men to build the same wall?",
    options: ["3 hours", "12 hours", "16 hours", "24 hours"],
    correctAnswer: "12 hours",
    difficulty: "medium",
  },
  {
    question:
      "A man is 4 times as old as his son. In 20 years, he will be twice as old as his son. How old is the son now?",
    options: ["10", "15", "20", "25"],
    correctAnswer: "20",
    difficulty: "medium",
  },
  {
    question: "In a race, if you overtake the second person, what position are you in?",
    options: ["First", "Second", "Third", "Cannot determine"],
    correctAnswer: "Second",
    difficulty: "medium",
  },
  {
    question: "If all Zorks are Morks, and some Morks are Torks, then:",
    options: ["All Zorks are Torks", "Some Zorks are Torks", "No Zorks are Torks", "Cannot be determined"],
    correctAnswer: "Cannot be determined",
    difficulty: "medium",
  },
  {
    question: "Which number should replace the question mark? 2, 6, 12, 20, 30, ?",
    options: ["42", "40", "36", "48"],
    correctAnswer: "42",
    difficulty: "medium",
  },
  {
    question:
      "If PQRS is a square and T is the midpoint of QR, what is the ratio of the area of triangle PQT to the area of the square PQRS?",
    options: ["1:4", "1:8", "1:6", "1:2"],
    correctAnswer: "1:8",
    difficulty: "medium",
  },
  {
    question: "If a clock shows 3:15, what is the angle between the hour and minute hands?",
    options: ["7.5 degrees", "15 degrees", "22.5 degrees", "30 degrees"],
    correctAnswer: "7.5 degrees",
    difficulty: "medium",
  },
  {
    question: "A cube has a volume of 27 cubic inches. What is the surface area of the cube?",
    options: ["27 square inches", "54 square inches", "81 square inches", "108 square inches"],
    correctAnswer: "54 square inches",
    difficulty: "medium",
  },
  {
    question:
      "If the letters of the word VERTICAL are arranged in all possible ways and these words are written out alphabetically, what is the rank of the word VERTICAL?",
    options: ["720", "5040", "2520", "40320"],
    correctAnswer: "5040",
    difficulty: "medium",
  },
  {
    question: "In a certain code, COMPUTER is written as RFUVQNPC. How will PRINTER be written in the same code?",
    options: ["QSJOUFQ", "SFUOJSQ", "QSFUOJQ", "QSJOUFS"],
    correctAnswer: "QSJOUFS",
    difficulty: "medium",
  },

  // LOGIC - HARD
  {
    question:
      "Five people – A, B, C, D, and E – are sitting in a row. B is sitting next to A. E is sitting next to neither A nor B. C is not sitting next to D. A is at one end. Who is sitting in the middle?",
    options: ["B", "C", "D", "E"],
    correctAnswer: "B",
    difficulty: "hard",
  },
  {
    question:
      "If you have a cake and cut it into 8 equal pieces with 3 straight cuts, what is the maximum number of pieces you can get with 4 straight cuts?",
    options: ["11", "15", "16", "18"],
    correctAnswer: "15",
    difficulty: "hard",
  },
  {
    question:
      "In a group of 6 people, each person shakes hands with everyone else exactly once. How many handshakes occur in total?",
    options: ["12", "15", "18", "30"],
    correctAnswer: "15",
    difficulty: "hard",
  },
  {
    question: "A farmer has 10 cows, all but 9 die. How many cows does he have left?",
    options: ["1", "9", "0", "10"],
    correctAnswer: "9",
    difficulty: "hard",
  },
  {
    question:
      "If a, b, c, d, and e are consecutive integers such that a < b < c < d < e, and a + e = b + d, what is the value of c?",
    options: ["0", "1", "2", "3"],
    correctAnswer: "0",
    difficulty: "hard",
  },
  {
    question:
      "A train travels at 40 mph for the first half of the distance and at 60 mph for the second half. What is the average speed for the entire journey?",
    options: ["48 mph", "50 mph", "45 mph", "55 mph"],
    correctAnswer: "48 mph",
    difficulty: "hard",
  },
  {
    question: "If the sum of n consecutive integers is 0, which of the following must be true?",
    options: ["n is odd", "n is even", "The middle number is 0", "The first number is negative"],
    correctAnswer: "n is odd",
    difficulty: "hard",
  },
  {
    question:
      "In how many ways can 8 people be seated around a circular table, considering that seating arrangements are considered the same if one can be obtained from the other by rotation?",
    options: ["40320", "5040", "1440", "2520"],
    correctAnswer: "5040",
    difficulty: "hard",
  },
  {
    question:
      "If x, y, and z are positive integers such that x < y < z and x + y + z = 12, how many different possible values can z take?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "4",
    difficulty: "hard",
  },
  {
    question:
      "A box contains 5 red balls, 3 green balls, and 2 blue balls. If 3 balls are drawn at random without replacement, what is the probability that at least one ball is red?",
    options: ["37/40", "29/30", "9/10", "4/5"],
    correctAnswer: "37/40",
    difficulty: "hard",
  },

  // PATTERN RECOGNITION - EASY
  {
    question: "What comes next in the sequence: 1, 3, 5, 7, ...?",
    options: ["8", "9", "10", "11"],
    correctAnswer: "9",
    difficulty: "easy",
  },
  {
    question: "What is the next letter in the sequence: A, C, E, G, ...?",
    options: ["H", "I", "J", "K"],
    correctAnswer: "I",
    difficulty: "easy",
  },
  {
    question: "What comes next in the sequence: 2, 4, 8, 16, ...?",
    options: ["24", "30", "32", "36"],
    correctAnswer: "32",
    difficulty: "easy",
  },
  {
    question: "What is the next number in the sequence: 3, 6, 9, 12, ...?",
    options: ["13", "14", "15", "16"],
    correctAnswer: "15",
    difficulty: "easy",
  },
  {
    question: "What comes next in the sequence: 1, 4, 9, 16, 25, ...?",
    options: ["30", "36", "49", "64"],
    correctAnswer: "36",
    difficulty: "easy",
  },
  {
    question: "What is the next letter in the sequence: Z, Y, X, W, ...?",
    options: ["T", "U", "V", "S"],
    correctAnswer: "V",
    difficulty: "easy",
  },
  {
    question: "What comes next in the sequence: 1, 1, 2, 3, 5, 8, ...?",
    options: ["11", "12", "13", "14"],
    correctAnswer: "13",
    difficulty: "easy",
  },
  {
    question: "What is the next number in the sequence: 2, 6, 12, 20, ...?",
    options: ["24", "28", "30", "32"],
    correctAnswer: "30",
    difficulty: "easy",
  },
  {
    question: "What comes next in the sequence: 3, 6, 12, 24, ...?",
    options: ["36", "42", "48", "54"],
    correctAnswer: "48",
    difficulty: "easy",
  },
  {
    question: "What is the next letter in the sequence: A, B, D, G, ...?",
    options: ["I", "J", "K", "L"],
    correctAnswer: "K",
    difficulty: "easy",
  },

  // PATTERN RECOGNITION - MEDIUM
  {
    question: "What comes next in the sequence: 31, 29, 24, 22, 17, ...?",
    options: ["15", "14", "13", "12"],
    correctAnswer: "15",
    difficulty: "medium",
  },
  {
    question: "What is the next number in the sequence: 1, 3, 6, 10, 15, ...?",
    options: ["18", "21", "24", "30"],
    correctAnswer: "21",
    difficulty: "medium",
  },
  {
    question: "What comes next in the sequence: 2, 5, 10, 17, 26, ...?",
    options: ["35", "37", "39", "41"],
    correctAnswer: "37",
    difficulty: "medium",
  },
  {
    question: "What is the next letter in the sequence: A, C, F, J, ...?",
    options: ["L", "M", "N", "O"],
    correctAnswer: "O",
    difficulty: "medium",
  },
  {
    question: "What comes next in the sequence: 3, 5, 8, 13, 21, ...?",
    options: ["26", "29", "34", "42"],
    correctAnswer: "34",
    difficulty: "medium",
  },
  {
    question: "What is the next number in the sequence: 1, 4, 10, 22, 46, ...?",
    options: ["86", "92", "94", "98"],
    correctAnswer: "94",
    difficulty: "medium",
  },
  {
    question: "What comes next in the sequence: 1, 2, 6, 24, 120, ...?",
    options: ["240", "480", "600", "720"],
    correctAnswer: "720",
    difficulty: "medium",
  },
  {
    question: "What is the next letter in the sequence: B, D, H, P, ...?",
    options: ["T", "V", "X", "Z"],
    correctAnswer: "Z",
    difficulty: "medium",
  },
  {
    question: "What comes next in the sequence: 2, 6, 18, 54, ...?",
    options: ["108", "162", "216", "324"],
    correctAnswer: "162",
    difficulty: "medium",
  },
  {
    question: "What is the next number in the sequence: 1, 2, 4, 7, 11, ...?",
    options: ["15", "16", "17", "18"],
    correctAnswer: "16",
    difficulty: "medium",
  },

  // PATTERN RECOGNITION - HARD
  {
    question: "What comes next in the sequence: 1, 11, 21, 1211, 111221, ...?",
    options: ["1231", "312211", "12111", "132231"],
    correctAnswer: "312211",
    difficulty: "hard",
  },
  {
    question: "What is the next number in the sequence: 1, 3, 7, 15, 31, ...?",
    options: ["47", "63", "127", "255"],
    correctAnswer: "63",
    difficulty: "hard",
  },
  {
    question: "What comes next in the sequence: 2, 3, 5, 9, 17, ...?",
    options: ["24", "31", "33", "34"],
    correctAnswer: "33",
    difficulty: "hard",
  },
  {
    question: "What is the next letter in the sequence: A, Z, B, Y, C, X, ...?",
    options: ["D", "W", "Y", "Z"],
    correctAnswer: "D",
    difficulty: "hard",
  },
  {
    question: "What comes next in the sequence: 1, 4, 9, 16, 25, 36, 49, ...?",
    options: ["56", "64", "81", "100"],
    correctAnswer: "64",
    difficulty: "hard",
  },
  {
    question: "What is the next number in the sequence: 1, 2, 4, 8, 16, 31, ...?",
    options: ["57", "61", "62", "64"],
    correctAnswer: "57",
    difficulty: "hard",
  },
  {
    question: "What comes next in the sequence: 3, 7, 15, 31, 63, ...?",
    options: ["95", "127", "135", "255"],
    correctAnswer: "127",
    difficulty: "hard",
  },
  {
    question: "What is the next letter in the sequence: O, T, T, F, F, S, S, ...?",
    options: ["E", "N", "S", "T"],
    correctAnswer: "E",
    difficulty: "hard",
  },
  {
    question: "What comes next in the sequence: 1, 1, 2, 3, 5, 8, 13, 21, ...?",
    options: ["26", "34", "42", "55"],
    correctAnswer: "34",
    difficulty: "hard",
  },
  {
    question: "What is the next number in the sequence: 2, 1, 3, 4, 7, 11, ...?",
    options: ["15", "16", "18", "22"],
    correctAnswer: "18",
    difficulty: "hard",
  },

  // SPATIAL REASONING - EASY
  {
    question: "If you fold a square piece of paper in half diagonally, what shape do you get?",
    options: ["Square", "Rectangle", "Triangle", "Trapezoid"],
    correctAnswer: "Triangle",
    difficulty: "easy",
  },
  {
    question: "Which of these shapes has the most sides?",
    options: ["Triangle", "Square", "Pentagon", "Hexagon"],
    correctAnswer: "Hexagon",
    difficulty: "easy",
  },
  {
    question: "If you look at a clock in a mirror, what time will 3:15 appear to be?",
    options: ["9:45", "8:45", "3:15", "6:45"],
    correctAnswer: "8:45",
    difficulty: "easy",
  },
  {
    question: "Which shape is not a polygon?",
    options: ["Triangle", "Square", "Circle", "Pentagon"],
    correctAnswer: "Circle",
    difficulty: "easy",
  },
  {
    question: "How many faces does a cube have?",
    options: ["4", "6", "8", "12"],
    correctAnswer: "6",
    difficulty: "easy",
  },
  {
    question: "If you rotate a square 45 degrees, what shape does it resemble?",
    options: ["Rectangle", "Diamond", "Triangle", "Hexagon"],
    correctAnswer: "Diamond",
    difficulty: "easy",
  },
  {
    question: "Which of these is not a 3D shape?",
    options: ["Cube", "Sphere", "Circle", "Cylinder"],
    correctAnswer: "Circle",
    difficulty: "easy",
  },
  {
    question: "How many edges does a triangular pyramid have?",
    options: ["4", "6", "8", "9"],
    correctAnswer: "6",
    difficulty: "easy",
  },
  {
    question: "If you unfold a cube, how many squares would you see?",
    options: ["4", "5", "6", "8"],
    correctAnswer: "6",
    difficulty: "easy",
  },
  {
    question: "Which shape has exactly one line of symmetry?",
    options: ["Circle", "Square", "Isosceles triangle", "Regular hexagon"],
    correctAnswer: "Isosceles triangle",
    difficulty: "easy",
  },

  // SPATIAL REASONING - MEDIUM
  {
    question: "If a cube has edges of length 3 cm, what is its volume?",
    options: ["9 cm³", "18 cm³", "21 cm³", "27 cm³"],
    correctAnswer: "27 cm³",
    difficulty: "medium",
  },
  {
    question: "How many vertices does a rectangular prism have?",
    options: ["6", "8", "10", "12"],
    correctAnswer: "8",
    difficulty: "medium",
  },
  {
    question: "If you slice a cone with a plane parallel to its base, what shape is the cross-section?",
    options: ["Circle", "Ellipse", "Triangle", "Rectangle"],
    correctAnswer: "Circle",
    difficulty: "medium",
  },
  {
    question:
      "What is the minimum number of colors needed to color any map so that no adjacent regions have the same color?",
    options: ["2", "3", "4", "5"],
    correctAnswer: "4",
    difficulty: "medium",
  },
  {
    question: "How many planes of symmetry does a regular tetrahedron have?",
    options: ["3", "4", "6", "8"],
    correctAnswer: "6",
    difficulty: "medium",
  },
  {
    question: "If you connect the midpoints of adjacent sides of any quadrilateral, what shape do you always get?",
    options: ["Square", "Rectangle", "Parallelogram", "Rhombus"],
    correctAnswer: "Parallelogram",
    difficulty: "medium",
  },
  {
    question: "What is the dual polyhedron of a cube?",
    options: ["Tetrahedron", "Octahedron", "Dodecahedron", "Icosahedron"],
    correctAnswer: "Octahedron",
    difficulty: "medium",
  },
  {
    question: "How many distinct nets can be folded to form a cube?",
    options: ["6", "8", "11", "12"],
    correctAnswer: "11",
    difficulty: "medium",
  },
  {
    question: "What is the shape of the intersection of two cylinders with perpendicular axes?",
    options: ["Circle", "Ellipse", "Square", "None of these"],
    correctAnswer: "None of these",
    difficulty: "medium",
  },
  {
    question: "If a regular octahedron has edges of length 2 cm, what is its volume?",
    options: ["4√2 cm³", "8√2 cm³", "6√2 cm³", "12√2 cm³"],
    correctAnswer: "8√2 cm³",
    difficulty: "medium",
  },

  // SPATIAL REASONING - HARD
  {
    question: "What is the maximum number of regions into which 4 planes can divide 3D space?",
    options: ["8", "11", "14", "15"],
    correctAnswer: "15",
    difficulty: "hard",
  },
  {
    question: "How many distinct Platonic solids exist?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "5",
    difficulty: "hard",
  },
  {
    question: "What is the minimum number of distinct points needed to determine a unique sphere in 3D space?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "4",
    difficulty: "hard",
  },
  {
    question:
      "If a 3×3×3 cube is painted on all sides and then cut into 27 unit cubes, how many unit cubes have exactly one face painted?",
    options: ["6", "8", "12", "24"],
    correctAnswer: "6",
    difficulty: "hard",
  },
  {
    question: "What is the maximum number of pieces into which a circle can be divided by 6 straight lines?",
    options: ["19", "21", "22", "24"],
    correctAnswer: "22",
    difficulty: "hard",
  },
  {
    question: "What is the fourth dimension analog of a cube?",
    options: ["Tesseract", "Hypercube", "Both A and B", "Neither A nor B"],
    correctAnswer: "Both A and B",
    difficulty: "hard",
  },
  {
    question: "How many distinct ways can a 2×2×2 cube be assembled from 8 unit cubes?",
    options: ["1", "8", "24", "40320"],
    correctAnswer: "1",
    difficulty: "hard",
  },
  {
    question: "What is the surface area to volume ratio of a sphere with radius r?",
    options: ["3/r", "4/r", "6/r", "8/r"],
    correctAnswer: "3/r",
    difficulty: "hard",
  },
  {
    question: "What is the name of the only regular polyhedron with regular hexagonal faces?",
    options: ["Dodecahedron", "Truncated icosahedron", "There is no such polyhedron", "Hexahedron"],
    correctAnswer: "There is no such polyhedron",
    difficulty: "hard",
  },
  {
    question: "What is the minimum number of 2D projections needed to uniquely determine a 3D object?",
    options: ["2", "3", "4", "It depends on the object"],
    correctAnswer: "It depends on the object",
    difficulty: "hard",
  },

  // VERBAL REASONING - EASY
  {
    question: "Choose the word that is most nearly opposite in meaning to 'EXPAND':",
    options: ["Contract", "Explode", "Increase", "Enlarge"],
    correctAnswer: "Contract",
    difficulty: "easy",
  },
  {
    question: "Choose the word that is most similar in meaning to 'HAPPY':",
    options: ["Sad", "Angry", "Joyful", "Tired"],
    correctAnswer: "Joyful",
    difficulty: "easy",
  },
  {
    question: "Complete the analogy: Hand is to Glove as Foot is to ___",
    options: ["Leg", "Toe", "Shoe", "Sock"],
    correctAnswer: "Shoe",
    difficulty: "easy",
  },
  {
    question: "Choose the word that does not belong with the others:",
    options: ["Apple", "Banana", "Carrot", "Orange"],
    correctAnswer: "Carrot",
    difficulty: "easy",
  },
  {
    question: "Complete the analogy: Bird is to Sky as Fish is to ___",
    options: ["Water", "Scales", "Swim", "Ocean"],
    correctAnswer: "Water",
    difficulty: "easy",
  },
  {
    question: "Choose the word that is most nearly opposite in meaning to 'BRAVE':",
    options: ["Cowardly", "Strong", "Fearless", "Bold"],
    correctAnswer: "Cowardly",
    difficulty: "easy",
  },
  {
    question: "Choose the word that is most similar in meaning to 'LARGE':",
    options: ["Small", "Tiny", "Big", "Little"],
    correctAnswer: "Big",
    difficulty: "easy",
  },
  {
    question: "Complete the analogy: Doctor is to Patient as Teacher is to ___",
    options: ["School", "Education", "Student", "Learning"],
    correctAnswer: "Student",
    difficulty: "easy",
  },
  {
    question: "Choose the word that does not belong with the others:",
    options: ["Dog", "Cat", "Elephant", "Lion"],
    correctAnswer: "Elephant",
    difficulty: "easy",
  },
  {
    question: "Complete the analogy: Hot is to Cold as Up is to ___",
    options: ["Sky", "Down", "High", "Above"],
    correctAnswer: "Down",
    difficulty: "easy",
  },

  // VERBAL REASONING - MEDIUM
  {
    question: "Choose the word that is most nearly opposite in meaning to 'EPHEMERAL':",
    options: ["Eternal", "Brief", "Temporary", "Fleeting"],
    correctAnswer: "Eternal",
    difficulty: "medium",
  },
  {
    question: "Choose the word that is most similar in meaning to 'PERNICIOUS':",
    options: ["Beneficial", "Harmful", "Persistent", "Pervasive"],
    correctAnswer: "Harmful",
    difficulty: "medium",
  },
  {
    question: "Complete the analogy: Oasis is to Desert as Island is to ___",
    options: ["Water", "Ocean", "Sand", "Palm"],
    correctAnswer: "Ocean",
    difficulty: "medium",
  },
  {
    question: "Choose the word that does not belong with the others:",
    options: ["Symphony", "Concerto", "Sonata", "Ballet"],
    correctAnswer: "Ballet",
    difficulty: "medium",
  },
  {
    question: "Complete the analogy: Pen is to Ink as Computer is to ___",
    options: ["Keyboard", "Data", "Electricity", "Internet"],
    correctAnswer: "Electricity",
    difficulty: "medium",
  },
  {
    question: "Choose the word that is most nearly opposite in meaning to 'VERBOSE':",
    options: ["Concise", "Talkative", "Eloquent", "Wordy"],
    correctAnswer: "Concise",
    difficulty: "medium",
  },
  {
    question: "Choose the word that is most similar in meaning to 'UBIQUITOUS':",
    options: ["Rare", "Omnipresent", "Unique", "Unusual"],
    correctAnswer: "Omnipresent",
    difficulty: "medium",
  },
  {
    question: "Complete the analogy: Composer is to Symphony as Author is to ___",
    options: ["Book", "Pen", "Novel", "Writing"],
    correctAnswer: "Novel",
    difficulty: "medium",
  },
  {
    question: "Choose the word that does not belong with the others:",
    options: ["Painting", "Sculpture", "Architecture", "Literature"],
    correctAnswer: "Literature",
    difficulty: "medium",
  },
  {
    question: "Complete the analogy: Oxygen is to Breathing as Food is to ___",
    options: ["Eating", "Cooking", "Digestion", "Hunger"],
    correctAnswer: "Digestion",
    difficulty: "medium",
  },

  // VERBAL REASONING - HARD
  {
    question: "Choose the word that is most nearly opposite in meaning to 'OBFUSCATE':",
    options: ["Clarify", "Confuse", "Obscure", "Complicate"],
    correctAnswer: "Clarify",
    difficulty: "hard",
  },
  {
    question: "Choose the word that is most similar in meaning to 'SYCOPHANT':",
    options: ["Critic", "Flatterer", "Opponent", "Cynic"],
    correctAnswer: "Flatterer",
    difficulty: "hard",
  },
  {
    question: "Complete the analogy: Iconoclast is to Tradition as Anarchist is to ___",
    options: ["Chaos", "Government", "Revolution", "Freedom"],
    correctAnswer: "Government",
    difficulty: "hard",
  },
  {
    question: "Choose the word that does not belong with the others:",
    options: ["Soliloquy", "Monologue", "Dialogue", "Oration"],
    correctAnswer: "Dialogue",
    difficulty: "hard",
  },
  {
    question: "Complete the analogy: Palliative is to Pain as Soporific is to ___",
    options: ["Sleep", "Insomnia", "Dream", "Fatigue"],
    correctAnswer: "Insomnia",
    difficulty: "hard",
  },
  {
    question: "Choose the word that is most nearly opposite in meaning to 'TACITURN':",
    options: ["Loquacious", "Silent", "Reserved", "Introverted"],
    correctAnswer: "Loquacious",
    difficulty: "hard",
  },
  {
    question: "Choose the word that is most similar in meaning to 'RECONDITE':",
    options: ["Obvious", "Abstruse", "Familiar", "Simple"],
    correctAnswer: "Abstruse",
    difficulty: "hard",
  },
  {
    question: "Complete the analogy: Philatelist is to Stamps as Numismatist is to ___",
    options: ["Numbers", "Coins", "Money", "Currency"],
    correctAnswer: "Coins",
    difficulty: "hard",
  },
  {
    question: "Choose the word that does not belong with the others:",
    options: ["Hubris", "Arrogance", "Humility", "Pride"],
    correctAnswer: "Humility",
    difficulty: "hard",
  },
  {
    question: "Complete the analogy: Apiarist is to Bees as Vintner is to ___",
    options: ["Wine", "Grapes", "Vinegar", "Alcohol"],
    correctAnswer: "Wine",
    difficulty: "hard",
  },

  // MEMORY - EASY
  {
    question: "If the code for APPLE is 1-16-16-12-5, what is the code for ORANGE?",
    options: ["15-18-1-14-7-5", "15-17-1-14-7-5", "15-18-1-13-7-5", "15-18-2-14-7-5"],
    correctAnswer: "15-18-1-14-7-5",
    difficulty: "easy",
  },
  {
    question: "Remember this sequence: 7, 2, 9, 4, 1. What is the third number?",
    options: ["7", "2", "9", "4"],
    correctAnswer: "9",
    difficulty: "easy",
  },
  {
    question: "If today is Tuesday, what day will it be in 100 days?",
    options: ["Monday", "Tuesday", "Wednesday", "Thursday"],
    correctAnswer: "Thursday",
    difficulty: "easy",
  },
  {
    question: "Remember this sequence: Red, Blue, Green, Yellow, Purple. What is the second color?",
    options: ["Red", "Blue", "Green", "Yellow"],
    correctAnswer: "Blue",
    difficulty: "easy",
  },
  {
    question: "If A=1, B=2, C=3, etc., what does the word 'CAT' equal?",
    options: ["24", "27", "30", "57"],
    correctAnswer: "24",
    difficulty: "easy",
  },
  {
    question: "Remember this sequence: Square, Circle, Triangle, Star, Heart. What is the fourth shape?",
    options: ["Square", "Circle", "Triangle", "Star"],
    correctAnswer: "Star",
    difficulty: "easy",
  },
  {
    question: "If the day before yesterday was Wednesday, what day will it be the day after tomorrow?",
    options: ["Friday", "Saturday", "Sunday", "Monday"],
    correctAnswer: "Sunday",
    difficulty: "easy",
  },
  {
    question: "Remember this sequence: 3, 6, 9, 12, 15. What is the sum of the second and fourth numbers?",
    options: ["15", "18", "21", "24"],
    correctAnswer: "18",
    difficulty: "easy",
  },
  {
    question: "If you rearrange the letters 'ANEGRO', you get the name of a:",
    options: ["Country", "City", "Animal", "Color"],
    correctAnswer: "Country",
    difficulty: "easy",
  },
  {
    question: "Remember this sequence: Apple, Banana, Cherry, Date, Elderberry. What is the third fruit?",
    options: ["Apple", "Banana", "Cherry", "Date"],
    correctAnswer: "Cherry",
    difficulty: "easy",
  },

  // MEMORY - MEDIUM
  {
    question: "If the code for MEMORY is 13-5-13-15-18-25, what is the code for INTELLIGENCE?",
    options: [
      "9-14-20-5-12-12-9-7-5-14-3-5",
      "9-14-20-5-12-9-7-5-14-3-5",
      "9-14-20-5-12-12-9-7-5-3-5",
      "9-14-20-5-12-12-9-7-5-14-5",
    ],
    correctAnswer: "9-14-20-5-12-12-9-7-5-14-3-5",
    difficulty: "medium",
  },
  {
    question: "Remember this sequence: 8, 5, 4, 9, 1, 7, 6, 3, 2. What is the sum of the fifth and seventh numbers?",
    options: ["7", "8", "9", "10"],
    correctAnswer: "7",
    difficulty: "medium",
  },
  {
    question: "If you start at 1000 and count backward by 7, which of these numbers will you say?",
    options: ["977", "979", "981", "983"],
    correctAnswer: "979",
    difficulty: "medium",
  },
  {
    question:
      "Remember this sequence: Hydrogen, Helium, Lithium, Beryllium, Boron. What is the atomic number of the fourth element?",
    options: ["2", "3", "4", "5"],
    correctAnswer: "4",
    difficulty: "medium",
  },
  {
    question:
      "If the positions of the first and sixth letters of the word 'PROBABILITY' are interchanged, as are the positions of the second and seventh letters, and so on, what would be the new word?",
    options: ["IBABPROLITY", "IBABORPLITY", "YTIIBABORPL", "YTILIBABORP"],
    correctAnswer: "YTILIBABORP",
    difficulty: "medium",
  },
  {
    question: "Remember this sequence: Mercury, Venus, Earth, Mars, Jupiter. What is the second planet from the Sun?",
    options: ["Mercury", "Venus", "Earth", "Mars"],
    correctAnswer: "Venus",
    difficulty: "medium",
  },
  {
    question: "If today is February 28, 2024, what day of the week will it be on March 7, 2024?",
    options: ["Wednesday", "Thursday", "Friday", "Saturday"],
    correctAnswer: "Thursday",
    difficulty: "medium",
  },
  {
    question:
      "Remember this sequence: 15, 14, 13, 11, 8, 4. What is the difference between the third and fifth numbers?",
    options: ["3", "5", "7", "9"],
    correctAnswer: "5",
    difficulty: "medium",
  },
  {
    question: "If you rearrange the letters 'CIPFACI', you get the name of a:",
    options: ["Country", "City", "Ocean", "Mountain"],
    correctAnswer: "Ocean",
    difficulty: "medium",
  },
  {
    question: "Remember this sequence: Beethoven, Mozart, Bach, Chopin, Tchaikovsky. Who composed 'The Magic Flute'?",
    options: ["Beethoven", "Mozart", "Bach", "Chopin"],
    correctAnswer: "Mozart",
    difficulty: "medium",
  },

  // MEMORY - HARD
  {
    question: "If the code for CRYPTOGRAPHY is 3-18-25-16-20-15-7-18-1-16-8-25, what is the code for STEGANOGRAPHY?",
    options: [
      "19-20-5-7-1-14-15-7-18-1-16-8-25",
      "19-20-5-7-1-14-15-7-18-1-16-25",
      "19-20-5-7-1-14-15-7-18-1-8-25",
      "19-20-5-7-1-14-15-7-18-1-16-8-25",
    ],
    correctAnswer: "19-20-5-7-1-14-15-7-18-1-16-8-25",
    difficulty: "hard",
  },
  {
    question:
      "Remember this sequence: 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31. What is the sum of the sixth and ninth numbers?",
    options: ["60", "61", "62", "63"],
    correctAnswer: "60",
    difficulty: "hard",
  },
  {
    question: "If you start at 1000 and count backward by 7, what will be the 15th number you say?",
    options: ["896", "897", "898", "899"],
    correctAnswer: "896",
    difficulty: "hard",
  },
  {
    question: "Remember this sequence: C, F, J, O, U. What letter comes next?",
    options: ["Z", "A", "B", "C"],
    correctAnswer: "B",
    difficulty: "hard",
  },
  {
    question:
      "If the positions of the digits in the number 5387149 are reversed, by how much will the new number exceed the original number?",
    options: ["3484210", "3484211", "3484212", "3484213"],
    correctAnswer: "3484212",
    difficulty: "hard",
  },
  {
    question:
      "Remember this sequence: Methane (CH₄), Ethane (C₂H₆), Propane (C₃H₈), Butane (C₄H₁₀). How many hydrogen atoms are in Hexane?",
    options: ["12", "14", "16", "18"],
    correctAnswer: "14",
    difficulty: "hard",
  },
  {
    question:
      "If today is the last day of February in a leap year, and it's a Tuesday, what day of the week will the same date be next year?",
    options: ["Tuesday", "Wednesday", "Thursday", "Friday"],
    correctAnswer: "Wednesday",
    difficulty: "hard",
  },
  {
    question:
      "Remember this sequence: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100. What is the difference between the square roots of the seventh and third numbers?",
    options: ["4", "5", "6", "7"],
    correctAnswer: "4",
    difficulty: "hard",
  },
  {
    question: "If you rearrange the letters 'DNTAOCIRE', you get the name of a:",
    options: ["Country", "City", "Continent", "Ocean"],
    correctAnswer: "Continent",
    difficulty: "hard",
  },
  {
    question:
      "Remember this sequence: Planck, Einstein, Bohr, Heisenberg, Schrödinger. Who formulated the uncertainty principle?",
    options: ["Planck", "Einstein", "Bohr", "Heisenberg"],
    correctAnswer: "Heisenberg",
    difficulty: "hard",
  },

  // GENERAL KNOWLEDGE - EASY
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
    difficulty: "easy",
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correctAnswer: "Au",
    difficulty: "easy",
  },
  {
    question: "Which of these is not a primary color?",
    options: ["Red", "Blue", "Green", "Yellow"],
    correctAnswer: "Green",
    difficulty: "easy",
  },
  {
    question: "How many continents are there on Earth?",
    options: ["5", "6", "7", "8"],
    correctAnswer: "7",
    difficulty: "easy",
  },
  {
    question: "What is the largest mammal on Earth?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: "Blue Whale",
    difficulty: "easy",
  },
  {
    question: "Which of these is not a state of matter?",
    options: ["Solid", "Liquid", "Gas", "Energy"],
    correctAnswer: "Energy",
    difficulty: "easy",
  },
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Rome"],
    correctAnswer: "Paris",
    difficulty: "easy",
  },
  {
    question: "How many sides does a hexagon have?",
    options: ["5", "6", "7", "8"],
    correctAnswer: "6",
    difficulty: "easy",
  },
  {
    question: "Which of these is not a noble gas?",
    options: ["Helium", "Neon", "Oxygen", "Argon"],
    correctAnswer: "Oxygen",
    difficulty: "easy",
  },
  {
    question: "What is the largest organ in the human body?",
    options: ["Heart", "Liver", "Brain", "Skin"],
    correctAnswer: "Skin",
    difficulty: "easy",
  },

  // GENERAL KNOWLEDGE - MEDIUM
  {
    question: "Which element has the atomic number 79?",
    options: ["Silver", "Gold", "Platinum", "Mercury"],
    correctAnswer: "Gold",
    difficulty: "medium",
  },
  {
    question: "What is the speed of light in a vacuum?",
    options: ["299,792,458 m/s", "300,000,000 m/s", "186,000 miles/s", "All of the above"],
    correctAnswer: "All of the above",
    difficulty: "medium",
  },
  {
    question: "Which of these is not one of the four fundamental forces of nature?",
    options: ["Gravity", "Electromagnetic", "Strong Nuclear", "Centrifugal"],
    correctAnswer: "Centrifugal",
    difficulty: "medium",
  },
  {
    question: "What is the most abundant element in the Earth's crust?",
    options: ["Silicon", "Oxygen", "Aluminum", "Iron"],
    correctAnswer: "Oxygen",
    difficulty: "medium",
  },
  {
    question: "Which of these is not a type of elementary particle?",
    options: ["Quark", "Lepton", "Boson", "Neutron"],
    correctAnswer: "Neutron",
    difficulty: "medium",
  },
  {
    question: "What is the chemical formula for sulfuric acid?",
    options: ["H2SO3", "H2SO4", "HSO4", "H2S2O7"],
    correctAnswer: "H2SO4",
    difficulty: "medium",
  },
  {
    question: "Which of these scientists did not contribute to the development of quantum mechanics?",
    options: ["Niels Bohr", "Werner Heisenberg", "Albert Einstein", "Isaac Newton"],
    correctAnswer: "Isaac Newton",
    difficulty: "medium",
  },
  {
    question: "What is the approximate age of the universe?",
    options: ["4.5 billion years", "13.8 billion years", "100 billion years", "Infinite"],
    correctAnswer: "13.8 billion years",
    difficulty: "medium",
  },
  {
    question: "Which of these is not a type of chemical bond?",
    options: ["Ionic", "Covalent", "Metallic", "Quantum"],
    correctAnswer: "Quantum",
    difficulty: "medium",
  },
  {
    question: "What is the largest moon in our solar system?",
    options: ["Titan", "Europa", "Ganymede", "Luna"],
    correctAnswer: "Ganymede",
    difficulty: "medium",
  },

  // GENERAL KNOWLEDGE - HARD
  {
    question: "What is the half-life of Carbon-14?",
    options: ["1,460 years", "5,730 years", "10,730 years", "14,500 years"],
    correctAnswer: "5,730 years",
    difficulty: "hard",
  },
  {
    question: "Which of these is not a type of RNA?",
    options: ["mRNA", "tRNA", "rRNA", "dRNA"],
    correctAnswer: "dRNA",
    difficulty: "hard",
  },
  {
    question: "What is the Schwarzschild radius of a black hole with the mass of the Earth?",
    options: ["0.9 cm", "2.5 cm", "8.7 mm", "1.4 cm"],
    correctAnswer: "8.7 mm",
    difficulty: "hard",
  },
  {
    question: "Which of these is not a fundamental particle in the Standard Model?",
    options: ["Up Quark", "Muon", "Graviton", "Tau Neutrino"],
    correctAnswer: "Graviton",
    difficulty: "hard",
  },
  {
    question: "What is the approximate value of the fine-structure constant?",
    options: ["1/137", "1/100", "1/1000", "1/10"],
    correctAnswer: "1/137",
    difficulty: "hard",
  },
  {
    question: "Which of these is not a type of nuclear decay?",
    options: ["Alpha decay", "Beta decay", "Gamma decay", "Delta decay"],
    correctAnswer: "Delta decay",
    difficulty: "hard",
  },
  {
    question:
      "What is the name of the theorem that states 'no set of axioms for number theory can be both consistent and complete'?",
    options: ["Fermat's Last Theorem", "Gödel's Incompleteness Theorem", "Riemann Hypothesis", "Poincaré Conjecture"],
    correctAnswer: "Gödel's Incompleteness Theorem",
    difficulty: "hard",
  },
  {
    question: "Which of these is not a type of cosmic ray?",
    options: ["Protons", "Electrons", "Photinos", "Heavy nuclei"],
    correctAnswer: "Photinos",
    difficulty: "hard",
  },
  {
    question: "What is the name of the hypothetical form of dark matter consisting of subatomic particles?",
    options: ["MACHOs", "WIMPs", "Axions", "Gravitinos"],
    correctAnswer: "WIMPs",
    difficulty: "hard",
  },
  {
    question: "Which of these is not a solution to the Einstein field equations?",
    options: ["Schwarzschild metric", "Kerr metric", "Friedmann–Lemaître–Robertson–Walker metric", "Lorentz metric"],
    correctAnswer: "Lorentz metric",
    difficulty: "hard",
  },
]
