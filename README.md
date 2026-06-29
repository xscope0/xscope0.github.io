# xscope0 — docs site

- **xScope0 Router** — AI API proxy router with provider automation
- **Ghostbox** — disposable email with OTP extraction
- **MuffinStoreJailed** — on-device iOS app downgrader

No frameworks, no Node, no build step. Just HTML, CSS and a tiny vanilla JS file.

## Files

```
index.html            # Landing page (project list)
xscope0-router.html   # Router docs
ghostbox.html         # Ghostbox docs
muffinstore.html      # MuffinStoreJailed docs
assets/style.css      # All styling
assets/main.js        # Copy buttons, scroll-spy, reveal-on-scroll
.nojekyll             # Disable Jekyll on GitHub Pages
robots.txt
```

## Deploy to GitHub Pages

1. Create a repo named `your-username.github.io` (or any repo).
2. Copy every file in this folder to the repo root, keeping the `assets/` folder intact.
3. Commit and push:
   ```bash
   git add .
   git commit -m "docs site"
   git push
   ```
4. In the repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   pick `main` and `/ (root)`, save.
5. Your site is live at `https://your-username.github.io/`.

To test locally, just open `index.html` in a browser — no server needed.

## Editing

- All copy lives directly in the HTML files.
- Colors and fonts are CSS variables at the top of `assets/style.css`.
- Add a new project: copy one of the `*.html` docs pages, edit the content,
  and add a `<a class="card">` block in `index.html`.
