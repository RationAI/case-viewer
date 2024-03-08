export const openXOpat = async (visualization: object) => {
  const xOpatUrl = process.env.NEXT_PUBLIC_XOPAT_URL || "";
  const method = process.env.NEXT_PUBLIC_XOPAT_OPEN_METHOD || "GET"
  if(method === 'GET') {
    window.open(encodeURI(`${xOpatUrl}/index.php#${JSON.stringify(visualization)}`), "_viewer")
  }
  // TODO implement POST alternative
}