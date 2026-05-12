# ReadyEcom

Un'innovativa piattaforma infobusiness per corsi di sviluppo cognitivo ed educazione interattiva, costruita con Next.js e configurabile via JSON.

## 🎯 Caratteristiche

- **Piattaforma Infobusiness**: Gestione corsi online con configurazione centralizzata
- **Responsivo**: Design mobile-first con supporto per dark mode
- **Corsi Dinamici**: Configurazione completa tramite file JSON
- **Componenti Moderni**: Built con React 19 e Tailwind CSS
- **TypeScript**: Tipizzazione completa per maggiore affidabilità

## 🚀 Getting Started

### Prerequisiti
- Node.js 18+ 
- npm o yarn

### Installazione

```bash
# Clona il repository
git clone https://github.com/AlessioOliviero95/readyecom.git
cd readyecom

# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000) nel tuo browser per vedere il risultato.

## 📁 Struttura del Progetto

```
readyecom/
├── app/                  # App directory di Next.js
│   ├── page.tsx         # Homepage con hero e corsi in evidenza
│   ├── courses/page.tsx # Pagina completa dei corsi
│   └── layout.tsx       # Layout principale
├── components/          # Componenti React
│   ├── Navigation.tsx   # Navigazione dinamica
│   └── ProductGrid.tsx  # Griglia dei corsi
├── config/              # Configurazione JSON
│   ├── site.json       # Configurazione tema e features
│   ├── navigation.json # Menu e navigazione
│   └── products.json   # Dati dei corsi
├── lib/                # Utility e funzioni server
│   └── config.ts      # Funzioni di lettura config
└── public/            # Asset statici
    └── images/        # Immagini del sito
```

## ⚙️ Configurazione

### site.json
Configura il tema, il nome del sito e le features attive:

```json
{
  "site": {
    "name": "ReadyEcom",
    "description": "La tua piattaforma di apprendimento"
  },
  "features": {
    "darkMode": true,
    "cart": true,
    "categories": false
  }
}
```

### products.json
Aggiungi corsi con descrizione, prezzo, rating e varianti.

### navigation.json
Configura il menu principale, footer e social media.

## 🛠️ Sviluppo

```bash
# Avvia server di sviluppo
npm run dev

# Build per produzione
npm run build

# Esegui build di produzione
npm run start

# Lint del codice
npm run lint
```

## 📦 Dipendenze Principali

- **Next.js 15**: Framework React moderno
- **React 19**: UI library
- **TypeScript**: Tipizzazione statica
- **Tailwind CSS**: Utility-first CSS

## 🌐 Deploy

Il progetto è pronto per essere deployato su Vercel:

```bash
npm run build
npm run start
```

O usa Vercel Platform per un deploy automatico dal repository GitHub.

## 📝 License

Questo progetto è aperto per uso privato.

## 👤 Autore

Alessio Oliviero

