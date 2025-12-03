"use client";
import LegalPage from "@/components/LegalPage/LegalPage";

function Disclosures() {
  return (
    <LegalPage
      translationSection="DisclosuresPage"
      showLastUpdated={true}
      backLink="/angel"
      backLinkText="Back to Angel Investing"
    />
  );
}

export default Disclosures;
