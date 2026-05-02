import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Image from 'next/image';
import { getHomeContent, getSiteConfig } from '@/lib/firestore';
import { homeContent as defaultHome, siteConfig as defaultSiteConfig } from '@/lib/data';
import styles from './page.module.css';

export const revalidate = 60;

export default async function HomePage() {
  const [fetchedHome, fetchedConfig] = await Promise.all([
    getHomeContent(),
    getSiteConfig(),
  ]);

  const hData = fetchedHome || defaultHome;
  const configData = fetchedConfig || defaultSiteConfig;
  const { hero } = hData;

  return (
    <>
      <Header siteConfig={configData} />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <span className="text-label-caps color-outline">{hero.label}</span>
            <h1 className="text-display">{hero.title}</h1>
            <p className="text-body-lg color-muted" style={{maxWidth:560, marginTop:24}}>{hero.subtitle}</p>
            <a href="/contact#booking" className="btn btn-primary text-button" style={{marginTop:32}}>{hero.cta}</a>
          </div>
          <div className={styles.heroImageWrap}>
            <Image src={hero.image} alt="Salon Interior" className={styles.heroImage} fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
            <div className={styles.heroOverlay}></div>
          </div>
        </section>
      </main>
      <Footer siteConfig={configData} />
      <WhatsAppButton siteConfig={configData} />
    </>
  );
}
