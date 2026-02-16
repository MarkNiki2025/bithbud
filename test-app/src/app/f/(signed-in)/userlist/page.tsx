import { UserListPage } from "@fernir2/saas-kit";
import { httpWrapper } from "@fernir2/saas-kit/server";

const Page = httpWrapper(async () => {
    return <UserListPage />;
});

export default Page;
