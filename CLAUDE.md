# CLAUDE.md — AI Assistant Guide for Fantarose Project

> This file provides context and conventions for AI assistants (Claude, etc.) working on this repository.

---

## Project Overview

**판타로즈 (Fantarose)** is a dual-purpose repository:

1. **IP Planning Hub** — Markdown documentation for a city-pop healing short-form animation IP featuring three animal characters.
2. **Tarot Web App** (`tarot-app/`) — A Next.js interactive tarot card reading web app tied to the Fantarose universe.

The project is primarily in **Korean**, targeting a 10–20s female audience on Instagram Reels, YouTube Shorts, and TikTok.

---

## Repository Structure

```
project/
├── CLAUDE.md                      # This file
├── README.md                      # Project overview (Korean)
├── .claude/
│   └── commands/                  # Custom Claude Code slash commands
│       ├── character.md           # /character — character design skill
│       ├── ip-plan.md             # /ip-plan   — IP planning & market analysis
│       ├── shortform.md           # /shortform — SNS short-form strategy
│       └── story.md               # /story     — story structure design
└── fantarose/                     # IP planning documents
│   ├── 01_planning/
│   │   ├── 00_master_plan_v1.md   # Full IP master plan
│   │   ├── 04_tarot_system_v1.md  # Tarot system & web app design
│   │   └── 06_monetization_v1.md  # Monetization roadmap
│   ├── 02_creative/
│   │   ├── 01_character_v1.md     # Character design (Lati/Lumi/Pipi)
│   │   └── 05_brand_identity_v1.md# Brand colors & visual guide
│   ├── 03_content/
│   │   ├── 02_episode_v1.md       # Episode guide (22 Major Arcana)
│   │   └── 07_script_ep0.md       # Pilot script — EP.0 The Fool
│   ├── 04_marketing/
│   │   └── 03_sns_strategy_v1.md  # SNS launch strategy & calendar
│   └── 05_web_app/
│       └── index.html             # Static HTML prototype (legacy)
└── tarot-app/                     # Next.js tarot web app
    ├── app/
    │   ├── layout.tsx             # Root layout
    │   ├── page.tsx               # Main page (multi-step state machine)
    │   └── globals.css            # Global styles & custom CSS classes
    ├── components/
    │   ├── CardDraw.tsx           # Card drawing animation step
    │   ├── CardResult.tsx         # Result display with share/save
    │   ├── CharacterSelect.tsx    # Character selection screen
    │   ├── SpreadSelect.tsx       # Spread mode selection (single/triple)
    │   └── StarlightBg.tsx        # Animated starfield background
    ├── lib/
    │   └── tarotData.ts           # All tarot card data + game logic
    ├── tailwind.config.ts         # Design tokens & custom animations
    ├── next.config.ts
    ├── tsconfig.json
    └── package.json
```

---

## Tarot App (`tarot-app/`)

### Tech Stack

| Tool | Version | Purpose |
|------|---------|--------|
| Next.js | ^16 | App Router, SSR/SSG |
| React | ^19 | UI |
| TypeScript | ^5.9 | Type safety |
| Tailwind CSS | ^4 | Styling |
| Framer Motion | ^12 | Animations |
| html2canvas | ^1.4 | Card result screenshot/share |

### Development Commands

```bash
# Run from tarot-app/ directory
cd tarot-app

npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
```

### App Flow (State Machine)

The main page (`app/page.tsx`) manages a linear multi-step flow via a `Step` type:

```
home → character → spread → draw → result → (reset to home)
```

| Step | Component | Description |
|------|-----------|-------------|
| `home` | inline in page.tsx | Title screen with character preview |
| `character` | `CharacterSelect` | Choose Lati / Lumi / Pipi |
| `spread` | `SpreadSelect` | Choose single (1 card) or triple (3 cards) |
| `draw` | `CardDraw` | Animated card reveal |
| `result` | `CardResult` | Show reading + share/save option |

### Key Data Layer (`lib/tarotData.ts`)

- Exports `characters` — object map of all 3 characters with id, name, emoji, color, description
- Exports `Character` type and `SpreadMode` type (`'single' | 'triple'`)
- Exports `drawCards(n)` — randomly draws n cards from the 22 Major Arcana
- Each tarot card has per-character interpretations (Lati / Lumi / Pipi voices)

### Design System

**Background color**: `#1A0F2E` (deep purple-black, `brand.bg` in Tailwind)

**Character colors:**

| Character | Korean | Color | Hex |
|-----------|--------|-------|-----|
| Lati 🐰 | 라티 | Coral | `#FFB3A7` |
| Lumi 🐱 | 루미 | Deep Purple | `#7B5EA7` |
| Pipi 🕊️ | 피피 | Cool Gray | `#9EA3B0` |

**Brand gold**: `#F4C875` — used for CTAs, titles, glows

**Custom CSS classes** (defined in `globals.css`):
- `.gradient-text-gold` — gold gradient text for titles
- `.glow-gold` — box-shadow gold glow effect
- `.animate-float-gentle` — gentle floating animation

**Custom Tailwind animations** (defined in `tailwind.config.ts`):
- `float` — vertical float loop (3s)
- `shimmer` — horizontal shimmer sweep (2s)
- `card-flip` — Y-axis card flip (0.6s)
- `sparkle` — opacity + scale pulse (1.5s)

### Component Conventions

- All components are **client components** (`'use client'`) — animations require browser APIs
- Use `framer-motion`'s `<AnimatePresence mode="wait">` for page transitions
- Each component receives `onBack` and/or `onSelect`/`onComplete` callback props
- Inline styles are used for character-specific dynamic colors (e.g., `char.color + '22'` for alpha tints)
- Prefer `motion.div` wrappers with `initial/animate/exit` for all visible UI elements

---

## Fantarose IP Documents (`fantarose/`)

### Document Naming Convention

```
[NN]_[topic]_v[version].md
```

- `NN` = two-digit index (00–09)
- `topic` = snake_case topic name
- `v1` = version suffix; increment when making significant revisions

**Examples**: `00_master_plan_v1.md`, `01_character_v1.md`, `07_script_ep0.md`

### Folder Organization

| Folder | Contains |
|--------|----------|
| `01_planning/` | Business strategy, tarot system design, monetization |
| `02_creative/` | Character sheets, brand identity, visual guides |
| `03_content/` | Episode scripts, content outlines |
| `04_marketing/` | SNS strategy, upload calendars, viral design |
| `05_web_app/` | Web app specs and static prototypes |

### Characters (캐릭터)

Always maintain consistency with established character traits:

**라티 (Lati)** 🐰
- Species: Rabbit
- Role: Florist
- Personality: Warm, expressive, emotional
- Color: Coral (`#FFB3A7`)
- Tarot voice: Gentle, comforting, hopeful

**루미 (Lumi)** 🐱
- Species: Cat
- Role: Film photographer
- Personality: Quiet, observational, artsy
- Color: Deep purple (`#7B5EA7`)
- Tarot voice: Poetic, introspective, melancholic

**피피 (Pipi)** 🕊️
- Species: Pigeon
- Role: World's greatest mystery — no dialogue, ever
- Personality: Deadpan, enigmatic, unexplained
- Color: Cool gray (`#9EA3B0`)
- Tarot voice: Cryptic, minimal, absurdist
- **IMPORTANT**: Pipi never speaks. No dialogue lines. Ever.

### Episode Structure

- Episodes are mapped 1-to-1 with the **22 Major Arcana** tarot cards (EP.0 The Fool → EP.21 The World)
- Tarot is **never mentioned** within an episode — it is only meta-context
- Each episode ends with a single **healing phrase** (힐링 문구), not dialogue
- Episodes are dialogue-light / silent animation style

---

## Custom Claude Commands (`.claude/commands/`)

These are project-specific slash commands available in Claude Code. Use them in order for a full IP creation workflow:

```
/ip-plan → /character → /story → /shortform
```

| Command | Purpose |
|---------|----------|
| `/ip-plan [idea]` | Market analysis, IP overview, execution plan, monetization roadmap |
| `/character [role/idea]` | Character design: appearance, inner life, relationships, SNS persona |
| `/story [character/premise]` | Story structure, conflict design, episode arc |
| `/shortform [IP/platform]` | SNS content calendar, viral hooks, platform-specific strategy |

When asked to help with IP planning or content creation for Fantarose, use these commands as the framework.

---

## Git Workflow

- **Main branch**: `master`
- **Feature branches**: `claude/<description>-<id>` (e.g., `claude/tarot-card-service-Rncha`)
- All changes should be developed on a feature branch and PRed into `master`
- `.DS_Store` files exist in the repo — do not modify or remove them unless asked

---

## Key Conventions for AI Assistants

1. **Language**: Most planning docs and UI copy are in Korean. Code is English. Maintain the existing language in whichever context you're editing.

2. **Document versioning**: When editing IP planning docs, update the `_v[N]` suffix if changes are substantial (e.g., `v1` → `v2`). Minor edits can stay on the same version.

3. **Character consistency**: Always cross-reference `fantarose/02_creative/01_character_v1.md` before writing any character dialogue, descriptions, or tarot interpretations.

4. **Pipi rule**: Pipi (피피) has **zero dialogue**. Do not write lines for Pipi under any circumstances.

5. **Tarot app styling**: Use the existing Tailwind custom tokens and animation classes before adding new CSS. Check `globals.css` and `tailwind.config.ts` first.

6. **No new dependencies** unless necessary — the stack is deliberately lean (Next.js + Framer Motion + Tailwind).

7. **App Router only**: `tarot-app` uses Next.js App Router (`app/` directory). Do not use `pages/` directory conventions.

8. **All components are client components**: The app has no server components at this time. Add `'use client'` to any new component files.

9. **Healing tone**: All content (UI copy, episode scripts, tarot readings) should maintain a warm, non-predictive, self-reflective tone. This is **not fortune-telling** — it is emotional healing.

10. **Brand tagline to honor**: *"보는 콘텐츠가 아니라 저장하고 싶은 콘텐츠"* — Content you want to save, not just watch.
