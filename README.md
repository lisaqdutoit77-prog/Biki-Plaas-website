Biki Plaas Gifts and Decor - Vercel-ready project

This is a simple Vite + React starter for Biki Plaas Gifts and Decor (www.bikiplaas.co.za).
It includes sample products and a demo checkout flow (no real payments).

What is included
- src/App.jsx - main app with sample products (easy to edit)
- src/main.jsx - app entry
- index.html - site entry
- package.json - scripts to build/develop
- README.md - this file

How to test locally
1. Make sure Node.js is installed (recommended v18+).
2. In the project folder run:
   npm install
   npm run dev
3. Open http://localhost:5173

Deploy to Vercel
1. Create a Vercel account at https://vercel.com and log in.
2. Create a new project → Import from Git repository (GitHub/GitLab/Bitbucket).
   - To upload from ZIP: unzip locally, create a Git repo, push to GitHub, then import on Vercel.
   - Or connect your GitHub account and push this project to a new repo.
3. For Build Command use: npm run build
   For Output Directory use: dist
4. After deployment, set your domain www.bikiplaas.co.za in the Vercel dashboard and follow the DNS instructions Vercel provides.

Replacing sample products
Open src/App.jsx and edit the SAMPLE_PRODUCTS array near the top. Replace items with your real product names, prices, and image URLs.

Payments (PayFast) - test mode
This project uses a demo checkout flow. For production payments:
1. Create a PayFast account at https://www.payfast.co.za and get Merchant ID, Merchant Key and Passphrase.
2. Do not put secret keys in client-side code. Instead:
   - Create a small server endpoint (Node/Express or serverless function) that builds PayFast parameters and computes the signature server-side.
   - From the frontend send the order to that endpoint; it returns a signed redirect URL or auto-submit form to PayFast.
3. On Vercel, add environment variables for your PayFast credentials in the Project Settings > Environment Variables (e.g., PAYFAST_MERCHANT_ID, PAYFAST_MERCHANT_KEY, PAYFAST_PASSPHRASE).
I can provide a serverless function for PayFast when you are ready.

Contact
Email: bikiplaasklerksdorp@gmail.com
Facebook: https://www.facebook.com/share/1AovqGKJ5z/
