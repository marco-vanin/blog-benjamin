import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (session) redirect("/");

  return (
    <main>
      <section>
        <div>image de sign in et up ca sera cool</div>

        {children}
      </section>
    </main>
  );
};
export default Layout;
