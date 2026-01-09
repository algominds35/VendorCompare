# Quick Supabase Setup (Correct Order)

## Step 1: Create Supabase Project & Get API Keys

1. Go to https://supabase.com
2. Sign up or log in
3. Click **"New Project"**
4. Fill in:
   - **Name:** `vendorcompare` (or any name)
   - **Database Password:** Choose a strong password (save it!)
   - **Region:** Choose closest to you
5. Click **"Create new project"**
6. **Wait 2-3 minutes** for project to be ready

### Get Your API Keys:
1. In Supabase dashboard, click **Settings** (gear icon)
2. Click **API** in the left menu
3. Copy these TWO values:
   - **Project URL** (looks like: `https://abcdefghijklmnop.supabase.co`)
   - **anon public** key (long string under "Project API keys")

**Save these - you'll need them in Step 3!**

---

## Step 2: Create the Emails Table (Run SQL)

1. In Supabase dashboard, click **SQL Editor** in left menu
2. Click **"New Query"** button
3. Copy and paste this SQL:

```sql
CREATE TABLE IF NOT EXISTS emails (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_emails_created_at ON emails(created_at);

ALTER TABLE emails ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts" ON emails
  FOR INSERT
  TO anon
  WITH CHECK (true);
```

4. Click **"Run"** button (or press Ctrl+Enter)
5. You should see: **"Success. No rows returned"**

✅ Table is now created!

---

## Step 3: Add API Keys to Vercel

1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**

2. Add **Variable 1:**
   - **Name:** `VITE_SUPABASE_URL`
   - **Value:** Your Project URL (from Step 1)
   - **Environment:** Check all (Production, Preview, Development)
   - Click **Save**

3. Add **Variable 2:**
   - **Name:** `VITE_SUPABASE_ANON_KEY`
   - **Value:** Your anon public key (from Step 1)
   - **Environment:** Check all (Production, Preview, Development)
   - Click **Save**

4. **IMPORTANT:** Go to **Deployments** tab
5. Click the **3 dots (⋯)** on latest deployment
6. Click **"Redeploy"**
7. Wait 1-2 minutes for redeploy

---

## Step 4: Test It!

1. Go to your Vercel site
2. Scroll to bottom
3. Enter an email in the form
4. Click "Subscribe"
5. Go back to Supabase → **Table Editor** → `emails`
6. You should see the email you just entered! ✅

---

## Troubleshooting

### "Table does not exist" error?
- Make sure you ran the SQL in Step 2
- Check SQL Editor for any errors

### "Policy violation" error?
- Make sure you ran ALL the SQL, including the CREATE POLICY part

### Emails not showing in Supabase?
- Check Vercel environment variables are set correctly
- Make sure you redeployed after adding env vars
- Check browser console (F12) for errors

### Still not working?
- The form will still work with localStorage (fallback)
- Check Supabase logs: Dashboard → Logs

---

## Summary

1. ✅ Create Supabase project → Get API keys
2. ✅ Run SQL → Create emails table  
3. ✅ Add keys to Vercel → Redeploy
4. ✅ Test → Collect emails!

That's it! 🎉
