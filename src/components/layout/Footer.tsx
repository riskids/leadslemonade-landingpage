import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-4 md:space-y-0">
        <div className="flex items-center space-x-2">
          <Image src="/logo.png" alt="LeadsLemonade Logo" width={24} height={24} />
          <span className="font-bold">LeadsLemonade</span>
        </div>
        <div className="text-muted text-sm">
          &copy; {new Date().getFullYear()} LeadsLemonade. All rights reserved.
        </div>
        <div className="flex space-x-4">
          <Link href="/privacy-policy" className="text-muted hover:text-ink transition-colors">Privacy</Link>
          <Link href="/terms-of-service" className="text-muted hover:text-ink transition-colors">Terms</Link>
          <Link href="/contact" className="text-muted hover:text-ink transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
