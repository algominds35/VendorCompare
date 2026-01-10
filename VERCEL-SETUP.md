# Vercel Environment Variable Setup

## What You Need to Add in Vercel

When you deploy your frontend to Vercel, you MUST add this environment variable:

**Variable Name:** `VITE_API_URL`  
**Variable Value:** Your Railway backend URL (e.g., `https://vendorcompare-backend-production.up.railway.app`)

## How to Add It in Vercel:

1. Go to your Vercel project dashboard
2. Click **Settings** (gear icon)
3. Click **Environment Variables** (left sidebar)
4. Click **Add New**
5. Enter:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://your-railway-backend-url.up.railway.app` (your actual Railway URL)
   - **Environment:** Select all (Production, Preview, Development)
6. Click **Save**
7. **Redeploy** your project (Vercel will do this automatically or you can trigger it manually)

## Why This is Needed

The frontend code uses:
```javascript
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001'
```

- In **production (Vercel)**: Uses `VITE_API_URL` from environment variables
- In **local development**: Falls back to `http://localhost:3001`

Without this variable, your Vercel frontend will try to connect to `localhost:3001` which won't work!

## Quick Checklist

- [ ] Deploy backend to Railway
- [ ] Get Railway backend URL
- [ ] Add `VITE_API_URL` in Vercel with your Railway URL
- [ ] Redeploy frontend on Vercel
- [ ] Test the app!
