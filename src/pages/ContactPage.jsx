import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import toast from 'react-hot-toast'
import PageWrapper from '../components/ui/PageWrapper'
import Footer from '../components/layout/Footer'
import { siteConfig } from '../config/siteConfig'

const SUBJECTS = ['General Inquiry', 'Order Support', 'Product Question', 'Ayurvedic Consultation', 'Wholesale / Bulk Order', 'Feedback']

const inputClass = 'w-full h-12 px-4 text-sm border border-gray-200 rounded-xl outline-none focus:border-primary-400 bg-white'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: SUBJECTS[0], message: '' })

  const update = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    toast.success("We'll get back to you within 24 hours 🌿")
    setForm({ name: '', email: '', phone: '', subject: SUBJECTS[0], message: '' })
  }

  const cards = [
    { Icon: Phone,         label: 'Call Us',  value: siteConfig.phone, href: `tel:${siteConfig.phone}` },
    { Icon: Mail,          label: 'Email Us', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { Icon: MessageCircle, label: 'WhatsApp', value: 'Chat with us',   href: siteConfig.social.whatsapp },
  ]

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-24 md:pb-12">
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl md:text-4xl text-bark">Get in Touch</h1>
          <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
            Questions about products, orders, or your dosha? We're here to help.
          </p>
        </div>

        {/* Contact cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto">
          {cards.map(({ Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="bg-white rounded-2xl p-6 shadow-sm text-center hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-primary-50 flex items-center justify-center mb-3">
                <Icon size={22} className="text-primary-600" />
              </div>
              <p className="font-semibold text-bark text-sm">{label}</p>
              <p className="text-xs text-gray-400 mt-1">{value}</p>
            </a>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm space-y-4">
            <h2 className="font-display text-xl text-bark mb-2">Send a Message</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <input required placeholder="Your name" value={form.name} onChange={update('name')} className={inputClass} />
              <input required type="email" placeholder="Email address" value={form.email} onChange={update('email')} className={inputClass} />
            </div>
            <input type="tel" placeholder="Phone (optional)" value={form.phone} onChange={update('phone')} className={inputClass} />
            <select value={form.subject} onChange={update('subject')} className={inputClass}>
              {SUBJECTS.map(s => <option key={s}>{s}</option>)}
            </select>
            <textarea
              required
              rows={5}
              placeholder="How can we help?"
              value={form.message}
              onChange={update('message')}
              className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl outline-none focus:border-primary-400 resize-none"
            />
            <button type="submit" className="w-full h-12 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors">
              Send Message
            </button>
          </form>

          {/* Map placeholder + FAQ teaser */}
          <div className="space-y-5">
            <div className="bg-primary-50 rounded-2xl h-64 flex flex-col items-center justify-center text-center gap-2 border border-primary-100">
              <MapPin size={32} className="text-primary-400" />
              <p className="text-sm text-primary-700 font-medium">Google Maps embed</p>
              <p className="text-xs text-primary-500 px-8">
                Replace this placeholder with your store's map iframe once your address is final.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-display text-lg text-bark">Looking for Quick Answers?</h3>
              <p className="text-sm text-gray-500 mt-2">
                Shipping times, returns, dosage guidance — most questions are already answered in our FAQ.
              </p>
              <Link
                to="/faq"
                className="inline-block mt-4 text-accent-500 text-sm font-semibold hover:underline"
              >
                Browse FAQs →
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </PageWrapper>
  )
}
