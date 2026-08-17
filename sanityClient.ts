import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: '88s4pwup',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: true,
});