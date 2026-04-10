const digits =
  import.meta.env.VITE_WHATSAPP_E164?.replace(/\D/g, '') || '919473315961'

export default function FloatingWhatsApp() {
  const href = digits ? `https://wa.me/${digits}` : 'https://wa.me/'

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-fab fixed bottom-6 right-6 z-[9990] flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] p-2 shadow-brand-xl ring-2 ring-white/30 transition-transform duration-300 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold md:bottom-8 md:right-8"
      aria-label="Chat on WhatsApp"
    >
      <span className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-[#25D366]">
        <img
          src="/wplogo.jpg"
          alt=""
          className="max-h-full max-w-full object-contain object-center"
          width={52}
          height={52}
          loading="lazy"
          decoding="async"
        />
      </span>
    </a>
  )
}
