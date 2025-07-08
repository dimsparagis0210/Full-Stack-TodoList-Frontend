export const useAuth = () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    const isAuthenticated = !!accessToken && !!refreshToken || isTokenValid(accessToken!) || isTokenValid(refreshToken!); 

    return {
        isAuthenticated,
        accessToken,
        refreshToken,
    }
}

export const isTokenValid = (token: string) => {
    try {
      const [, payload] = token.split(".");
      const { exp } = JSON.parse(atob(payload));
      return exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }