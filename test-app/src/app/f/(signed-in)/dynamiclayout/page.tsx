import { httpWrapper } from "@fernir2/saas-kit/server";
import { DynamicLayoutPage } from "@fernir2/saas-kit";

const Page = httpWrapper(async () => {
    return <DynamicLayoutPage />;
});

export default Page;
