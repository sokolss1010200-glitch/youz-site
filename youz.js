(function(){if(window.YZ_BASE)return;var v=Math.floor(Date.now()/600000),u='https://cdn.jsdelivr.net/gh/sokolss1010200-glitch/youz-site@main/youz.css?v='+v;[].slice.call(document.querySelectorAll('link[href*="youz-site@main/youz.css"]')).forEach(function(l){if(l.href.indexOf('?v=')<0)l.href=u});if(!document.querySelector('link[href*="youz.css?v="]')){var l=document.createElement('link');l.rel='stylesheet';l.href=u;document.head.appendChild(l)}})();

(function(){
/* База файлов: загрузчик задаёт window.YZ_BASE (jsDelivr по коммиту); без него — @main */
const YZB=window.YZ_BASE||'https://cdn.jsdelivr.net/gh/sokolss1010200-glitch/youz-site@main/';
/* ================= ФОТО =================
   Для Тильды: загрузите файлы из папки photos-web в Тильду,
   скопируйте ссылку https://static.tildacdn.com/... и вставьте в кавычки напротив имени файла.
   Пустые кавычки — вместо фото показывается нарисованный телефон. */
const IMG = {
  "yz-c001": "",
  "yz-c002": "",
  "yz-c003": "",
  "yz-c004": "",
  "yz-c005": "",
  "yz-c006": "",
  "yz-c007": "",
  "yz-c008": "",
  "yz-c009": "",
  "yz-c010": "",
  "yz-c011": "",
  "yz-c012": "",
  "yz-c013": "",
  "yz-c014": "",
  "yz-c015": "",
  "yz-c016": "",
  "yz-c017": "",
  "yz-c018": "",
  "yz-c019": "",
  "yz-c020": "",
  "yz-c021": "",
  "yz-c022": "",
  "yz-c023": "",
  "yz-c024": "",
  "yz-c025": "",
  "yz-c026": "",
  "yz-c027": "",
  "yz-c028": "",
  "yz-c029": "",
  "yz-c030": "",
  "yz-c031": "",
  "yz-c032": "",
  "yz-c033": "",
  "yz-c034": "",
  "yz-c035": "",
  "yz-c036": "",
  "yz-c037": "",
  "yz-c038": "",
  "yz-c039": "",
  "yz-c040": "",
  "yz-c041": "",
  "yz-c042": "",
  "yz-c043": "",
  "yz-c044": "",
  "yz-c045": "",
  "yz-c046": "",
  "yz-c047": "",
  "yz-c048": "",
  "yz-c049": "",
  "yz-c050": "",
  "yz-c051": "",
  "yz-c052": "",
  "yz-c053": "",
  "yz-c054": "",
  "yz-c055": "",
  "yz-a001": "https://static.tildacdn.com/tila6235-3734-4036-b262-323635643661/yz-a001.webp",
  "yz-a002": "https://static.tildacdn.com/tila6666-6630-4462-a137-633263373332/yz-a002.webp",
  "yz-a004": "https://static.tildacdn.com/tila3163-6430-4435-b835-373231626135/yz-a004.webp",
  "yz-a005": "https://static.tildacdn.com/tila3437-3863-4732-a432-323837316262/yz-a005.webp",
  "yz-a006": "https://static.tildacdn.com/tila6166-3932-4265-b763-323933386635/yz-a006.webp",
  "yz-a007": "https://static.tildacdn.com/tila3634-3132-4133-b865-643231316466/yz-a007.webp",
  "yz-a008": "https://static.tildacdn.com/tila3630-6632-4032-b963-393037393363/yz-a008.webp",
  "yz-a009": "https://static.tildacdn.com/tila3362-3935-4366-b564-653930663035/yz-a009.webp",
  "yz-a010": "https://static.tildacdn.com/tila3630-3461-4333-b963-306538666261/yz-a010.webp",
  "yz-a011": "https://static.tildacdn.com/tila6439-3533-4237-b732-323765613364/yz-a011.webp",
  "yz-a012": "https://static.tildacdn.com/tila3638-3138-4365-a435-383533356536/yz-a012.webp",
  "yz-a013": "https://static.tildacdn.com/tila6231-3963-4432-b661-643434616131/yz-a013.webp",
  "yz-a014": "https://static.tildacdn.com/tila6363-6666-4036-b466-613335643834/yz-a014.webp",
  "yz-a015": "https://static.tildacdn.com/tila6438-3134-4231-b231-636434313263/yz-a015.webp",
  "yz-a016": "https://static.tildacdn.com/tila3862-3038-4663-b334-346166363339/yz-a016.webp",
  "yz-a017": "https://static.tildacdn.com/tila3361-3332-4130-a434-656136343362/yz-a017.webp",
  "yz-a018": "https://static.tildacdn.com/tila6330-3432-4261-b433-633861396564/yz-a018.webp",
  "yz-a019": "https://static.tildacdn.com/tila3632-6431-4035-b061-356238373234/yz-a019.webp",
  "yz-a020": "https://static.tildacdn.com/tila3632-3939-4536-b636-373330643237/yz-a020.webp",
  "yz-a021": "https://static.tildacdn.com/tila3462-3839-4237-a232-383865393964/yz-a021.webp",
  "yz-a022": "https://static.tildacdn.com/tila3437-3038-4466-b165-393131643433/yz-a022.webp",
  "yz-a023": "https://static.tildacdn.com/tila3866-6566-4839-a331-666131326334/yz-a023.webp",
  "yz-a024": "https://static.tildacdn.com/tila3563-3462-4465-a461-386137353935/yz-a024.webp",
  "yz-a025": "https://static.tildacdn.com/tila3331-3562-4439-b731-346535373630/yz-a025.webp",
  "yz-a026": "https://static.tildacdn.com/tila6263-3232-4539-b965-313363303166/yz-a026.webp",
  "yz-a027": "https://static.tildacdn.com/tila6661-3262-4666-b935-346337643564/yz-a027.webp",
  "yz-a028": "https://static.tildacdn.com/tila3039-6466-4131-b036-303566346537/yz-a028.webp",
  "yz-a029": "https://static.tildacdn.com/tila6533-6534-4566-b861-343530373837/yz-a029.webp",
  "yz-a030": "https://static.tildacdn.com/tila3462-6364-4331-b630-396432653636/yz-a030.webp",
  "yz-a031": "https://static.tildacdn.com/tila6537-3965-4061-b864-396530646266/yz-a031.webp",
  "yz-a032": "https://static.tildacdn.com/tila6363-3735-4464-b432-353939353631/yz-a032.webp",
  "yz-a033": "https://static.tildacdn.com/tila6236-3132-4432-a566-366664633538/yz-a033.webp",
  "yz-a034": "https://static.tildacdn.com/tila3165-6564-4734-b833-313663623163/yz-a034.webp",
  "yz-a035": "https://static.tildacdn.com/tila3530-6264-4763-a461-386266633936/yz-a035.webp",
  "yz-a036": "https://static.tildacdn.com/tila6335-3739-4264-b434-653430303662/yz-a036.webp",
  "yz-a037": "https://static.tildacdn.com/tila3334-3033-4630-a538-313531353034/yz-a037.webp",
  "yz-a038": "https://static.tildacdn.com/tila3063-6265-4865-b334-303436363339/yz-a038.webp",
  "yz-a039": "https://static.tildacdn.com/tila3739-3263-4463-a166-653137613434/yz-a039.webp",
  "yz-a040": "https://static.tildacdn.com/tila6135-6331-4563-b932-346537316538/yz-a040.webp",
  "yz-a041": "https://static.tildacdn.com/tila3566-3865-4237-b232-393038393633/yz-a041.webp",
  "yz-a042": "https://static.tildacdn.com/tila3330-3933-4333-a265-363033376262/yz-a042.webp",
  "yz-a043": "https://static.tildacdn.com/tila3063-6239-4635-a237-366333366163/yz-a043.webp",
  "yz-a044": "https://static.tildacdn.com/tila3666-3430-4866-a337-373236346261/yz-a044.webp",
  "yz-a045": "https://static.tildacdn.com/tila6265-3966-4133-a432-376131373961/yz-a045.webp",
  "yz-a046": "https://static.tildacdn.com/tila6566-6361-4438-b266-646439313435/yz-a046.webp",
  "yz-a047": "https://static.tildacdn.com/tila3262-6261-4566-a361-323730663636/yz-a047.webp",
  "yz-a048": "https://static.tildacdn.com/tila6663-6162-4238-a538-336234646539/yz-a048.webp",
  "yz-a049": "https://static.tildacdn.com/tila3764-6632-4737-b935-343531336433/yz-a049.webp",
  "yz-a050": "https://static.tildacdn.com/tila3565-6533-4264-b762-643838366533/yz-a050.webp",
  "yz-a051": "https://static.tildacdn.com/tila3230-3733-4463-b061-653839656132/yz-a051.webp",
  "yz-a052": "https://static.tildacdn.com/tila6365-3564-4330-b862-353630316465/yz-a052.webp",
  "yz-a053": "https://static.tildacdn.com/tila3732-3538-4366-b562-356365323339/yz-a053.webp",
  "yz-a054": "https://static.tildacdn.com/tila3833-3664-4361-b639-376663653634/yz-a054.webp",
  "yz-a055": "https://static.tildacdn.com/tila3636-6134-4338-a234-623266343034/yz-a055.webp",
  "yz-a056": "https://static.tildacdn.com/tila6463-3662-4033-b264-613033616539/yz-a056.webp",
  "yz-a057": "https://static.tildacdn.com/tila3662-3538-4239-b933-326538336336/yz-a057.webp",
  "yz-a058": "https://static.tildacdn.com/tila6437-6432-4966-b264-396662383830/yz-a058.webp",
  "yz-a059": "https://static.tildacdn.com/tila3836-3739-4262-b038-626564616237/yz-a059.webp",
  "yz-a060": "https://static.tildacdn.com/tila3332-3531-4561-b865-306131636366/yz-a060.webp",
  "yz-a061": "https://static.tildacdn.com/tila3933-6638-4266-b031-623465613361/yz-a061.webp",
  "yz-a062": "https://static.tildacdn.com/tila3532-6633-4364-a236-653663333661/yz-a062.webp",
  "yz-a063": "https://static.tildacdn.com/tila6530-6337-4265-b831-323039336365/yz-a063.webp",
  "yz-a064": "https://static.tildacdn.com/tila3866-3031-4632-b936-653234316632/yz-a064.webp",
  "yz-a065": "https://static.tildacdn.com/tila6164-6430-4464-b063-643363356230/yz-a065.webp",
  "yz-a066": "https://static.tildacdn.com/tila6365-3339-4438-b865-356362663763/yz-a066.webp",
  "yz-a067": "https://static.tildacdn.com/tila6365-6363-4561-a639-303331343961/yz-a067.webp",
  "yz-a068": "https://static.tildacdn.com/tila6261-3439-4538-b766-313538346637/yz-a068.webp",
  "yz-a069": "https://static.tildacdn.com/tila3939-6239-4331-b563-393238326464/yz-a069.webp",
  "yz-a070": "https://static.tildacdn.com/tila3233-6332-4564-b434-353838366165/yz-a070.webp",
  "yz-a071": "https://static.tildacdn.com/tila6233-6535-4434-a137-653639363631/yz-a071.webp",
  "yz-a072": "https://static.tildacdn.com/tila6537-6562-4535-a238-643635363130/yz-a072.webp",
  "yz-a073": "https://static.tildacdn.com/tila6538-3936-4436-a661-356135323739/yz-a073.webp",
  "yz-a074": "https://static.tildacdn.com/tila6465-3238-4264-b731-356166333966/yz-a074.webp",
  "yz-a075": "https://static.tildacdn.com/tila6665-6335-4431-a430-626130343965/yz-a075.webp",
  "yz-a076": "https://static.tildacdn.com/tila3263-3062-4633-b132-346639633735/yz-a076.webp",
  "yz-a077": "https://static.tildacdn.com/tila3339-6163-4164-b063-393037653562/yz-a077.webp",
  "yz-a078": "https://static.tildacdn.com/tila3530-6364-4733-a566-636463366265/yz-a078.webp",
  "yz-a079": "https://static.tildacdn.com/tila3461-6235-4566-b861-656635343166/yz-a079.webp",
  "yz-a080": "https://static.tildacdn.com/tila3731-6361-4136-b931-653634643761/yz-a080.webp",
  "yz-a081": "https://static.tildacdn.com/tila3830-3634-4430-a338-316334653930/yz-a081.webp",
  "yz-a082": "https://static.tildacdn.com/tila3130-6632-4663-b636-383165313432/yz-a082.webp",
  "yz-a083": "https://static.tildacdn.com/tila3337-6161-4635-b965-356264663965/yz-a083.webp",
  "yz-a084": "https://static.tildacdn.com/tila3434-3661-4234-b237-613366633232/yz-a084.webp",
  "yz-a085": "https://static.tildacdn.com/tila3037-6262-4164-a664-663232363538/yz-a085.webp",
  "yz-a086": "https://static.tildacdn.com/tila3537-3734-4465-b739-303839366431/yz-a086.webp",
  "yz-a087": "https://static.tildacdn.com/tila3935-6135-4335-b739-393533616139/yz-a087.webp",
  "yz-a088": "https://static.tildacdn.com/tila3866-3932-4233-b462-653536653438/yz-a088.webp",
  "yz-a089": "https://static.tildacdn.com/tila3163-6231-4636-b064-326461343534/yz-a089.webp",
  "yz-a090": "https://static.tildacdn.com/tila6466-6465-4261-a635-393961333838/yz-a090.webp",
  "yz-a091": "https://static.tildacdn.com/tila3236-6136-4538-b539-373961376139/yz-a091.webp",
  "yz-a092": "https://static.tildacdn.com/tila3338-3961-4232-a535-363038626639/yz-a092.webp",
  "yz-a093": "https://static.tildacdn.com/tila3361-6636-4331-b437-363431643139/yz-a093.webp",
  "yz-a094": "https://static.tildacdn.com/tila3566-6636-4737-a137-646131616233/yz-a094.webp",
  "yz-a095": "https://static.tildacdn.com/tila3135-3334-4239-a262-633135363931/yz-a095.webp",
  "yz-a096": "https://static.tildacdn.com/tila3766-3337-4266-b433-386338396139/yz-a096.webp",
  "yz-duo-seq-1": YZB+"img/yz-duo-seq-1.jpg",
  "yz-duo-seq-2": YZB+"img/yz-duo-seq-2.jpg",
  "airpods-5": "https://static.tildacdn.com/tila6638-6534-4330-a531-623730366639/airpods-5.webp",
  "airpods-max-orange": "https://static.tildacdn.com/tila3661-6336-4432-a163-633462396238/airpods-max-orange.webp",
  "airpods-max-starlight": "https://static.tildacdn.com/tila3935-3330-4134-b162-393963396265/airpods-max-starligh.webp",
  "iphone-17-black": "https://static.tildacdn.com/tila3339-6432-4434-b963-393533393535/iphone-17-black.webp",
  "iphone-17-lavender": "https://static.tildacdn.com/tila6466-3030-4138-a262-336235646462/iphone-17-lavender.webp",
  "iphone-17-pro-cosmicorange": "https://static.tildacdn.com/tila3133-3863-4133-b936-353261623465/iphone-17-pro-cosmic.webp",
  "iphone-17-pro-deepblue": "https://static.tildacdn.com/tila3335-6262-4630-a532-383036326133/iphone-17-pro-deepbl.webp",
  "iphone-17-pro-silver": "https://static.tildacdn.com/tila3232-3439-4465-a631-303232633133/iphone-17-pro-silver.webp",
  "iphone-17-sage": "https://static.tildacdn.com/tila3430-3932-4361-a266-313435626130/iphone-17-sage.webp",
  "iphone-18-pro-black": "https://static.tildacdn.com/tila3664-3962-4466-a235-346563623534/iphone-18-pro-black.webp",
  "iphone-18-pro-burgundy": "https://static.tildacdn.com/tila3739-3731-4033-a132-373738613036/iphone-18-pro-burgun.webp",
  "iphone-18-pro-glacier": "https://static.tildacdn.com/tila3832-6361-4536-b165-313761333863/iphone-18-pro-glacie.webp",
  "iphone-18-pro-max-black": "https://static.tildacdn.com/tila6233-3266-4766-b139-646261666235/iphone-18-pro-max-bl.webp",
  "iphone-18-pro-max-burgundy": "https://static.tildacdn.com/tila3861-3239-4139-b433-653465393035/iphone-18-pro-max-bu.webp",
  "iphone-18-pro-max-glacier": "https://static.tildacdn.com/tila3162-3631-4633-a337-363164316230/iphone-18-pro-max-gl.webp",
  "iphone-18-pro-max-silver": "https://static.tildacdn.com/tila3138-6534-4130-a466-663865323436/iphone-18-pro-max-si.webp",
  "iphone-18-pro-silver": "https://static.tildacdn.com/tila3165-6239-4362-b839-616333396430/iphone-18-pro-silver.webp",
  "iphone-duo-night-sky-open": "https://static.tildacdn.com/tila3335-3239-4435-b266-383866376634/iphone-duo-night-sky.webp",
  "iphone-duo-star-white-open": "https://static.tildacdn.com/tila6138-3833-4264-a663-643864366263/iphone-duo-star-whit.webp",
  "watch-s12": "https://static.tildacdn.com/tila3033-6430-4933-b661-353062613138/watch-s12.webp",
};
const PHOTOS = {
  hero: { "Burgundy":IMG["iphone-18-pro-burgundy"], "Glacier":IMG["iphone-18-pro-glacier"], "Silver":IMG["iphone-18-pro-silver"], "Black":IMG["iphone-18-pro-black"] },
  duo:  { "Star White":IMG["iphone-duo-star-white-open"], "Night Sky":IMG["iphone-duo-night-sky-open"] },
  products: {
    "iPhone 18 Pro":     { "Burgundy":IMG["iphone-18-pro-burgundy"], "Glacier":IMG["iphone-18-pro-glacier"], "Silver":IMG["iphone-18-pro-silver"], "Black":IMG["iphone-18-pro-black"] },
    "iPhone 18 Pro Max": { "Glacier":IMG["iphone-18-pro-max-glacier"], "Burgundy":IMG["iphone-18-pro-max-burgundy"], "Black":IMG["iphone-18-pro-max-black"], "Silver":IMG["iphone-18-pro-max-silver"] },
    "iPhone Duo":        { "Star White":IMG["iphone-duo-star-white-open"], "Night Sky":IMG["iphone-duo-night-sky-open"] },
    "iPhone 17 Pro":     { "Cosmic Orange":IMG["iphone-17-pro-cosmicorange"], "Deep Blue":IMG["iphone-17-pro-deepblue"], "Silver":IMG["iphone-17-pro-silver"] },
    "iPhone 17":         { "Lavender":IMG["iphone-17-lavender"], "Sage":IMG["iphone-17-sage"], "Black":IMG["iphone-17-black"] },
    "AirPods 5":         { "Белый":IMG["airpods-5"] },
    "Apple Watch Series 12": { "Series 12":IMG["watch-s12"] },
    "AirPods Max":       { "Starlight":IMG["airpods-max-starlight"], "Orange":IMG["airpods-max-orange"] }
  }
};
const esc=u=>String(u).replace(/"/g,'%22');
const root=document.documentElement; root.classList.add('js');
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const rub=n=>Math.round(n).toLocaleString('ru-RU').replace(/,/g,' ')+' ₽';

/* header */
const hdr=document.getElementById('hdr'), sBtn=document.getElementById('searchBtn'), sbar=document.getElementById('sbar'), burger=document.getElementById('burger');
sBtn.addEventListener('click',()=>{sbar.hidden=!sbar.hidden;sBtn.setAttribute('aria-expanded',!sbar.hidden);if(!sbar.hidden)document.getElementById('q').focus()});
burger.addEventListener('click',()=>{const o=hdr.classList.toggle('open');burger.setAttribute('aria-expanded',o)});
hdr.querySelectorAll('.row2 a').forEach(a=>a.addEventListener('click',()=>{hdr.classList.remove('open');burger.setAttribute('aria-expanded',false)}));
const hdrSpace=document.getElementById('hdrSpace');
function fitHdr(){if(!hdr.classList.contains('compact')&&!hdr.classList.contains('open'))hdrSpace.style.height=hdr.offsetHeight+'px'}
fitHdr();addEventListener('resize',fitHdr);addEventListener('load',fitHdr);
let lastY=scrollY,lock=0;
addEventListener('scroll',()=>{const y=scrollY,now=Date.now();if(now<lock){lastY=y;return}
  const want=y>200&&y>lastY+2?true:(y<lastY-12||y<120?false:null);
  if(want!==null&&want!==hdr.classList.contains('compact')){hdr.classList.toggle('compact',want);lock=now+450}
  lastY=y},{passive:true});

/* demo note */


/* marquee duplicate */
const mq=document.getElementById('mq'); if(mq)mq.innerHTML+=mq.innerHTML;

if(document.getElementById('hero')){
/* hero colors */
const hero=document.getElementById('hero'), halo=document.getElementById('halo'), swName=document.getElementById('swName');
document.querySelectorAll('.sw').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('.sw').forEach(x=>x.setAttribute('aria-pressed',x===b));
  document.querySelectorAll('.hp').forEach(p=>p.style.setProperty('--pc',b.dataset.c));
  halo.style.setProperty('--pc',b.dataset.c);
  swName.textContent=b.dataset.n; heroPhoto(b.dataset.n);
  hero.style.background=`radial-gradient(1200px 600px at 75% 40%, ${b.dataset.g} 0%, transparent 60%), radial-gradient(900px 500px at 10% 110%, #1C2410 0%, transparent 60%), var(--night)`;
  swName.parentElement.lastChild.textContent=b.dataset.n==='Burgundy'?' · новый':'';
}));
function heroPhoto(n){const u=PHOTOS.hero[n];const fl=tilt.querySelector('.float');let im=tilt.querySelector('.hero-img');
  if(u){fl.hidden=true;if(!im){im=document.createElement('img');im.className='hero-img';tilt.prepend(im)}im.src=u;im.alt='iPhone 18 Pro, '+n;im.hidden=false}
  else{fl.hidden=false;if(im)im.hidden=true}}
/* tilt */
const stage=document.getElementById('stage'), tilt=document.getElementById('tilt');
heroPhoto('Burgundy');
if(!reduce && matchMedia('(hover:hover)').matches){
  stage.addEventListener('pointermove',e=>{const r=stage.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;tilt.style.transform=`rotateY(${x*24}deg) rotateX(${-y*16}deg)`});
  stage.addEventListener('pointerleave',()=>tilt.style.transform='');
}

}
/* ================= ДАННЫЕ ИЗ GOOGLE ТАБЛИЦЫ =================
   Вставьте ссылки «Опубликовать в интернете → CSV» для каждого листа.
   Пока ссылки пустые, сайт показывает данные ниже (DEF). */
const SHEETS = {
  products: "https://docs.google.com/spreadsheets/d/16QeQbILkJoB1NeopD7ZByXGh5jY1rRlx66aHSyiyuA0/gviz/tq?tqx=out:csv&sheet=%D0%A2%D0%BE%D0%B2%D0%B0%D1%80%D1%8B",
  promos:   "https://docs.google.com/spreadsheets/d/16QeQbILkJoB1NeopD7ZByXGh5jY1rRlx66aHSyiyuA0/gviz/tq?tqx=out:csv&sheet=%D0%90%D0%BA%D1%86%D0%B8%D0%B8",
  tradein:  "https://docs.google.com/spreadsheets/d/16QeQbILkJoB1NeopD7ZByXGh5jY1rRlx66aHSyiyuA0/gviz/tq?tqx=out:csv&sheet=Trade-in",
  settings: "https://docs.google.com/spreadsheets/d/16QeQbILkJoB1NeopD7ZByXGh5jY1rRlx66aHSyiyuA0/gviz/tq?tqx=out:csv&sheet=%D0%9D%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B9%D0%BA%D0%B8"
};
/* TRADE-IN: максимальная оценка (состояние «как новый», SIM + eSIM) по модели и памяти, ₽.
   Сверено с damprodam.ru/tradein 6 ноября 2026. Коэффициенты: TI_COND — состояние, TI_ESIM — «только eSIM».
   TI_UP — общая надбавка к их ценам (1 = как у них, 1.05 = +5%). */
const TI_PRICES=[["iPhone 17 Pro Max",[[256,75000],[512,85000],[1000,92000],[2000,98000]]],["iPhone 17 Pro",[[256,72000],[512,80000],[1000,85000]]],["iPhone Air",[[256,50000],[512,54000],[1000,59000]]],["iPhone 17",[[256,47000],[512,50000]]],["iPhone 16 Pro Max",[[256,55000],[512,57000],[1000,65000]]],["iPhone 16 Pro",[[128,48000],[256,51000],[512,56000],[1000,60000]]],["iPhone 16 Plus",[[128,38000],[256,41000],[512,42000]]],["iPhone 16",[[128,36000],[256,38000],[512,40000]]],["iPhone 16e",[[128,24000],[256,27000],[512,31000]]],["iPhone 15 Pro Max",[[256,43000],[512,47000],[1000,51000]]],["iPhone 15 Pro",[[128,35000],[256,38000],[512,41000],[1000,44000]]],["iPhone 15 Plus",[[128,27000],[256,29000],[512,32000]]],["iPhone 15",[[128,25000],[256,26000],[512,27000]]],["iPhone 14 Pro Max",[[128,30000],[256,31000],[512,32000],[1000,33000]]],["iPhone 14 Pro",[[128,27000],[256,28000],[512,29000],[1000,30000]]],["iPhone 14 Plus",[[128,20000],[256,21000],[512,22000]]],["iPhone 14",[[128,18000],[256,20000],[512,22000]]],["iPhone 13 Pro Max",[[128,24000],[256,25000],[512,26000],[1000,27000]]],["iPhone 13 Pro",[[128,20000],[256,21000],[512,22000],[1000,23000]]],["iPhone 13 mini",[[128,16000],[256,17000],[512,18000]]],["iPhone 13",[[128,15000],[256,16000],[512,18000]]],["iPhone SE (2022)",[[64,7000],[128,8000],[256,9000]]],["iPhone 12 Pro Max",[[128,15000],[256,16000],[512,17000]]],["iPhone 12 Pro",[[128,12000],[256,13000],[512,14000]]],["iPhone 12 mini",[[64,7000],[128,8000],[256,9000]]],["iPhone 12",[[64,10000],[128,11000],[256,12000]]],["iPhone 11 Pro Max",[[64,10000],[256,11000],[512,12000]]],["iPhone 11 Pro",[[64,9000],[256,10000],[512,11000]]],["iPhone 11",[[64,5000],[128,6000],[256,7000]]]];
const TI_COND={best:1,well:.94,normal:.86};
const TI_ESIM=m=>/^iPhone (17|Air)/.test(m)?.9:.78;
let TI_UP=1.05;  // +5% к ценам damprodam (можно поменять в таблице: «Настройки» → «Trade-in, %»)
const TI_CAP=99000;  // потолок оценки (на сайте «до −99 000 ₽»)
let MONTHS_DEF = 36;       // срок рассрочки для «от … ₽/мес»; можно поменять в таблице: лист «Настройки», строка «Рассрочка, мес»

function parseCSV(t){const rows=[];let r=[],f='',q=false;t=t.replace(/^﻿/,'');
  for(let i=0;i<t.length;i++){const c=t[i];
    if(q){if(c=='"'){if(t[i+1]=='"'){f+='"';i++}else q=false}else f+=c}
    else if(c=='"')q=true;else if(c==','){r.push(f);f=''}else if(c=='\n'||c=='\r'){if(c=='\r'&&t[i+1]=='\n')i++;r.push(f);rows.push(r);r=[];f=''}else f+=c}
  if(f!==''||r.length){r.push(f);rows.push(r)}
  const h=(rows.shift()||[]).map(x=>x.trim());
  return rows.filter(x=>x.some(v=>v.trim())).map(x=>Object.fromEntries(h.map((k,i)=>[k,(x[i]||'').trim()])))}
const DEF_CSV = "Категория,Группа,Модель,Память,Опция,Цвет,Код цвета,Цена,Старая цена,Наличие,Бейдж,Фото,Главная,Состояние,Цена по карте,Видео\niPhone,iPhone,iPhone 18 Pro,256 ГБ,eSIM,Burgundy,#5E1A28,113990,,да,Новинка,yz-a064,да,,120990,\niPhone,iPhone,iPhone 18 Pro,256 ГБ,eSIM,Silver,#DADBDD,113990,,да,Новинка,yz-a066,да,,120990,\niPhone,iPhone,iPhone 18 Pro,256 ГБ,eSIM,Black,#1F2023,114990,,да,Новинка,yz-a063,да,,121990,\niPhone,iPhone,iPhone 18 Pro,256 ГБ,eSIM,Glacier,#C9D8E3,117990,,да,Новинка,yz-a065,да,,125990,\niPhone,iPhone,iPhone 18 Pro,256 ГБ,SIM + eSIM,Glacier,#C9D8E3,122990,,да,Новинка,yz-a065,да,,130990,\niPhone,iPhone,iPhone 18 Pro,256 ГБ,SIM + eSIM,Black,#1F2023,124990,,да,Новинка,yz-a063,да,,132990,\niPhone,iPhone,iPhone 18 Pro,256 ГБ,SIM + eSIM,Silver,#DADBDD,124990,,да,Новинка,yz-a066,да,,132990,\niPhone,iPhone,iPhone 18 Pro,256 ГБ,SIM + eSIM,Burgundy,#5E1A28,125990,,да,Новинка,yz-a064,да,,133990,\niPhone,iPhone,iPhone 18 Pro,512 ГБ,eSIM,Black,#1F2023,133990,,да,Новинка,yz-a063,да,,142990,\niPhone,iPhone,iPhone 18 Pro,512 ГБ,eSIM,Burgundy,#5E1A28,134990,,да,Новинка,yz-a064,да,,143990,\niPhone,iPhone,iPhone 18 Pro,512 ГБ,eSIM,Silver,#DADBDD,137990,,да,Новинка,yz-a066,да,,146990,\niPhone,iPhone,iPhone 18 Pro,512 ГБ,eSIM,Glacier,#C9D8E3,140990,,да,Новинка,yz-a065,да,,149990,\niPhone,iPhone,iPhone 18 Pro,512 ГБ,SIM + eSIM,Black,#1F2023,146990,,да,Новинка,yz-a063,да,,155990,\niPhone,iPhone,iPhone 18 Pro,512 ГБ,SIM + eSIM,Glacier,#C9D8E3,149990,,да,Новинка,yz-a065,да,,158990,\niPhone,iPhone,iPhone 18 Pro,512 ГБ,SIM + eSIM,Silver,#DADBDD,150990,,да,Новинка,yz-a066,да,,160990,\niPhone,iPhone,iPhone 18 Pro,512 ГБ,SIM + eSIM,Burgundy,#5E1A28,151990,,да,Новинка,yz-a064,да,,161990,\niPhone,iPhone,iPhone 18 Pro,1 ТБ,eSIM,Black,#1F2023,161990,,да,Новинка,yz-a063,да,,171990,\niPhone,iPhone,iPhone 18 Pro,1 ТБ,eSIM,Glacier,#C9D8E3,161990,,да,Новинка,yz-a065,да,,171990,\niPhone,iPhone,iPhone 18 Pro,1 ТБ,eSIM,Silver,#DADBDD,165990,,да,Новинка,yz-a066,да,,175990,\niPhone,iPhone,iPhone 18 Pro,1 ТБ,eSIM,Burgundy,#5E1A28,187990,,да,Новинка,yz-a064,да,,199990,\niPhone,iPhone,iPhone 18 Pro,1 ТБ,SIM + eSIM,Burgundy,#5E1A28,189990,,да,Новинка,yz-a064,да,,201990,\niPhone,iPhone,iPhone 18 Pro,1 ТБ,SIM + eSIM,Black,#1F2023,190990,,да,Новинка,yz-a063,да,,202990,\niPhone,iPhone,iPhone 18 Pro,1 ТБ,SIM + eSIM,Glacier,#C9D8E3,190990,,да,Новинка,yz-a065,да,,202990,\niPhone,iPhone,iPhone 18 Pro,1 ТБ,SIM + eSIM,Silver,#DADBDD,191990,,да,Новинка,yz-a066,да,,203990,\niPhone,iPhone,iPhone 18 Pro,2 ТБ,eSIM,Burgundy,#5E1A28,230990,,да,Новинка,yz-a064,да,,244990,\niPhone,iPhone,iPhone 18 Pro Max,256 ГБ,SIM + eSIM,Silver,#DADBDD,128990,,да,Новинка,yz-a070,да,,136990,\niPhone,iPhone,iPhone 18 Pro Max,256 ГБ,eSIM,Silver,#DADBDD,128990,,да,Новинка,yz-a070,да,,136990,\niPhone,iPhone,iPhone 18 Pro Max,256 ГБ,SIM + eSIM,Black,#1F2023,130990,,да,Новинка,yz-a067,да,,138990,\niPhone,iPhone,iPhone 18 Pro Max,256 ГБ,eSIM,Black,#1F2023,130990,,да,Новинка,yz-a067,да,,138990,\niPhone,iPhone,iPhone 18 Pro Max,256 ГБ,eSIM,Burgundy,#5E1A28,130990,,да,Новинка,yz-a068,да,,138990,\niPhone,iPhone,iPhone 18 Pro Max,256 ГБ,eSIM,Glacier,#C9D8E3,131990,,да,Новинка,yz-a069,да,,139990,\niPhone,iPhone,iPhone 18 Pro Max,256 ГБ,SIM + eSIM,Glacier,#C9D8E3,136990,,да,Новинка,yz-a069,да,,145990,\niPhone,iPhone,iPhone 18 Pro Max,256 ГБ,SIM + eSIM,Burgundy,#5E1A28,140990,,да,Новинка,yz-a068,да,,149990,\niPhone,iPhone,iPhone 18 Pro Max,512 ГБ,eSIM,Burgundy,#5E1A28,146990,,да,Новинка,yz-a068,да,,155990,\niPhone,iPhone,iPhone 18 Pro Max,512 ГБ,eSIM,Glacier,#C9D8E3,148990,,да,Новинка,yz-a069,да,,157990,\niPhone,iPhone,iPhone 18 Pro Max,512 ГБ,eSIM,Black,#1F2023,149990,,да,Новинка,yz-a067,да,,158990,\niPhone,iPhone,iPhone 18 Pro Max,512 ГБ,eSIM,Silver,#DADBDD,149990,,да,Новинка,yz-a070,да,,158990,\niPhone,iPhone,iPhone 18 Pro Max,512 ГБ,SIM + eSIM,Black,#1F2023,152990,,да,Новинка,yz-a067,да,,162990,\niPhone,iPhone,iPhone 18 Pro Max,512 ГБ,SIM + eSIM,Silver,#DADBDD,153990,,да,Новинка,yz-a070,да,,163990,\niPhone,iPhone,iPhone 18 Pro Max,512 ГБ,SIM + eSIM,Glacier,#C9D8E3,155990,,да,Новинка,yz-a069,да,,165990,\niPhone,iPhone,iPhone 18 Pro Max,512 ГБ,SIM + eSIM,Burgundy,#5E1A28,160990,,да,Новинка,yz-a068,да,,170990,\niPhone,iPhone,iPhone 18 Pro Max,1 ТБ,eSIM,Black,#1F2023,187990,,да,Новинка,yz-a067,да,,199990,\niPhone,iPhone,iPhone 18 Pro Max,1 ТБ,eSIM,Burgundy,#5E1A28,189990,,да,Новинка,yz-a068,да,,201990,\niPhone,iPhone,iPhone 18 Pro Max,1 ТБ,eSIM,Glacier,#C9D8E3,191990,,да,Новинка,yz-a069,да,,203990,\niPhone,iPhone,iPhone 18 Pro Max,1 ТБ,eSIM,Silver,#DADBDD,192990,,да,Новинка,yz-a070,да,,204990,\niPhone,iPhone,iPhone 18 Pro Max,1 ТБ,SIM + eSIM,Black,#1F2023,199990,,да,Новинка,yz-a067,да,,211990,\niPhone,iPhone,iPhone 18 Pro Max,1 ТБ,SIM + eSIM,Glacier,#C9D8E3,202990,,да,Новинка,yz-a069,да,,215990,\niPhone,iPhone,iPhone 18 Pro Max,1 ТБ,SIM + eSIM,Silver,#DADBDD,207990,,да,Новинка,yz-a070,да,,220990,\niPhone,iPhone,iPhone 18 Pro Max,1 ТБ,SIM + eSIM,Burgundy,#5E1A28,210990,,да,Новинка,yz-a068,да,,223990,\niPhone,iPhone,iPhone 18 Pro Max,2 ТБ,eSIM,Black,#1F2023,229990,,да,Новинка,yz-a067,да,,243990,\niPhone,iPhone,iPhone 18 Pro Max,2 ТБ,eSIM,Glacier,#C9D8E3,231990,,да,Новинка,yz-a069,да,,245990,\niPhone,iPhone,iPhone 18 Pro Max,2 ТБ,SIM + eSIM,Silver,#DADBDD,250990,,да,Новинка,yz-a070,да,,266990,\niPhone,iPhone,iPhone 17,256 ГБ,eSIM,Blue,#6E8DB5,75990,,да,,yz-a051,да,,80990,\niPhone,iPhone,iPhone 17,256 ГБ,eSIM,Black,#1F2023,76990,,да,,yz-a049,да,,81990,\niPhone,iPhone,iPhone 17,256 ГБ,eSIM,Lavender,#B9A6D6,76990,,да,,yz-a050,да,,81990,\niPhone,iPhone,iPhone 17,256 ГБ,eSIM,Sage,#A8C5A0,76990,,да,,yz-a052,да,,81990,\niPhone,iPhone,iPhone 17,256 ГБ,SIM + eSIM,Black,#1F2023,77990,,да,,yz-a049,да,,82990,\niPhone,iPhone,iPhone 17,256 ГБ,SIM + eSIM,Blue,#6E8DB5,77990,,да,,yz-a051,да,,82990,\niPhone,iPhone,iPhone 17,256 ГБ,SIM + eSIM,Sage,#A8C5A0,77990,,да,,yz-a052,да,,82990,\niPhone,iPhone,iPhone 17,256 ГБ,SIM + eSIM,White,#F3F3F0,77990,,да,,yz-a053,да,,82990,\niPhone,iPhone,iPhone 17,256 ГБ,SIM + eSIM,Lavender,#B9A6D6,78990,,да,,yz-a050,да,,83990,\niPhone,iPhone,iPhone 17,512 ГБ,eSIM,Sage,#A8C5A0,81990,,да,,yz-a052,да,,86990,\niPhone,iPhone,iPhone 17,512 ГБ,eSIM,Black,#1F2023,90990,,да,,yz-a049,да,,96990,\niPhone,iPhone,iPhone 17,512 ГБ,eSIM,White,#F3F3F0,90990,,да,,yz-a053,да,,96990,\niPhone,iPhone,iPhone 17,512 ГБ,SIM + eSIM,Black,#1F2023,92990,,да,,yz-a049,да,,98990,\niPhone,iPhone,iPhone 17,512 ГБ,SIM + eSIM,Blue,#6E8DB5,92990,,да,,yz-a051,да,,98990,\niPhone,iPhone,iPhone 17,512 ГБ,SIM + eSIM,White,#F3F3F0,93990,,да,,yz-a053,да,,99990,\niPhone,iPhone,iPhone 17,512 ГБ,eSIM,Lavender,#B9A6D6,96990,,да,,yz-a050,да,,102990,\niPhone,iPhone,iPhone 17,512 ГБ,SIM + eSIM,Sage,#A8C5A0,97990,,да,,yz-a052,да,,103990,\niPhone,iPhone,iPhone 17,512 ГБ,SIM + eSIM,Lavender,#B9A6D6,99990,,да,,yz-a050,да,,105990,\niPhone,iPhone,iPhone 17,512 ГБ,eSIM,Blue,#6E8DB5,106990,,да,,yz-a051,да,,113990,\niPhone,iPhone,iPhone 17 Pro,256 ГБ,eSIM,Orange,#E8762C,95990,98990,да,Выгодно,yz-a054,да,,101990,\niPhone,iPhone,iPhone 17 Pro,256 ГБ,SIM + eSIM,Orange,#E8762C,97990,100990,да,Выгодно,yz-a054,да,,103990,\niPhone,iPhone,iPhone 17 Pro,256 ГБ,eSIM,Silver,#DADBDD,101990,104990,да,Выгодно,yz-a056,да,,108990,\niPhone,iPhone,iPhone 17 Pro,256 ГБ,SIM + eSIM,Blue,#6E8DB5,103990,106990,да,Выгодно,yz-a055,да,,110990,\niPhone,iPhone,iPhone 17 Pro,256 ГБ,SIM + eSIM,Silver,#DADBDD,106990,109990,да,Выгодно,yz-a056,да,,113990,\niPhone,iPhone,iPhone 17 Pro,512 ГБ,eSIM,Silver,#DADBDD,114990,117990,да,Выгодно,yz-a056,да,,121990,\niPhone,iPhone,iPhone 17 Pro,512 ГБ,eSIM,Blue,#6E8DB5,115990,118990,да,Выгодно,yz-a055,да,,122990,\niPhone,iPhone,iPhone 17 Pro,512 ГБ,eSIM,Orange,#E8762C,118990,121990,да,Выгодно,yz-a054,да,,126990,\niPhone,iPhone,iPhone 17 Pro,512 ГБ,SIM + eSIM,Orange,#E8762C,120990,123990,да,Выгодно,yz-a054,да,,128990,\niPhone,iPhone,iPhone 17 Pro,1 ТБ,eSIM,Orange,#E8762C,127990,130990,да,Выгодно,yz-a054,да,,135990,\niPhone,iPhone,iPhone 17 Pro,512 ГБ,SIM + eSIM,Blue,#6E8DB5,127990,130990,да,Выгодно,yz-a055,да,,135990,\niPhone,iPhone,iPhone 17 Pro,1 ТБ,eSIM,Blue,#6E8DB5,130990,133990,да,Выгодно,yz-a055,да,,138990,\niPhone,iPhone,iPhone 17 Pro,1 ТБ,SIM + eSIM,Orange,#E8762C,137990,140990,да,Выгодно,yz-a054,да,,146990,\niPhone,iPhone,iPhone 17 Pro,512 ГБ,SIM + eSIM,Silver,#DADBDD,142990,145990,да,Выгодно,yz-a056,да,,151990,\nMac,MacBook Air,MacBook Air 13 M5,16 ГБ / 512 ГБ,,Starlight,#EDE6DA,110990,,да,,yz-a082,да,,117990,\nMac,MacBook Air,MacBook Air 13 M5,16 ГБ / 512 ГБ,,Sky Blue,#B6CDE3,110990,,да,,yz-a081,да,,117990,\nMac,MacBook Air,MacBook Air 13 M5,16 ГБ / 512 ГБ,,Midnight,#232A35,111990,,да,,yz-a079,да,,118990,\nMac,MacBook Air,MacBook Air 13 M5,16 ГБ / 1 ТБ,,Sky Blue,#B6CDE3,131990,,да,,yz-a081,да,,139990,\nMac,MacBook Air,MacBook Air 13 M5,16 ГБ / 1 ТБ,,Midnight,#232A35,132990,,да,,yz-a079,да,,140990,\nMac,MacBook Air,MacBook Air 13 M5,16 ГБ / 1 ТБ,,Starlight,#EDE6DA,134990,,да,,yz-a082,да,,143990,\nMac,MacBook Air,MacBook Air 13 M5,16 ГБ / 1 ТБ,,Silver,#DADBDD,136990,,да,,yz-a080,да,,145990,\nMac,MacBook Air,MacBook Air 13 M5,24 ГБ / 1 ТБ,,Sky Blue,#B6CDE3,152990,,да,,yz-a081,да,,162990,\nMac,MacBook Air,MacBook Air 13 M5,24 ГБ / 1 ТБ,,Starlight,#EDE6DA,156990,,да,,yz-a082,да,,166990,\nMac,MacBook Air,MacBook Air 13 M5,32 ГБ / 512 ГБ,,Starlight,#EDE6DA,167990,,да,,yz-a082,да,,178990,\nMac,MacBook Air,MacBook Air 13 M5,32 ГБ / 512 ГБ,,Midnight,#232A35,167990,,да,,yz-a079,да,,178990,\nMac,MacBook Air,MacBook Air 13 M5,32 ГБ / 512 ГБ,,Sky Blue,#B6CDE3,167990,,да,,yz-a081,да,,178990,\nApple Watch,Apple Watch Series,Apple Watch Series 11,42 мм,M/L,Jet Black,#0B0B0C,30990,,да,,yz-a091,да,,32990,\nApple Watch,Apple Watch Series,Apple Watch Series 11,42 мм,S/M,Jet Black,#0B0B0C,30990,,да,,yz-a091,да,,32990,\nApple Watch,Apple Watch Series,Apple Watch Series 11,42 мм,M/L,Space Gray,#5E5E62,30990,,да,,yz-a091,да,,32990,\nApple Watch,Apple Watch Series,Apple Watch Series 11,42 мм,S/M,Space Gray,#5E5E62,30990,,да,,yz-a091,да,,32990,\nApple Watch,Apple Watch Series,Apple Watch Series 11,42 мм,M/L,Rose Gold,#E3B9A9,31990,,да,,yz-a091,да,,33990,\nApple Watch,Apple Watch Series,Apple Watch Series 11,42 мм,S/M,Rose Gold,#E3B9A9,31990,,да,,yz-a091,да,,33990,\nApple Watch,Apple Watch Series,Apple Watch Series 11,42 мм,S/M,Silver,#DADBDD,31990,,да,,yz-a091,да,,33990,\nApple Watch,Apple Watch Series,Apple Watch Series 11,42 мм,M/L,Silver,#DADBDD,32990,,да,,yz-a091,да,,34990,\nApple Watch,Apple Watch Series,Apple Watch Series 11,46 мм,M/L,Jet Black,#0B0B0C,33990,,да,,yz-a091,да,,36990,\nApple Watch,Apple Watch Series,Apple Watch Series 11,46 мм,S/M,Jet Black,#0B0B0C,33990,,да,,yz-a091,да,,36990,\nApple Watch,Apple Watch Series,Apple Watch Series 11,46 мм,M/L,Rose Gold,#E3B9A9,33990,,да,,yz-a091,да,,36990,\nApple Watch,Apple Watch Series,Apple Watch Series 11,46 мм,S/M,Rose Gold,#E3B9A9,33990,,да,,yz-a091,да,,36990,\nApple Watch,Apple Watch Series,Apple Watch Series 11,46 мм,S/M,Silver,#DADBDD,33990,,да,,yz-a091,да,,36990,\nApple Watch,Apple Watch Series,Apple Watch Series 11,46 мм,M/L,Space Gray,#5E5E62,33990,,да,,yz-a091,да,,36990,\nApple Watch,Apple Watch Series,Apple Watch Series 11,46 мм,S/M,Space Gray,#5E5E62,33990,,да,,yz-a091,да,,36990,\nAirPods,AirPods,AirPods Pro 3,,,,#C9CBC3,18990,,да,,yz-a009,да,,20990,\nSamsung,Galaxy S,Samsung Galaxy S26 Ultra,12/256 ГБ,,Black,#1F2023,82990,,да,,yz-c002,да,,87990,\nSamsung,Galaxy S,Samsung Galaxy S26 Ultra,12/256 ГБ,,Cobalt Violet,#8D74C4,82990,,да,,yz-c002,да,,87990,\nSamsung,Galaxy S,Samsung Galaxy S26 Ultra,12/256 ГБ,,Sky Blue,#B6CDE3,82990,,да,,yz-c002,да,,87990,\nSamsung,Galaxy S,Samsung Galaxy S26 Ultra,12/256 ГБ,,White,#F3F3F0,82990,,да,,yz-c002,да,,87990,\nSamsung,Galaxy S,Samsung Galaxy S26 Ultra,12/512 ГБ,,Sky Blue,#B6CDE3,97990,,да,,yz-c002,да,,103990,\nSamsung,Galaxy S,Samsung Galaxy S26 Ultra,12/512 ГБ,,Black,#1F2023,98990,,да,,yz-c002,да,,104990,\nSamsung,Galaxy S,Samsung Galaxy S26 Ultra,12/512 ГБ,,Cobalt Violet,#8D74C4,99990,,да,,yz-c002,да,,105990,\nSamsung,Galaxy S,Samsung Galaxy S26 Ultra,12/512 ГБ,,White,#F3F3F0,99990,,да,,yz-c002,да,,105990,\nSamsung,Galaxy S,Samsung Galaxy S26 Ultra,12/512 ГБ,,Silver Shadow,#DADBDD,107990,,да,,yz-c002,да,,114990,\nSamsung,Galaxy S,Samsung Galaxy S26 Ultra,16/1 ТБ,,Sky Blue,#B6CDE3,121990,,да,,yz-c002,да,,129990,\nSamsung,Galaxy S,Samsung Galaxy S26 Ultra,16/1 ТБ,,White,#F3F3F0,122990,,да,,yz-c002,да,,130990,\nSamsung,Galaxy S,Samsung Galaxy S26 Ultra,16/1 ТБ,,Cobalt Violet,#8D74C4,123990,,да,,yz-c002,да,,131990,\nSamsung,Galaxy S,Samsung Galaxy S26 Ultra,16/1 ТБ,,Black,#1F2023,126990,,да,,yz-c002,да,,134990,\n";
const DEF = {products: parseCSV(DEF_CSV), promos: [{"Активна": "да", "Заголовок": "iPhone 17 Pro дешевле на 5 000 ₽", "Текст": "Скидка на 256 ГБ во всех цветах. Количество ограничено.", "Кнопка": "Забрать со скидкой", "Действие": "заявка", "До": "2026-11-15", "Стиль": "лайм"}, {"Активна": "да", "Заголовок": "Trade-in +5 000 ₽ к оценке", "Текст": "Сдайте старый iPhone и получите дополнительные 5 000 ₽ при покупке iPhone 18 Pro.", "Кнопка": "Рассчитать", "Действие": "#tradein", "До": "2026-11-30", "Стиль": "тёмный"}, {"Активна": "да", "Заголовок": "Подарки на 5 000 ₽", "Текст": "Чехол, стекло с поклейкой и перенос данных к каждому iPhone.", "Кнопка": "Выбрать iPhone", "Действие": "#hits", "До": "", "Стиль": "светлый"}], tradein: [{"Модель": "iPhone 17 Pro Max", "Оценка до": "52000"}, {"Модель": "iPhone 17 Pro", "Оценка до": "46000"}, {"Модель": "iPhone 17", "Оценка до": "34000"}, {"Модель": "iPhone 16 Pro Max", "Оценка до": "40000"}, {"Модель": "iPhone 16 Pro", "Оценка до": "35000"}, {"Модель": "iPhone 16", "Оценка до": "26000"}, {"Модель": "iPhone 15 Pro Max", "Оценка до": "27000"}, {"Модель": "iPhone 15 Pro", "Оценка до": "23000"}, {"Модель": "iPhone 15", "Оценка до": "18000"}, {"Модель": "iPhone 14", "Оценка до": "13000"}, {"Модель": "iPhone 13", "Оценка до": "9000"}]};
const num=v=>+String(v||'').replace(/[^\d]/g,'')||0;
const low=v=>String(v||'').trim().toLowerCase();
const htm=v=>String(v||'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function cacheGet(k){try{return JSON.parse(localStorage.getItem('yz_'+k)||'null')}catch(e){return null}}
function cacheSet(k,v){try{localStorage.setItem('yz_'+k,JSON.stringify(v))}catch(e){}}
const DATA={products:cacheGet('products')||DEF.products,promos:cacheGet('promos')||DEF.promos,tradein:cacheGet('tradein')||DEF.tradein};
async function loadSheets(){
  await Promise.all(Object.keys(SHEETS).map(async k=>{const u=SHEETS[k];if(!u)return;
    try{const r=await fetch(u+(u.includes('?')?'&':'?')+'_='+Math.floor(Date.now()/120000),{cache:'no-store'});if(!r.ok)return;
      const rows=parseCSV(await r.text());if(rows.length){DATA[k]=rows;cacheSet(k,rows)}}catch(e){}}));
  applyData();
}

/* фото с GitHub: замена старых и фото для моделей без фото в таблице */
const PHOTO_FIX={"yz-a026": YZB+"img/yz-b001.webp", "yz-a027": YZB+"img/yz-b002.webp", "yz-a028": YZB+"img/yz-b003.webp", "yz-a029": YZB+"img/yz-b004.webp", "yz-a030": YZB+"img/yz-b005.webp", "yz-a031": YZB+"img/yz-b006.webp", "yz-a032": YZB+"img/yz-b007.webp", "yz-a033": YZB+"img/yz-b008.webp", "yz-a034": YZB+"img/yz-b009.webp", "yz-a035": YZB+"img/yz-b010.webp", "yz-a036": YZB+"img/yz-b011.webp", "yz-a037": YZB+"img/yz-b012.webp", "yz-a040": YZB+"img/yz-b013.webp", "yz-a041": YZB+"img/yz-b014.webp", "yz-a042": YZB+"img/yz-b015.webp", "yz-a043": YZB+"img/yz-b016.webp", "yz-a044": YZB+"img/yz-b017.webp", "yz-a045": YZB+"img/yz-b018.webp", "yz-a054": YZB+"img/yz-b019.webp", "yz-a055": YZB+"img/yz-b020.webp", "yz-a056": YZB+"img/yz-b021.webp", "yz-a057": YZB+"img/yz-b022.webp", "yz-a058": YZB+"img/yz-b023.webp", "yz-a059": YZB+"img/yz-b024.webp", "yz-a087": YZB+"img/yz-b025.webp", "yz-a088": YZB+"img/yz-b026.webp", "yz-a090": YZB+"img/yz-b027.webp", "yz-a091": YZB+"img/yz-b028.webp", "yz-a092": YZB+"img/yz-b029.webp", "yz-a093": YZB+"img/yz-b030.webp", "yz-a094": YZB+"img/yz-b031.webp", "yz-a095": YZB+"img/yz-b032.webp", "yz-a096": YZB+"img/yz-b033.webp"};
const PHOTO_EXTRA={"Samsung Galaxy S26|": YZB+"img/yz-c001.webp", "Samsung Galaxy S26 FE|": YZB+"img/yz-c001.webp", "Samsung Galaxy S26 Ultra|": YZB+"img/yz-c002.webp", "Samsung Galaxy S26+|": YZB+"img/yz-c001.webp", "Samsung Galaxy S25|": YZB+"img/yz-c003.webp", "Samsung Galaxy S25 FE|": YZB+"img/yz-c003.webp", "Samsung Galaxy S25 Ultra|": YZB+"img/yz-c004.webp", "Samsung Galaxy Z Flip 8|": YZB+"img/yz-c005.webp", "Samsung Galaxy Z Fold 8|": YZB+"img/yz-c006.webp", "Samsung Galaxy Z Fold 8 Ultra|": YZB+"img/yz-c006.webp", "Samsung Galaxy Z Flip 7 FE|": YZB+"img/yz-c005.webp", "Samsung Galaxy Z Fold 7|": YZB+"img/yz-c006.webp", "Google Pixel 11 Pro|": YZB+"img/yz-c007.webp", "Google Pixel 11 Pro Fold|": YZB+"img/yz-c008.webp", "Google Pixel 11 Pro XL|": YZB+"img/yz-c007.webp", "Google Pixel 10 Pro|": YZB+"img/yz-c007.webp", "Honor 600|": YZB+"img/yz-c009.webp", "Honor 600 Lite|": YZB+"img/yz-c009.webp", "Honor 600 Pro|": YZB+"img/yz-c009.webp", "Honor 400|": YZB+"img/yz-c010.webp", "Honor X9d|": YZB+"img/yz-c011.webp", "Honor X9e Pro|": YZB+"img/yz-c011.webp", "Honor Magic 8 Pro|": YZB+"img/yz-c012.webp", "Honor X8d|": YZB+"img/yz-c013.webp", "Honor X7e|": YZB+"img/yz-c013.webp", "Honor X6e|": YZB+"img/yz-c013.webp", "Honor Turbo|": YZB+"img/yz-c013.webp", "Huawei Pura 90S Pro|": YZB+"img/yz-c014.webp", "Huawei Pura 90S Pro Max|": YZB+"img/yz-c014.webp", "Huawei Mate 80 Pro|": YZB+"img/yz-c015.webp", "Huawei Pura 80|": YZB+"img/yz-c014.webp", "Huawei Pura 80 Ultra|": YZB+"img/yz-c014.webp", "Huawei Nova 16s|": YZB+"img/yz-c016.webp", "Huawei Nova 16s Pro|": YZB+"img/yz-c016.webp", "Huawei Nova 16z|": YZB+"img/yz-c016.webp", "Huawei Nova 15|": YZB+"img/yz-c016.webp", "Huawei Nova 15 Max|": YZB+"img/yz-c016.webp", "Huawei Nova 15 Pro|": YZB+"img/yz-c016.webp", "Huawei Nova 14i|": YZB+"img/yz-c016.webp", "Redmi 17|": YZB+"img/yz-c017.webp", "Redmi Note 17|": YZB+"img/yz-c018.webp", "Redmi Note 17 Pro|": YZB+"img/yz-c018.webp", "Redmi Note 17 Pro Max|": YZB+"img/yz-c018.webp", "Xiaomi 17|": YZB+"img/yz-c019.webp", "Xiaomi 17 Ultra|": YZB+"img/yz-c019.webp", "Xiaomi 17T|": YZB+"img/yz-c019.webp", "Xiaomi 17T Pro|": YZB+"img/yz-c019.webp", "Redmi Note 15|": YZB+"img/yz-c018.webp", "Redmi Note 15 Pro|": YZB+"img/yz-c018.webp", "Redmi Note 15 Pro+|": YZB+"img/yz-c018.webp", "Xiaomi 15T Pro|": YZB+"img/yz-c019.webp", "POCO F9 Pro|": YZB+"img/yz-c020.webp", "POCO F9 Ultra|": YZB+"img/yz-c020.webp", "POCO F8 Pro|": YZB+"img/yz-c020.webp", "POCO F8 Ultra|": YZB+"img/yz-c020.webp", "POCO X8|": YZB+"img/yz-c020.webp", "POCO X8 Pro|": YZB+"img/yz-c020.webp", "POCO X8 Pro Max|": YZB+"img/yz-c020.webp", "POCO X8s|": YZB+"img/yz-c020.webp", "POCO F7 Pro|": YZB+"img/yz-c020.webp", "POCO X7|": YZB+"img/yz-c020.webp", "Redmi A7 Pro|": YZB+"img/yz-c017.webp", "POCO X6|": YZB+"img/yz-c020.webp", "Xiaomi MIX Flip|": YZB+"img/yz-c021.webp", "Marshall Major V Black|": YZB+"img/yz-c022.webp", "Marshall Major V Blue|": YZB+"img/yz-c022.webp", "Marshall Major V Brown|": YZB+"img/yz-c022.webp", "Marshall Major V Cream|": YZB+"img/yz-c022.webp", "Coros Pace 4 Black Silicone|": YZB+"img/yz-c023.webp", "Coros Pace 4 White Silicone|": YZB+"img/yz-c023.webp", "Ray-Ban Meta Blayzer Optics Gen 2|": YZB+"img/yz-c024.webp", "Ray-Ban Meta Headliner Gen 2|": YZB+"img/yz-c024.webp", "Ray-Ban Meta Scriber Optics Gen 2|": YZB+"img/yz-c024.webp", "Ray-Ban Meta Skyler Gen 2|": YZB+"img/yz-c024.webp", "Ray-Ban Meta Wayfarer Gen 2|": YZB+"img/yz-c024.webp", "DJI Osmo Mobile 8|": YZB+"img/yz-c025.webp", "DJI Osmo Mobile 8 Tracker|": YZB+"img/yz-c025.webp", "DJI Osmo Mobile 8P|": YZB+"img/yz-c025.webp", "DJI Osmo Mobile 8P Advanced Tracking|": YZB+"img/yz-c025.webp", "DJI Osmo Mobile 8P Creator|": YZB+"img/yz-c025.webp", "DJI Osmo Mobile 7P|": YZB+"img/yz-c025.webp", "DJI Osmo Action 6 Adventure|": YZB+"img/yz-c026.webp", "DJI Osmo Action 6 Standard|": YZB+"img/yz-c026.webp", "DJI Osmo Mobile 6|": YZB+"img/yz-c027.webp", "DJI Osmo Action 5 Pro Adventure|": YZB+"img/yz-c028.webp", "DJI Osmo Action 5 Pro Standard|": YZB+"img/yz-c028.webp", "DJI Osmo Action 4 Adventure|": YZB+"img/yz-c029.webp", "DJI Osmo Action 4 Pro Adventure|": YZB+"img/yz-c029.webp", "DJI Osmo Pocket 4|": YZB+"img/yz-c030.webp", "DJI Osmo Pocket 4 Creator|": YZB+"img/yz-c030.webp", "DJI Osmo Pocket 4P Standard|": YZB+"img/yz-c030.webp", "DJI Osmo Pocket 4P Vlog|": YZB+"img/yz-c030.webp", "DJI RS 4 Pro|": YZB+"img/yz-c031.webp", "DJI Osmo Pocket 3 Creator|": YZB+"img/yz-c032.webp", "DJI Osmo Pocket 3 Standard|": YZB+"img/yz-c032.webp", "GoPro Mission 1|": YZB+"img/yz-c033.webp", "GoPro Mission 1 Pro Grip Edition|": YZB+"img/yz-c033.webp", "GoPro Mission Pro 1|": YZB+"img/yz-c033.webp", "Nintendo Switch OLED 64GB Neon Red/Blue|": YZB+"img/yz-c034.webp", "Nintendo Switch OLED 64GB White|": YZB+"img/yz-c034.webp", "Nintendo Switch 2|": YZB+"img/yz-c035.webp", "Nintendo Switch (Extended Battery Ver) Neon Blue/Red|": YZB+"img/yz-c036.webp", "Nintendo Switch Lite Coral|": YZB+"img/yz-c037.webp", "Nintendo Switch Lite Torquosie|": YZB+"img/yz-c037.webp", "PS5 Slim Disk 1TB GHOST of YOTEI Limited Edition|": YZB+"img/yz-c038.webp", "PS5 VR2|": YZB+"img/yz-c039.webp", "Steam Deck OLED 512GB|": YZB+"img/yz-c040.webp", "Xbox Series S 512GB (White)|": YZB+"img/yz-c041.webp", "Xbox Series S 1TB (White)|": YZB+"img/yz-c041.webp", "Xbox X 1TB Digital (White)|": YZB+"img/yz-c042.webp", "DualSense 30th Limited|": YZB+"img/yz-c043.webp", "DualSense God of War 20th Anniversary|": YZB+"img/yz-c043.webp", "DualSense James Bond 007|": YZB+"img/yz-c043.webp", "DualSense PS5 Black|": YZB+"img/yz-c043.webp", "DualSense PS5 Blue|": YZB+"img/yz-c043.webp", "DualSense PS5 Camouflage|": YZB+"img/yz-c043.webp", "DualSense PS5 Chroma Indigo|": YZB+"img/yz-c043.webp", "DualSense PS5 Chroma Pearl|": YZB+"img/yz-c043.webp", "DualSense PS5 Chroma Teal|": YZB+"img/yz-c043.webp", "DualSense PS5 Cobalt Blue|": YZB+"img/yz-c043.webp", "DualSense PS5 Pink|": YZB+"img/yz-c043.webp", "DualSense PS5 Purple|": YZB+"img/yz-c043.webp", "DualSense PS5 Red|": YZB+"img/yz-c043.webp", "DualSense PS5 Sterling Silver|": YZB+"img/yz-c043.webp", "DualSense PS5 Volcanic Red|": YZB+"img/yz-c043.webp", "DualSense PS5 White|": YZB+"img/yz-c043.webp", "DualSense Helldivers 2|": YZB+"img/yz-c043.webp", "DualSense Edge White|": YZB+"img/yz-c044.webp", "DualSense Fortnite|": YZB+"img/yz-c043.webp", "DualSense Genshin Impact|": YZB+"img/yz-c043.webp", "DualSense Ghost of Yotei Black|": YZB+"img/yz-c043.webp", "DualSense Icon Blue Edition|": YZB+"img/yz-c043.webp", "DualSense Last of Us Edition|": YZB+"img/yz-c043.webp", "DualSense Marathon|": YZB+"img/yz-c043.webp", "DualSense Monster Hunter Edition|": YZB+"img/yz-c043.webp", "DualSense Remix Green|": YZB+"img/yz-c043.webp", "DualSense Rhythm Blue|": YZB+"img/yz-c043.webp", "DualSense Techno Red|": YZB+"img/yz-c043.webp", "Apple USB-C 240W Charging Cable 2m|": YZB+"img/yz-c045.webp", "Apple USB-C 140W Power Adapter|": YZB+"img/yz-c046.webp", "Apple USB-C 96W Power Adapter|": YZB+"img/yz-c047.webp", "Apple USB-C 67W Power Adapter|": YZB+"img/yz-c048.webp", "Apple USB-C 61W Power Adapter|": YZB+"img/yz-c048.webp", "Apple USB-C 20W Power Adapter|": YZB+"img/yz-c049.webp", "AirTag 4Pack|": YZB+"img/yz-c050.webp", "AirTag 4Pack 2Gen|": YZB+"img/yz-c050.webp", "Magic Mouse 3 White|": YZB+"img/yz-c051.webp", "MagSafe Charger 2m|": YZB+"img/yz-c052.webp", "MagSafe Charger 1m|": YZB+"img/yz-c053.webp", "Apple Pencil Pro|": YZB+"img/yz-c054.webp", "Plaud NotePin (Gray)|": YZB+"img/yz-c055.webp"};
function fixPhoto(u,model,col){const m=String(u||'').match(/(yz-a\d{3})/);if(m&&PHOTO_FIX[m[1]])return PHOTO_FIX[m[1]];return u||PHOTO_EXTRA[model+'|'+col]||PHOTO_EXTRA[model+'|']||''}
/* products (общий модуль: главная + каталог) */
const CARD_PCT = 6;   // если в таблице нет «Цена по карте»: на сколько % дороже при оплате картой/в рассрочку/по счёту
function videoEmbed(u){u=String(u||'').trim();let m;
  if((m=u.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([\w-]{11})/)))return `<iframe src="https://www.youtube.com/embed/${m[1]}?autoplay=1&rel=0" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
  if((m=u.match(/rutube\.ru\/video\/([a-f0-9]{32})/)))return `<iframe src="https://rutube.ru/play/embed/${m[1]}" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
  if((m=u.match(/vk(?:video)?\.(?:com|ru)\/video(-?\d+)_(\d+)/)))return `<iframe src="https://vk.com/video_ext.php?oid=${m[1]}&id=${m[2]}&autoplay=1" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
  return `<video src="${htm(u)}" controls autoplay playsinline></video>`}
function openVideo(u,t){if(!u)return;let w=document.getElementById('yzVid');
  if(!w){w=document.createElement('div');w.id='yzVid';w.className='yzvid';w.innerHTML='<div class="yzvid-c"><button type="button" class="lead-x" aria-label="Закрыть">×</button><b></b><div class="yzvid-f"></div></div>';document.body.appendChild(w);
    w.addEventListener('click',e=>{if(e.target===w||e.target.closest('.lead-x')){w.hidden=true;w.querySelector('.yzvid-f').innerHTML='';document.body.style.overflow=''}})}
  w.querySelector('b').textContent=t||'';w.querySelector('.yzvid-f').innerHTML=videoEmbed(u);w.hidden=false;document.body.style.overflow='hidden'}

let P=[];
const CAT_ORDER=['iPhone','Mac','iPad','Apple Watch','AirPods','Samsung','Android','Dyson','Аудио','Умные часы','Умные очки','Фото и видео','Консоли','Аксессуары','LEGO'];
const catKey=c=>({'iphone':'iphone','airpods':'audio','аудио':'audio','apple watch':'watch','умные часы':'watch'}[low(c)]||low(c));
function memVal(m){m=String(m||'');const parts=m.match(/\d+(?:[.,]\d+)?\s*(?:ТБ|TB|ГБ|GB|мм)?/gi)||[];
  const toG=x=>{const n=parseFloat(x.replace(',','.'))||0;return /ТБ|TB/i.test(x)?n*1024:n};
  if(/\//.test(m)){const [a,b]=m.split('/');return toG(b+(/ТБ|TB/i.test(b)?'':' ГБ'))*1000+toG(a)}
  return parts.length?toG(parts[0]):0}
function buildProducts(){
  const m=new Map();
  DATA.products.forEach(r=>{const model=(r['Модель']||'').trim();if(!model)return;
    if(!m.has(model))m.set(model,{id:m.size+1,n:model,cat:(r['Категория']||'Другое').trim(),grp:(r['Группа']||r['Категория']||'').trim(),badge:'',feat:false,cols:[],mem:[],opt:[],v:{}});
    const p=m.get(model),col=(r['Цвет']||'').trim(),mem=(r['Память']||'').trim(),opt=(r['Опция']||r['SIM']||'').trim();
    let c=p.cols.find(x=>x.name===col);if(!c){c={name:col,hex:r['Код цвета']||'#C9CBC3',photo:r['Фото']||'',video:r['Видео']||''};p.cols.push(c)}else{if(!c.photo&&r['Фото'])c.photo=r['Фото'];if(!c.video&&r['Видео'])c.video=r['Видео']}
    if(!p.mem.includes(mem))p.mem.push(mem);if(!p.opt.includes(opt))p.opt.push(opt);
    const k=mem+'|'+opt+'|'+col,v={price:num(r['Цена']),old:num(r['Старая цена']),card:num(r['Цена по карте']),stock:low(r['Наличие'])||'да'};
    if(v.price&&(!p.v[k]||p.v[k].price>v.price))p.v[k]=v;
    if(r['Бейдж']&&!p.badge)p.badge=r['Бейдж'];if(low(r['Главная'])==='да')p.feat=true});
  P=[...m.values()].filter(p=>Object.values(p.v).some(x=>x.stock!=='нет'&&x.price));
  P.forEach(p=>{p.cols.forEach(c=>c.photo=fixPhoto(c.photo,p.n,c.name));p.f=catKey(p.cat);p.art=/duo/i.test(p.n)?'duo':/^iphone/i.test(p.n)?'ip':/apple watch/i.test(p.n)?'watch':/airpods/i.test(p.n)?'pods':'none';
    p.mem.sort((a,b)=>memVal(a)-memVal(b));p.opt.sort((a,b)=>a.length-b.length);p.min=minPrice(p);
    p.disc=Object.values(p.v).some(x=>x.old>x.price);
    const ci=p.cols.findIndex(c=>photoOf(c));if(ci>0)p.cols.unshift(p.cols.splice(ci,1)[0])});
}
function photoOf(c){const u=c.photo||'';return /^(https?:|data:)/.test(u)?u:(IMG[u]||'')}
function variant(p,mem,opt,col){
  const ex=p.v[mem+'|'+opt+'|'+col];if(ex)return Object.assign({exact:true},ex);
  const best=pre=>Object.entries(p.v).filter(([k])=>pre(k.split('|'))).map(e=>e[1]).sort((a,b)=>a.price-b.price)[0];
  const v=best(k=>k[0]===mem&&k[1]===opt)||best(k=>k[0]===mem)||best(()=>true)||{price:0,old:0,stock:'нет'};
  return Object.assign({exact:false},v)}
function minPrice(p){return Math.min(...Object.values(p.v).filter(x=>x.price&&x.stock!=='нет').map(x=>x.price))}
const badgeCls=b=>/нов/i.test(b)?'n':/пред|заказ/i.test(b)?'s':/уцен|актив/i.test(b)?'w':'g';
const stockTxt=(s,ex)=>!ex?['wait','Под заказ 1–3 дня']:s==='да'?['','В наличии']:s==='предзаказ'?['wait','Предзаказ']:s==='под заказ'?['wait','Под заказ 1–3 дня']:['no','Нет в наличии'];
function shortName(p){return p.n.replace(/^(Samsung Galaxy|Google Pixel|Apple Watch|Стайлер Dyson|Фен Dyson|Выпрямитель Dyson|Ray-Ban Meta|LEGO)\s*/i,'')||p.n}
function art(p,c){
  const ph=photoOf(c);
  if(ph)return `<img class="pimg" src="${htm(ph)}" alt="${htm(p.n)}, ${htm(c.name)}" loading="lazy">`;
  if(p.art==='ip')return `<div class="iphone" style="--pc:${htm(c.hex)}"><div class="plateau"><i class="lens l1"></i><i class="lens l2"></i><i class="lens l3"></i><i class="flash"></i><i class="mic"></i></div></div>`;
  if(p.art==='duo'){const dark=/night|чёрн|черн/i.test(c.name);return `<div class="duo-mini" style="--c1:${dark?'#1C2233':'#EEECE6'};--c2:${dark?'#2C3550':'#D6D3CB'};--c3:${dark?'#11151F':'#BDB9AF'}"><i></i><i></i></div>`}
  if(p.art==='watch')return `<div class="watch" style="--band:${htm(c.hex)}"><i>9:41</i></div>`;
  if(p.art==='pods')return `<div class="pods"></div>`;
  return `<div class="ph-none" style="--c:${htm(c.hex)}"><i></i><b>${htm(shortName(p))}</b><small>${htm(p.grp||p.cat)}</small></div>`;
}
const cardOf=v=>v.card||Math.ceil(v.price*(1+CARD_PCT/100)/100)*100-10;
function priceHTML(v){const d=v.old>v.price?v.old-v.price:0,c=cardOf(v);
  return `${d?`<span class="oldp">${rub(v.old)}</span>`:''}<span class="pv">${rub(v.price)}</span><small class="pcash">при оплате наличными</small><small class="pm">По карте, в рассрочку, по счёту: <b>${rub(c)}</b> · от ${rub(c/MONTHS_DEF)}/мес</small>`}
function cardHTML(p){const opts=p.opt.filter(Boolean);
  return `<article class="prod" data-id="${p.id}">
   <div class="tags">${p.badge?`<span class="t ${badgeCls(p.badge)}">${htm(p.badge)}</span>`:''}<span class="t d" hidden></span></div>
   <div class="pic">${art(p,p.cols[0])}<button type="button" class="vbtn" hidden aria-label="Смотреть видео">▶ Видео</button></div>
   ${p.cols.length>1||p.cols[0].name?`<div class="dots" role="group" aria-label="Цвет">${p.cols.map((c,i)=>`<button type="button" style="--c:${htm(c.hex)}" data-i="${i}" aria-label="${htm(c.name)}" title="${htm(c.name)}" aria-pressed="${i===0}"></button>`).join('')}<span class="cname">${htm(p.cols[0].name)}</span></div>`:''}
   <h3>${`<a href="${typeof modelUrl==='function'&&modelUrl(p.n)||'/model#'+p.n.toLowerCase().replace(/[^a-z0-9а-я]+/g,'-')}">${htm(p.n)}</a>`}</h3>
   ${p.mem.filter(Boolean).length?`<div class="mem" role="group" aria-label="Память">${p.mem.map((m,i)=>`<button type="button" data-i="${i}" aria-pressed="${i===0}">${htm(m)}</button>`).join('')}</div>`:''}
   ${opts.length>1?`<div class="mem opt" role="group" aria-label="Вариант">${p.opt.map((o,i)=>`<button type="button" data-i="${i}" aria-pressed="${i===0}">${htm(o||'Стандарт')}</button>`).join('')}</div>`:opts.length?`<div class="opt1">${htm(opts[0])}</div>`:''}
   <div class="foot"><div class="price"></div>
   <button class="add" type="button" aria-label="В корзину: ${htm(p.n)}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M12 5v14M5 12h14"/></svg></button></div>
 </article>`}
function sel(card,cls,arr){const b=card.querySelector(cls+' [aria-pressed="true"]');return arr[b?+b.dataset.i:0]}
function cardState(card){const p=P.find(x=>x.id==card.dataset.id);
  return {p,c:sel(card,'.dots',p.cols)||p.cols[0],mem:sel(card,'.mem:not(.opt)',p.mem)||'',opt:card.querySelector('.opt')?sel(card,'.opt',p.opt):p.opt[0]||''}}
function refreshCard(card){const {p,c,mem,opt}=cardState(card);const v=variant(p,mem,opt,c.name);const st=stockTxt(v.stock,v.exact);
  card.querySelector('.price').innerHTML=priceHTML(v);
  const vb=card.querySelector('.vbtn');if(vb)vb.hidden=!c.video;
  const d=v.old>v.price?v.old-v.price:0;const dEl=card.querySelector('.t.d');if(d){dEl.hidden=false;dEl.textContent='−'+rub(d)}else dEl.hidden=true;
  const cn=card.querySelector('.cname');if(cn)cn.textContent=c.name}
function bindGrid(g){g.addEventListener('click',e=>{
  const card=e.target.closest('.prod');if(!card)return;
  const dot=e.target.closest('.dots button');
  if(dot){card.querySelectorAll('.dots button').forEach(x=>x.setAttribute('aria-pressed',x===dot));const {p,c}=cardState(card);const pic=card.querySelector('.pic'),vb=pic.querySelector('.vbtn');pic.innerHTML=art(p,c);if(vb)pic.appendChild(vb);refreshCard(card);return}
  const m=e.target.closest('.mem button');
  if(m){m.parentNode.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===m));refreshCard(card);return}
  const vbt=e.target.closest('.vbtn');if(vbt){const {p,c}=cardState(card);openVideo(c.video,p.n+(c.name?', '+c.name:''));return}
  const a=e.target.closest('.add');
  if(a){const {p,c,mem,opt}=cardState(card);const v=variant(p,mem,opt,c.name);addCart({n:p.n,mem:[mem,opt].filter(Boolean).join(', '),col:c.name,price:v.price,stock:'да'});a.classList.add('done');a.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><path d="m5 12 5 5 9-10"/></svg>'}
})}
function fillGrid(g,items,emptyText){g.innerHTML=items.length?items.map(cardHTML).join(''):`<div class="empty">${emptyText||'Ничего не нашлось. Позвоните, привезём под заказ.'}</div>`;g.querySelectorAll('.prod').forEach(refreshCard)}

/* витрина на главной */
const grid=document.getElementById('grid');let filter='all',query='';
function render(){if(!grid)return;
  const base=P.some(p=>p.feat)?P.filter(p=>p.feat):P.slice(0,8);
  const pool=query?P:base;
  fillGrid(grid,pool.filter(p=>(filter==='all'||p.f===filter)&&(!query||p.n.toLowerCase().includes(query))).slice(0,query?24:12),query?`По запросу «${htm(query)}» ничего нет. Позвоните, привезём под заказ.`:'')}
if(grid)bindGrid(grid);
function setFilter(f){filter=f;document.querySelectorAll('.tab').forEach(t=>t.setAttribute('aria-selected',t.dataset.f===f));render()}
document.querySelectorAll('.tab').forEach(t=>t.addEventListener('click',()=>setFilter(t.dataset.f)));
if(grid)document.querySelectorAll('.cat[data-f], .sell-nav a[data-f]').forEach(c=>c.addEventListener('click',()=>setFilter(c.dataset.f)));
const q=document.getElementById('q');
q.addEventListener('input',()=>{query=q.value.trim().toLowerCase();if(window.catSearch){window.catSearch(query);return}if(query){filter='all';document.querySelectorAll('.tab').forEach(t=>t.setAttribute('aria-selected',t.dataset.f==='all'))}render()});
q.addEventListener('keydown',e=>{if(e.key==='Enter'){const t=document.getElementById('hits')||document.getElementById('catList');if(t)t.scrollIntoView({behavior:reduce?'auto':'smooth'})}});

/* hero price */
function heroPrice(){if(!document.getElementById('heroP'))return;const p=P.find(x=>/^iphone 18 pro$/i.test(x.n));if(!p)return;const v=minPrice(p);if(!isFinite(v))return;
  document.getElementById('heroP').textContent='от '+rub(v);const cv=Math.min(...Object.values(p.v).filter(x=>x.price).map(x=>x.card||x.price));document.getElementById('heroM').textContent='от '+rub(cv/MONTHS_DEF)+'/мес'}

/* promos */
const pbar=document.getElementById('pbar'), psec=document.getElementById('promos'), pgrid=document.getElementById('promosGrid');
function promoEnd(d){if(!d)return 0;const t=Date.parse(d+'T23:59:59');return isNaN(t)?0:t}
function activePromos(){const now=Date.now();return DATA.promos.filter(r=>low(r['Активна'])==='да'&&(!promoEnd(r['До'])||promoEnd(r['До'])>now))}
function actAttr(a){a=(a||'').trim();if(!a||low(a)==='заявка')return 'href="#" data-lead="promo"';return `href="${htm(a)}"${/^https?:/.test(a)?' target="_blank" rel="noopener"':''}`}
function renderPromos(){const list=activePromos();if(psec){psec.hidden=!list.length;
  pgrid.innerHTML=list.map((r,i)=>{const st=low(r['Стиль']);const cls=st==='лайм'?'lime':st==='тёмный'||st==='темный'?'dark':'';
    return `<article class="promo ${cls}" data-i="${i}"><div style="display:grid;gap:10px"><h3>${htm(r['Заголовок'])}</h3><p>${htm(r['Текст'])}</p></div>
    ${promoEnd(r['До'])?`<div class="timer" data-end="${promoEnd(r['До'])}"></div>`:''}
    <div><a class="btn btn-ink" ${actAttr(r['Действие'])} data-promo="${htm(r['Заголовок'])}">${htm(r['Кнопка']||'Подробнее')}</a></div></article>`}).join('');}
  const f=list[0];
  if(f){pbar.hidden=false;pbar.innerHTML=`<a ${actAttr(f['Действие'])} data-promo="${htm(f['Заголовок'])}" style="color:inherit;text-decoration:none">${htm(f['Заголовок'])}${promoEnd(f['До'])?` <b class="ptime" data-end="${promoEnd(f['До'])}"></b>`:''}</a>`}else pbar.hidden=true;
  tick();fitHdr()}
function tick(){const now=Date.now();
  document.querySelectorAll('.timer').forEach(el=>{let s=Math.max(0,Math.floor((+el.dataset.end-now)/1000));const d=Math.floor(s/86400);s%=86400;const h=Math.floor(s/3600),m=Math.floor(s%3600/60),c=s%60;
    el.innerHTML=[[d,'дн'],[h,'ч'],[m,'мин'],[c,'сек']].map(([v,l])=>`<span><b>${String(v).padStart(2,'0')}</b><small>${l}</small></span>`).join('')});
  document.querySelectorAll('.ptime').forEach(el=>{let s=Math.max(0,Math.floor((+el.dataset.end-now)/1000));const d=Math.floor(s/86400);s%=86400;el.textContent=`${d} дн ${String(Math.floor(s/3600)).padStart(2,'0')}:${String(Math.floor(s%3600/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`})}
setInterval(tick,1000);

/* cart + toast */
let cart=[]; const badge=document.getElementById('badge'), toast=document.getElementById('toast'), toastT=document.getElementById('toastT'); let tt;
function showToast(s,go){toastT.textContent=s;document.getElementById('toastGo').hidden=!go;toast.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>toast.classList.remove('on'),3200)}
function updBadge(){badge.textContent=cart.length;badge.classList.toggle('on',cart.length>0)}
function addCart(it){cart.push(it);yzGoal('cart_add',{item:it.n});updBadge();badge.classList.remove('pop');void badge.offsetWidth;badge.classList.add('pop');showToast(it.n+' в корзине',true)}
document.getElementById('toastGo').onclick=()=>{toast.classList.remove('on');openCart()};
document.getElementById('cartBtn').onclick=()=>cart.length?openCart():showToast('Корзина пока пуста. Нажмите «+» на карточке товара.');
function openCart(){openLead({eyebrow:'Корзина',title:'Оформить заказ',cart:true,btn:'Оформить заказ',source:'Корзина'})}

if(document.getElementById('old')){
/* trade-in calc: модель → память → SIM → состояние */
const old=document.getElementById('old'), oldMem=document.getElementById('oldMem'), neu=document.getElementById('neu');
let cond='best', sim='both', months=MONTHS_DEF;
const memName=v=>v>=1000?(v/1000)+' ТБ':v+' ГБ';
function fillMem(){const r=TI_PRICES[+old.value]||TI_PRICES[0];const prev=oldMem.value;oldMem.innerHTML=r[1].map(x=>`<option value="${x[1]}">${memName(x[0])}</option>`).join('');if([...oldMem.options].some(o=>o.value===prev))oldMem.value=prev}
function fillTradein(){const prevN=neu.value;
  if(!old.options.length){old.innerHTML=TI_PRICES.map((r,i)=>`<option value="${i}">${htm(r[0])}</option>`).join('');old.selectedIndex=Math.min(4,TI_PRICES.length-1);fillMem()}
  neu.innerHTML=P.filter(p=>p.f==='iphone').map(p=>{const mem=p.mem[0];const v=Math.min(...p.cols.map(c=>variant(p,mem,p.opt[0]||'',c.name).price).filter(Boolean));return `<option value="${v}">${htm(p.n)}, ${htm(mem)}</option>`}).join('');
  if([...neu.options].some(o=>o.value===prevN))neu.value=prevN;else if(neu.options[1])neu.selectedIndex=1;
  calc()}
function seg(id,attr,cb){const g=document.getElementById(id);if(!g)return;g.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;g.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));cb(b.dataset[attr]);calc()})}
seg('cond','c',v=>cond=v); seg('sim','s',v=>sim=v); seg('term','m',v=>months=+v);
window.yzSetTerm=v=>{months=v;document.querySelectorAll('#term button').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.m===v));};
const out={d:document.getElementById('rDisc'),p:document.getElementById('rPay'),m:document.getElementById('rMon')}; const cur={d:0,p:0,m:0};
function tween(key,to){const from=cur[key];cur[key]=to;if(reduce){out[key].textContent=rub(to);return}const t0=performance.now();(function f(t){const x=Math.min(1,(t-t0)/600),e=1-Math.pow(1-x,3);out[key].textContent=rub(from+(to-from)*e);if(x<1)requestAnimationFrame(f)})(t0)}
const msg=document.getElementById('calcMsg'), msgDef=msg?msg.textContent:'';
function estimate(){if(cond==='bad')return 0;const name=(TI_PRICES[+old.value]||[''])[0];let v=+oldMem.value*TI_UP*(TI_COND[cond]||1);if(sim==='esim')v*=TI_ESIM(name);return Math.min(TI_CAP,Math.round(v/500)*500)}
function calc(){const d=estimate();const p=Math.max(0,+neu.value-d);tween('d',d);tween('p',p);tween('m',p/months);
  if(msg)msg.textContent=cond==='bad'?'Битые и неисправные телефоны тоже принимаем — сумму назовём после осмотра в магазине.':msgDef}
old.onchange=()=>{fillMem();calc()}; oldMem.onchange=calc; neu.onchange=calc;
document.getElementById('calc').addEventListener('submit',e=>{e.preventDefault();
  const c=document.querySelector('#cond [aria-pressed="true"]').textContent, sm=document.querySelector('#sim [aria-pressed="true"]');
  openLead({eyebrow:'Trade-in',title:'Зафиксировать оценку',lines:[['Сдаёте',old.selectedOptions[0].text+', '+oldMem.selectedOptions[0].text+(sm?', '+sm.textContent:'')+', '+c.toLowerCase()],['Берёте',neu.selectedOptions[0].text],['Оценка до',out.d.textContent],['Доплата',out.p.textContent+' ('+months+' мес: '+out.m.textContent+')']],source:'Trade-in'})});
}
/* ================= ЦЕЛИ ЯНДЕКС МЕТРИКИ =================
   Счётчик 110574921 подключён в настройках сайта в Тильде. Цели (тип «JavaScript-событие» в Метрике):
   lead — заявка отправлена; lead_open — открыто окно заявки; call — нажали телефон; telegram — нажали Telegram;
   cart_add — добавили в корзину; promo_popup — показан баннер «скидка на первую покупку». */
const YM_ID=110574921;
function yzGoal(name,params){try{if(typeof window.ym==='function')window.ym(YM_ID,'reachGoal',name,params||{})}catch(e){}}
document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a)return;const h=a.getAttribute('href')||'';
  if(h.startsWith('tel:'))yzGoal('call');else if(/t\.me\//.test(h))yzGoal('telegram');else if(/vk\.com\//.test(h))yzGoal('vk');else if(/max\.ru\//.test(h))yzGoal('max')},true);
/* АНАЛИТИКА: все шаги клиента → цели Метрики (110574921). Каждое событие — не чаще раза за просмотр страницы.
   Список целей и что они значат — в ПРОЕКТ-ЮZ-СОСТОЯНИЕ.md, раздел «Аналитика». */
const yzSeen={};function yzOnce(n,p){if(yzSeen[n])return;yzSeen[n]=1;yzGoal(n,Object.assign({page:location.pathname},p||{}))}
(function(){const path=location.pathname.replace(/\/+$/,'')||'/',R=document.getElementById('yz-root')||document,blog=/^\/blog-/.test(path);
  /* дошёл до блока: блок виден на 30% или занимает 40% экрана */
  if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;
      if(e.intersectionRatio<.3&&e.intersectionRect.height<innerHeight*.4)return;io.unobserve(e.target);const g=e.target.dataset.yzGoal;yzOnce(g);if(g==='reach_bottom'&&blog)yzOnce('article_read')}),{threshold:[0,.1,.2,.3,.5]});
    if(path==='/')['promos','catalog','duo','hits','tradein','gifts','repair','reviews','faq','contacts'].forEach(id=>{const el=R.querySelector('section#'+id);if(el){el.dataset.yzGoal='reach_'+id;io.observe(el)}});
    const ft=R.querySelector('footer')||document.querySelector('footer');if(ft){ft.dataset.yzGoal='reach_bottom';io.observe(ft)}}
  /* активное время на странице (вкладка открыта и человек скроллит/трогает экран) */
  let act=Date.now(),sec=0;['scroll','click','keydown','touchstart','mousemove'].forEach(t=>addEventListener(t,()=>act=Date.now(),{passive:true,capture:true}));
  setInterval(()=>{if(document.visibilityState!=='visible'||Date.now()-act>30000)return;sec+=5;if(sec===30)yzOnce('time_30');if(sec===120)yzOnce('time_120')},5000);
  if(document.getElementById('yzModel'))yzOnce('model_view',{model:window.YZ_MODEL||path});
  if(blog)yzOnce('article_open');
  /* клики */
  document.addEventListener('click',e=>{const c=s=>e.target.closest(s);let a;
    if(c('.cat-btn,[data-mega]'))yzOnce('menu_catalog');
    if(c('#burger'))yzOnce('menu_open');
    if(c('#searchBtn'))yzOnce('search_open');
    if(c('#yzCat [data-tab],#yzCat #cside [data-f],.tab[data-f],.cat[data-f]'))yzOnce('catalog_filter');
    if(c('#cmore'))yzOnce('catalog_more');
    if(c('#yzModel [data-ci],#yzModel [data-mi],#yzModel [data-oi],.card .sw,.card [data-i]'))yzOnce('model_option');
    if(c('#mdVid'))yzOnce('model_video');
    if(c('#cond button,#sim button,#term button'))yzOnce('tradein_calc');
    if(c('[data-inst] [data-m]'))yzOnce('inst_calc');
    if(c('.fold-modes button'))yzOnce('duo_play');
    if(c('#cartBtn,.cart-btn,[data-cart]'))yzOnce('cart_open');
    if(a=c('details>summary'))yzOnce('faq_open',{q:a.textContent.trim().slice(0,80)});
    if(a=c('a[href]')){const h=a.getAttribute('href')||'';
      if(/yandex\.ru\/maps\/org|2gis\.ru\/.*firm|data-rev/.test(h)||a.matches('[data-rev-y],[data-rev-g]'))yzOnce('reviews_click',{site:/2gis/.test(a.href)?'2gis':'yandex'});
      else if(/yandex\.ru\/maps|2gis\.ru/.test(h)||a.matches('.route'))yzOnce('route');
      else if(/^\/blog-/.test(h))yzOnce('article_click');}
  },true);
  /* поля: калькуляторы, поиск, телефон в заявке */
  document.addEventListener('input',e=>{const t=e.target;
    if(t.matches('#old,#oldMem,#neu'))yzOnce('tradein_calc');
    else if(t.matches('[data-inst-range]'))yzOnce('inst_calc');
    else if(t.matches('#duoRange'))yzOnce('duo_play');
    else if(t.matches('#q,#yzCat input[type=search]')&&t.value.trim().length>2)yzOnce('search_use');
    else if(t.id==='leadPhone'&&leadCtx&&!leadCtx._ph){leadCtx._ph=1;yzGoal('lead_phone',{source:leadCtx.source||''})}},true);
  document.addEventListener('change',e=>{if(e.target.matches('#old,#oldMem,#neu'))yzOnce('tradein_calc')},true);
})();
/* ================= ЗАЯВКИ =================
   Заявки уходят через обычную форму Тильды на этой же странице (её получатели: Telegram, MAX, почта).
   Поля формы Тильды: name, phone, comment (переменные полей). */
const lead=document.getElementById('lead'), leadForm=document.getElementById('leadForm'), leadOk=document.getElementById('leadOk');
let leadCtx={};
/* Форм Тильды на странице может быть несколько (например, подписка на главной и форма заявок из подвала сайта) — берём ту, где есть поле телефона */
function tFormsAll(){return [...document.querySelectorAll('form.t-form, form.js-form-proccess')].filter(f=>!f.closest('#lead'))}
function tildaForm(){const L=tFormsAll();return L.find(f=>[...f.querySelectorAll('input')].some(i=>/phone|телефон/i.test(i.name||'')))||L[0]}
function hideTildaForm(){tFormsAll().forEach(f=>{const rec=f.closest('.t-rec,.r')||f;rec.classList.add('yz-hidden-form')})}
function sumLines(){if(leadCtx.cart)return cart.map((it,i)=>[it.n+', '+it.mem+', '+it.col+(it.stock&&it.stock!=='да'?' ('+it.stock+')':''),rub(it.price),i]);return leadCtx.lines||[]}
function drawSum(){const L=sumLines();let html=L.map(l=>`<div><span>${htm(l[0])}</span><b>${htm(l[1])}${leadCtx.cart?`<button type="button" data-rm="${l[2]}" aria-label="Убрать">×</button>`:''}</b></div>`).join('');
  if(leadCtx.cart){const t=cart.reduce((a,b)=>a+b.price,0);html+=`<div style="background:var(--ink);color:#fff"><span>Итого</span><b>${rub(t)}</b></div>`}
  document.getElementById('leadSum').innerHTML=html}
document.getElementById('leadSum').addEventListener('click',e=>{const b=e.target.closest('[data-rm]');if(!b)return;cart.splice(+b.dataset.rm,1);updBadge();if(!cart.length){closeLead();return}drawSum()});
function openLead(ctx){leadCtx=ctx;yzGoal('lead_open',{source:ctx.source||''});lead.classList.remove('closing');document.getElementById('leadE').textContent=ctx.eyebrow||'Заявка';document.getElementById('leadT').textContent=ctx.title||'Оставьте заявку';
  document.getElementById('leadBtn').textContent=ctx.btn||'Отправить заявку';document.getElementById('leadErr').hidden=true;
  drawSum();leadForm.hidden=false;leadOk.hidden=true;lead.hidden=false;document.body.style.overflow='hidden';setTimeout(()=>document.getElementById('leadName').focus(),50)}
function closeLead(now){if(lead.hidden)return;if(!now&&!reduce){if(lead.classList.contains('closing'))return;lead.classList.add('closing');setTimeout(()=>{if(lead.classList.contains('closing'))closeLead(true)},190);return}lead.classList.remove('closing');if(leadOk.hidden)yzGoal('lead_close',{source:leadCtx.source||'',phone:leadCtx._ph?'да':'нет'});lead.hidden=true;document.body.style.overflow=''}
document.getElementById('leadX').onclick=closeLead;document.getElementById('leadDone').onclick=closeLead;
lead.addEventListener('click',e=>{if(e.target===lead)closeLead()});
addEventListener('keydown',e=>{if(e.key==='Escape'&&!lead.hidden)closeLead()});
function heroCtx(){const sw=document.querySelector('.sw[aria-pressed="true"]');const p=P.find(x=>/^iphone 18 pro$/i.test(x.n));return {eyebrow:'Бронь',title:'Забронировать iPhone 18 Pro',lines:[['iPhone 18 Pro, '+(sw?sw.dataset.n:''),document.getElementById('heroP').textContent]],source:'Бронь iPhone 18 Pro'}}
document.addEventListener('click',e=>{const t=e.target.closest('[data-lead]');if(!t)return;e.preventDefault();const k=t.dataset.lead;
  if(k==='hero')openLead(heroCtx());
  else if(k==='duo'){const n=(document.querySelector('.duo-sw [aria-pressed="true"]')||{}).dataset;openLead({eyebrow:'Очередь',title:'Записаться на iPhone Duo',lines:[['iPhone Duo, '+(n?n.n:''),'сообщим о поступлении']],source:'Очередь iPhone Duo'})}
  else if(k==='repair')openLead({eyebrow:'Сервис',title:'Записаться на ремонт',lines:[['Диагностика','бесплатно']],source:'Ремонт'})
  else if(k==='promo')openLead({eyebrow:'Акция',title:t.dataset.promo||'Акция',lines:[['Акция',t.dataset.promo||'']],source:'Акция: '+(t.dataset.promo||'')})
  else if(k==='call'){const D=t.dataset;openLead({eyebrow:D.eyebrow||'Заявка',title:D.title||'Оставьте заявку',lines:D.line?[D.line.split(': ')]:[],source:D.source||D.title||'Сайт'})}});

/* Суммы и числа не переносим: «5 000 ₽», «+5 000», «−99 000» — неразрывные пробелы во всём тексте страницы (и в текстах из таблицы) */
(function(){const R=document.getElementById('yz-root')||document.body;
  const fix=t=>t.replace(/(\d)[ \u202F](?=\d{3}(?!\d))/g,'$1\u00A0').replace(/(\d) (₽|ГБ|ТБ|мес|%)/g,'$1\u00A0$2').replace(/(^|[\s(])([+−–-]) (?=\d)/g,'$1$2\u00A0').replace(/ (₽)/g,'\u00A0$1');
  const run=root=>{const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>/\d/.test(n.nodeValue)&&!n.parentNode.closest('script,style,textarea,input,select')?1:3});let n;while(n=w.nextNode()){const v=fix(n.nodeValue);if(v!==n.nodeValue)n.nodeValue=v}};
  run(R);let q=0;new MutationObserver(()=>{if(q)return;q=requestAnimationFrame(()=>{q=0;run(R)})}).observe(R,{childList:true,subtree:true})})();
/* ИНФОСТРАНИЦЫ: калькулятор рассрочки и ссылки на отзывы */
/* Ссылки на карточки магазина. Когда появятся — вставить: REVIEWS.yandex = 'https://yandex.ru/maps/org/.../1234567890/', REVIEWS.gis = 'https://2gis.ru/khanty_mansiysk/firm/...' */
const REVIEWS={yandex:'https://yandex.ru/maps/org/yuz/103143665209/reviews/',gis:'https://2gis.ru/kh_mansiysk/firm/70000001042751106/tab/reviews'};
(function(){const ys=REVIEWS.yandex||'https://yandex.ru/maps/?text='+encodeURIComponent('ЮZ Store Ханты-Мансийск Комсомольская 49'),gs=REVIEWS.gis||'https://2gis.ru/khanty_mansiysk/search/'+encodeURIComponent('ЮZ Комсомольская 49');
  document.querySelectorAll('[data-rev-y]').forEach(a=>{a.href=ys;a.target='_blank';a.rel='noopener'});document.querySelectorAll('[data-rev-g]').forEach(a=>{a.href=gs;a.target='_blank';a.rel='noopener'});
  const id=(REVIEWS.yandex.match(/\/(\d{6,})\//)||[])[1],yb=document.querySelector('[data-rev="yandex"] .rev-body');
  if(id&&yb)yb.innerHTML='<iframe src="https://yandex.ru/maps-reviews-widget/'+id+'?comments" title="Отзывы на Яндекс Картах" loading="lazy"></iframe>'})();
document.querySelectorAll('[data-inst]').forEach(w=>{const r=w.querySelector('[data-inst-range]'),sum=w.querySelector('[data-inst-sum]'),pay=w.querySelector('[data-inst-pay]'),btn=w.querySelector('[data-inst-btn]');let m=36;
  const upd=()=>{const v=+r.value;sum.textContent=rub(v);pay.textContent=rub(Math.ceil(v/m));r.style.setProperty('--v',((v-r.min)/(r.max-r.min)*100).toFixed(1)+'%');btn.dataset.line='Рассрочка '+m+' мес: '+rub(v)+', '+rub(Math.ceil(v/m))+'/мес'};
  r.addEventListener('input',upd);w.querySelectorAll('[data-m]').forEach(b=>b.addEventListener('click',()=>{m=+b.dataset.m;w.querySelectorAll('[data-m]').forEach(x=>x.setAttribute('aria-pressed',x===b));upd()}));upd()});
function composeComment(){const L=sumLines().map(l=>l[0]+(l[1]?': '+l[1]:''));if(leadCtx.cart)L.push('Итого: '+rub(cart.reduce((a,b)=>a+b.price,0)));return '['+(leadCtx.source||'Сайт')+'] '+L.join('; ')}
function setVal(f,re,val){const el=[...f.querySelectorAll('input,textarea')].find(i=>re.test(i.name||''));if(!el)return false;el.value=val;el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));return true}
function sendLead(d){return new Promise(res=>{const f=tildaForm();
  if(!f){console.warn('ЮZ: на странице нет формы Тильды — заявка не отправлена',d);res('demo');return}
  setVal(f,/^name$|имя/i,d.name||'Без имени');setVal(f,/phone|телефон/i,d.phone);
  if(!setVal(f,/comment|textarea|комментар|message/i,d.comment))setVal(f,/^name$|имя/i,(d.name||'')+' | '+d.comment);
  const ok=f.querySelector('.js-successbox,.t-form__successbox');const er=f.querySelector('.js-errorbox-all,.t-form__errorbox-wrapper');
  const btn=f.querySelector('[type="submit"],.t-submit');if(btn)btn.click();else f.requestSubmit?f.requestSubmit():f.submit();
  let n=0;const iv=setInterval(()=>{n++;const okV=ok&&getComputedStyle(ok).display!=='none';const erV=er&&getComputedStyle(er).display!=='none'&&er.textContent.trim();
    if(okV){clearInterval(iv);res('ok')}else if(erV||n>40){clearInterval(iv);res(okV?'ok':(n>40?'ok?':'err'))}},200)})}
leadForm.addEventListener('submit',async e=>{e.preventDefault();const name=document.getElementById('leadName').value.trim();const phone=document.getElementById('leadPhone').value.trim();const err=document.getElementById('leadErr');
  if(phone.replace(/\D/g,'').length<10){err.hidden=false;yzGoal('lead_error',{why:'телефон',source:leadCtx.source||''});err.textContent='Введите телефон полностью, например +7 900 123-45-67.';return}
  err.hidden=true;const btn=document.getElementById('leadBtn');btn.disabled=true;btn.textContent='Отправляем…';
  const r=await sendLead({name,phone,comment:composeComment()});btn.disabled=false;
  if(r==='err'){err.hidden=false;yzGoal('lead_error',{why:'отправка',source:leadCtx.source||''});err.textContent='Не получилось отправить. Позвоните нам: +7 (3467) 36-24-04.';btn.textContent='Отправить ещё раз';return}
  if(leadCtx.cart){cart=[];updBadge()}
  document.getElementById('leadOkT').textContent=r==='demo'?'Это тестовый режим: форма Тильды на странице не найдена, заявка никуда не ушла.':'Менеджер перезвонит вам в течение 15 минут в рабочее время.';
  yzGoal('lead',{source:leadCtx.source||'Сайт'});
  try{const P=JSON.parse(localStorage.getItem('yz-promo-pop')||'{}');P.done=1;localStorage.setItem('yz-promo-pop',JSON.stringify(P))}catch(e){}
  leadForm.hidden=true;leadOk.hidden=false});
/* Всплывающее предложение «скидка на первую покупку»: через 40 секунд на сайте, не чаще раза в 3 дня,
   и больше не показываем тем, кто уже оставил заявку */
(function(){const K='yz-promo-pop';let st={};try{st=JSON.parse(localStorage.getItem(K))||{}}catch(e){}
  if(st.done||(st.t&&Date.now()-st.t<3*864e5))return;
  setTimeout(function show(){if(document.visibilityState!=='visible'||!lead.hidden){setTimeout(show,10000);return}
    try{localStorage.setItem(K,JSON.stringify({t:Date.now()}))}catch(e){}yzGoal('promo_popup');
    openLead({eyebrow:'Подарок',title:'Получите скидку на первую покупку',lines:[['Оставьте имя и телефон — менеджер перезвонит и назовёт вашу скидку','']],btn:'Получить скидку',source:'Баннер: скидка на первую покупку'})},40000)})();
const cbF=document.getElementById('cb');if(cbF)cbF.addEventListener('submit',async e=>{e.preventDefault();const v=document.getElementById('cbPhone').value.trim();const m=document.getElementById('cbMsg');m.hidden=false;
  if(v.replace(/\D/g,'').length<10){m.textContent='Введите номер полностью, например +7 900 123-45-67.';return}
  m.textContent='Отправляем…';const r=await sendLead({name:'Обратный звонок',phone:v,comment:'[Обратный звонок] с сайта'});if(r!=='err')yzGoal('lead',{source:'Обратный звонок'});
  m.textContent=r==='err'?'Не получилось отправить. Позвоните нам: +7 (3467) 36-24-04.':r==='demo'?'Тестовый режим: форма Тильды не найдена.':'Спасибо! Перезвоним в течение 15 минут.'});

function applySettings(){(DATA.settings||[]).forEach(r=>{const k=low(r['Параметр']),v=num(r['Значение']);if(k.startsWith('trade-in')&&v>=-20&&v<=30)TI_UP=1+v/100;if(k.startsWith('рассрочка')&&v>=3&&v<=60){MONTHS_DEF=v;if(window.yzSetTerm)window.yzSetTerm(v)}})}
/* ================= МЕНЮ «КАТАЛОГ» (по кнопке, на всех страницах) ================= */
const CAT_SLUG={'iPhone':'iphone','Mac':'mac','iPad':'ipad','Apple Watch':'watch','AirPods':'airpods','Samsung':'samsung','Android':'android','Dyson':'dyson','Аудио':'audio','Умные часы':'smartwatch','Умные очки':'glasses','Фото и видео':'camera','Консоли':'games','Аксессуары':'accessories','LEGO':'lego'};
const CAT_ICON={'iPhone':'<rect x="7" y="2" width="10" height="20" rx="3"/>','Mac':'<rect x="3" y="5" width="18" height="11" rx="1.5"/><path d="M1 19h22"/>','iPad':'<rect x="4" y="2" width="16" height="20" rx="2.5"/>','Apple Watch':'<rect x="6" y="6" width="12" height="12" rx="3.5"/><path d="M9 6l1-4h4l1 4M9 18l1 4h4l1-4"/>','AirPods':'<path d="M6 15v-4a6 6 0 0 1 12 0v4"/><rect x="4" y="14" width="4" height="7" rx="1.5"/><rect x="16" y="14" width="4" height="7" rx="1.5"/>','Samsung':'<rect x="7" y="2" width="10" height="20" rx="2"/><circle cx="12" cy="6" r="1"/>','Android':'<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M10 19h4"/>','Dyson':'<path d="M10 3h4v8l3 2v8H7v-8l3-2z"/>','Аудио':'<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="14" width="4" height="6" rx="1"/><rect x="17" y="14" width="4" height="6" rx="1"/>','Умные часы':'<circle cx="12" cy="12" r="6"/><path d="M9 6l1-4h4l1 4M9 18l1 4h4l1-4"/>','Умные очки':'<circle cx="7" cy="13" r="4"/><circle cx="17" cy="13" r="4"/><path d="M11 13h2M3 13 2 8M21 13l1-5"/>','Фото и видео':'<rect x="3" y="7" width="18" height="13" rx="2"/><circle cx="12" cy="13" r="4"/><path d="M8 7l2-3h4l2 3"/>','Консоли':'<path d="M6 9h12a4 4 0 0 1 4 4v1a3 3 0 0 1-5 2l-2-2H9l-2 2a3 3 0 0 1-5-2v-1a4 4 0 0 1 4-4z"/>','Аксессуары':'<path d="M9 2v6M15 2v6M7 8h10v4a5 5 0 0 1-10 0zM12 17v5"/>','LEGO':'<rect x="3" y="9" width="18" height="11" rx="1.5"/><rect x="6" y="5" width="4" height="4" rx="1"/><rect x="14" y="5" width="4" height="4" rx="1"/>'};
const cats=()=>CAT_ORDER.filter(c=>P.some(p=>p.cat===c)).concat([...new Set(P.map(p=>p.cat))].filter(c=>!CAT_ORDER.includes(c)));
const ico=c=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${CAT_ICON[c]||CAT_ICON['Аксессуары']}</svg>`;
const mega=document.getElementById('mega'),cmap=document.getElementById('cmap');
function renderMega(){if(!cmap)return;
  cmap.innerHTML=cats().map(c=>{const ps=P.filter(p=>p.cat===c);const groups=[...new Set(ps.map(p=>p.grp))];
    const lim={'iPhone':14,'Samsung':12,'Android':12,'LEGO':0,'Консоли':8,'Фото и видео':8,'Аксессуары':8}[c]??10;
    return `<div class="cm-group${['iPhone','Samsung','Android'].includes(c)?' wide':''}"><button type="button" class="cm-head" data-cat="${htm(c)}">${ico(c)}<b>${htm(c)}</b><small>${ps.length}</small><span class="cm-arr">→</span></button>
    ${lim?`<div class="cm-chips">${ps.slice(0,lim).map(p=>`<button type="button" class="chip" data-model="${htm(p.n)}">${p.disc?'<i class="dot"></i>':''}${htm(shortName(p).replace(/^(iPhone|MacBook|iPad|AirPods)\s+/,''))}<small>от ${rub(p.min).replace(' ₽','')}</small></button>`).join('')}${ps.length>lim?`<button type="button" class="chip more" data-cat="${htm(c)}">ещё ${ps.length-lim} →</button>`:''}</div>`:''}
    ${groups.length>1&&c!=='iPhone'?`<div class="cm-sub">${groups.map(g=>`<button type="button" data-cat="${htm(c)}" data-grp="${htm(g)}">${htm(g)}</button>`).join('')}</div>`:''}</div>`}).join('')}
function openMega(){if(!mega)return;mega.classList.remove('closing');mega.style.setProperty('--hh',hdr.getBoundingClientRect().bottom+'px');mega.hidden=false;document.body.style.overflow='hidden';document.querySelectorAll('.cat-btn').forEach(b=>b.classList.add('on'))}
function closeMega(now){if(!mega||mega.hidden)return;if(!now&&!reduce){if(mega.classList.contains('closing'))return;mega.classList.add('closing');setTimeout(()=>{if(mega.classList.contains('closing')){mega.classList.remove('closing');closeMega(true)}},190);return}mega.classList.remove('closing');mega.hidden=true;document.body.style.overflow='';document.querySelectorAll('.cat-btn').forEach(b=>b.classList.remove('on'))}
function goCatalog(u){closeMega(true);if(window.catGo){window.catGo(u);return}
  try{sessionStorage.setItem('yz_go',JSON.stringify(u))}catch(e){}
  const slug=CAT_SLUG[u.cat||''];location.href='/catalog'+(slug?'#'+slug:'')}
document.querySelectorAll('.cat-btn, [data-mega]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();mega&&!mega.hidden?closeMega():openMega()}));
if(mega){
  mega.addEventListener('click',e=>{
    if(e.target===mega||e.target.closest('#megaX')){closeMega();return}
    const ch=e.target.closest('[data-model]');if(ch){goCatalog({model:ch.dataset.model});return}
    const h=e.target.closest('[data-cat]');if(h){goCatalog({cat:h.dataset.cat,grp:h.dataset.grp||''});return}
    if(e.target.closest('.mega-all')){e.preventDefault();goCatalog({})}});
  addEventListener('keydown',e=>{if(e.key==='Escape'&&!mega.hidden)closeMega()});
}
document.querySelectorAll('.sell-nav a[data-cat]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();goCatalog({cat:a.dataset.cat})}));

/* ================= СТРАНИЦА КАТАЛОГА (если на странице есть #yzCat) ================= */
const CAT=document.getElementById('yzCat');
const PRICE_BANDS=[['до 30 000',0,30000],['30–70 тыс.',30000,70000],['70–120 тыс.',70000,120000],['от 120 тыс.',120000,1e9]];
const CS={cat:'',grp:'',model:'',mem:[],opt:[],band:-1,disc:false,sort:'pop',q:'',shown:24};
if(CAT){
  const cgrid=document.getElementById('cgrid'),ctabs=document.getElementById('ctabs'),cside=document.getElementById('cside'),ccount=document.getElementById('ccount'),ctitle=document.getElementById('ctitle'),cmore=document.getElementById('cmore'),csort=document.getElementById('csort'),cchips=document.getElementById('cchips');
  bindGrid(cgrid);
  function renderTabs(){ctabs.innerHTML=`<button type="button" class="tab" data-tab="" aria-selected="${!CS.cat}">Все</button>`+cats().map(c=>`<button type="button" class="tab" data-tab="${htm(c)}" aria-selected="${CS.cat===c}">${htm(c)}</button>`).join('')}
  function pool(){return P.filter(p=>(!CS.cat||p.cat===CS.cat)&&(!CS.grp||p.grp===CS.grp)&&(!CS.model||p.n===CS.model)&&(!CS.q||(p.n+' '+p.grp+' '+p.cat).toLowerCase().includes(CS.q)))}
  function okVariant(p){return Object.entries(p.v).some(([k,v])=>{const [m,o]=k.split('|');const b=PRICE_BANDS[CS.band];
    return (!CS.mem.length||CS.mem.includes(m))&&(!CS.opt.length||CS.opt.includes(o))&&(!b||v.price>=b[1]&&v.price<b[2])&&(!CS.disc||v.old>v.price)})}
  function renderSide(){const base=pool();
    const mems=CS.cat?[...new Set(base.flatMap(p=>p.mem).filter(Boolean))].sort((a,b)=>memVal(a)-memVal(b)).slice(0,14):[];
    const opts=CS.cat?[...new Set(base.flatMap(p=>p.opt).filter(Boolean))].slice(0,10):[];
    const grps=CS.cat?[...new Set(P.filter(p=>p.cat===CS.cat).map(p=>p.grp))]:[];
    const mods=CS.cat&&!CS.model?P.filter(p=>p.cat===CS.cat&&(!CS.grp||p.grp===CS.grp)).slice(0,16):[];
    const sec=(t,html)=>html?`<div class="cs-sec"><h4>${t}</h4><div class="cs-chips">${html}</div></div>`:'';
    cside.innerHTML=
      sec('Серия / бренд',grps.length>1?grps.map(g=>`<button type="button" data-f="grp" data-v="${htm(g)}" aria-pressed="${CS.grp===g}">${htm(g)}</button>`).join(''):'')+
      sec('Модель',mods.length>1?mods.map(p=>`<button type="button" data-f="model" data-v="${htm(p.n)}">${htm(shortName(p).replace(/^(iPhone|MacBook|iPad|AirPods)\s+/,''))}</button>`).join(''):'')+
      sec('Память',mems.map(m=>`<button type="button" data-f="mem" data-v="${htm(m)}" aria-pressed="${CS.mem.includes(m)}">${htm(m)}</button>`).join(''))+
      sec(CS.cat==='iPhone'?'SIM':'Вариант',opts.map(o=>`<button type="button" data-f="opt" data-v="${htm(o)}" aria-pressed="${CS.opt.includes(o)}">${htm(o)}</button>`).join(''))+
      sec('Цена',PRICE_BANDS.map((b,i)=>`<button type="button" data-f="band" data-v="${i}" aria-pressed="${CS.band===i}">${b[0]}</button>`).join(''))+
      sec('Акции',`<button type="button" data-f="disc" aria-pressed="${CS.disc}">Со скидкой</button>`)+
      `<button type="button" class="cs-reset" id="creset">Сбросить фильтры</button>`}
  function plural(n,f){n=Math.abs(n)%100;const n1=n%10;return n>10&&n<20?f[2]:n1>1&&n1<5?f[1]:n1===1?f[0]:f[2]}
  function renderList(){
    let items=pool().filter(okVariant).slice();const s=CS.sort;
    if(s==='asc')items.sort((a,b)=>a.min-b.min);else if(s==='desc')items.sort((a,b)=>b.min-a.min);else if(s==='disc')items.sort((a,b)=>(b.disc-a.disc)||(a.min-b.min));
    ccount.textContent=items.length+' '+plural(items.length,['модель','модели','моделей']);
    ctitle.textContent=CS.model||CS.grp||CS.cat||(CS.q?'Поиск: '+CS.q:'Все товары');
    const chips=[];if(CS.grp)chips.push(['grp',CS.grp]);if(CS.model)chips.push(['model',CS.model]);CS.mem.forEach(m=>chips.push(['mem',m]));CS.opt.forEach(o=>chips.push(['opt',o]));if(CS.band>=0)chips.push(['band',PRICE_BANDS[CS.band][0]]);if(CS.disc)chips.push(['disc','Со скидкой']);if(CS.q)chips.push(['q','«'+CS.q+'»']);
    cchips.innerHTML=chips.map(c=>`<button type="button" data-x="${c[0]}" data-v="${htm(c[1])}">${htm(c[1])} ×</button>`).join('');
    fillGrid(cgrid,items.slice(0,CS.shown),'По этим фильтрам ничего нет. Сбросьте фильтры или позвоните: привезём под заказ.');
    if(CS.mem.length||CS.opt.length)cgrid.querySelectorAll('.prod').forEach(card=>{const p=P.find(x=>x.id==card.dataset.id);
      const mi=p.mem.findIndex(m=>CS.mem.includes(m)),oi=p.opt.findIndex(o=>CS.opt.includes(o));
      if(mi>=0)card.querySelectorAll('.mem:not(.opt) button').forEach((b,i)=>b.setAttribute('aria-pressed',i===mi));
      if(oi>=0)card.querySelectorAll('.opt button').forEach((b,i)=>b.setAttribute('aria-pressed',i===oi));refreshCard(card)});
    cmore.hidden=items.length<=CS.shown;cmore.textContent='Показать ещё '+Math.min(24,items.length-CS.shown);
    ctabs.querySelectorAll('.tab').forEach(t=>t.setAttribute('aria-selected',(t.dataset.tab||'')===CS.cat));
  }
  function go(upd,scroll){Object.assign(CS,{shown:24},upd);renderSide();renderList();
    const slug=CAT_SLUG[CS.cat];try{history.replaceState(null,'',slug?'#'+slug:location.pathname+location.search)}catch(e){}
    if(scroll)scrollTo({top:CAT.getBoundingClientRect().top+scrollY-hdr.offsetHeight,behavior:reduce?'auto':'smooth'})}
  window.catGo=u=>{const m=u.model?P.find(p=>p.n===u.model):null;go({cat:u.cat||(m?m.cat:''),grp:u.grp||'',model:u.model||'',mem:[],opt:[],band:-1,disc:false,q:''},true)};
  window.catSearch=v=>go({q:v,model:'',cat:v?'':CS.cat},false);
  CAT.addEventListener('click',e=>{
    const t=e.target.closest('[data-tab]');if(t){go({cat:t.dataset.tab,grp:'',model:'',mem:[],opt:[],q:''});return}
    const f=e.target.closest('#cside [data-f]');
    if(f){const k=f.dataset.f,v=f.dataset.v;
      if(k==='grp')go({grp:CS.grp===v?'':v,model:''});
      else if(k==='model')go({model:v},true);
      else if(k==='mem'||k==='opt'){const a=CS[k].slice();const i=a.indexOf(v);i>=0?a.splice(i,1):a.push(v);go({[k]:a})}
      else if(k==='band')go({band:CS.band===+v?-1:+v});else if(k==='disc')go({disc:!CS.disc});return}
    if(e.target.closest('#creset')){go({grp:'',model:'',mem:[],opt:[],band:-1,disc:false,q:''});return}
    const x=e.target.closest('#cchips [data-x]');
    if(x){const k=x.dataset.x;if(k==='mem'||k==='opt')go({[k]:CS[k].filter(v=>v!==x.dataset.v)});else go({[k]:k==='band'?-1:k==='disc'?false:''});if(k==='q')q.value='';return}
    if(e.target.closest('#cmore')){CS.shown+=24;renderList();return}
    if(e.target.closest('#cfiltBtn')){CAT.classList.toggle('side-open');return}
  });
  csort.addEventListener('change',()=>go({sort:csort.value}));
  let firstRender=true;
  window.renderCatalog=()=>{renderTabs();
    if(firstRender){firstRender=false;const slug=location.hash.slice(1);const c=Object.keys(CAT_SLUG).find(k=>CAT_SLUG[k]===slug);if(c)CS.cat=c;
      try{const g=JSON.parse(sessionStorage.getItem('yz_go')||'null');sessionStorage.removeItem('yz_go');if(g){const m=g.model?P.find(p=>p.n===g.model):null;Object.assign(CS,{cat:g.cat||(m?m.cat:CS.cat),grp:g.grp||'',model:g.model||''})}}catch(e){}}
    renderSide();renderList()};
}

/* ================= СТРАНИЦЫ МОДЕЛЕЙ (если на странице есть #yzModel) ================= */
const MODELS={
 'iPhone 18 Pro':{slug:'iphone-18-pro',tag:'Новинка 2026 года',lead:'A20 Pro на 2-нанометровом техпроцессе, камера с переменной диафрагмой и память до 2 ТБ.',
  specs:[['Процессор','A20 Pro, 2 нм: 6-ядерный CPU, 7-ядерный GPU'],['Основная камера','48 МП Fusion с переменной диафрагмой, 4 положения'],['Охлаждение','испарительная камера, до +40% к стабильной производительности'],['Связь','модем Apple C2, чип N1'],['Аккумулятор','до 36 часов видео (eSIM); 50% заряда за ~15 минут по проводу'],['Память','256 ГБ, 512 ГБ, 1 ТБ, 2 ТБ'],['Цвета','Black, Silver, Glacier, Burgundy (новый)']],
  about:['iPhone 18 Pro — первый iPhone с камерой с переменной диафрагмой: глубину резкости можно выбирать вручную, как на профессиональной камере.','Испарительная камера держит высокую производительность в играх и при съёмке видео дольше, чем у прошлого поколения.']},
 'iPhone 18 Pro Max':{slug:'iphone-18-pro-max',tag:'Новинка 2026 года',lead:'Самый большой Pro: A20 Pro, переменная диафрагма и самая долгая автономность в линейке.',
  specs:[['Процессор','A20 Pro, 2 нм: 6-ядерный CPU, 7-ядерный GPU'],['Основная камера','48 МП Fusion с переменной диафрагмой, 4 положения'],['Охлаждение','испарительная камера, до +40% к стабильной производительности'],['Аккумулятор','до 45 часов видео (eSIM)'],['Память','256 ГБ, 512 ГБ, 1 ТБ, 2 ТБ'],['Цвета','Black, Silver, Glacier, Burgundy (новый)']],
  about:['iPhone 18 Pro Max — для тех, кому нужен большой экран и максимум автономности: до 45 часов видео на одном заряде.']},
 'iPhone Duo':{slug:'iphone-duo',tag:'Первый складной iPhone',lead:'Сложен — обычный iPhone, раскрыт — планшет. Внутренний экран 7,6″ на 50% больше, чем у iPhone 18 Pro Max.',
  specs:[['Экраны','5,4″ внешний и 7,6″ внутренний, ProMotion, Always On'],['Процессор','A20 Pro с испарительной камерой'],['Камеры','48 МП Fusion Main и 48 МП Fusion Ultra Wide'],['Корпус','титан Grade 5, шарнир из более чем 100 деталей'],['Разблокировка','Touch ID в боковой кнопке'],['Аккумулятор','до 31 ч видео на внутреннем экране, до 44 ч на внешнем'],['Память','256 ГБ, 512 ГБ, 1 ТБ, 2 ТБ'],['Цвета','Star White, Night Sky']],
  about:['iPhone Duo складывается как книжка: в кармане это компактный телефон, а в развёрнутом виде — экран 7,6″ для фильмов, документов и двух приложений рядом.']},
 'iPhone 17':{slug:'iphone-17',tag:'Хит продаж',lead:'Экран ProMotion 120 Гц, чип A19 и 256 ГБ памяти уже в базовой версии.',
  specs:[['Экран','6,3″ ProMotion до 120 Гц, Always On'],['Процессор','A19'],['Камеры','две 48 МП Fusion: основная и сверхширокоугольная'],['Фронтальная камера','18 МП Center Stage'],['Память','256 ГБ, 512 ГБ']],
  about:['iPhone 17 — самый сбалансированный iPhone: впервые в базовой модели экран 120 Гц и 256 ГБ памяти с самого начала.']},
 'iPhone 17 Pro':{slug:'iphone-17-pro',tag:'Pro',lead:'Три камеры по 48 МП, зум 8× оптического качества и алюминиевый корпус с испарительной камерой.',
  specs:[['Экран','6,3″ ProMotion до 120 Гц'],['Процессор','A19 Pro'],['Камеры','три 48 МП Fusion, зум до 8× оптического качества'],['Корпус','алюминиевый unibody, испарительная камера'],['Память','256 ГБ, 512 ГБ, 1 ТБ'],['Цвета','Cosmic Orange, Deep Blue, Silver']],
  about:['iPhone 17 Pro сейчас заметно дешевле 18 Pro и остаётся одним из лучших камерофонов: три камеры по 48 МП и телевик 8×.']},
 'iPhone 17 Pro Max':{slug:'iphone-17-pro-max',tag:'Pro Max',lead:'Экран 6,9″, три камеры 48 МП и самая большая батарея в линейке 17.',
  specs:[['Экран','6,9″ ProMotion до 120 Гц'],['Процессор','A19 Pro'],['Камеры','три 48 МП Fusion, зум до 8× оптического качества'],['Корпус','алюминиевый unibody, испарительная камера'],['Память','256 ГБ, 512 ГБ, 1 ТБ, 2 ТБ'],['Цвета','Cosmic Orange, Deep Blue, Silver']],
  about:['iPhone 17 Pro Max — большой экран и максимальная автономность прошлого поколения Pro по цене ниже новинки.']},
 'iPhone Air':{slug:'iphone-air',tag:'Самый тонкий iPhone',lead:'Корпус 5,6 мм с титановой рамкой, экран 6,5″ и чип A19 Pro.',
  specs:[['Толщина','5,6 мм, титановая рамка'],['Экран','6,5″ ProMotion до 120 Гц'],['Процессор','A19 Pro'],['Камера','48 МП Fusion'],['SIM','только eSIM'],['Память','256 ГБ, 512 ГБ, 1 ТБ']],
  about:['iPhone Air — для тех, кто хочет лёгкий и тонкий телефон без компромиссов по скорости: внутри тот же A19 Pro, что и в 17 Pro.']}
};
const MODEL_BY_SLUG={};Object.entries(MODELS).forEach(([n,m])=>MODEL_BY_SLUG[m.slug]=n);
const modelUrl=n=>MODELS[n]?'/'+MODELS[n].slug:'';
const YM=document.getElementById('yzModel');
if(YM){
  const slugNow=()=>(window.YZ_MODEL||location.hash.slice(1)||new URLSearchParams(location.search).get('m')||'').toLowerCase();
  let name='',M={},st={ci:0,mi:0,oi:0};
  function pick(){const sl=slugNow();name=MODEL_BY_SLUG[sl]||(P.find(x=>x.n.toLowerCase().replace(/[^a-z0-9а-я]+/g,'-')===sl)||{}).n||'';M=MODELS[name]||{};st={ci:0,mi:0,oi:0}}
  addEventListener('hashchange',()=>{pick();draw();scrollTo(0,0)});
  function draw(){if(!name)pick();const p=P.find(x=>x.n===name);
    if(!p){YM.innerHTML=`<section class="cat-top"><div class="wrap"><h1>${htm(name||'Модель')}</h1><p class="lead">Сейчас этой модели нет в прайсе. Позвоните: привезём под заказ.</p></div></section>`;return}
    const c=p.cols[st.ci]||p.cols[0],mem=p.mem[st.mi]||p.mem[0],opt=p.opt[st.oi]||p.opt[0]||'';const v=variant(p,mem,opt,c.name);const ph=photoOf(c);
    const d=v.old>v.price?v.old-v.price:0;const card=cardOf(v);
    YM.innerHTML=`
<section class="md-hero"><div class="wrap">
 <nav class="crumbs"><a href="/">Главная</a><span>/</span><a href="/catalog#${CAT_SLUG[p.cat]||''}">${htm(p.cat)}</a><span>/</span><span>${htm(name)}</span></nav>
 <div class="md-grid">
  <div class="md-pic">${ph?`<img src="${htm(ph)}" alt="${htm(name)}, ${htm(c.name)}">`:art(p,c)}${c.video?`<button type="button" class="vbtn" id="mdVid">▶ Видео</button>`:''}</div>
  <div class="md-info">
   ${M.tag?`<span class="tag-new md-tag"><b>${htm(M.tag)}</b></span>`:''}
   <h1>Купить ${htm(name)} в Ханты-Мансийске</h1>
   ${M.lead?`<p class="md-lead">${htm(M.lead)}</p>`:''}
   <div class="md-opt"><span>Цвет: <b>${htm(c.name)}</b></span><div class="dots">${p.cols.map((x,i)=>`<button type="button" data-ci="${i}" style="--c:${htm(x.hex)}" title="${htm(x.name)}" aria-pressed="${i===st.ci}"></button>`).join('')}</div></div>
   ${p.mem.filter(Boolean).length?`<div class="md-opt"><span>Память</span><div class="mem">${p.mem.map((x,i)=>`<button type="button" data-mi="${i}" aria-pressed="${i===st.mi}">${htm(x)}</button>`).join('')}</div></div>`:''}
   ${p.opt.filter(Boolean).length>1?`<div class="md-opt"><span>${p.cat==='iPhone'?'SIM':'Вариант'}</span><div class="mem opt">${p.opt.map((x,i)=>`<button type="button" data-oi="${i}" aria-pressed="${i===st.oi}">${htm(x||'Стандарт')}</button>`).join('')}</div></div>`:''}
   <div class="md-price">${d?`<span class="oldp">${rub(v.old)}</span>`:''}<b>${rub(v.price)}</b>${d?`<span class="t d">−${rub(d)}</span>`:''}<small>при оплате наличными</small>
    <p>По карте, в рассрочку, по счёту: <b>${rub(card)}</b> · рассрочка от <b>${rub(card/MONTHS_DEF)}/мес</b> на ${MONTHS_DEF} мес</p></div>
   <div class="cta-row"><button class="btn btn-lime" type="button" id="mdCart">В корзину <span class="arr">→</span></button><button class="btn btn-ink" type="button" id="mdOne">Купить в 1 клик</button></div>
   <div class="benefits md-ben"><span class="on">Гарантия 12 месяцев</span><span>Оригинал</span>${p.cat==='iPhone'?'<span class="on">Чехол и стекло в подарок</span>':''}<a href="/trade-in">Trade-in до −99 000 ₽</a><a href="/rassrochka">Рассрочка 0%</a><a href="/garantiya">Гарантия</a><a href="/dostavka">Доставка</a></div>
  </div>
 </div>
</div></section>
${M.specs?`<section class="md-sec"><div class="wrap"><h2>Характеристики ${htm(name)}</h2><div class="md-specs">${M.specs.map(s=>`<div><span>${htm(s[0])}</span><b>${htm(s[1])}</b></div>`).join('')}</div>${(M.about||[]).map(t=>`<p class="md-p">${htm(t)}</p>`).join('')}</div></section>`:''}
<section class="md-sec"><div class="wrap md-faq"><h2>Вопросы о ${htm(name)}</h2><div class="qa">
 <details open><summary>Это оригинальный ${htm(name)}?<i></i></summary><p>Да. При покупке проверяем серийный номер на сайте Apple вместе с вами, телефон активируется при вас.</p></details>
 ${p.cat==='iPhone'?`<details><summary>Чем отличается eSIM и SIM + eSIM?<i></i></summary><p>Версия eSIM работает только с электронными SIM-картами. SIM + eSIM — с обычной nano-SIM и eSIM. Российские операторы поддерживают eSIM, но если вам нужна физическая SIM-карта, выбирайте SIM + eSIM.</p></details>`:''}
 <details><summary>Можно купить в рассрочку?<i></i></summary><p>Да, до ${MONTHS_DEF} месяцев по цене «по карте», без первого взноса. Нужен только паспорт.</p></details>
 <details><summary>Можно сдать старый телефон?<i></i></summary><p>Да, оценим в магазине за 15 минут и зачтём до 99 000 ₽ в стоимость ${htm(name)}.</p></details>
 <details><summary>Какая гарантия?<i></i></summary><p>12 месяцев гарантии магазина. Обращайтесь в магазин на Комсомольской, 49.</p></details>
</div></div></section>
<section class="seo-text"><div class="wrap"><h2>${htm(name)} — цены в Ханты-Мансийске</h2><p>В магазине ЮZ на Комсомольской, 49 можно купить ${htm(name)} во всех цветах и объёмах памяти: ${htm(p.cols.map(x=>x.name).join(', '))}. Цена ${htm(name)} — от ${rub(p.min)} при оплате наличными. Доступны рассрочка до ${MONTHS_DEF} месяцев, trade-in старого смартфона и доставка по Ханты-Мансийску в день заказа.</p></div></section>`;
    document.title=`Купить ${name} в Ханты-Мансийске — цена от ${rub(p.min)} | ЮZ Store`;
  }
  YM.addEventListener('click',e=>{const b=e.target.closest('[data-ci],[data-mi],[data-oi]');
    if(b){if(b.dataset.ci)st.ci=+b.dataset.ci;if(b.dataset.mi)st.mi=+b.dataset.mi;if(b.dataset.oi)st.oi=+b.dataset.oi;draw();return}
    const p=P.find(x=>x.n===name);if(!p)return;const c=p.cols[st.ci]||p.cols[0],mem=p.mem[st.mi]||p.mem[0],opt=p.opt[st.oi]||p.opt[0]||'';const v=variant(p,mem,opt,c.name);
    if(e.target.closest('#mdVid')){openVideo(c.video,name+', '+c.name);return}
    if(e.target.closest('#mdCart')){addCart({n:name,mem:[mem,opt].filter(Boolean).join(', '),col:c.name,price:v.price,stock:'да'});return}
    if(e.target.closest('#mdOne')){openLead({eyebrow:'Покупка в 1 клик',title:name,lines:[[name+', '+[mem,opt,c.name].filter(Boolean).join(', '),rub(v.price)+' наличными']],source:'1 клик: '+name})}
  });
  window.renderModel=()=>{pick();draw()};
}

function applyData(){applySettings();buildProducts();render();heroPrice();renderPromos();if(typeof fillTradein==='function')fillTradein();renderMega();if(window.renderCatalog)renderCatalog();if(window.renderModel)renderModel()}
applyData();hideTildaForm();addEventListener('load',hideTildaForm);
loadSheets();

if(document.getElementById('duoScroll')){
/* DUO: прозрачные кадры; стартует полураскрытым, раскрытие только ползунком и кнопками */
const ds=document.getElementById('duoScroll'), duo=document.getElementById('duoEl'), dsec=document.getElementById('duo'), dRange=document.getElementById('duoRange');
const cv2=document.getElementById('duoCv'),cx=cv2.getContext('2d'),FW=720,FH=478,COLS=8,PER=48,NF=91,sheets=[];let loaded=0,lastF=-1;
if(!IMG['yz-duo-seq-1']||!IMG['yz-duo-seq-2']){const fb=new Image();fb.onload=()=>{document.getElementById('duoLoad').hidden=true;const r=Math.min(FW/fb.width,FH/fb.height)*.9;cx.clearRect(0,0,FW,FH);cx.drawImage(fb,(FW-fb.width*r)/2,(FH-fb.height*r)/2,fb.width*r,fb.height*r)};fb.src=IMG['iphone-duo-star-white-open']||'';document.querySelector('.fold-ctl').hidden=true}
else ['yz-duo-seq-1','yz-duo-seq-2'].forEach((k,i)=>{const im=new Image();im.crossOrigin='anonymous';im.decoding='async';im.onload=()=>{loaded++;if(loaded===2){document.getElementById('duoLoad').hidden=true;lastF=-1;draw(dP);warm()}};im.src=IMG[k]||'';sheets[i]=im});
function draw(p){if(loaded<2)return;const f=Math.min(NF-1,Math.round(p*(NF-1)));if(f===lastF)return;lastF=f;const sh=sheets[f<PER?0:1],k=f%PER;cx.clearRect(0,0,FW,FH);const c=cutF(f,sh,k);if(c)cx.drawImage(c,0,0);else cx.drawImage(sh,(k%COLS)*FW,Math.floor(k/COLS)*FH,FW,FH,0,0,FW,FH)}
/* Кадры в JPG на белом: убираем белый фон, связанный с краем кадра (руки и телефон остаются), края смягчаем. Последние 24 кадра держим в памяти; соседние кадры готовим заранее, пока браузер свободен */
const CUT=new Map();let cutOff=false;
function warm(){const c=Math.round(dP*(NF-1)),todo=[];for(let s=1;s<=11;s++){if(c+s<NF)todo.push(c+s);if(c-s>=0)todo.push(c-s)}
  const idle=window.requestIdleCallback||(fn=>setTimeout(fn,60));(function step(){const f=todo.shift();if(f==null||cutOff)return;if(!CUT.has(f))cutF(f,sheets[f<PER?0:1],f%PER);idle(step)})()}
function cutF(f,sh,k){if(cutOff)return null;if(CUT.has(f)){const c=CUT.get(f);CUT.delete(f);CUT.set(f,c);return c}
  try{const c=document.createElement('canvas');c.width=FW;c.height=FH;const g=c.getContext('2d',{willReadFrequently:true});
  g.drawImage(sh,(k%COLS)*FW,Math.floor(k/COLS)*FH,FW,FH,0,0,FW,FH);const id=g.getImageData(0,0,FW,FH),d=id.data,N=FW*FH;
  const mn=new Uint8Array(N),dist=new Uint8Array(N).fill(255),q=new Int32Array(N);let h=0,t=0;
  for(let i=0;i<N;i++){const j=i*4;mn[i]=Math.min(d[j],d[j+1],d[j+2])}
  const seed=i=>{if(dist[i]&&mn[i]>236){dist[i]=0;q[t++]=i}};
  for(let x=0;x<FW;x++){seed(x);seed(N-FW+x)}for(let y=0;y<FH;y++){seed(y*FW);seed(y*FW+FW-1)}
  const go=(n,dd)=>{if(dist[n]<=dd+1)return;if(dd===0&&mn[n]>236){dist[n]=0;q[t++]=n}else if(dd<3){dist[n]=dd+1;q[t++]=n}};
  while(h<t){const i=q[h++],x=i%FW,dd=dist[i];if(x>0)go(i-1,dd);if(x<FW-1)go(i+1,dd);if(i>=FW)go(i-FW,dd);if(i<N-FW)go(i+FW,dd)}
  for(let i=0;i<N;i++){let a=1;if(i<FW*3)a=0;else if(dist[i]<=3)a=Math.max(0,Math.min(1,(252-mn[i])/52));if(a<1){const j=i*4;
    if(a<=.01){d[j+3]=0;continue}for(let z=0;z<3;z++)d[j+z]=Math.max(0,Math.min(255,(d[j+z]-(1-a)*255)/a));d[j+3]=a*255}}
  g.putImageData(id,0,0);CUT.set(f,c);if(CUT.size>24)CUT.delete(CUT.keys().next().value);return c}catch(e){cutOff=true;return null}}
let dP=0,anim=0;
function setP(p){dP=Math.max(0,Math.min(1,p));draw(dP);duo.style.setProperty('--p',dP.toFixed(4));dsec.style.setProperty('--p',dP.toFixed(4));dRange.value=Math.round(dP*1000);
  dRange.style.setProperty('--v',(dP*100).toFixed(1)+'%');
  document.querySelectorAll('.fold-modes button').forEach(b=>b.setAttribute('aria-pressed',Math.abs(+b.dataset.p-dP)<.08))}
function tweenP(to,ms){cancelAnimationFrame(anim);if(reduce){setP(to);return}const from=dP,t0=performance.now();
  (function f(t){const x=Math.min(1,(t-t0)/(ms||900)),e=x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;setP(from+(to-from)*e);if(x<1)anim=requestAnimationFrame(f)})(t0)}
dRange.addEventListener('input',()=>{cancelAnimationFrame(anim);setP(dRange.value/1000)});
document.querySelectorAll('.fold-modes button').forEach(b=>b.addEventListener('click',()=>{tweenP(+b.dataset.p)}));
setP(.66);
}
/* reveal (only below the first screen) */
const els=[...document.querySelectorAll('.rv-in')];
if(!reduce && 'IntersectionObserver' in window){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('shown');io.unobserve(e.target)}}),{rootMargin:'0px 0px -8% 0px'});
  els.forEach(el=>{if(el.getBoundingClientRect().top<innerHeight)el.classList.add('shown');else io.observe(el)});
}else els.forEach(el=>el.classList.add('shown'));

/* stylised map */
const cv=document.getElementById('map');
function drawMap(){
  const r=cv.getBoundingClientRect(),dpr=Math.min(2,devicePixelRatio||1);cv.width=r.width*dpr;cv.height=r.height*dpr;const c=cv.getContext('2d');c.scale(dpr,dpr);
  const W=r.width,H=r.height;c.fillStyle='#ECEEE6';c.fillRect(0,0,W,H);
  c.fillStyle='#DCE6C9';[[.08,.1,.22,.18],[.7,.65,.25,.3],[.05,.7,.18,.22]].forEach(([x,y,w,h])=>{c.beginPath();c.roundRect(x*W,y*H,w*W,h*H,18);c.fill()});
  c.strokeStyle='#C7D7E8';c.lineWidth=26;c.beginPath();c.moveTo(-20,H*.92);c.bezierCurveTo(W*.3,H*.75,W*.6,H*1.05,W+20,H*.82);c.stroke();
  c.strokeStyle='#FFFFFF';c.lineCap='round';
  const roads=[[0,.3,1,.22,9],[0,.62,1,.55,11],[.25,0,.32,1,9],[.62,0,.55,1,7],[0,.45,1,.4,5],[.45,0,.42,1,5],[.8,0,.82,1,5]];
  roads.forEach(([x1,y1,x2,y2,w])=>{c.lineWidth=w;c.beginPath();c.moveTo(x1*W,y1*H);c.lineTo(x2*W,y2*H);c.stroke()});
  c.fillStyle='#8A8E80';c.font='600 11px Onest, sans-serif';c.fillText('ул. Комсомольская',W*.06,H*.6-10);c.fillText('ул. Мира',W*.64,H*.2);c.fillText('р. Иртыш',W*.7,H*.9);
}
try{drawMap();addEventListener('resize',()=>{clearTimeout(drawMap.t);drawMap.t=setTimeout(drawMap,150)})}catch(e){}
})();

