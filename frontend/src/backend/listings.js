import { fetchAPI, parseBody } from "./common";

/**
 * @typedef {Object} Listing
 * @param {number} id
 * @param {string} title
 * @param {number} price
 * @param {string} description
 */

/**
 * @typedef {Object} ListingDetails
 * @param {number} id
 * @param {string} title
 * @param {number} price
 * @param {string} description
 */

/**
 * @typedef {Object} CreateListing
 * @param {string} title
 * @param {number} price
 * @param {string} description
 */

/**
 * Get all listings in my feed
 *
 * @returns {Promise<Listing[]>} Listings
 */
export async function getListingsFeed() {
  const res = await fetchAPI("/listings/feed", "get");
  const { listings } = await parseBody(res);
  return listings;
}

/**
 * Get all my listings (created by me)
 *
 * @returns {Promise<Listing[]>} Listings
 */
export async function getMyListings() {
  const res = await fetchAPI("/listings/mine", "get");
  const { listings } = await parseBody(res);
  return listings;
}

/**
 * Get the details of one listing.
 *
 * @param {number} id 
 * @returns {Promise<ListingDetails>} listing details
 */
export async function getListingDetails(id) {
  const res = await fetchAPI(`/listings/details/${id}`, "get");
  const { listing } = await parseBody(res);
  return listing;
}

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

/**
 * Get the details of a profile
 *
 * @param {number} id
 * @returns {Promise<ProfileDetails>} profile details
 */
export async function getProfileDetails(id) {
  const res = await fetchAPI(`/profiles/${id}`, "get");
  const { profile } = await parseBody(res);
  return profile;
}

