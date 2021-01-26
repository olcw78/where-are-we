/**
 * wait until the sec and trigger error!
 * @param {Number} sec 
 * @returns {Promise} Promise
 */
export async function timeOut(sec) {
  const err = new Error(
    `Request took too long! Timeout after ${sec}s!`
  );
  return new Promise((_, rej) =>
    setTimeout(() => rej(err), sec * 1000)
  );
}

