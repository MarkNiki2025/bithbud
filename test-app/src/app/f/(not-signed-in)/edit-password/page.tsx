import { httpWrapper } from "@fernir2/saas-kit/server";
import { EditPasswordPage } from "@fernir2/saas-kit";

const Page = httpWrapper(async () => {
    return <EditPasswordPage />;
});

export default Page;
