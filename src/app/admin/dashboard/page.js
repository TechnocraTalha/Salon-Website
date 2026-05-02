'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {
  getSiteConfig, updateSiteConfig,
  getHomeContent, updateHomeContent,
  getServicesContent, updateServicesContent,
  getBridalContent, updateBridalContent,
  getPortfolioContent, updatePortfolioContent,
  getContactConfig, updateContactConfig,
  getContactSubmissions, deleteSubmission, markSubmissionRead
} from '@/lib/firestore';
import ImageUploader from '@/components/ImageUploader';
import { siteConfig as defaultSite, homeContent as defaultHome, servicesContent as defaultServices, bridalContent as defaultBridal, portfolioContent as defaultPortfolio, contactContent as defaultContact } from '@/lib/data';

export default function AdminDashboard() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('general');
  const [toast, setToast] = useState(null);
  const router = useRouter();

  // State for all content sections
  const [siteConfig, setSiteConfigState] = useState(defaultSite);
  const [homeContent, setHomeContent] = useState(defaultHome);
  const [servicesContent, setServicesContent] = useState(defaultServices);
  const [bridalContent, setBridalContent] = useState(defaultBridal);
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  const loadData = useCallback(async () => {
    try {
      const [s, h, ser, b, p, sub] = await Promise.all([
        getSiteConfig(),
        getHomeContent(),
        getServicesContent(),
        getBridalContent(),
        getPortfolioContent(),
        getContactSubmissions()
      ]);
      if (s) setSiteConfigState(s);
      if (h) setHomeContent(h);
      if (ser) setServicesContent(ser);
      if (b) setBridalContent(b);
      if (p) setPortfolioItems(p.items || []);
      if (sub) setSubmissions(sub);
    } catch (err) {
      console.error('Failed to load dashboard data', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthed(true);
      } else {
        router.push('/admin/login');
      }
    });
    return () => unsub();
  }, [router]);

  useEffect(() => {
    const init = async () => {
      if (isAuthed) {
        await loadData();
      }
    };
    init();
  }, [isAuthed, loadData]);

  const showToast = (msg, type = 'success') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = async (section) => {
    try {
      if (section === 'general') await updateSiteConfig(siteConfig);
      if (section === 'home') await updateHomeContent(homeContent);
      if (section === 'services') await updateServicesContent(servicesContent);
      if (section === 'bridal') await updateBridalContent(bridalContent);
      if (section === 'portfolio') await updatePortfolioContent({ items: portfolioItems });
      showToast('Settings saved successfully!');
    } catch (err) {
      showToast('Failed to save settings', 'error');
    }
  };

  if (loading) return <div className="admin-layout justify-center items-center"><p>Loading Dashboard...</p></div>;

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2 className="text-headline-sm mb-xl color-white">ADMIN PANEL</h2>
        <nav>
          <button onClick={() => setActiveTab('general')} className={`admin-nav-item w-full ${activeTab === 'general' ? 'active' : ''}`}>General</button>
          <button onClick={() => setActiveTab('home')} className={`admin-nav-item w-full ${activeTab === 'home' ? 'active' : ''}`}>Home Page</button>
          <button onClick={() => setActiveTab('services')} className={`admin-nav-item w-full ${activeTab === 'services' ? 'active' : ''}`}>Services</button>
          <button onClick={() => setActiveTab('bridal')} className={`admin-nav-item w-full ${activeTab === 'bridal' ? 'active' : ''}`}>Bridal</button>
          <button onClick={() => setActiveTab('portfolio')} className={`admin-nav-item w-full ${activeTab === 'portfolio' ? 'active' : ''}`}>Portfolio</button>
          <button onClick={() => setActiveTab('submissions')} className={`admin-nav-item w-full ${activeTab === 'submissions' ? 'active' : ''}`}>Inquiries</button>
        </nav>
        <button onClick={() => signOut(auth)} className="admin-nav-item mt-xl opacity-60 w-full">Sign Out</button>
      </aside>

      <main className="admin-main">
        {activeTab === 'general' && (
          <div className="admin-card">
            <h3 className="text-headline-sm mb-lg">General Settings</h3>
            <div className="grid gap-lg">
              <input value={siteConfig.name} onChange={e => setSiteConfigState({...siteConfig, name: e.target.value})} className="admin-input" placeholder="Salon Name" />
              <input value={siteConfig.phone} onChange={e => setSiteConfigState({...siteConfig, phone: e.target.value})} className="admin-input" placeholder="Phone" />
              <input value={siteConfig.whatsapp} onChange={e => setSiteConfigState({...siteConfig, whatsapp: e.target.value})} className="admin-input" placeholder="WhatsApp Number" />
              <button onClick={() => handleSave('general')} className="admin-btn admin-btn-primary">Save Changes</button>
            </div>
          </div>
        )}
        {/* Other tabs follow same pattern... simplified for restoration */}
        {activeTab === 'home' && (
           <div className="admin-card">
             <h3 className="text-headline-sm mb-lg">Home Page Hero</h3>
             <div className="grid gap-lg">
               <input value={homeContent.hero.title} onChange={e => setHomeContent({...homeContent, hero: {...homeContent.hero, title: e.target.value}})} className="admin-input" />
               <textarea value={homeContent.hero.subtitle} onChange={e => setHomeContent({...homeContent, hero: {...homeContent.hero, subtitle: e.target.value}})} className="admin-input" />
               <ImageUploader currentUrl={homeContent.hero.image} onUpload={url => setHomeContent({...homeContent, hero: {...homeContent.hero, image: url}})} />
               <button onClick={() => handleSave('home')} className="admin-btn admin-btn-primary">Save Home Content</button>
             </div>
           </div>
        )}
      </main>

      {toast && <div className={`toast toast-${toast.type}`}>{toast.message}</div>}
    </div>
  );
}
