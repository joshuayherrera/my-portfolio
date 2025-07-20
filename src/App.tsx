import './App.css'
import MenuButton from './components/MenuButton'
import SocialLinks from './components/SocialLinks'
import HeroSection from './sections/HeroSection'

function App() {
  return (
    <div className='min-h-screen relative'>
      <HeroSection />
      
      <MenuButton />
      <SocialLinks />
    </div>
  )
}

export default App
