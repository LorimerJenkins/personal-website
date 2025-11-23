import Home from "./home/home";
import { metadata as data } from "@/utils/SEO/SEO";

const title = "Lorimer Jenkins - Home";
export const metadata = {
  ...data,
  title: {
    absolute: title,
  },
  alternates: {
    ...data.alternates,
    canonical: "/",
  },
};

const Page = () => {
  return <Home />;
};

export default Page;
