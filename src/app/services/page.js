import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Image from 'next/image';
import { getServicesContent, getSiteConfig } from '@/lib/firestore';
import { servicesContent as defaultServices, siteConfig as defaultSiteConfig } from '@/lib/data';
import styles from './page.module.css';

export const revalidate = 60;

export default async function ServicesPage() {
  const [fetchedServices, fetchedConfig] = await Promise.all([
    getServicesContent(),
    getSiteConfig(),
  ]);

  const sData = fetchedServices || defaultServices;
  const configData = fetchedConfig || defaultSiteConfig;
  const { hero, categories } = sData;

  return (
    <>
      <Header siteConfig={configData} />
      <main className="pt-xl">
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <span className="text-label-caps color-amber mb-sm">{hero.label}</span>
              <h1 className="text-display">{hero.title}</h1>
              <p className="text-body-lg color-muted mt-md">{hero.subtitle}</p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container">
            <div className={styles.categoriesGrid}>
              {categories.map((cat) => (
                <div key={cat.id} className={styles.categoryCard}>
                  <div className={styles.categoryImageWrap}>
                    <Image src={cat.image} alt={cat.name} fill className={styles.categoryImage} sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
                  </div>
                  <div className={styles.categoryContent}>
                    <h3 className="text-headline-sm">{cat.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer siteConfig={configData} />
      <WhatsAppButton siteConfig={configData} />
    </>
  );
}
