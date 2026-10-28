import {createFileRoute} from '@tanstack/react-router';
import {functionRequest} from '@/lib/blog/server';

export const Route = createFileRoute('/blog/media/$id')({
  server: {
    handlers: {
      GET: async ({params}) => {
        if (!/^\d{1,18}$/.test(params.id)) return new Response('Not found', {status: 404});
        try {
          const upstream = await functionRequest({mode: 'media', id: params.id});
          if (!upstream.ok) return new Response('Not found', {status: upstream.status === 404 ? 404 : 503});
          const mime = upstream.headers.get('content-type') || '';
          if (!['image/jpeg', 'image/png', 'image/webp'].includes(mime.split(';')[0])) {
            return new Response('Unavailable', {status: 502});
          }
          const bytes = await upstream.arrayBuffer();
          if (bytes.byteLength > 8 * 1024 * 1024) return new Response('Unavailable', {status: 502});
          return new Response(bytes, {headers: {
            'Content-Type': mime,
            'Cache-Control': 'public, max-age=31536000, immutable',
            'X-Content-Type-Options': 'nosniff',
          }});
        } catch {
          return new Response('Unavailable', {status: 503});
        }
      },
    },
  },
});
