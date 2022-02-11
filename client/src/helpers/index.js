import jwtDecode from "jwt-decode";

export function decoder(token) {
  if (!token) return {};
  let data = jwtDecode(token);
  data.profile = 1;
  delete data.iat;
  delete data.exp;
  return data;
}

export function isExpired(token) {
  if (!token) return true;
  const decoded = decoder(token);
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
}

export function saveStep(step) {
  localStorage.setItem("step", step);
}

export function deleteStep() {
  localStorage.removeItem("step");
}

export function getStep() {
  return localStorage.getItem("step");
}

//export default { isExpired, decoder };
