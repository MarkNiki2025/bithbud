import { ViewPage } from "@fernir2/saas-kit";
import { httpWrapper } from "@fernir2/saas-kit/server";

const Page = httpWrapper(async ({ searchParams }) => {
    const { id, name, resource } = await searchParams;
    return <ViewPage id={id} name={name} resource={resource} />;
});

export default Page;
