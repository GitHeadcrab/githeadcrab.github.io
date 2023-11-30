import { redirect } from "react-router-dom"

export const requireAuth = async (request) => {
  const pathname = new URL(request.url).pathname
  const isLoggedIn = localStorage.getItem("loggedin")
  
  if (!isLoggedIn) {
    throw redirect("/login?message=You must log in first.")
  }
  return null
}

export function checker(array, target) {
  return target.every(value => array.includes(value));
}