import { authMiddleware } from "@clerk/nextjs";

const publicRoutes = [
  '/',
  '/api/webhook',
  '/question/:id',
  '/tags',
  '/tags/:id',
  '/profile/:id',
  '/community',
  '/jobs',
  '/sign-up',
  '/addQuestion',
  '/collection',       // Add the new route here
  '/ask-question',      // Add the new route here
];

const ignoredRoutes = [
  '/api/webhook',
  '/api/chatgpt',
];

export default authMiddleware({
  publicRoutes,
  ignoredRoutes,
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
