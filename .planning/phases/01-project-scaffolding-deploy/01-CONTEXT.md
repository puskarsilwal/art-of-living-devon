# Phase 1: Project Scaffolding & Deploy - Context

**Gathered:** 2026-02-24
**Status:** Ready for planning

<domain>
## Phase Boundary

Scaffold a Next.js 16 project with Tailwind CSS 4 and shadcn/ui, deploy to Vercel free tier (*.vercel.app), and create a UK GDPR/PECR compliant privacy policy page at /privacy-policy. This phase delivers the working foundation that all subsequent pages build on.

</domain>

<decisions>
## Implementation Decisions

### Design foundation
- Art of Living official branding: white and orange primary palette, peaceful imagery aesthetic
- Devon/Southwest local warmth — approachable community feel, not corporate
- Tailwind theme configured with brand colors and typography so future phases inherit the system
- shadcn/ui components themed to match Art of Living look and feel

### Privacy policy
- UK GDPR and PECR compliant
- Covers: name/email/phone collection, Brevo email processing, Meta Pixel tracking, Google Analytics, cookie usage
- Plain English tone — accessible to general audience, not legalese-heavy
- Hosted at /privacy-policy, linked from all future registration forms

### Shared layout
- Clean, minimal site shell — header and footer ready for navigation as pages are added in later phases
- Mobile-first (Facebook ad traffic is 80%+ mobile per requirements)
- No navigation distractions on landing pages (landing pages will use their own minimal layout)

### Claude's Discretion
- Exact color hex values and typography choices (within Art of Living brand guidelines)
- Folder/component structure and naming conventions
- shadcn/ui component selection and theme customization approach
- Privacy policy exact wording and section structure
- Header/footer design and content
- Build tooling configuration

</decisions>

<specifics>
## Specific Ideas

- Branding reference: Art of Living official look (white, orange, peaceful imagery) blended with Devon/Southwest local warmth (HOME-04)
- The site primarily serves Facebook ad traffic arriving on mobile — performance and mobile UX are paramount
- Vercel free tier deployment — no custom domain initially (*.vercel.app)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-project-scaffolding-deploy*
*Context gathered: 2026-02-24*
