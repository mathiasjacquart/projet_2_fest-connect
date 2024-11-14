const BASE_URL = "http://localhost:4560/api/providers"; 

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