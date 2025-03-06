const API_KEY = process.env.NEXT_PUBLIC_FOOD_API_KEY
const BASE_URL = "https://api.spoonacular.com"

export async function getRandomRecipes(number = 6) {
  try {
    const response = await fetch(`${BASE_URL}/recipes/random?apiKey=${API_KEY}&number=${number}`)

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return data.recipes
  } catch (error) {
    console.error("Error fetching random recipes:", error)
    return []
  }
}

export async function searchRecipes(query: string, number = 12) {
  try {
    const response = await fetch(
      `${BASE_URL}/recipes/complexSearch?apiKey=${API_KEY}&query=${query}&number=${number}&addRecipeInformation=true`,
    )

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return data.results
  } catch (error) {
    console.error("Error searching recipes:", error)
    return []
  }
}

export async function getRecipeById(id: number) {
  try {
    const response = await fetch(`${BASE_URL}/recipes/${id}/information?apiKey=${API_KEY}`)

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching recipe ${id}:`, error)
    return null
  }
}

export async function getRecipesByCategory(category: string, number = 8) {
  try {
    const response = await fetch(
      `${BASE_URL}/recipes/complexSearch?apiKey=${API_KEY}&type=${category}&number=${number}&addRecipeInformation=true`,
    )

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return data.results
  } catch (error) {
    console.error(`Error fetching ${category} recipes:`, error)
    return []
  }
}

