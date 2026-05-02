import {
  doc, getDoc, setDoc, updateDoc, deleteDoc,
  collection, getDocs, addDoc, query, orderBy, limit,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';

export async function getSiteConfig() {
  try {
    const snap = await getDoc(doc(db, 'site_config', 'general'));
    return snap.exists() ? snap.data() : null;
  } catch (err) {
    return null;
  }
}

export async function updateSiteConfig(data) {
  await setDoc(doc(db, 'site_config', 'general'), {
    ...data,
    updatedAt: serverTimestamp(),
  }, { merge: true });
}

export async function getHomeContent() {
  try {
    const snap = await getDoc(doc(db, 'site_config', 'home'));
    return snap.exists() ? snap.data() : null;
  } catch (err) {
    return null;
  }
}

export async function updateHomeContent(data) {
  await setDoc(doc(db, 'site_config', 'home'), {
    ...data,
    updatedAt: serverTimestamp(),
  }, { merge: true });
}

export async function getServicesContent() {
  try {
    const snap = await getDoc(doc(db, 'site_config', 'services'));
    return snap.exists() ? snap.data() : null;
  } catch (err) {
    return null;
  }
}

export async function updateServicesContent(data) {
  await setDoc(doc(db, 'site_config', 'services'), {
    ...data,
    updatedAt: serverTimestamp(),
  }, { merge: true });
}

export async function getBridalContent() {
  try {
    const snap = await getDoc(doc(db, 'site_config', 'bridal'));
    return snap.exists() ? snap.data() : null;
  } catch (err) {
    return null;
  }
}

export async function updateBridalContent(data) {
  await setDoc(doc(db, 'site_config', 'bridal'), {
    ...data,
    updatedAt: serverTimestamp(),
  }, { merge: true });
}

export async function getPortfolioContent() {
  try {
    const snap = await getDoc(doc(db, 'site_config', 'portfolio'));
    return snap.exists() ? snap.data() : null;
  } catch (err) {
    return null;
  }
}

export async function updatePortfolioContent(data) {
  await setDoc(doc(db, 'site_config', 'portfolio'), {
    ...data,
    updatedAt: serverTimestamp(),
  }, { merge: true });
}

export async function getContactConfig() {
  try {
    const snap = await getDoc(doc(db, 'site_config', 'contact'));
    return snap.exists() ? snap.data() : null;
  } catch (err) {
    return null;
  }
}

export async function updateContactConfig(data) {
  await setDoc(doc(db, 'site_config', 'contact'), {
    ...data,
    updatedAt: serverTimestamp(),
  }, { merge: true });
}

export async function submitContactForm(formData) {
  return await addDoc(collection(db, 'contact_submissions'), {
    ...formData,
    createdAt: serverTimestamp(),
    read: false,
  });
}

export async function getContactSubmissions(maxItems = 50) {
  const q = query(
    collection(db, 'contact_submissions'),
    orderBy('createdAt', 'desc'),
    limit(maxItems)
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function markSubmissionRead(submissionId) {
  await updateDoc(doc(db, 'contact_submissions', submissionId), {
    read: true,
  });
}

export async function deleteSubmission(submissionId) {
  await deleteDoc(doc(db, 'contact_submissions', submissionId));
}
