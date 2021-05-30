import { gzip } from 'pako';

/**
 * @param {string} url
 * @returns {Promise<ArrayBuffer>}
 */
async function fetchBinary(url) {
  const res = await fetch(url, {
    method: 'GET',
  });
  if (res.ok) {
    return await res.arrayBuffer();
  }
  return null;
}

/**
 * @template T
 * @param {string} url
 * @returns {Promise<T>}
 */
async function fetchJSON(url) {
  const res = await fetch(url, {
    method: 'GET',
  });
  if (res.ok) {
    return await res.json();
  }
  return null;
}

/**
 * @template T
 * @param {string} url
 * @param {File} file
 * @returns {Promise<T>}
 */
async function sendFile(url, file) {
  const res = await fetch(url, {
    body: file,
    headers: {
      'Content-Type': 'application/octet-stream',
    },
    method: 'POST',
  });
  if (res.ok) {
    return await res.json();
  }
  return null;
}

/**
 * @template T
 * @param {string} url
 * @param {object} data
 * @returns {Promise<T>}
 */
async function sendJSON(url, data) {
  const jsonString = JSON.stringify(data);
  const uint8Array = new TextEncoder().encode(jsonString);
  const compressed = gzip(uint8Array);

  const res = await fetch(url, {
    body: compressed,
    headers: {
      'Content-Encoding': 'gzip',
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
  if (res.ok) {
    return await res.json();
  }
  return null;
}

export { fetchBinary, fetchJSON, sendFile, sendJSON };
