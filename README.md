# Swifcon Website – HTML to React Migration

This project is a migration of the Swifcon static HTML website into a modern **React + TypeScript + Vite** application. The original HTML assets and visual references are retained in the `public` folder for design accuracy and comparison.

---

## 📁 Project Structure

├── public/
│ ├── html - Code/ # Original HTML/CSS/JS files
│ ├── Swifcon-Landing Page.jpg # Visual design reference (screenshot)
│ ├── Swifcon_Website_Screen_Recording.mp4 # Screen recording showing transitions/animations
│ └── vite.svg # Default Vite logo
│
├── src/
│ ├── assets/ # Images, icons, fonts (if any)
│ ├── components/ # React components
│ │ ├── Contact/
│ │ ├── Footer/
│ │ ├── Header/
│ │ ├── Hero/
│ │ └── MainContent/
│ ├── App.tsx # Root component
│ ├── App.css # App-level global styles
│ ├── index.css # Global stylesheet (optional)
│ └── main.tsx # Entry point
│
├── index.html # Vite entry HTML
├── README.md # Project documentation
├── package.json # NPM scripts and dependencies
├── tsconfig.*.json # TypeScript configurations
├── vite.config.ts # Vite build config
└── .gitignore # Git exclusions


---

## ✅ Migration Goals

The original static HTML was migrated to a modular, reusable, and maintainable React + TypeScript codebase. The goals were:

1. **Exact Design Match**:  
   - Structure, layout, colors, spacing, and typography were preserved.
   - Rebuilt using React components matching the original HTML.

2. **Component Breakdown**:  
   - HTML sections split into reusable components: `Header`, `Hero`, `MainContent`, `Contact`, `Footer`.

3. **Styling**:  
   - CSS Modules used to isolate and reuse styles.
   - Original styles from `/public/html - Code/` were adapted where needed.

4. **Assets & Behavior**:  
   - Assets (images, fonts, icons) reused directly.
   - Transitions/animations reviewed from the video and replicated in React.

5. **Preserved Legacy for Reference**:  
   - HTML, design image, and video are preserved in the `public/` folder for future comparisons or reference.

---

## 🔁 Future Development Notes

- **Do not edit** files inside `/public/html - Code/`. These are read-only reference assets.
- Always **refer to `README.md`** before making changes to ensure consistency with the original design.
- For design tweaks or animation logic:
  - First refer to `Swifcon-Landing Page.jpg` and `Swifcon_Website_Screen_Recording.mp4`.
  - Match the styling and interactions in new or updated components.

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run the dev server
npm run dev

# Build for production
npm run build