import "./App.css";
import SocialLinks from "./components/SocialLinks";
import Menu from "./components/Menu";
import ProjectsSection from "./sections/ProjectsSection";
import Footer from "./components/Footer";

function App() {

  return (
    <>
      <Menu />
      <div className="min-h-screen relative">
        <ProjectsSection />
        <Footer />  
        <SocialLinks />
      </div>
    </>
  );
}

export default App;
