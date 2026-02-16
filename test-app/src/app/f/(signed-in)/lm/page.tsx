import { httpWrapper } from "@fernir2/saas-kit/server";
import { LeadsViewPage } from "@fernir2/saas-kit";

const Page = httpWrapper(async () => {
    return <LeadsViewPage />;
});

export default Page;
