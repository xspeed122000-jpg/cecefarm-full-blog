// sanityClient.ts の中身
import { createClient } from 'next-sanity';

// ↓ page.tsx はこの「client」という名前の輸出（export）を探しています
export const client = createClient({
  projectId: '88s4pwup',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: false,
});