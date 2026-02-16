import { PaymentPlanPage } from "@fernir2/saas-kit";
import { httpWrapper } from "@fernir2/saas-kit/server";

const Page = httpWrapper(async () => {
    return <PaymentPlanPage />;
});

export default Page;
