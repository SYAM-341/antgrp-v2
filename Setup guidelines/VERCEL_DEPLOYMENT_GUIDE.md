# Deploy AntGRP Website to Vercel

## Prerequisites

- ✅ Fixed project files (all components created)
- ✅ GitHub account
- ✅ Vercel account (free at vercel.com)

---

## Step 1: Push to GitHub

### 1a. Initialize Git (if not already done)

```bash
cd /e/antgrp-v2-fixed
git init
git add .
git commit -m "Initial commit: AntGRP website v2.1 with all fixes"
```

### 1b. Add GitHub Remote

Replace `YOUR-USERNAME` with your actual GitHub username:

```bash
git remote add origin https://github.com/YOUR-USERNAME/antgrp-site.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy to Vercel

### Option A: Use Vercel Web Dashboard (Easiest)

1. **Go to Vercel Dashboard**
   - URL: https://vercel.com/dashboard

2. **Click "Add New Project"**
   - Select "Import Git Repository"
   - Search for `antgrp-site` and select it
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `npm run build` (auto-filled)
   - **Install Command**: `npm install` (auto-filled)
   - **Output Directory**: `.next` (auto-filled)
   - Click **"Deploy"**

4. **Wait for Deployment**
   - Vercel will automatically build and deploy
   - You'll see a live URL like: `antgrp-site.vercel.app`

### Option B: Use Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production
vercel --prod
```

---

## Step 3: Configure Custom Domain (Optional)

### Add Your Domain in Vercel

1. Go to **Project Settings** → **Domains**
2. Enter your domain (e.g., `antgrp.com`)
3. Follow DNS configuration instructions
4. Wait for DNS propagation (can take 24-48 hours)

### DNS Configuration Example

If using namecheap/GoDaddy:
- Point nameservers to: `ns1.vercel.com`, `ns2.vercel.com`
- Or add CNAME record pointing to your Vercel URL

---

## Step 4: Set Up Environment Variables (Optional)

If you need environment variables:

1. **Locally**: Create `.env.local` file
2. **Production**: Add in Vercel Dashboard → Settings → Environment Variables

Example:
```
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=your-database-url
```

---

## Step 5: Enable Auto-Deploy on Push

Vercel automatically deploys when you push to your connected branch:

```bash
# Make changes locally
git add .
git commit -m "Update content"
git push origin main

# Vercel automatically builds and deploys!
```

---

## Verification Checklist

After deployment, verify everything works:

- ✅ Website loads at your Vercel URL
- ✅ All pages load (home, about, contact, etc.)
- ✅ Navigation works properly
- ✅ Images load correctly
- ✅ Styling looks good (Tailwind CSS applied)
- ✅ Responsive design works on mobile
- ✅ No console errors (F12 → Console tab)
- ✅ Meta tags are correct (view page source)

---

## Troubleshooting

### Build Fails
**Check these common issues:**
- Node.js version too old (need 18+)
- Missing dependencies in `package.json`
- TypeScript errors in components

**View full logs:**
- Go to Vercel Dashboard → Deployments → Failed deploy → View Logs

### Website Shows 404
- Ensure you deployed the right branch (`main`)
- Check that all page routes exist in `/app`
- Verify `next.config.ts` is properly configured

### Images Don't Load
- Check image paths use `/public/` prefix
- Verify images exist in public folder
- Use Next.js `Image` component: `import Image from "next/image"`

### Slow Performance
- Use Vercel's Analytics to identify bottlenecks
- Enable image optimization in Next.js
- Consider using CDN for large assets

---

## Post-Deployment Steps

### 1. Set Up Monitoring
- Enable **Analytics** in Vercel dashboard
- Set up **Error Tracking** for production errors
- Configure **Alerts** for deployment failures

### 2. Configure Analytics
- Install Google Analytics or similar
- Track user behavior and conversions
- Monitor page performance

### 3. Set Up SSL Certificate
- Vercel automatically provides free SSL
- Verify HTTPS is enabled
- Check certificate in browser security info

### 4. Configure Redirects (if migrating from old site)

Add to `vercel.json`:
```json
{
  "redirects": [
    {
      "source": "/old-page",
      "destination": "/new-page",
      "permanent": true
    }
  ]
}
```

### 5. Set Up Backups
- Enable GitHub branch protection
- Require PR reviews before merging to main
- Keep deployment history for rollbacks

---

## Update Your Local Project

After everything is deployed, update your local repo:

```bash
# Ensure all changes are committed
git status

# Pull latest from GitHub (if updated elsewhere)
git pull origin main

# Keep local and remote in sync
git push origin main
```

---

## Rollback if Issues Occur

If something goes wrong after deployment:

1. **Quick Rollback in Vercel Dashboard**
   - Go to Deployments
   - Click on previous working deployment
   - Click "Redeploy"

2. **Rollback in Git**
   ```bash
   git revert HEAD
   git push origin main
   # Vercel will auto-deploy the previous working version
   ```

---

## Success! 🎉

Your AntGRP website is now live on Vercel!

**Next Steps:**
- Add actual content to components
- Customize colors and branding
- Add your company information
- Set up contact form backend
- Monitor performance and analytics

**Need help?**
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Tailwind Docs: https://tailwindcss.com/docs

---

## Useful Vercel Commands

```bash
# View current deployment
vercel env ls

# Check project settings
vercel project ls

# View logs for failed deployment
vercel logs [deployment-id]

# Pull environment variables
vercel env pull

# Delete deployment
vercel remove [deployment-url]
```

---

**Deployment Complete! Your site is live.** ✨
