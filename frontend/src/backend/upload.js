import { fetchAPI, parseBody } from "./common";

/**
 * Upload a file.
 *
 * @param {File} file
 * @returns {Promise<string>} File id
 */
export async function uploadFile(file) {
  const res = await fetchAPI('/upload', 'post', await file.arrayBuffer(), { rawBody: true, contentType: file.type });
  const { id } = await parseBody(res);
  return id;
}

/**
 * Get a user-uploaded file
 *
 * @param {string} id
 * @returns {Promise<>} File id
 */
export async function getFile(id) {
  const res = await fetchAPI(`/upload/${id}`, 'get', null, { accept: '*/*' });
  return res.blob();
}
