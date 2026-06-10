import axios from "axios";

export async function logout() {
  const response = await axios.post("/api/auth/logout");

  return response.data;
}