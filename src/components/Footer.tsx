import "@/styles/Footer.css"
import { useState } from "react"
import emailjs from '@emailjs/browser'

function Footer() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setMessage('Please enter an email')
      return
    }
    setIsLoading(true)
    try {
      await emailjs.send(
        'service_er6s3zf', 
        'template_bt3xgkb',
        {
          from_email: email,
          to_email: 'joshuayherrera@gmail.com',
          message: `New subscriber: ${email}`
        },
        'KOYDIJU2PnU11DbiS'
      )
      
      setMessage('Thanks for subscribing! 🎉')
      setEmail('')
    } catch (error) {
      setMessage('Oops! Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-col">
            <p className="mono"><span>&#9654;</span> Drop your email if you vibe</p>
            <div className="footer-email-container">
              <form className="footer-email-row" onSubmit={handleSubmit}>
                <input 
                  type="email" 
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
                <button type="submit" disabled={isLoading}>
                  <img src="/img/footer/footer-right-arrow.png" alt="Right Arrow Img" />
                </button>
              </form>
              {message && <p className="footer-message">{message}</p>}
            </div>
          </div>
          <div className="footer-col"></div>
        </div>
        <div className="footer-bottom">
          <div className="footer-col">
            <div className="footer-logo">
              <h3 className="text-6xl font-semibold w-[500px]">Joshua Alvarez</h3>
            </div>
          </div>
          <div className="footer-col">
            <div className="footer-sub-col">
              <p className="mono">Explore</p>
              <div className="footer-links">
                <p><a href="#">Start Here</a></p>
                <p><a href="#projects">The Cool Work</a></p>
                <p><a href="#skills">Tech Stack</a></p>
                <p><a href="#contact">Slide Into Inbox</a></p>
              </div>
            </div>
            <div className="footer-sub-col">
              <p className="mono">Stalk Me</p>
              <div className="footer-copy">
                <p>Av. La marina 2455</p>
                <p>San Miguel, Perú</p>
                <br />
                <p><a href="https://www.linkedin.com/in/joshuayherrera/">LinkedIn</a></p>
                <p><a href="https://github.com/joshuayherrera">Github</a></p>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="footer-col">
            <p className="mono">Portfolio 2025</p>
          </div>
          <div className="footer-col">
            <div className="footer-sub-col">
              <p className="mono">Made with ♥️ by <span className="font-bold">Joshua Alvarez</span></p>
            </div>
            <div className="footer-sub-col">
              <p className="mono">&copy; 2025 All Rights Reserved</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer