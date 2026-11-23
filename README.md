# MOVIE HOUSE — Cinema Ticket Booking System

A responsive bilingual (Arabic/English) cinema-booking coursework prototype based on the provided E-Commerce Security project proposal.

## Technology

- **HTML**: semantic page structure
- **CSS**: cinematic design, transitions, responsive layout
- **Vanilla JavaScript**: client-side navigation, seat map, validation, booking UI
- **Node.js (built-in HTTP/crypto modules)**: server-side account and reservation handling
- **JSON**: local development database; **PostgreSQL (Neon)**: durable cloud storage for online deployment

Local mode runs without installing packages. Online deployment needs the `pg` package (installed by Render) and a PostgreSQL database. Movies and poster artwork are fictional and created for this demo.

## Requirements

- Node.js version **18 or newer**
- A recent browser (Chrome, Edge, or Firefox)

## How to run

1. Extract the ZIP.
2. Open a terminal inside `movie_house_booking_system`.
3. Run:

   ```bash
   npm start
   ```

   Or directly: `node server.js`
4. Open **http://127.0.0.1:3000**

   On Windows, you can double-click `START_WINDOWS.bat` (provided Node.js is installed); it will start the local server and open the browser.

5. To stop the server, press **Ctrl+C** in the terminal.

## Demo workflow

1. Browse six sample movies.
2. Select a movie, screening day/time, and seats.
3. Register a demo account (password must be 8+ characters).
4. Click **Confirm demo booking**.
5. Receive a printable ticket with a unique reservation code.
6. Visit **My bookings** to review previous bookings.
7. Try another account: seats from confirmed bookings should now be unavailable.

## Security model and limitations

- Passwords are hashed using `crypto.scryptSync()` with a unique random salt; passwords are **never** stored in plain text.
- Login uses a random server-side session token with an HttpOnly, SameSite=Lax cookie. Sessions expire after seven days and survive server restarts when using persistent database storage.
- The server validates film ID, screening date/time, seat IDs, prices, unique seat availability, and booking ownership. The client cannot set prices.
- Basic login rate limiting, origin checking, restrictive content security policy, and HTTP hardening headers are implemented.
- Reservation conflicts are checked on the server; concurrent requests within the single Node.js server process are processed sequentially across the synchronous database save.
- **Payments are simulated.** No credit-card information or real payments are processed.
- This is an **academic demo**, not a hardened commercial ticketing service. For real production: HTTPS/reverse proxy, a CSRF tokens, email verification, audit logs, robust distributed rate limiting, secrets management, automated security testing, and real payment-provider integration would be required.
- `storage/data.json` stores demo account identifiers and hashes plus bookings. Do not upload this file to public repositories after creating accounts. Online hosting uses PostgreSQL instead of this file. To reset the demo, stop the server and delete `storage/data.json` (it is recreated on next start).

## Project structure

```text
movie_house_booking_system/
  server.js            Node.js API and static server
  datastore.js         Local JSON / cloud PostgreSQL persistence
  render.yaml          Render deployment configuration
  package.json         Node.js metadata; no dependencies
  START_WINDOWS.bat    Windows launcher
  public/
    index.html         HTML shell
    styles.css         Complete responsive design
    app.js             Booking UI and interactions
    assets/            Original vector movie posters and favicon
  storage/
    data.json          Generated on first run, not in the ZIP
```

**Academic note:** A valid reservation is stored without actual payment. This follows the proposal's requirement for a simulated booking/e-ticket experience, but should not be presented as a real payment gateway.

## Free public deployment (Render + Neon)

See **DEPLOY_AR.md** for an Arabic walkthrough. The two accounts are free within their respective plans.

- Sign up at https://neon.tech and create a PostgreSQL project. Copy the connection string ending in `sslmode=require`. Treat it as a password, never commit it to GitHub.
- Create a GitHub repository and upload the **contents** of this folder (not the ZIP). Do not upload `storage/data.json` or secrets.
- Sign up at https://render.com and connect GitHub. Choose **New > Blueprint**, select this repository. During creation, supply `DATABASE_URL` from Neon and select the free service. If you use **New > Web Service** instead, set build `npm install --omit=dev`, start `npm start`, env vars `NODE_ENV=production`, `HOST=0.0.0.0`, `DATABASE_URL=<your URL>`, and select **Free**.
- The public address appears in your Render dashboard and typically ends in `.onrender.com`. Do not share an example address as a live URL.
- Render free web services can sleep after 15 minutes idle; initial load afterward may take around a minute. PostgreSQL storage in Neon survives service restarts.

Never use real passwords that you use elsewhere in the demonstration. Public accounts can be accessed from anywhere; use this only as a course demo.
