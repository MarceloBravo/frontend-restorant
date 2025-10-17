export const validaEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}


export const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1]; // el payload es la segunda parte
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    //console.error("Token inválido", e);
    return null;
  }
}

export const isTokenExpired = (token) => {
  const payload = parseJwt(token);
  if (!payload || !payload.exp) return true; // inválido o sin exp

  const now = Math.floor(Date.now() / 1000); // segundos actuales
  return payload.exp < now;
}
