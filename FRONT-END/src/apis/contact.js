const BASE_URL = "https://fest-connect.onrender.com/api/contact";

export async function sendMessage(values) {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values),
    });

    const message = await response.json();
    return message;
  } catch (error) {
    console.error(error);
  }
}