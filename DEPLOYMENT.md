# Deployment Guide

## GitHub Pages (Frontend Only - Demo Mode)

1. Go to your repository: https://github.com/Coderdgirl/Bino
2. Click **Settings** → **Pages**
3. Under "Source", select **main** branch and **/docs** folder
4. Click **Save**
5. Your site will be live at: `https://coderdgirl.github.io/Bino/`

Note: GitHub Pages only hosts static files. The demo will use localStorage instead of backend database.

## Full Stack Deployment (Frontend + Backend)

### Option 1: Render.com (Free)

1. Go to https://render.com and sign up
2. Click **New** → **Web Service**
3. Connect your GitHub repository
4. Configure:
   - Name: `bino-backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Click **Create Web Service**
6. Update frontend API URLs to your Render URL

### Option 2: Railway.app (Free)

1. Go to https://railway.app and sign up
2. Click **New Project** → **Deploy from GitHub repo**
3. Select your Bino repository
4. Railway will auto-detect Node.js and deploy
5. Get your deployment URL and update frontend

### Option 3: Vercel (Frontend) + Railway (Backend)

**Frontend on Vercel:**
1. Go to https://vercel.com
2. Import your GitHub repository
3. Deploy

**Backend on Railway:**
1. Follow Railway steps above
2. Update Vercel environment variables with Railway backend URL

## Update API URLs

After deploying backend, update these files with your backend URL:
- `apply.html` - Line with `fetch('http://localhost:3000/api/applications'`
- `admin.html` - All fetch calls

Replace `http://localhost:3000` with your deployed backend URL.
