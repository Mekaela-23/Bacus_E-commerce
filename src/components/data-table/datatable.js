import { useState, useMemo, useRef, useEffect } from "react";

function ChevronUp() { return <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>; }
function ChevronDown() { return <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>; }
function ChevronsUpDown() { return <svg width="11" height="14" viewBox="0 0 24 28" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18,11 12,5 6,11"/><polyline points="6,17 12,23 18,17"/></svg>; }

const INIT = [
  {id:1,name:"Hammer",category:"Tools",price:350},{id:2,name:"Nails",category:"Building",price:80},
  {id:3,name:"Paint Brush",category:"Paint",price:120},{id:4,name:"Sandpaper",category:"Finishing",price:55},
  {id:5,name:"Drill Bit Set",category:"Power Tools",price:450},{id:6,name:"Measuring Tape",category:"Measuring",price:180},
  {id:7,name:"Wood Glue",category:"Adhesives",price:95},{id:8,name:"Safety Gloves",category:"Safety",price:160},
  {id:9,name:"Concrete Mix",category:"Building",price:520},{id:10,name:"Wrench Set",category:"Tools",price:780},
  {id:11,name:"PVC Pipe",category:"Plumbing",price:210},{id:12,name:"Electric Wire",category:"Electrical",price:340},
  {id:13,name:"Floor Tile",category:"Flooring",price:290},{id:14,name:"Putty Knife",category:"Finishing",price:75},
  {id:15,name:"Angle Grinder",category:"Power Tools",price:1200},{id:16,name:"Level Tool",category:"Measuring",price:320},
  {id:17,name:"Epoxy",category:"Adhesives",price:185},{id:18,name:"Hard Hat",category:"Safety",price:420},
  {id:19,name:"Cement Board",category:"Building",price:620},{id:20,name:"Pliers",category:"Tools",price:195},
  {id:21,name:"Faucet",category:"Plumbing",price:850},{id:22,name:"Circuit Breaker",category:"Electrical",price:960},
  {id:23,name:"Vinyl Flooring",category:"Flooring",price:375},{id:24,name:"Roller Brush",category:"Paint",price:140},
  {id:25,name:"Screwdriver Set",category:"Tools",price:560},{id:26,name:"Water Pump",category:"Plumbing",price:1850},
  {id:27,name:"Extension Cord",category:"Electrical",price:430},{id:28,name:"Laminate Board",category:"Flooring",price:680},
  {id:29,name:"Paint Roller",category:"Paint",price:110},{id:30,name:"Claw Hammer",category:"Tools",price:165},
  {id:31,name:"Pipe Wrench",category:"Plumbing",price:490},{id:32,name:"Wire Stripper",category:"Electrical",price:210},
  {id:33,name:"Ceramic Tile",category:"Flooring",price:380},{id:34,name:"Masking Tape",category:"Finishing",price:65},
  {id:35,name:"Box Cutter",category:"Tools",price:65},{id:36,name:"Ball Valve",category:"Plumbing",price:270},
  {id:37,name:"LED Bulb",category:"Electrical",price:120},{id:38,name:"Grout",category:"Flooring",price:195},
  {id:39,name:"Primer Paint",category:"Paint",price:480},{id:40,name:"Hacksaw",category:"Tools",price:310},
  {id:41,name:"Shower Head",category:"Plumbing",price:750},{id:42,name:"Junction Box",category:"Electrical",price:95},
  {id:43,name:"Floor Wax",category:"Flooring",price:220},{id:44,name:"Spray Paint",category:"Paint",price:175},
  {id:45,name:"Tape Measure",category:"Measuring",price:145},{id:46,name:"Safety Goggles",category:"Safety",price:280},
  {id:47,name:"Steel Rod",category:"Building",price:560},{id:48,name:"Super Glue",category:"Adhesives",price:55},
  {id:49,name:"Jigsaw Blade",category:"Power Tools",price:380},{id:50,name:"Squala",category:"Measuring",price:230},
];

const CAT_STYLE = {
  "Tools":{bg:"#e8f0fe",color:"#3b6fd4",border:"#c7d9fb"},
  "Paint":{bg:"#f0ebff",color:"#6c3fc5",border:"#d8ccf7"},
  "Finishing":{bg:"#fff4e0",color:"#c07800",border:"#ffdea0"},
  "Power Tools":{bg:"#ffeee8",color:"#c04a20",border:"#ffccb8"},
  "Measuring":{bg:"#e0f7fc",color:"#007a94",border:"#aaeaf5"},
  "Adhesives":{bg:"#e8faf0",color:"#1a7a40",border:"#a8e8c4"},
  "Safety":{bg:"#e8faf0",color:"#1a6e38",border:"#90ddb0"},
  "Building":{bg:"#f0f4f8",color:"#445566",border:"#c8d5e0"},
  "Plumbing":{bg:"#e0efff",color:"#1a5fa0",border:"#a8d0f8"},
  "Electrical":{bg:"#fefbe0",color:"#8a6500",border:"#f0d870"},
  "Flooring":{bg:"#fdeef7",color:"#a8196a",border:"#f0b8da"},
};
const CATS = Object.keys(CAT_STYLE);
const RPP_OPTIONS = [5, 10, 25, 50];

// ── Row height options ─────────────────────────────────────────
const ROW_HEIGHT_OPTIONS = [
  { key:"xs", label:"Extra small", cellPad:"5px 20px",  dragPad:"5px 8px 5px 14px", fontSize:12, subSize:10, showSub:false },
  { key:"sm", label:"Small",       cellPad:"8px 20px",  dragPad:"8px 8px 8px 14px", fontSize:13, subSize:11, showSub:true  },
  { key:"md", label:"Medium",      cellPad:"12px 20px", dragPad:"12px 8px 12px 14px",fontSize:13, subSize:11, showSub:true  },
  { key:"lg", label:"Large",       cellPad:"18px 20px", dragPad:"18px 8px 18px 14px",fontSize:14, subSize:12, showSub:true  },
];

const ACTIVITY_MAP = {
     1:[5.1,3.5,1.4,0.2,0.27],  2:[4.9,3.0,1.4,0.2,0.29],
     3:[4.7,3.2,1.3,0.2,0.28],  4:[4.6,3.1,1.5,0.2,0.33],
     5:[5.0,3.6,1.4,0.2,0.28],  6:[5.4,3.9,1.7,0.4,0.31],
     7:[4.6,3.4,1.4,0.3,0.30],  8:[5.0,3.4,1.5,0.2,0.30],
     9:[4.4,2.9,1.4,0.2,0.32], 10:[4.9,3.1,1.5,0.1,0.31],
    11:[5.4,3.7,1.5,0.2,0.28], 12:[4.8,3.4,1.6,0.2,0.33],
    13:[4.8,3.0,1.4,0.1,0.29], 14:[4.3,3.0,1.1,0.1,0.26],
    15:[5.8,4.0,1.2,0.2,0.21], 16:[5.7,4.4,1.5,0.4,0.26],
    17:[5.4,3.9,1.3,0.4,0.24], 18:[5.1,3.5,1.4,0.3,0.27],
    19:[5.7,3.8,1.7,0.3,0.30], 20:[5.1,3.8,1.5,0.3,0.29],
    21:[5.4,3.4,1.7,0.2,0.31], 22:[5.1,3.7,1.5,0.4,0.29],
    23:[4.6,3.6,1.0,0.2,0.22], 24:[5.1,3.3,1.7,0.5,0.33],
    25:[4.8,3.4,1.9,0.2,0.40], 26:[5.0,3.0,1.6,0.2,0.32],
    27:[5.0,3.4,1.6,0.4,0.32], 28:[5.2,3.5,1.5,0.2,0.29],
    29:[5.2,3.4,1.4,0.2,0.27], 30:[4.7,3.2,1.6,0.2,0.34],
    31:[4.8,3.1,1.6,0.2,0.33], 32:[5.4,3.4,1.5,0.4,0.28],
    33:[5.2,4.1,1.5,0.1,0.29], 34:[5.5,4.2,1.4,0.2,0.25],
    35:[4.9,3.1,1.5,0.2,0.31], 36:[5.0,3.2,1.2,0.2,0.24],
    37:[5.5,3.5,1.3,0.2,0.24], 38:[4.9,3.6,1.4,0.1,0.29],
    39:[4.4,3.0,1.3,0.2,0.30], 40:[5.1,3.4,1.5,0.2,0.29],
    41:[5.0,3.5,1.3,0.3,0.26], 42:[4.5,2.3,1.3,0.3,0.29],
    43:[4.4,3.2,1.3,0.2,0.30], 44:[5.0,3.5,1.6,0.6,0.32],
    45:[5.1,3.8,1.9,0.4,0.37], 46:[4.8,3.0,1.4,0.3,0.29],
    47:[5.1,3.8,1.6,0.2,0.31], 48:[4.6,3.2,1.4,0.2,0.30],
    49:[5.3,3.7,1.5,0.2,0.28], 50:[5.0,3.3,1.4,0.2,0.28],
};

const PRODUCT_IMAGE_MAP = {
    "Hammer":"https://shop.goldpeaktools.com.ph/cdn/shop/files/Untitled-11_2b41e00b-7908-471c-8b45-d4046e1802c4.jpg?v=1770619953&width=800",
    "Nails":"https://ph-test-11.slatic.net/p/0c604ba50f44009b859c1c36f5a236cd.jpg",
    "Squala":"https://ph-test-11.slatic.net/p/aa956095d7cedb04a71e76c56931fbca.jpg",
    "Paint Brush":"https://lotustools.ph/cdn/shop/files/6_947c1712-fc83-4f39-8dec-d0ae74f45ea2.jpg?v=1686805250&width=1946",
    "Sandpaper":"https://image-cdn.ubuy.com/80-grit-wet-dry-sandpaper-9-x-11-inch/400_400_100/6942579ffbe4b805b0034d4d.jpg",
    "Drill Bit Set":"https://tolsen.com.ph/cdn/shop/products/5c8880f6a2b23-75628-1-Copy.jpg?v=1740798891",
    "Measuring Tape":"https://media.rs-online.com/Y7769784-01.jpg",
    "Wood Glue":"https://thehappystation.com.ph/cdn/shop/files/WoodGlue_345x@2x.jpg?v=1720676338",
    "Safety Gloves":"https://media.rs-online.com/Y0145573-01.jpg",
    "Concrete Mix":"https://images.thdstatic.com/productImages/4e74c953-6f4a-4de5-b179-f72e00abdee0/svn/quikrete-concrete-110180-64_1000.jpg",
    "Wrench Set":"https://tolsen.com.ph/cdn/shop/files/15380.webp?v=1740798347",
    "PVC Pipe":"https://en.lesso.com/blogs/wp-content/uploads/2020/09/what-are-pvc-pipes-featured-image.jpg",
    "Electric Wire":"https://www.dfliq.net/wp-content/uploads/2016/08/Underground-Cables.jpg",
    "Floor Tile":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4d8MDyLsuW-OoQaRxNuWib2XPNIXGnfJ_jQ&s",
    "Putty Knife":"https://res.cloudinary.com/rsc/image/upload/b_rgb:FFFFFF,c_pad,dpr_2.625,f_auto,h_214,q_auto,w_380/c_pad,h_214,w_380/Y2511187-01?pgw=1",
    "Angle Grinder":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmL7MEd3YAWGpAHzFVaOjCDgs1l1WwqvQVMg&s",
    "Level Tool":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWwvHsQtWaRN_sK35U5kiLPn6w0yeP9-NrWA&s",
    "Epoxy":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDDIvFuzv5OvxOWiO_UWbFgQMgPIQMOEH-QA&s",
    "Hard Hat":"https://khmtools.com.ph/cdn/shop/products/80494833a0dc68ab9265d8dda8aa2c11_jpg_720x720q80_jpg.png?v=1750512038",
    "Cement Board":"https://cdn1.npcdn.net/images/1607912420e0af94b2c9660f6ad3b9a75b4aa66203.jpg?md5id=e7bb2a9a04e354411b083c574e7e1b1b&new_width=1000&new_height=1000&w=1767670440&type=9",
    "Pliers":"https://www.gigatools.ph/cdn/shop/products/15_5701b007-f357-4e67-97bd-aaff79ec2d37.jpg?v=1614305935&width=720",
    "Faucet":"https://media.publit.io/file/w_1000,h_1000,c_fit,q_80/hartford/demiko-1102-faucet.jpg",
    "Circuit Breaker":"https://www.acehardware.ph/cdn/shop/products/129.jpg?v=1737470017&width=533",
    "Vinyl Flooring":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyyUg2CBsmNJ9cPSFG9yi_9XbL8a1cZ37aVw&s",
    "Roller Brush":"https://www.wadfowstore.com/cdn/shop/files/WCB5902_ac27a474-ae3a-4131-a93e-cea6d1f333e2.jpg?v=1756965871",
    "Screwdriver Set":"https://cdn11.bigcommerce.com/s-k5143b1jn4/images/stencil/1280x1280/products/447/1040/6-piece-screwdriver-set__22289.1713351135.jpg?c=1",
    "Water Pump":"https://m.media-amazon.com/images/I/61X9vd-5pBL._AC_SL400_.jpg",
    "Extension Cord":"https://www.felcostore.ph/cdn/shop/files/REDEC114-3.png?v=1768455598",
    "Laminate Board":"https://mccoymart.com/post/wp-content/webp-express/webp-images/uploads/2016/06/laminated-particle.jpg.webp",
    "Paint Roller":"https://tolsen.com.ph/cdn/shop/files/40075.jpg?v=1740798406",
    "Claw Hammer":"https://res.cloudinary.com/rsc/image/upload/b_rgb:FFFFFF,c_pad,dpr_2.625,f_auto,h_214,q_auto,w_380/c_pad,h_214,w_380/R2215102-01?pgw=1",
    "Pipe Wrench":"https://www.gigatools.ph/cdn/shop/products/6_inches.jpg?v=1603964100&width=1000",
    "Wire Stripper":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBC6j2Gr_odtBkFo-GkCoN-aUxR5VkMoj9AQ&s",
    "Ceramic Tile":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP4K_kNUuuizURw9vZapZ7UwKZquBMmovKGw&s",
    "Masking Tape":"https://multimedia.3m.com/mws/media/86989J/3m-tm-masking-tapes-231-232-234.jpg?width=506",
    "Box Cutter":"https://pyrodirect.com/cdn/shop/products/Assorted_204.png?v=1706202012",
    "Ball Valve":"https://media.rs-online.com/image/upload/bo_1.5px_solid_white,b_auto,c_pad,dpr_2,f_auto,h_399,q_auto,w_710/c_pad,h_399,w_710/F7644275-01?pgw=1",
    "LED Bulb":"https://diyhardware.ph/cdn/shop/products/FFE1020.jpg?v=1605243527",
    "Grout":"https://shop.magnaprime.com.ph/cdn/shop/files/GROUT40.jpg?v=1731738504",
    "Primer Paint":"https://www.kilz.com/blog/wp-content/uploads//2020/04/Kilz-blog_how-primer-affects-paint-color-header-589285-2-e1599734232707.jpg",
    "Hacksaw":"https://t4.ftcdn.net/jpg/00/31/50/45/360_F_31504593_xiCWyUaV75nEhI4Bnr2GrzZy84sIEB52.jpg",
    "Shower Head":"https://cdn.thewirecutter.com/wp-content/media/2023/11/showerhead-2048px-5301.jpg?auto=webp&quality=75&width=1024",
    "Junction Box":"https://down-ph.img.susercontent.com/file/sg-11134201-7rbm0-lnwjsnbio692bd",
    "Floor Wax":"https://ever.ph/cdn/shop/files/9000012038-Starwax-Floor-Wax-Colorless-Waterproof-450g-230314_beea707e-b276-40ba-af15-a13aae73eaaf.jpg?v=1725328386",
    "Spray Paint":"https://kobymotorcare.com.ph/wp-content/uploads/2024/10/Spray-Paint.jpg",
    "Tape Measure":"https://img.lazcdn.com/g/p/ba999b6d3d5d10ec43ba42bee5078ed2.jpg_720x720q80.jpg",
    "Safety Goggles":"https://www.ergodyne.com/sites/default/files/product-images/arkyn-elastic-enhanced-anti-fog-anti-scratch-safety-goggles-clear-3q.jpg",
    "Steel Rod":"https://m.media-amazon.com/images/I/61Jt8z71DSS._SL1500_.jpg",
    "Super Glue":"https://i5.walmartimages.com/seo/The-Original-SuperGlue-SGH22-12-Super-Glue-Tubes-2-pk_f34fe7f8-c02d-473f-b866-9db41cb75118_1.4a35d67ef1fa1ae481fdc70b67afedb5.jpeg",
    "Jigsaw Blade":"https://powerhouse.com.ph/cdn/shop/files/IMG_7555_535x.png?v=1739174991",
};
function getProductImage(name){if(PRODUCT_IMAGE_MAP[name])return PRODUCT_IMAGE_MAP[name];return"https://source.unsplash.com/300x200/?"+encodeURIComponent(name+" hardware tool");}

function AndrewsCurve({dims,color}){
    const w=300,h=120,N=150,tMin=-Math.PI,tMax=Math.PI,pad=8;
    const maxAbs=Math.max(...dims.map(Math.abs),0.001);
    const norm=dims.map(v=>v/maxAbs*2.5);
    const av=(t,d)=>{let val=d[0]/Math.SQRT2;for(let k=1;k<d.length;k++){const freq=Math.ceil(k/2);val+=k%2===1?d[k]*Math.sin(freq*t):d[k]*Math.cos(freq*t);}return val;};
    const perturbs=[[0,0,0,0,0,0,0],[0.18,-0.12,0.20,-0.15,0.10,-0.18,0.12],[-0.15,0.22,-0.10,0.18,-0.22,0.12,-0.15],[0.10,-0.20,0.15,-0.22,0.08,-0.12,0.20],[-0.22,0.10,-0.18,0.08,-0.15,0.20,-0.10],[0.08,-0.18,0.12,-0.10,0.20,-0.08,0.18],[-0.12,0.15,-0.22,0.12,-0.10,0.15,-0.20],[0.20,-0.08,0.10,-0.18,0.15,-0.22,0.08]];
    const allCurves=perturbs.map(p=>{const d=norm.map((v,i)=>v*(1+(p[i]||0)));return Array.from({length:N+1},(_,i)=>av(tMin+(i/N)*(tMax-tMin),d));});
    const allVals=allCurves.flat();const minV=Math.min(...allVals),maxV=Math.max(...allVals),rangeV=maxV-minV||1;
    const toXY=(val,i)=>[(i/N)*w,h-pad-((val-minV)/rangeV)*(h-pad*2)];
    const mkPath=vals=>vals.map((val,i)=>{const[x,y]=toXY(val,i);if(i===0)return`M ${x.toFixed(1)},${y.toFixed(1)}`;const[px,py]=toXY(vals[i-1],i-1);const cx=(px+x)/2;return`C ${cx.toFixed(1)},${py.toFixed(1)} ${cx.toFixed(1)},${y.toFixed(1)} ${x.toFixed(1)},${y.toFixed(1)}`;}).join(" ");
    const opacities=[1.0,0.75,0.75,0.55,0.55,0.38,0.38,0.25];
    const widths=[2.0,1.2,1.2,0.9,0.9,0.7,0.7,0.55];
    return(<svg viewBox={`0 0 ${w} ${h}`} style={{width:"100%",height:120}}><line x1="0" y1={h*0.25} x2={w} y2={h*0.25} stroke="#e0e8f0" strokeWidth="0.5" opacity="0.2"/><line x1="0" y1={h*0.5} x2={w} y2={h*0.5} stroke="#e0e8f0" strokeWidth="0.5" opacity="0.2"/><line x1="0" y1={h*0.75} x2={w} y2={h*0.75} stroke="#e0e8f0" strokeWidth="0.5" opacity="0.2"/>{allCurves.map((vals,ci)=>(<path key={ci} d={mkPath(vals)} fill="none" stroke={color} strokeWidth={widths[ci]} strokeLinecap="round" strokeLinejoin="round" opacity={opacities[ci]}/>))}</svg>);
}

function SidePanel({item,onClose}){
    if(!item)return null;
    const act=ACTIVITY_MAP[item.id]||[5.0,3.0,1.5,0.3,0.30];
    const cs=CAT_STYLE[item.category]||{color:"#3b6fd4",bg:"#e8f0fe",border:"#c7d9fb"};
    const color=cs.color;
    const andrewsDims=[item.price/100,item.id/10,act[0],act[1],act[2],act[3],act[4]];
    const productImage=getProductImage(item.name);
    const specs={"weight":["250g","1.2kg","800g","500g"][item.id%4],"material":["Steel","Aluminum","Plastic","Composite"][item.id%4],"brand":["ProTools","BuildMax","TechGear","Premium"][item.id%4],"warranty":["1 Year","2 Years","Lifetime","6 Months"][item.id%4]};
    const features=["Durable & Long-lasting","Ergonomic Design","Professional Grade","Easy to Use"];
    return(
        <div style={{position:"fixed",top:0,right:0,height:"100vh",width:360,background:"#fff",boxShadow:"-6px 0 32px rgba(60,90,120,0.14)",zIndex:1000,display:"flex",flexDirection:"column",fontFamily:"'Inter',-apple-system,sans-serif",overflowY:"auto",overflowX:"hidden"}}>
            <button onClick={onClose} style={{position:"absolute",top:14,right:14,zIndex:1001,background:"rgba(107,140,174,0.9)",border:"1px solid rgba(255,255,255,0.2)",color:"#fff",borderRadius:"50%",width:32,height:32,cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
            <div style={{display:"flex",alignItems:"flex-start",padding:"18px 18px 16px",borderBottom:"1px solid #eef4fa"}}>
                <div style={{width:130,height:130,borderRadius:10,overflow:"hidden",border:"1px solid #dce8f0",background:"#f4f7fb",flexShrink:0,marginRight:14}}>
                    <img src={productImage} alt={item.name} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}} onError={e=>{e.target.style.display="none";e.target.parentNode.innerHTML='<span style="color:#b8ccd8;font-size:11px;display:flex;align-items:center;justify-content:center;height:100%">No image</span>';}}/>
                </div>
                <div style={{flex:1,paddingRight:36,display:"flex",flexDirection:"column",gap:6,paddingTop:2}}>
                    <div style={{fontSize:19,fontWeight:800,color:"#1a2a3a",letterSpacing:-0.4,lineHeight:1.2}}>{item.name}</div>
                    <span style={{display:"inline-block",padding:"3px 12px",borderRadius:16,fontSize:11,fontWeight:700,background:cs.bg,color:cs.color,border:`1px solid ${cs.border}`,alignSelf:"flex-start"}}>{item.category}</span>
                    <div style={{display:"flex",alignItems:"baseline",gap:4,marginTop:4}}>
                        <span style={{fontSize:13,color:"#8faab8",fontWeight:600}}>Price:</span>
                        <span style={{fontSize:28,fontWeight:800,color,letterSpacing:-0.6}}>₱{item.price.toLocaleString()}</span>
                    </div>
                </div>
            </div>
            <div style={{padding:"18px 18px 30px 18px",display:"flex",flexDirection:"column",gap:14,flex:1}}>
                <div style={{background:"#f7fafd",borderRadius:10,padding:14,border:"1px solid #dce8f0"}}>
                    <div style={{fontSize:10,fontWeight:700,color:"#8faab8",marginBottom:10,textTransform:"uppercase",letterSpacing:1.1}}>Sales Trend</div>
                    <AndrewsCurve dims={andrewsDims} color={color}/>
                    <div style={{display:"flex",justifyContent:"space-between",marginTop:6}}>
                        <span style={{fontSize:10,color:"#b8ccd8"}}>Jan</span>
                        <span style={{fontSize:10,color:"#b8ccd8"}}>Jul</span>
                        <span style={{fontSize:10,color:"#b8ccd8"}}>Dec</span>
                    </div>
                </div>
                <div style={{background:"#f7fafd",borderRadius:10,padding:14,border:"1px solid #dce8f0"}}>
                    <div style={{fontSize:10,fontWeight:700,color:"#8faab8",marginBottom:12,textTransform:"uppercase",letterSpacing:1.1}}>Specifications</div>
                    <div style={{display:"flex",flexDirection:"column",gap:9}}>
                        {Object.entries(specs).map(([key,value])=>(<div key={key} style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontSize:12,color:"#8faab8",fontWeight:600,textTransform:"capitalize"}}>{key}:</span><span style={{fontSize:12,color:"#445566",fontWeight:700}}>{value}</span></div>))}
                    </div>
                </div>
                <div style={{background:"#f7fafd",borderRadius:10,padding:14,border:"1px solid #dce8f0"}}>
                    <div style={{fontSize:10,fontWeight:700,color:"#8faab8",marginBottom:12,textTransform:"uppercase",letterSpacing:1.1}}>Key Features</div>
                    <div style={{display:"flex",flexDirection:"column",gap:7}}>
                        {features.map((f,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:6,height:6,borderRadius:"50%",background:color,flexShrink:0}}/><span style={{fontSize:12,color:"#445566"}}>{f}</span></div>))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function AddModal({onClose, onAdd, existingIds}) {
  const [form, setForm] = useState({id:"", name:"", category:"Tools", price:""});
  const [errors, setErrors] = useState({});
  const set = (k,v) => { setForm(f=>({...f,[k]:v})); setErrors(e=>({...e,[k]:""})); };
  const validate = () => {
    const e={};
    if(!form.id) e.id="Required";
    else if(isNaN(form.id)||parseInt(form.id)<=0) e.id="Must be positive number";
    else if(existingIds.includes(parseInt(form.id))) e.id="ID already exists";
    if(!form.name.trim()) e.name="Required";
    if(!form.price) e.price="Required";
    else if(isNaN(form.price)||parseFloat(form.price)<=0) e.price="Must be positive number";
    return e;
  };
  const submit = () => {
    const e=validate();
    if(Object.keys(e).length){setErrors(e);return;}
    onAdd({id:parseInt(form.id),name:form.name.trim(),category:form.category,price:parseFloat(form.price)});
    onClose();
  };
  const inp = (label,key,type="text",ph="") => (
    <div style={{marginBottom:14}}>
      <label style={{display:"block",fontSize:11,fontWeight:700,color:"#445566",marginBottom:5,textTransform:"uppercase",letterSpacing:0.6}}>{label}</label>
      <input type={type} value={form[key]} placeholder={ph}
        onChange={e=>set(key,e.target.value)}
        style={{width:"100%",padding:"9px 12px",borderRadius:8,border:`1.5px solid ${errors[key]?"#e05c5c":"#dce8f0"}`,fontSize:13,color:"#1a2e42",outline:"none",boxSizing:"border-box",background:"#f7fafd"}}
      />
      {errors[key]&&<div style={{fontSize:11,color:"#e05c5c",marginTop:3}}>⚠ {errors[key]}</div>}
    </div>
  );
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(20,45,74,0.5)",zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{background:"#fff",borderRadius:14,width:420,boxShadow:"0 12px 48px rgba(0,0,0,0.22)",overflow:"hidden"}}>
        <div style={{background:"#1b3a5c",padding:"16px 24px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{fontSize:15,fontWeight:800,color:"#fff"}}>+ Add New Product</div>
          <button onClick={onClose} style={{background:"rgba(255,255,255,0.15)",border:"none",color:"#fff",borderRadius:"50%",width:28,height:28,cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
        </div>
        <div style={{padding:"22px 24px 8px"}}>
          {inp("Product ID","id","number","e.g. 51")}
          {inp("Product Name","name","text","e.g. Circular Saw")}
          <div style={{marginBottom:14}}>
            <label style={{display:"block",fontSize:11,fontWeight:700,color:"#445566",marginBottom:5,textTransform:"uppercase",letterSpacing:0.6}}>Category</label>
            <select value={form.category} onChange={e=>set("category",e.target.value)}
              style={{width:"100%",padding:"9px 12px",borderRadius:8,border:"1.5px solid #dce8f0",fontSize:13,color:"#1a2e42",outline:"none",background:"#f7fafd",boxSizing:"border-box"}}>
              {CATS.map(c=><option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          {inp("Price (₱)","price","number","e.g. 250")}
        </div>
        <div style={{padding:"4px 24px 20px",display:"flex",gap:10,justifyContent:"flex-end"}}>
          <button onClick={onClose} style={{padding:"9px 20px",borderRadius:8,border:"1.5px solid #dce8f0",background:"#fff",color:"#5a7590",fontSize:13,fontWeight:600,cursor:"pointer"}}>Cancel</button>
          <button onClick={submit} style={{padding:"9px 24px",borderRadius:8,border:"none",background:"#1b3a5c",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer"}}>Add Product</button>
        </div>
      </div>
    </div>
  );
}

// ── Edit Modal ─────────────────────────────────────────────────
function EditModal({ items, onClose, onSave }) {
  // editForms: { [id]: { name, category, price } }
  const [forms, setForms] = useState(() =>
    Object.fromEntries(items.map(i => [i.id, { name: i.name, category: i.category, price: String(i.price) }]))
  );
  const [errors, setErrors] = useState({});

  const setField = (id, key, val) => {
    setForms(f => ({ ...f, [id]: { ...f[id], [key]: val } }));
    setErrors(e => ({ ...e, [`${id}_${key}`]: "" }));
  };

  const validate = () => {
    const e = {};
    items.forEach(i => {
      const f = forms[i.id];
      if (!f.name.trim()) e[`${i.id}_name`] = "Required";
      if (!f.price || isNaN(f.price) || parseFloat(f.price) <= 0) e[`${i.id}_price`] = "Positive number required";
    });
    return e;
  };

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    const updated = items.map(i => ({
      ...i,
      name: forms[i.id].name.trim(),
      category: forms[i.id].category,
      price: parseFloat(forms[i.id].price),
    }));
    onSave(updated);
    onClose();
  };

  const isSingle = items.length === 1;

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(20,45,74,0.52)", zIndex:2000, display:"flex", alignItems:"center", justifyContent:"center", padding:"16px" }}>
      <div style={{ background:"#fff", borderRadius:14, width:"100%", maxWidth:460, maxHeight:"90vh", display:"flex", flexDirection:"column", boxShadow:"0 16px 56px rgba(0,0,0,0.24)", overflow:"hidden" }}>

        {/* Header */}
        <div style={{ background:"#2a5080", padding:"15px 22px", display:"flex", justifyContent:"space-between", alignItems:"center", flexShrink:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            <span style={{ fontSize:15, fontWeight:800, color:"#fff" }}>
              {isSingle ? `Edit — ${items[0].name}` : `Edit ${items.length} Products`}
            </span>
          </div>
          <button onClick={onClose} style={{ background:"rgba(255,255,255,0.15)", border:"none", color:"#fff", borderRadius:"50%", width:28, height:28, cursor:"pointer", fontSize:14, display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
        </div>

        {/* Body — scrollable */}
        <div style={{ overflowY:"auto", flex:1, padding:"16px 22px 8px" }}>
          {items.map((item, idx) => {
            const f = forms[item.id];
            const err = k => errors[`${item.id}_${k}`];
            return (
              <div key={item.id} style={{ marginBottom: idx < items.length-1 ? 20 : 8 }}>
                {/* Row label when bulk */}
                {!isSingle && (
                  <div style={{ fontSize:11, fontWeight:700, color:"#6b8cae", textTransform:"uppercase", letterSpacing:0.8, marginBottom:10, paddingBottom:6, borderBottom:"1px solid #eef4fa" }}>
                    #{item.id} · {item.name}
                  </div>
                )}
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px 14px" }}>
                  {/* Name */}
                  <div style={{ gridColumn:"1 / -1" }}>
                    <label style={{ display:"block", fontSize:11, fontWeight:700, color:"#445566", marginBottom:4, textTransform:"uppercase", letterSpacing:0.6 }}>Product Name</label>
                    <input value={f.name} onChange={e => setField(item.id, "name", e.target.value)}
                      style={{ width:"100%", padding:"8px 11px", borderRadius:7, border:`1.5px solid ${err("name") ? "#e05c5c" : "#dce8f0"}`, fontSize:13, color:"#1a2e42", outline:"none", boxSizing:"border-box", background:"#f7fafd" }}/>
                    {err("name") && <div style={{ fontSize:11, color:"#e05c5c", marginTop:2 }}>⚠ {err("name")}</div>}
                  </div>
                  {/* Category */}
                  <div>
                    <label style={{ display:"block", fontSize:11, fontWeight:700, color:"#445566", marginBottom:4, textTransform:"uppercase", letterSpacing:0.6 }}>Category</label>
                    <select value={f.category} onChange={e => setField(item.id, "category", e.target.value)}
                      style={{ width:"100%", padding:"8px 11px", borderRadius:7, border:"1.5px solid #dce8f0", fontSize:13, color:"#1a2e42", outline:"none", background:"#f7fafd", boxSizing:"border-box" }}>
                      {CATS.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  {/* Price */}
                  <div>
                    <label style={{ display:"block", fontSize:11, fontWeight:700, color:"#445566", marginBottom:4, textTransform:"uppercase", letterSpacing:0.6 }}>Price (₱)</label>
                    <input type="number" value={f.price} onChange={e => setField(item.id, "price", e.target.value)}
                      style={{ width:"100%", padding:"8px 11px", borderRadius:7, border:`1.5px solid ${err("price") ? "#e05c5c" : "#dce8f0"}`, fontSize:13, color:"#1a2e42", outline:"none", boxSizing:"border-box", background:"#f7fafd" }}/>
                    {err("price") && <div style={{ fontSize:11, color:"#e05c5c", marginTop:2 }}>⚠ {err("price")}</div>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{ padding:"12px 22px 18px", display:"flex", gap:10, justifyContent:"flex-end", borderTop:"1px solid #eef4fa", flexShrink:0 }}>
          <button onClick={onClose} style={{ padding:"9px 20px", borderRadius:8, border:"1.5px solid #dce8f0", background:"#fff", color:"#5a7590", fontSize:13, fontWeight:600, cursor:"pointer" }}>Cancel</button>
          <button onClick={handleSave} style={{ padding:"9px 24px", borderRadius:8, border:"none", background:"#2a5080", color:"#fff", fontSize:13, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", gap:7 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            Save {items.length > 1 ? `${items.length} Products` : "Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Row Height Dropdown Component ──────────────────────────────
function RowHeightDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div ref={ref} style={{ position:"relative", flexShrink:0 }}>
      <button
        onClick={() => setOpen(o => !o)}
        title="Row height"
        style={{
          width:36, height:36,
          borderRadius:8,
          border: open ? "1.5px solid #6b8cae" : "1.5px solid #dce8f0",
          background: open ? "#e8f0fb" : "#f7fafd",
          color: open ? "#1b3a5c" : "#6b8cae",
          cursor:"pointer",
          display:"flex", alignItems:"center", justifyContent:"center",
          transition:"all 0.15s",
        }}
        onMouseEnter={e=>{ if(!open){ e.currentTarget.style.borderColor="#6b8cae"; e.currentTarget.style.background="#edf4fb"; }}}
        onMouseLeave={e=>{ if(!open){ e.currentTarget.style.borderColor="#dce8f0"; e.currentTarget.style.background="#f7fafd"; }}}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
      </button>

      {open && (
        <div style={{
          position:"absolute", top:"calc(100% + 8px)", right:0,
          background:"#fff",
          border:"1px solid #dce8f0",
          borderRadius:10,
          boxShadow:"0 8px 32px rgba(60,90,120,0.16)",
          zIndex:500,
          minWidth:195,
          padding:"6px 0",
          animation:"rhDropIn 0.14s ease",
        }}>
          <style>{`@keyframes rhDropIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}`}</style>

          <div style={{
            padding:"8px 16px 7px",
            fontSize:10, fontWeight:700, color:"#8faab8",
            textTransform:"uppercase", letterSpacing:1.1,
            borderBottom:"1px solid #eef4fa",
            marginBottom:4,
          }}>
            Row height
          </div>

          {ROW_HEIGHT_OPTIONS.map(opt => {
            const active = value === opt.key;
            return (
              <button key={opt.key}
                onClick={() => { onChange(opt.key); setOpen(false); }}
                style={{
                  width:"100%", display:"flex", alignItems:"center", gap:11,
                  padding:"9px 16px",
                  background: active ? "#edf4fb" : "transparent",
                  border:"none", cursor:"pointer", textAlign:"left",
                  transition:"background 0.1s",
                }}
                onMouseEnter={e=>{ if(!active) e.currentTarget.style.background="#f7fafd"; }}
                onMouseLeave={e=>{ if(!active) e.currentTarget.style.background="transparent"; }}
              >
                {/* Radio */}
                <div style={{
                  width:16, height:16, borderRadius:"50%",
                  border:`2px solid ${active ? "#1b3a5c" : "#c8d8e8"}`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  flexShrink:0, transition:"border-color 0.15s",
                }}>
                  {active && <div style={{ width:7, height:7, borderRadius:"50%", background:"#1b3a5c" }}/>}
                </div>
                <span style={{
                  fontSize:13,
                  color: active ? "#1b3a5c" : "#445566",
                  fontWeight: active ? 600 : 400,
                }}>
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function ProductTable() {
  const [products,setProducts]=useState(INIT);
  const [search,setSearch]=useState("");
  const [sortKey,setSortKey]=useState("id");
  const [sortDir,setSortDir]=useState("asc");
  const [selected,setSelected]=useState([]);
  const [page,setPage]=useState(1);
  const [rowOrder,setRowOrder]=useState(null);
  const [dragIdx,setDragIdx]=useState(null);
  const [dragOverIdx,setDragOverIdx]=useState(null);
  const [hoveredCol,setHoveredCol]=useState(null);
  const [hoveredRow,setHoveredRow]=useState(null);
  const [showAdd,setShowAdd]=useState(false);
  const [showBulkDelete,setShowBulkDelete]=useState(false);
  const [showEdit,setShowEdit]=useState(false);
  const [activeItem,setActiveItem]=useState(null);
  const [rowHeightKey, setRowHeightKey] = useState("sm");
  const [rpp, setRpp] = useState(10);
  const cbRef=useRef(null);
  const dragItem=useRef(null);

  const rh = ROW_HEIGHT_OPTIONS.find(o => o.key === rowHeightKey) || ROW_HEIGHT_OPTIONS[1];

  const filtered=useMemo(()=>{
    const q=search.toLowerCase();
    return products.filter(i=>i.name.toLowerCase().includes(q)||i.category.toLowerCase().includes(q)||String(i.price).includes(q)||String(i.id).includes(q));
  },[products,search]);

  const sorted=useMemo(()=>[...filtered].sort((a,b)=>{
    const av=a[sortKey],bv=b[sortKey];
    if(typeof av==="number") return sortDir==="asc"?av-bv:bv-av;
    return sortDir==="asc"?String(av).localeCompare(String(bv)):String(bv).localeCompare(String(av));
  }),[filtered,sortKey,sortDir]);

  const totalPages=Math.max(1,Math.ceil(sorted.length/rpp));
  const paginated=rowOrder||(sorted.slice((page-1)*rpp,page*rpp));
  const allChecked=paginated.length>0&&paginated.every(i=>selected.includes(i.id));
  const someChecked=paginated.some(i=>selected.includes(i.id))&&!allChecked;

  useEffect(()=>{setRowOrder(null);},[page,sortKey,sortDir,search,products,rpp]);
  useEffect(()=>{if(cbRef.current)cbRef.current.indeterminate=someChecked;},[someChecked]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=>{if(page>totalPages)setPage(totalPages);},[totalPages]);

  const onDragStart=(e,i)=>{dragItem.current=i;setDragIdx(i);e.dataTransfer.effectAllowed="move";};
  const onDragEnter=i=>setDragOverIdx(i);
  const onDragOver=e=>e.preventDefault();
  const onDrop=(e,to)=>{e.preventDefault();const fr=dragItem.current;if(fr===null||fr===to)return;const u=[...paginated];const[m]=u.splice(fr,1);u.splice(to,0,m);setRowOrder(u);setDragIdx(null);setDragOverIdx(null);dragItem.current=null;};
  const onDragEnd=()=>{setDragIdx(null);setDragOverIdx(null);dragItem.current=null;};
  const handleSort=k=>{if(sortKey===k)setSortDir(d=>d==="asc"?"desc":"asc");else{setSortKey(k);setSortDir("asc");}};
  const handleSelectAll=e=>{if(e.target.checked)setSelected(paginated.map(i=>i.id));else setSelected([]);};
  const handleSelect=id=>setSelected(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);
  const handleAdd=p=>{setProducts(prev=>[...prev,p]);};
  const handleSaveEdit=updated=>{setProducts(prev=>prev.map(p=>{const u=updated.find(x=>x.id===p.id);return u||p;}));setSelected([]);};
  const handleBulkDelete=()=>{setProducts(p=>p.filter(x=>!selected.includes(x.id)));setSelected([]);setShowBulkDelete(false);};
  const handleRowClick=item=>{if(!selected.includes(item.id))setActiveItem(p=>p?.id===item.id?null:item);};

  const pageNums=()=>{const ps=[];if(totalPages<=7){for(let i=1;i<=totalPages;i++)ps.push(i);}else{ps.push(1);if(page>3)ps.push("...");for(let i=Math.max(2,page-1);i<=Math.min(totalPages-1,page+1);i++)ps.push(i);if(page<totalPages-2)ps.push("...");ps.push(totalPages);}return ps;};
  const badge=cat=>{const c=CAT_STYLE[cat]||{bg:"#f0f4f8",color:"#445566",border:"#c8d5e0"};return{display:"inline-block",padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:700,background:c.bg,color:c.color,border:`1px solid ${c.border}`};};
  const SI=({col})=>{const s={marginLeft:6,display:"inline-flex",verticalAlign:"middle"};if(sortKey!==col)return<span style={s}><ChevronsUpDown/></span>;return<span style={s}>{sortDir==="asc"?<ChevronUp/>:<ChevronDown/>}</span>;};
  const pBtn=act=>({width:30,height:30,borderRadius:6,border:act?"none":"1px solid #c8d8e8",background:act?"#6b8cae":"#fff",color:act?"#fff":"#5a7590",fontWeight:act?700:400,fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"});

  return (
    <div style={{fontFamily:"'Inter',sans-serif",background:"#eef3f8",minHeight:"100vh",display:"flex",flexDirection:"column"}}>

      <div style={{background:"#1b3a5c",height:52,flexShrink:0,boxShadow:"0 2px 10px rgba(0,0,0,0.22)",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <span style={{fontSize:17,fontWeight:800,color:"#fff",letterSpacing:-0.3}}>Product List</span>
      </div>

      <style>{`.outer-pad{padding:24px}@media(max-width:600px){.outer-pad{padding:12px 8px}}`}</style>
      <div className="outer-pad" style={{flex:1}}>
        <div style={{background:"#fff",borderRadius:14,boxShadow:"0 2px 20px rgba(60,90,120,0.1)",overflow:"hidden"}}>

          {/* ── Toolbar (responsive) ── */}
          <style>{`
            @media (max-width: 600px) {
              .toolbar-wrap { flex-direction: column !important; gap: 8px !important; }
              .toolbar-search { width: 100% !important; }
              .toolbar-actions { width: 100%; justify-content: flex-end; }
              .btn-add-label { display: none !important; }
              .btn-edit-label { display: none !important; }
              .btn-del-label { display: none !important; }
            }
          `}</style>
          <div className="toolbar-wrap" style={{padding:"12px 16px",borderBottom:"1px solid #dce8f0",display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>

            {/* Rows Per Page */}
            <div style={{display:"flex",alignItems:"center",gap:7,flexShrink:0}}>
              <select
                value={rpp}
                onChange={e=>{setRpp(Number(e.target.value));setPage(1);}}
                style={{height:36,padding:"0 8px",borderRadius:8,border:"1.5px solid #dce8f0",background:"#f7fafd",color:"#1a2e42",fontSize:13,fontWeight:600,outline:"none",cursor:"pointer"}}>
                {RPP_OPTIONS.map(n=><option key={n} value={n}>{n}</option>)}
              </select>
              <span style={{fontSize:12,color:"#8faab8",whiteSpace:"nowrap"}}>Rows per page</span>
            </div>

            {/* Search */}
            <div className="toolbar-search" style={{position:"relative",flex:1,minWidth:160}}>
              <svg style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8faab8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                style={{width:"100%",padding:"8px 30px 8px 32px",borderRadius:8,border:"1.5px solid #dce8f0",background:"#f7fafd",color:"#1a2e42",fontSize:13,outline:"none",boxSizing:"border-box",transition:"border-color 0.2s"}}
                placeholder="Search by name, SKU, category, price..."
                value={search}
                onChange={e=>{setSearch(e.target.value);setPage(1);}}
                onFocus={e=>e.target.style.borderColor="#6b8cae"}
                onBlur={e=>e.target.style.borderColor="#dce8f0"}
              />
              {search&&<button onClick={()=>{setSearch("");setPage(1);}} style={{position:"absolute",right:9,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"#8faab8",fontSize:14,lineHeight:1,padding:0}}>✕</button>}
            </div>

            {/* Action buttons — always visible */}
            <div className="toolbar-actions" style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>

              {/* ⚙ Row height — icon only on mobile */}
              <RowHeightDropdown value={rowHeightKey} onChange={setRowHeightKey} />

              {/* ✏ Edit selected — icon only on mobile */}
              <button
                onClick={() => selected.length > 0 && setShowEdit(true)}
                disabled={selected.length === 0}
                title={`Edit${selected.length > 0 ? ` (${selected.length})` : ""}`}
                style={{ height:36, padding:"0 14px", borderRadius:8, border:"none", background:"#2a7a4a", color:"#fff", fontSize:13, fontWeight:700, cursor:selected.length>0?"pointer":"not-allowed", display:"flex", alignItems:"center", gap:6, flexShrink:0, whiteSpace:"nowrap", opacity:selected.length===0?0.45:1, transition:"opacity 0.15s" }}
                onMouseEnter={e=>{ if(selected.length>0) e.currentTarget.style.background="#1e5c38"; }}
                onMouseLeave={e=>{ if(selected.length>0) e.currentTarget.style.background="#2a7a4a"; }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
                <span className="btn-edit-label">Edit{selected.length > 0 ? ` (${selected.length})` : ""}</span>
              </button>

              {/* Add New — icon + label on desktop, icon only on mobile */}
              <button onClick={()=>setShowAdd(true)}
                style={{height:36,padding:"0 14px",borderRadius:8,border:"none",background:"#1b3a5c",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:6,flexShrink:0,whiteSpace:"nowrap"}}
                onMouseEnter={e=>e.currentTarget.style.background="#254e7a"}
                onMouseLeave={e=>e.currentTarget.style.background="#1b3a5c"}
                title="Add">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                <span className="btn-add-label">Add</span>
              </button>

              {/* Delete — icon + count on desktop, icon only on mobile */}
              <button
                onClick={()=>selected.length>0&&setShowBulkDelete(true)}
                disabled={selected.length===0}
                style={{height:36,padding:"0 14px",borderRadius:8,border:"none",background:"#c04a20",color:"#fff",fontSize:13,fontWeight:700,cursor:selected.length>0?"pointer":"not-allowed",display:"flex",alignItems:"center",gap:6,flexShrink:0,whiteSpace:"nowrap",opacity:selected.length===0?0.45:1,transition:"opacity 0.15s"}}
                onMouseEnter={e=>{if(selected.length>0)e.currentTarget.style.background="#a03518";}}
                onMouseLeave={e=>{if(selected.length>0)e.currentTarget.style.background="#c04a20";}}
                title={`Delete${selected.length>0?` (${selected.length})`:""}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                <span className="btn-del-label">Delete{selected.length>0?` (${selected.length})`:""}</span>
              </button>
            </div>
          </div>

          {/* ── Table ── */}
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead>
                <tr style={{background:"#6b8cae"}}>
                  <th style={{padding:"11px 10px",width:36}}></th>
                  <th style={{padding:"11px 14px",width:40,borderRight:"1px solid rgba(255,255,255,0.12)",textAlign:"center"}}>
                    <input type="checkbox" ref={cbRef} checked={allChecked} onChange={handleSelectAll} style={{accentColor:"#fff",width:14,height:14,cursor:"pointer",margin:0}}/>
                  </th>
                  {[["id","ID"],["name","Product Name"],["price","Price (₱)"],["category","Category"]].map(([key,label],i,arr)=>(
                    <th key={key} onMouseEnter={()=>setHoveredCol(key)} onMouseLeave={()=>setHoveredCol(null)}
                      style={{padding:"10px 20px",textAlign:"left",fontSize:11,fontWeight:700,letterSpacing:0.8,color:"#fff",textTransform:"uppercase",userSelect:"none",whiteSpace:"nowrap",borderRight:i<arr.length-1?"1px solid rgba(255,255,255,0.12)":"none",background:sortKey===key?"rgba(0,0,0,0.15)":hoveredCol===key?"rgba(0,0,0,0.08)":"transparent",transition:"background 0.15s"}}>
                      <span onClick={()=>handleSort(key)} style={{cursor:"pointer"}}>{label}<SI col={key}/></span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.length===0?(
                  <tr><td colSpan={6} style={{padding:48,textAlign:"center",color:"#8faab8",fontSize:14}}>No products found</td></tr>
                ):paginated.map((item,idx)=>{
                  const isSel=selected.includes(item.id);
                  const isEven=idx%2===1;
                  const isDrag=dragIdx===idx;
                  const isOver=dragOverIdx===idx&&dragIdx!==idx;
                  const isHov=hoveredRow===item.id;
                  return(
                    <tr key={item.id} draggable
                      onDragStart={e=>onDragStart(e,idx)} onDragEnter={()=>onDragEnter(idx)} onDragOver={onDragOver} onDrop={e=>onDrop(e,idx)} onDragEnd={onDragEnd}
                      onClick={()=>handleRowClick(item)}
                      onMouseEnter={()=>setHoveredRow(item.id)} onMouseLeave={()=>setHoveredRow(null)}
                      style={{background:isDrag?"#dbeafe":isOver?"#e0f0ff":activeItem?.id===item.id?"#e8f0fb":isSel?"#eafaf1":isHov?"#edf4fb":isEven?"#f7fafd":"#fff",cursor:"pointer",transition:"background 0.1s",opacity:isDrag?0.5:1,borderLeft:isOver?"3px solid #6b8cae":"3px solid transparent"}}>

                      {/* drag handle */}
                      <td style={{padding:rh.dragPad,borderBottom:"1px solid #e8f0f6",width:36}} onClick={e=>e.stopPropagation()}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{display:"block",margin:"auto"}}>
                          <circle cx="9" cy="5" r="1.5" fill="#b8ccd8"/><circle cx="15" cy="5" r="1.5" fill="#b8ccd8"/>
                          <circle cx="9" cy="12" r="1.5" fill="#b8ccd8"/><circle cx="15" cy="12" r="1.5" fill="#b8ccd8"/>
                          <circle cx="9" cy="19" r="1.5" fill="#b8ccd8"/><circle cx="15" cy="19" r="1.5" fill="#b8ccd8"/>
                        </svg>
                      </td>

                      {/* checkbox */}
                      <td style={{padding:rh.cellPad,borderBottom:"1px solid #e8f0f6",textAlign:"center"}} onClick={e=>e.stopPropagation()}>
                        <input type="checkbox" checked={isSel} onChange={()=>handleSelect(item.id)} style={{accentColor:"#6b8cae",width:14,height:14,cursor:"pointer",margin:0}}/>
                      </td>

                      {/* ID */}
                      <td style={{padding:rh.cellPad,borderBottom:"1px solid #e8f0f6"}}>
                        <div style={{fontSize:rh.fontSize,fontWeight:700,color:"#1a2e42"}}>{item.id}</div>
                        {rh.showSub && <div style={{fontSize:rh.subSize,color:"#8faab8",marginTop:1}}>SKU-{String(item.id).padStart(4,"0")}</div>}
                      </td>

                      {/* Name */}
                      <td style={{padding:rh.cellPad,borderBottom:"1px solid #e8f0f6"}}>
                        <div style={{fontSize:rh.fontSize,fontWeight:600,color:"#1a2e42"}}>{item.name}</div>
                        {rh.showSub && <div style={{fontSize:rh.subSize,color:"#8faab8",marginTop:1}}>{item.category}</div>}
                      </td>

                      {/* Price */}
                      <td style={{padding:rh.cellPad,borderBottom:"1px solid #e8f0f6"}}>
                        <div style={{fontSize:rh.fontSize,fontWeight:700,color:"#1a2e42"}}>₱{item.price.toLocaleString()}</div>
                        {rh.showSub && <div style={{fontSize:rh.subSize,color:"#8faab8",marginTop:1}}>PHP</div>}
                      </td>

                      {/* Category */}
                      <td style={{padding:rh.cellPad,borderBottom:"1px solid #e8f0f6"}}>
                        <span style={badge(item.category)}>{item.category}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* ── Pagination ── */}
          <div style={{padding:"10px 16px",borderTop:"1px solid #dce8f0",display:"flex",justifyContent:"space-between",alignItems:"center",gap:8,flexWrap:"wrap"}}>
            <div style={{fontSize:12,color:"#8faab8"}}>
              Showing <strong style={{color:"#445566"}}>{sorted.length===0?0:Math.min((page-1)*rpp+1,sorted.length)}</strong> to <strong style={{color:"#445566"}}>{Math.min(page*rpp,sorted.length)}</strong> of <strong style={{color:"#445566"}}>{sorted.length}</strong> entries
            </div>
            <div style={{display:"flex",alignItems:"center",gap:0}}>
              {/* vertical divider */}
              <div style={{width:1,height:24,background:"#dce8f0",marginRight:12}}/>
              <div style={{display:"flex",gap:4,alignItems:"center"}}>
                <button onClick={()=>setPage(1)} disabled={page===1} style={{...pBtn(false),opacity:page===1?0.35:1,fontSize:12}}>«</button>
                <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1} style={{...pBtn(false),opacity:page===1?0.35:1,fontSize:15}}>‹</button>
                {pageNums().map((p,i)=>p==="..."?<span key={"e"+i} style={{fontSize:13,color:"#8faab8",padding:"0 4px"}}>…</span>:<button key={p} onClick={()=>setPage(p)} style={pBtn(page===p)}>{p}</button>)}
                <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages} style={{...pBtn(false),opacity:page===totalPages?0.35:1,fontSize:15}}>›</button>
                <button onClick={()=>setPage(totalPages)} disabled={page===totalPages} style={{...pBtn(false),opacity:page===totalPages?0.35:1,fontSize:12}}>»</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showAdd&&<AddModal onClose={()=>setShowAdd(false)} onAdd={handleAdd} existingIds={products.map(p=>p.id)}/>}
      {showEdit&&selected.length>0&&(
        <EditModal
          items={products.filter(p=>selected.includes(p.id))}
          onClose={()=>setShowEdit(false)}
          onSave={handleSaveEdit}
        />
      )}
      {activeItem&&(
        <>
          <div onClick={()=>setActiveItem(null)} style={{position:"fixed",inset:0,background:"rgba(40,70,100,0.2)",zIndex:999}}/>
          <SidePanel item={activeItem} onClose={()=>setActiveItem(null)}/>
        </>
      )}
      {showBulkDelete&&(
        <div style={{position:"fixed",inset:0,background:"rgba(20,45,74,0.5)",zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{background:"#fff",borderRadius:14,width:380,boxShadow:"0 12px 48px rgba(0,0,0,0.22)",overflow:"hidden"}}>
            <div style={{background:"#c04a20",padding:"16px 24px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{fontSize:15,fontWeight:800,color:"#fff"}}>Delete Products</div>
              <button onClick={()=>setShowBulkDelete(false)} style={{background:"rgba(255,255,255,0.2)",border:"none",color:"#fff",borderRadius:"50%",width:28,height:28,cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
            </div>
            <div style={{padding:"24px"}}>
              <div style={{fontSize:13,color:"#5a7590",marginBottom:12}}>Are you sure you want to delete <strong style={{color:"#c04a20"}}>{selected.length} product{selected.length>1?"s":""}</strong>?</div>
              <div style={{background:"#ffeee8",borderRadius:8,padding:"12px 16px",border:"1px solid #ffccb8",marginBottom:20,maxHeight:160,overflowY:"auto"}}>
                {products.filter(p=>selected.includes(p.id)).map(p=>(
                  <div key={p.id} style={{fontSize:12,color:"#c04a20",fontWeight:600,padding:"3px 0",borderBottom:"1px solid #ffddcc"}}>
                    {p.name} <span style={{color:"#8faab8",fontWeight:400}}>· ID:{p.id} · ₱{p.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
                <button onClick={()=>setShowBulkDelete(false)} style={{padding:"9px 20px",borderRadius:8,border:"1.5px solid #dce8f0",background:"#fff",color:"#5a7590",fontSize:13,fontWeight:600,cursor:"pointer"}}>Cancel</button>
                <button onClick={handleBulkDelete} style={{padding:"9px 24px",borderRadius:8,border:"none",background:"#c04a20",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer"}}>Delete All</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}