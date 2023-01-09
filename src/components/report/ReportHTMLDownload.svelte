<script>
  import { onMount } from "svelte";
  import { evaluation } from "../../stores/evaluation.js";

  import ReportHeader from "./ReportHeader.svelte";
  import ReportSummary from "./ReportSummary.svelte";
  import ReportChapters from "./ReportChapters.svelte";
  import ReportLicense from "./ReportLicense.svelte";
  import { cleanUp } from "../../utils/cleanUpReportHTML.js";
  import { createHTMLDownload } from "../../utils/createHTMLDownload.js";
  import { validate } from "../../utils/validate.js";
  import { reportFilename } from "../../utils/reportFilename.js";
  import { getCatalog } from "../../utils/getCatalogs.js";

  var title = $evaluation.title;
  const filename = reportFilename($evaluation);
  const valid = validate($evaluation);
  let catalog = getCatalog($evaluation.catalog);
  let htmlDownload, htmlDownloadTemplate;

  let download = true;

  onMount(() => {
    const htmlBlob = createHTMLDownload(htmlDownloadTemplate, title, "en");
    htmlDownload = URL.createObjectURL(htmlBlob);
  });
</script>

{#if valid.result }
  <a href={htmlDownload} download="{filename}.html" class="button">
    Download Report (HTML)
  </a>
{/if}

<div hidden use:cleanUp bind:this={htmlDownloadTemplate}>
  <style>
body,
html {
  font-family: 'Nunito', sans-serif;
  font-size: 16px;
}
body {
  padding: 4vw;
  max-width: 1000px;
  margin: 0 auto;
}
h1,
h2,
h3,
h4,
h5 {
  font-family: 'Work Sans', sans-serif;
  font-weight: 400;
}
h1 {
  margin-top: 0;
  font-size: 2.5rem;
}
h1 span {
  display: block;
  font-size: 0.8em;
}
h2,
h3 {
  position: relative;
}
h2 {
  margin: 1.8rem 0 0.5rem;
}
h3 {
  margin: 1rem 0 0.5rem;
}
a {
  text-decoration: none;
  font-weight: 600;
  color: inherit;
}
.visuallyhidden {
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  white-space: nowrap;
}
.visuallyhidden.focusable:active,
.visuallyhidden.focusable:focus {
  clip: auto;
  clip-path: none;
  height: auto;
  margin: 0;
  overflow: visible;
  position: static;
  width: auto;
  white-space: inherit;
}
p,
li {
  line-height: 1.4;
  max-width: 40em;
}
li {
  margin: 0.5rem 0;
}
table {
  border-collapse: collapse;
  width: 100%;
  margin: 1.5rem 0;
}
table,
td,
th {
  border: 1px solid #3b3b3b;
}
td,
th {
  padding: 1em;
  vertical-align: top;
  text-align: left;
}
table ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
table li {
  margin: 0;
}
table p {
  margin-bottom: 0;
}
table li:first-child p {
  margin: 0;
}
table {
  page-break-inside: auto;
}
tr {
  page-break-inside: avoid;
  page-break-after: auto;
}
.usa-footer__secondary-section {
  margin-top: 1rem;
}
img {
  max-width: 100%;
}
header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  border-bottom: 2px solid #00A398;
  margin: 0 0 2rem;
}
header div {
  padding: 0 0 .5rem;
}
header div:first-child {
  flex-grow: 12;
}
header div:last-child {
  flex-grow: 1;
}
header img {
  max-width: 200px;
}
header p {  
  margin: 0;
  text-align: right;
  color: #757575;
  font-size: 0.9em;
}

@media print {
  .page-break {
    break-after: page;
  }
  .page-break + h2,
  .page-break + h3 {
    margin-top: 0;
  }
  a.header-anchor,
  footer {
    display: none; 
  }
}
  </style>
  <header>
    <div><img src="../CA-Full-Logo-Red.svg" alt="CivicActions"></div>
    <div><p>3527 Mt Diablo Blvd, #269, Lafayette, CA 94549</p></div>
  </header>
  <main>
    <div class="grid-container">
      <ReportHeader {download} />
      {#each catalog.standards as standard}
        <ReportChapters {standard} {download} />
      {/each}
      <ReportSummary {download} />
    </div>
  </main>
  <footer class="usa-footer usa-footer usa-footer--slim">
    <div class="usa-footer__return-to-top">
      <div class="grid-container">
        <a href={"#"}>Return to top</a>
      </div>
    </div>
    <div class="usa-footer__secondary-section">
      <div class="grid-container">
        <div class="grid-row grid-gap">
          <div class="grid-col">
            <a href="https://github.com/GSA/openacr" target="_blank">OpenACR <span class="visuallyhidden">(opens in a new window or tab)</span></a> is a format maintained by the <a href="https://gsa.gov/" target="_blank">GSA <span class="visuallyhidden">(opens in a new window or tab)</span></a>. The content is the responsibility of the author.
          </div>
          <div class="grid-col">
            <ReportLicense />
          </div>
        </div>
      </div>
    </div>
  </footer>
</div>
