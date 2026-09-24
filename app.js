(() => {
  const STORAGE_KEY = 'somo-allegato-a-builder-v5';
  const form = document.getElementById('builderForm');
  const fields = [...form.querySelectorAll('input, select')];
  const objectiveIds = [
    'objectiveBrand','objectiveContinuity','objectiveRange','objectiveExperience','objectiveFootfall',
    'objectiveEvents','objectiveEcommerce','objectiveLeads','objectiveCommunity','objectiveLaunch'
  ];

  const objectives = {
    objectiveBrand: { summary: 'notorietà e posizionamento', action: 'rafforzare notorietà, identità e riconoscibilità' },
    objectiveContinuity: { summary: 'continuità della comunicazione', action: 'mantenere una comunicazione continuativa e riconoscibile' },
    objectiveRange: { summary: 'valorizzazione dell’offerta', action: 'valorizzare l’offerta e le priorità commerciali' },
    objectiveExperience: { summary: 'racconto dell’esperienza', action: 'raccontare identità, atmosfera, servizio ed esperienza' },
    objectiveFootfall: { summary: 'visite e affluenza', action: 'favorire visite, presenze o partecipazione del pubblico' },
    objectiveEvents: { summary: 'eventi e iniziative', action: 'dare visibilità a eventi, iniziative e programmazione' },
    objectiveEcommerce: { summary: 'supporto alle vendite online', action: 'sostenere le opportunità di vendita online' },
    objectiveLeads: { summary: 'acquisizione di contatti', action: 'sostenere l’acquisizione di nuovi contatti, richieste o iscritti' },
    objectiveCommunity: { summary: 'community e interazione', action: 'favorire interazione e crescita della community' },
    objectiveLaunch: { summary: 'lancio o nuova fase', action: 'accompagnare il lancio, l’apertura o una nuova fase dell’attività' }
  };

  const clientProfiles = {
    retail: {
      itemWord: 'articoli',
      defaults: ['objectiveBrand','objectiveContinuity','objectiveRange','objectiveFootfall'],
      summary: 'Notorietà del punto vendita, valorizzazione degli articoli e visite in store',
      objectiveSentence: 'Rafforzare la notorietà del punto vendita e valorizzare articoli, novità e categorie attraverso una comunicazione social continuativa.'
    },
    emporium: {
      itemWord: 'articoli',
      defaults: ['objectiveBrand','objectiveContinuity','objectiveRange','objectiveFootfall'],
      summary: 'Notorietà, valorizzazione dell’assortimento e visite in negozio',
      objectiveSentence: 'Aumentare la notorietà del punto vendita, valorizzare assortimento, reparti e nuovi arrivi e favorire le visite in negozio.'
    },
    omnichannel: {
      itemWord: 'articoli',
      defaults: ['objectiveBrand','objectiveContinuity','objectiveRange','objectiveFootfall','objectiveEcommerce'],
      summary: 'Notorietà, drive to store e supporto alle vendite online',
      objectiveSentence: 'Rafforzare la notorietà del punto vendita, valorizzare articoli e categorie e sostenere sia le visite in store sia le opportunità di vendita online.'
    },
    online: {
      itemWord: 'prodotti',
      defaults: ['objectiveBrand','objectiveContinuity','objectiveRange','objectiveEcommerce'],
      summary: 'Identità del brand, presenza digitale e supporto alle vendite online',
      objectiveSentence: 'Rafforzare identità e presenza digitale del brand, valorizzando prodotti, collezioni e novità e supportando le opportunità di vendita online.'
    },
    food: {
      itemWord: 'prodotti',
      defaults: ['objectiveBrand','objectiveContinuity','objectiveRange','objectiveExperience','objectiveFootfall'],
      summary: 'Visibilità del ristorante, identità gastronomica ed esperienza',
      objectiveSentence: 'Rafforzare la visibilità del ristorante e raccontarne identità, proposta gastronomica ed esperienza attraverso contenuti continuativi.'
    },
    nightlife: {
      itemWord: 'prodotti',
      defaults: ['objectiveBrand','objectiveContinuity','objectiveExperience','objectiveFootfall','objectiveEvents'],
      summary: 'Notorietà del locale, programmazione e partecipazione del pubblico',
      objectiveSentence: 'Rafforzare la notorietà del locale, dare visibilità alla programmazione e raccontarne l’esperienza per favorire la partecipazione del pubblico.'
    },
    wellness: {
      itemWord: 'servizi',
      defaults: ['objectiveBrand','objectiveContinuity','objectiveRange','objectiveLeads'],
      summary: 'Posizionamento, valorizzazione dei servizi e acquisizione di contatti',
      objectiveSentence: 'Rafforzare il posizionamento della struttura, valorizzare servizi e attività e sostenere l’acquisizione di nuovi contatti.'
    },
    recreation: {
      itemWord: 'servizi',
      defaults: ['objectiveBrand','objectiveContinuity','objectiveRange','objectiveExperience','objectiveFootfall','objectiveEvents'],
      summary: 'Visibilità della struttura, esperienza e affluenza',
      objectiveSentence: 'Aumentare la visibilità della struttura, valorizzarne attività ed esperienza e sostenere l’affluenza nei periodi strategici.'
    },
    b2b: {
      itemWord: 'prodotti',
      defaults: ['objectiveBrand','objectiveContinuity','objectiveRange','objectiveLeads'],
      summary: 'Posizionamento, offerta commerciale e nuove opportunità B2B',
      objectiveSentence: 'Rafforzare il posizionamento dell’azienda, valorizzare l’offerta commerciale e sostenere nuove opportunità con clienti professionali.'
    },
    services: {
      itemWord: 'servizi',
      defaults: ['objectiveBrand','objectiveContinuity','objectiveRange','objectiveLeads'],
      summary: 'Posizionamento, servizi e acquisizione di contatti',
      objectiveSentence: 'Rafforzare il posizionamento dell’attività, valorizzare servizi e competenze e sostenere l’acquisizione di nuovi contatti.'
    },
    brand: {
      itemWord: 'prodotti',
      defaults: ['objectiveBrand','objectiveContinuity','objectiveRange'],
      summary: 'Identità, riconoscibilità e valorizzazione dell’offerta',
      objectiveSentence: 'Rafforzare identità e riconoscibilità del brand e valorizzarne prodotti, servizi e iniziative attraverso una comunicazione continuativa.'
    }
  };

  const defaultState = {
    proposalMode: 'classic', clientType: 'retail', clientName: '', legalName: '', address: '', city: '', vat: '',
    documentDate: new Date().toISOString().slice(0,10), focus: '', customObjective: '',
    objectiveBrand: true, objectiveContinuity: true, objectiveRange: true, objectiveExperience: false,
    objectiveFootfall: true, objectiveEvents: false, objectiveEcommerce: false, objectiveLeads: false,
    objectiveCommunity: false, objectiveLaunch: false,
    serviceStrategy: true, serviceProduction: true, serviceSocial: true, serviceAdvCreative: false,
    serviceInfluencer: false, serviceCommunity: false, serviceEventCoverage: false,
    eventCoverageFrequency: 'agreed', productionCadence: 'monthly', productionDays: '1',
    productionVideo: true, productionPhoto: true, productionGraphics: false, quantityMode: 'plan',
    videos: '8', photos: '15–20', graphicsCount: '4', serviceAds: false, adsBudget: '200',
    serviceTikTok: false, tiktokStatus: 'new', tiktokProductCount: '30', tiktokFee: '1200',
    economicMode: 'monthly', duration: '6', monthlyFee: '1200', extraEnabled: false,
    extraLabel: 'Produzione straordinaria', extraFee: '0', oneTimeFee: '0'
  };

  let showAllObjectives = false;

  const el = (id) => document.getElementById(id);
  const checked = (id) => Boolean(el(id)?.checked);
  const value = (id) => String(el(id)?.value ?? '').trim();
  const safe = (text) => String(text ?? '').replace(/[&<>'"]/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const xmlSafe = (text) => String(text ?? '').replace(/[&<>]/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));

  function money(amount) {
    const numeric = Math.max(0, Number(amount) || 0);
    return '€ ' + new Intl.NumberFormat('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(numeric);
  }
  function dateItalian(iso) {
    if (!iso) return '___-___-______';
    const p = iso.split('-');
    return p.length === 3 ? `${p[2]}-${p[1]}-${p[0].slice(-2)}` : iso;
  }
  function joinNatural(items) {
    const clean = items.filter(Boolean);
    if (clean.length < 2) return clean[0] || '';
    if (clean.length === 2) return `${clean[0]} e ${clean[1]}`;
    return `${clean.slice(0,-1).join(', ')} e ${clean.at(-1)}`;
  }
  function sentence(text) {
    const clean = String(text || '').trim().replace(/[.]+$/, '');
    return clean ? clean.charAt(0).toUpperCase() + clean.slice(1) + '.' : '';
  }
  function numberValue(id, fallback = 0) { return Math.max(0, Number(value(id)) || fallback); }
  function proposalMode() { return value('proposalMode') || 'classic'; }
  function classicEnabled() { return proposalMode() !== 'tiktok'; }
  function syncProposalMode() {
    const mode = proposalMode();
    if (el('serviceTikTok')) el('serviceTikTok').checked = mode === 'tiktok' || mode === 'both';
    if ((mode === 'tiktok' || mode === 'both') && !value('tiktokProductCount')) el('tiktokProductCount').value = '30';
    if ((mode === 'tiktok' || mode === 'both') && !value('tiktokFee')) el('tiktokFee').value = '1200';
  }
  function profile() { return clientProfiles[value('clientType')] || clientProfiles.brand; }
  function itemWord() { return profile().itemWord; }
  function tiktokCount() { return Math.max(1, numberValue('tiktokProductCount', 30)); }
  function tiktokFee() { return numberValue('tiktokFee', 1200); }
  function tiktokIsActive() { return value('tiktokStatus') === 'active'; }

  function getState() {
    return Object.fromEntries(fields.map((field) => [field.name, field.type === 'checkbox' ? field.checked : field.value]));
  }
  function applyState(state) {
    fields.forEach((field) => {
      if (!(field.name in state)) return;
      if (field.type === 'checkbox') field.checked = Boolean(state[field.name]);
      else field.value = state[field.name];
    });
  }
  function saveState() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(getState())); } catch (_) {} }
  function loadState() {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return stored && typeof stored === 'object' ? { ...defaultState, ...stored } : defaultState;
    } catch (_) { return defaultState; }
  }
  function setText(id, text) { if (el(id)) el(id).textContent = text; }
  function setHidden(id, hidden) { if (el(id)) el(id).classList.toggle('is-hidden', hidden); }
  function clientDisplayName() { return value('clientName') || value('legalName') || 'il Cliente'; }

  function selectedObjectiveIds() { return objectiveIds.filter((id) => checked(id)); }
  function selectedObjectives() { return selectedObjectiveIds().map((id) => objectives[id]).filter(Boolean); }
  function objectivesAreDefault() {
    const a = [...selectedObjectiveIds()].sort();
    const b = [...profile().defaults].sort();
    return a.length === b.length && a.every((id, i) => id === b[i]);
  }

  function selectedContentTypes() {
    return [checked('productionVideo') ? 'video' : '', checked('productionPhoto') ? 'fotografie' : '', checked('productionGraphics') ? 'grafiche' : ''].filter(Boolean);
  }
  function objectContentLabel() {
    const v = checked('productionVideo'), p = checked('productionPhoto'), g = checked('productionGraphics');
    if (v && p && g) return 'contenuti foto, video e grafici';
    if (v && p) return 'contenuti foto e video';
    if (v && g) return 'contenuti video e grafici';
    if (p && g) return 'contenuti fotografici e grafici';
    if (v) return 'contenuti video';
    if (p) return 'contenuti fotografici';
    if (g) return 'contenuti grafici';
    return 'contenuti foto, video e grafici';
  }

  function hasMainServices() {
    return ['serviceStrategy','serviceProduction','serviceSocial','serviceAdvCreative','serviceAds','serviceInfluencer','serviceCommunity','serviceEventCoverage'].some(checked);
  }
  function isTikTokOnly() { return proposalMode() === 'tiktok'; }

  function updateObjectiveVisibility() {
    const defaults = profile().defaults;
    document.querySelectorAll('.objective-card').forEach((card) => {
      const id = card.dataset.objective;
      const visible = showAllObjectives || defaults.includes(id) || checked(id);
      card.classList.toggle('is-objective-hidden', !visible);
    });
    setText('toggleObjectivesButton', showAllObjectives ? '− Nascondi gli altri obiettivi' : '+ Aggiungi altri obiettivi');
  }

  function updateTikTokPresetLabels() {
    if (tiktokIsActive()) {
      setText('tiktokPreset1', '01 Selezione articoli');
      setText('tiktokPreset2', '02 Produzione fotografica');
      setText('tiktokPreset3', '03 Aggiornamento catalogo');
      setText('tiktokPreset4', '04 Schede + pubblicazione');
    } else {
      setText('tiktokPreset1', '01 Configurazione Shop');
      setText('tiktokPreset2', '02 Produzione fotografica');
      setText('tiktokPreset3', '03 Costruzione catalogo');
      setText('tiktokPreset4', '04 Schede + pubblicazione');
    }
  }

  function renderVisibility() {
    const classic = classicEnabled();
    setHidden('objectiveSection', !classic);
    setHidden('servicesSection', !classic);
    setHidden('adsSection', !classic);
    setHidden('productionSection', !classic || !checked('serviceProduction'));
    setHidden('eventCoveragePanel', !checked('serviceEventCoverage'));
    setHidden('adsPanel', !checked('serviceAds'));
    setHidden('tiktokSection', !checked('serviceTikTok'));
    setHidden('tiktokPanel', !checked('serviceTikTok'));
    setHidden('fixedQuantityPanel', value('quantityMode') !== 'fixed');
    setHidden('productionDaysField', value('productionCadence') === 'plan' || value('productionCadence') === 'none');
    setHidden('videosField', !checked('productionVideo'));
    setHidden('photosField', !checked('productionPhoto'));
    setHidden('graphicsField', !checked('productionGraphics'));

    const tikOnly = isTikTokOnly();
    setHidden('tiktokOnlyEconomicNote', !tikOnly);
    setHidden('mainEconomicControls', tikOnly);

    const oneTime = value('economicMode') === 'oneTime';
    setHidden('monthlyEconomicPanel', oneTime || tikOnly);
    setHidden('oneTimeEconomicPanel', !oneTime || tikOnly);
    setHidden('extraPanel', oneTime || tikOnly || !checked('extraEnabled'));
    updateTikTokPresetLabels();
    updateObjectiveVisibility();
  }

  function renderClientBlock() {
    const legal = value('legalName') || '[Ragione sociale Cliente]';
    el('clientBlock').innerHTML = [
      `<strong>${safe(legal)}</strong>`, safe(value('address') || '[Indirizzo]'), safe(value('city') || '[CAP e città]'), `P. IVA ${safe(value('vat') || '[Partita IVA]')}`
    ].join('<br>');
    el('clientBlock').classList.toggle('placeholder', !value('legalName'));
  }

  function buildObjectText() {
    if (isTikTokOnly()) {
      return tiktokIsActive()
        ? `Ampliamento del TikTok Shop già attivo, con produzione fotografica, aggiornamento del catalogo e pubblicazione di ${tiktokCount()} nuove schede prodotto.`
        : `Attivazione del TikTok Shop e realizzazione del catalogo iniziale di ${tiktokCount()} ${itemWord()}.`;
    }

    const activities = [];
    const completeSocial = checked('serviceStrategy') && checked('serviceProduction') && checked('serviceSocial');
    if (completeSocial) activities.push('strategia, produzione di contenuti e gestione editoriale dei canali social');
    else {
      if (checked('serviceStrategy')) activities.push('strategia e pianificazione editoriale');
      if (checked('serviceProduction')) activities.push(`produzione di ${objectContentLabel()} per i social media`);
      if (checked('serviceSocial')) activities.push('gestione dei canali social');
    }
    if (checked('serviceAdvCreative') && checked('serviceAds')) activities.push('creatività e gestione delle campagne Meta Ads');
    else if (checked('serviceAdvCreative')) activities.push('creatività per campagne ADV');
    else if (checked('serviceAds')) activities.push('gestione delle campagne Meta Ads');
    if (checked('serviceTikTok')) activities.push(tiktokIsActive() ? 'ampliamento del catalogo TikTok Shop' : 'attivazione del TikTok Shop e realizzazione del catalogo iniziale');
    if (checked('serviceInfluencer')) activities.push('coordinamento di creator e influencer');
    if (checked('serviceCommunity') && !checked('serviceSocial')) activities.push('community management');
    if (checked('serviceEventCoverage')) activities.push('copertura dedicata degli eventi');
    return sentence(joinNatural(activities) || 'servizi di comunicazione definiti nella presente proposta');
  }

  function summaryObjective() {
    if (isTikTokOnly()) return tiktokIsActive() ? 'Ampliamento del catalogo dello Shop già attivo' : 'Attivazione del canale di vendita e pubblicazione del catalogo iniziale';
    if (objectivesAreDefault() && !value('customObjective')) return profile().summary;
    const parts = selectedObjectives().map((o) => o.summary);
    if (parts.length > 4) return `${joinNatural(parts.slice(0,4))} e altri obiettivi concordati`;
    return sentence(joinNatural(parts) || profile().summary).replace(/\.$/, '');
  }

  function renderObjectives() {
    const name = safe(clientDisplayName());
    const paragraphs = [];
    if (isTikTokOnly()) {
      paragraphs.push(tiktokIsActive()
        ? `Ampliare il TikTok Shop di <strong>${name}</strong> attraverso la preparazione e pubblicazione di <strong>${tiktokCount()} nuovi ${safe(itemWord())}</strong>.`
        : `Attivare il TikTok Shop di <strong>${name}</strong> e predisporre un catalogo iniziale di <strong>${tiktokCount()} ${safe(itemWord())}</strong>, completo e pronto alla pubblicazione.`);
    } else if (objectivesAreDefault()) {
      paragraphs.push(`<strong>${name}</strong>: ${safe(profile().objectiveSentence)}`);
    } else {
      const actions = selectedObjectives().map((o) => o.action);
      paragraphs.push(`Le attività per <strong>${name}</strong> saranno orientate a ${safe(joinNatural(actions) || 'rafforzare la comunicazione del Cliente')}.`);
    }

    if (!isTikTokOnly() && value('focus')) paragraphs.push(`La comunicazione darà particolare priorità a <strong>${safe(value('focus'))}</strong>.`);
    if (!isTikTokOnly() && value('customObjective')) paragraphs.push(`Obiettivo aggiuntivo: ${safe(sentence(value('customObjective')))}`);
    el('objectiveText').innerHTML = paragraphs.map((p) => `<p>${p}</p>`).join('');
    return paragraphs.length;
  }

  function productionTitle() {
    const types = selectedContentTypes();
    return types.length ? `Produzione di ${joinNatural(types)}` : 'Produzione dei contenuti';
  }

  function tiktokServiceSteps() {
    const count = tiktokCount();
    const word = itemWord();
    if (tiktokIsActive()) {
      return [
        ['Selezione degli articoli da inserire', `Definizione dei ${count} nuovi ${word} da aggiungere allo Shop.`],
        ['Produzione fotografica', `Realizzazione e preparazione delle immagini dedicate ai ${count} ${word}.`],
        ['Aggiornamento del catalogo', 'Organizzazione di titoli, descrizioni, prezzi e informazioni commerciali necessarie alla pubblicazione.'],
        ['Creazione e pubblicazione delle schede', `Realizzazione delle ${count} schede prodotto, caricamento, verifica finale e pubblicazione.`]
      ];
    }
    return [
      ['Configurazione e impostazione dello Shop', 'Configurazione iniziale del canale e organizzazione della struttura necessaria alla vendita e alla gestione del catalogo.'],
      ['Selezione e produzione fotografica', `Definizione dei primi ${count} ${word} e shooting dedicato, con selezione e preparazione delle immagini.`],
      ['Costruzione del catalogo', 'Organizzazione degli articoli e delle relative informazioni commerciali: titoli, descrizioni, prezzi e dati necessari alla pubblicazione.'],
      ['Creazione e pubblicazione delle schede', `Realizzazione delle ${count} schede prodotto, caricamento dei contenuti, verifica finale e pubblicazione del catalogo iniziale.`]
    ];
  }

  function renderServices() {
    const services = [];
    if (isTikTokOnly()) {
      tiktokServiceSteps().forEach((s) => services.push(s));
    } else {
      if (checked('serviceStrategy')) services.push(['Strategia e piano editoriale', 'Definizione della linea di comunicazione, dei temi e della pianificazione in funzione degli obiettivi concordati.']);
      if (checked('serviceProduction')) services.push([productionTitle(), 'Ideazione, riprese, montaggio, post-produzione e adattamento dei materiali ai formati social.']);
      if (checked('serviceSocial')) {
        let desc = 'Piano editoriale, redazione dei copy, programmazione e pubblicazione dei contenuti sui canali concordati.';
        if (checked('serviceCommunity')) desc += ' Comprende anche la gestione di messaggi, commenti e recensioni.';
        services.push(['Gestione dei canali social', desc]);
      } else if (checked('serviceCommunity')) services.push(['Community management', 'Gestione di messaggi, commenti e recensioni sui canali concordati.']);

      if (checked('serviceAdvCreative') && checked('serviceAds')) services.push(['Campagne ADV', 'Ideazione delle creatività e gestione delle campagne Meta Ads, con attivazione, monitoraggio e ottimizzazione.']);
      else {
        if (checked('serviceAdvCreative')) services.push(['Creatività per campagne ADV', 'Produzione di foto, video e grafiche sviluppate per le campagne pubblicitarie.']);
        if (checked('serviceAds')) services.push(['Gestione campagne Meta Ads', 'Configurazione, attivazione, monitoraggio e ottimizzazione delle campagne in funzione degli obiettivi e del budget disponibile.']);
      }

      if (checked('serviceTikTok')) {
        const count = tiktokCount();
        const desc = tiktokIsActive()
          ? `Ampliamento del TikTok Shop già attivo con produzione fotografica, aggiornamento del catalogo e pubblicazione di ${count} nuove schede prodotto.`
          : `Configurazione iniziale dello Shop, produzione fotografica, organizzazione del catalogo e pubblicazione delle schede relative ai primi ${count} ${itemWord()}.`;
        services.push(['TikTok Shop', desc]);
      }
      if (checked('serviceInfluencer')) services.push(['Creator e influencer', 'Ricerca, selezione, proposta dei profili e coordinamento delle collaborazioni approvate dal Cliente.']);
      if (checked('serviceEventCoverage')) {
        const freq = { agreed:'negli eventi concordati', monthly:'per 1 evento al mese', twiceMonthly:'fino a 2 eventi al mese', plan:'in base alla programmazione' }[value('eventCoverageFrequency')] || 'negli eventi concordati';
        services.push(['Copertura dedicata degli eventi', `Presenza di fotografo o videomaker ${freq}, con produzione dei materiali previsti.`]);
      }
    }

    el('serviceList').innerHTML = services.map(([title, desc]) => `<li><strong>${safe(title)}</strong><span class="service-description">${safe(desc)}</span></li>`).join('');
    return services.length;
  }

  function productionCadenceText() {
    const cadence = value('productionCadence');
    const days = Math.max(1, numberValue('productionDays', 1));
    const unit = days === 1 ? 'giornata' : 'giornate';
    if (cadence === 'monthly') return `È prevista ${days === 1 ? '1 giornata' : `${days} giornate`} di produzione al mese presso la sede del Cliente.`;
    if (cadence === 'bimonthly') return `Sono previste ${days} ${unit} di produzione ogni 2 mesi presso la sede del Cliente.`;
    if (cadence === 'quarterly') return `Sono previste ${days} ${unit} di produzione ogni 3 mesi presso la sede del Cliente.`;
    if (cadence === 'plan') return 'Le sessioni di produzione saranno definite in base al piano editoriale e alle priorità di comunicazione.';
    return 'Non è prevista una giornata di produzione dedicata.';
  }

  function fixedContentParts() {
    const parts = [];
    if (checked('productionVideo')) { const n = numberValue('videos'); if (n) parts.push(`fino a ${n} video`); }
    if (checked('productionPhoto') && value('photos')) parts.push(`${value('photos')} fotografie`);
    if (checked('productionGraphics')) { const n = numberValue('graphicsCount'); if (n) parts.push(`fino a ${n} ${n === 1 ? 'grafica' : 'grafiche'}`); }
    return parts;
  }

  function renderProduction() {
    if (isTikTokOnly()) {
      setText('productionHeading', '3. INFORMAZIONI OPERATIVE');
      const count = tiktokCount();
      const word = itemWord();
      const platformNote = tiktokIsActive()
        ? 'La pubblicazione delle nuove schede resta soggetta alle verifiche e alle procedure previste da TikTok.'
        : 'L’attivazione definitiva delle funzionalità dello Shop resta soggetta alle verifiche e alle procedure previste da TikTok.';
      setText('productionText', `Il Cliente mette a disposizione i ${word} e fornisce o conferma prezzi, disponibilità e informazioni necessarie alla pubblicazione. Gli inserimenti oltre i ${count} ${word} previsti saranno concordati separatamente. ${platformNote}`);
      return;
    }

    if (checked('serviceProduction')) {
      setText('productionHeading', value('productionCadence') === 'monthly' ? '3. PRODUZIONE MENSILE' : '3. PRODUZIONE DEI CONTENUTI');
      const parts = [productionCadenceText()];
      if (value('quantityMode') === 'plan') parts.push('Quantità e tipologia dei contenuti saranno definite in funzione del piano editoriale, delle esigenze commerciali e delle priorità di comunicazione del periodo.');
      else {
        const fixed = fixedContentParts();
        if (fixed.length) parts.push(`La produzione comprende ${joinNatural(fixed)} al mese.`);
      }
      parts.push('Eventuali giornate aggiuntive o produzioni straordinarie saranno concordate separatamente.');
      setText('productionText', parts.join(' '));
      return;
    }

    setText('productionHeading', '3. ORGANIZZAZIONE DEL LAVORO');
    setText('productionText', 'Le attività saranno pianificate in funzione degli obiettivi, del calendario e delle priorità concordate con il Cliente.');
  }

  function productionSummary() {
    if (isTikTokOnly()) return `Shooting dedicato a ${tiktokCount()} ${itemWord()}`;
    if (checked('serviceProduction')) {
      const days = Math.max(1, numberValue('productionDays',1));
      const unit = days === 1 ? 'giornata' : 'giornate';
      const c = value('productionCadence');
      if (c === 'monthly') return `${days} ${unit} di produzione al mese`;
      if (c === 'bimonthly') return `${days} ${unit} di produzione ogni 2 mesi`;
      if (c === 'quarterly') return `${days} ${unit} di produzione ogni 3 mesi`;
      if (c === 'plan') return 'Produzione definita in base al piano editoriale';
      return 'Nessuna giornata dedicata';
    }
    return 'Non prevista';
  }

  function contentSummary() {
    if (isTikTokOnly()) return `${tiktokCount()} schede prodotto con foto e dati commerciali`;
    if (checked('serviceProduction')) {
      if (value('quantityMode') === 'plan') return 'Quantità e tipologia definite in base al piano editoriale';
      const parts = fixedContentParts();
      return parts.length ? sentence(joinNatural(parts)).replace(/\.$/,'') : 'Tipologia definita in base alle esigenze concordate';
    }
    return 'Non previsti';
  }

  function managementSummary() {
    if (isTikTokOnly()) return tiktokIsActive() ? 'Aggiornamento catalogo e pubblicazione' : 'Configurazione iniziale e pubblicazione';
    if (checked('serviceSocial')) return 'Piano editoriale, copy, programmazione e pubblicazione';
    if (checked('serviceCommunity')) return 'Community management';
    return 'Non prevista';
  }

  function adsSummary() {
    if (isTikTokOnly()) return 'Non previste';
    if (!checked('serviceAds')) return 'Gestione e budget pubblicitario non inclusi';
    const budget = numberValue('adsBudget');
    return budget ? `Gestione inclusa; budget consigliato ${money(budget)} al mese, escluso` : 'Gestione inclusa; budget pubblicitario escluso';
  }

  function renderSummary() {
    const tikOnly = isTikTokOnly();
    const oneTime = value('economicMode') === 'oneTime';
    const duration = Math.max(1, numberValue('duration',6));
    const monthly = numberValue('monthlyFee');
    const oneTimeFee = numberValue('oneTimeFee');

    setText('summaryDuration', tikOnly ? 'Attività una tantum' : (oneTime ? 'Attività una tantum' : `${duration} mesi`));
    setText('summaryObjective', summaryObjective());
    setText('summaryProduction', productionSummary());
    setText('summaryContent', contentSummary());
    setText('summaryManagement', managementSummary());
    setText('summaryAds', adsSummary());

    const tiktokSelected = checked('serviceTikTok');
    setHidden('summaryTikTokRow', !tiktokSelected);
    if (tiktokSelected) {
      const status = tiktokIsActive() ? 'Shop già attivo' : 'Shop da attivare';
      setText('summaryTikTok', `${status} · ${tiktokCount()} ${itemWord()} · ${money(tiktokFee())} + IVA una tantum`);
    }

    if (tikOnly) setText('summaryInvestment', `${money(tiktokFee())} + IVA una tantum`);
    else if (oneTime) setText('summaryInvestment', `${money(oneTimeFee)} + IVA una tantum`);
    else setText('summaryInvestment', `${money(monthly)} al mese + IVA`);
  }

  function renderExclusions() {
    const exclusions = [];
    if (isTikTokOnly()) {
      exclusions.push(`Inserimento di ${itemWord()} oltre i ${tiktokCount()} previsti;`);
      exclusions.push('Gestione continuativa dello Shop successiva alla fase prevista;');
      exclusions.push('Contenuti video social o produzioni ulteriori non comprese nella presente proposta;');
      exclusions.push('Gestione logistica degli ordini, spedizioni, resi, reclami e assistenza clienti;');
    } else {
      exclusions.push(checked('serviceAds') ? 'Budget pubblicitario destinato alle piattaforme Meta Ads;' : 'Gestione delle campagne Meta Ads e relativo budget pubblicitario;');
      if (!checked('serviceCommunity')) exclusions.push('Gestione di messaggi, commenti, recensioni e attività di community management;');
      if (checked('serviceProduction')) exclusions.push('Giornate di produzione aggiuntive, trasferte o richieste straordinarie;');
      if ((value('clientType') === 'nightlife' || checked('objectiveEvents')) && !checked('serviceEventCoverage')) exclusions.push('Copertura dedicata degli eventi con fotografo o videomaker;');
      exclusions.push(checked('serviceInfluencer') ? 'Compensi e fee di creator, promoter, modelli o influencer;' : 'Attività, compensi e fee di creator, promoter, modelli o influencer;');
      if (checked('serviceTikTok')) {
        exclusions.push(`Inserimento di ${itemWord()} oltre i ${tiktokCount()} previsti nella fase TikTok Shop;`);
        exclusions.push('Gestione logistica degli ordini, spedizioni, resi e assistenza clienti di TikTok Shop;');
      }
    }
    el('exclusionList').innerHTML = exclusions.slice(0,6).map((x) => `<li>${safe(x)}</li>`).join('');
    return Math.min(exclusions.length,6);
  }

  function feeRow(label, amount) { return `<tr><th>${safe(label)}</th><td>${safe(amount)}</td></tr>`; }

  function renderEconomics() {
    const tikOnly = isTikTokOnly();
    const tikFee = checked('serviceTikTok') ? tiktokFee() : 0;
    const count = tiktokCount();

    if (tikOnly) {
      const label = tiktokIsActive() ? `AMPLIAMENTO SHOP · ${count} ${itemWord().toUpperCase()}` : `FASE DI AVVIO · ${count} ${itemWord().toUpperCase()}`;
      el('feeTableBody').innerHTML = [feeRow(label, `${money(tikFee)} + IVA`), feeRow('TOTALE PROPOSTA', `${money(tikFee)} + IVA`)].join('');
      setText('installmentsLabel', 'MODALITÀ');
      setText('installmentsPreview', 'Una tantum');
      setText('contractTotalLabel', 'TOTALE PROPOSTA');
      setText('contractTotalPreview', money(tikFee));
      el('paymentText').innerHTML = `Il compenso complessivo per la fase TikTok Shop è pari a <strong>${safe(money(tikFee))} + IVA</strong>.`;
      setText('invoiceText', 'Il compenso sarà fatturato all’avvio dell’attività e corrisposto secondo le modalità concordate.');
      setText('validityText', 'La proposta ha validità 15 giorni. Le tempistiche operative decorreranno dalla conferma e dalla disponibilità degli articoli e delle informazioni necessarie.');
      return 2;
    }

    const oneTime = value('economicMode') === 'oneTime';
    const duration = Math.max(1, numberValue('duration',6));
    const monthly = numberValue('monthlyFee');
    const mainOneTime = numberValue('oneTimeFee');
    const extra = !oneTime && checked('extraEnabled') ? numberValue('extraFee') : 0;
    const extraLabel = value('extraLabel') || 'Attività una tantum';
    const rows = [];
    let total = 0;

    if (oneTime) {
      rows.push(feeRow('SERVIZI PRINCIPALI · UNA TANTUM', `${money(mainOneTime)} + IVA`));
      total += mainOneTime;
    } else {
      const baseTotal = duration * monthly;
      rows.push(feeRow('COMPENSO MENSILE', `${money(monthly)} + IVA`));
      rows.push(feeRow(`TOTALE ${duration} MESI`, `${money(baseTotal)} + IVA`));
      total += baseTotal;
    }

    if (checked('serviceTikTok')) {
      rows.push(feeRow(tiktokIsActive() ? `TIKTOK SHOP · ${count} NUOVI ${itemWord().toUpperCase()}` : `TIKTOK SHOP · FASE DI AVVIO · ${count} ${itemWord().toUpperCase()}`, `${money(tikFee)} + IVA`));
      total += tikFee;
    }
    if (extra) { rows.push(feeRow(extraLabel.toUpperCase(), `${money(extra)} + IVA`)); total += extra; }
    if (rows.length > 2 || checked('serviceTikTok') || extra || oneTime) rows.push(feeRow('TOTALE COMPLESSIVO', `${money(total)} + IVA`));
    el('feeTableBody').innerHTML = rows.join('');

    setText('installmentsLabel', oneTime ? 'MODALITÀ' : 'RATE MENSILI');
    setText('installmentsPreview', oneTime ? 'Una tantum' : String(duration));
    setText('contractTotalLabel', 'TOTALE COMPLESSIVO');
    setText('contractTotalPreview', money(total));

    const payment = [];
    if (oneTime) payment.push(`Il compenso per i servizi principali è pari a <strong>${safe(money(mainOneTime))} + IVA</strong> una tantum.`);
    else payment.push(`Il compenso per i servizi continuativi è pari a <strong>${safe(money(monthly))} + IVA al mese</strong>, per ${duration} mesi.`);
    if (checked('serviceTikTok')) payment.push(`La fase TikTok Shop è pari a <strong>${safe(money(tikFee))} + IVA</strong> una tantum.`);
    if (extra) payment.push(`L’attività “${safe(extraLabel)}” è pari a <strong>${safe(money(extra))} + IVA</strong>.`);
    el('paymentText').innerHTML = payment.join(' ');
    setText('invoiceText', oneTime ? 'La fatturazione avverrà all’avvio delle attività, secondo le modalità concordate.' : 'La fatturazione dei servizi continuativi avverrà mensilmente; le eventuali attività una tantum saranno fatturate all’avvio.');
    setText('validityText', oneTime ? 'La proposta ha validità 15 giorni.' : `La proposta ha validità 15 giorni. La durata contrattuale è di ${duration} mesi a decorrere dall’avvio delle attività.`);
    return rows.length;
  }

  function render() {
    syncProposalMode();
    renderVisibility();
    renderClientBlock();
    setText('objectText', buildObjectText());
    renderSummary();
    const objectiveCount = renderObjectives();
    const serviceCount = renderServices();
    renderProduction();
    const exclusionCount = renderExclusions();
    const feeRows = renderEconomics();
    setText('signatureDate', dateItalian(value('documentDate')));

    el('pageOne').classList.toggle('compact', serviceCount > 5 || objectiveCount > 2 || checked('serviceTikTok'));
    el('pageOne').classList.toggle('dense', serviceCount > 6 || (checked('serviceTikTok') && hasMainServices() && serviceCount > 5));
    el('pageTwo').classList.toggle('compact', exclusionCount > 4 || feeRows > 3);
    saveState();
  }

  function applyClientPreset() {
    const defaults = profile().defaults;
    objectiveIds.forEach((id) => { el(id).checked = defaults.includes(id); });
    showAllObjectives = false;
    render();
  }

  // ---- DOCX generation: valid editable .docx without external libraries ----
  function crc32(bytes) {
    let crc = 0xffffffff;
    for (let i = 0; i < bytes.length; i++) {
      crc ^= bytes[i];
      for (let j = 0; j < 8; j++) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
    return (crc ^ 0xffffffff) >>> 0;
  }
  function u16(n) { return [n & 255, (n >>> 8) & 255]; }
  function u32(n) { return [n & 255, (n >>> 8) & 255, (n >>> 16) & 255, (n >>> 24) & 255]; }
  function dosTimeDate(date = new Date()) {
    const time = (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2);
    const d = ((date.getFullYear() - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate();
    return { time, date: d };
  }
  function zipStore(fileMap) {
    const enc = new TextEncoder();
    const locals = [], centrals = [];
    let offset = 0;
    const dt = dosTimeDate();
    for (const [name, content] of Object.entries(fileMap)) {
      const nameBytes = enc.encode(name);
      const data = content instanceof Uint8Array ? content : enc.encode(content);
      const crc = crc32(data);
      const local = new Uint8Array([
        ...u32(0x04034b50), ...u16(20), ...u16(0x0800), ...u16(0), ...u16(dt.time), ...u16(dt.date),
        ...u32(crc), ...u32(data.length), ...u32(data.length), ...u16(nameBytes.length), ...u16(0), ...nameBytes, ...data
      ]);
      locals.push(local);
      const central = new Uint8Array([
        ...u32(0x02014b50), ...u16(20), ...u16(20), ...u16(0x0800), ...u16(0), ...u16(dt.time), ...u16(dt.date),
        ...u32(crc), ...u32(data.length), ...u32(data.length), ...u16(nameBytes.length), ...u16(0), ...u16(0),
        ...u16(0), ...u16(0), ...u32(0), ...u32(offset), ...nameBytes
      ]);
      centrals.push(central);
      offset += local.length;
    }
    const centralSize = centrals.reduce((s, x) => s + x.length, 0);
    const end = new Uint8Array([
      ...u32(0x06054b50), ...u16(0), ...u16(0), ...u16(centrals.length), ...u16(centrals.length),
      ...u32(centralSize), ...u32(offset), ...u16(0)
    ]);
    const total = locals.reduce((s,x) => s + x.length, 0) + centralSize + end.length;
    const out = new Uint8Array(total);
    let pos = 0;
    [...locals, ...centrals, end].forEach((part) => { out.set(part, pos); pos += part.length; });
    return out;
  }
  function wRun(text, bold = false, size = 20, color = '') {
    const props = `${bold ? '<w:b/>' : ''}<w:rFonts w:ascii="Nunito" w:hAnsi="Nunito"/><w:sz w:val="${size}"/>${color ? `<w:color w:val="${color}"/>` : ''}`;
    return `<w:r><w:rPr>${props}</w:rPr><w:t xml:space="preserve">${xmlSafe(text)}</w:t></w:r>`;
  }
  function wParagraph(text, opts = {}) {
    const { bold = false, size = 20, color = '', before = 0, after = 80, align = '', pageBreak = false } = opts;
    const pPr = `<w:pPr>${before || after ? `<w:spacing w:before="${before}" w:after="${after}"/>` : ''}${align ? `<w:jc w:val="${align}"/>` : ''}</w:pPr>`;
    return `<w:p>${pPr}${pageBreak ? '<w:r><w:br w:type="page"/></w:r>' : ''}${text ? wRun(text, bold, size, color) : ''}</w:p>`;
  }
  function wTable(rows, header = false, widths = [4800,4800]) {
    const cells = (row, isHeader) => row.map((cell, i) => `<w:tc><w:tcPr><w:tcW w:w="${widths[i] || widths[0]}" w:type="dxa"/>${isHeader ? '<w:shd w:fill="F1F4F3"/>' : ''}</w:tcPr>${wParagraph(cell, { bold: isHeader, size: isHeader ? 18 : 18, color: isHeader ? '2F6F6D' : '' })}</w:tc>`).join('');
    return `<w:tbl><w:tblPr><w:tblBorders><w:top w:val="single" w:sz="4" w:color="D2D7D6"/><w:left w:val="single" w:sz="4" w:color="D2D7D6"/><w:bottom w:val="single" w:sz="4" w:color="D2D7D6"/><w:right w:val="single" w:sz="4" w:color="D2D7D6"/><w:insideH w:val="single" w:sz="4" w:color="D2D7D6"/><w:insideV w:val="single" w:sz="4" w:color="D2D7D6"/></w:tblBorders></w:tblPr>${rows.map((row, idx) => `<w:tr>${cells(row, header && idx === 0)}</w:tr>`).join('')}</w:tbl>`;
  }
  function domText(selector) { return document.querySelector(selector)?.textContent?.replace(/\s+/g,' ').trim() || ''; }
  function domList(selector) { return [...document.querySelectorAll(selector)].map((x) => x.textContent.replace(/\s+/g,' ').trim()).filter(Boolean); }
  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function buildDocx() {
    render();
    const summaryRows = [...document.querySelectorAll('.summary-table tr')]
      .filter((tr) => !tr.classList.contains('is-hidden'))
      .map((tr) => [tr.children[0]?.textContent?.trim() || '', tr.children[1]?.textContent?.trim() || '']);
    const feeRows = [...document.querySelectorAll('.fee-table tr')].map((tr) => [tr.children[0]?.textContent?.trim() || '', tr.children[1]?.textContent?.trim() || '']);
    const clientLines = [value('legalName') || '[Ragione sociale Cliente]', value('address') || '[Indirizzo]', value('city') || '[CAP e città]', `P. IVA ${value('vat') || '[Partita IVA]'}`].join(' · ');
    const objectiveParagraphs = domList('#objectiveText p');
    const serviceItems = domList('#serviceList li');
    const exclusions = domList('#exclusionList li');
    const body = [];
    body.push(wParagraph('SOMO S.r.l.  |  BLACK NOODLES', { bold:true, size:18, color:'2F6F6D', after:120 }));
    body.push(wParagraph('ALLEGATO A – OFFERTA ECONOMICA E SCOPE OF WORK', { bold:true, size:30, after:160 }));
    body.push(wTable([
      ['FORNITORE','CLIENTE'],
      ['SOMO S.r.l. · Vico Sant’Eframo Vecchio, 20 · 80137 Napoli (NA) · P. IVA 10895731213', clientLines]
    ], true));
    body.push(wParagraph('OGGETTO', { bold:true, size:20, color:'2F6F6D', before:140, after:50 }));
    body.push(wParagraph(domText('#objectText'), { size:19, after:130 }));
    body.push(wParagraph('SINTESI DELL’OFFERTA', { bold:true, size:23, after:80 }));
    body.push(wTable(summaryRows.map((r) => [r[0], r[1]]), false, [3600,6000]));
    body.push(wParagraph('1. OBIETTIVO DELLA COLLABORAZIONE', { bold:true, size:23, before:160, after:70 }));
    objectiveParagraphs.forEach((p) => body.push(wParagraph(p, { size:19, after:55 })));
    body.push(wParagraph('2. SERVIZI INCLUSI', { bold:true, size:23, before:120, after:70 }));
    serviceItems.forEach((p) => body.push(wParagraph(`• ${p}`, { size:18, after:45 })));
    body.push(wParagraph(domText('#productionHeading'), { bold:true, size:23, before:120, after:70 }));
    body.push(wParagraph(domText('#productionText'), { size:18, after:80 }));
    body.push(wParagraph('', { pageBreak:true, after:0 }));
    body.push(wParagraph('4. COMPENSO', { bold:true, size:23, after:80 }));
    body.push(wTable(feeRows, false, [4800,4800]));
    body.push(wParagraph('5. NON INCLUSO', { bold:true, size:23, before:170, after:70 }));
    exclusions.forEach((p) => body.push(wParagraph(`• ${p}`, { size:18, after:45 })));
    body.push(wParagraph('Le eventuali attività aggiuntive saranno concordate e preventivate separatamente.', { size:18, after:120 }));
    body.push(wParagraph('6. PAGAMENTO E VALIDITÀ', { bold:true, size:23, before:120, after:70 }));
    [domText('#paymentText'),domText('#invoiceText'),domText('#validityText')].filter(Boolean).forEach((p) => body.push(wParagraph(p, { size:18, after:55 })));
    body.push(wParagraph(`Data: ${dateItalian(value('documentDate'))}`, { size:18, before:200, after:160 }));
    body.push(wParagraph('Per accettazione', { bold:true, size:18, after:50 }));
    body.push(wParagraph('Firma e Timbro del Cliente  _____________________________________________', { size:18, after:220 }));
    body.push(wParagraph('SOMO S.r.l. · Vico Sant’Eframo Vecchio, 20 – 80137 Napoli (NA) · P. IVA 10895731213 · PEC somonapoli@pec.it', { size:14, color:'666666', align:'center', after:0 }));

    const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${body.join('')}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="900" w:right="1050" w:bottom="900" w:left="1050" w:header="0" w:footer="0" w:gutter="0"/></w:sectPr></w:body></w:document>`;
    const stylesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Nunito" w:hAnsi="Nunito" w:eastAsia="Nunito"/><w:sz w:val="20"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="80"/></w:pPr></w:pPrDefault></w:docDefaults></w:styles>`;
    const files = {
      '[Content_Types].xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/><Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/></Types>`,
      '_rels/.rels': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/></Relationships>`,
      'word/document.xml': documentXml,
      'word/styles.xml': stylesXml,
      'word/_rels/document.xml.rels': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`,
      'docProps/core.xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>Allegato A SOMO</dc:title><dc:creator>SOMO S.r.l.</dc:creator><cp:lastModifiedBy>SOMO S.r.l.</cp:lastModifiedBy><dcterms:created xsi:type="dcterms:W3CDTF">${new Date().toISOString()}</dcterms:created></cp:coreProperties>`,
      'docProps/app.xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"><Application>Microsoft Office Word</Application></Properties>`
    };
    return zipStore(files);
  }

  function downloadWord(button) {
    button?.classList.add('is-loading');
    try {
      const bytes = buildDocx();
      const name = (value('clientName') || value('legalName') || 'Cliente').replace(/[^a-zA-Z0-9À-ÿ_-]+/g,'_');
      downloadBlob(new Blob([bytes], { type:'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }), `Allegato_A_${name}.docx`);
    } catch (error) {
      console.error(error);
      alert('Non è stato possibile generare il file Word. Riprova dopo aver ricaricato la pagina.');
    } finally {
      setTimeout(() => button?.classList.remove('is-loading'), 250);
    }
  }

  fields.forEach((field) => field.addEventListener('input', render));
  el('proposalMode').addEventListener('change', () => { syncProposalMode(); render(); });
  el('clientType').addEventListener('change', applyClientPreset);
  el('toggleObjectivesButton').addEventListener('click', () => { showAllObjectives = !showAllObjectives; updateObjectiveVisibility(); });
  el('tiktokStatus').addEventListener('change', render);
  el('printButton').addEventListener('click', () => window.print());
  el('printButtonTop').addEventListener('click', () => window.print());
  el('wordButton').addEventListener('click', () => downloadWord(el('wordButton')));
  el('wordButtonTop').addEventListener('click', () => downloadWord(el('wordButtonTop')));
  el('resetButton').addEventListener('click', () => {
    if (!window.confirm('Vuoi ripristinare tutti i campi?')) return;
    try { localStorage.removeItem(STORAGE_KEY); } catch (_) {}
    applyState(defaultState);
    showAllObjectives = false;
    render();
  });

  applyState(loadState());
  syncProposalMode();
  render();
})();
