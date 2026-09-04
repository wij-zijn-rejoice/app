# Rejoice Band App v4

Interne, besloten webapp voor Rejoice.

## Functionaliteit
- Login met Supabase
- Dashboard
- Agenda met maandweergave
- Afspraken toevoegen/verwijderen
- Google Calendar-knop per afspraak
- Boekingen toevoegen/bewerken/verwijderen + zoeken
- Financiën toevoegen/bewerken/verwijderen + filters + saldo
- Documenten uploaden/openen/verwijderen via private Storage
- Inventaris toevoegen/verwijderen + optionele foto
- Bandleden
- Persoonlijke instellingen: naam en wachtwoord
- Responsive voor mobiel

## Supabase
Gebruik `supabase/schema.sql` in de SQL Editor. Maak daarna de bandleden aan in Authentication > Users. Het schema vult de profielen automatisch aan.

Maak `.env.local` op basis van `.env.example` met:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

Gebruik nooit een service-role/secret key in de browser.

## Hosting
Deze versie gebruikt Next.js static export en is geschikt voor GitHub Pages of Cloudflare Pages. `public/CNAME` staat al op `app.wijzijnrejoice.nl`.
