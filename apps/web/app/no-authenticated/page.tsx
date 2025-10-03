import { Button } from '@hastee-xplat/ui';
import Link from 'next/link';

export default function NoAuthenticated() {
  return (
    <div>
      <h1>You are not authenticated</h1>
      <Link href={'/?token=1234'}>
        <Button>Click with token</Button>
      </Link>
    </div>
  );
}
