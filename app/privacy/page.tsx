import type { Metadata } from 'next';
import PageContainer from '@/components/PageContainer';

export const metadata: Metadata = {
  title: 'Privacy Policy | ReadyEcom',
  description: 'Informativa sulla privacy e trattamento dei dati personali.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12 sm:py-16">
      <PageContainer size="narrow">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-8 sm:p-12">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-400 dark:text-gray-500 mb-8">
            Ultimo aggiornamento: maggio 2026
          </p>

          <div className="prose prose-gray dark:prose-invert max-w-none space-y-8 text-gray-600 dark:text-gray-400 leading-relaxed">

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">1. Titolare del trattamento</h2>
              <p>
                ReadyEcom è il titolare del trattamento dei dati personali raccolti tramite questo sito web.
                Per qualsiasi domanda relativa alla privacy, contattaci all&apos;indirizzo email indicato nella pagina Contatti.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">2. Dati raccolti</h2>
              <p>
                Raccogliamo i seguenti dati personali:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Indirizzo email (per la gestione degli ordini e le comunicazioni)</li>
                <li>Dati di pagamento (trattati direttamente da Stripe — non archiviamo dati di carta)</li>
                <li>Dati di navigazione (tramite cookie tecnici anonimi)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">3. Finalità del trattamento</h2>
              <p>
                I dati vengono utilizzati esclusivamente per: evasione degli ordini, assistenza clienti,
                conformità agli obblighi di legge e, previo consenso, per comunicazioni promozionali.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">4. Pagamenti sicuri</h2>
              <p>
                I pagamenti sono gestiti da <strong>Stripe</strong>, certificato PCI DSS Level 1.
                Non archiviamo mai i dati della tua carta di credito sui nostri server.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">5. I tuoi diritti</h2>
              <p>
                Ai sensi del GDPR hai il diritto di accedere, modificare o cancellare i tuoi dati personali.
                Per esercitare questi diritti, contattaci tramite la pagina Contatti.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">6. Cookie</h2>
              <p>
                Questo sito utilizza solo cookie tecnici strettamente necessari al funzionamento.
                Non utilizziamo cookie di profilazione o di marketing senza il tuo consenso.
              </p>
            </section>

          </div>
        </div>
      </PageContainer>
    </div>
  );
}
