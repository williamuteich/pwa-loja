import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'StoreFlow PWA',
        short_name: 'StoreFlow',
        description: 'Inventory control and product scanning for e-commerce',
        start_url: '/',
        display: 'standalone',
        background_color: '#F8FAFC',
        theme_color: '#f97316',
        icons: [
            {
                src: '/logo.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}