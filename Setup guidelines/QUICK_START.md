# AntGRP Website v2.1 - Quick Start Guide ⚡

## TL;DR (Too Long; Didn't Read)

All fixes have been applied! Follow these 4 steps to get your site running:

---

## Step 1: Copy the Fixed Project (Windows)

Open **Git Bash** or **Command Prompt** and run:

```bash
cd /e
xcopy antgrp-site-fixed antgrp-v2 /E /I
cd antgrp-v2
```

Or copy manually:
- Source: `/home/claude/antgrp-site` (from this server)
- Destination: `E:\antgrp-v2` (on your computer)

---

## Step 2: Install Dependencies

```bash
npm install
```

**What this does:**
- Downloads all required packages
- Takes ~2-3 minutes first time
- Creates `node_modules` folder

**Expected output:**
```
added 200+ packages in 2m
```

---

## Step 3: Start Development Server

```bash
npm run dev
```

**Expected output:**
```
▲ Next.js 16.2.6 (Turbopack)
- Local:         http://localhost:3000
- Network:       http://192.168.136.1:3000
✓ Ready in 470ms
```

---

## Step 4: Open in Browser

Click this link: **http://localhost:3000**

Or paste in your browser's address bar.

---

## What You'll See

✅ **Homepage with:**
- Navigation bar at top
- Hero section
- Statistics (11+ years, 4+ industries, etc.)
- Capabilities cards (Test Automation, Performance Testing, etc.)
- Sectors section
- Technology Partners
- Company Principles
- Call-to-action section
- Footer

---

## Make Changes

Edit any component file and the site updates automatically!

**Example:** Edit component content:
1. Open: `components/Stats.tsx`
2. Change statistics values
3. Save file
4. Browser refreshes automatically ✨

---

## Stop Development Server

Press **Ctrl + C** in terminal

---

## Build for Production

```bash
npm run build
```

Then run production server:
```bash
npm start
```

---

## Deploy to Vercel

### Option 1: Web Dashboard (Easiest)

1. Go to: https://vercel.com/dashboard
2. Click: "Add New Project"
3. Select: Your GitHub repo (`antgrp-site`)
4. Click: "Deploy"
5. **Done!** Get your live URL

### Option 2: Command Line

```bash
npm install -g vercel
vercel login
vercel --prod
```

---

## Project Files Summary

### What Was Fixed

| File | Status | What It Does |
|------|--------|-------------|
| `lib/clsx.ts` | ✅ Created | CSS class utility |
| `components/Stats.tsx` | ✅ Created | Company statistics |
| `components/Capabilities.tsx` | ✅ Created | Services offered |
| `components/Partners.tsx` | ✅ Created | Technology partners |
| `components/Principles.tsx` | ✅ Created | Company values |
| `components/CTA.tsx` | ✅ Created | Call-to-action section |
| `next.config.ts` | ✅ Updated | Dev configuration |

### Already Working

- ✅ `app/layout.tsx` - Root layout
- ✅ `app/page.tsx` - Homepage
- ✅ All other components
- ✅ All configuration files
- ✅ All pages and routes

---

## Common Commands

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Fix linter issues
npm run lint -- --fix
```

---

## Troubleshooting

### Port 3000 Already in Use

```bash
# Kill the process using port 3000
# Windows (Git Bash):
lsof -ti:3000 | xargs kill -9

# Or use different port:
npm run dev -- -p 3001
# Then open: http://localhost:3001
```

### Module Not Found Error

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Tailwind Styles Not Showing

```bash
# Rebuild
npm run build
npm run dev
```

### npm: command not found

- You need Node.js installed
- Download from: https://nodejs.org
- Choose the Latest LTS version
- Restart terminal after installing

---

## File Locations

```
Windows:
  E:\antgrp-v2\
  ├── components\
  ├── app\
  ├── lib\
  ├── public\
  ├── package.json
  └── next.config.ts

Linux/Mac:
  /home/claude/antgrp-site/
  (Same structure)
```

---

## Customization

### Change Company Name
- Edit: `app/layout.tsx` (title, description)
- Edit: `components/Nav.tsx` (logo, brand)

### Change Colors
- Edit: `tailwind.config.ts`
- Find: `colors: { brand: "#1d4ed8" }`
- Change hex code

### Update Statistics
- Edit: `components/Stats.tsx`
- Change the `stats` array values

### Add New Pages
```bash
# Create new page directory
mkdir app/my-new-page

# Create page file
touch app/my-new-page/page.tsx

# Add content to page.tsx
export default function MyPage() {
  return <div>My content</div>
}
```

---

## Before Deployment

Checklist:
- ✅ Test locally with `npm run dev`
- ✅ Check all pages load
- ✅ Verify images display
- ✅ Test responsive (shrink browser)
- ✅ Check mobile view (F12 → Mobile)
- ✅ No console errors (F12 → Console)
- ✅ Update company info
- ✅ Customize branding

---

## Getting Help

### Documentation Files
- 📖 `FIXES_APPLIED.md` - What was fixed
- 📖 `VERCEL_DEPLOYMENT_GUIDE.md` - How to deploy
- 📖 `COMPLETE_SUMMARY.md` - Full details

### External Resources
- Next.js Docs: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- React Docs: https://react.dev

### Need More Help?
1. Check documentation files (above)
2. Search error message online
3. Check Next.js GitHub discussions

---

## Success Indicators

✅ **You're good to go when:**

- `npm install` completes without errors
- `npm run dev` shows "Ready in XXXms"
- Browser loads http://localhost:3000
- You see the full homepage
- No red errors in browser console (F12)

---

## Next Steps After Getting It Running

1. **Customize Content**
   - Update company info in components
   - Add real images
   - Change colors and branding

2. **Test Thoroughly**
   - Test on mobile devices
   - Test all links work
   - Check contact form (needs setup)

3. **Deploy to Vercel**
   - Follow `VERCEL_DEPLOYMENT_GUIDE.md`
   - Get free SSL certificate
   - Get free CDN

4. **Monitor & Iterate**
   - Use Vercel Analytics
   - Gather user feedback
   - Make improvements

---

## Key Takeaways

| What | Where | How |
|------|-------|-----|
| **Run locally** | Terminal | `npm run dev` |
| **Build** | Terminal | `npm run build` |
| **Edit components** | VS Code | Double-click files |
| **See changes** | Browser | Saves auto-reload |
| **Deploy** | Vercel | Connect GitHub repo |

---

## You're All Set! 🎉

Everything is working. Just follow the 4 steps above and you'll have your site running in minutes!

**Questions?** Check the detailed docs or reach out for help.

**Ready?** Let's go! 🚀

```bash
npm install
npm run dev
# Open http://localhost:3000
```

---

**Enjoy building with Next.js! ✨**
