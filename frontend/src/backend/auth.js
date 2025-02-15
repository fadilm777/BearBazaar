/**
 * @typedef {Object} User
 * @param {number} id
 * @param {string} email
 * @param {string} username
 */

/**
 * @typedef {Object} Session
 * @param {number} userId
 * @param {string} token
 */

/**
 * Get details about the current user
 *
 * @returns {Promise<User>}
 */
export async function getMe() {
  const res = await fetchAPI('/auth/', 'get');
  const { user } = await parseBody(res);
  return user;
}

/**
 * Log in with email and password
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Session>}
 */
export async function login(email, password) {
  const res = await fetchAPI('/auth/login', 'post', { email, password });
  const { session } = await parseBody(res);
  localStorage.setItem('token', session.token);
  return session;
}

/**
 * Log out the current user
 */
export async function logout() {
  localStorage.removeItem('token');
  window.location.reload();
}

/**
 * Register a new user.
 *
 * @param {{ email: string; username: string; password: string; }} data
 * @returns {Promise<Session>}
 */
export async function register({ email, username, password }) {
  const res = await fetchAPI('/auth/register', 'post', { email, username, password });
  const { session } = await parseBody(res);
  localStorage.setItem('token', session.token);
  return session;
}
