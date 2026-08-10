# Portfolio v2 — Applied AI Engineer

**Date:** 2026-08-10
**Owner:** Yasser Hegazy
**Branch:** `feat/portfolio-v2-ai-engineer`

## Goal

Re-position the existing portfolio from a freelance "backend-focused full-stack" identity to
an **Applied AI Engineer / Backend-First Full-Stack** identity looking for **full-time roles**,
with **WAKIB.ai** as the flagship achievement. Evolve — not replace — the strong existing
"Architect Amber / Mono" design system, and raise the visual bar so the page reads as the work
of a senior frontend/portfolio expert.

## Positioning

- Headline: **Applied AI Engineer · Backend-First Full-Stack** — building reliable AI products
  for **1,000+ daily users**.
- Remove all freelance / "available for freelance" language (and Mostaql/Upwork links).
  Replace with **"Open to full-time roles"** (Applied AI · Backend · AI Infrastructure), remote-friendly.
- Voice: outcome-first, content-expert copy. Every experience bullet embeds STAR
  (situation/task → action → measurable result).

## Visual direction (evolve the amber/mono system)

- **Type:** display = **Space Grotesk** (shares the Space Mono / JetBrains lineage → coheres with
  the terminal aesthetic while adding character over default Inter); utility/terminal = **JetBrains Mono**;
  body = **Inter**; Arabic = **IBM Plex Sans Arabic** (bilingual quality is part of the WAKIB story).
- **Palette:** keep warm near-black + amber-signal + sky-data; violet reserved for AI-pipeline nodes only.
- **Signature:** the **WAKIB.ai multi-agent pipeline** — an animated 2D diagram
  (Ingest → Cluster → Retrieve → Multi-Agent Generate → Verify → Publish → Media). Boldness spent in
  two disciplined places: the hero 3D system graph + this pipeline. Everything else stays quiet.
- Quality floor: responsive to mobile, visible keyboard focus, reduced-motion respected, both themes,
  both languages (LTR/RTL).

## Section flow

1. **Hero** — new H1/roles, "open to full-time" status, metrics band
   (1,000+ users · +18% API reliability · 30→80% coverage · 92.54 GPA/2nd), refreshed terminal + 3D graph.
2. **About** — AI-native narrative; reliability past the demo; full-time intent.
3. **Experience** (STAR): Teaching Assistant @ IUG · AI Product Engineer @ Alif ·
   Software Engineer @ Approved Technologies · Full-Stack Engineer @ TAQAT · Frontend Developer @ LearnMore.
4. **WAKIB.ai — flagship case study**: STAR narrative + animated pipeline signature + metric chips + stack.
5. **Projects** (3 flagships): BridgeAI · Raad · Azm Alinjaz. (Raad has no screenshot → designed
   generative brand visual.)
6. **AI capabilities** (AIWorkflow refresh): RAG & Retrieval · Multi-Agent Orchestration ·
   Self-Healing Pipelines · Evaluation & Safeguards.
7. **Skills** — AI-first order: AI/LLM · Backend · Languages · Frontend · Data · Practices · DevOps.
8. **Education + Leadership & Engagement**: degree (92.54/100 · 3.8/4.0 · ranked 2nd) + certs;
   new engagement block — Reach Education Fund (60+ hrs), TAP, IEEE-IUG, Team Lead.
9. **GitHub stats**.
10. **Contact** — full-time framing; email · phone · LinkedIn · GitHub · WhatsApp · location.

## Data / accuracy decisions

- Timeline reconciled to LinkedIn (authoritative): Approved Technologies = Oct 2025 – Jun 2026;
  Teaching Assistant + Alif both shown as *Present*.
- GPA shown as **92.54/100 · 3.8/4.0 · Ranked 2nd**.
- Projects dropped from featured: IbraAgent, Palestine Clinic (kept in TAQAT experience), Food Delivery, AutoMax.
- CV download keeps existing path `/cv/Yasser-Hegazy-CV.pdf` (file replaced later).
- Content updated in **both** `translations/en.ts` and `translations/ar.ts`
  (ar mirrors the en `TranslationType` exactly).
- Hero 3D graph data re-authored around the new project/AI set.

## Components

- **New:** `components/WakibCaseStudy.tsx`, `components/ui/PipelineFlow.tsx` (signature),
  `components/ui/ProjectVisual.tsx` (generative fallback for screenshot-less projects).
- **Reshaped:** Hero, About, Experience, Skills, AIWorkflow, Education, Projects, Navbar, Footer,
  Contact, FloatingActions, `app/layout.tsx` (fonts + metadata), `app/globals.css`, `tailwind.config.ts`,
  `components/three/graph-data.ts`, translations.

## Non-goals

- No backend/API changes beyond the contact form (already works).
- No new heavy 3D scenes (pipeline is lightweight SVG/CSS/Framer Motion).
- No unrelated refactors.

## Verification

- `next build` passes, `next lint` clean.
- Browser verification (Playwright) at mobile (390), tablet (768), desktop (1440) in both
  light/dark and en/ar — screenshots reviewed before declaring done.
