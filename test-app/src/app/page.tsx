import { fdRedirect } from "@fernir2/saas-kit/server";
import { getResourceListUrl } from "@fernir2/saas-kit";
import { resourceNames } from "@fernir2/saas-kit";

export default function Home() {
    const afterLoginUrl = getResourceListUrl(resourceNames.contact);

    fdRedirect(afterLoginUrl);
}
