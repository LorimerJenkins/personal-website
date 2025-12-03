import Terms from "./terms";
import { metadata as data } from "@/utils/SEO/SEO";

const title = "Lorimer Jenkins - Terms";
export const metadata = {
  ...data,
  title: {
    absolute: title,
  },
  alternates: {
    ...data.alternates,
    canonical: "/terms",
  },
};

const Page = () => {
  return <Terms />;
};

export default Page;
