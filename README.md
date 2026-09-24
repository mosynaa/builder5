# Allegato A Builder · SOMO v6

Builder statico per generare Allegati A SOMO con struttura sintetica coerente con i documenti BabyChic/Gloria e con un preset dedicato TikTok Shop basato sulla proposta Supermercato Cinese.

## Correzioni principali

- dati SOMO corretti: Vico Sant’Eframo Vecchio, 20 – 80137 Napoli (NA), P. IVA 10895731213;
- font Nunito nel builder, nell’anteprima e nel Word generato;
- tipologie cliente distinte: negozio, emporio/grande store, e-commerce, ristorante/food, locale/nightlife, fitness/wellness, parco/struttura ricreativa, B2B, servizi e brand;
- obiettivi abituali selezionati automaticamente in base alla tipologia cliente, con possibilità di aggiungere obiettivi o priorità specifiche;
- servizi sintetici senza duplicare montaggio, editing e post-produzione come voci separate;
- quantità contenuti fisse oppure definite in base al piano editoriale;
- TikTok Shop con struttura fissa e chiara;
- download Word `.docx` editabile e stampa/salvataggio PDF.

## TikTok Shop

Valori predefiniti:

- 30 articoli/prodotti;
- € 1.200 + IVA come investimento predefinito della fase TikTok Shop.

Il builder distingue:

1. **Shop da attivare**: configurazione, produzione fotografica, costruzione catalogo, schede e pubblicazione;
2. **Shop già attivo**: selezione nuovi articoli, produzione fotografica, aggiornamento catalogo, schede e pubblicazione.

Se TikTok Shop è l’unico servizio, il documento usa i quattro passaggi in forma compatta e le informazioni operative. Se è incluso in un pacchetto social, compare come un solo blocco sintetico e con un investimento separato dalla fee mensile.

La terminologia economica evita la dicitura generica “una tantum”: per un nuovo Shop viene usata **Fase di avvio**; per uno Shop già attivo viene usato **Ampliamento catalogo**. Per gli altri lavori non continuativi il builder usa **Progetto a importo complessivo**.

## Pubblicazione su GitHub Pages

Sostituire nel repository esistente:

- `index.html`
- `styles.css`
- `app.js`
- `README.md`

**Lasciare invariata la cartella `assets` già presente**, che deve continuare a contenere almeno:

- `assets/somo.png`
- `assets/black-noodles.png`

GitHub Pages resta configurato su `main` → `/(root)`.

## PDF

Premere **PDF** e nella finestra di stampa scegliere **Salva come PDF**, formato A4, scala 100%, margini nessuno e grafica di sfondo attiva.

## Word

Premere **Scarica Word**. Il builder genera direttamente un file `.docx` editabile; non richiede librerie esterne.
