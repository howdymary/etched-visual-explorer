# Inside an inference chip

[Open the visual explorer](https://howdymary.github.io/etched-visual-explorer/) · [Source repository](https://github.com/howdymary/etched-visual-explorer)

A full-screen interactive visualization following an inference chip from a server rack into architecture, microarchitecture, design verification, and physical design, then back to the finished system. Scroll or use the chapter navigation to move through the views. Hover over a component for a short explanation, or click, tap, or use the keyboard to open its details.

The experience uses concise on-screen captions and component explanations. The implementation uses local SVG illustrations, CSS, and native JavaScript modules, with no runtime packages, external fonts, backend, or credentials.

## Preview locally

For a quick look, open **`preview.html`** in a browser. This generated file contains the complete visualization and needs no local server. Regenerate it after source changes:

```sh
node scripts/standalone.mjs
```

For development, use Python 3 to serve the source directory:

```sh
python3 -m http.server 4173
```

Open <http://localhost:4173>. Native JavaScript modules need an HTTP server when loading `index.html`. Use another port if a server is already running.

Node.js 20 or later is required for the build and integrity checks. No dependency installation is required.

## Build the publishable site

```sh
node scripts/check.mjs
node scripts/build.mjs
node scripts/check.mjs --dist
```

The build copies `index.html`, `styles.css`, `src/`, and optional local assets into `dist/`, then adds `.nojekyll`. It preserves the source files byte for byte. Documents, source notes, the README, and the standalone preview are excluded from the deployment artifact.

Checks validate local asset and module paths, chapter and component references, and the deployment artifact. They reject root-relative asset URLs and external runtime dependencies so the site can work at both an account domain and a repository subpath.

To preview the exact deployment artifact:

```sh
cd dist
python3 -m http.server 4173
```

Equivalent `npm run dev`, `npm run build`, and `npm run check` shortcuts are included; `npm install` is unnecessary.

## Publish on GitHub Pages

The included workflow builds and deploys `main` to GitHub Pages. This repository uses GitHub Actions as its Pages source. To publish a fork:

1. Place the **contents of this project directory** at your repository root, including the hidden `.github/` directory. The workflow expects `index.html`, `package.json`, and `scripts/` at the repository root.
2. Use `main` as the publishing branch, or change the branch in `.github/workflows/deploy-pages.yml` to match your repository.
3. In **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source.
4. Push the files to `main`, or run **Actions → Deploy interactive story to GitHub Pages → Run workflow** after enabling Pages.
5. Use the URL shown by the deployment step or **Settings → Pages**. A project repository normally uses `https://OWNER.github.io/REPOSITORY/`.

The workflow checks and builds the site, uploads only `dist/`, and deploys through the `github-pages` environment. It uses the repository's standard workflow token and GitHub's official Pages actions. Repository or organization deployment rules may require an administrator's action.

Keep `.github/` in the source upload. The workflow generates `dist/` on each run, so committing the build directory is unnecessary.

## Edit the visualization

| File | Purpose |
| --- | --- |
| `index.html` | Page shell, metadata, controls, and accessible structure. |
| `styles.css` | Full-screen layout, chapter navigation, typography, responsive behavior, and motion preferences. |
| `src/content.js` | Short chapter captions and component explanations. |
| `src/scene.js` | Conceptual SVG scenes and component regions. |
| `src/scene.css` | Diagram styling and animation. |
| `src/app.js` | Scroll transitions, navigation, and component interactions. |
| `scripts/build.mjs` | Dependency-free build of the visual-only site. |
| `scripts/check.mjs` | Source and deployment integrity checks. |
| `scripts/standalone.mjs` | Generates the self-contained `preview.html`. |
| `.github/workflows/deploy-pages.yml` | GitHub Pages build and deployment. |

Keep chapter IDs stable so existing fragment links continue to work. Chapter component IDs must exist in the component map, and each component's `chapter` index must refer to a valid chapter. Keep internal URLs relative, such as `./styles.css` and `./src/app.js`.

For content changes, run the integrity checks and review the affected views in a browser. For layout or interaction changes, also inspect a narrow screen, keyboard controls, reduced-motion preferences, and the complete scroll sequence. Details must remain available through click, tap, and keyboard, independent of hover.

## Scope of the diagrams

All chip and rack illustrations are conceptual. They do not reproduce an Etched floorplan, final package, rack configuration, or benchmark. Values and animation timings are illustrative. Company-specific claims and branding need Etched's review before an official release.

The site illustrates engineering relationships. Primary references are available through the Sources control. Local editorial records under `docs/` are excluded from Git and the published artifact.
