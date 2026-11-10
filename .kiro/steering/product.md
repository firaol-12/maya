# Product Overview

## What is Maya?

Maya is an e-commerce platform where shoppers virtually try on products using their webcam before buying. Every product has an interactive 3D model, and the platform tracks both inner and outer ads so sellers can see which campaigns lead to purchases made after a try-on.

## Context

**Hackathon:** Kiroween 2026 — Frankenstein category
The "Frankenstein" concept combines four normally separate domains into one coherent app: e-commerce, real-time 3D rendering, in-browser AI face tracking, and ad attribution analytics.

## Goals

- Let shoppers try on products virtually using their webcam before committing to a purchase
- Give sellers clear attribution data linking ad spend (inner and outer) to try-on-driven conversions
- Demonstrate that privacy-first face tracking (all processing stays in the browser) is viable for retail

## Target Users

- **Shoppers** — want confidence in how a product looks on them before buying
- **Sellers / brands** — want to understand which ads (internal promotions or external campaigns) drive purchases after a try-on session

## Key Features

- **Virtual try-on** — real-time face landmark detection overlays a 3D product model on the shopper's webcam feed
- **Interactive 3D viewer** — every product page has a draggable, zoomable 3D model (Three.js / R3F)
- **Product catalog** — browsable listing of available products
- **Cart** — standard add-to-cart and checkout flow
- **Ad tracking dashboard** — sellers see inner ads (promotions shown inside Maya) and outer ads (external campaigns) alongside conversion metrics tied to try-on sessions

## MVP Scope (Kiroween 2026)

The MVP focuses on a single product type: **glasses**.

- Virtual try-on for glasses (face landmark → frame overlay)
- Product catalog page
- Product detail page with 3D viewer + try-on button
- Simple cart
- Ad tracking dashboard (inner + outer ad attribution)

## Non-Goals (MVP)

- Multiple product categories beyond glasses
- Native mobile app (web only)
- Uploading or storing webcam footage — all face tracking runs entirely in the browser
- Full payment processing (cart is sufficient for the demo)
