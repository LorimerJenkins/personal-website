import Travel from "./travel";
import { metadata as data } from "@/utils/SEO/SEO";

const title = "Lorimer Jenkins - Travel";
export const metadata = {
  ...data,
  title: {
    absolute: title,
  },
  alternates: {
    ...data.alternates,
    canonical: "/travel",
  },
};

const Page = () => {
  return <Travel />;
};

export default Page;
