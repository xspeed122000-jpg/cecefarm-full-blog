// sanityClient.ts
import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: '88s4pwup', // ご自身のID
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-03-01',
});