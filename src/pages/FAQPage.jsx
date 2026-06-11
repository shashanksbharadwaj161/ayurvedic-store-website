import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Search } from 'lucide-react'
import PageWrapper from '../components/ui/PageWrapper'
import Footer from '../components/layout/Footer'

const FAQ_DATA = {
  'Orders & Shipping': [
    { q: 'How long does delivery take?', a: 'Orders are dispatched within 24–48 hours. Delivery typically takes 3–7 business days depending on your location in India. You will receive tracking details by email once your order ships.' },
    { q: 'Do you offer free shipping?', a: 'Yes! All orders above ₹999 ship completely free. Orders below that carry a flat ₹99 shipping charge.' },
    { q: 'Can I track my order?', a: 'Absolutely. Once your order ships, a tracking link is emailed to you. You can also check order status from the My Account section on our store.' },
    { q: 'Do you ship internationally?', a: 'Currently we ship only within India. International shipping is on our roadmap — subscribe to our newsletter to be notified when it launches.' },
    { q: 'Can I change my address after ordering?', a: 'If your order has not shipped yet, contact us on WhatsApp or email within 12 hours of ordering and we will update the address.' },
  ],
  'Products & Quality': [
    { q: 'Are your products 100% natural?', a: 'Yes. Every product is crafted from pure, natural ingredients following traditional Ayurvedic formulations — zero synthetic chemicals, colours, or preservatives.' },
    { q: 'Are your products lab tested?', a: 'Every single batch is tested in certified laboratories for purity, potency, and heavy-metal safety before it reaches you.' },
    { q: 'What is the shelf life of your products?', a: 'Most churnas and tablets have a shelf life of 24–36 months. The exact expiry date is printed on every package.' },
    { q: 'How should I store Ayurvedic medicines?', a: 'Store in a cool, dry place away from direct sunlight. Keep containers tightly closed and out of reach of children.' },
    { q: 'Are your products safe to take with other medication?', a: 'Ayurvedic products are natural, but we always recommend consulting your physician or an Ayurvedic practitioner before combining them with prescription medication.' },
  ],
  'Returns & Refunds': [
    { q: 'What is your return policy?', a: 'We offer 30-day hassle-free returns on unopened products in their original packaging. Contact support to initiate a return.' },
    { q: 'How long do refunds take?', a: 'Once we receive the returned item, refunds are processed within 5–7 business days to your original payment method.' },
    { q: 'What if my order arrives damaged?', a: 'Send us a photo of the damaged item within 48 hours of delivery and we will ship a free replacement immediately — no return needed.' },
    { q: 'Can I exchange a product?', a: 'Yes, unopened products can be exchanged for another item of equal value within 30 days. Contact support to arrange it.' },
    { q: 'Are sale items returnable?', a: 'Sale items can be returned within the same 30-day window unless marked final sale on the product page.' },
  ],
  'Ayurvedic Guidance': [
    { q: 'How do I know my dosha?', a: 'Your dosha (Vata, Pitta, or Kapha) reflects your mind-body constitution. Our team offers free guidance over WhatsApp, or consult an Ayurvedic practitioner for a detailed assessment.' },
    { q: 'How long before I see results?', a: 'Ayurveda works gradually and holistically. Most people notice benefits within 2–6 weeks of consistent use, though this varies by individual and product.' },
    { q: 'Can children take Ayurvedic medicines?', a: 'Some products are suitable for children at adjusted doses, but always consult a practitioner before giving any herbal product to a child.' },
    { q: 'Should I take churna before or after food?', a: 'It depends on the formulation. General guidance is printed on every label, but timing can be personalised — ask us for product-specific advice.' },
    { q: 'Can pregnant women use your products?', a: 'Pregnant and nursing women should consult their doctor before using any Ayurvedic product. Several of our items are safe, but professional guidance comes first.' },
  ],
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="font-medium text-bark text-sm">{q}</span>
        <ChevronDown size={18} className={`text-primary-500 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQPage() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('Orders & Shipping')

  const filtered = useMemo(() => {
    if (!query.trim()) return null
    const q = query.toLowerCase()
    return Object.entries(FAQ_DATA).flatMap(([cat, faqs]) =>
      faqs.filter(f => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q))
        .map(f => ({ ...f, cat }))
    )
  }, [query])

  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-24 md:pb-12 min-h-[60vh]">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl md:text-4xl text-bark">Frequently Asked Questions</h1>
          <p className="text-gray-500 text-sm mt-2">Everything you need to know about ordering and using our products</p>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search FAQs…"
            className="w-full h-12 pl-11 pr-4 text-sm bg-white border border-gray-200 rounded-full outline-none focus:border-primary-400"
          />
        </div>

        {filtered ? (
          <div className="space-y-3">
            {filtered.length === 0 ? (
              <p className="text-center text-gray-400 py-10">No FAQs match “{query}”</p>
            ) : (
              filtered.map((f, i) => <FAQItem key={`${f.cat}-${i}`} q={f.q} a={f.a} />)
            )}
          </div>
        ) : (
          <>
            {/* Category tabs */}
            <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-6">
              {Object.keys(FAQ_DATA).map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 h-11 px-5 rounded-full text-sm font-medium border transition-colors ${
                    activeCategory === cat
                      ? 'bg-primary-500 text-white border-transparent'
                      : 'bg-white border-primary-200 text-primary-700 hover:border-primary-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              {FAQ_DATA[activeCategory].map((f, i) => <FAQItem key={`${activeCategory}-${i}`} q={f.q} a={f.a} />)}
            </div>
          </>
        )}

        {/* CTA */}
        <div className="bg-primary-50 rounded-2xl p-8 text-center mt-12">
          <h2 className="font-display text-xl text-bark">Still Have Questions?</h2>
          <p className="text-sm text-gray-500 mt-2">Our team is happy to help with anything not covered here.</p>
          <Link
            to="/contact"
            className="inline-block mt-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-full px-8 py-3 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
      <Footer />
    </PageWrapper>
  )
}
