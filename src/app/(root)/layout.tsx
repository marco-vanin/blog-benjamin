import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      header avec navbar ici
      <h1>Blog de Benjamin</h1>
      {children}
    </main>
  );
};
export default Layout;
