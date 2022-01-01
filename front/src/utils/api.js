/**
 * represent an error from the api
 */
export class ApiErrors {
  constructor(errors) {
    this.errors = errors;
  }
}

/**
 *
 * @param {string} endpoint
 * @param {object} options
 * @returns {Promise<void>}
 */
export async function apiFetch(endpoint, options = {}) {
  const res = await fetch("http://localhost:3333" + endpoint, {
    credentials: "include",
    headers: {
      Accept: "application/jsons",
    },
    ...options,
  });

  // if no content success
  if (res.status === 204) {
    return null;
  }
  const resData = await res.json();
  if (res.ok) {
    return resData;
  } else {
    if (resData.errors) {
      throw new ApiErrors(resData.errors);
    }
  }
}
