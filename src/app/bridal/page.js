import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Image from 'next/image';
import { getBridalContent, getSiteConfig } from '@/lib/firestore';
import { bridalContent as defaultBridal, siteConfig as defaultSiteConfig } from '@/lib/data';
import styles from './page.module.css';

export const revalidate = 60;

export default async function BridalPage() {
  const [fetchedBridal, fetchedConfig] = await Promise.all([
    getBridalContent(),
    getSiteConfig(),
  ]);

  const bData = fetchedBridal || defaultBridal;
  const configData = fetchedConfig || defaultSiteConfig;
  const { hero, experience } = bData;

  return (
    <>
      <Header siteConfig={configData} />
      <main className="pt-xl">
        <section className={styles.hero}>
          <div className={styles.heroImageWrap}>
            <Image src={hero.image} alt="Bridal Styling" fill className={styles.heroImage} priority sizes="100vw" style={{ objectFit: 'cover' }} />
            <div className={styles.heroOverlay}></div>
          </div>
          <div className="container">
            <div className={styles.heroContent}>
              <span className="chip text-label-caps mb-sm color-white">{hero.chip}</span>
              <h1 className="text-display color-white">{hero.title}</h1>
              <p className="text-body-lg color-white opacity-80 mt-md">{hero.subtitle}</p>
              <a href="/contact#bridal" className="btn btn-primary mt-xl">{hero.cta}</a>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container">
            <div className="grid md-grid-2 gap-2xl items-center">
              <div className="relative h-[500px]">
                <Image src={experience.mainImage} alt="Salon Experience" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              <div>
                <span className="text-label-caps color-amber mb-sm">{experience.label}</span>
                <h2 className="text-headline-lg mb-md">{experience.title}</h2>
                <div className="grid gap-lg mt-xl">
                  {experience.cards.map((card, idx) => (
                    <div key={idx} className="card p-lg">
                      <span className="material-symbols-outlined color-amber mb-sm">{card.icon}</span>
                      <h4 className="text-headline-sm mb-xs">{card.title}</h4>
                      <p className="text-body-md color-muted">{card.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer siteConfig={configData} />
      <WhatsAppButton siteConfig={configData} />
    </>
  );
}
