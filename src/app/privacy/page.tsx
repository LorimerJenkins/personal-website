import Privacy from "./privacy";
import { metadata as data } from "@/utils/SEO/SEO";

const title = "Lorimer Jenkins - Privacy";
export const metadata = {
  ...data,
  title: {
    absolute: title,
  },
  alternates: {
    ...data.alternates,
    canonical: "/privacy",
  },
};

const Page = () => {
  return <Privacy />;
};

export default Page;
