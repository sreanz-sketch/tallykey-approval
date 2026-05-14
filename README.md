# TallyKey Order Confirmation Form

A React app for sending pedestal order confirmations to customers for digital sign-off.

## Deploying to Vercel (free)

### 1. Push to GitHub

1. Go to [github.com](https://github.com) and create a new repository called `tallykey-approval`
2. Upload all the files from this folder to that repository

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign up / log in
2. Click **Add New Project** → **Import Git Repository** → select `tallykey-approval`
3. Under **Environment Variables**, add:
   - `VITE_BUILDER_PIN` → your chosen 4-digit PIN (keep this secret)
   - `VITE_FORMSPREE_ID` → your Formspree form ID (optional, for email notifications)
4. Click **Deploy**

Your form will be live at `https://tallykey-approval.vercel.app`

---

## Usage

### As a customer
Customers visit the URL directly and see the order confirmation form. They review the pedestal specification, sign, and submit.

### As the builder (you)
Access the builder by visiting: `https://your-url.vercel.app/?builder=1`

Enter your PIN and you can edit the order details, table rows, notes, and delivery details before sending the link to a customer.

### Sending to a customer
1. Go to `/?builder=1`, enter your PIN
2. Update the order details and table for the new customer
3. Click **PREVIEW AS CUSTOMER →** to verify it looks right
4. Send the plain URL (`https://your-url.vercel.app`) to the customer by email
5. They click it, review, sign, and submit

---

## Setting up email notifications (Formspree)

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form called "TallyKey Order Approvals"
3. Copy the form ID from the endpoint URL (e.g. `xpwzjqkv` from `https://formspree.io/f/xpwzjqkv`)
4. Add it as `VITE_FORMSPREE_ID` in your Vercel environment variables
5. Redeploy

Each customer submission will now email you the approval details automatically.

---

## Local development

```bash
npm install
cp .env.example .env.local
# Edit .env.local with your PIN and Formspree ID
npm run dev
```

Open `http://localhost:5173` for the customer view, or `http://localhost:5173/?builder=1` for the builder.
