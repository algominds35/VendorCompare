# Troubleshooting Guide

## If you're getting "Backend not connected" or 404 errors:

### Step 1: Verify Railway Backend is Working
Test these URLs in your browser:
1. **Health Check:** `https://vendorcompare-backend-production.up.railway.app/health`
   - Should return: `{"status":"ok","message":"Server is running"}`
2. **Test OpenAI:** `https://vendorcompare-backend-production.up.railway.app/test-openai`
   - Should return: `{"success":true,"message":"OpenAI API key is valid"}`

### Step 2: Verify Vercel Environment Variable
1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. Check that `VITE_API_URL` exists with value: `https://vendorcompare-backend-production.up.railway.app`
3. **IMPORTANT:** After adding/changing env vars, you MUST **REDEPLOY**:
   - Go to **Deployments** tab
   - Click the **3 dots** (⋯) on the latest deployment
   - Click **Redeploy**
   - OR make a small change and push to GitHub to trigger auto-deploy

### Step 3: Check Browser Console
1. Open your Vercel frontend URL
2. Press **F12** to open DevTools
3. Go to **Console** tab
4. Look for:
   - `📤 Sending POST request to: https://...`
   - Any error messages in red
5. Go to **Network** tab
6. Try uploading files and clicking "Compare Quotes"
7. Look for the `/upload` request:
   - **Method:** Should be `POST` (not GET)
   - **Status:** Should be `200` or `500` (not 404)
   - **URL:** Should match your Railway URL

### Step 4: Check Railway Logs
1. Go to **Railway Dashboard** → Your Project
2. Click **Deployments** → Latest deployment → **View Logs**
3. When you upload files, you should see:
   - `📥 POST /upload` (if request reaches server)
   - `❌ 404: POST /upload` (if routing issue)
   - Any error messages

### Step 5: Common Issues

#### Issue: "Backend not connected yet"
**Solution:** 
- Check `VITE_API_URL` is set in Vercel
- **REDEPLOY** Vercel after adding env var
- Check browser console for the actual API URL being used

#### Issue: 404 on /upload
**Solution:**
- Make sure Railway backend is running (check logs)
- Verify the Railway URL is correct
- Check that frontend is making **POST** request (not GET)

#### Issue: CORS error
**Solution:**
- Backend CORS is configured to allow all origins
- If still getting CORS errors, check Railway logs

#### Issue: "AuthenticationError: 401"
**Solution:**
- OpenAI API key is invalid or missing
- Go to Railway → **Variables** → Check `OPENAI_API_KEY`
- Make sure it starts with `sk-proj-` and is the full key

### Step 6: Test Directly
Open browser console and run:
```javascript
fetch('https://vendorcompare-backend-production.up.railway.app/health')
  .then(r => r.json())
  .then(console.log)
```

Should return: `{status: "ok", message: "Server is running"}`

---

## Quick Checklist:
- [ ] Railway backend is running (check logs)
- [ ] Railway `/health` endpoint works
- [ ] `VITE_API_URL` is set in Vercel
- [ ] Vercel has been **REDEPLOYED** after adding env var
- [ ] Browser console shows correct API URL
- [ ] Network tab shows POST request (not GET)
- [ ] Railway logs show incoming requests
