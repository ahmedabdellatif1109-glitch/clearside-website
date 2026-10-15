// Sends website form submissions to Flyra as leads in the "Website Leads"
// pipeline, which starts the website lead follow-up sequence.
// Requires the Flyra API key in Netlify as FLYRA_API_KEY (or flyraapikey).

const FLYRA_URL = 'https://app.flyra.io/v2026-06-01/actions/flyra_create_lead';
const WEBSITE_LEADS_PIPELINE = 'pipe_c0b4eb83-263d-40d6-a802-19b529180cb1';

const clean = (v, max = 500) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

// Flyra prefers E.164; US numbers are the norm here.
function toE164(raw) {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  return raw ? `+${digits}` : '';
}

export default async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });

  const apiKey = process.env.FLYRA_API_KEY || process.env.flyraapikey;
  if (!apiKey) return Response.json({ error: 'Flyra API key is not set' }, { status: 500 });

  let fields;
  try {
    const form = await req.formData();
    fields = Object.fromEntries(form.entries());
  } catch {
    return Response.json({ error: 'Invalid form data' }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field.
  if (clean(fields.website)) return Response.json({ ok: true });

  const email = clean(fields.email, 200);
  const phone = toE164(clean(fields.phone, 40));
  if (!email && !phone) return Response.json({ error: 'Email or phone required' }, { status: 400 });

  const source = clean(fields.source, 40) || 'website';
  const service = clean(fields.service, 100);
  const message = clean(fields.message, 2000);

  const lead = {
    first_name: clean(fields.firstName, 100),
    last_name: clean(fields.lastName, 100),
    pipeline_id: WEBSITE_LEADS_PIPELINE,
    source: source === 'popup' ? 'Website popup' : 'Website contact form',
    notes: [service && `Service: ${service}`, message && `Message: ${message}`].filter(Boolean).join('\n'),
    // The follow-up sequence is all texts, so only start it when we have a phone number.
    run_automations: Boolean(phone),
  };
  if (email) lead.email = email;
  if (phone) lead.phone = phone;
  if (service) lead.service_type = service;
  const address = clean(fields.address, 200);
  if (address) lead.address_line1 = address;

  const res = await fetch(FLYRA_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(lead),
  });

  if (!res.ok) {
    console.error('Flyra lead creation failed', res.status, await res.text());
    return Response.json({ error: 'Could not create lead' }, { status: 502 });
  }
  return Response.json({ ok: true });
};

export const config = { path: '/api/lead' };
