# Rent Nest

Live demo: https://rent-nest-mauve.vercel.app/

## Project Overview

Rent Nest is a Next.js property rental marketplace frontend that consumes a REST backend API. It provides:

- Public property listings with search, filters and pagination
- Interactive property detail pages with image gallery and sticky rental request panel
- Tenant rental request flow with validation
- Landlord dashboard for managing properties and rental requests
- Admin dashboard for user and content moderation

This repository contains the Next.js app (app router), server actions that wrap backend API calls, and some client state managed with `zustand`.

## Tech Stack

- Next.js (app router)
- React, TypeScript
- Tailwind CSS
- Zustand (client state)
- Axios (central instance at `lib/axios.ts`)

## Quickstart

1. Install dependencies:

```bash
npm install
```

2. Add environment variable (example):

```
BACKEND_API_URL=https://rentnest-backend-six.vercel.app/api
```

3. Run dev server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
npm run start
```

## Important Files

- `API_INTEGRATION.md` — mapping of frontend components to backend endpoints
- `lib/axios.ts` — axios instance with `baseURL` from `process.env.BACKEND_API_URL`
- `app/(public)/_actions/publicPropertiesAction.ts` — public properties endpoints
- `app/(public)/_actions/rentalRequestAction.ts` — rental request server actions
- `app/(auth)/_actions/authActions.ts` — authentication actions

## Deployment

This project is deployed on Vercel. Live demo:

https://rent-nest-mauve.vercel.app/

## Notes & Next Steps

- The app uses HTTP-only cookies named `accessToken` and `refresToken` for authenticated endpoints.
- If you want example request/response payloads added to `API_INTEGRATION.md`, let me know and I will expand it.
- Consider adding integration tests or a mock backend for CI.
