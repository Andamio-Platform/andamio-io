import Image from "next/image";
import Link from "next/link";

export default function GlobalFooter() {
  return (
    <footer className="footer px-24 py-10 bg-primary text-primary-content">
      <Image src="/andamio.png" width={150} height={150} alt="andamio" className="rounded-full" />
      <nav>
        <header className="footer-title">Andamio</header>
        <a className="link link-hover">Discord</a>
        <a className="link link-hover">Twitter</a>        
        <Link href={'/whitepaper'} className="link link-hover">Whitepaper</Link>
        <a className="link link-hover">Roadmap</a>
        <a className="link link-hover">AndamioJS Documentation</a>
      </nav>
      <nav>
        <header className="footer-title">ODIN</header>
        <a className="link link-hover">Discord</a>
        <a className="link link-hover">Linktree</a>
      </nav>
      <nav>
        <header className="footer-title">Gimbalabs</header>
        <a className="link link-hover">gimbalabs.com</a>
        <a className="link link-hover">Discord</a>
        <a className="link link-hover">Twitter</a>
      </nav>
      <nav>
        <header className="footer-title">FAQs</header>
        <Link href={'/contributor-platform/faq'} className="link link-hover">Contributor Platform</Link>
      </nav>
    </footer>
  );
}
