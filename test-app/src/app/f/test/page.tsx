import { httpWrapper } from "@fernir2/saas-kit/server";
import { TestPage } from "@fernir2/saas-kit";

const Page = httpWrapper(async () => {
    return <TestPage />;
});

export default Page;
