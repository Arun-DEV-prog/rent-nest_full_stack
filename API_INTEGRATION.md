                                                                         # API Integration Mapping

This file maps frontend components / server actions to backend endpoints used by the app.

Notes:

- Two kinds of backend calls are used:
  - Direct external backend calls using a hardcoded `BASE_URL` constant in some server actions: `https://rentnest-backend-six.vercel.app/api`.
  - Proxied calls using `axiosInstance` whose `baseURL` is set from `process.env.BACKEND_API_URL` in `lib/axios.ts`.
- Authentication: server actions read `accessToken` cookie (HTTP-only). Many endpoints require `Authorization: Bearer <token>`.

---

## Public / Properties

- Component: `app/(public)/properties/_component/PropertiesList.tsx`
  - Server action: `getPublicProperties` → `app/(public)/_actions/publicPropertiesAction.ts::getPublicProperties`
  - Endpoint: GET `https://rentnest-backend-six.vercel.app/api/properties` (query params: `search`, `location`, `type`, `minPrice`, `maxPrice`, `bedrooms`, `availability`, `page`, `limit`)
  - Notes: server-side cached via `unstable_cache`, revalidation tag `public-properties`.

- Component: `app/(public)/properties/[id]/page.tsx` (property detail)
  - Server action: `getPropertyById` → `app/(public)/_actions/publicPropertiesAction.ts::getPropertyById`
  - Endpoint: GET `https://rentnest-backend-six.vercel.app/api/properties/:id`
  - Notes: server-side cached, tag `public-property`.

## Rental requests (tenants)

- Component: `app/(public)/properties/_component/RentalRequestPanel.tsx`
  - Server action: `submitRentalRequest` → `app/(public)/_actions/rentalRequestAction.ts::submitRentalRequest`
  - Endpoint (proxied): POST `${BACKEND_API_URL}/api/rentals` (client code uses `axiosInstance.post('/api/rentals', ...)`)
  - Body: `{ propertisId, move_in_date, lease_duration }`
  - Auth: Requires tenant JWT (checked via `accessToken` cookie on server). Returns `{ ok, message }`.

- Component: auth check used in pages
  - Server action: `checkAuth` → `app/(public)/_actions/rentalRequestAction.ts::checkAuth`
  - Notes: Does not call backend; checks `accessToken` cookie locally to determine role.

## Auth

- Components: login/register forms under `app/(auth)`
  - Server actions: `registerAction`, `loginAction` → `app/(auth)/_actions/authActions.ts`
  - Endpoints (proxied):
    - POST `${BACKEND_API_URL}/api/auth/register`
    - POST `${BACKEND_API_URL}/api/auth/login`
  - Notes: `loginAction` stores `accessToken` and `refresToken` in HTTP-only cookies via server `cookies()`.

## Landlord

- Components: landlord dashboard pages
  - Server actions: `landlordProperties`, `landlordPropertiesRequest` → `app/(landlord)/_actions/propertiesAction.ts`
  - Endpoints (proxied): GET `${BACKEND_API_URL}/api/landlord/my-properties` and GET `${BACKEND_API_URL}/api/landlord/requests`
  - Auth: Bearer token required (cookie read on server and passed in `Authorization` header).

- Action: `updateRentalRequestStatus` → PATCH `${BACKEND_API_URL}/api/landlord/requests/:requestId` (body: `{ status }`)

## Admin

- Components: admin dashboard pages under `app/(admin)`
  - Server actions use `BASE_URL = https://rentnest-backend-six.vercel.app/api` directly.
  - Endpoints:
    - GET `https://rentnest-backend-six.vercel.app/api/admin/users?page=...&limit=...`
    - GET `https://rentnest-backend-six.vercel.app/api/admin/rentals?page=...&limit=...`
    - GET `https://rentnest-backend-six.vercel.app/api/admin/properties?page=...&limit=...`
    - GET `https://rentnest-backend-six.vercel.app/api/admin/users/:id`
    - PATCH `https://rentnest-backend-six.vercel.app/api/admin/users/:id` (body: `{ status }`)
  - Auth: Admin JWT read from cookies; server-side header check enforces admin role.

## Landlord property management

- Components: landlord property management and modals
  - Actions in `app/(landlord)/_actions/propertyManageActions.ts`
  - Endpoints (proxied):
    - POST `${BACKEND_API_URL}/api/landlord/properties` (create)
    - PUT `${BACKEND_API_URL}/api/landlord/properties/:id` (update)
    - DELETE `${BACKEND_API_URL}/api/landlord/properties/:id` (delete)
  - Auth: Bearer token required.

## Tenant dashboard & payments

- Tenant dashboard actions call proxied admin/backend endpoints via `axiosInstance` (see `app/(tenant)/tenant-dashboard/_actions/*`). Typical endpoints:
  - GET `${BACKEND_API_URL}/api/tenant/rentals` (or similar)
  - POST or PATCH endpoints for reviews/payments under `/api/tenant/...` or `/api/payments` depending on action.

## Misc & Notes

- `lib/axios.ts` config: `baseURL` is `process.env.BACKEND_API_URL`. Ensure this env var is set in deployment (e.g., `https://rentnest-backend-six.vercel.app/api` or your own backend URL).

- Many server actions set/expect HTTP-only cookies named `accessToken` and `refresToken` and then forward `Authorization: Bearer <token>` where needed.

- Caching: Some server actions use `unstable_cache` and `revalidateTag` with tags such as `public-properties`, `public-property`, `admin-users`, `landlord-properties`, etc. When mutations happen (create/update/delete), revalidation tags are used to refresh cached data.

---

If you'd like, I can:

- Expand this doc with example request/response payloads for each endpoint.
- Add TypeScript interfaces for request/response shapes and wire them into the client/server actions.
- Add automated integration tests (minimal) that hit a sandbox backend URL.
