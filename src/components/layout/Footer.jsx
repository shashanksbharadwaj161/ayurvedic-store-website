import { Link } from 'react-router-dom'
import { Instagram, Facebook, Youtube, MessageCircle, Phone, Mail, MapPin } from 'lucide-react'
import { siteConfig } from '../../config/siteConfig'

const quickLinks = [
  { label: 'Home',        to: '/' },
  { label: 'Shop All',    to: '/shop' },
  { label: 'About',       to: '/about' },
  { label: 'Contact',     to: '/contact' },
  { label: 'FAQ',         to: '/faq' },
  { label: 'Track Order', to: '/account' },
]

const categories = [
  { label: 'Tablet & Vati', to: '/shop/tablet-vati' },
  { label: 'Churna',        to: '/shop/churna' },
  { label: 'Cosmetics',     to: '/shop/cosmetics' },
  { label: 'Drops',         to: '/shop/drops' },
  { label: 'Miscellaneous', to: '/shop/miscellaneous' },
]

const socials = [
  { Icon: Instagram,     href: siteConfig.social.instagram, label: 'Instagram' },
  { Icon: Facebook,      href: siteConfig.social.facebook,  label: 'Facebook' },
  { Icon: Youtube,       href: siteConfig.social.youtube,   label: 'YouTube' },
  { Icon: MessageCircle, href: siteConfig.social.whatsapp,  label: 'WhatsApp' },
]

export default function Footer() {
  return (
    <footer className="bg-bark text-white">
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h3 className="font-display text-2xl mb-2">{siteConfig.brandName}</h3>
          <p className="text-white/70 text-sm mb-5">{siteConfig.tagline}</p>
          <div className="flex gap-4">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="text-white/70 hover:text-accent-400 hover:scale-125 transition-all duration-200"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wider text-white/90 mb-4">Quick Links</h4>
          <ul className="space-y-2.5">
            {quickLinks.map(link => (
              <li key={link.label}>
                <Link to={link.to} className="text-white/70 hover:text-accent-400 text-sm transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wider text-white/90 mb-4">Categories</h4>
          <ul className="space-y-2.5">
            {categories.map(cat => (
              <li key={cat.label}>
                <Link to={cat.to} className="text-white/70 hover:text-accent-400 text-sm transition-colors">
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wider text-white/90 mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex items-center gap-2">
              <Phone size={16} className="shrink-0" />
              <a href={`tel:${siteConfig.phone}`} className="hover:text-accent-400 transition-colors">{siteConfig.phone}</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="shrink-0" />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-accent-400 transition-colors">{siteConfig.email}</a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} className="shrink-0" />
              {siteConfig.address}
            </li>
          </ul>
          <a
            href={siteConfig.social.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 mt-5 bg-[#25D366] hover:bg-[#1fb557] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
          >
            <MessageCircle size={16} />
            Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.</p>
          <div className="flex gap-5">
            <a href={`${siteConfig.wcUrl}/privacy-policy`} target="_blank" rel="noreferrer" className="hover:text-accent-400 transition-colors">Privacy Policy</a>
            <a href={`${siteConfig.wcUrl}/terms-of-service`} target="_blank" rel="noreferrer" className="hover:text-accent-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
