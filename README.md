# Miyagi — Speaker & Events (React + Vite, frontend demo)

## Run
```
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview
```

## Deploy (static site)
Build output is the `dist/` folder. The app uses hash routing (`/#/events`), so no rewrite rules are needed on any host.

1. Push to GitHub: `git init && git add . && git commit -m "Miyagi website" && git branch -M main && git remote add origin <your-repo-url> && git push -u origin main`
2. **Render** (Static Site): New → Static Site → connect the repo → Build Command `npm install && npm run build` → Publish Directory `dist`. (`render.yaml` is included.)
   **Netlify / Vercel:** Build command `npm run build`, output directory `dist`.
   **GitHub Pages:** `npm run build`, then publish the `dist/` folder (relative asset paths are already configured).
3. Node 18+ is required.

## Admin
Open `/#/admin` — demo login `admin@miyagi.demo` / `miyagi123`.
Frontend-only demo session, NOT secure authentication.

## Structure
- `src/data/seed.js` sample events and posts · `store.js` localStorage + `useData` hook · `programs.js` program data
- `src/components/` Scene (illustrated artwork), Bokeh (canvas particles), Footer, shared UI and forms
- `src/pages/` Home, PublicPages (About, Team, Programs, Events, Blog, Contact...), Admin
- `src/layouts/PublicLayout.jsx` public header/footer shell
- `src/App.jsx` hash router · `src/styles/main.css` all styles

## Notes
- Routing uses a small hash router (`#/events/e1`), so it works on any static host.
- Data lives in localStorage; clear site data to reset the sample content.
- Payments are simulated; no real money is charged. All people, testimonials and events are fictional.
- Images are illustrated SVG scenes. To use photos, paste URLs into the poster/image fields in admin or edit `src/data/seed.js`.

## Brand & assets (client-supplied)
- Colours: amber `#FBB03B`, black `#000`, white `#FFF` (no other brand colours). Fonts: Poppins (headings), Roboto (body).
- Files live in `public/assets/` (stable paths, safe for saved localStorage data):
  `miyagi-logo.png` (navbar, footer, admin), `miyagi-mark.png` (About / intro), `speaker-hero.jpg` (hero, youth event, Confidence Building),
  `miyagi-music.mp3` (byte-identical to the supplied "Miyagi Music File").
- Music: optional control (bottom-left). Never autoplays; play/pause + mute appear after you press play. One audio element, public site only.
- Not supplied yet: `Miyagi Logo Vector.svg` — drop it in `public/assets/` and swap the `src` in `src/components/Brand.jsx` for a sharper logo.

## Image mapping (client-generated posters in `public/assets/`)
Defined in one place: `src/data/media.js` (exact, case-sensitive filenames). Applied to seed data and migrated into
already-saved localStorage data only where an image is empty (admin-set image URLs are never overwritten).
- Blog: p1 → why_confidence_built_not_born · p2 → listening_is_leadership_skills · p3 → structured_talk · p4 → career_readiness_start_in_college
- Events: e1 The_quit_conference_submit · e3 leadder_who_listen · e4 masterclass · e5 rise_together_anual_talk · e6 campus_voice_tour_pune · e7 rise_and_lead__2_ · e8 corporate_leader_seminar · e9 personal_growth_weekend · e10 voice_and_persence · e11 youth_leadership_submit · e12 speak_with_confidence · e13 corporate_communication_seminar · e14 campus_ignite_jaipur (e2 keeps the supplied student photo)
- Programs: public_speaking · debate · leadership · communication_skill · Personality_Development · career_readiness · goal_setting (Confidence Building keeps the student photo)
- Unused: `quit_conference_submit.jpeg` ("Quiet Conference Summit", no matching event) and `listening_is_the_first_step.jpeg` (duplicate topic of the Listening article).

## Team photos
Seven supplied portraits are in `public/assets/team-1.jpg` … `team-7.jpg` (cropped 4:5). Team page: 3 core team + 4 guest speakers, one photo each (no repeats needed). To add more people, edit `CORE` / `SP` in `src/pages/PublicPages.jsx`; reuse a photo by repeating its filename.

## Design notes
Plain white / black / amber theme, Poppins + Roboto. Motion is limited to a short entrance fade, scroll fade-in, hover lift/image zoom, nav underline and modal/toast transitions (all disabled with `prefers-reduced-motion`).

---

## Redesign notes

- **Hero:** `src/components/HeroStage.jsx` is the generated speaker animation (`public/assets/miyagi-speech-video.html`) ported into the app as an inline SVG layer. It is not rendered on screens 900px or narrower, with `prefers-reduced-motion`, or with data-saver on. "Watch the speaker film" opens the untouched original file in a modal.
- **Page headers:** `src/components/PageLoop.jsx` is the generated "Aurora Network" loop (`public/assets/miyagi-background-loop.html`), used behind the black header band on About, Team, Programs, Corporate, Events, Blog and Contact. Colours were mapped to brand black and amber.
- **Team page:** portraits (white backgrounds) are multiplied onto amber with CSS `mix-blend-mode`; guest speakers use an interactive roster.
- **Images:** photographic reveals use the `.img-rv` class, observed in `src/App.jsx` together with `.rv`.
- Both original generated HTML files are kept unchanged in `public/assets/` for reference.

## Deploy to Render (Static Site)

1. Push this folder to a GitHub repository (the files in this zip go at the repository root).
2. In Render choose **New → Static Site** (or **Blueprint** to use `render.yaml`) and connect the repository.
3. Build command: `npm install && npm run build`. Publish directory: `dist`.
4. The site uses hash routing, so no rewrite rules are needed.
