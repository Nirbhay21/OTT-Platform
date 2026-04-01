import { Github, Heart, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import LogoIcon from "./icons/LogoIcon";

const FOOTER_SECTIONS = [
  {
    title: "Company",
    links: [
      { href: "/", label: "About Us" },
      { href: "/", label: "Careers" },
      { href: "/", label: "Press" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/", label: "Help Center" },
      { href: "/", label: "Contact Us" },
      { href: "/", label: "Feedback" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/", label: "Privacy Policy" },
      { href: "/", label: "Terms of Service" },
      { href: "/", label: "Cookie Policy" },
    ],
  },
];

const SOCIAL_LINKS = [
  { href: "https://github.com", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
  { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 border-t border-white/5 bg-zinc-950 pt-16 pb-24 lg:pb-8 text-zinc-400">
      {/* Decorative Branding Icon */}
      <div className="absolute inset-x-0 -top-6 flex justify-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-zinc-900 shadow-2xl backdrop-blur-md overflow-hidden p-1.5">
          <LogoIcon className="h-full w-full" />
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4 lg:grid-cols-5">
          {/* Logo & About Section */}
          <div className="col-span-2 space-y-6">
            <Link
              href="/"
              className="group flex items-center gap-2 text-2xl font-black tracking-tighter text-white uppercase"
            >
              <span className="bg-brand-primary px-2 py-0.5 text-black">
                CHITRAPAT
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-zinc-500">
              Your ultimate destination for movies, TV series, and more. Explore
              the latest trending content and dive into a world of limitless
              entertainment. Built with high-performance tech for the best
              streaming experience.
            </p>
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:bg-brand-primary hover:text-black hover:shadow-[0_0_15px_rgba(242,97,1,0.4)]"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Dynamic Sections */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title} className="space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:text-brand-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 md:flex-row">
          <p className="text-xs text-zinc-500">
            © {currentYear} CHITRAPAT. All rights reserved. TMDB API
            Integration.
          </p>
          <div className="flex items-center gap-1 text-xs text-zinc-500">
            <span>Made with</span>
            <Heart className="h-3 w-3 fill-brand-primary text-brand-primary" />
            <span>by CHITRAPAT Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
