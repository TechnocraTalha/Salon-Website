import styles from './Footer.module.css';
import Link from 'next/link';

export default function Footer({ siteConfig }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <h3 className="text-headline-sm mb-sm color-white">{siteConfig?.name || 'MUSTAKEEM HANDSOME SALON'}</h3>
            <p className="text-body-md color-muted">
              Redefining grooming through precision, passion, and premium care.
            </p>
          </div>

          <div className={styles.contact}>
            <h4 className="text-label-caps mb-md color-white">Contact Us</h4>
            <p className="text-body-md color-muted">{siteConfig?.address.line1}</p>
            <p className="text-body-md color-muted">{siteConfig?.address.line2}</p>
            <p className="text-body-md color-muted mt-sm">{siteConfig?.phone}</p>
          </div>

          <div className={styles.hours}>
            <h4 className="text-label-caps mb-md color-white">Opening Hours</h4>
            <p className="text-body-md color-muted">{siteConfig?.hours.weekday}</p>
            <p className="text-body-md color-muted">{siteConfig?.hours.weekend}</p>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className="text-label-caps color-muted">
            © {currentYear} {siteConfig?.name}. All rights reserved.
          </p>
          <Link href="/admin/login" className="text-label-caps color-muted">Admin Access</Link>
        </div>
      </div>
    </footer>
  );
}
