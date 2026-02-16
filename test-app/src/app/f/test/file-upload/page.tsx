import { httpWrapper } from "@fernir2/saas-kit/server";
import { FileUploadPage } from "@fernir2/saas-kit";

const Page = httpWrapper(async () => {
    return <FileUploadPage />;
});

export default Page;
