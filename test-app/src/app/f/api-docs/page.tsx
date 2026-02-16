import { notFound } from "next/navigation";
import { httpWrapper } from "@fernir2/saas-kit/server";
import { ApiDocsPage } from "@fernir2/saas-kit";
import { isProd } from "@fernir2/saas-kit";
import "swagger-ui-react/swagger-ui.css";

const Page = httpWrapper(async () => {
    if (isProd()) {
        notFound();
    }

    return <ApiDocsPage />;
});

export default Page;
