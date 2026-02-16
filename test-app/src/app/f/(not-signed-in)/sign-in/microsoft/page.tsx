import { httpWrapper } from "@fernir2/saas-kit/server";
import { MicrosoftPage } from "@fernir2/saas-kit";

const Page = httpWrapper(async () => {
    return <MicrosoftPage />;
});

export default Page;
