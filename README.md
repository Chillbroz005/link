# Suresh Ganesan — Executive SCM / Procurement Portfolio

A premium, responsive Next.js + TypeScript portfolio built from the supplied resume as the single source of truth.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Resume PDF

Place your final resume PDF at `public/resume.pdf`. The UI already points to `/resume.pdf`. The PDF is intentionally not fabricated or generated from incomplete source data.

## Personal links

Edit `src/data/profile.ts`:
- `linkedin` — supplied URL: https://www.linkedin.com/in/suresh005/
- `github` — supplied URL: https://github.com/Chillbroz005/Backup-data

They are intentionally blank because no actual URLs were supplied.

## Profile photo

The supplied professional portrait is included at `public/profile-photo.png` and is used in the hero.

## Projects / GitHub

A GitHub URL was supplied, but repository/project details were not provided in the resume. The portfolio links to the supplied GitHub URL without inventing repository metadata.

## GitHub Pages / GitHub deployment

For a static GitHub Pages deployment, add `output: "export"` to `next.config.mjs`, then build with `npm run build` and deploy the generated `out/` directory using GitHub Pages (or GitHub Actions).

Example `next.config.mjs`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = { output: "export", images: { unoptimized: true } };
export default nextConfig;
```

## Source-of-truth rule

Do not add personal facts, metrics, project results, certifications, social URLs or repository information unless verified against the resume or a supplied source.


## Exact GitHub Pages deployment

The GitHub link shown on the portfolio is the GitHub URL supplied for this project. It is kept as a contact/social link and is not used as the site branding.

Create this repository:

```text
YOUR-GITHUB-USERNAME.github.io
```

After pushing this project to the repository's `main` branch, GitHub Actions will build the Next.js static export and publish it to:

**https://YOUR-GITHUB-USERNAME.github.io/**

In GitHub, go to **Settings → Pages → Source** and select **GitHub Actions** if it is not already selected. GitHub's Pages documentation confirms that a user site uses the `<username>.github.io` repository naming convention. The included workflow handles the Next.js build and Pages deployment.
