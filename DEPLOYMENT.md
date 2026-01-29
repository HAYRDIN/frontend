# Deploy to Render - Step by Step Guide

## Prerequisites
✅ You've already uploaded your code to GitHub: https://github.com/HAYRDIN/frontend.git

## Deployment Steps

### 1. Create Render Account
1. Go to [https://render.com](https://render.com)
2. Click **"Get Started for Free"**
3. Sign up with GitHub (recommended) or email

### 2. Connect Your GitHub Repository
1. After signing in, click **"New +"** button (top right)
2. Select **"Web Service"**
3. Click **"Connect account"** under GitHub
4. Authorize Render to access your GitHub
5. Find and select your repository: **`HAYRDIN/frontend`**
6. Click **"Connect"**

### 3. Configure Your Web Service
Fill in the following settings:

| Field | Value |
|-------|-------|
| **Name** | `ecwc-rh-system` (or any name you prefer) |
| **Region** | Choose closest to you (e.g., `Oregon (US West)`) |
| **Branch** | `main` (or `master` - your default branch) |
| **Root Directory** | Leave empty |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Plan** | `Free` |

### 4. Deploy!
1. Click **"Create Web Service"** button at the bottom
2. Render will start building and deploying your app
3. Wait 2-5 minutes for the deployment to complete
4. You'll see logs in real-time

### 5. Get Your Live URL
Once deployed, you'll see:
- ✅ **"Live"** status badge (green)
- 🌐 **Your live URL** at the top (e.g., `https://ecwc-rh-system.onrender.com`)

Click the URL to access your application!

## Default Login Credentials

| Role | Username | Password |
|------|----------|----------|
| Presenter | `presenter1` | `presenter123` |
| Reviewer | `reviewer` | `reviewer123` |
| Finance | `finance` | `finance123` |
| HR | `hr` | `hr123` |
| Store Man | `storeman` | `store123` |
| Viewer | `viewer` | `viewer123` |

## Important Notes

> ⚠️ **Database Resets**: On Render's free tier, the SQLite database will reset when the app restarts (after 15 minutes of inactivity). All submissions will be lost.

> 💡 **Solution**: For production, upgrade to a paid plan with persistent disk or migrate to PostgreSQL.

> 🔄 **Auto-Deploy**: Every time you push to GitHub, Render will automatically redeploy your app!

## Troubleshooting

### If deployment fails:
1. Check the **Logs** tab in Render dashboard
2. Look for error messages (usually red text)
3. Common issues:
   - Missing dependencies: Make sure all packages are in `package.json`
   - Port issues: App should use `process.env.PORT` ✅ (already configured)

### If the app loads but doesn't work:
1. Open browser DevTools (F12)
2. Check Console for errors
3. Check Network tab for failed API calls

## Need Help?
- Render Docs: https://render.com/docs
- Check deployment logs in Render dashboard

---

🎉 **That's it! Your app is now live and accessible from anywhere!**
