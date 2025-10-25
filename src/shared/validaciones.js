/**
 * @file validaciones.js
 * @description Funciones de utilidad para validaciones comunes y manipulación de JWT.
 * @module shared/validaciones
 */

/**
 * Valida si una cadena de texto es una dirección de correo electrónico válida.
 * @param {string} email - El correo electrónico a validar.
 * @returns {boolean} `true` si el correo es válido, `false` en caso contrario.
 */
export const validaEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Decodifica un token JWT para obtener su payload.
 * @param {string} token - El token JWT a decodificar.
 * @returns {object|null} El payload del token como un objeto, or `null` si el token es inválido.
 */
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

/**
 * Verifica si un token JWT ha expirado.
 * @param {string} token - El token JWT a verificar.
 * @returns {boolean} `true` si el token ha expirado o es inválido, `false` en caso contrario.
 */
export const isTokenExpired = (token) => {
  const payload = parseJwt(token);
  if (!payload || !payload.exp) return true; // inválido o sin exp

  const now = Math.floor(Date.now() / 1000); // segundos actuales
  return payload.exp < now;
}