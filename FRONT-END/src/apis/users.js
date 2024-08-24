const BASE_URL = "http://localhost:4560/api/users";

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

export async function signin(values) {
  try {
    const response = await fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const newUser = await response.json(); 
    console.log(newUser);
    return newUser;
   
  } catch (error) {
    console.error(error);
  }
}
export async function updateUser(values) { 
  try {
      const response = await fetch(`${BASE_URL}/:id`, {
        method: "PUT",
        headers:{ 
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      })
  } catch (error) {
    console.error(error);
  }
}