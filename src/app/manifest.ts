import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Astrax',
    short_name: 'Astrax',
    description: 'Astrax Application',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#00308F',
  };
}