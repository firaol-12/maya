-- Maya seed data: 6 glasses across different categories
-- Run after 0001_create_products.sql

insert into public.products (slug, name, description, price, category, image_url, model_url)
values
  (
    'azure-aviator',
    'Azure Aviator',
    'Classic aviator frames with a modern blue tint. Lightweight titanium construction with UV400 protection. Perfect for sunny days and casual outings.',
    89.99,
    'aviator',
    '/images/glasses-sunglasses-1.svg',
    null
  ),
  (
    'circle-classic',
    'Circle Classic',
    'Timeless round frames inspired by mid-century fashion. Ultra-thin stainless steel rims with anti-reflective coating. Available in prescription.',
    74.99,
    'round',
    '/images/glasses-round-1.svg',
    null
  ),
  (
    'metro-square',
    'Metro Square',
    'Bold square frames for the modern professional. Acetate construction with spring hinges for all-day comfort. Blue-light filtering lenses included.',
    99.99,
    'square',
    '/images/glasses-square-1.svg',
    null
  ),
  (
    'diva-cat-eye',
    'Diva Cat-Eye',
    'Statement cat-eye frames that command attention. Handcrafted acetate with subtle tortoiseshell details and scratch-resistant lenses.',
    119.99,
    'cat-eye',
    '/images/glasses-cateye-1.svg',
    null
  ),
  (
    'sprint-sport',
    'Sprint Sport',
    'Wraparound sport frames designed for active lifestyles. Rubberized grip temples, polarized lenses, and impact-resistant polycarbonate.',
    129.99,
    'sport',
    '/images/glasses-sport-1.svg',
    null
  ),
  (
    'focus-bluelight',
    'Focus Blue-Light',
    'Screen-ready frames with blue-light filtering lenses. Lightweight TR90 frame, anti-glare coating, and a slim profile that works for 10+ hour sessions.',
    109.99,
    'bluelight',
    '/images/glasses-bluelight-1.svg',
    null
  )
on conflict (slug) do nothing;
