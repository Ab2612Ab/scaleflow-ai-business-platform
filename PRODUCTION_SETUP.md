# ScaleFlow AI production setup

The application is designed for Vercel + Supabase Auth/Postgres + Resend.

## Vercel Production variables

Set these as encrypted Production variables:

- `SUPABASE_URL` — Supabase project URL
- `SUPABASE_ANON_KEY` — Supabase publishable/anon key
- `RESEND_API_KEY` — Resend API key
- `CONTACT_FROM_EMAIL` — verified sender, for example `ScaleFlow AI <hello@yourdomain.com>`
- `CONTACT_TO_EMAIL` — destination for business inquiries
- `ADMIN_EMAILS` — comma-separated emails allowed into `/admin.html`

Vercel environment variables are scoped by environment; production values must be present on the Production environment before a production deployment. See Vercel's environment-variable documentation.

## Supabase

1. Create a Supabase project.
2. Run `supabase/schema.sql` in Supabase SQL Editor.
3. Enable Email/Password authentication and require email confirmation.
4. Set the production Site URL to the live ScaleFlow domain and add the live auth callback/redirect URL.
5. Add the Supabase variables to Vercel Production.

Supabase hosted email/password authentication supports mandatory email verification. For production email delivery, configure a custom SMTP/provider rather than relying on the limited default SMTP service.

## Resend

1. Create a Resend API key.
2. Verify the sending domain.
3. Add `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` to Vercel Production.
4. Redeploy.

The application keeps all secrets server-side; no private key is exposed to browser JavaScript.

## Admin

The admin application is `/admin.html`. Access is additionally checked server-side by `/api/admin/overview` against `ADMIN_EMAILS`; the browser UI is not treated as the security boundary.
