import Films from "./films";
import { metadata as data } from "@/utils/SEO/SEO";

const title = "Lorimer Jenkins - Films";
export const metadata = {
  ...data,
  title: {
    absolute: title,
  },
  alternates: {
    ...data.alternates,
    canonical: "/Films",
  },
};

const Page = () => {
  return <Films />;
};

export default Page;
