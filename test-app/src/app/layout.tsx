import { HtmlMetadataType } from "@fernir2/saas-kit";
import { Geist as createFontGeist } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@fernir2/saas-kit";
import Favicon from "src/app/favicon.ico";
import { Toaster } from "@fernir2/saas-kit";
import { ReactNode } from "react";
import { Providers } from "@fernir2/saas-kit";
import { defaultGlobalConfig } from "@fernir2/saas-kit";
import { configureDefaultGlobalConfig } from "@fernir2/saas-kit";

export const metadata: HtmlMetadataType = {
    title: "test-app",
    icons: [{ rel: "icon", url: Favicon.src }],
} as const;

export default async function RootLayout({ children }: { children: ReactNode }) {
    const sidebarResourceNames: string[] = [];
    configureDefaultGlobalConfig(sidebarResourceNames);

    return (
        <html lang="en">
            <body className={cn(geistFont.className, "h-screen text-sm")}>
                <div className="flex h-full flex-col">
                    <Providers globalConfig={{ ...defaultGlobalConfig }}>{children}</Providers>
                </div>
                <Toaster />
            </body>
        </html>
    );
}

const geistFont = createFontGeist({
    subsets: ["latin"],
});
