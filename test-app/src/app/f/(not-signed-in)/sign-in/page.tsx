import { httpWrapper } from "@fernir2/saas-kit/server";
import { SignInPage } from "@fernir2/saas-kit";

export const dynamic = "force-dynamic";

const Page = httpWrapper(
    async () => {
        return <SignInPage />;
    },
    { anonymous: true },
);

export default Page;
