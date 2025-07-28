import { useState } from "react";
import "./App.css";
import SocialLinks from "./components/SocialLinks";
import Menu from "./components/Menu";
import Preloader from "./components/Preloader";
import ProjectsSection from "./sections/ProjectsSection";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      <Menu />
      <div className="min-h-screen relative">
        <ProjectsSection />  
        <SocialLinks />
      </div>
      
      {/* Preloader encima del contenido */}
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
    </>
  );
}

export default App;
