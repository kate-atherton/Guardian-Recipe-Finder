import { TIMEOUT_SEC } from "./config.js";

const timeout = (delay) =>
  new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request took too long! Timeout after ${delay} second`));
    }, delay * 1000);
  });

export const getData = async (url) => {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
