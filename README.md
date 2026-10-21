# Vaishnavi Pest Control

Production website for Vaishnavi Pest Control in Pune. Service prices, ratings, and durations live in `src/lib/services.ts`.

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and set the public site URL, WhatsApp number, and phone numbers. Leave `ENQUIRY_WEBHOOK_URL` empty to use the WhatsApp and phone handoff. An enquiry is not stored or confirmed unless that webhook accepts it.

```bash
npm run lint
npm run build
npm start
```
# vaishnavi.pest-control
