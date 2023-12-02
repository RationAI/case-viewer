export const getRandomString = (length: number) => {
  const randomString = Math.random().toString(36);
  return Math.random().toString(36).substring(3, Math.min(3 + length, randomString.length - 1));
}