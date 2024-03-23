export { default } from "next-auth/middleware"

export const config = {
  matcher: ['/authorized/(.*)', '/api/config/(.*)'],
};