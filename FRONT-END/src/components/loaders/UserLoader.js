export function userLoader() {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  return user;
}