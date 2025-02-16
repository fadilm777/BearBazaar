import { fetchAPI, parseBody } from "./common";

/**
 * @typedef {Object} Listing
 * @param {string} title
 * @param {number} price
 * @param {string} description
 */

/**
 * Creates a new listing
 *
 * @param {Listing} listing 
 * @returns {number} Id of the new listing
 */
export async function createListing(listing) {
  const res = await fetchAPI("/listings", "post", { listing });
  const { id } = await parseBody(res);
  return id;
}
