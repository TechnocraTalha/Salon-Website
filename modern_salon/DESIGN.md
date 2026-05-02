---
name: Modern Salon
colors:
  surface: '#fafaf5'
  surface-dim: '#dadad5'
  surface-bright: '#fafaf5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f4ef'
  surface-container: '#eeeee9'
  surface-container-high: '#e8e8e3'
  surface-container-highest: '#e3e3de'
  on-surface: '#1a1c19'
  on-surface-variant: '#444748'
  inverse-surface: '#2f312e'
  inverse-on-surface: '#f1f1ec'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#775a19'
  on-secondary: '#ffffff'
  secondary-container: '#fed488'
  on-secondary-container: '#785a1a'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#231915'
  on-tertiary-container: '#91807a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474746'
  secondary-fixed: '#ffdea5'
  secondary-fixed-dim: '#e9c176'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5d4201'
  tertiary-fixed: '#f2ded7'
  tertiary-fixed-dim: '#d6c3bc'
  on-tertiary-fixed: '#231915'
  on-tertiary-fixed-variant: '#51443f'
  background: '#fafaf5'
  on-background: '#1a1c19'
  surface-variant: '#e3e3de'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '400'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0.01em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.1em
  button:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-page: 64px
  section-padding: 120px
---

## Brand & Style

The design system is rooted in the "Quiet Luxury" aesthetic, prioritizing an atmosphere of serenity, exclusivity, and meticulous attention to detail. It is designed to evoke the feeling of entering a high-end sanctuary where time slows down. The style leverages **Minimalism** as its foundation—utilizing expansive whitespace to signify premium value—while incorporating subtle **Glassmorphism** and **Tactile** accents to provide depth and a sense of physical texture.

The brand personality is sophisticated and confident, avoiding trendy clutter in favor of timeless elegance. The target audience is a discerning clientele that values discretion, quality, and a personalized experience.

## Colors

The palette is a sophisticated blend of organic warmth and authoritative contrast. 
- **Soft Beige (#F5F5F0)**: Acts as the primary canvas, providing a warmer, more inviting alternative to pure white.
- **Matte Black (#1A1A1A)**: Used for primary typography and structural elements, providing a grounded, modern edge.
- **Taupe (#8D7D77)**: Serves as a secondary bridge color for UI elements like borders, secondary text, and disabled states.
- **Champagne Gold (#C5A059)**: Reserved strictly for highlights, call-to-actions, and premium indicators, conveying a sense of prestige.

Color application should follow a 60-30-10 rule to maintain visual breathing room.

## Typography

Typography in this design system creates an editorial rhythm. **Playfair Display** (represented by the Noto Serif style) is used for all headlines to provide a literary, high-fashion character. It should be set with tight letter-spacing in larger sizes to emphasize its elegant ligatures.

**Inter** provides a functional counterpoint. It is used for all body copy, navigation, and labels to ensure maximum legibility and a contemporary, "technical" cleanliness. Uppercase labels with generous tracking (letter spacing) are used to denote categories and small headers, creating an organized, architectural feel.

## Layout & Spacing

The layout philosophy is centered on a **Fixed Grid** model that mimics the composition of a luxury lookbook. A 12-column grid is used for desktop, but the layout is characterized by "intentional emptiness." Large section paddings (120px+) are used to separate service categories, allowing each offering to feel distinct and significant.

Alignment is strictly centered for hero sections and left-aligned for content-heavy pages. Asymmetry can be used in image-heavy layouts to create a modern, curated editorial feel.

## Elevation & Depth

Hierarchy is achieved through **Tonal Layers** and **Low-Contrast Outlines** rather than heavy shadows. 
- **Surface Depth:** The primary background is Soft Beige. Secondary surfaces (like cards or modals) use a slightly lighter tint or a matte-frosted backdrop blur.
- **Shadows:** When necessary, shadows must be extremely diffused and low-opacity (e.g., 4% opacity black with a 40px blur), appearing more like a natural ambient occlusion than a digital drop shadow.
- **Borders:** Ultra-fine 1px borders in Taupe or a 0.5px Champagne Gold line are used to define boundaries without adding visual weight.

## Shapes

The shape language is precise and disciplined. This design system uses **Soft (0.25rem)** roundedness to take the "edge" off while maintaining a formal, structured appearance. 

Images and primary containers should maintain sharp or very slightly softened corners to reflect the precision of high-end styling. Circles are used exclusively for user avatars or decorative elements to provide a soft contrast to the otherwise rectangular grid.

## Components

- **Buttons:** Primary buttons are Matte Black with white Inter-Medium caps. Secondary buttons use a Champagne Gold 1px border with no fill. Hover states should involve a subtle transition to a Taupe background or a slight increase in letter spacing.
- **Inputs:** Text fields are minimalist, consisting of a single bottom border (1px Taupe) that turns Champagne Gold upon focus. Labels are positioned above in `label-caps`.
- **Cards:** Cards for services or products are borderless, using whitespace and subtle background shifts (Soft Beige to slightly lighter cream) to define their area.
- **Chips/Tags:** Used for service categories (e.g., "Hair," "Nails"), these should be small, capitalized, and have a faint Taupe outline.
- **Additional Components:**
    - **Booking Calendar:** A custom, clean interface using the Inter typeface, emphasizing clarity and ease of use.
    - **Service Menu:** An editorial-style list with Playfair Display titles and Inter price labels, separated by thin, elegant lines.
    - **Testimonial Carousel:** Minimalist text-focused slides with large quotation marks in faint Champagne Gold.