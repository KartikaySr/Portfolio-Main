# Kartikay Srivastava — The Engineering Cut

A cinematic, recruiter-friendly portfolio for **Kartikay Srivastava**, a Computer Science undergraduate specializing in AI & ML. The site presents selected engineering work as concise case studies, with supporting architecture, contributions, project status, and evidence.

## Run locally

Requires Node.js 18 or newer.

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

## AI navigator and résumé analyzer

The portfolio includes an AI guide that can answer questions from the published portfolio content, navigate to sections, and read responses aloud. Speech input uses the browser's speech-recognition API where supported. The résumé analyzer extracts selectable text in the browser, uses Hugging Face OCR for scanned PDFs (up to eight pages), and sends extracted text to Groq for review. It temporarily uploads the PDF to a private Supabase Storage bucket during processing, then deletes it; the report is returned to the browser and is not stored. Provider data handling applies to text submitted for OCR/review.

The AI endpoints are Vercel serverless functions in `api/` and use the server-only `GROQ_API_KEY` environment variable. Copy `.env.example` to `.env.local` and add your keys; `.env.local` is gitignored. Add production values in the Vercel project's environment settings. Never use a `VITE_` prefix or put server credentials in client-side code.

`HF_TOKEN`, `HF_OCR_MODEL`, `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `SUPABASE_RESUME_BUCKET` configure OCR and temporary private résumé storage. The server creates the bucket as private if it does not exist and rejects a public bucket. The Supabase service-role key and Hugging Face token must remain server-only; never prefix them with `VITE_` or expose them to browser code. Add the same server-side values in Vercel production settings. Uploads are deleted as soon as processing finishes; if a browser/network interruption prevents cleanup, an object may need manual deletion from the private bucket.

For local end-to-end Groq API testing, use the Vercel CLI with a linked project and `.env.local`, then run `npx vercel dev`. Plain `npm run dev` starts only the Vite frontend, so the AI endpoints are unavailable in that mode.

The analyzer sends résumé text to the configured AI provider for processing. Its data handling is subject to that provider's policy. The public endpoints should be protected with platform-level rate limiting before launch.

Build and preview the static site:

```bash
npm run build
npm run preview
```

The production build is written to `dist/`.

## Portfolio content

The shared portfolio content lives in [`src/data/portfolio.ts`](src/data/portfolio.ts):

- Profile, email, social links, and résumé path
- Education and internships
- Five project case studies with source/demo links and maturity labels
- Skills, experience, recognition, and credentials with issuing organizations and verification links
- Recruiter, engineering, and project-tour viewing orders

The featured résumé is the October 7, 2026 SDE résumé at `public/assets/Kartikay_Srivastava_SDE_Resume.pdf`. Replace that PDF and update the structured résumé data together when the résumé changes.

## Portrait and social preview

The transparent master portrait is `public/assets/kartikay-portrait.png`. Optimized responsive WebP portraits and the social share image are generated from it with:

```bash
npm run images
```

The original portrait background was removed locally with Apple Vision. To use another portrait, replace the master with a transparent PNG, keeping the subject framing consistent, then regenerate the derivatives.

## Project source notes

The supplied project architecture documents in [`Portfolio_Main_Zip/docs/`](Portfolio_Main_Zip/docs/) informed the case studies for CodeAmbers, AetherQ, GridForge-AI, Nexus Fraud Intelligence, and MindineersOS. The October 7 SDE résumé is the primary source for the profile, experience, and reported evaluation figures.

Project status is stated explicitly: GridForge-AI is a synthetic simulation, Nexus is a research prototype, and the other systems are described as prototypes/platforms rather than production services. Reported test or model-evaluation figures are attributed to their documentation or résumé; aspirational production targets are not presented as verified results.

`Portfolio_Main_Zip/` is source/reference material, not part of the Vite deployment. Do not publish or commit its environment files or credentials.

## Stack

React 18 · TypeScript · Vite 6 · Tailwind CSS 4 · Framer Motion · Lenis · PDF.js · Sharp

## Accessibility and performance

- Reduced-motion preferences are respected.
- Motion and custom cursor effects are disabled or reduced where appropriate.
- Keyboard navigation includes the `⌘K` / `Ctrl+K` quick-jump palette, arrow-key selection, and Escape-to-close behavior.
- Project case studies include horizontally scrollable, numbered architecture flows that remain usable on touch screens.
- Portraits are served as responsive WebP assets.
- The project and résumé overlays are loaded on demand.
