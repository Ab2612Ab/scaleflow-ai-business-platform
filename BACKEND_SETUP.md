# ScaleFlow AI backend

The Vercel app now includes production serverless endpoints for authentication and lead handling.

## Auth
- `POST /api/auth/signup` — creates a user through Supabase Auth.
- `POST /api/auth/login` — signs in a user.
- `POST /api/auth/resend` — resends email verification.
- `POST /api/auth/logout` — signs out the active session.
- `GET /api/me` — validates the authenticated session.

Supabase should have email confirmation enabled. Add `SUPABASE_URL` and `SUPABASE_ANON_KEY` to the Vercel Production environment.

## Lead delivery
`POST /api/contact` validates and sends project inquiries through Resend. Add `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` and `CONTACT_TO_EMAIL` to Vercel Production.

## Health
`GET /api/health` reports whether the auth and email environment variables are present without exposing their values.

No secret keys are committed to GitHub.
