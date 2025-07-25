import { useState } from "react";
import "./App.css";
import SocialLinks from "./components/SocialLinks";
import HeroSection from "./sections/HeroSection";
import Menu from "./components/Menu";
import Preloader from "./components/Preloader";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {/* Contenido principal siempre visible pero con h1 inicialmente oculto */}
      <Menu />
      <div className="min-h-screen relative">
        <HeroSection isVisible={!isLoading} />
        <SocialLinks />
      </div>

      {/* Preloader encima del contenido */}
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
    </>
  );
}

export default App;
