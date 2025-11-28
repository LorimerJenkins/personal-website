import Writing from "./writing";
import { metadata as data } from "@/utils/SEO/SEO";

const title = "Lorimer Jenkins - Writing";
export const metadata = {
  ...data,
  title: {
    absolute: title,
  },
  alternates: {
    ...data.alternates,
    canonical: "/writing",
  },
};

const Page = () => {
  return <Writing />;
};

export default Page;

