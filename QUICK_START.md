# Quick Start Guide

Get up and running with Solar Design System in 5 minutes!

## Step 1: Extract Files

Extract the zip file to a folder of your choice.

## Step 2: Install Dependencies

Open your terminal in the project folder and run:

```bash
npm install
```

This will install all required packages (React, Vite, Tailwind CSS, etc.).

## Step 3: Start Development Server

```bash
npm run dev
```

You should see output like:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

## Step 4: View Design System

Open your browser and navigate to:
```
http://localhost:5173
```

You'll see the complete design system showcase with all components and design tokens.

## Step 5: Start Building

### Using Components

All components are showcased in `src/components/DesignSystem.tsx`. You can:

1. **Copy component code** from the showcase
2. **Use Tailwind classes** directly in your components
3. **Reference design tokens** from `tailwind.config.js`

### Example: Create a Button

```tsx
<button className="bg-accent-primary text-black rounded-button px-6 py-2.5 text-sm font-semibold hover:bg-accent-primary-dim transition-colors">
  My Button
</button>
```

### Example: Create a Card

```tsx
<div className="bg-background-cardSurface border border-borders-subtle rounded-card p-6">
  <h3 className="text-lg font-semibold mb-4">Card Title</h3>
  <p className="text-sm text-text-secondary">Card content goes here</p>
</div>
```

## Next Steps

- 📖 Read [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for complete documentation
- 🎨 Check `src/components/DesignSystem.tsx` for all component examples
- 🎯 Review `tailwind.config.js` for all available design tokens

## Building for Production

When you're ready to build:

```bash
npm run build
```

The production files will be in the `dist` folder.

## Troubleshooting

**Port already in use?**
- Vite will automatically try another port
- Check the terminal output for the new port number

**Module errors?**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

**Need help?**
- Check [SETUP.md](./SETUP.md) for detailed setup instructions
- Review [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for complete documentation

---

Happy building! 🚀
