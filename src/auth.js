export function sign(payload) {
    // payload example: { role: 'admin', name: 'Alice' }
    return btoa(JSON.stringify(payload));
  }
  export function verify(token) {
    if (!token) return null;
    try {
      return JSON.parse(atob(token));
    } catch (e) {
      return null;
    }
  }
  