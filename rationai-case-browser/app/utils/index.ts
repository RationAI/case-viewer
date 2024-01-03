export const getRandomString = (length: number) => {
  const randomString = Math.random().toString(10);
  return randomString.substring(3, Math.min(3 + length, randomString.length - 1));
}