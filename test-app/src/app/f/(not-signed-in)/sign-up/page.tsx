import { httpWrapper } from "@fernir2/saas-kit/server";
import { SignUpPage } from "@fernir2/saas-kit";

export const dynamic = "force-dynamic";

const Page = httpWrapper(
    async ({ searchParams }) => {
        return <SignUpPage searchParams={searchParams} />;
    },
    { anonymous: true },
);

export default Page;
