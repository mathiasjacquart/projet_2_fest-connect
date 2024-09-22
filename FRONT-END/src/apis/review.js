

export async function createReview (values) { 
    try {
        const response = await fetch ("http://localhost:4560/api/reviews", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(values),
          });
        const newReview = await response.json(); 
        return newReview;
    } catch (error) {
        console.error(error);
      }
    }