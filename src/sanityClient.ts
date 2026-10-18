import { createClient } from '@sanity/client'

export const client = createClient({
    projectId: 't245zx79', // <--- I OVDE TVOJ PRAVI PROJEKAT
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: true,
})