import { httpWrapper } from "@fernir2/saas-kit/server";
import { EditUserByIdPage } from "@fernir2/saas-kit";

const Page = httpWrapper(async ({ params }) => {
    return <EditUserByIdPage params={params} />;
});

export default Page;
