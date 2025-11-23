import Angel from "./angel";
import { metadata as data } from "@/utils/SEO/SEO";

const title = "Lorimer Jenkins - Angel";
export const metadata = {
  ...data,
  title: {
    absolute: title,
  },
  alternates: {
    ...data.alternates,
    canonical: "/angel",
  },
};

const Page = () => {
  return <Angel />;
};

export default Page;
