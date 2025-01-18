import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

function Page404() {
  return (
    <div className="404-container">
      <Navbar />
      <div className="404title-container flex flex-col items-center justify-center">
        <h1 className="text-center pt-6 pb-6 font-bold text-5xl text-[#CC4C41]">
          404 Not found
        </h1>
        <img className="w-96" src="/img/404.webp" alt="404 - Pikachu crying" />
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Page404;
