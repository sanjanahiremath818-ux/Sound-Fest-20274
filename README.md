# TechVista Event Management Platform (Simplified)

A complete, student-friendly event website with registration, digital tickets + QR codes, confirmation emails, and an admin dashboard.

**You do not need to install Node.js or use a terminal.**  
You only need a GitHub account and a Vercel account (both free).

---

## What this project includes

- Beautiful public event website (Home, About, Agenda, Speakers, Register, Contact)
- Working registration form
- Unique ticket number + QR code for every registrant
- Ticket page that shows the QR code
- Confirmation email (via Resend – optional)
- Admin login + dashboard with registration stats
- List of all registrations
- Neon PostgreSQL database (free tier)
- Ready for one-click deploy on Vercel

---

## Step-by-step deployment (No terminal required)

### 1. Create a free Neon database

1. Go to [https://console.neon.tech](https://console.neon.tech) and sign up / log in.
2. Click **Create Project**.
3. Give it any name (e.g. `techvista`).
4. After the project is created, go to **Connection Details**.
5. Copy the **Connection string** (it starts with `postgresql://...`).
   - Keep this safe. You will paste it into Vercel later.

### 2. Create a free Resend account (for emails – optional but recommended)

1. Go to [https://resend.com](https://resend.com) and sign up.
2. Go to **API Keys** → Create API Key.
3. Copy the key (starts with `re_...`).
4. (Optional) Verify your own domain later for better deliverability. For testing, the default `onboarding@resend.dev` works.

### 3. Upload the project to GitHub

1. Go to [https://github.com](https://github.com) and sign in.
2. Click the **+** button (top right) → **New repository**.
3. Repository name: `event-management-platform` (or any name).
4. Keep it **Public**.
5. Do **not** add README, .gitignore, or license (the project already has them).
6. Click **Create repository**.
7. On the next page, click **uploading an existing file**.
8. Drag and drop **all the files and folders** from this project into the upload area.
   - Make sure you upload the contents (package.json, src folder, prisma folder, etc.).
9. Scroll down and click **Commit changes**.

### 4. Deploy on Vercel

1. Go to [https://vercel.com](https://vercel.com) and sign up / log in (you can use your GitHub account).
2. Click **Add New…** → **Project**.
3. Find the repository you just created and click **Import**.
4. Vercel will detect it is a Next.js project. Leave the settings as they are.
5. Before deploying, click **Environment Variables** and add the following:

| Name                   | Value                                      | Notes                                      |
|------------------------|--------------------------------------------|--------------------------------------------|
| `DATABASE_URL`         | Your Neon connection string                | Required                                   |
| `AUTH_SECRET`          | A long random string (min 32 characters)   | Required – use https://generate-secret.vercel.app/32 |
| `NEXT_PUBLIC_APP_URL`  | Leave empty for now, or put the Vercel URL later | You can update after first deploy         |
| `RESEND_API_KEY`       | Your Resend API key                        | Optional                                   |
| `RESEND_FROM_EMAIL`    | `onboarding@resend.dev`                    | Optional                                   |
| `RESEND_FROM_NAME`     | `TechVista Team`                           | Optional                                   |
| `ADMIN_EMAIL`          | `admin@example.com`                        | Used only for seeding                      |
| `ADMIN_PASSWORD`       | `Admin@12345`                              | Change this later!                         |

6. Click **Deploy**.

### 5. Initialize the database (one-time – important)

After the first successful deploy on Vercel:

**Option A (Recommended – using Neon SQL Editor)**

1. Open the file `prisma/init.sql` from this project.
2. Go to your Neon project → **SQL Editor**.
3. Paste the entire content of `init.sql` and click **Run**.
4. Then call the setup endpoint once to create the admin user and sample event:

   Open this URL in your browser (replace with your real values):

   ```
   https://YOUR-VERCEL-URL.vercel.app/api/setup?secret=YOUR_AUTH_SECRET
   ```

   You should see a success message.

**Option B**

If you have a friend who knows Node.js, they can run:

```bash
npx prisma db push
npx tsx prisma/seed.ts
```

After this step, the admin login and registration will work.

### 6. First Admin Login

- URL: `https://your-project.vercel.app/admin/login`
- Email: the `ADMIN_EMAIL` you set (default `admin@example.com`)
- Password: the `ADMIN_PASSWORD` you set (default `Admin@12345`)

**Change the password after first login** by updating the user in the database or re-seeding with a new password.

### 7. Update the App URL

1. After deployment, copy your live URL (e.g. `https://event-management-platform.vercel.app`).
2. Go to Vercel → Project → Settings → Environment Variables.
3. Edit `NEXT_PUBLIC_APP_URL` and paste the live URL.
4. Redeploy (Deployments → Redeploy).

---

## Local development (only if you have Node.js)

If you are a developer and want to run it locally:

```bash
npm install
cp .env.example .env
# Edit .env with your DATABASE_URL and AUTH_SECRET
npx prisma db push
npx tsx prisma/seed.ts
npm run dev
```

---

## Default Admin Credentials (change after deploy)

- Email: `admin@example.com`
- Password: `Admin@12345`

---

## Project Structure

```
event-management-platform/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Creates admin + sample event
├── src/
│   ├── app/
│   │   ├── (public)/      # Public pages
│   │   ├── admin/         # Admin dashboard
│   │   └── api/           # API routes
│   ├── components/
│   └── lib/
├── .env.example
├── package.json
└── README.md
```

---

## Troubleshooting

**“Invalid credentials” on admin login**  
→ Make sure you ran the seed (or the admin user exists). Check that `ADMIN_EMAIL` / `ADMIN_PASSWORD` match what you type.

**Database connection errors**  
→ Double-check the `DATABASE_URL` in Vercel. It must include `?sslmode=require`.

**Emails not sending**  
→ `RESEND_API_KEY` is missing or invalid. Registration still works; only the email is skipped.

**QR code not showing**  
→ Make sure the ticket page loads. The QR is generated on the client.

---

## What is NOT included in this simplified version

- Drag-and-drop form builder
- Invitation-only registration
- Full multi-role RBAC
- SPOC management
- Email campaign system
- Multiple events
- Image upload system
- Any scheduled jobs or cron jobs (this project contains zero cron jobs)

These can be added later. This version is fully working and deployable for real student events.

---

Made for college students who want a professional event website without the usual developer setup pain.
