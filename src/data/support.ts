export type SupportFaq = {
  q: string
  a: string
}

export type SupportTopic = {
  heading: string
  body: string[]
}

/** Crawlable support content — covers load/inject/spoofer/EAC SEO intents. */
export const SUPPORT_INTRO =
  'The Isle Cheats support for Evrima players on theislecheats.cc. Get help with how to load the isle cheats, inject the isle cheats, Undetected vs Updating status, the isle HWID spoofer, the isle cheats menu, setup, config, and EAC the isle cheats questions after a patch.'

export const SUPPORT_TOPICS: SupportTopic[] = [
  {
    heading: 'Before you open a support request',
    body: [
      'Confirm you bought The Isle Cheats (theisle cheats / theislecheats) from theislecheats.cc — we only support this Isle-only product, not random isle cheats downloads from elsewhere.',
      'Check live status on the product page. If it says Updating, do not inject the isle cheats. Wait for Undetected the isle cheats again.',
      'Have your order email and the build name ready. That speeds up The Isle Cheats support after EAC patches.',
    ],
  },
  {
    heading: 'How to load The Isle Cheats',
    body: [
      'Close overlays that fight the loader. Start The Isle Evrima first.',
      'Run the official The Isle Cheats loader from your delivery email — not a reuploaded the isle cheats download.',
      'Wait for a clean inject. Open the isle cheats menu, enable Entity ESP / World ESP / the isle wallhack / the isle radar as needed.',
      'Turn on stream-proof if you capture. Leave aim assist off unless you specifically want it.',
    ],
  },
  {
    heading: 'HWID spoofer & ban recovery',
    body: [
      'Use the isle HWID spoofer only after a hardware ban, and only when Undetected status is live.',
      'Order: spoof → launch Evrima → inject The Isle Cheats → verify ESP. Spoofing into a detected build will not make EAC the isle cheats safe.',
    ],
  },
  {
    heading: 'What we support (and what we do not)',
    body: [
      'Supported: The Isle Evrima cheats builds we sell — ESP, wallhack, radar, overlay, spoofer, menu, setup, config, and status questions.',
      'The Isle Horde cheats help applies only when the current build lists Horde.',
      'Not supported: other games, cracked loaders, or “cheap the isle cheats” files from third-party mirrors.',
    ],
  },
]

export const SUPPORT_FAQS: SupportFaq[] = [
  {
    q: 'How do I contact The Isle Cheats support?',
    a: 'Buy or open your The Isle Cheats order on theislecheats.cc, then use the checkout support channel tied to your purchase. Include status screenshot (Undetected / Updating) and whether you need load, inject, or HWID spoofer help.',
  },
  {
    q: 'How to load the isle cheats after an Evrima patch?',
    a: 'Check Undetected status first. If Updating, wait. When Undetected, start The Isle, run the delivered loader, inject the isle cheats, then open the menu and enable ESP / wallhack.',
  },
  {
    q: 'Inject failed — what should I do?',
    a: 'Do not spam inject. Restart the game, disable conflicting overlays, re-check EAC the isle cheats status, then try one clean inject. If it still fails, contact support with your build ID.',
  },
  {
    q: 'Do you help with the isle cheats setup and config?',
    a: 'Yes. Default setup: Entity ESP on, World ESP on, the isle radar on, stream-proof if you record, HWID spoofer only after a ban. We can walk menu toggles for private the isle cheats builds we sell.',
  },
  {
    q: 'Is aimbot required?',
    a: 'No. The Isle Cheats lead with ESP and wallhack. Aim assist is optional. Support focuses on awareness features and safe load steps.',
  },
  {
    q: 'Where is the the isle cheats download?',
    a: 'Delivery is instant after checkout on theislecheats.cc. Use only that the isle cheats download / loader link. Third-party mirrors are unsupported and unsafe.',
  },
]
