import React, { useRef, useState } from "react";
import { FileText, UploadCloud, Trash2 } from "lucide-react";

export default function Documents() {
  const inputRef = useRef(null);
  const [docs, setDocs] = useState([]);

  const addFiles = (files) => {
    const list = Array.from(files).map((f) => ({
      id: `${f.name}-${f.size}-${Date.now()}`,
      name: f.name,
      size: f.size,
      date: new Date().toLocaleDateString(),
    }));
    setDocs((d) => [...list, ...d]);
  };

  const remove = (id) => setDocs((d) => d.filter((x) => x.id !== id));

  return (
    <section className="container-xx">
      <h2 className="hero-title" style={{ marginBottom: 12 }}>Documents</h2>

      <div className="panel" style={{ marginBottom: 12 }}>
        <div className="split">
          <div className="split-left">
            <UploadCloud size={20} />
            <div><strong>Upload files</strong><div className="subtle">PDF, DOCX, PNG, JPG</div></div>
          </div>
          <div className="split-right">
            <input ref={inputRef} type="file" multiple hidden onChange={(e) => addFiles(e.target.files)} />
            <button className="cta solid" onClick={() => inputRef.current?.click()}>Choose files</button>
          </div>
        </div>
      </div>

      <div className="list">
        {docs.length === 0 && (
          <div className="panel subtle">No documents yet. Upload to share with your lawyer.</div>
        )}
        {docs.map((d) => (
          <article key={d.id} className="doc-card">
            <div className="doc-left"><FileText size={22} /></div>
            <div className="doc-mid">
              <div className="doc-title">{d.name}</div>
              <div className="doc-sub">{(d.size/1024).toFixed(1)} KB • {d.date}</div>
            </div>
            <div className="doc-actions">
              <button className="cta ghost" onClick={() => remove(d.id)}><Trash2 size={16} /><span>Remove</span></button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
