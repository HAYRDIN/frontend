# Quick Commands to Push to GitHub and Deploy

## Step 1: Push Your Changes to GitHub

Open Command Prompt in your project folder and run these commands:

```bash
# Navigate to your project (if not already there)
cd c:\Users\user\OneDrive\Desktop\frontend

# Check current status
git status

# Add all new files
git add .

# Commit the changes
git commit -m "Prepare for Render deployment - Add deployment configs"

# Push to GitHub
git push origin main
```

**Note**: If your default branch is `master` instead of `main`, use `git push origin master`

---

## Step 2: Deploy on Render (5 Minutes)

### Option A: Automatic Deployment (Recommended)
1. Go to [https://render.com](https://render.com)
2. Sign in with GitHub
3. Click **"New +"** → **"Web Service"**
4. Select repository: **`HAYRDIN/frontend`**
5. Click **"Connect"**
6. Click **"Create Web Service"** (settings auto-filled from `render.yaml`)
7. Wait 2-5 minutes ⏳
8. Get your live URL! 🎉

### Option B: Manual Configuration
If automatic doesn't work, configure manually:

**Settings to fill:**
- Name: `ecwc-rh-system`
- Branch: `main`
- Build Command: `npm install`
- Start Command: `npm start`
- Plan: Free

---

## ✅ After Deployment

Your app will be live at: `https://your-app-name.onrender.com`

**Test it:**
1. Open the URL
2. Login with: `username: finance` / `password: finance123`
3. Create an Overtime Control form
4. Test calculations

---

## 🔄 Future Updates

Every time you push to GitHub, Render will automatically redeploy!

```bash
# Make changes to your code
# Then push:
git add .
git commit -m "Your change description"
git push origin main
```

Render detects the push and redeploys automatically! 🚀
