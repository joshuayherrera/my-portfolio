import "./App.css";
import MenuButton from "./components/MenuButton";
import SocialLinks from "./components/SocialLinks";
import HeroSection from "./sections/HeroSection";
import { CursorProvider } from "./components/CustomCursor";

function App() {
  return (
    <CursorProvider>
      <div className="min-h-screen relative">
        <HeroSection />

        <MenuButton />
        <SocialLinks />
      </div>
    </CursorProvider>
  );
}

export default App;
