# 📊 How to See What Users Are Doing on Your Landing Page

## ✅ Everything That's Being Tracked

Your landing page now tracks **EVERYTHING** users do:

### 1. **Page Engagement**
- ✅ **Page Views** - Every visit
- ✅ **Scroll Depth** - 25%, 50%, 75%, 100% milestones
- ✅ **Time on Page** - 10s, 30s, 60s, 120s milestones
- ✅ **Page Exit** - When they leave (with time spent & scroll depth)

### 2. **File Interactions**
- ✅ **Upload Button Clicked** - When they click "Choose Files"
- ✅ **File Selected** - When they select files via file picker
- ✅ **File Dropped** - When they drag & drop files
- ✅ **Files Added** - Successfully added files (with count & file types)
- ✅ **File Removed** - When they remove individual files
- ✅ **Clear All Clicked** - When they clear all files
- ✅ **File Limit Reached** - When they try to add more than 10 files

### 3. **Quote Comparison**
- ✅ **Quote Compare Started** - When they click "Compare" button
- ✅ **Quote Compare Success** - Successful comparison (with quote count, prices)
- ✅ **Quote Compare Error** - If comparison fails
- ✅ **Results Viewed** - When results are displayed

### 4. **Downloads & Exports**
- ✅ **Excel Export** - Every Excel download (with quote count)

### 5. **Email Collection**
- ✅ **Email Submitted** - Every email form submission
- ✅ **Email Saved (Supabase)** - Successfully saved to database
- ✅ **Email Saved (LocalStorage)** - Fallback storage

---

## 📍 How to View Analytics in Vercel

### Step 1: Go to Vercel Dashboard
1. Visit: **https://vercel.com**
2. Log in to your account
3. Click on your **VendorCompare** project

### Step 2: Open Analytics Tab
1. Click **"Analytics"** in the left sidebar
2. You'll see:
   - **Overview** - Total page views, unique visitors
   - **Top Pages** - Most visited pages
   - **Custom Events** - All the events listed above

### Step 3: View Custom Events
1. In Analytics, click **"Custom Events"** tab
2. You'll see a list of all events:
   - `page_view`
   - `scroll_depth`
   - `time_on_page`
   - `upload_button_clicked`
   - `file_selected`
   - `file_dropped`
   - `files_added`
   - `quote_compare_started`
   - `quote_compare_success`
   - `excel_export`
   - `email_submitted`
   - And more...

3. Click on any event to see:
   - **Count** - How many times it happened
   - **Trend** - Over time (daily/weekly)
   - **Properties** - Additional data (file count, prices, etc.)

---

## 📈 What to Look For

### **High Engagement Signals:**
- ✅ `scroll_depth` (50%+) - Users are reading your page
- ✅ `time_on_page` (30s+) - Users are spending time
- ✅ `files_added` - Users are actually using the tool!
- ✅ `quote_compare_started` - Users are trying it out
- ✅ `quote_compare_success` - Tool is working for them
- ✅ `excel_export` - Users are getting value (downloading results)
- ✅ `email_submitted` - Users want updates (potential customers!)

### **Conversion Funnel:**
1. **Page View** → User visits
2. **Scroll Depth (50%+)** → User reads content
3. **Files Added** → User uploads quotes
4. **Quote Compare Started** → User clicks compare
5. **Quote Compare Success** → Tool works!
6. **Excel Export** → User gets value
7. **Email Submitted** → User wants more (LEAD!)

---

## 🔍 Real-Time Monitoring

### Check Right Now:
1. Go to **Vercel Dashboard** → Your Project → **Analytics**
2. Look at **"Last 24 hours"** or **"Last 7 days"**
3. You'll see:
   - How many people visited
   - What they clicked
   - How far they scrolled
   - How long they stayed

### Daily Check:
- **Page Views** - Are people finding your site?
- **Files Added** - Are people using the tool?
- **Quote Compare Success** - Is it working?
- **Email Submitted** - Are you getting leads?

---

## 📊 Example: What Good Traffic Looks Like

**Healthy User Journey:**
```
1. page_view (100 visitors)
   ↓
2. scroll_depth: 50% (60 visitors - 60% engagement)
   ↓
3. files_added (30 visitors - 30% try the tool)
   ↓
4. quote_compare_started (25 visitors - 83% of uploaders)
   ↓
5. quote_compare_success (20 visitors - 80% success rate)
   ↓
6. excel_export (15 visitors - 75% download results)
   ↓
7. email_submitted (10 visitors - 10% conversion to leads!)
```

**This means:**
- 60% of visitors engage (scroll 50%+)
- 30% try the tool
- 20% get successful results
- 10% become leads (email signups)

---

## 🚨 Red Flags to Watch For

### **Low Engagement:**
- `scroll_depth` only at 25% → Users bounce quickly
- `time_on_page` < 10s → Content not engaging
- `files_added` = 0 → No one is using the tool

### **High Drop-off:**
- Many `quote_compare_started` but few `quote_compare_success`
  → Tool might be broken or too slow

### **No Conversions:**
- Many `quote_compare_success` but no `email_submitted`
  → Users get value but don't want updates (maybe add pricing?)

---

## 💡 Pro Tips

### 1. **Set Up Daily/Weekly Reports**
- Check Analytics every morning
- Track: Page views, files added, emails submitted

### 2. **Compare Time Periods**
- This week vs last week
- Are numbers going up or down?

### 3. **Focus on Conversion Events**
- **Most Important:** `email_submitted` (leads!)
- **Second:** `excel_export` (users getting value)
- **Third:** `quote_compare_success` (tool working)

### 4. **Use Data to Improve**
- If `scroll_depth` is low → Improve headline/design
- If `files_added` is low → Make upload more obvious
- If `quote_compare_error` is high → Fix bugs

---

## 🎯 Quick Check (30 seconds)

**Right now, go to:**
1. Vercel Dashboard → Your Project → Analytics
2. Look at **"Custom Events"** tab
3. Check these 3 numbers:
   - `page_view` - How many visitors?
   - `files_added` - How many tried it?
   - `email_submitted` - How many leads?

**That's it!** You now know if people are using your tool! 🎉

---

## 📱 Mobile vs Desktop

Vercel Analytics also shows:
- **Device Type** - Mobile vs Desktop
- **Browser** - Chrome, Safari, etc.
- **Country** - Where visitors are from
- **Referrer** - How they found you (Google, direct, etc.)

Check: **Analytics** → **Overview** → Scroll down to see breakdowns

---

## ✅ Summary

**You're tracking:**
- ✅ Every page visit
- ✅ Every scroll milestone
- ✅ Every file upload
- ✅ Every button click
- ✅ Every comparison
- ✅ Every download
- ✅ Every email signup

**View it in:**
- Vercel Dashboard → Analytics → Custom Events

**Check daily for:**
- Page views (traffic)
- Files added (usage)
- Email submitted (leads)

**That's everything!** 🚀
