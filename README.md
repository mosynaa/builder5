# Allegato A Builder · SOMO — v10

Generatore statico per creare Allegati A SOMO in stile sintetico BabyChic/Gloria, con blocco TikTok Shop basato sulla proposta Supermercato Cinese.

## Correzioni v10

- suggerimenti cliente mantenuti mentre si scrive, senza menu fisso;
- selezionando o completando esattamente “Shopping Casa” vengono compilati anche indirizzo e città disponibili;
- i dati dei clienti conosciuti vengono recuperati anche se una vecchia sessione aveva salvato solo il nome;
- ogni spunta di obiettivi, servizi e TikTok Shop aggiorna immediatamente oggetto, sintesi e sezioni del documento;
- le sezioni non pertinenti vengono nascoste invece di lasciare testo generico non selezionato;
- aggiunti eventi `change` oltre a `input`, così checkbox e select aggiornano il testo in modo affidabile;
- produzione classica più flessibile: appuntamenti al mese, a settimana, ogni 2 settimane, ogni 2 mesi, ogni 3 mesi o in base al piano;
- quantità contenuti impostabili al mese, a settimana, per appuntamento o complessive nel progetto;
- esempio supportato: 1 appuntamento a settimana + 4/5 video a settimana;
- se i file logo non sono presenti, le immagini rotte vengono nascoste per evitare il rettangolo bianco;
- la data resta sempre `Data: ____ / ____ / ______` da compilare a penna.

## TikTok Shop

Default: 30 articoli e € 1.200 + IVA. Le attività preselezionate restano tutte deselezionabili e il documento si rielabora in base alle sole attività effettivamente spuntate.

## Piè di pagina

SOMO S.r.l. · Vico Sant’Eframo Vecchio, 20 – 80137 Napoli · P. IVA 10895731213 · Black Noodles, studio creativo di SOMO · somonapoli@pec.it

## GitHub Pages

Sostituire `index.html`, `styles.css`, `app.js` e `README.md`. Se nel repository esiste già la cartella `assets` con i loghi, lasciarla invariata.
