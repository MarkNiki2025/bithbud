import { httpWrapper } from "@fernir2/saas-kit/server";
import { DashboardPage } from "@fernir2/saas-kit";

const Page = httpWrapper(async () => {
    return <DashboardPage />;
});

export default Page;
