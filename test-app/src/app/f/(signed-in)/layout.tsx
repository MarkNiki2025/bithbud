import { SignedInLayout } from "@fernir2/saas-kit/server";

export default async function Layout({ children }: { children: React.ReactNode }) {
    return <SignedInLayout>{children}</SignedInLayout>;
}
