import { ForgotPasswordPage } from "@fernir2/saas-kit";
import { httpWrapper } from "@fernir2/saas-kit/server";

export const dynamic = "force-dynamic";

const Page = httpWrapper(
    async () => {
        return <ForgotPasswordPage />;
    },
    { anonymous: true },
);

export default Page;
