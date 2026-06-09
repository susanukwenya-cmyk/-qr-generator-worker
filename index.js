import QRCode from 'https://cdn.jsdelivr.net/npm/qrcode@1.5.3/+esm';

export default {
  async fetch(request, env) {
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      const { guest_id, event_id } = await request.json();

      if (!guest_id || !event_id) {
        return new Response(
          JSON.stringify({ error: 'guest_id and event_id required' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      const qrData = `${event_id}:${guest_id}`;
      const qrImage = await QRCode.toDataURL(qrData);

      return new Response(
        JSON.stringify({ qr_code_data_url: qrImage, guest_id, event_id }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }
};
