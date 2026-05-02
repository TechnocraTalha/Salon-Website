'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';

export default function ImageUploader({ currentUrl, onUpload, folder = 'salon' }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentUrl || '');
  const [error, setError] = useState('');
  const fileRef = useRef(null);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');
    setUploading(true);

    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target.result);
    reader.readAsDataURL(file);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();

      if (res.ok && data.url) {
        setPreview(data.url);
        onUpload?.(data.url);
      } else {
        setError(data.error || 'Upload failed');
        setPreview(currentUrl || '');
      }
    } catch {
      setError('Network error');
      setPreview(currentUrl || '');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {preview && (
        <div style={{
          width: '100%', maxWidth: 400, height: 200,
          overflow: 'hidden', borderRadius: 4,
          background: '#e8e8e3',
          position: 'relative'
        }}>
          <Image src={preview} alt="Preview" fill style={{ objectFit: 'cover' }} />
        </div>
      )}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input type="file" ref={fileRef} accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
        <button className="admin-btn admin-btn-outline" onClick={() => fileRef.current?.click()} disabled={uploading}>
          {uploading ? 'Uploading...' : 'Change Image'}
        </button>
      </div>
    </div>
  );
}
