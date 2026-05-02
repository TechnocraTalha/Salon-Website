import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ContactClient from '@/components/ContactClient';
import { getContactConfig, getSiteConfig } from '@/lib/firestore';
import { contactContent as defaultContact, siteConfig as defaultSiteConfig } from '@/lib/data';
import styles from './page.module.css';

export const revalidate = 60;

export default async function ContactPage() {
  const [fetchedContact, fetchedConfig] = await Promise.all([
    getContactConfig(),
    getSiteConfig(),
  ]);

  const cData = fetchedContact || defaultContact;
  const configData = fetchedConfig || defaultSiteConfig;
  const { hero } = cData;

  return (
    <>
      <Header siteConfig={configData} />
      <main className="pt-xl">
        <section className={styles.hero}>
          <div className="container">
            <h1 className="text-display">{hero.title}</h1>
            <p className="text-body-lg color-muted mt-md">{hero.subtitle}</p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container">
            <ContactClient siteConfig={configData} />
          </div>
        </section>
      </main>
      <Footer siteConfig={configData} />
      <WhatsAppButton siteConfig={configData} />
    </>
  );
}
