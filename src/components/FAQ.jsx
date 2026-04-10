import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: 'Who actually does the work?',
    a: 'Named practice leads and senior specialists own delivery end to end. We do not disappear behind account layers — you work with the people building the work, backed by QA, documentation, and clear escalation paths.',
  },
  {
    q: 'How is this different from a traditional agency?',
    a: 'Traditional shops often bury you in process and junior bench. We run lean pods with senior talent, modern tooling, and AI where it actually saves time — so you get agency-grade output with clearer communication and fewer layers.',
  },
  {
    q: 'What does AI-powered mean in practice?',
    a: 'We use AI for research, drafts, data analysis, and workflow automation — paired with human strategy, editing, and code review. You get speed where it is safe and judgment where it matters.',
  },
  {
    q: 'How fast can you start?',
    a: 'Most projects kick off within 72 hours of the initial call. We run a quick audit first, then move into execution immediately.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Monthly retainers are flexible. No long-term contracts forced on you. We earn your retention every single month.',
  },
  {
    q: 'Why are your prices lower than agencies?',
    a: 'No office. No overhead. No account managers. We pass the savings to you. As our client base and credibility grow, prices will increase — but early clients keep their rates.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)
  const answerRefs = useRef([])
  const sectionRef = useRef(null)

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      answerRefs.current.forEach((el, i) => {
        if (!el) return
        if (i === openIndex) {
          gsap.fromTo(
            el,
            { height: 0, opacity: 0 },
            { height: 'auto', opacity: 1, duration: 0.45, ease: 'power2.out' }
          )
        } else {
          gsap.to(el, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.in' })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [openIndex])

  return (
    <section ref={sectionRef} className="section-padding bg-brand-cream">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-14 text-center">
          <span className="font-mono text-xs tracking-[0.2em] text-brand-sage uppercase">Clarity</span>
          <h2 className="font-display italic text-5xl md:text-6xl text-brand-text mt-3">
            Good questions.
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`border rounded-3xl overflow-hidden transition-all duration-300 ${
                openIndex === i
                  ? 'border-brand-green/30 shadow-brand'
                  : 'border-brand-green/10'
              }`}
            >
              <button
                className="w-full flex items-center justify-between gap-6 px-7 py-5 text-left"
                onClick={() => toggle(i)}
              >
                <span className={`font-heading font-semibold text-base md:text-lg ${
                  openIndex === i ? 'text-brand-green' : 'text-brand-text'
                }`}>
                  {faq.q}
                </span>
                <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  openIndex === i ? 'bg-brand-green text-brand-gold' : 'bg-brand-green/10 text-brand-green'
                }`}>
                  {openIndex === i ? <Minus size={14} /> : <Plus size={14} />}
                </span>
              </button>

              <div
                ref={(el) => (answerRefs.current[i] = el)}
                style={{ height: 0, overflow: 'hidden', opacity: 0 }}
              >
                <div className="px-7 pb-6">
                  <p className="font-body text-sm text-brand-sage leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
