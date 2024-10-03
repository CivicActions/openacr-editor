import wcag20508catalog from "@openacr/openacr/catalog/2.4-edition-wcag-2.0-508-en.yaml";
import wcag21catalog from "@openacr/openacr/catalog/2.4-edition-wcag-2.1-en.yaml";
import wcag21508catalog from "@openacr/openacr/catalog/2.4-edition-wcag-2.1-508-en.yaml";
import wcag22catalog from "@openacr/openacr/catalog/2.5-edition-wcag-2.2-en.yaml";
import wcag22508catalog from "@openacr/openacr/catalog/2.5-edition-wcag-2.2-508-en.yaml";
export const wcag20508catalogName = "2.4-edition-wcag-2.0-508-en";
const wcag21catalogName = "2.4-edition-wcag-2.1-en";
const wcag21508catalogName = "2.4-edition-wcag-2.1-508-en";
const wcag22catalogName = "2.5-edition-wcag-2.2-en";
const wcag22508catalogName = "2.5-edition-wcag-2.2-508-en";

export function getCatalog(catalogName) {
  if (catalogName == wcag20508catalogName) {
    return wcag20508catalog;
  } else if (catalogName == wcag21catalogName) {
    return wcag21catalog;
  } else if (catalogName == wcag21508catalogName) {
    return wcag21508catalog;
  } else if (catalogName == wcag22catalogName) {
    return wcag22catalog;
  } else if (catalogName == wcag22508catalogName) {
    return wcag22508catalog;
  }
  return wcag20508catalog;
}

export function getListOfCatalogs() {
  return [
    {
      catalog: wcag20508catalogName,
      title: "VPAT® 2.4 508: Revised Section 508 Edition (WCAG 2.0)",
    },
    {
      catalog: wcag21508catalogName,
      title: "VPAT® 2.4 508 + WCAG: Revised Section 508 Edition (WCAG 2.1)",
    },
    {
      catalog: wcag21catalogName,
      title: "VPAT® 2.4 WCAG: WCAG 2.1",
    },
    {
      catalog: wcag22508catalogName,
      title: "VPAT® 2.5 508 + WCAG: Revised Section 508 Edition (WCAG 2.2)",
    },
    {
      catalog: wcag22catalogName,
      title: "VPAT® 2.5 WCAG: WCAG 2.2",
    },
  ];
}

export function getDefaultCatalogName() {
  return wcag21508catalogName;
}
