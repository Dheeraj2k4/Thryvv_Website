import { Logo } from "@/components/ui/Logo";

const EMAIL = "thryvvdigital@gmail.com";

const columns = [
  {
    title: "Services",
    links: [
      { label: "Landing Pages", href: "#services" },
      { label: "Paid Media", href: "#services" },
      { label: "Technical Growth", href: "#services" },
      { label: "Analytics", href: "#services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Process", href: "#process" },
      { label: "Impact", href: "#impact" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Email us", href: `mailto:${EMAIL}` },
      { label: "LinkedIn", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "X / Twitter", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer data-nav-theme="dark" className="bg-ink text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_2fr]">
          <div>
            <Logo wordmarkClassName="text-white" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
              A precision digital growth agency turning ambitious brands into
              global pulses.
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-5 inline-block text-sm font-medium text-white/80 transition-colors hover:text-brand-light"
            >
              {EMAIL}
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="font-accent text-xs font-semibold uppercase tracking-widest text-white/40">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-white/70 transition-colors hover:text-brand-light"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/45 sm:flex-row">
          <p>© {new Date().getFullYear()} Thryvv. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
