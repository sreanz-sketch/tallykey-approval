// Config — edit these values directly
const BUILDER_PIN   = window.BUILDER_PIN   || "1234";
const FORMSPREE_ID  = window.FORMSPREE_ID  || "";
const FORMSPREE_URL = FORMSPREE_ID ? `https://formspree.io/f/${FORMSPREE_ID}` : "";

const { useState, useRef, useEffect } = React;

const brand = {
  blue:      "#2C2E69",   // TallyKey brand navy (sampled from website header)
  blueDark:  "#1E2050",   // Hover / active state
  blueLight: "#EEEEF5",   // Tint backgrounds
  navy:      "#1A1C3E",   // Dark text / header
  navyMid:   "#2C2E69",   // Secondary dark
  gold:      "#F5A623",   // Accent
  offWhite:  "#F7F8FB",   // Page background
  border:    "#D8D9E8",   // Subtle blue-tinted borders
  textMid:   "#4A4C6E",   // Mid-tone body text
  textLight: "#8A8CAE",   // Captions / labels
  success:   "#2E7D48",
  successBg: "#EBF5EF",
};

// TallyKey logo — official white SVG from branding folder
const MPLogo = ({ size = 1 }) => (
  <svg width={160*size} height={44*size} viewBox="0 0 446.72 121.89" xmlns="http://www.w3.org/2000/svg">
    <path fill="#fff" strokeWidth="0" d="M56.45,88.33c0,.64-.43,1.18-1.18,1.49-1.92.53-6.62,1.92-13.23,1.92-11.42,0-17.19-4.59-17.19-16.01V19.39c0-1.17.53-1.6,1.71-1.81l8.64-1.82h.43c.85,0,1.39.64,1.39,1.6v17.29h16.22c.96,0,1.6.64,1.6,1.6v5.87c0,.96-.64,1.6-1.6,1.6h-16.22v32.12c0,5.12,2.35,6.94,7.9,6.94,3.2,0,6.83-.75,8.75-1.18h.32c.64,0,1.07.43,1.28,1.07l1.07,5.23c.11.21.11.32.11.43Z"/>
    <path fill="#fff" strokeWidth="0" d="M103.39,90.58c-3.52.85-8.54,1.49-14.41,1.49-10.67,0-25.3-.85-25.3-17.93,0-13.98,8.32-15.15,17.72-16.76l19.43-3.2v-3.95c0-3.2-.22-5.55-3.31-6.83-1.82-.75-4.59-1.07-8.75-1.07-7.68,0-15.26,2.13-18.89,2.99-.21,0-.43.11-.75.11-.43,0-.96-.21-1.07-.85l-1.28-5.98v-.32c0-.96.64-1.28,1.17-1.49,2.99-1.07,12.49-3.52,22.95-3.52,7.58,0,12.59,1.07,15.9,2.88,5.55,3.09,6.08,8.11,6.08,13.77v29.56c0,7.79-2.13,9.39-9.5,11.1ZM100.83,62.61l-15.69,2.56c-4.59.75-9.07,1.17-9.07,8.75,0,9.18,7.47,9.82,13.24,9.82,4.37,0,8.43-.64,11.53-1.71v-19.43Z"/>
    <path fill="#fff" strokeWidth="0" d="M149.71,88.98c0,.85-.64,1.28-.85,1.28-.96.43-3.95,1.39-8.86,1.39-8.43,0-13.13-4.48-13.13-12.81V13.94c0-1.17.53-1.6,1.6-1.81l8.75-1.71h.43c.85,0,1.39.64,1.39,1.6v66.07c0,3.84,2.35,4.59,4.48,4.59,1.6,0,2.99-.21,3.74-.43h.43c.43,0,.85.21.96.96l1.07,5.34v.43Z"/>
    <path fill="#fff" strokeWidth="0" d="M181.94,88.98c0,.85-.64,1.28-.85,1.28-.96.43-3.95,1.39-8.86,1.39-8.43,0-13.13-4.48-13.13-12.81V13.94c0-1.17.53-1.6,1.6-1.81l8.75-1.71h.43c.85,0,1.38.64,1.38,1.6v66.07c0,3.84,2.35,4.59,4.48,4.59,1.6,0,2.99-.21,3.74-.43h.43c.43,0,.85.21.96.96l1.07,5.34v.43Z"/>
    <path fill="#fff" strokeWidth="0" d="M217.9,97.94c-2.99,9.92-6.51,15.15-19.1,15.15-5.23,0-7.15-.32-8.97-.64-1.07-.11-1.39-.75-1.39-1.5l.11-5.66c0-.75.32-1.49,1.39-1.49h.11c1.39.1,4.06.21,6.3.21,5.44,0,8.33-1.39,9.82-6.73l1.92-6.61h-5.98c-1.07,0-1.82-.64-2.14-1.71l-16.44-52.19v-.53c0-.85.64-1.6,1.6-1.6h8.97c1.17,0,1.71.53,2.03,1.6l12.81,46.43h2.77l11.63-46.43c.32-1.07.96-1.6,2.14-1.6h9.28c.96,0,1.71.64,1.71,1.6,0,.1-.11.32-.11.43l-18.47,61.26Z"/>
    <path fill="#fff" strokeWidth="0" d="M294.21,89.72c0,.43-.43.96-1.07.96h-12.28c-.43,0-.85-.11-1.28-.64l-18.68-23.05h-3.84v22.09c0,.96-.64,1.6-1.6,1.6h-8.86c-.96,0-1.71-.64-1.71-1.6V14.05c0-1.17.53-1.71,1.6-1.92l8.75-1.71h.32c.96,0,1.49.64,1.49,1.6v46.43h3.84l18.57-23.16c.43-.53.85-.64,1.17-.64h.11l10.99.21c.64,0,1.07.53,1.07,1.07,0,.11-.11.32-.21.42l-21.45,25.62,22.84,27.22c.1.11.21.32.21.53Z"/>
    <path fill="#fff" strokeWidth="0" d="M350.11,66.78c0,.96-.64,2.03-1.81,2.03h-37.15c.11,5.23,1.39,8.22,3.95,10.67,2.99,2.88,7.36,3.84,13.77,3.84,6.72,0,11.31-1.49,15.26-2.56.22-.11.43-.11.54-.11.64,0,1.07.32,1.39,1.28l1.28,4.91c.11.11.11.32.11.43,0,.75-.53,1.17-1.17,1.49-3.95,1.6-11.1,3.31-19,3.31-20.92,0-28.39-8.86-28.39-29.25,0-19.32,4.91-29.56,25.83-29.56,10.89,0,17.4,2.99,21.14,8.54,3.41,4.8,4.38,11.53,4.38,19.85,0,1.39,0,3.52-.11,5.12ZM336.98,50.23c-1.6-6.3-5.12-8.32-12.28-8.32-7.79,0-11.2,2.13-12.59,8.11-.85,3.31-.85,6.83-.96,10.46l26.79-.11c0-3.63-.11-6.94-.96-10.14Z"/>
    <path fill="#fff" strokeWidth="0" d="M391.74,97.94c-2.99,9.92-6.51,15.15-19.11,15.15-5.23,0-7.15-.32-8.97-.64-1.07-.11-1.39-.75-1.39-1.5l.11-5.66c0-.75.32-1.49,1.39-1.49h.1c1.39.1,4.06.21,6.3.21,5.44,0,8.32-1.39,9.81-6.73l1.93-6.61h-5.98c-1.07,0-1.82-.64-2.14-1.71l-16.44-52.19v-.53c0-.85.64-1.6,1.6-1.6h8.97c1.17,0,1.71.53,2.03,1.6l12.81,46.43h2.78l11.63-46.43c.32-1.07.96-1.6,2.14-1.6h9.28c.96,0,1.71.64,1.71,1.6,0,.1-.1.32-.1.43l-18.47,61.26Z"/>
    <path fill="#fff" strokeWidth="0" d="M424.93,35.87c-9.81,0-12.49-3.87-12.49-11.98s2.67-12.08,12.49-12.08,12.49,3.96,12.49,12.08-2.64,11.98-12.49,11.98ZM432.7,16.15c-1.48-1.39-3.9-2.02-7.77-2.02s-6.35.66-7.83,2.08c-1.6,1.57-2.11,4.06-2.11,7.68s.51,6.07,2.11,7.64c1.48,1.42,3.9,2.05,7.83,2.05s6.29-.6,7.77-1.98c1.67-1.57,2.17-4.09,2.17-7.74s-.5-6.13-2.17-7.7ZM430.59,30.5h-2.04c-.22,0-.35-.09-.38-.31l-.19-2.93c-.09-1.48-1.1-1.89-2.89-1.95l-2.67-.12v4.91c0,.25-.19.41-.44.41h-1.89c-.28,0-.41-.25-.41-.41v-12.55c0-.28.22-.54.51-.54h5.95c2.8,0,4.53.98,4.53,3.87,0,1.89-.75,2.8-2.93,3.11v.51c.73.06,1.39.19,1.92.53.66.44,1.07,1.16,1.13,2.61l.13,2.49c0,.12-.13.38-.32.38ZM425.31,19.08h-2.9v4.25l2.9-.09c1.79-.1,2.58-.44,2.58-2.02s-.79-2.14-2.58-2.14Z"/>
  </svg>
);

const StepBubble = ({ n, label, active, done }) => (
  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
    <div style={{
      width:26, height:26, borderRadius:"50%",
      background: done ? brand.blue : active ? "#fff" : "transparent",
      border:`2px solid ${done ? brand.blue : active ? "#fff" : "rgba(255,255,255,0.3)"}`,
      display:"flex", alignItems:"center", justifyContent:"center",
      fontSize:11, fontWeight:700, fontFamily:"sans-serif",
      color: done ? "#fff" : active ? brand.navy : "rgba(255,255,255,0.45)",
      flexShrink:0,
    }}>{done ? "✓" : n}</div>
    <span style={{ fontSize:12, fontFamily:"sans-serif", color: active?"#fff":done?"rgba(255,255,255,0.75)":"rgba(255,255,255,0.4)", fontWeight:active?600:400 }}>{label}</span>
  </div>
);
const StepDiv = () => <div style={{ width:24, height:1, background:"rgba(255,255,255,0.2)" }} />;

// Shared styles
const inputSt = {
  width:"100%", padding:"10px 13px",
  border:`1px solid ${brand.border}`, borderRadius:4,
  fontSize:14, color:brand.navy, background:brand.offWhite,
  outline:"none", boxSizing:"border-box", fontFamily:"sans-serif",
};
const cellSt = {
  width:"100%", padding:"7px 9px",
  border:"1px solid transparent", borderRadius:3,
  fontSize:13, color:brand.navy, background:"transparent",
  outline:"none", boxSizing:"border-box", fontFamily:"sans-serif",
  transition:"border-color 0.15s, background 0.15s",
};

// Default table setup
const INIT_COLS = [
  { id:"c1", label:"Model"           },
  { id:"c2", label:"Qty"             },
  { id:"c3", label:"Socket(s) left"  },
  { id:"c4", label:"Socket(s) right" },
  { id:"c5", label:"Water"           },
  { id:"c6", label:"Technology"      },
  { id:"c7", label:"Locking"         },
];
const INIT_ROWS = [
  { id:"r1", c1:"", c2:"", c3:"", c4:"", c5:"", c6:"", c7:"" },
];

let _cid = 8, _rid = 2;

function DesignApproval() {
  // ── PIN gate for builder ─────────────────────────────────────────────────
  const [pinUnlocked, setPinUnlocked] = useState(false);
  const [pinInput, setPinInput]       = useState("");
  const [pinError, setPinError]       = useState(false);

  // Read URL params
  const urlParams = new URLSearchParams(window.location.search);
  const wantsBuilder = urlParams.get("builder") === "1";

  // Decode order data from ?o= param
  const decodeOrder = () => {
    try {
      const raw = urlParams.get("o") || urlParams.get("order");
      if (!raw) return null;
      const data = JSON.parse(decodeURIComponent(escape(atob(raw))));
      if (data.r !== undefined && data.rw && Array.isArray(data.rw[0])) {
        // Compact format — rows are arrays of values, rebuild using default cols
        const builtRows = data.rw.map((vals, ri) => {
          const row = { id: `r${ri+1}` };
          INIT_COLS.forEach((col, ci) => { row[col.id] = vals[ci] || ""; });
          return row;
        });
        return {
          orderRef:    data.r,
          customer:    data.cu,
          contactName: data.cn,
          notes:       data.n || "",
          delivery:    data.d || "",
          cols:        INIT_COLS,
          rows:        builtRows,
          sumCols:     ["c2"],
        };
      }
      // Legacy format fallback
      if (data.r !== undefined) {
        return {
          orderRef:    data.r,
          customer:    data.cu,
          contactName: data.cn,
          notes:       data.n || "",
          delivery:    data.d || "",
          cols:        data.c ? data.c.map(col => ({ id: col.i, label: col.l })) : INIT_COLS,
          rows:        data.rw || [],
          sumCols:     data.s || ["c2"],
        };
      }
      return data;
    } catch(e) { return null; }
  };
  const preloaded = decodeOrder();

  // ── Modes ────────────────────────────────────────────────────────────────
  const [mode, setMode] = useState("preview");
  const [step, setStep] = useState(1);
  const [linkCopied, setLinkCopied] = useState(false);

  // ── Table data ───────────────────────────────────────────────────────────
  const [cols, setCols]       = useState(preloaded ? preloaded.cols : INIT_COLS);
  const [rows, setRows]       = useState(preloaded ? preloaded.rows : INIT_ROWS);
  const [editCol, setEditCol] = useState(null);
  const [sumCols, setSumCols] = useState(preloaded ? new Set(preloaded.sumCols || ["c2"]) : new Set(["c2"]));

  const toggleSum = id => setSumCols(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  // Compute totals: for each summed col, add up numeric cell values
  const colTotals = cols.reduce((acc, col) => {
    if (sumCols.has(col.id)) {
      acc[col.id] = rows.reduce((sum, row) => {
        const n = parseFloat(row[col.id]);
        return sum + (isNaN(n) ? 0 : n);
      }, 0);
    }
    return acc;
  }, {});

  const hasTotals = Object.keys(colTotals).length > 0;

  // ── Order metadata ───────────────────────────────────────────────────────
  const [orderRef, setOrderRef]       = useState(preloaded ? preloaded.orderRef    : "MPL-2026-0847");
  const [customer, setCustomer]       = useState(preloaded ? preloaded.customer    : "Tally Key Limited");
  const [contactName, setContactName] = useState(preloaded ? preloaded.contactName : "James Whitfield");
  const [notes, setNotes]             = useState(preloaded ? preloaded.notes       : "");
  const [delivery, setDelivery]       = useState(preloaded ? preloaded.delivery    : "");

  // ── Sign step ────────────────────────────────────────────────────────────
  const [name, setName]         = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [email, setEmail]       = useState("");
  const [checked, setChecked]   = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [error, setError]       = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [timestamp, setTimestamp]   = useState("");
  const canvasRef = useRef(null);
  const lastPos   = useRef(null);

  useEffect(() => {
    if (step === 2) {
      setTimeout(() => {
        const c = canvasRef.current; if (!c) return;
        const ctx = c.getContext("2d");
        ctx.strokeStyle = brand.navy; ctx.lineWidth = 2.2;
        ctx.lineCap = "round"; ctx.lineJoin = "round";
      }, 80);
    }
  }, [step]);

  // Signature drawing
  const getPos = (e, c) => {
    const r = c.getBoundingClientRect(), sx = c.width/r.width, sy = c.height/r.height;
    if (e.touches) return { x:(e.touches[0].clientX-r.left)*sx, y:(e.touches[0].clientY-r.top)*sy };
    return { x:(e.clientX-r.left)*sx, y:(e.clientY-r.top)*sy };
  };
  const startDraw = e => { e.preventDefault(); setIsDrawing(true); setHasDrawn(true); lastPos.current = getPos(e, canvasRef.current); };
  const draw = e => {
    e.preventDefault(); if (!isDrawing) return;
    const c = canvasRef.current, ctx = c.getContext("2d"), pos = getPos(e,c);
    ctx.beginPath(); ctx.moveTo(lastPos.current.x, lastPos.current.y); ctx.lineTo(pos.x, pos.y); ctx.stroke();
    lastPos.current = pos;
  };
  const endDraw = e => { e.preventDefault(); setIsDrawing(false); lastPos.current = null; };
  const clearSig = () => { canvasRef.current.getContext("2d").clearRect(0,0,692,150); setHasDrawn(false); };
  const submit = async () => {
    setError("");
    if (!name.trim()) { setError("Please enter your full name."); return; }
    if (!email.trim() || !email.includes("@")) { setError("Please enter a valid email address."); return; }
    if (!checked)     { setError("Please tick the confirmation box."); return; }
    if (!hasDrawn)    { setError("Please draw your signature in the box above."); return; }
    setSubmitting(true);
    const ts = new Date().toLocaleString("en-NZ", { timeZone:"Pacific/Auckland", dateStyle:"long", timeStyle:"short" });
    if (FORMSPREE_URL) {
      try {
        await fetch(FORMSPREE_URL, {
          method: "POST",
          headers: { "Accept": "application/json", "Content-Type": "application/json" },
          body: JSON.stringify({
            orderRef, customer, contactName,
            email,
            approvedBy: name,
            jobTitle: jobTitle || "—",
            timestamp: ts,
            items: rows.map(row => cols.reduce((o, c) => ({ ...o, [c.label]: row[c.id] }), {})),
            notes: notes || "—",
            delivery: delivery || "—",
          }),
        });
      } catch (_) { /* fail silently */ }
    }
    setTimestamp(ts);
    setSubmitting(false);
    setStep(3);
  };

  const checkPin = () => {
    if (pinInput === BUILDER_PIN) { setPinUnlocked(true); setMode("builder"); setPinError(false); }
    else { setPinError(true); setPinInput(""); }
  };

  const resetPreview = () => { setMode("preview"); setStep(1); setName(""); setJobTitle(""); setChecked(false); setHasDrawn(false); setError(""); };

  const generateLink = () => {
    // Only encode the data that changes per order — not the fixed column structure
    const data = {
      r: orderRef,
      cu: customer,
      cn: contactName,
      n: notes,
      d: delivery,
      // Rows as arrays of values (in col order) to minimise size
      rw: rows.map(row => cols.map(col => row[col.id] || "")),
    };
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(data))));
    const base = window.location.origin + window.location.pathname;
    return `${base}?o=${encoded}`;
  };

  const copyLink = () => {
    navigator.clipboard.writeText(generateLink()).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 3000);
    });
  };

  // ── Column operations ─────────────────────────────────────────────────────
  const addCol = () => {
    const id = `c${_cid++}`;
    setCols(c => [...c, { id, label:"New column" }]);
    setRows(r => r.map(row => ({ ...row, [id]:"" })));
  };
  const delCol = id => {
    setCols(c => c.filter(x => x.id !== id));
    setRows(r => r.map(row => { const copy={...row}; delete copy[id]; return copy; }));
  };
  const moveCol = (id, dir) => setCols(c => {
    const i = c.findIndex(x => x.id===id), j = i+dir;
    if (j<0||j>=c.length) return c;
    const a=[...c]; [a[i],a[j]]=[a[j],a[i]]; return a;
  });
  const renameCol = (id, label) => setCols(c => c.map(x => x.id===id ? {...x,label} : x));

  // ── Row operations ────────────────────────────────────────────────────────
  const addRow = () => {
    const id = `r${_rid++}`;
    const blank = { id }; cols.forEach(c => { blank[c.id]=""; });
    setRows(r => [...r, blank]);
  };
  const dupRow = rowId => {
    const id = `r${_rid++}`;
    const src = rows.find(r => r.id===rowId);
    const copy = {...src, id};
    const idx = rows.findIndex(r => r.id===rowId);
    setRows(r => [...r.slice(0,idx+1), copy, ...r.slice(idx+1)]);
  };
  const delRow = id => setRows(r => r.filter(x => x.id!==id));
  const setCell = (rowId, colId, val) => setRows(r => r.map(row => row.id===rowId ? {...row,[colId]:val} : row));

  // ═══════════════════════════════════════════════════════════════════════════
  // ── PIN gate screen ────────────────────────────────────────────────────
  if (wantsBuilder && !pinUnlocked) {
    return (
      <div style={{ minHeight:"100vh", background:brand.navy, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"sans-serif" }}>
        <div style={{ background:"#fff", borderRadius:10, padding:"40px 36px", width:320, textAlign:"center", boxShadow:"0 8px 32px rgba(0,0,0,0.3)" }}>
          <MPLogo size={0.7} />
          <div style={{ marginTop:20, marginBottom:6, fontSize:13, color:brand.textMid }}>Enter your builder PIN to continue</div>
          <input
            type="password" maxLength={4}
            value={pinInput}
            onChange={e => { setPinInput(e.target.value); setPinError(false); }}
            onKeyDown={e => e.key === "Enter" && checkPin()}
            placeholder="••••"
            style={{ ...inputSt, textAlign:"center", fontSize:22, letterSpacing:"0.3em", marginTop:12, marginBottom:8 }}
            autoFocus
          />
          {pinError && <div style={{ fontSize:12, color:"#A03030", marginBottom:8 }}>Incorrect PIN — try again</div>}
          <button onClick={checkPin}
            style={{ width:"100%", padding:"12px", background:brand.blue, color:"#fff", border:"none", borderRadius:6, fontSize:14, fontWeight:700, cursor:"pointer", marginTop:4 }}>
            UNLOCK BUILDER
          </button>
        </div>
      </div>
    );
  }

  // BUILDER
  // ═══════════════════════════════════════════════════════════════════════════
  if (mode === "builder") {
    return (
      <div style={{ minHeight:"100vh", background:"#EEF3F8", fontFamily:"'Trebuchet MS','Gill Sans',sans-serif", color:brand.navy }}>

        {/* Header */}
        <div style={{ background:brand.navy, padding:"16px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", boxShadow:"0 2px 12px rgba(0,0,0,0.15)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:16 }}>
            <MPLogo size={0.85} />
            <div style={{ width:1, height:28, background:"rgba(255,255,255,0.15)" }} />
            <div>
              <div style={{ fontSize:10, color:"rgba(255,255,255,0.45)", letterSpacing:"0.14em", fontFamily:"sans-serif" }}>DESIGN APPROVAL BUILDER</div>
              <div style={{ fontSize:13, color:"rgba(255,255,255,0.8)", fontFamily:"sans-serif" }}>Configure your approval form</div>
            </div>
          </div>
          <div style={{ display:"flex", gap:10, alignItems:"center" }}>
            <button onClick={copyLink}
              style={{ padding:"10px 20px", background: linkCopied ? brand.success : "rgba(255,255,255,0.15)", color:"#fff", border:"1px solid rgba(255,255,255,0.3)", borderRadius:6, fontSize:13, fontWeight:600, cursor:"pointer", transition:"all 0.2s" }}>
              {linkCopied ? "✓ Link copied!" : "📋 Copy customer link"}
            </button>
            <button onClick={() => setMode("preview")}
              style={{ padding:"10px 22px", background:brand.blue, color:"#fff", border:"none", borderRadius:6, fontSize:13, fontWeight:700, letterSpacing:"0.06em", cursor:"pointer", boxShadow:`0 3px 12px rgba(0,114,187,0.4)` }}>
              PREVIEW AS CUSTOMER →
            </button>
          </div>
        </div>
        <div style={{ height:4, background:`linear-gradient(90deg,${brand.blue},${brand.gold})` }} />

        <div style={{ maxWidth:1000, margin:"0 auto", padding:"28px 24px 64px" }}>

          {/* Order metadata */}
          <div style={{ background:"#fff", border:`1px solid ${brand.border}`, borderRadius:6, padding:20, marginBottom:24, boxShadow:"0 2px 10px rgba(0,114,187,0.06)" }}>
            <div style={{ fontSize:12, letterSpacing:"0.1em", color:brand.blue, fontWeight:700, marginBottom:14 }}>ORDER METADATA</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14 }}>
              {[
                { label:"Order Reference",    val:orderRef,    set:setOrderRef    },
                { label:"Customer / Company", val:customer,    set:setCustomer    },
                { label:"Contact Name",       val:contactName, set:setContactName },
              ].map(f => (
                <div key={f.label}>
                  <label style={{ display:"block", fontSize:11, color:brand.textLight, fontFamily:"sans-serif", marginBottom:6, letterSpacing:"0.06em" }}>{f.label}</label>
                  <input value={f.val} onChange={e => f.set(e.target.value)} style={{ ...inputSt, fontSize:13 }} />
                </div>
              ))}
            </div>
          </div>

          {/* Table heading */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
            <div>
              <div style={{ fontSize:14, fontWeight:700, color:brand.navy }}>Design Items Table</div>
              <div style={{ fontSize:12, color:brand.textLight, fontFamily:"sans-serif", marginTop:3 }}>
                Click a column header to rename it · Edit cells directly · Use ◀▶ to reorder columns
              </div>
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={addCol}
                style={{ padding:"8px 16px", background:"#fff", color:brand.blue, border:`1.5px solid ${brand.blue}`, borderRadius:6, fontSize:13, fontWeight:700, cursor:"pointer" }}>
                + Column
              </button>
              <button onClick={addRow}
                style={{ padding:"8px 16px", background:brand.blue, color:"#fff", border:"none", borderRadius:6, fontSize:13, fontWeight:700, cursor:"pointer", boxShadow:`0 2px 8px rgba(0,114,187,0.3)` }}>
                + Row
              </button>
            </div>
          </div>

          {/* THE TABLE */}
          <div style={{ background:"#fff", border:`1px solid ${brand.border}`, borderRadius:6, overflow:"hidden", boxShadow:"0 2px 12px rgba(0,114,187,0.06)", marginBottom:16 }}>
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse", minWidth:400 }}>
                <thead>
                  <tr style={{ background:brand.blueLight }}>
                    {/* # */}
                    <th style={{ width:36, padding:"10px 8px", borderBottom:`2px solid ${brand.border}`, fontSize:11, color:brand.textLight, fontWeight:400, textAlign:"center", fontFamily:"sans-serif" }}>#</th>

                    {cols.map((col, ci) => (
                      <th key={col.id} style={{ padding:"8px 6px", borderBottom:`2px solid ${brand.border}`, borderLeft:`1px solid ${brand.border}`, minWidth:110 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:3 }}>

                          {/* ◀▶ reorder */}
                          <div style={{ display:"flex", flexDirection:"column", gap:1, flexShrink:0 }}>
                            <button onClick={() => moveCol(col.id,-1)} disabled={ci===0}
                              title="Move left"
                              style={{ background:"none", border:"none", cursor:ci===0?"default":"pointer", color:ci===0?brand.border:brand.textLight, fontSize:9, lineHeight:1, padding:"1px 3px" }}>◀</button>
                            <button onClick={() => moveCol(col.id,+1)} disabled={ci===cols.length-1}
                              title="Move right"
                              style={{ background:"none", border:"none", cursor:ci===cols.length-1?"default":"pointer", color:ci===cols.length-1?brand.border:brand.textLight, fontSize:9, lineHeight:1, padding:"1px 3px" }}>▶</button>
                          </div>

                          {/* Editable header */}
                          {editCol === col.id ? (
                            <input
                              autoFocus
                              value={col.label}
                              onChange={e => renameCol(col.id, e.target.value)}
                              onBlur={() => setEditCol(null)}
                              onKeyDown={e => e.key==="Enter" && setEditCol(null)}
                              style={{ flex:1, fontSize:12, fontWeight:700, color:brand.blue, background:"#fff", border:`1.5px solid ${brand.blue}`, borderRadius:3, padding:"4px 7px", outline:"none", minWidth:50 }}
                            />
                          ) : (
                            <span
                              onClick={() => setEditCol(col.id)}
                              title="Click to rename"
                              style={{ flex:1, fontSize:12, fontWeight:700, color:brand.blue, letterSpacing:"0.04em", cursor:"text", padding:"4px 5px", borderRadius:3, display:"block", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}
                            >{col.label}</span>
                          )}

                          {/* Delete col (only if >1 col) */}
                          {cols.length > 1 && (
                            <button onClick={() => delCol(col.id)} title="Remove column"
                              style={{ background:"none", border:"none", cursor:"pointer", color:"#CCCCCC", fontSize:15, lineHeight:1, padding:"0 2px", flexShrink:0 }}>×</button>
                          )}
                        </div>
                        {/* Σ sum toggle */}
                        <label title="Sum this column in totals row" style={{ display:"flex", alignItems:"center", gap:4, fontSize:10, color:sumCols.has(col.id)?brand.blue:brand.textLight, fontFamily:"sans-serif", cursor:"pointer", marginTop:4, paddingLeft:22, whiteSpace:"nowrap" }}>
                          <input type="checkbox" checked={sumCols.has(col.id)} onChange={() => toggleSum(col.id)} style={{ accentColor:brand.blue, width:11, height:11 }} />
                          Σ total
                        </label>
                      </th>
                    ))}

                    {/* Actions header */}
                    <th style={{ width:64, padding:"10px 6px", borderBottom:`2px solid ${brand.border}`, borderLeft:`1px solid ${brand.border}`, fontSize:11, color:brand.textLight, fontWeight:400, textAlign:"center", fontFamily:"sans-serif" }}>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {rows.length === 0 && (
                    <tr>
                      <td colSpan={cols.length + 2} style={{ padding:"36px", textAlign:"center", color:brand.textLight, fontFamily:"sans-serif", fontSize:13 }}>
                        No rows yet — click <strong>+ Row</strong> to add one.
                      </td>
                    </tr>
                  )}
                  {rows.map((row, ri) => (
                    <tr key={row.id} style={{ background: ri%2===0 ? "#fff" : brand.offWhite }}>
                      {/* Row number */}
                      <td style={{ textAlign:"center", fontSize:11, color:brand.textLight, padding:"3px 8px", borderBottom:`1px solid ${brand.border}`, fontFamily:"sans-serif" }}>{ri+1}</td>

                      {cols.map(col => (
                        <td key={col.id} style={{ borderLeft:`1px solid ${brand.border}`, borderBottom:`1px solid ${brand.border}`, padding:"2px 4px" }}>
                          <input
                            value={row[col.id] ?? ""}
                            onChange={e => setCell(row.id, col.id, e.target.value)}
                            style={{ ...cellSt }}
                            onFocus={e => { e.target.style.borderColor=brand.blue; e.target.style.background="#fff"; }}
                            onBlur={e => { e.target.style.borderColor="transparent"; e.target.style.background="transparent"; }}
                          />
                        </td>
                      ))}

                      {/* Actions */}
                      <td style={{ borderLeft:`1px solid ${brand.border}`, borderBottom:`1px solid ${brand.border}`, padding:"3px 6px", textAlign:"center", whiteSpace:"nowrap" }}>
                        <button onClick={() => dupRow(row.id)} title="Duplicate row"
                          style={{ background:"none", border:"none", cursor:"pointer", color:brand.textLight, fontSize:14, padding:"3px 4px" }}>⧉</button>
                        <button onClick={() => delRow(row.id)} title="Delete row"
                          style={{ background:"none", border:"none", cursor:"pointer", color:"#CCCCCC", fontSize:16, padding:"3px 4px" }}>×</button>
                      </td>
                    </tr>
                  ))}
                </tbody>

                {hasTotals && (
                  <tfoot>
                    <tr style={{ background:brand.blueLight, borderTop:`2px solid ${brand.border}` }}>
                      <td style={{ padding:"9px 8px", fontSize:11, color:brand.textLight, fontFamily:"sans-serif", textAlign:"center", fontWeight:600 }}>Σ</td>
                      {cols.map((col, ci) => (
                        <td key={col.id} style={{ padding:"9px 12px", borderLeft:`1px solid ${brand.border}`, fontSize:13, fontWeight:700, color: sumCols.has(col.id) ? brand.blue : "transparent", textAlign: sumCols.has(col.id) ? "left" : "left" }}>
                          {sumCols.has(col.id)
                            ? (Number.isInteger(colTotals[col.id]) ? colTotals[col.id] : colTotals[col.id].toFixed(2))
                            : ""}
                        </td>
                      ))}
                      <td style={{ borderLeft:`1px solid ${brand.border}` }} />
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>

            {/* Add row footer inside card */}
            <div style={{ borderTop:`1px solid ${brand.border}`, padding:"10px 16px" }}>
              <button onClick={addRow}
                style={{ background:"none", border:"none", color:brand.blue, cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:"sans-serif", padding:0 }}>
                + Add row
              </button>
            </div>
          </div>

          {/* Delivery details */}
          <div style={{ background:"#fff", border:`1px solid ${brand.border}`, borderRadius:6, padding:20, marginBottom:20, boxShadow:"0 2px 10px rgba(0,114,187,0.06)" }}>
            <label style={{ display:"block", fontSize:12, letterSpacing:"0.1em", color:brand.blue, fontWeight:700, marginBottom:10 }}>
              DELIVERY DETAILS <span style={{ color:brand.textLight, fontWeight:400, fontSize:11, letterSpacing:0 }}>(optional — shown to customer)</span>
            </label>
            <textarea value={delivery} onChange={e => setDelivery(e.target.value)}
              placeholder="e.g. delivery address, estimated lead time, freight instructions…"
              rows={3} style={{ ...inputSt, resize:"vertical", lineHeight:1.6 }} />
          </div>

          {/* Optional notes */}
          <div style={{ background:"#fff", border:`1px solid ${brand.border}`, borderRadius:6, padding:20, marginBottom:20, boxShadow:"0 2px 10px rgba(0,114,187,0.06)" }}>
            <label style={{ display:"block", fontSize:12, letterSpacing:"0.1em", color:brand.blue, fontWeight:700, marginBottom:10 }}>
              ADDITIONAL NOTES <span style={{ color:brand.textLight, fontWeight:400, fontSize:11, letterSpacing:0 }}>(optional — shown to customer)</span>
            </label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)}
              placeholder="e.g. artwork file reference, placement instructions, special requirements…"
              rows={3} style={{ ...inputSt, resize:"vertical", lineHeight:1.6 }} />
          </div>

          <div style={{ padding:"15px 20px", background:brand.blueLight, border:`1px solid ${brand.border}`, borderRadius:6, fontSize:13, color:brand.textMid, fontFamily:"sans-serif", lineHeight:1.7 }}>
            💡 <strong>Tips:</strong> Click any <strong>column header</strong> to rename it. Use <strong>◀ ▶</strong> to reorder columns. The <strong>⧉</strong> icon duplicates a row — handy for similar items with different colours or sizes. Once ready, click <strong>Preview as Customer →</strong>.
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // CUSTOMER APPROVAL FLOW
  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <div style={{ minHeight:"100vh", background:brand.offWhite, fontFamily:"'Trebuchet MS','Gill Sans',sans-serif", color:brand.navy }}>

      {/* Header */}
      <div style={{ background:brand.navy, boxShadow:"0 2px 16px rgba(0,0,0,0.18)" }}>
        <div style={{ maxWidth:780, margin:"0 auto", padding:"18px 24px 0" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
            <MPLogo />
            <div style={{ display:"flex", alignItems:"center", gap:16 }}>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:10, color:"rgba(255,255,255,0.4)", letterSpacing:"0.12em", fontFamily:"sans-serif" }}>APPROVAL REF</div>
                <div style={{ fontSize:14, color:brand.gold, fontWeight:700 }}>{orderRef}</div>
              </div>
              {pinUnlocked && (
                <button onClick={resetPreview}
                  style={{ padding:"7px 14px", background:"rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.7)", border:"1px solid rgba(255,255,255,0.2)", borderRadius:4, fontSize:11, cursor:"pointer", fontFamily:"sans-serif", letterSpacing:"0.06em" }}>
                  ← EDIT FORM
                </button>
              )}
            </div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8, paddingBottom:16 }}>
            <StepBubble n={1} label="Review Design"  active={step===1} done={step>1} />
            <StepDiv />
            <StepBubble n={2} label="Sign & Confirm" active={step===2} done={step>2} />
            <StepDiv />
            <StepBubble n={3} label="Complete"       active={step===3} done={false} />
          </div>
        </div>
        <div style={{ height:4, background:`linear-gradient(90deg,${brand.blue},${brand.gold})` }} />
      </div>

      <div style={{ maxWidth:780, margin:"0 auto", padding:"32px 24px 64px" }}>

        {/* ── STEP 1: Review ── */}
        {step === 1 && (
          <div>
            <div style={{ marginBottom:28 }}>
              <div style={{ fontSize:11, letterSpacing:"0.14em", color:brand.blue, marginBottom:8, fontWeight:600 }}>ORDER CONFIRMATION</div>
              <h1 style={{ margin:"0 0 10px", fontSize:26, fontWeight:700, lineHeight:1.2 }}>Please review and approve your design</h1>
              <p style={{ margin:0, fontSize:15, color:brand.textMid, lineHeight:1.7 }}>
                Hi {contactName.split(" ")[0]}, please carefully review the pedestal specification below. Once you're satisfied everything is correct, we'll submit your order to our factory.
              </p>
            </div>

            {/* Items table (read-only) */}
            <div style={{ background:"#fff", border:`1px solid ${brand.border}`, borderRadius:6, overflow:"hidden", marginBottom:20, boxShadow:"0 2px 12px rgba(0,114,187,0.06)" }}>
              {/* Card header */}
              <div style={{ padding:"13px 20px", borderBottom:`1px solid ${brand.border}`, background:brand.blueLight, display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:8, height:8, borderRadius:"50%", background:brand.blue }} />
                <span style={{ fontSize:12, letterSpacing:"0.08em", color:brand.blue, fontWeight:700 }}>PEDESTAL CONFIGURATION</span>
                <span style={{ marginLeft:"auto", fontSize:11, color:brand.textLight, fontFamily:"sans-serif" }}>Ref: {orderRef} · {customer}</span>
              </div>
              <div style={{ overflowX:"auto" }}>
                <table style={{ width:"100%", borderCollapse:"collapse", minWidth:360 }}>
                  <thead>
                    <tr style={{ background:"#F0F5FA" }}>
                      {cols.map((col, ci) => (
                        <th key={col.id} style={{ padding:"10px 16px", borderBottom:`1px solid ${brand.border}`, borderLeft:ci>0?`1px solid ${brand.border}`:"none", textAlign:"left", fontSize:11, fontWeight:700, color:brand.textMid, letterSpacing:"0.08em", fontFamily:"sans-serif", whiteSpace:"nowrap" }}>
                          {col.label.toUpperCase()}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.length === 0 && (
                      <tr><td colSpan={cols.length} style={{ padding:"24px", textAlign:"center", color:brand.textLight, fontFamily:"sans-serif", fontSize:13 }}>No items to review.</td></tr>
                    )}
                    {rows.map((row, ri) => (
                      <tr key={row.id} style={{ background: ri%2===0 ? "#fff" : brand.offWhite }}>
                        {cols.map((col, ci) => (
                          <td key={col.id} style={{ padding:"11px 16px", borderBottom:`1px solid ${brand.border}`, borderLeft:ci>0?`1px solid ${brand.border}`:"none", fontSize:14, color:brand.navy, fontFamily:"sans-serif" }}>
                            {row[col.id] || <span style={{ color:brand.border }}>—</span>}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>

                  {hasTotals && (
                    <tfoot>
                      <tr style={{ background:brand.blueLight, borderTop:`2px solid ${brand.border}` }}>
                        {cols.map((col, ci) => (
                          <td key={col.id} style={{ padding:"11px 16px", borderLeft:ci>0?`1px solid ${brand.border}`:"none", fontSize:14, fontFamily:"sans-serif" }}>
                            {sumCols.has(col.id) ? (
                              <span style={{ fontWeight:700, color:brand.blue }}>
                                {Number.isInteger(colTotals[col.id]) ? colTotals[col.id] : colTotals[col.id].toFixed(2)}
                                <span style={{ fontSize:11, color:brand.textLight, fontWeight:400, marginLeft:6 }}>TOTAL</span>
                              </span>
                            ) : (
                              ci === 0 ? <span style={{ fontSize:12, color:brand.textLight, fontWeight:600, letterSpacing:"0.06em" }}>TOTAL</span> : ""
                            )}
                          </td>
                        ))}
                      </tr>
                    </tfoot>
                  )}
                </table>
              </div>
            </div>

            {/* Notes */}
            {notes.trim() && (
              <div style={{ background:"#fff", border:`1px solid ${brand.border}`, borderRadius:6, overflow:"hidden", marginBottom:20, boxShadow:"0 2px 12px rgba(0,114,187,0.06)" }}>
                <div style={{ padding:"12px 20px", borderBottom:`1px solid ${brand.border}`, background:brand.blueLight, display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:8, height:8, borderRadius:"50%", background:brand.blue }} />
                  <span style={{ fontSize:12, letterSpacing:"0.08em", color:brand.blue, fontWeight:700 }}>ADDITIONAL NOTES</span>
                </div>
                <div style={{ padding:"14px 20px", fontSize:14, color:brand.textMid, fontFamily:"sans-serif", lineHeight:1.7, whiteSpace:"pre-wrap" }}>{notes}</div>
              </div>
            )}

            {/* Delivery details */}
            {delivery.trim() && (
              <div style={{ background:"#fff", border:`1px solid ${brand.border}`, borderRadius:6, overflow:"hidden", marginBottom:20, boxShadow:"0 2px 12px rgba(0,114,187,0.06)" }}>
                <div style={{ padding:"12px 20px", borderBottom:`1px solid ${brand.border}`, background:brand.blueLight, display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:8, height:8, borderRadius:"50%", background:brand.blue }} />
                  <span style={{ fontSize:12, letterSpacing:"0.08em", color:brand.blue, fontWeight:700 }}>DELIVERY DETAILS</span>
                </div>
                <div style={{ padding:"14px 20px", fontSize:14, color:brand.textMid, fontFamily:"sans-serif", lineHeight:1.7, whiteSpace:"pre-wrap" }}>{delivery}</div>
              </div>
            )}

            {/* Warning */}
            <div style={{ background:"#FFF8E6", border:"1px solid #F5D98A", borderRadius:6, padding:"13px 18px", display:"flex", gap:12, marginBottom:28 }}>
              <div style={{ fontSize:18, lineHeight:1, flexShrink:0 }}>⚠️</div>
              <p style={{ margin:0, fontSize:13, color:"#7A5A00", lineHeight:1.7, fontFamily:"sans-serif" }}>
                Once approved, this order will be submitted to our factory for production. Changes after sign-off may incur additional costs or delays. Please review all details carefully.
              </p>
            </div>

            <button onClick={() => setStep(2)}
              style={{ width:"100%", padding:"15px 24px", background:brand.blue, color:"#fff", border:"none", borderRadius:6, fontSize:14, fontWeight:700, letterSpacing:"0.08em", cursor:"pointer", boxShadow:`0 4px 16px rgba(0,114,187,0.3)` }}
              onMouseOver={e => e.target.style.background=brand.blueDark}
              onMouseOut={e => e.target.style.background=brand.blue}>
              PROCEED TO SIGN OFF →
            </button>
          </div>
        )}

        {/* ── STEP 2: Sign ── */}
        {step === 2 && (
          <div>
            <div style={{ marginBottom:28 }}>
              <div style={{ fontSize:11, letterSpacing:"0.14em", color:brand.blue, marginBottom:8, fontWeight:600 }}>STEP 2 OF 3</div>
              <h1 style={{ margin:"0 0 10px", fontSize:26, fontWeight:700 }}>Sign & Confirm Approval</h1>
              <p style={{ margin:0, fontSize:15, color:brand.textMid, lineHeight:1.7 }}>By signing below you confirm the pedestal specification is correct and authorise Marathon Products to proceed with production.</p>
            </div>

            {/* Name fields */}
            <div style={{ background:"#fff", border:`1px solid ${brand.border}`, borderRadius:6, padding:20, marginBottom:16, boxShadow:"0 2px 12px rgba(0,114,187,0.06)" }}>
              <div style={{ marginBottom:16 }}>
                <label style={{ display:"block", fontSize:11, letterSpacing:"0.1em", color:brand.blue, marginBottom:8, fontWeight:700 }}>FULL NAME *</label>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Enter your full name" style={{ ...inputSt, fontSize:15 }} />
              </div>
              <div style={{ marginTop:16 }}>
                <label style={{ display:"block", fontSize:11, letterSpacing:"0.1em", color:brand.blue, marginBottom:8, fontWeight:700 }}>JOB TITLE <span style={{ color:brand.textLight, fontWeight:400 }}>(optional)</span></label>
                <input value={jobTitle} onChange={e => setJobTitle(e.target.value)} placeholder="e.g. Operations Manager" style={{ ...inputSt, fontSize:15 }} />
              </div>
              <div style={{ marginTop:16 }}>
                <label style={{ display:"block", fontSize:11, letterSpacing:"0.1em", color:brand.blue, marginBottom:8, fontWeight:700 }}>EMAIL ADDRESS *</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="e.g. james@westhavenmarina.co.nz" style={{ ...inputSt, fontSize:15 }} />
              </div>
            </div>

            {/* Signature pad */}
            <div style={{ background:"#fff", border:`1px solid ${brand.border}`, borderRadius:6, overflow:"hidden", marginBottom:16, boxShadow:"0 2px 12px rgba(0,114,187,0.06)" }}>
              <div style={{ padding:"13px 20px", borderBottom:`1px solid ${brand.border}`, background:brand.blueLight, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:8, height:8, borderRadius:"50%", background:brand.blue }} />
                  <span style={{ fontSize:12, letterSpacing:"0.08em", color:brand.blue, fontWeight:700 }}>SIGNATURE *</span>
                </div>
                <button onClick={clearSig} style={{ fontSize:12, color:brand.textLight, background:"none", border:"none", cursor:"pointer", fontFamily:"sans-serif" }}>Clear</button>
              </div>
              <div style={{ position:"relative", background:"#FAFCFE" }}>
                <canvas ref={canvasRef} width={732} height={150}
                  style={{ display:"block", width:"100%", height:150, cursor:"crosshair", touchAction:"none" }}
                  onMouseDown={startDraw} onMouseMove={draw} onMouseUp={endDraw} onMouseLeave={endDraw}
                  onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={endDraw} />
                {!hasDrawn && (
                  <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", pointerEvents:"none" }}>
                    <span style={{ fontSize:13, color:brand.textLight, fontStyle:"italic", fontFamily:"sans-serif" }}>Draw your signature here</span>
                  </div>
                )}
                <div style={{ position:"absolute", bottom:14, left:20, right:20, borderTop:`1px solid ${brand.border}` }} />
              </div>
            </div>

            {/* Confirmation checkbox */}
            <div onClick={() => setChecked(!checked)} style={{ background:checked?"#EBF5F0":"#fff", border:`1px solid ${checked?"#90CCA8":brand.border}`, borderRadius:6, padding:"15px 18px", display:"flex", gap:14, alignItems:"flex-start", cursor:"pointer", marginBottom:16, transition:"all 0.2s", boxShadow:"0 2px 12px rgba(0,114,187,0.06)" }}>
              <div style={{ width:22, height:22, borderRadius:4, flexShrink:0, marginTop:1, background:checked?brand.success:"#fff", border:`1.5px solid ${checked?brand.success:brand.border}`, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:14, transition:"all 0.2s" }}>{checked&&"✓"}</div>
              <p style={{ margin:0, fontSize:13, color:brand.textMid, lineHeight:1.75, fontFamily:"sans-serif" }}>
                I confirm that the pedestal configuration and other information detailed above is correct and I accept the supply of credit by Marathon Products Limited. I have read and understand the terms and conditions of Marathon Products and agree to be bound by these conditions. A copy is available to view at <a href="https://www.tallykey.co.nz/terms" target="_blank" style={{color:brand.blue}}>www.tallykey.co.nz/terms</a>. I authorise the use of personal information as detailed in the privacy act clause therein.
              </p>
            </div>

            {error && <div style={{ background:"#FFF0F0", border:"1px solid #F5BABA", borderRadius:6, padding:"12px 16px", marginBottom:16, fontSize:13, color:"#A03030", fontFamily:"sans-serif", display:"flex", gap:10, alignItems:"center" }}>⚠️ {error}</div>}

            <div style={{ display:"flex", gap:12 }}>
              <button onClick={() => setStep(1)} style={{ padding:"15px 20px", background:"transparent", color:brand.textMid, border:`1px solid ${brand.border}`, borderRadius:6, fontSize:13, cursor:"pointer", fontFamily:"sans-serif" }}>← Back</button>
              <button onClick={submit} disabled={submitting}
                style={{ flex:1, padding:"15px 24px", background:submitting?brand.navyMid:brand.blue, color:"#fff", border:"none", borderRadius:6, fontSize:14, fontWeight:700, letterSpacing:"0.08em", cursor:submitting?"not-allowed":"pointer", boxShadow:submitting?"none":`0 4px 16px rgba(0,114,187,0.3)`, transition:"all 0.2s" }}>
                {submitting ? "SUBMITTING…" : "SUBMIT APPROVAL →"}
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: Done ── */}
        {step === 3 && (
          <div style={{ textAlign:"center", paddingTop:16 }}>
            <div style={{ width:72, height:72, borderRadius:"50%", background:brand.successBg, border:"2px solid #90CCA8", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 24px", fontSize:32 }}>✓</div>
            <div style={{ fontSize:11, letterSpacing:"0.14em", color:brand.blue, marginBottom:10, fontWeight:600 }}>APPROVAL RECEIVED</div>
            <h1 style={{ fontSize:28, fontWeight:700, margin:"0 0 12px" }}>Thank you, {name.split(" ")[0]}.</h1>
            <p style={{ fontSize:15, color:brand.textMid, lineHeight:1.75, maxWidth:480, margin:"0 auto 32px", fontFamily:"sans-serif" }}>
              Your order confirmation has been recorded and submitted to Marathon Products. We will proceed with production and keep you updated.
            </p>
            {/* Approval record */}
            <div style={{ background:"#fff", border:`1px solid ${brand.border}`, borderRadius:6, textAlign:"left", marginBottom:24, boxShadow:"0 2px 12px rgba(0,114,187,0.06)", overflow:"hidden" }}>
              <div style={{ padding:"13px 20px", borderBottom:`1px solid ${brand.border}`, background:brand.blueLight, display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:8, height:8, borderRadius:"50%", background:brand.blue }} />
                <span style={{ fontSize:12, letterSpacing:"0.08em", color:brand.blue, fontWeight:700 }}>APPROVAL RECORD</span>
              </div>
              {[
                { label:"Reference",   value:orderRef },
                { label:"Approved by", value:`${name}${jobTitle?` — ${jobTitle}`:""}` },
                { label:"Company",     value:customer },
                { label:"Email",       value:email },
                { label:"Timestamp",   value:timestamp },
              ].map((r,i,arr) => (
                <div key={i} style={{ padding:"11px 20px", borderBottom:i<arr.length-1?`1px solid ${brand.border}`:"none", display:"flex", justifyContent:"space-between", gap:16 }}>
                  <span style={{ fontSize:12, fontFamily:"sans-serif", color:brand.textLight }}>{r.label}</span>
                  <span style={{ fontSize:13, fontFamily:"sans-serif", color:brand.navy, fontWeight:500 }}>{r.value}</span>
                </div>
              ))}
            </div>
            <button onClick={() => {
              const w = window.open('', '_blank');
              const tableHead = cols.map(c => `<th style="padding:8px 12px;background:#2C2E69;color:#fff;text-align:left;font-size:12px;letter-spacing:0.06em;border-right:1px solid #fff">${c.label.toUpperCase()}</th>`).join('');
              const tableRows = rows.map((row, ri) => {
                const cells = cols.map(col => `<td style="padding:9px 12px;border-bottom:1px solid #D8D9E8;border-right:1px solid #D8D9E8;font-size:13px;color:#1A1C3E">${row[col.id]||'—'}</td>`).join('');
                return `<tr style="background:${ri%2===0?'#fff':'#F7F8FB'}">${cells}</tr>`;
              }).join('');
              const totalRow = cols.some(c => sumCols.has(c.id)) ? `<tr style="background:#EEEEF5"><td colspan="${cols.length}" style="padding:8px 12px;font-size:12px;color:#8A8CAE;font-weight:600">` + cols.map(c => sumCols.has(c.id) ? `${c.label}: <strong style="color:#2C2E69">${colTotals[c.id]}</strong>` : '').filter(Boolean).join(' &nbsp;|&nbsp; ') + `</td></tr>` : '';
              w.document.write(`<!DOCTYPE html><html><head><title>TallyKey Order Confirmation — ${orderRef}</title><style>*{box-sizing:border-box}body{font-family:'Trebuchet MS',sans-serif;margin:0;padding:0;color:#1A1C3E}@media print{.no-print{display:none}}</style></head><body>
                <div style="background:#2C2E69;padding:20px 32px;display:flex;justify-content:space-between;align-items:center">
                  <div style="color:#fff;font-size:22px;font-weight:700">tallykey<sup style="font-size:11px">®</sup></div>
                  <div style="text-align:right"><div style="font-size:10px;color:rgba(255,255,255,0.5);letter-spacing:0.12em">ORDER CONFIRMATION</div><div style="font-size:14px;color:#F5A623;font-weight:700">${orderRef}</div></div>
                </div>
                <div style="padding:24px 32px">
                  <table style="width:100%;border-collapse:collapse;margin-bottom:8px"><tr>
                    <td style="font-size:13px;color:#8A8CAE">Customer</td><td style="font-size:14px;font-weight:600">${customer}</td>
                    <td style="font-size:13px;color:#8A8CAE">Contact</td><td style="font-size:14px;font-weight:600">${contactName}</td>
                  </tr><tr>
                    <td style="font-size:13px;color:#8A8CAE;padding-top:6px">Date</td><td style="font-size:14px">${timestamp}</td>
                    <td style="font-size:13px;color:#8A8CAE;padding-top:6px">Ref</td><td style="font-size:14px">${orderRef}</td>
                  </tr></table>
                  <hr style="border:none;border-top:1px solid #D8D9E8;margin:16px 0"/>
                  <div style="font-size:11px;font-weight:700;color:#2C2E69;letter-spacing:0.1em;margin-bottom:10px">PEDESTAL CONFIGURATION</div>
                  <table style="width:100%;border-collapse:collapse;border:1px solid #D8D9E8;border-radius:4px;overflow:hidden">
                    <thead><tr>${tableHead}</tr></thead>
                    <tbody>${tableRows}${totalRow}</tbody>
                  </table>
                  ${delivery ? `<div style="margin-top:20px"><div style="font-size:11px;font-weight:700;color:#2C2E69;letter-spacing:0.1em;margin-bottom:8px">DELIVERY DETAILS</div><div style="font-size:13px;color:#4A4C6E;line-height:1.7;white-space:pre-wrap">${delivery}</div></div>` : ''}
                  ${notes ? `<div style="margin-top:20px"><div style="font-size:11px;font-weight:700;color:#2C2E69;letter-spacing:0.1em;margin-bottom:8px">ADDITIONAL NOTES</div><div style="font-size:13px;color:#4A4C6E;line-height:1.7;white-space:pre-wrap">${notes}</div></div>` : ''}
                  <hr style="border:none;border-top:1px solid #D8D9E8;margin:20px 0"/>
                  <div style="font-size:11px;font-weight:700;color:#2C2E69;letter-spacing:0.1em;margin-bottom:10px">SIGN-OFF DETAILS</div>
                  <table style="width:100%;border-collapse:collapse">
                    <tr><td style="font-size:13px;color:#8A8CAE;padding:5px 0;width:140px">Approved by</td><td style="font-size:13px;font-weight:600">${name}${jobTitle ? ' — '+jobTitle : ''}</td></tr>
                    <tr><td style="font-size:13px;color:#8A8CAE;padding:5px 0">Email</td><td style="font-size:13px">${email}</td></tr>
                    <tr><td style="font-size:13px;color:#8A8CAE;padding:5px 0">Timestamp</td><td style="font-size:13px">${timestamp}</td></tr>
                  </table>
                  <div style="margin-top:16px;padding:14px 16px;background:#F7F8FB;border:1px solid #D8D9E8;border-radius:4px;font-size:11px;color:#4A4C6E;line-height:1.7">
                    I confirm that the pedestal configuration and other information detailed above is correct and I accept the supply of credit by Marathon Products Limited. I have read and understand the terms and conditions of Marathon Products and agree to be bound by these conditions. A copy is available to view at www.tallykey.co.nz/terms. I authorise the use of personal information as detailed in the privacy act clause therein.
                  </div>
                  <div style="margin-top:32px;padding-top:16px;border-top:1px solid #D8D9E8;font-size:11px;color:#8A8CAE;text-align:center">
                    Marathon Products Limited &nbsp;·&nbsp; sales@tallykey.co.nz &nbsp;·&nbsp; 0800 82 55 95 &nbsp;·&nbsp; www.tallykey.co.nz
                  </div>
                </div>
                <div class="no-print" style="padding:16px 32px;background:#EEEEF5;text-align:center">
                  <button onclick="window.print()" style="padding:10px 28px;background:#2C2E69;color:#fff;border:none;border-radius:6px;font-size:14px;font-weight:600;cursor:pointer">🖨️ Print / Save as PDF</button>
                </div>
              </body></html>`);
              w.document.close();
            }}
              style={{ width:"100%", padding:"14px 20px", background:"#fff", color:brand.navy, border:`1.5px solid ${brand.border}`, borderRadius:6, fontSize:14, fontWeight:600, cursor:"pointer", marginBottom:16, display:"flex", alignItems:"center", justifyContent:"center", gap:10 }}>
              <span>🖨️</span> Download / Print Full Confirmation
            </button>
            <div style={{ background:brand.blueLight, border:`1px solid ${brand.border}`, borderRadius:6, padding:"16px 20px", display:"flex", gap:14, alignItems:"flex-start", textAlign:"left" }}>
              <span style={{ fontSize:18 }}>📧</span>
              <div style={{ fontSize:13, color:brand.textMid, fontFamily:"sans-serif", lineHeight:1.6 }}>
                Questions? Contact{" "}
                <a href="mailto:sales@tallykey.co.nz" style={{color:brand.blue}}>sales@tallykey.co.nz</a> or{" "}
                <a href="tel:0800825595" style={{color:brand.blue}}>0800 82 55 95</a>.
              </div>
            </div>
            <div style={{ marginTop:40, paddingTop:24, borderTop:`1px solid ${brand.border}`, display:"flex", justifyContent:"center" }}>
              <MPLogo size={0.85} />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(DesignApproval));
