const BASE_URL = "http://localhost:4560/api/categories"; 

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
