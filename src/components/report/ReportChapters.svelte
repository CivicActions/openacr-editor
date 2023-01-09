<script>
  import HeaderWithAnchor from "../HeaderWithAnchor.svelte";
  import ReportChapter from "./ReportChapter.svelte";

  export let standard;
  export let download = false;
</script>

<p>
  Conformance to the N WCAG Level A criteria listed below is
  distributed as follows:
</p>
<ul>
  <li>N criteria did not apply to the sample</li>
  <li>N was not supported</li>
  <li>N were partially supported</li>
  <li>N were supported</li>
</ul>

<HeaderWithAnchor id={standard.id} level=2 {download}>{standard.report_heading}</HeaderWithAnchor>

{#each standard.chapters as standardChapter}
  <ReportChapter {standard} chapterId={standardChapter} {download} />
{/each}
