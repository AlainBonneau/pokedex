import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header aria-label="header - navbar">
        <Navbar />
      </header>
      <main className="flex-1 bg-[#FFF8E7]" role="main">
        {children}
      </main>
      <footer aria-label="footer">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
