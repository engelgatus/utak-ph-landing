# Utak POS - Vibecoder Application

> **Mission Status:** APPLICATION_READY  
> **Target:** Remote Vibecoder @ Utak POS  
> **Operator:** Engel Gatus

A high-performance, terminal-aesthetic landing page built to demonstrate modern frontend architecture, motion design, and clean code principles.

## Tech Stack

- **Core:** Next.js 14 (App Router), TypeScript, React
- **Styling:** Tailwind CSS, Lucide React
- **Motion:** Framer Motion (Orchestration), Three.js (WebGL Backgrounds)
- **Typography:** JetBrains Mono

## Quick Start

### 1. Initialize System
```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/utak-ph-landing.git

# Enter directory
cd utak-ph-landing

# Install dependencies
npm install
2. Run Diagnostics (Dev Mode)
bash
npm run dev
System available at: http://localhost:3000

3. Build for Production
bash
npm run build

```

📂 Project Architecture

```bash
text
├── app/
│   ├── layout.tsx       # Root layout with JetBrains Mono injection
│   └── page.tsx         # Main entry point
├── components/
│   ├── landing/         # Core UI sections (Hero, Terminal Interface)
│   └── background/      # Three.js / WebGL modules
└── public/              # Static assets
```

🛠 Deployment Status
This unit is configured for static export and deployed via GitHub Pages.

Live Demo: (Website)[https://engelgatus.github.io/utak-ph-landing/]

© 2026 Engel Gatus | Logic over Hype.