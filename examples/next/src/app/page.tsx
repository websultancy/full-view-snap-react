import Link from "next/link";
import FullViewSnapLogo from "../assets/fullviewsnaplogo.svg";

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

export default function Home() {
  
  return (
    <>
      <style>{mobileNavStyles}</style>
      <div className="">
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
          <Link href="/basic">Basic</Link>
        </li>
        <li>
          <Link href="/animated">Animated</Link>
        </li>
        <li>
          <Link href="/navigation">Navigation</Link>
        </li>
        <li>
          <Link href="/sticky">Sticky</Link>
        </li>
        <li>
          <Link href="/dynamic-slide-count">Dynamic Slide Count</Link>
        </li>
        </ul>
      </div>
      </div>
    </>
  );
}
