const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/users`;

export async function signup(values) {
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
    return newUser;
  } catch (error) {
    console.error(error);
  }
}
export async function sendEmailPassword(value) {
  try {
    const response = await fetch(`${BASE_URL}/forgotten-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });

    const newUser = await response.json();
    return newUser;
  } catch (error) {
    console.error(error);
  }
}
export const updateUser = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/:id`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};
