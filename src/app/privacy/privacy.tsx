"use client";
import LegalPage from "@/components/LegalPage/LegalPage";

function Privacy() {
  return (
    <LegalPage
      translationSection="PrivacyPage"
      showLastUpdated={true}
      backLink="/"
      backLinkText="Back to Home"
    />
  );
}

export default Privacy;
