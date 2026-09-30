---
version: alpha
name: El Rey Del Panini
description: Retro Italian deli identity taken from the printed menu, the green awning and the chef's-kiss king logo.
colors:
  primary: "#465E46"
  on-primary: "#EEE9CB"
  primary-deep: "#33452F"
  secondary: "#992637"
  on-secondary: "#EEE9CB"
  brick: "#8B4141"
  background: "#EEE9CB"
  surface: "#F5F1DC"
  surface-muted: "#E3DCB8"
  text: "#2C3A28"
  text-soft: "#4A5943"
typography:
  display:
    fontFamily: Fraunces
    fontSize: 94px
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: -0.015em
  h2:
    fontFamily: Fraunces
    fontSize: 64px
    fontWeight: 900
    lineHeight: 1
    letterSpacing: -0.015em
  item-name:
    fontFamily: Fira Sans Condensed
    fontSize: 28px
    fontWeight: 800
    lineHeight: 1.05
  body:
    fontFamily: Fira Sans
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: Fira Sans Condensed
    fontSize: 18px
    fontWeight: 700
    lineHeight: 1.2
rounded:
  control: 14px
  card: 16px
  pill: 999px
spacing:
  xs: 8px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 96px
  section: 140px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.control}"
    typography: "{typography.label}"
    height: 52px
    padding: 24px
  button-primary-hover:
    backgroundColor: "{colors.primary-deep}"
    textColor: "{colors.on-primary}"
  menu-tab:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.control}"
    height: 48px
  menu-tab-hover:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.primary}"
  nav-wordmark:
    textColor: "{colors.brick}"
    typography: "{typography.h2}"
  lead:
    textColor: "{colors.text-soft}"
    typography: "{typography.body}"
  menu-tab-selected:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
  promo-card:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.card}"
    padding: 20px
  badge:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-secondary}"
    rounded: "{rounded.pill}"
  topping-chip:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text}"
    rounded: "{rounded.pill}"
    padding: 8px
  footer:
    backgroundColor: "{colors.primary-deep}"
    textColor: "{colors.on-primary}"
---

## Overview

The site dresses like the stand itself. Everything comes from three real objects: the printed menu (cream paper, green header pills, red and cream gingham borders), the storefront (green awning with cream lettering, wood paneling) and the logo of a crowned king doing the chef's kiss. The animated logo is the hero and moves on its own (the kiss loop), with the pointer (3D tilt), and with scroll (it shrinks toward the nav, where a small logo docks). Light theme only: the brand is cream paper and does not have a night version.

## Colors

- **Bottle Green (primary, #465E46):** menu header pills, buttons, the "Así se arma" block, icons that need weight. Cream on green passes 5.7:1.
- **Deep Green (#33452F):** hover state and footer.
- **Gingham Red (secondary, #992637):** the checkered borders, the rotating badge, menu sub-headings, the "Viernes y sábados" line. Use for one or two moments per screen.
- **Brick (#8B4141):** only for the wordmark color in the nav and the emphasized word in the hero, matching the logo lettering.
- **Cream (background, #EEE9CB) and Paper (surface, #F5F1DC):** page ground and the menu section.
- **Ink (text, #2C3A28):** body copy. Never pure black or gray.

## Typography

- **Fraunces 900 with SOFT 100, WONK 0** stands in for the Cooper-style lettering of the logo and menu pills. Used for display, section titles, tabs, buttons and the ticker.
- **Fira Sans Condensed ExtraBold Italic, uppercase** for dish names and short labels, as on the printed menu.
- **Fira Sans Regular** for descriptions and body.
- Tracking floor -0.015em on display. Body measure stays under 46ch.

## Layout

Max content width 1320px with a fluid gutter (16px to 48px). Sections alternate density: airy hero, dense ticker, photo pair, green bento, dense menu, open location band, staggered Instagram strip. Multi-column layouts collapse to one column below 860px; the menu tabs become a horizontal snap row.

## Elevation & Depth

Depth comes from soft, green-tinted shadows with a real offset (for example `0 30px 50px -30px rgb(51 69 47 / .55)`), never black. The logo carries a drop shadow so it sits above the paper. No glass except the nav backdrop blur.

## Shapes

- Controls (buttons, tabs): 14px radius, like the menu pills.
- Photos and cards: 16px radius.
- Pills only for small chips and the round badge.
- The gingham strip (24px checker of red and paper) marks section edges, like the printed menu.

## Components

- **Buttons:** solid green with cream Fraunces label, or green outline. One label per intent: "Ver la carta", "Cómo llegar", "@elreydelpanini".
- **Menu tabs:** outlined green pills; the selected tab fills green. Arrow keys move between tabs.
- **Promo card:** green card with an inner cream hairline border, copied from the Aperol promo on the printed menu.
- **Badge:** red circle with rotating "Autentici panini italiani" text and a crown.
- **Ticker:** one green marquee band, slightly rotated, with crown separators. Only one per page.

## Do's and Don'ts

- Do take every fact (dishes, hours, address, promo price) from the brand's own Instagram. Do not invent prices, reviews or a founding story.
- Do keep the logo animated and moving; fall back to the animated WebP on Safari and to the still logo under reduced motion.
- Do use gingham only as a border strip, never as a full background.
- Don't add new accent colors: green, red and cream are the whole palette.
- Don't use em-dashes or eyebrow labels above headings.
