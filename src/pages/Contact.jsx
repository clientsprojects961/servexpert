import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import Footer from '../components/Footer'
import { Check, Calendar, Clock } from 'lucide-react'
import emailjs from '@emailjs/browser'

const services = [
  'Performance marketing',
  'SEO & content',
  'Website & landing pages',
  'Web & mobile apps',
  'Chatbots & automation',
  'Full growth program',
]
const budgets = ['< $500/mo', '$500 – $1,500/mo', '$1,500 – $5,000/mo', '$5,000+/mo', 'Project-based']
const timeSlots = ['9:00 AM', '10:30 AM', '12:00 PM', '2:00 PM', '3:30 PM', '5:00 PM']
const days = ['Mon, Apr 14', 'Tue, Apr 15', 'Wed, Apr 16', 'Thu, Apr 17', 'Fri, Apr 18']

const EMAILJS_SERVICE = 'service_6fib62j'
const EMAILJS_TEMPLATE = 'template_bdec71t'
const EMAILJS_KEY = '0Sjwm8yXS2tEBWDFA'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [selectedDay, setSelectedDay] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const successRef = useRef(null)
  const formRef = useRef(null)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')

    if (selectedDay === null || selectedTime === null) {
      setSubmitError('Please choose a day and time for your strategy call.')
      return
    }

    setSubmitting(true)
    try {
      await emailjs.send(
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE,
        {
          name: form.name,
          phone: form.phone,
          email: form.email,
          company: form.company,
          service: form.service,
          budget: form.budget,
          message: form.message,
          call_date: days[selectedDay],
          call_time: timeSlots[selectedTime],
        },
        { publicKey: EMAILJS_KEY }
      )
      setSubmitted(true)
    } catch {
      setSubmitError('Something went wrong. Please try again in a moment.')
    } finally {
      setSubmitting(false)
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (submitted && successRef.current) {
        gsap.fromTo(
          successRef.current,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
        )
      }
    }, formRef)
    return () => ctx.revert()
  }, [submitted])

  return (
    <main>
      <section className="relative px-8 pb-16 pt-44 text-center md:px-16" style={{ background: '#0D1210' }}>
        <div className="mx-auto max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-brand-gold">Get in Touch</span>
          <h1 className="mt-3 font-display text-[5rem] italic leading-none text-brand-cream md:text-[8rem]">
            Let&apos;s<br />
            Talk.
          </h1>
          <p className="mt-4 font-body text-base text-brand-cream/50">
            Book a strategy call with our team. Share a few details — we&apos;ll confirm your slot and follow up by
            email.
          </p>
        </div>
      </section>

      <section className="section-padding bg-brand-cream">
        <div className="mx-auto max-w-7xl">
          {!submitted ? (
            <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
              <div className="space-y-8">
                <h2 className="font-heading text-3xl font-bold text-brand-text">Your details</h2>

                <div>
                  <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-brand-sage">Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full name"
                    className="w-full border-b border-brand-green/20 bg-transparent pb-3 font-body text-brand-text outline-none transition-colors focus:border-brand-gold"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-brand-sage">Phone</label>
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 9XXXXXXXXX"
                    className="w-full border-b border-brand-green/20 bg-transparent pb-3 font-body text-brand-text outline-none transition-colors focus:border-brand-gold"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-brand-sage">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    className="w-full border-b border-brand-green/20 bg-transparent pb-3 font-body text-brand-text outline-none transition-colors focus:border-brand-gold"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-brand-sage">Company</label>
                  <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Company or brand"
                    className="w-full border-b border-brand-green/20 bg-transparent pb-3 font-body text-brand-text outline-none transition-colors focus:border-brand-gold"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-brand-sage">
                    Service needed
                  </label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="w-full appearance-none border-b border-brand-green/20 bg-transparent pb-3 font-body text-brand-text outline-none focus:border-brand-gold"
                    required
                  >
                    <option value="">Select</option>
                    {services.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-brand-sage">
                    Budget range
                  </label>
                  <select
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    className="w-full appearance-none border-b border-brand-green/20 bg-transparent pb-3 font-body text-brand-text outline-none focus:border-brand-gold"
                  >
                    <option value="">Optional</option>
                    {budgets.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-brand-sage">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Goals, timeline, links…"
                    rows={4}
                    className="w-full resize-none border-b border-brand-green/20 bg-transparent pb-3 font-body text-brand-text outline-none focus:border-brand-gold"
                  />
                </div>
              </div>

              <div>
                <h2 className="mb-10 font-heading text-3xl font-bold text-brand-text">Pick a call slot</h2>
                <div className="rounded-4xl bg-brand-dark p-8 text-brand-cream">
                  <div className="mb-8 flex items-center gap-4 border-b border-brand-cream/10 pb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-green">
                      <Calendar size={20} className="text-brand-gold" />
                    </div>
                    <div>
                      <p className="font-heading text-lg font-bold">Strategy call</p>
                      <div className="mt-0.5 flex items-center gap-2">
                        <Clock size={12} className="text-brand-gold" />
                        <span className="font-mono text-xs text-brand-cream/50">30 minutes · Senior strategist · Free</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="mb-3 font-mono text-xs uppercase tracking-widest text-brand-cream/40">Select a day</p>
                    <div className="grid grid-cols-3 gap-2">
                      {days.map((day, i) => (
                        <button
                          key={day}
                          type="button"
                          onClick={() => setSelectedDay(i)}
                          className={`rounded-2xl px-2 py-3 text-center font-mono text-xs transition-all ${
                            selectedDay === i
                              ? 'bg-brand-gold text-brand-dark'
                              : 'bg-brand-cream/5 text-brand-cream/60 hover:bg-brand-cream/10'
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>

                  {selectedDay !== null && (
                    <div className="mb-6">
                      <p className="mb-3 font-mono text-xs uppercase tracking-widest text-brand-cream/40">Select a time</p>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((time, i) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTime(i)}
                            className={`rounded-2xl py-3 font-mono text-xs transition-all ${
                              selectedTime === i
                                ? 'bg-brand-gold text-brand-dark'
                                : 'bg-brand-cream/5 text-brand-cream/60 hover:bg-brand-cream/10'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <p className="text-center font-mono text-xs text-brand-cream/25">
                    {selectedDay !== null && selectedTime !== null
                      ? `${days[selectedDay]} · ${timeSlots[selectedTime]}`
                      : 'Choose day & time — then use Book a call below'}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-2">
                {submitError && <p className="mb-4 font-body text-sm text-red-700">{submitError}</p>}
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-magnetic relative w-full overflow-hidden rounded-full bg-brand-green py-4 font-heading text-base font-bold text-brand-gold"
                >
                  <span className="btn-slide" />
                  <span className="btn-text">{submitting ? 'Booking…' : 'Book a call'}</span>
                </button>
              </div>
            </form>
          ) : (
            <div ref={successRef} className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-brand-green">
                <Check size={36} className="text-brand-gold" />
              </div>
              <h3 className="mb-3 font-heading text-3xl font-bold text-brand-text">You&apos;re booked in.</h3>
              <p className="max-w-md font-body text-brand-sage">
                Our team will confirm your call by email shortly. If you don&apos;t see it, check spam or reach out via
                the same address you used.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
