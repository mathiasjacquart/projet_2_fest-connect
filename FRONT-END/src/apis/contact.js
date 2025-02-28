const BASE_URL = `${
  import.meta.env.VITE_API_BASE_URL
}/contact`;

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