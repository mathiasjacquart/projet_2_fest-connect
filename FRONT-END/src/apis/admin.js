const BASE_URL = "https://fest-connect.onrender.com/api/admin";

export async function signin(values) {
    try {
      const response = await fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
  
      const newAdmin = await response.json();
      return newAdmin;
    } catch (error) {
      console.error(error);
    }
  }

  export async function signup(values) {
    try {
      const response = await fetch(`${BASE_URL}/signup`, {
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

