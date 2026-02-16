import { httpWrapper } from "@fernir2/saas-kit/server";
import { PreloadPage } from "@fernir2/saas-kit";

const Page = httpWrapper(async () => {
    return <PreloadPage />;
});

export default Page;
