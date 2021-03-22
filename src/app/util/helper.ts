/**
 * wait until the sec and trigger error!
 * @param {Number} sec
 * @returns {Promise} Promise
 */
export const TimeOut = async (sec: number): Promise<void> =>
  new Promise((_, rej) =>
    setTimeout(
      () => rej(new Error(`Request took too long! Timeout after ${sec}s!`)),
      sec * 1000
    )
  );
