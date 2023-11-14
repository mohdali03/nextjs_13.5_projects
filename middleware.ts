import { authMiddleware } from "@clerk/nextjs";

const publicRoutes = [
  '/',
  '/api/webhook',
  '/question/:id',
  '/tags',
  '/tags/:id',
  '/profile/:id',
  '/community',
  '/jobs'
];

const ignoredRoutes = [
  '/api/webhook',
  '/api/chatgpt'
];

export default authMiddleware({
  publicRoutes,
  ignoredRoutes
});

export const config = {
  api: {
    bodyParser: false,
  },
};
