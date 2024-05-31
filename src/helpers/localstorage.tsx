export const  saveTokenToLocalStorage = (token: string) => {
  localStorage.setItem('authToken', token);
}

export const removeTokenToLocalStorage = () => {
  localStorage.removeItem('authToken');
}

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem('authToken');
}