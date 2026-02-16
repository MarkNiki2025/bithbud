import { httpWrapper } from "@fernir2/saas-kit/server";
import { EditUserPage } from "@fernir2/saas-kit";

const Page = httpWrapper(async () => {
    return <EditUserPage />;
});

export default Page;
