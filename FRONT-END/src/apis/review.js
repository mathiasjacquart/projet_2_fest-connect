

export async function createReview (values) { 
    try {
        const response = await fetch ("https://fest-connect.onrender.com/api/reviews", {
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