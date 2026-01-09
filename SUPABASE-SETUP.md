# Supabase Setup Guide

## Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Sign up / Log in
3. Click "New Project"
4. Fill in:
   - Project name: `vendorcompare`
   - Database password: (choose a strong password)
   - Region: (choose closest to you)
5. Click "Create new project"
6. Wait 2-3 minutes for project to be ready

## Step 2: Create Emails Table

1. In Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Paste this SQL:

```sql
CREATE TABLE IF NOT EXISTS emails (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_emails_created_at ON emails(created_at);

-- Enable Row Level Security (optional, for now we'll keep it open)
ALTER TABLE emails ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (for email collection)
CREATE POLICY "Allow public inserts" ON emails
  FOR INSERT
  TO anon
  WITH CHECK (true);
```

4. Click **Run** (or press Ctrl+Enter)
5. You should see "Success. No rows returned"

## Step 3: Get API Keys

1. In Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (under "Project API keys")

## Step 4: Add to Vercel Environment Variables

1. Go to Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
2. Add these two variables:

**Variable 1:**
- Name: `VITE_SUPABASE_URL`
- Value: Your Project URL (from Step 3)
- Environment: Production, Preview, Development

**Variable 2:**
- Name: `VITE_SUPABASE_ANON_KEY`
- Value: Your anon public key (from Step 3)
- Environment: Production, Preview, Development

3. Click **Save**
4. **REDEPLOY** your Vercel project (Deployments → 3 dots → Redeploy)

## Step 5: Verify It Works

1. After redeploy, go to your Vercel site
2. Scroll to bottom
3. Enter an email in the form
4. Click "Subscribe"
5. Go to Supabase → **Table Editor** → `emails`
6. You should see the email you just entered!

## Viewing Collected Emails

### Option 1: Supabase Dashboard
- Go to **Table Editor** → `emails`
- See all emails with timestamps

### Option 2: Export to CSV
- Go to **Table Editor** → `emails`
- Click the **Export** button (top right)
- Choose CSV format
- Download and open in Excel

### Option 3: SQL Query
```sql
SELECT * FROM emails ORDER BY created_at DESC;
```

## Troubleshooting

### Emails not saving?
1. Check Vercel environment variables are set correctly
2. Make sure you redeployed after adding env vars
3. Check browser console (F12) for errors
4. Check Supabase logs (Dashboard → Logs)

### "Table does not exist" error?
- Make sure you ran the SQL to create the table (Step 2)

### "Policy violation" error?
- Check Row Level Security policy is set correctly (Step 2)

## Next Steps

Once you have emails:
1. Export them from Supabase
2. Use for email marketing (Mailchimp, ConvertKit, etc.)
3. Follow up with potential customers
4. Offer early access / beta testing
