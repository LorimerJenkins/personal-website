import Bookshelf from "./bookshelf";
import { metadata as data } from "@/utils/SEO/SEO";

const title = "Lorimer Jenkins - Bookshelf";
export const metadata = {
  ...data,
  title: {
    absolute: title,
  },
  alternates: {
    ...data.alternates,
    canonical: "/bookshelf",
  },
};

const Page = () => {
  return <Bookshelf />;
};

export default Page;
