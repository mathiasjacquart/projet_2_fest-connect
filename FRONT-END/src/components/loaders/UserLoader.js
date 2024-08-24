export function userLoader() {
  const user = JSON.parse(localStorage.getItem("user"));

  return user;
}