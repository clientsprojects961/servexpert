import { Link } from 'react-router-dom'
import { Globe } from 'lucide-react'

function TwitterIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M19.7 7.2c.01.17.01.34.01.52 0 5.3-4.04 11.4-11.4 11.4-2.26 0-4.37-.66-6.14-1.8.31.04.62.05.95.05 1.87 0 3.59-.64 4.96-1.71-1.75-.03-3.22-1.18-3.72-2.76.24.04.49.06.75.06.36 0 .72-.05 1.06-.14-1.83-.37-3.21-1.98-3.21-3.92v-.05c.54.3 1.15.49 1.81.51-1.08-.72-1.79-1.95-1.79-3.34 0-.74.2-1.43.55-2.03 1.97 2.42 4.92 4.01 8.25 4.18-.06-.29-.09-.59-.09-.9 0-2.2 1.78-3.98 3.98-3.98 1.14 0 2.17.48 2.89 1.25.9-.18 1.75-.5 2.52-.95-.3.92-.92 1.7-1.74 2.19.8-.09 1.56-.31 2.27-.62-.53.79-1.2 1.49-1.97 2.05Z"
        fill="currentColor"
      />
    </svg>
  )
}

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6.5 6.9a2.2 2.2 0 1 1-4.4 0 2.2 2.2 0 0 1 4.4 0ZM2.7 21.2h3.6V9h-3.6v12.2ZM9.2 9h3.4v1.7h.05c.47-.9 1.6-1.85 3.3-1.85 3.5 0 4.1 2.3 4.1 5.2v7.1h-3.6v-6.3c0-1.5 0-3.4-2.1-3.4s-2.4 1.6-2.4 3.3v6.4H9.2V9Z"
        fill="currentColor"
      />
    </svg>
  )
}

const services = [
  { label: 'Digital Marketing & SEO', to: '/services' },
  { label: 'Social Media Management', to: '/services' },
  { label: 'Web & App Development', to: '/services' },
]

const company = [
  { label: 'About', to: '/about' },
  { label: 'Work', to: '/work' },
  { label: 'Contact', to: '/contact' },
]

const socials = [
  { Icon: TwitterIcon, href: '#' },
  { Icon: LinkedinIcon, href: '#' },
  { Icon: Globe, href: '#' },
]

export default function Footer() {
  return (
    <footer
      className="rounded-t-[4rem] pt-16 pb-8 px-8 md:px-16"
      style={{ background: '#0D1210' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-1 mb-4">
              <span className="font-heading font-bold text-2xl text-brand-cream">ServeXpert</span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold inline-block mb-1" />
            </div>
            <p className="font-body text-sm text-brand-cream/50 max-w-xs leading-relaxed mb-6">
              Expert hands. Digital precision. — A full-service agency for performance marketing, product, and automation, trusted by teams that need scale without chaos.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-brand-green flex items-center justify-center text-brand-cream/60 transition-colors duration-200 hover:bg-brand-gold hover:text-brand-dark"
                >
                  <social.Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="font-mono text-xs tracking-widest text-brand-cream/30 uppercase mb-5">Services</p>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.label}>
                  <Link
                    to={s.to}
                    className="font-body text-sm text-brand-cream/60 link-hover hover:text-brand-gold transition-colors"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="font-mono text-xs tracking-widest text-brand-cream/30 uppercase mb-5">Company</p>
            <ul className="space-y-3">
              {company.map((c) => (
                <li key={c.label}>
                  <Link
                    to={c.to}
                    className="font-body text-sm text-brand-cream/60 link-hover hover:text-brand-gold transition-colors"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="mailto:hello@servexpert.co"
                  className="font-body text-sm text-brand-cream/60 link-hover hover:text-brand-gold transition-colors"
                >
                  hello@servexpert.co
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-brand-cream/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-brand-cream/30">
            © 2025 ServeXpert. All rights reserved.
          </p>

          {/* System Operational */}
          <div className="flex items-center gap-2.5">
            <span
              className="w-2 h-2 rounded-full bg-[#22c55e]"
              style={{ animation: 'pulse-green 2s ease-in-out infinite', boxShadow: '0 0 0 0 rgba(34,197,94,0.4)' }}
            />
            <span className="font-mono text-xs text-brand-cream/30 tracking-widest">SYSTEM OPERATIONAL</span>
          </div>

          <p className="font-mono text-xs text-brand-cream/20">
            Privacy · Terms
          </p>
        </div>
      </div>

      <style>{`
        @keyframes pulse-green {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.4); }
          50% { box-shadow: 0 0 0 6px rgba(34,197,94,0); }
        }
      `}</style>
    </footer>
  )
}
