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

//export default { isExpired, decoder };
