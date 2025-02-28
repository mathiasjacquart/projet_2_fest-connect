const BASE_URL = `${
  import.meta.env.VITE_API_BASE_URL
}/categories`; 

export async function getAllCategories () {
    try {
        const response = await fetch (BASE_URL);
        if (response.ok) {
            const categoriesFromApi = await response.json();
            return categoriesFromApi;
        }
        
    } catch (error) {
        console.error("Failed to fetch categories", error)
    }
};
