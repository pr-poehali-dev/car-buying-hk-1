import {createFileRoute} from '@tanstack/react-router';
import {functionRequest} from '@/lib/blog/server';

export const Route = createFileRoute('/api/optiai')({
  server: {
    handlers: {
      POST: async ({request}) => {
        if (!(request.headers.get('content-type') || '').toLowerCase().startsWith('application/json')) {
          return Response.json({success: false}, {status: 415});
        }
        const body = await request.arrayBuffer();
        if (body.byteLength > 6 * 1024 * 1024) {
          return Response.json({success: false}, {status: 413});
        }
        try {
          const upstream = await functionRequest({}, {
            method: 'POST',
            headers: {'Content-Type': 'application/json; charset=utf-8'},
            body,
          });
          const answer = await upstream.arrayBuffer();
          if (answer.byteLength > 2 * 1024 * 1024) return Response.json({success: false}, {status: 502});
          return new Response(answer, {status: upstream.status, headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'no-store',
            'X-Content-Type-Options': 'nosniff',
          }});
        } catch {
          return Response.json({success: false, error: 'temporarily_unavailable'}, {status: 503});
        }
      },
    },
  },
});
