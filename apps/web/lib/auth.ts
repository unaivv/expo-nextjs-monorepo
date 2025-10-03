import { createAuth } from '@hastee-xplat/auth/better-auth';

export const auth = createAuth(process.env.DATABASE_URL || '');
