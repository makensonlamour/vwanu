import jwtDecode from "jwt-decode";

export function decoder(token) {
  if (!token) return {};
  return jwtDecode(token);
}

export function isExpired(token) {
  if (!token) return true;
  const decoded = decoder(token);
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
}

export function saveToken(token) {
  localStorage.setItem("token", token);
}

export function deleteToken() {
  localStorage.removeItem("token");
}

export function getToken() {
  return localStorage.getItem("token");
}

//calculate scrolling page
export function getYPosition() {
  window.addEventListener("scroll", () => {
    const yPosition = window.scrollY;
    return yPosition;
  });
}
