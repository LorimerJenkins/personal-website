import Chess from "./chess";
import { metadata as data } from "@/utils/SEO/SEO";

const title = "Lorimer Jenkins - Chess";
export const metadata = {
  ...data,
  title: {
    absolute: title,
  },
  alternates: {
    ...data.alternates,
    canonical: "/chess",
  },
};

const Page = () => {
  return <Chess />;
};

export default Page;
