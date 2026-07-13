# Kuber Finserve — React SPA

Modern, premium financial services website built with React, TypeScript, Vite, and Tailwind CSS.

## Tech Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- React Router 7
- Framer Motion
- Lucide React
- Swiper.js
- React Hook Form

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Build

```bash
npm run build
npm run preview
```

## Pages

| Route | Page |
|-------|------|
| `/` | Home (all landing sections) |
| `/about` | About Us |
| `/services` | Loan services |
| `/emi-calculator` | EMI Calculator |
| `/contact` | Contact |
| `/apply-loan` | Loan application form |
| `/privacy-policy` | Privacy Policy |
| `/terms` | Terms & Conditions |

## Brand Colors

- Primary Blue: `#0B3D91`
- Secondary Green: `#2BAE66`
- Background: `#F5F9FF`
- Dark Text: `#1B1B1B`

## Project Structure

```
src/
├── components/   # UI, layout, home sections, EMI widget
├── pages/        # Route pages
├── layouts/      # MainLayout
├── hooks/        # Dark mode, EMI, counters
├── utils/        # EMI math, formatting
├── data/         # Static content
└── assets/       # Local assets (placeholders)
```

## Features

- Sticky navbar with mobile menu
- Dark mode toggle
- Interactive EMI calculator
- Partner bank marquee
- Testimonials carousel
- WhatsApp & scroll-to-top buttons
- Sticky mobile Apply CTA
- Lazy-loaded images
- SEO meta tags per page
