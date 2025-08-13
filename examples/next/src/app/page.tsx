import Image from "next/image";
import Link from "next/link";
import FullViewSnapLogo from "./fullviewsnaplogo.svg";

export default function Home() {
  return (
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
      </ul>
    </div>
    </div>
  );
}
