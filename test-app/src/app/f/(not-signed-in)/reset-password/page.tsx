import { ResetPasswordPage } from "@fernir2/saas-kit";
import { httpWrapper } from "@fernir2/saas-kit/server";

const Page = httpWrapper(
    async () => {
        return <ResetPasswordPage />;
    },
    { anonymous: true },
);

export default Page;
