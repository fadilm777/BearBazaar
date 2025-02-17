import { fetchAPI, parseBody } from "./common";

/**
 * @typedef {Object} UserProfile
 * @property {number} id
 * @property {string} name
 * @property {string} username
 * @property {string} name
 * @property {string} email
 * @property {string} profilePic
 */

/**
 * Fetch the logged-in user's profile data
 *
 * @returns {Promise<UserProfile>} User profile
 */
export async function getUserProfile() {
  const res = await fetchAPI("/user/profile", "get");
  const profile = await parseBody(res);
  return profile;
}

/**
 * Get the details of a profile
 *
 * @param {number} id
 * @returns {Promise<ProfileDetails>} profile details
 */
export async function getProfileDetails(id) {
  const res = await fetchAPI(`/profiles/${id}`, "get");
  const profile = await parseBody(res);
  return profile;
}
