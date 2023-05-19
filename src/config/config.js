export const navbarBrand = 'News Aggregator';
export const header = 'News Aggregator';
export const navs = [
  { nav: 'Register', page: '/register', loggedIn: false },
  { nav: 'Login', page: '/login', loggedIn: false },
];

export const summary = 'Category, Author and Date';
export const category = (category) => `Category: ${!category ? 'Unknown' : category}`;
export const author = (author) => `Author: ${!author ? 'Unknown' : author}`;
export const publishedAt = (date) => `Published at: ${new Date(date).toGMTString()}`;
