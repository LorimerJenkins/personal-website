import Disclosures from "./disclosures";
import { metadata as data } from "@/utils/SEO/SEO";

const title = "Lorimer Jenkins - Disclosures";
export const metadata = {
  ...data,
  title: {
    absolute: title,
  },
  alternates: {
    ...data.alternates,
    canonical: "/disclosures",
  },
};

const Page = () => {
  return <Disclosures />;
};

export default Page;
