// Sends website form submissions to Flyra as leads in the "Website Leads"
// pipeline, which starts the website lead follow-up sequence.
// Popup signups are also emailed their discount code through Flyra.
// Requires the Flyra API key in Netlify as FLYRA_API_KEY2 (or FLYRA_API_KEY / flyraapikey),
// with the leads and email permissions.

const FLYRA_URL = 'https://app.flyra.io/v2026-06-01/actions/flyra_create_lead';
const FLYRA_EMAIL_URL = 'https://app.flyra.io/v2026-06-01/actions/flyra_send_email';
// Keep in sync with DISCOUNT_CODE in site.js (shown on screen).
const DISCOUNT_CODE = 'CLEARSIDE10';
const REPLY_TO = 'clearsidexteriors@gmail.com';
const WEBSITE_LEADS_PIPELINE = 'pipe_c0b4eb83-263d-40d6-a802-19b529180cb1';

const clean = (v, max = 500) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

// Flyra prefers E.164; US numbers are the norm here.
function toE164(raw) {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  return raw ? `+${digits}` : '';
}

const escapeHtml = s => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

function discountEmail(firstName) {
  const hi = firstName ? `Hi ${escapeHtml(firstName)},` : 'Hi there,';
  return `<div style="font-family:Arial,sans-serif;font-size:16px;line-height:1.5;color:#1A2332;max-width:520px">
  <p>${hi}</p>
  <p>Thanks for signing up! Here is your code for <strong>10% off your first cleaning</strong> with ClearSide Exteriors:</p>
  <p style="font-size:24px;font-weight:bold;letter-spacing:2px;background:#E6F3FA;border:2px dashed #5BB8E8;border-radius:12px;padding:14px;text-align:center">${DISCOUNT_CODE}</p>
  <p>Mention the code when you book. To get your free quote, reply to this email, call or text <a href="tel:+12249859327">(224) 985-9327</a>, or use our <a href="https://clearsideexteriors.com/contact.html#quote">quote form</a>.</p>
  <p>Talk soon,<br>ClearSide Exteriors<br>Glenview, IL</p>
</div>`;
}

function flyra(url, apiKey, body) {
  return fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

// Opening /api/lead in a browser reports whether the key is set and whether
// Flyra accepts it. It never reveals the key itself.
async function connectionCheck(apiKey, keyName, rawKey) {
  if (!apiKey) {
    return Response.json({ keySet: false, problem: 'FLYRA_API_KEY2 is not set for this deploy in Netlify.' });
  }
  const res = await flyra('https://app.flyra.io/v2026-06-01/actions/flyra_list_organizations', apiKey, {});
  const detail = res.ok ? '' : (await res.text()).slice(0, 300);
  return Response.json({
    keySet: true,
    usingVariable: keyName,
    keyLooksRight: apiKey.startsWith('flr_live_'),
    // Hints only; the key itself is never shown
    ...(!apiKey.startsWith('flr_live_') && {
      keyHint: apiKey.startsWith('flr_')
        ? `Starts with "${apiKey.split('_').slice(0, 2).join('_')}_" instead of "flr_live_".`
        : apiKey.startsWith('eyJ')
          ? `This is a login token (starts with "eyJ"), not an API key. Create an API key at https://app.flyra.io/developer and copy its flr_live_ value.`
          : `No flr_live_ key found anywhere in the value. It is ${apiKey.length} characters long and starts with "${apiKey.slice(0, 3)}". Copy the secret key value (flr_live_...), not the key's name or ID.`,
    }),
    hadExtraSpacesOrQuotes: rawKey !== apiKey,
    flyraAcceptsKey: res.ok,
    flyraStatus: res.status,
    ...(detail && { flyraSays: detail }),
  });
}

export default async (req) => {
  const keyName = ['FLYRA_API_KEY2', 'FLYRA_API_KEY', 'flyraapikey'].find(name => process.env[name]);
  const rawKey = keyName ? process.env[keyName] : '';
  // Tolerate spaces, line breaks or quote marks picked up when pasting into Netlify
  // and use the flr_live_ key even if other text came along with it.
  const apiKey = rawKey.match(/flr_live_[A-Za-z0-9_-]+/)?.[0]
    || rawKey.trim().replace(/^['"]+|['"]+$/g, '').trim();
  if (req.method === 'GET') return connectionCheck(apiKey, keyName, rawKey);
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });

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
  const attribution = clean(fields.attribution, 300);

  const lead = {
    first_name: clean(fields.firstName, 100),
    last_name: clean(fields.lastName, 100),
    pipeline_id: WEBSITE_LEADS_PIPELINE,
    source: source === 'popup' ? 'Website popup' : 'Website contact form',
    notes: [
      service && `Service: ${service}`,
      message && `Message: ${message}`,
      source === 'popup' && `Sent 10% off code ${DISCOUNT_CODE}`,
      attribution && `Came from: ${attribution}`,
    ].filter(Boolean).join('\n'),
    // The follow-up sequence is all texts, so only start it when we have a phone number.
    run_automations: Boolean(phone),
  };
  if (email) lead.email = email;
  if (phone) lead.phone = phone;
  if (service) lead.service_type = service;
  const address = clean(fields.address, 200);
  if (address) lead.address_line1 = address;

  // The discount email goes out even if lead creation fails, so the visitor
  // always gets the code they were promised.
  const sendCode = source === 'popup' && email
    ? flyra(FLYRA_EMAIL_URL, apiKey, {
        to: email,
        reply_to: REPLY_TO,
        subject: `Your 10% off code: ${DISCOUNT_CODE}`,
        html: discountEmail(lead.first_name),
      })
    : null;

  const [res, emailRes] = await Promise.all([flyra(FLYRA_URL, apiKey, lead), sendCode]);

  let emailed = false;
  if (emailRes) {
    emailed = emailRes.ok;
    if (!emailRes.ok) console.error('Discount email failed', emailRes.status, await emailRes.text());
  }

  if (!res.ok) {
    console.error('Flyra lead creation failed', res.status, await res.text());
    return Response.json({ error: 'Could not create lead', emailed }, { status: 502 });
  }
  return Response.json({ ok: true, emailed });
};

export const config = { path: '/api/lead' };
