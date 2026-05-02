import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import PortfolioGallery from '@/components/PortfolioGallery';
import { getPortfolioContent, getSiteConfig } from '@/lib/firestore';
import { portfolioContent as defaultPortfolio, siteConfig as defaultSiteConfig } from '@/lib/data';
import styles from './page.module.css';

export const revalidate = 60;

export default async function PortfolioPage() {
  const [fetchedPortfolio, fetchedConfig] = await Promise.all([
    getPortfolioContent(),
    getSiteConfig(),
  ]);

  const pData = fetchedPortfolio || defaultPortfolio;
  const configData = fetchedConfig || defaultSiteConfig;
  const { hero, categories, items } = pData;

  return (
    <>
      <Header siteConfig={configData} />
      <main className="pt-xl">
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <h1 className="text-display">{hero.title}</h1>
              <p className="text-body-lg color-muted mt-md">{hero.subtitle}</p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container">
            <PortfolioGallery categories={categories} items={items} />
          </div>
        </section>
      </main>
      <Footer siteConfig={configData} />
      <WhatsAppButton siteConfig={configData} />
    </>
  );
}
