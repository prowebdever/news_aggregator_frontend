export const isLoggedIn = () => localStorage.getItem('token') !== null;

export const setLoggedOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('preferred_authors');
  localStorage.removeItem('preferred_categories');
  localStorage.removeItem('preferred_sources');
};
