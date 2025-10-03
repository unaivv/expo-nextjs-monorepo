import { auth } from '../../../../lib/auth';
import { toNextJsHandler } from '@hastee-xplat/auth/better-auth-client';

export const { POST, GET } = toNextJsHandler(auth);
