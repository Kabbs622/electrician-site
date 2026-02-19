# Utah County Electrician Website

A high-converting, mobile-first website template for an electrician serving Utah County. Built with vanilla HTML, CSS, and JavaScript - no frameworks, no dependencies.

## Features

- **Mobile-First Design** - Optimized for the 70%+ of users who will visit on mobile
- **Fast Loading** - No external frameworks, inline critical CSS, lazy-loaded images
- **SEO Optimized** - Local business schema, meta tags, Google-friendly markup
- **Conversion Focused** - Click-to-call buttons, prominent CTAs, emergency banner
- **Accessibility** - ARIA labels, semantic HTML, keyboard navigation

## Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Semantic markup |
| CSS3 | Custom properties, Grid, Flexbox |
| Vanilla JS | ES6+ class-based architecture |
| Google Fonts | DM Sans typography |
| Unsplash | Stock photography (replace with real photos) |
| FormSubmit.co | Contact form handling (free, no backend needed) |

## Quick Start

```bash
# Serve locally (any method works)
python -m http.server 8000
# OR
npx http-server
# OR simply open index.html in browser

# Open http://localhost:8000
```

## Customization Checklist

### Before Launch - Critical

- [ ] **Replace placeholder content**
  - [ ] Company name (search for `[Your Electric Co.]`)
  - [ ] Phone number (search for `801-555-0123`)
  - [ ] Address (search for `123 Electric Ave, Provo`)
  - [ ] License number (search for `UT-123456`)
  - [ ] Years of experience

- [ ] **Update form endpoint**
  - Current: `action="https://formsubmit.co/kabbott622@gmail.com"`
  - Change to client's email in the contact form section

- [ ] **Replace images**
  - All images are from Unsplash - replace with real photos of:
    - Actual completed work
    - Team/electrician
    - Company vehicles
    - Before/after shots

- [ ] **Set up hosting**
  - GitHub Pages (free)
  - Netlify (free tier)
  - Traditional hosting

### SEO & Marketing

- [ ] **Google Business Profile** - Create/claim listing
- [ ] **Analytics** - Add Google Analytics or Plausible
- [ ] **Search Console** - Submit sitemap
- [ ] **Local citations** - Add to Yelp, Angi, HomeAdvisor

### Optional Enhancements

- [ ] Add real customer reviews (currently template text)
- [ ] Set up business email (not Gmail)
- [ ] Add chat widget (Tidio, Intercom free tier)
- [ ] Create service area pages for each city

## File Structure

```
electrician-site/
├── index.html          # Main page (all content inline)
├── styles.css          # All styles
├── main.js             # All JavaScript
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## Design System

### Colors
```css
--primary: #0a4cff;           /* Electric blue - trust/professional */
--primary-dark: #0039cc;
--accent: #ff6b00;            /* Orange - urgency/emergency */
--warning: #dc2626;           /* Red - emergency banner */
--dark: #0f172a;              /* Navy - text/backgrounds */
--gray-50: #f8fafc;           /* Light backgrounds */
```

### Typography
- **Primary**: DM Sans (Google Fonts)
- **Weights**: 400 (body), 500 (medium), 700 (bold)

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## JavaScript Features

The site uses a class-based architecture (`ElectricianSite` class) that provides:

1. **Mobile menu toggle** with smooth animations
2. **Smooth scroll** navigation with header offset
3. **FAQ accordion** with single-item-open behavior
4. **Form validation** with visual feedback
5. **Phone formatting** auto-formats as (XXX) XXX-XXXX
6. **Scroll animations** via IntersectionObserver
7. **Lazy loading** for images
8. **Toast notifications** for user feedback

## Performance

- **No build step required** - Ready to deploy as-is
- **No external JS frameworks** - Lightweight vanilla JS
- **CSS custom properties** - Efficient theming
- **Passive event listeners** - Better scroll performance
- **Intersection Observer** - Efficient scroll detection

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile Safari (iOS 14+)
- Chrome Mobile (latest)

## Deployment Options

### GitHub Pages (Free)
1. Push to GitHub repo
2. Settings → Pages → Deploy from branch
3. Select `main` branch

### Netlify (Free)
1. Drag and drop folder
2. Or connect Git repo for auto-deploy

### Traditional Hosting
1. Upload all files via FTP
2. Point domain to folder

## Legal/Compliance Notes

- [ ] Verify license number is real
- [ ] Add privacy policy (required for contact forms)
- [ ] Add terms of service
- [ ] Ensure insurance info is accurate

## Credits

- Icons: Material Design Icons (via inline SVG)
- Photos: Unsplash (must be replaced with real photos)
- Form handling: FormSubmit.co

## Questions for Kyle

1. What's the actual business name?
2. What's the real phone number?
3. Do you have real photos of electrical work?
4. What's the license number?
5. What's the actual service area (all of Utah County or specific cities)?
6. Any specific services to emphasize or de-emphasize?

---

*Template built for local electrician lead generation. Mobile-first, conversion-optimized, ready to customize.*
