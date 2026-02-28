import React, { useState, useMemo, useRef, useEffect } from "react";

function SearchIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="#8fadc8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
    );
}
function ChevronUp() {
    return (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15"/>
        </svg>
    );
}
function ChevronDown() {
    return (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"/>
        </svg>
    );
}
function ChevronsUpDown() {
    return (
        <svg width="11" height="14" viewBox="0 0 24 28" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18,11 12,5 6,11"/>
            <polyline points="6,17 12,23 18,17"/>
        </svg>
    );
}

const ACTIVITY_MAP = {
    1:[12,18,9,24,31,22,40,35,28,45,38,52],  2:[5,14,22,18,9,30,25,19,34,28,41,36],
    3:[20,15,28,35,22,40,18,30,45,25,38,50],  4:[8,12,19,15,25,20,30,18,28,35,22,40],
    5:[15,22,18,30,25,35,28,40,32,45,38,50],  6:[30,25,40,35,50,45,55,48,60,52,65,58],
    7:[10,18,14,22,28,20,35,30,25,40,35,45],  8:[6,10,15,12,20,18,25,22,30,28,35,32],
    9:[18,25,20,30,35,28,42,38,32,48,42,55],  10:[40,35,50,45,60,55,65,58,70,62,75,68],
    11:[22,30,25,38,32,45,40,35,50,44,58,52], 12:[15,20,28,22,35,30,40,35,28,45,38,50],
    13:[25,32,28,40,35,48,42,38,52,45,58,52], 14:[35,28,42,38,50,45,55,50,42,60,52,65],
    15:[8,14,10,18,22,16,28,24,18,32,28,38],  16:[50,42,58,52,65,60,72,65,58,75,68,80],
    17:[20,28,22,35,30,42,38,32,48,40,55,48], 18:[12,18,15,24,20,30,28,22,35,30,40,36],
    19:[28,35,30,42,38,50,45,40,55,48,62,55], 20:[45,38,55,50,62,58,70,65,58,75,68,80],
    21:[15,22,18,28,25,35,30,25,38,32,45,40], 22:[30,25,38,32,45,40,52,48,40,58,50,62],
    23:[40,35,48,45,55,50,62,58,52,68,62,72], 24:[25,32,28,38,35,45,42,38,50,45,58,52],
    25:[10,16,12,20,18,26,22,18,28,25,32,28], 26:[18,25,20,30,28,38,34,30,42,38,48,44],
    27:[55,48,65,58,72,68,80,75,68,85,78,90], 28:[30,38,32,45,40,52,48,42,58,52,65,60],
    29:[35,28,42,38,50,46,58,52,45,62,55,68], 30:[12,18,14,22,20,28,25,20,32,28,38,34],
    31:[16,22,18,28,25,34,30,26,38,34,42,38], 32:[28,22,35,30,42,38,48,44,38,52,46,58],
    33:[22,28,25,35,32,42,38,32,48,42,55,50], 34:[32,26,40,35,48,44,55,50,42,60,54,65],
    35:[5,8,6,10,12,9,15,12,8,18,14,20],      36:[8,12,10,16,14,20,18,14,22,20,26,22],
    37:[22,18,28,25,35,32,42,38,30,48,42,52], 38:[6,10,8,14,12,18,15,12,20,18,24,20],
    39:[10,15,12,20,18,25,22,18,28,25,32,28], 40:[38,32,48,42,55,50,62,58,50,68,62,72],
    41:[14,20,16,25,22,30,28,22,35,30,38,34], 42:[42,35,52,48,60,55,68,62,55,72,65,78],
    43:[10,14,12,18,16,22,20,16,26,22,30,26], 44:[16,22,18,28,25,32,30,25,38,34,42,38],
    45:[12,18,15,22,20,28,25,20,30,28,36,32], 46:[18,24,20,30,28,36,32,28,40,36,45,40],
    47:[22,30,25,35,32,42,38,32,48,44,55,50], 48:[60,52,72,65,80,75,88,82,75,92,85,98],
    49:[4,8,6,10,8,14,12,8,16,14,20,16],      50:[38,32,48,42,55,50,62,58,52,68,62,75],
};

const CAT_STYLE = {
    "Tools":       { bg:"#e8f0fe", color:"#3b6fd4", border:"#c7d9fb" },
    "Paint":       { bg:"#f0ebff", color:"#6c3fc5", border:"#d8ccf7" },
    "Finishing":   { bg:"#fff4e0", color:"#c07800", border:"#ffdea0" },
    "Power Tools": { bg:"#ffeee8", color:"#c04a20", border:"#ffccb8" },
    "Measuring":   { bg:"#e0f7fc", color:"#007a94", border:"#aaeaf5" },
    "Adhesives":   { bg:"#e8faf0", color:"#1a7a40", border:"#a8e8c4" },
    "Safety":      { bg:"#e8faf0", color:"#1a6e38", border:"#90ddb0" },
    "Building":    { bg:"#f0f4f8", color:"#445566", border:"#c8d5e0" },
    "Plumbing":    { bg:"#e0efff", color:"#1a5fa0", border:"#a8d0f8" },
    "Electrical":  { bg:"#fefbe0", color:"#8a6500", border:"#f0d870" },
    "Flooring":    { bg:"#fdeef7", color:"#a8196a", border:"#f0b8da" },
};

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const ROWS_PER_PAGE = 10;

function MountainChart({ data, color }) {
    const w = 300, h = 90;
    const max = Math.max(...data), min = Math.min(...data), range = max - min || 1;
    const pts = data.map((v, i) => [
        (i / (data.length - 1)) * w,
        h - ((v - min) / range) * (h - 12) - 6,
    ]);
    const path = pts.map((p, i) => {
        if (i === 0) return `M ${p[0]},${p[1]}`;
        const pr = pts[i-1], cx = (pr[0]+p[0])/2;
        return `C ${cx},${pr[1]} ${cx},${p[1]} ${p[0]},${p[1]}`;
    }).join(" ");
    const area = `${path} L ${w},${h} L 0,${h} Z`;
    const peak = pts.reduce((a, b) => b[1] < a[1] ? b : a);
    const gid = `g${color.replace("#","")}`;
    return (
        <svg viewBox={`0 0 ${w} ${h}`} style={{ width:"100%", height:90 }}>
            <defs>
                <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.3"/>
                    <stop offset="100%" stopColor={color} stopOpacity="0.02"/>
                </linearGradient>
            </defs>
            <path d={area} fill={`url(#${gid})`}/>
            <path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
            <circle cx={peak[0]} cy={peak[1]} r={7} fill={color} fillOpacity={0.18}/>
            <circle cx={peak[0]} cy={peak[1]} r={3.5} fill={color}/>
        </svg>
    );
}

function SidePanel({ item, onClose }) {
    if (!item) return null;
    const act   = ACTIVITY_MAP[item.id] || Array(12).fill(0);
    const cs    = CAT_STYLE[item.category] || { color:"#3b6fd4" };
    const color = cs.color;
    const peak  = Math.max(...act);
    const avg   = Math.round(act.reduce((a,b)=>a+b,0) / act.length);
    const total = act.reduce((a,b)=>a+b,0);

    return (
        <div style={{
            position:"fixed", top:0, right:0, height:"100vh", width:340,
            background:"#fff", boxShadow:"-6px 0 32px rgba(60,90,120,0.14)",
            zIndex:1000, display:"flex", flexDirection:"column",
            fontFamily:"'Inter',sans-serif", overflowY:"auto",
        }}>
    
            <div style={{ background:"#6b8cae", padding:"22px 20px 20px", color:"#fff" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                    <div>
                        <div style={{ fontSize:10, opacity:0.65, marginBottom:4, textTransform:"uppercase", letterSpacing:1.4 }}>
                            Product ID · {item.id}
                        </div>
                        <div style={{ fontSize:20, fontWeight:800, letterSpacing:-0.3 }}>{item.name}</div>
                        <div style={{ marginTop:8 }}>
                            <span style={{
                                fontSize:11, padding:"2px 10px", borderRadius:20, fontWeight:700,
                                background:"rgba(255,255,255,0.2)", color:"#fff", border:"1px solid rgba(255,255,255,0.3)",
                            }}>{item.category}</span>
                        </div>
                    </div>
                    <button onClick={onClose} style={{
                        background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.25)",
                        color:"#fff", borderRadius:"50%", width:30, height:30,
                        cursor:"pointer", fontSize:13, display:"flex", alignItems:"center", justifyContent:"center",
                    }}>✕</button>
                </div>
                <div style={{ marginTop:16, display:"flex", alignItems:"baseline", gap:3 }}>
                    <span style={{ fontSize:13, opacity:0.6, fontWeight:600 }}>₱</span>
                    <span style={{ fontSize:28, fontWeight:800, letterSpacing:-0.8 }}>{item.price.toLocaleString()}</span>
                </div>
            </div>

            <div style={{ padding:18, display:"flex", flexDirection:"column", gap:12 }}>
                <div style={{ background:"#f7fafd", borderRadius:10, padding:14, border:"1px solid #dce8f0" }}>
                    <div style={{ fontSize:10, fontWeight:700, color:"#8faab8", marginBottom:10, textTransform:"uppercase", letterSpacing:1.1 }}>
                        Monthly Sales
                    </div>
                    <MountainChart data={act} color={color}/>
                    <div style={{ display:"flex", justifyContent:"space-between", marginTop:4 }}>
                        {["Jan","Jul","Dec"].map(m => <span key={m} style={{ fontSize:10, color:"#b8ccd8" }}>{m}</span>)}
                    </div>
                </div>

  
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
                    {[["Peak",peak],["Avg",avg],["Total",total]].map(([l,v]) => (
                        <div key={l} style={{ background:"#f7fafd", borderRadius:10, padding:"11px 8px", textAlign:"center", border:"1px solid #dce8f0" }}>
                            <div style={{ fontSize:18, fontWeight:800, color, letterSpacing:-0.4 }}>{v}</div>
                            <div style={{ fontSize:10, color:"#8faab8", textTransform:"uppercase", letterSpacing:0.8, marginTop:2 }}>{l}</div>
                        </div>
                    ))}
                </div>

      
                <div style={{ background:"#f7fafd", borderRadius:10, padding:14, border:"1px solid #dce8f0" }}>
                    <div style={{ fontSize:10, fontWeight:700, color:"#8faab8", marginBottom:12, textTransform:"uppercase", letterSpacing:1.1 }}>
                        Breakdown
                    </div>
                    {MONTHS.map((m,i) => (
                        <div key={m} style={{ display:"flex", alignItems:"center", marginBottom:7 }}>
                            <div style={{ width:28, fontSize:10, color:"#8faab8", fontWeight:600 }}>{m}</div>
                            <div style={{ flex:1, background:"#dce8f0", borderRadius:4, height:5, margin:"0 10px" }}>
                                <div style={{ width:`${(act[i]/peak)*100}%`, height:"100%", background:color, borderRadius:4, transition:"width 0.4s" }}/>
                            </div>
                            <div style={{ width:22, fontSize:10, color:"#445566", textAlign:"right", fontWeight:600 }}>{act[i]}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function ProductTable({ items }) {
    const [search,      setSearch]      = useState("");
    const [sortKey,     setSortKey]     = useState("id");
    const [sortDir,     setSortDir]     = useState("asc");
    const [selected,    setSelected]    = useState([]);
    const [page,        setPage]        = useState(1);
    const [activeItem,  setActiveItem]  = useState(null);
    const [rowOrder,    setRowOrder]    = useState(null); 
    const [dragIdx,     setDragIdx]     = useState(null);
    const [dragOverIdx, setDragOverIdx] = useState(null);
    const cbRef    = useRef(null);
    const dragItem = useRef(null);

    const filtered = useMemo(() => {
        const q = search.toLowerCase();
        return items.filter(i =>
            i.name.toLowerCase().includes(q) ||
            i.category.toLowerCase().includes(q) ||
            String(i.price).includes(q) ||
            String(i.id).includes(q)
        );
    }, [items, search]);

    const sorted = useMemo(() => [...filtered].sort((a, b) => {
        const av = a[sortKey], bv = b[sortKey];
        if (typeof av === "number") return sortDir === "asc" ? av - bv : bv - av;
        return sortDir === "asc"
            ? String(av).localeCompare(String(bv))
            : String(bv).localeCompare(String(av));
    }), [filtered, sortKey, sortDir]);

    const totalPages  = Math.ceil(sorted.length / ROWS_PER_PAGE);
    const sortedPage  = sorted.slice((page-1)*ROWS_PER_PAGE, page*ROWS_PER_PAGE);
    const paginated   = rowOrder || sortedPage;
    const allChecked  = paginated.length > 0 && paginated.every(i => selected.includes(i.id));
    const someChecked = paginated.some(i => selected.includes(i.id)) && !allChecked;

    useEffect(() => { setRowOrder(null); }, [page, sortKey, sortDir, search]);
    useEffect(() => { if (cbRef.current) cbRef.current.indeterminate = someChecked; }, [someChecked]);

    const handleDragStart = (e, idx) => {
        dragItem.current = idx;
        setDragIdx(idx);
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setDragImage(e.currentTarget, 20, 20);
    };
    const handleDragEnter = (idx) => { setDragOverIdx(idx); };
    const handleDragOver  = (e)    => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; };
    const handleDrop      = (e, toIdx) => {
        e.preventDefault();
        const fromIdx = dragItem.current;
        if (fromIdx === null || fromIdx === toIdx) return;
        const updated = [...paginated];
        const [moved] = updated.splice(fromIdx, 1);
        updated.splice(toIdx, 0, moved);
        setRowOrder(updated);
        setDragIdx(null);
        setDragOverIdx(null);
        dragItem.current = null;
    };
    const handleDragEnd   = () => { setDragIdx(null); setDragOverIdx(null); dragItem.current = null; };

    const handleSort      = k => { if (sortKey===k) setSortDir(d=>d==="asc"?"desc":"asc"); else { setSortKey(k); setSortDir("asc"); }};
    const handleSelectAll = e => { if (e.target.checked) setSelected(paginated.map(i=>i.id)); else setSelected([]); };
    const handleSelect    = id => setSelected(p => p.includes(id) ? p.filter(x=>x!==id) : [...p,id]);
    const handleRowClick  = item => setActiveItem(p => p?.id===item.id ? null : item);

    const pageNumbers = () => {
        const ps = [];
        if (totalPages <= 7) { for (let i=1;i<=totalPages;i++) ps.push(i); }
        else {
            ps.push(1);
            if (page > 3) ps.push("...");
            for (let i=Math.max(2,page-1); i<=Math.min(totalPages-1,page+1); i++) ps.push(i);
            if (page < totalPages-2) ps.push("...");
            ps.push(totalPages);
        }
        return ps;
    };

    const badge = cat => {
        const c = CAT_STYLE[cat] || { bg:"#f0f4f8", color:"#445566", border:"#c8d5e0" };
        return {
            display:"inline-block", padding:"3px 10px", borderRadius:20,
            fontSize:11, fontWeight:700, letterSpacing:0.1,
            background:c.bg, color:c.color, border:`1px solid ${c.border}`,
        };
    };

    const [hoveredCol, setHoveredCol] = useState(null);

    const SortIcon = ({ col }) => {
        const style = { marginLeft: 6, display: "inline-flex", verticalAlign: "middle" };
        if (sortKey !== col) return <span style={style}><ChevronsUpDown /></span>;
        return <span style={style}>{sortDir === "asc" ? <ChevronUp /> : <ChevronDown />}</span>;
    };

    const pageBtn = active => ({
        width:30, height:30, borderRadius:6,
        border: active ? "none" : "1px solid #c8d8e8",
        background: active ? "#6b8cae" : "#fff",
        color:  active ? "#fff" : "#5a7590",
        fontWeight: active ? 700 : 400,
        fontSize:13, cursor:"pointer",
        display:"flex", alignItems:"center", justifyContent:"center",
    });

    return (
        <div style={{ fontFamily:"'Inter',sans-serif", padding:28, background:"#eef3f8", minHeight:"100vh" }}>
            <div style={{
                background:"#fff", borderRadius:14,
                boxShadow:"0 2px 20px rgba(60,90,120,0.1), 0 1px 4px rgba(60,90,120,0.06)",
                overflow:"hidden",
            }}>

                <div style={{
                    padding:"18px 24px", borderBottom:"1px solid #dce8f0",
                    display:"flex", justifyContent:"space-between", alignItems:"center",
                    flexWrap:"wrap", gap:12,
                }}>
                    <div>
                        <div style={{ fontSize:17, fontWeight:800, color:"#1a2e42", letterSpacing:-0.3 }}>
                            Product List
                        </div>
                        <div style={{ fontSize:12, color:"#8faab8", marginTop:2 }}>
                            {filtered.length} products
                            {selected.length > 0 ? ` · ${selected.length} selected` : ""}
                        </div>
                    </div>
                    <div style={{
                        display:"flex", alignItems:"center", gap:8,
                        background:"#f2f7fb", border:"1.5px solid #c8d8e8",
                        borderRadius:8, padding:"7px 12px", minWidth:210,
                    }}>
                        <SearchIcon/>
                        <input
                            style={{ border:"none", background:"transparent", outline:"none", fontSize:13, color:"#1a2e42", width:"100%" }}
                            placeholder="Search products..."
                            value={search}
                            onChange={e => { setSearch(e.target.value); setPage(1); }}
                        />
                    </div>
                </div>

          
                <div style={{ overflowX:"auto" }}>
                    <table style={{ width:"100%", borderCollapse:"collapse" }}>
                        <thead>
                            <tr style={{ background:"#6b8cae" }}>
                                <th style={{ padding:"12px 12px", width:36 }}></th>
                                <th style={{ padding:"12px 20px", width:44, borderRight:"1px solid rgba(255,255,255,0.12)" }}>
                                    <input
                                        type="checkbox" ref={cbRef}
                                        checked={allChecked} onChange={handleSelectAll}
                                        style={{ accentColor:"#fff", width:14, height:14, cursor:"pointer" }}
                                    />
                                </th>
                                {[["id","ID"],["name","Product Name"],["price","Price (₱)"],["category","Category"]].map(([key,label], i, arr) => (
                                    <th key={key}
                                        onClick={() => handleSort(key)}
                                        onMouseEnter={() => setHoveredCol(key)}
                                        onMouseLeave={() => setHoveredCol(null)}
                                        style={{
                                            padding:"12px 20px", textAlign:"left",
                                            fontSize:11, fontWeight:700, letterSpacing:0.8,
                                            color:"#ffffff",
                                            textTransform:"uppercase", cursor:"pointer",
                                            userSelect:"none", whiteSpace:"nowrap",
                                            borderRight: i < arr.length-1 ? "1px solid rgba(255,255,255,0.12)" : "none",
                                            background: sortKey===key ? "rgba(0,0,0,0.15)" : hoveredCol===key ? "rgba(0,0,0,0.08)" : "transparent",
                                            transition:"background 0.15s",
                                        }}>
                                        {label}<SortIcon col={key}/>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.length === 0 ? (
                                <tr><td colSpan={5} style={{ padding:48, textAlign:"center", color:"#8faab8", fontSize:14 }}>
                                    No products found
                                </td></tr>
                            ) : paginated.map((item, idx) => {
                                const isActive   = activeItem?.id === item.id;
                                const isSelected = selected.includes(item.id);
                                const isEven     = idx % 2 === 1;
                                const isDragging = dragIdx === idx;
                                const isOver     = dragOverIdx === idx && dragIdx !== idx;
                                return (
                                    <tr key={item.id}
                                        draggable
                                        onDragStart={e => handleDragStart(e, idx)}
                                        onDragEnter={() => handleDragEnter(idx)}
                                        onDragOver={handleDragOver}
                                        onDrop={e => handleDrop(e, idx)}
                                        onDragEnd={handleDragEnd}
                                        onClick={() => handleRowClick(item)}
                                        style={{
                                            background: isDragging  ? "#dbeafe"
                                                      : isOver      ? "#e0f0ff"
                                                      : isActive    ? "#e8f0fb"
                                                      : isSelected  ? "#eafaf1"
                                                      : isEven      ? "#f7fafd"
                                                      : "#ffffff",
                                            cursor: "grab",
                                            transition: "background 0.1s, transform 0.1s",
                                            opacity: isDragging ? 0.5 : 1,
                                            borderLeft: isOver    ? "3px solid #6b8cae"
                                                      : isActive  ? "3px solid #6b8cae"
                                                      : "3px solid transparent",
                                            boxShadow: isOver ? "0 2px 12px rgba(107,140,174,0.18)" : "none",
                                        }}
                                        onMouseEnter={e => { if (!isDragging) e.currentTarget.style.background = "#edf4fb"; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = isDragging?"#dbeafe":isOver?"#e0f0ff":isActive?"#e8f0fb":isSelected?"#eafaf1":isEven?"#f7fafd":"#ffffff"; }}
                                    >
                                       
                                        <td style={{ padding:"11px 8px 11px 16px", borderBottom:"1px solid #e8f0f6", cursor:"grab", width:36 }}
                                            onClick={e => e.stopPropagation()}>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ display:"block", margin:"auto" }}>
                                                <circle cx="9"  cy="5"  r="1.5" fill="#b8ccd8"/>
                                                <circle cx="15" cy="5"  r="1.5" fill="#b8ccd8"/>
                                                <circle cx="9"  cy="12" r="1.5" fill="#b8ccd8"/>
                                                <circle cx="15" cy="12" r="1.5" fill="#b8ccd8"/>
                                                <circle cx="9"  cy="19" r="1.5" fill="#b8ccd8"/>
                                                <circle cx="15" cy="19" r="1.5" fill="#b8ccd8"/>
                                            </svg>
                                        </td>
    
                                        <td style={{ padding:"12px 20px", borderBottom:"1px solid #e8f0f6" }}
                                            onClick={e => e.stopPropagation()}>
                                            <input type="checkbox" checked={isSelected}
                                                onChange={() => handleSelect(item.id)}
                                                style={{ accentColor:"#6b8cae", width:14, height:14, cursor:"pointer" }}/>
                                        </td>

                                 
                                        <td style={{ padding:"11px 20px", borderBottom:"1px solid #e8f0f6" }}>
                                            <div style={{ fontSize:13, fontWeight:700, color:"#1a2e42" }}>{item.id}</div>
                                            <div style={{ fontSize:11, color:"#8faab8", marginTop:2 }}>
                                                SKU-{String(item.id).padStart(4,"0")}
                                            </div>
                                        </td>

                                      
                                        <td style={{ padding:"11px 20px", borderBottom:"1px solid #e8f0f6" }}>
                                            <div style={{ fontSize:13, fontWeight:600, color:"#1a2e42" }}>{item.name}</div>
                                            <div style={{ fontSize:11, color:"#8faab8", marginTop:2 }}>
                                                {item.category} · In Stock
                                            </div>
                                        </td>

                                    
                                        <td style={{ padding:"11px 20px", borderBottom:"1px solid #e8f0f6" }}>
                                            <div style={{ fontSize:13, fontWeight:700, color:"#1a2e42" }}>
                                                ₱{item.price.toLocaleString()}
                                            </div>
                                            <div style={{ fontSize:11, color:"#8faab8", marginTop:2 }}>PHP</div>
                                        </td>

                                     
                                        <td style={{ padding:"11px 20px", borderBottom:"1px solid #e8f0f6" }}>
                                            <span style={badge(item.category)}>{item.category}</span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

               
                <div style={{
                    padding:"13px 24px", borderTop:"1px solid #dce8f0",
                    display:"flex", justifyContent:"space-between", alignItems:"center",
                    flexWrap:"wrap", gap:8,
                }}>
                    <div style={{ fontSize:12, color:"#8faab8" }}>
                        Showing{" "}
                        <strong style={{ color:"#445566" }}>{Math.min((page-1)*ROWS_PER_PAGE+1, sorted.length)}</strong>
                        –
                        <strong style={{ color:"#445566" }}>{Math.min(page*ROWS_PER_PAGE, sorted.length)}</strong>
                        {" "}of{" "}
                        <strong style={{ color:"#445566" }}>{sorted.length}</strong>
                    </div>
                    <div style={{ display:"flex", gap:4, alignItems:"center" }}>
                        <button onClick={() => setPage(p=>Math.max(1,p-1))} disabled={page===1}
                            style={{ ...pageBtn(false), opacity: page===1 ? 0.35 : 1 }}>‹</button>
                        {pageNumbers().map((p,i) =>
                            p === "..." ? (
                                <span key={`e${i}`} style={{ fontSize:13, color:"#8faab8", padding:"0 4px" }}>…</span>
                            ) : (
                                <button key={p} onClick={() => setPage(p)} style={pageBtn(page===p)}>{p}</button>
                            )
                        )}
                        <button onClick={() => setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages}
                            style={{ ...pageBtn(false), opacity: page===totalPages ? 0.35 : 1 }}>›</button>
                    </div>
                </div>
            </div>

           
            {activeItem && (
                <>
                    <div onClick={() => setActiveItem(null)} style={{
                        position:"fixed", inset:0, background:"rgba(40,70,100,0.2)", zIndex:999,
                    }}/>
                    <SidePanel item={activeItem} onClose={() => setActiveItem(null)}/>
                </>
            )}
        </div>
    );
}