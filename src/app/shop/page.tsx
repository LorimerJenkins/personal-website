import Shop from "./shop";
import { metadata as data } from "@/utils/SEO/SEO";

const title = "Lorimer Jenkins - Shop";
export const metadata = {
  ...data,
  title: {
    absolute: title,
  },
  alternates: {
    ...data.alternates,
    canonical: "/shop",
  },
};

const Page = () => {
  return <Shop />;
};

export default Page;
