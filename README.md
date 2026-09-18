# Shree Ram Rice Mill

A static, bilingual (English/Nepali) website for Shree Ram Rice Mill.
Live website: https://www.shreeramricemill.com.np/

## File guide

- `index.html`: page structure, text, links and the roti section template.
- `styles.css`: colours, layouts, responsive rules and CSS animations. Numbered comments describe each section. Keep the rule order because later rules refine earlier styles.
- `script.js`: language switching, animation controls, section initialization and the canvas rice animation. Its five initialization blocks run in order.
- `assets/images/`: original WebP artwork, extracted from the embedded image data without changing the image bytes.
- `CNAME`: the custom domain used by GitHub Pages.

## Preview locally

Open `index.html` using VS Code's Live Server extension, or run this command from the repository folder:

```sh
python -m http.server 8000
```

Then visit http://localhost:8000. No build step or package installation is required. Google Fonts and Lucide icons load from external services.

## Common edits

- **Text:** most text lives in `index.html`. Update both `data-en` and `data-ne` translations as well as the initial visible text. Some final hero/rice text and section numbers are set in blocks 2 and 3 of `script.js`; edit those values there.
- **Contact details:** search `index.html` for the current phone number, address or opening hours. Update both link destinations and displayed text when needed.
- **Colours and spacing:** edit the corresponding section in `styles.css`. More specific selectors and later rules may override earlier declarations.
- **Images:** replace the matching file in `assets/images/`, or update its path in `index.html` / `script.js`.
- **Animations:** CSS keyframes live in `styles.css`; the falling rice canvas lives in block 4 of `script.js`. Keep the pause control and reduced-motion checks working when changing effects.

Publish the whole folder structure together: the page needs its CSS, JavaScript and images beside it. GitHub Pages serves these files directly; publishing timing depends on the repository's Pages deployment.
