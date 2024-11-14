
export async function getAllLocations (query) {
    try {
        const response = await fetch (`https://geo.api.gouv.fr/communes?nom=${query}&fields=nom,codesPostaux,codeRegion,region&boost=population`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            },  
        });
        const locations = await response.json();
        console.log(locations);
        
        return locations.map((location) => ({
          label: `${location.nom} (${location.codesPostaux[0]})`,
          value: location.nom,
          region: location.region.nom,
          postalCode: location.codesPostaux[0],
        }));
        
    } catch (error) {
        console.error("Failed to fetch locations", error);
        return []
    }
};

export async function createProfile (values) { 
    try {
        const response = await fetch ("http://localhost:4560/api/providers", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(values),
          });
        const newProvider = await response.json(); 
        return newProvider;
    } catch (error) {
        console.error(error);
      }
    }


