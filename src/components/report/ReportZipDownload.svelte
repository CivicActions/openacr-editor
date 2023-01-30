<script>
  import { onMount } from "svelte";
  import { evaluation } from "../../stores/evaluation.js";
  import ReportLetterheadCA from "./ReportLetterheadCA.svelte";
  import ReportHeader from "./ReportHeader.svelte";
  import ReportSummary from "./ReportSummary.svelte";
  import ReportChapters from "./ReportChapters.svelte";
  import ReportLicense from "./ReportLicense.svelte";
  import { cleanUp } from "../../utils/cleanUpReportHTML.js";
  import { createHTMLDownload } from "../../utils/createHTMLDownload.js";
  import { validate } from "../../utils/validate.js";
  import { reportFilename } from "../../utils/reportFilename.js";
  import yaml from "js-yaml";
  import JSZip from "jszip";
  import { sanitizeEvaluation } from "../../utils/sanitizeEvaluation.js";
  import { getCatalog } from "../../utils/getCatalogs.js";
  import { not_equal } from 'svelte/internal';

  var title = $evaluation.title;
  const filename = reportFilename($evaluation);
  const sanitizedEvaluation = sanitizeEvaluation($evaluation);
  const valid = validate($evaluation);
  let catalog = getCatalog($evaluation.catalog);
  let zipDownload, htmlDownload, htmlDownloadTemplate;

  let download = true;
  let zip = new JSZip();

  onMount(() => {
    htmlDownload = createHTMLDownload(htmlDownloadTemplate, title, "en");
    zip.file('README.txt', 'If you need to gather feedback from other people in your organization, please send the zipped file (HTML and YAML) to your collaborators. Collaborators can view the report by opening the HTML file with any web browser. If they would like to make changes to the report, they should go to OpenACR Editor and upload the YAML file to make edits to the content of the report. Do not edit the HTML file directly, it is just for viewing the report.\n\nIf your report is final and you\'re ready to submit the report to an agency in response to a Request for Proposal (RFP), please attach the YAML file to your proposal.');
    zip.file(`${filename}.html`, htmlDownload);
    zip.file(`${filename}.yaml`, yaml.dump(sanitizedEvaluation));
    zip.generateAsync({type:"base64"}).then(function (base64) {
      zipDownload = `data:application/zip;base64,${base64}`;
    });
  });
</script>

{#if valid.result }
  <a id="download-zip" href={zipDownload} download="{filename}.zip" class="button" style="text-align: center;">
    Download Report<br/>(YAML & HTML) .zip
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
    table ul,
    table ol {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    table li {
      margin: 0;
    }
    table li + li,
    table p + ol {
      margin-top: 1rem;
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
    .usa-table:not(.col2) td:first-child {
      width: 25%;
    }
    .usa-table:not(.col2) td:nth-child(2) {
      width: 20%;
    }
    img, svg {
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
    header svg {
      height: auto;
      max-width: 200px;
    }
    header p {
      margin: 0;
      text-align: right;
      color: #757575;
      font-size: 0.9em;
    }
    a.header-anchor {
      display: none;
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
  <ReportLetterheadCA />
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
