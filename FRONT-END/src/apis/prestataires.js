const BASE_URL = `${
  import.meta.env.VITE_API_BASE_URL
}/providers`; 

export async function getAllPrestataires () {
    try {
        const response = await fetch (BASE_URL);
        if (response.ok) {
            const PrestatairesFromApi = await response.json();
            return PrestatairesFromApi;
        }
        
    } catch (error) {
        console.error("Failed to fetch prestataires", error)
    }
};