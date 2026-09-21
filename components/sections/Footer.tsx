import { Logo } from "@/components/ui/Logo";
import { ArrowUp } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="agency-footer">
      <div className="page-shell">
        <div className="footer-top">
          <div><a href="#top" aria-label="Thryvv home"><Logo /></a><p>Independent minds. Shared ambition.</p></div>
          <nav aria-label="Footer navigation"><a href="#work">Work</a><a href="#services">Services</a><a href="#process">Process</a><a href={`mailto:${siteConfig.email}`}>Get in touch</a></nav>
          <a href="#top" className="back-to-top" aria-label="Back to top" title="Back to top"><ArrowUp size={20} /></a>
        </div>
        <div className="footer-bottom"><p>&copy; {new Date().getFullYear()} Thryvv. All rights reserved.</p><span>Designed with intent. Built to Thryvv.</span></div>
      </div>
    </footer>
  );
}
