import { SearchProvider } from "./SearchContext";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <SearchProvider>
      <div className="flex flex-col min-h-screen">
        <header>
          <Navbar />
        </header>
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </SearchProvider>
  );
};

export default Layout;
