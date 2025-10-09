import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Basic from './Basic';
import Animated from './Animated';
import Navigation from './Navigation';
import AbsoluteViewExample from './AbsoluteView';
import './app.css';
import FullViewSnapLogo from './assets/fullviewsnaplogo.svg?react'; // Import as React component
import WebsultancyLogo from './assets/websultancy_logo.svg?react'; // Import websultancy logo
import ScrollToTop from "./components/ScrollToTop";

const mobileNavStyles = `
  @media (max-width: 768px) {
    .nav-links {
      flex-direction: column !important;
      gap: 1rem !important;
      align-items: center !important;
    }
    .nav-links li {
      margin: 0 !important;
    }
  }
`;

function Home() {
  return (
    <>
      <style>{mobileNavStyles}</style>
      <div className='central-central'>
        {/* Use the SVG as a React component and inherit color */}
        <FullViewSnapLogo
          style={{
            width: '80vw',
            maxWidth: 350,
            marginBottom: 16,
            color: 'var(--logo-color, #222)' // fallback to #222 if not set
          }}
        />
        <ul
          className="nav-links"
          style={{
            display: 'flex',
            marginTop: 20,
            gap: '1.5rem',
            listStyle: 'none',
            padding: 0,
            justifyContent: 'center', // center horizontally
          }}
        >
        <li>
          Examples:
        </li>
        <li>
          <Link to="/basic">Basic</Link>
        </li>
        <li>
          <Link to="/animated">Animated</Link>
        </li>
        <li>
          <Link to="/navigation">Navigation</Link>
        </li>
        <li>
          <Link to="/sticky">Sticky</Link>
        </li>
        </ul>
      </div>
    </>
  );
}

function BackButton() {
  return (
    <Link
      to="/"
      style={{
        position: 'fixed',
        top: 16,
        left: 16,
        height: '40px',
        padding: '8px 16px',
        fontSize: '16px',
        borderRadius: '4px',
        border: 'none',
        background: '#222',
        color: '#fff',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none'
      }}
    >
      ← More Examples
    </Link>
  );
}

function BuiltByFooter() {
  return (
    <div className="built-by-footer">
      by:&nbsp;
      <a
        href="https://www.websultancy.co.uk"
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: 'inline-flex', alignItems: 'center' }}
        aria-label="Websultancy website"
      >
        <WebsultancyLogo className="websultancy-logo" />
      </a>
    </div>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  return (
    <>
      {children}
      {location.pathname !== '/' && <BackButton />}
      <BuiltByFooter />
    </>
  );
}

function App() {
  return (
    <BrowserRouter basename="/vite">
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/basic" element={<Basic />} />
          <Route path="/animated" element={<Animated />} />
          <Route path="/navigation" element={<Navigation />} />
          <Route path="/sticky" element={<AbsoluteViewExample />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;