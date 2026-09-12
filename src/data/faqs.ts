export type FaqItem = {
  q: string
  a: string
}

/** Master FAQ set — visible on /faq and reused in sections. Google indexes matching HTML + FAQPage schema. */
export const SITE_FAQS: FaqItem[] = [
  {
    q: 'What are The Isle Cheats?',
    a: 'The Isle Cheats are tools for The Isle Evrima on theislecheats.cc — mainly Entity ESP, World ESP, wallhack, radar, and HWID spoofer — with live Undetected or Updating status after patches.',
  },
  {
    q: 'Do you cover other games?',
    a: 'No. theislecheats.cc is focused on The Isle Cheats only. No filler catalog of unrelated titles.',
  },
  {
    q: 'Is aimbot the main feature?',
    a: 'No. Aim assist is optional. Most players come for The Isle ESP, wallhack, radar, and HWID spoofer.',
  },
  {
    q: 'Are The Isle Cheats undetected against EAC?',
    a: 'We mark live Undetected or Updating status after The Isle / Easy Anti-Cheat updates. Always check status on theislecheats.cc before you inject — never trust week-old Discord screenshots.',
  },
  {
    q: 'What features are included?',
    a: 'Entity ESP / wallhack, World ESP, radar, HWID spoofer, stream-proof, and optional aim assist — focused on The Isle only.',
  },
  {
    q: 'Do you support Evrima and Horde?',
    a: 'Yes — The Isle Cheats target Evrima first. Horde support is listed when the current build includes it. Legacy is called out separately if available.',
  },
  {
    q: 'How do I buy The Isle Cheats?',
    a: 'Open the The Isle Cheats product page, confirm Undetected status, review ESP/radar features, then checkout for instant loader delivery. Support is available after patches.',
  },
  {
    q: 'How to load / inject The Isle Cheats?',
    a: 'Start The Isle Evrima, run the delivered loader, wait for a clean inject, then open the menu and enable ESP / wallhack. If status is Updating, wait — do not force inject.',
  },
  {
    q: 'Do I need a HWID spoofer?',
    a: 'Only if you already have a hardware ban. Spoof first, then load The Isle Cheats when status is Undetected. Spoofing into a detected build does nothing useful.',
  },
  {
    q: 'Where do I get The Isle Cheats support?',
    a: 'Use the Support page on theislecheats.cc and your checkout order channel. Include Undetected/Updating status and whether you need load, inject, or spoofer help.',
  },
  {
    q: 'Where can I read The Isle Cheats reviews?',
    a: 'Player reviews with ratings are on the Reviews page. They cover ESP accuracy, Undetected honesty, and patch survival before you buy.',
  },
  {
    q: 'Is this the official The Isle game site?',
    a: 'No. We sell The Isle Cheats only. Play the game from the official Survive The Isle website or The Isle on Steam. We are not affiliated with Afterthought LLC.',
  },
]

export const HOME_FAQS: FaqItem[] = SITE_FAQS.slice(0, 4)

export const PRODUCT_PAGE_FAQS: FaqItem[] = [
  SITE_FAQS[3],
  SITE_FAQS[4],
  SITE_FAQS[5],
  SITE_FAQS[6],
  SITE_FAQS[8],
]
