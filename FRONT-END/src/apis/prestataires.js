const BASE_URL = "https://fest-connect.onrender.com/api/providers"; 

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