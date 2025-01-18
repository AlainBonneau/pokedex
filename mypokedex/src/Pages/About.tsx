import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

function About() {
  return (
    <div className="about-container">
      <Navbar />
      <h1>Page à propos</h1>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default About;
