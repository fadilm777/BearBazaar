/**
 * Arbitrarily fetches the backend API.
 * @param {string} route
 * @param {'get' | 'put' | 'post' | 'delete'} method
 * @param {Object} data
 * @param {Object?} options
 * @returns Promise<Response>
 */
export function fetchAPI(
  route,
  method,
  data,
  { rawBody = false, accept = 'application/json', contentType = 'application/json' } = {},
) {
  return window.fetch('http://localhost:3000' + route, {
    mode: 'cors',
    method,
    headers: {
      ...(window.localStorage.getItem('token')
        ? {
            Authorization: `Bearer ${window.localStorage.getItem('token')}`,
          }
        : {}),
      Accept: accept,
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
    },
    body: rawBody ? data : (data ? JSON.stringify(data) : undefined),
    redirect: 'follow',
  });
}

export async function parseBody(res, skipErrorCheck = false) {
  if (res.status === undefined) {
    // res.status is undefined for requests that were cancelled due to reload.
    return {};
  }

  const body = await res.json();
  if (!skipErrorCheck) {
    if (body.error) throw new Error(body.message || body.errorObj.message);
    if (res.status !== 200) throw new Error(res.statusText);
  }

  return body;
}
