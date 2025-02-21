import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Blog",
  description: "Le Blog de Benjamin",
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();
  return (
    <html lang="fr">
      <SessionProvider session={session}>
        <body>
          <main>{children}</main>
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
};

export default RootLayout;
