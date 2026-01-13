# Analytics Tracking Overview

## ✅ What's Being Tracked Automatically

### 1. **Page Views** (Automatic)
- Tracks every page visit automatically
- View in: Vercel Dashboard → Analytics → Page Views

### 2. **Custom Events** (Enhanced Tracking)

#### 👀 Page Engagement
- **Event:** `page_view`
- **Data:** Page name
- **Event:** `scroll_depth`
- **Data:** 25%, 50%, 75%, or 100% (tracks how far users scroll)
- **Event:** `time_on_page`
- **Data:** 10s, 30s, 60s, or 120s (tracks engagement time)
- **Event:** `page_exit`
- **Data:** Time spent (seconds), max scroll depth

#### 📁 File Interactions
- **Event:** `upload_button_clicked`
- **Data:** Method (button)
- **Event:** `file_selected`
- **Data:** Number of files selected
- **Event:** `file_dropped`
- **Data:** Number of files dropped
- **Event:** `files_added`
- **Data:** File count, total files, file types
- **Event:** `file_removed`
- **Data:** Remaining file count
- **Event:** `clear_all_clicked`
- **Data:** Number of files cleared
- **Event:** `file_limit_reached`
- **Data:** Current count, attempted count

#### 🔄 Quote Comparisons
- **Event:** `quote_compare_started`
- **Data:** Number of files uploaded
- **Event:** `quote_compare_success`
- **Data:** Quote count, lowest price, highest price
- **Event:** `quote_compare_error` (if fails)
- **Data:** Error message
- **Event:** `results_viewed`
- **Data:** Quote count, has best deal

#### 📊 Excel Exports
- **Event:** `excel_export`
- **Data:** Number of quotes exported

#### 📧 Email Submissions
- **Event:** `email_submitted`
- **Data:** Email domain (privacy-friendly)
- **Also tracks:** `email_saved_supabase` or `email_saved_localstorage`

## 📍 Where to View Analytics

### Vercel Analytics Dashboard
1. Go to: https://vercel.com → Your Project → **Analytics**
2. View:
   - **Page Views:** All visits
   - **Top Pages:** Most visited pages
   - **Custom Events:** All custom events above

### Email Collection

#### If Supabase is Configured:
- Check: **Supabase Dashboard** → **Table Editor** → `emails` table
- All emails will be saved there with timestamps

#### If Supabase NOT Configured (Fallback):
- Emails saved to browser's localStorage
- To view: Open browser console (F12) → Application → Local Storage → `collected_emails`

## ✅ How to Verify It's Working

### 1. Check Analytics in Vercel
- Visit your site
- Navigate between pages
- Wait 30 seconds
- Check Vercel Dashboard → Analytics
- You should see page views appearing

### 2. Test Email Collection
1. Visit your deployed site
2. Scroll to bottom
3. Enter an email in the form
4. Click "Subscribe"
5. **If Supabase configured:** Check Supabase → Table Editor → `emails`
6. **If not configured:** Check browser console for "Email saved to localStorage" message

### 3. Check Browser Console
- Open DevTools (F12)
- Look for console logs:
  - `✅ Email saved to Supabase:` (if working)
  - `✅ Email saved to localStorage (fallback)` (if Supabase not configured)
  - `📤 POST to:` (when comparing quotes)
  - `✅ Email saved to Supabase:` (successful email saves)

## 🔧 Troubleshooting

### No Analytics Data?
- ✅ Make sure `@vercel/analytics` is installed (it is)
- ✅ Make sure `<Analytics />` component is in App.jsx (it is)
- ✅ Wait 30 seconds after visiting site
- ✅ Check ad blockers aren't blocking Analytics
- ✅ Make sure you're viewing the deployed site (not localhost)

### Emails Not Saving to Supabase?
1. Check Vercel environment variables:
   - `VITE_SUPABASE_URL` is set?
   - `VITE_SUPABASE_ANON_KEY` is set?
2. Check Supabase:
   - Table `emails` exists?
   - RLS policy allows inserts?
3. Check browser console for errors
4. If all fails, emails still save to localStorage (fallback)

### Still Not Working?
- Check browser console (F12) for errors
- Check Vercel deployment logs
- Check Supabase logs: Dashboard → Logs

## 📊 Expected Data

When users test your app, you'll see:

1. **Page Views** → Every visit tracked
2. **Custom Events:**
   - `email_submitted` → Every email form submission
   - `quote_compare_started` → Every time they click "Compare"
   - `quote_compare_success` → Successful comparisons
   - `excel_export` → Every Excel download
3. **Email List:**
   - In Supabase table (if configured)
   - Or in localStorage (if not configured)

Everything is working! 🎉
