# OpenACR Editor

With this tool, people can generate Accessibility Conformance Report in the [OpenACR](https://github.com/GSA/openacr) format.

## W3C Web Accessibility Initiative (WAI) Reporting Tools

This software includes builds on the work from the WAI's [ATAG Report Tool (ART)](https://github.com/w3c/wai-atag-report-tool) and [WCAG-EM Report Tool](https://github.com/w3c/wai-wcag-em-report-tool/). Copyright © 2021 W3C® (MIT, ERCIM, Keio, Beihang).

[W3C Software notice and license](https://www.w3.org/Consortium/Legal/copyright-software).

## Development

This application is built with [Svelte](https://svelte.dev) and [Vite](https://vitejs.dev). To run it locally, you need to clone this repository, have [Node](https://nodejs.org) installed and then run this in the project's directory:

```bash
npm install
```

This may take a while the first time, but it only needs to be done once.

Then, to build the app with [Rollup](https://rollupjs.org), and serve it on a local dev server, run:

```bash
npm run dev
```

Navigate to [localhost:10001](http://localhost:10001). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

## Deployment

To create an optimised version of the app:

```bash
npm run build
```

### Release to GitHub pages

The site serves what's on GitHub pages. To release to GitHub pages, [create a new release](https://github.com/GSA/openacr-editor/releases/new). This should trigger a [deploy action](https://github.com/GSA/openacr-editor/actions?query=workflow%3ADeploy).

### Base path handling

The app now uses Vite's `BASE_URL` support for the site root and static asset paths.

- JavaScript routing and asset helpers live in `src/lib/base.js` and `src/lib/router.js`
- HTML shell asset paths are based on `%BASE_URL%` in `index.html`
- if you ever need a non-root build path, set `BASE_PATH` before `npm run build`

## Data structure

The editor uses the OpenACR [schema](https://github.com/GSA/openacr/tree/main/schema) and [catalog](https://github.com/GSA/open-product-accessibility-template/tree/main/catalog) as data structures.

## License

By default, this falls under a public domain license. Some libraries included here may include other licenses (see [licenses.txt](license/licenses.txt)). See our [LICENSE.md](LICENSE.md) file for more information.
