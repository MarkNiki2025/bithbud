import { httpWrapper } from "@fernir2/saas-kit/server";
import { FeedPage } from "@fernir2/saas-kit";

const Page = httpWrapper(async () => {
    return <FeedPage />;
});

export default Page;
