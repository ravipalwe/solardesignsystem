# Setup Instructions

## Step 1: Install Node.js

Choose one of these methods:

### Method A: Direct Download (Easiest)
1. Visit https://nodejs.org/
2. Download the LTS version for macOS
3. Run the installer
4. Restart your terminal

### Method B: Using Homebrew
1. Install Homebrew (if not installed):
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
2. Install Node.js:
   ```bash
   brew install node
   ```

## Step 2: Verify Installation

After installing Node.js, verify it works:
```bash
node --version
npm --version
```

You should see version numbers (e.g., v18.x.x and 9.x.x)

## Step 3: Install Dependencies

Navigate to this directory and run:
```bash
npm install
```

This will install all required packages (React, Vite, Tailwind, etc.)

## Step 4: Start the Development Server

```bash
npm run dev
```

You should see output like:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

## Step 5: Open in Browser

Open http://localhost:5173/ in your browser.

---

## Troubleshooting

**If you see "connection refused":**
- Make sure the dev server is running (`npm run dev`)
- Check that Node.js is installed (`node --version`)
- Make sure dependencies are installed (`npm install`)

**If port 5173 is busy:**
- Vite will automatically try another port (check the terminal output)
- Or kill the process: `lsof -ti:5173 | xargs kill`

**If you see module errors:**
- Delete `node_modules` folder and `package-lock.json`
- Run `npm install` again

