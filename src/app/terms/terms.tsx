"use client";
import LegalPage from "@/components/LegalPage/LegalPage";

function Terms() {
  return (
    <LegalPage
      translationSection="TermsPage"
      showLastUpdated={true}
      backLink="/"
      backLinkText="Back to Home"
    />
  );
}

export default Terms;
