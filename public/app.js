'use strict';
const icons = {
  arrow: '<svg class="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>',
  ticket: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 0 2-2h14v4a3 3 0 0 0 0 6v4H5a2 2 0 0 0-2-2V7Z"/><path d="M12 5v2m0 3v4m0 3v2"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  chair: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13V8a7 7 0 0 1 14 0v5M4 12h2v7H4zm14 0h2v7h-2zM6 17h12v3H6z"/></svg>',
  lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 1 1 8 0v3"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5L20 7"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18"/></svg>',
  eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>',
  eyeOff: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 3l18 18M10.6 5.6A11 11 0 0 1 12 5.5c6.5 0 10 6.5 10 6.5a15 15 0 0 1-3.1 4.1M6.5 6.7C3.7 8.4 2 12 2 12s3.5 6.5 10 6.5c1.6 0 3.1-.4 4.3-1.1"/><path d="M10 10a3 3 0 0 0 4 4"/></svg>'
};
const dictionary = {
  ar: {
    navHome:'الرئيسية',navMovies:'الأفلام',navBookings:'حجوزاتي',signIn:'تسجيل الدخول',logOut:'خروج',footerSlogan:'كل قصة تستحق مقعدًا.',demoFooter:'مشروع جامعي تجريبي — بدون دفع حقيقي',
    heroKicker:'تجربة سينما مختلفة',heroTitle:'كل فيلم عظيم<br>يبدأ <em>من مقعدك.</em>',heroDesc:'اكتشف أحدث عروضنا، اختر الموعد والمقعد المناسب، واستلم تذكرتك الإلكترونية خلال لحظات. سينما بطريقتك.',explore:'استعرض الأفلام',howItWorks:'كيف يعمل؟',trusted:'تجربة حجز بسيطة وآمنة',nowShowing:'يعرض الآن',featured:'اختيار الأسبوع',premium:'تجربة سينمائية',
    moviesStat:'أفلام مميزة',datesStat:'أيام للحجز',seatsStat:'مقعدًا لكل عرض',nowPlaying:'يعرض الآن',movieSectionTitle:'أفلام تستحق المشاهدة',movieSectionDesc:'اختر قصتك القادمة واحجز مكانك قبل نفاد المقاعد.',seeAll:'شاهد الكل',all:'جميع الأفلام',sciFi:'خيال علمي',action:'أكشن',drama:'دراما',thriller:'إثارة',adventure:'مغامرة',from:'تبدأ من',bookNow:'احجز الآن',minutes:'دقيقة',
    simpleSteps:'ثلاث خطوات تفصلك عن الشاشة الكبيرة',stepOne:'اختر الفيلم',stepOneDesc:'تصفح الأفلام واختر القصة التي تناسب ذوقك.',stepTwo:'حدد مقعدك',stepTwoDesc:'اختر موعد العرض ومقعدك من خريطة المقاعد.',stepThree:'احصل على تذكرتك',stepThreeDesc:'أكد الحجز واستلم تذكرة إلكترونية تجريبية.',
    home:'الرئيسية',bookingTitle:'احجز مقعدك',bookingIntro:'اختر موعد العرض، ثم حدد مقاعدك المفضلة.',selectShowing:'اختر موعد العرض',selectSeats:'اختر المقاعد',chooseDate:'اختر اليوم',chooseTime:'الأوقات المتاحة',screen:'الشاشة من هذه الجهة',available:'متاح',selected:'محدد',taken:'محجوز',vip:'VIP (+2.50 د.أ)',vipNote:'صفّا G و H مقاعد مميزة، بإضافة 2.50 د.أ لكل مقعد.',seatCount:'مقاعد محددة',orderSummary:'ملخص الحجز',movie:'الفيلم',date:'التاريخ',time:'الوقت',seats:'المقاعد',none:'لم يتم الاختيار',tickets:'التذاكر',serviceFee:'رسوم الخدمة',total:'المجموع',taxNote:'لا توجد عملية دفع حقيقية. الحجز لأغراض المشروع الجامعي فقط.',confirm:'تأكيد الحجز التجريبي',selectSeatFirst:'اختر مقعدًا واحدًا على الأقل',seatMax:'يمكن حجز 8 مقاعد كحد أقصى.',
    welcome:'أهلاً بعودتك',welcomeSub:'سجّل الدخول أو أنشئ حسابًا لإتمام الحجز.',createAccount:'إنشاء حساب',login:'تسجيل الدخول',fullName:'الاسم الكامل',email:'البريد الإلكتروني',password:'كلمة المرور',namePlaceholder:'أدخل اسمك الكامل',emailPlaceholder:'name@example.com',passwordPlaceholder:'أدخل كلمة المرور',passwordPlaceholderStrong:'أنشئ كلمة مرور قوية',showPassword:'إظهار كلمة المرور',hidePassword:'إخفاء كلمة المرور',passwordRulesTitle:'شروط كلمة المرور',pwLength:'من 8 إلى 128 حرفًا',pwLower:'حرف إنجليزي صغير (a–z)',pwUpper:'حرف إنجليزي كبير (A–Z)',pwDigit:'رقم واحد على الأقل (0–9)',pwSymbol:'رمز خاص مثل ! أو @ أو #',pwPrompt:'استوفِ الشروط الخمسة لإنشاء الحساب.',pwKeepGoing:'أكمل الشروط المتبقية لتقوية كلمة المرور.',pwStrong:'ممتاز! كلمة المرور تستوفي كل الشروط.',pwError:'كلمة المرور ضعيفة؛ لازم تستوفي الشروط الخمسة الموضّحة.',authFoot:'كلمات المرور مشفّرة اشتقاقيًا، وبيانات الحجز محفوظة على خادم الموقع.',authError:'تعذّر إكمال العملية، تأكد من البيانات وحاول مجددًا.',needLogin:'سجّل دخولك أولًا لإتمام الحجز.',loginSuccess:'تم تسجيل الدخول بنجاح.',
    forgotPassword:'نسيت كلمة المرور؟',resetTitle:'استعادة كلمة المرور',resetSubtitle:'اكتب البريد الإلكتروني المسجّل بالحساب حتى نرسل لك رابط الاستعادة.',sendResetLink:'إرسال رابط الاستعادة',backToLogin:'العودة لتسجيل الدخول',resetSentTitle:'تحقق من بريدك الإلكتروني',resetSentMessage:'إذا كان البريد مرتبطًا بحساب، رح يصلك رابط لإعادة تعيين كلمة المرور. افحص مجلد الرسائل غير المرغوبة أيضًا.',newPasswordTitle:'تعيين كلمة مرور جديدة',newPasswordSubtitle:'اختَر كلمة مرور قوية. رابط الاستعادة صالح لمدة 15 دقيقة ويُستخدم مرة واحدة.',newPassword:'كلمة المرور الجديدة',confirmNewPassword:'تأكيد كلمة المرور الجديدة',resetPasswordButton:'تغيير كلمة المرور',passwordMismatch:'كلمتا المرور غير متطابقتين.',resetComplete:'تم تغيير كلمة المرور. سجّل دخولك بكلمة المرور الجديدة.',resetUnavailable:'إرسال بريد الاستعادة غير مفعّل بعد. تواصل مع مدير الموقع.',resetTooMany:'محاولات كثيرة. جرّب لاحقاً.',resetInvalid:'رابط الاستعادة غير صالح أو انتهت صلاحيته. اطلب رابطاً جديداً.',
    success:'تم تأكيد حجزك!',successDesc:'مقعدك جاهز، وهذه تذكرتك الإلكترونية.',entryTicket:'تذكرة دخول',ticketId:'رمز الحجز',bookingDate:'تاريخ الحجز',printTicket:'طباعة التذكرة',bookAnother:'حجز فيلم آخر',ticketDemo:'هذه تذكرة تجريبية لمشروع جامعي، وليست تذكرة صالحة لدخول سينما حقيقية.',
    myBookings:'حجوزاتي',bookingsDesc:'كل تذاكرك الإلكترونية في مكان واحد.',noBookings:'ما عندك حجوزات بعد',noBookingsDesc:'ابدأ باختيار فيلم، وبعد تأكيد الحجز رح تظهر تذكرتك هون.',needAccount:'سجّل دخولك لمشاهدة حجوزاتك',needAccountDesc:'حجوزاتك مرتبطة بحسابك حتى تقدر ترجع لها بأي وقت.',viewTicket:'عرض التذكرة',confirmedStatus:'مؤكد',noShowings:'لا يوجد عرض متاح في هذا الوقت.',loading:'جاري التحميل...',error:'صار خطأ. جرّب مرة ثانية.',reload:'إعادة المحاولة',
    day0:'اليوم',day1:'غدًا',justBooked:'تم حجز المقاعد بنجاح.',seatConflict:'أحد المقاعد تم حجزه للتو. اختر مقعدًا ثانيًا.',security:'الحجز محمي بالجلسات والتحقق من توافر المقاعد.',continue:'تابع الحجز',featuredLabel:'عرض مميز'
  },
  en: {
    navHome:'Home',navMovies:'Movies',navBookings:'My bookings',signIn:'Sign in',logOut:'Log out',footerSlogan:'Every story deserves a seat.',demoFooter:'University demo — no real payments',
    heroKicker:'WELCOME TO THE MOVIES',heroTitle:'Every great story<br>starts <em>with your seat.</em>',heroDesc:'Discover the latest screenings, choose your favorite time and seat, and get your digital ticket in moments. Cinema, your way.',explore:'Explore movies',howItWorks:'How it works',trusted:'A simple, secure booking experience',nowShowing:'NOW SHOWING',featured:'THIS WEEK’S PICK',premium:'PREMIUM EXPERIENCE',
    moviesStat:'Amazing movies',datesStat:'Booking days',seatsStat:'Seats per show',nowPlaying:'NOW PLAYING',movieSectionTitle:'Movies worth watching',movieSectionDesc:'Find your next story and reserve your seat before it’s gone.',seeAll:'See all',all:'All movies',sciFi:'Sci-fi',action:'Action',drama:'Drama',thriller:'Thriller',adventure:'Adventure',from:'From',bookNow:'Book now',minutes:'min',
    simpleSteps:'Three simple steps to the big screen',stepOne:'Pick a movie',stepOneDesc:'Discover what’s showing and find a story you love.',stepTwo:'Choose your seat',stepTwoDesc:'Select your showtime and favorite seat on the map.',stepThree:'Get your ticket',stepThreeDesc:'Confirm your booking and receive a demo e-ticket.',
    home:'Home',bookingTitle:'Book your seat',bookingIntro:'Pick a showtime and select the perfect seat.',selectShowing:'Choose showtime',selectSeats:'Select seats',chooseDate:'Choose a date',chooseTime:'Available times',screen:'SCREEN THIS WAY',available:'Available',selected:'Selected',taken:'Taken',vip:'VIP (+2.50 JOD)',vipNote:'Rows G and H are VIP seats (+2.50 JOD per seat).',seatCount:'Selected seats',orderSummary:'Booking summary',movie:'Movie',date:'Date',time:'Time',seats:'Seats',none:'Not selected',tickets:'Tickets',serviceFee:'Service fee',total:'Total',taxNote:'No actual payment is processed. This is a university project demo.',confirm:'Confirm demo booking',selectSeatFirst:'Choose at least one seat',seatMax:'You can reserve up to 8 seats.',
    welcome:'Welcome back',welcomeSub:'Sign in or create an account to complete your booking.',createAccount:'Create account',login:'Sign in',fullName:'Full name',email:'Email address',password:'Password',namePlaceholder:'Enter your full name',emailPlaceholder:'name@example.com',passwordPlaceholder:'Enter your password',passwordPlaceholderStrong:'Create a strong password',showPassword:'Show password',hidePassword:'Hide password',passwordRulesTitle:'Password requirements',pwLength:'8–128 characters',pwLower:'One lowercase letter (a–z)',pwUpper:'One uppercase letter (A–Z)',pwDigit:'At least one number (0–9)',pwSymbol:'A special symbol such as ! @ #',pwPrompt:'Meet all five requirements to create your account.',pwKeepGoing:'Complete the remaining password requirements.',pwStrong:'Great! Your password meets every requirement.',pwError:'Your password is too weak. Meet all five requirements shown.',authFoot:'Passwords are securely hashed and bookings are stored securely on the server.',authError:'Unable to complete the request. Please check your details.',needLogin:'Please sign in to confirm your booking.',loginSuccess:'Signed in successfully.',
    forgotPassword:'Forgot password?',resetTitle:'Reset your password',resetSubtitle:'Enter your registered email and we will email you a secure reset link.',sendResetLink:'Send reset link',backToLogin:'Back to sign in',resetSentTitle:'Check your inbox',resetSentMessage:'If the email belongs to an account, we will send a password reset link. Check your spam folder too.',newPasswordTitle:'Choose a new password',newPasswordSubtitle:'Use a strong password. This link is valid for 15 minutes and can be used once.',newPassword:'New password',confirmNewPassword:'Confirm new password',resetPasswordButton:'Change password',passwordMismatch:'Passwords do not match.',resetComplete:'Your password has been changed. Sign in with your new password.',resetUnavailable:'Password reset email is not configured yet. Contact the site owner.',resetTooMany:'Too many attempts. Please try later.',resetInvalid:'This link is invalid or expired. Request a new link.',
    success:'Your booking is confirmed!',successDesc:'Your seat is ready. Here is your digital ticket.',entryTicket:'ADMIT ONE · DEMO',ticketId:'Booking reference',bookingDate:'Booked on',printTicket:'Print ticket',bookAnother:'Book another movie',ticketDemo:'This is a university demo ticket, not a valid cinema admission ticket.',
    myBookings:'My bookings',bookingsDesc:'All your digital tickets in one place.',noBookings:'No bookings yet',noBookingsDesc:'Pick a movie and confirm your booking to see your ticket here.',needAccount:'Sign in to view your bookings',needAccountDesc:'Your reservations are linked to your account, so you can access them anytime.',viewTicket:'View ticket',confirmedStatus:'Confirmed',noShowings:'No screening available at this time.',loading:'Loading...',error:'Something went wrong. Please try again.',reload:'Try again',
    day0:'Today',day1:'Tomorrow',justBooked:'Seats successfully reserved.',seatConflict:'A selected seat was just booked. Please choose another.',security:'Session-based authentication and seat availability checks.',continue:'Continue',featuredLabel:'FEATURED MOVIE'
  }
};
// حفظ حالة المستخدم والفيلم والمقاعد أثناء التصفح.
const state = { lang: localStorage.getItem('movie_house-lang') === 'en' ? 'en' : 'ar', config: null, user: null, filter: 'all', movieId: null, date: null, time: null, seats: new Set(), taken: new Set(), booking: null, authTab: 'login', authOpen: false, resetToken: null };
const app = document.getElementById('app');
const modalRoot = document.getElementById('modalRoot');
const $ = id => document.getElementById(id);
const t = key => dictionary[state.lang][key] || key;
// ترميز النصوص لمنع إدخال HTML غير موثوق.
const e = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money = n => Number(n || 0).toFixed(2) + (state.lang === 'ar' ? ' د.أ' : ' JOD');
const movieName = m => state.lang === 'ar' ? m.titleAr : m.title;
const genreName = genre => t(genre === 'sci-fi' ? 'sciFi' : genre);
const fmtDate = d => d ? new Intl.DateTimeFormat(state.lang === 'ar' ? 'ar-JO' : 'en-US', { day:'numeric',month:'short',year:'numeric',timeZone:'UTC' }).format(new Date(d+'T12:00:00Z')) : t('none');
const weekday = d => new Intl.DateTimeFormat(state.lang === 'ar' ? 'ar-JO' : 'en-US', { weekday:'short',timeZone:'UTC' }).format(new Date(d+'T12:00:00Z'));
const timeLabel = x => { if (!x) return t('none'); const [h,m]=x.split(':').map(Number); return state.lang === 'ar' ? `${((h+11)%12)+1}:${String(m).padStart(2,'0')} ${h>=12?'م':'ص'}` : `${((h+11)%12)+1}:${String(m).padStart(2,'0')} ${h>=12?'PM':'AM'}`; };
const dirArrow = () => state.lang === 'ar' ? '←' : '→';
const btn = (text, cls, attrs='') => `<button type="button" class="button ${cls}" ${attrs}>${text}</button>`;
// معرفة الوقت الحالي حسب توقيت عمّان.
const nowAmman = () => new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Amman',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date());
// منع اختيار موعد عرض انتهى وقته.
const availableTime = (date,time) => date !== state.config.today || time > nowAmman();
// البحث عن الفيلم باستخدام معرّفه.
const getMovie = id => state.config.movies.find(m => m.id === id);
// قراءة المسار الحالي من رابط الصفحة.
const parseRoute = () => (location.hash || '#/').slice(1).split('/').filter(Boolean);
const formatSeats = seats => seats.length ? seats.join(' · ') : t('none');

// إرسال طلبات للخادم ومعالجة أخطاء الاستجابة.
async function request(url, options={}) {
  const r = await fetch(url, { credentials:'same-origin', headers:{ 'Content-Type':'application/json' }, ...options });
  let json; try { json = await r.json(); } catch { throw new Error(t('error')); }
  if (!r.ok) { const err = new Error(json.error || t('error')); err.status=r.status; throw err; }
  return json;
}
function toast(message, isError=false) { const root=$('toastRoot'); root.innerHTML=`<div class="toast ${isError?'error':''}">${e(message)}</div>`; clearTimeout(toast.timer); toast.timer=setTimeout(()=>{root.textContent='';},3800); }
function setLanguage(lang) { state.lang=lang; localStorage.setItem('movie_house-lang',lang); document.documentElement.lang=lang; document.documentElement.dir=lang==='ar'?'rtl':'ltr'; $('langSwitch').textContent=lang==='ar'?'EN':'عربي'; document.querySelectorAll('[data-i18n]').forEach(el=>{el.textContent=t(el.dataset.i18n)}); updateHeader(); render(); if(state.authOpen) renderModal(); }
function updateHeader() {
  const c=$('accountControls');
  c.innerHTML=state.user ? `<div class="account-wrap"><button class="account-button" type="button" data-action="account"><span class="account-avatar">${e(state.user.name[0].toUpperCase())}</span><span class="account-name">${e(state.user.name.split(' ')[0])}</span></button><button class="logout-btn" type="button" data-action="logout">${t('logOut')}</button></div>` : btn(t('signIn'),'button-small button-outline','data-action="open-auth"');
  document.querySelectorAll('[data-nav]').forEach(a=>{const part=parseRoute()[0]||'home';a.classList.toggle('active',(part==='home'||part==='')&&a.dataset.nav==='home'||(part==='movie'||part==='movies')&&a.dataset.nav==='movies'||part==='bookings'&&a.dataset.nav==='bookings');});
}
function movieCard(m) { return `<article class="movie-card"><a href="#/movie/${e(m.id)}" class="poster" aria-label="${e(t('bookNow')+' '+movieName(m))}"><img src="${e(m.image)}" alt="${e(m.title)} movie artwork" loading="lazy"><div class="poster-top"><span class="age-tag">${e(m.age)}</span><span class="rating-tag"><span>★</span> ${m.rating}</span></div><div class="poster-title">${e(m.title)}</div></a><div class="movie-info"><div class="movie-meta"><span>${genreName(m.genre)}</span><i></i><span>${m.runtime} ${t('minutes')}</span><i></i><span>${m.year}</span></div><h3>${e(movieName(m))}</h3><div class="movie-bottom"><div class="price-label">${t('from')}<strong>${money(m.price)}</strong></div><a class="movie-book" href="#/movie/${e(m.id)}">${t('bookNow')} ${dirArrow()}</a></div></div></article>`; }
function genreFilters() { return `<div class="filters" role="group" aria-label="Genre filters">${['all','sci-fi','action','thriller','drama','adventure'].map(g=>`<button type="button" data-filter="${g}" class="filter-pill ${state.filter===g?'active':''}">${t(g==='sci-fi'?'sciFi':g)}</button>`).join('')}</div>`; }
function movieSection() {const filtered=state.config.movies.filter(m=>state.filter==='all'||m.genre===state.filter);return `<section class="section" id="movie-section"><div class="section-intro"><div><span class="eyebrow">${t('nowPlaying')}</span><h2 class="section-title">${t('movieSectionTitle')}</h2><p class="section-desc">${t('movieSectionDesc')}</p></div><a class="text-link" href="#/movies">${t('seeAll')} ${dirArrow()}</a></div>${genreFilters()}<div class="movie-grid">${filtered.map(movieCard).join('')}</div></section>`;}
function renderHome() {
  const hero=state.config.movies[0];
  app.innerHTML=`<div class="fadein"><section class="hero"><div class="hero-copy"><span class="eyebrow hero-kicker">${t('heroKicker')}</span><h1>${t('heroTitle')}</h1><p class="hero-text">${t('heroDesc')}</p><div class="hero-buttons"><a href="#/movies" class="button button-primary button-large">${t('explore')} ${dirArrow()}</a><a href="#/how" class="button button-outline button-large">${t('howItWorks')} ${dirArrow()}</a></div><div class="hero-trust"><div class="trust-avatars"><span>A</span><span>M</span><span>Y</span></div><span>★ ★ ★ ★ ★ &nbsp; ${t('trusted')}</span></div></div><div class="hero-art"><div class="hero-frame"><img src="${hero.image}" alt="Nebula Rising cinematic artwork"><div class="hero-frame-info"><span class="tag">${t('featuredLabel')}</span><h3>NEBULA<br>RISING</h3><p>SCI-FI · 128 MIN · 2026</p></div></div><div class="floating-rating"><span class="star">★</span><div><b>8.9 / 10</b><small>${t('featured')}</small></div></div><div class="floating-ticket"><small>${t('premium')}</small><strong>${t('featured')}</strong><div class="ticket-mini-meta">MOVIE HOUSE · 2026</div></div></div></section><section class="stats-strip"><div class="stat-item"><div class="stat-icon">${icons.ticket}</div><div><b>06</b><span>${t('moviesStat')}</span></div></div><div class="stat-item"><div class="stat-icon">${icons.calendar}</div><div><b>05</b><span>${t('datesStat')}</span></div></div><div class="stat-item"><div class="stat-icon">${icons.chair}</div><div><b>96</b><span>${t('seatsStat')}</span></div></div></section>${movieSection()}<section class="how-section" id="how-section"><span class="eyebrow">MOVIE HOUSE</span><h2>${t('simpleSteps')}</h2><div class="steps-row"><div class="how-step"><div class="step-icon">${icons.ticket}</div><h3>01 — ${t('stepOne')}</h3><p>${t('stepOneDesc')}</p></div><div class="how-step"><div class="step-icon">${icons.chair}</div><h3>02 — ${t('stepTwo')}</h3><p>${t('stepTwoDesc')}</p></div><div class="how-step"><div class="step-icon">${icons.check}</div><h3>03 — ${t('stepThree')}</h3><p>${t('stepThreeDesc')}</p></div></div></section></div>`;
  const route=parseRoute()[0]; if (route==='movies'||route==='how') requestAnimationFrame(()=>$(route==='how'?'how-section':'movie-section')?.scrollIntoView({behavior:'smooth',block:'start'}));
}
// حساب السعر المبدئي للمقاعد ورسوم الخدمة.
function currentPricing() {const m=getMovie(state.movieId);const seats=[...state.seats];const subtotal=seats.reduce((sum,s)=>sum+m.price+('GH'.includes(s[0])?2.5:0),0);const fee=seats.length*.5;return {subtotal,fee,total:subtotal+fee};}
function renderSeats() {
  const root=$('seatRoot');if(!root)return;
  let content=`<div class="screen-wrap"><div class="screen"></div><span>${t('screen')}</span></div><div class="seats-scroll"><div class="seat-map" role="group" aria-label="Seats">`;
  for(const row of 'ABCDEFGH') {content+=`<div class="seat-row"><span class="seat-row-label">${row}</span>`;for(let n=1;n<=12;n++){const id=row+n, isTaken=state.taken.has(id), isSelected=state.seats.has(id), vip='GH'.includes(row);if(n===7)content+='<span class="seat-gap" aria-hidden="true"></span>';content+=`<button type="button" class="seat ${isTaken?'taken':''} ${isSelected?'selected':''} ${vip?'vip':''}" data-seat="${id}" ${isTaken?'disabled':''} aria-pressed="${isSelected}" aria-label="${id} ${isTaken?t('taken'):isSelected?t('selected'):vip?'VIP':t('available')}">${n}</button>`}content+=`<span class="seat-row-label">${row}</span></div>`;}
  content+=`</div></div><div class="seat-legend"><span class="legend-item"><span class="legend-dot"></span>${t('available')}</span><span class="legend-item"><span class="legend-dot selected"></span>${t('selected')}</span><span class="legend-item"><span class="legend-dot taken"></span>${t('taken')}</span><span class="legend-item"><span class="legend-dot vip"></span>VIP</span></div><p class="seat-note">${t('vipNote')}</p>`;
  root.innerHTML=content;
}
function summaryMarkup() {
  const m=getMovie(state.movieId),p=currentPricing(),arr=[...state.seats].sort(),count=arr.length;
  return `<div class="summary-head">${icons.ticket}<h3>${t('orderSummary')}</h3></div><div class="summary-film"><img src="${e(m.image)}" alt=""><div><h4>${e(movieName(m))}</h4><span>${genreName(m.genre)} · ${m.runtime} ${t('minutes')}</span></div></div><div class="summary-rows"><div class="summary-line"><span>${t('date')}</span><strong>${fmtDate(state.date)}</strong></div><div class="summary-line"><span>${t('time')}</span><strong dir="ltr">${state.time?timeLabel(state.time):t('none')}</strong></div><div class="summary-line"><span>${t('seats')}</span><strong dir="ltr">${formatSeats(arr)}</strong></div></div><div class="price-breakdown"><div class="summary-line"><span>${t('tickets')} (${count})</span><strong>${money(p.subtotal)}</strong></div><div class="summary-line"><span>${t('serviceFee')}</span><strong>${money(p.fee)}</strong></div></div><div class="total-line"><span>${t('total')}</span><strong>${money(p.total)}</strong></div>${btn(count?t('confirm'):t('selectSeatFirst'),'button-primary button-block','data-action="confirm-booking" '+(!count?'disabled':''))}<p class="secure-note">${icons.lock}<span>${t('taxNote')}</span></p>`;
}
function renderSummary() {const root=$('summaryRoot');if(root)root.innerHTML=summaryMarkup(); const count=$('seatCount'); if(count)count.textContent=`${t('seatCount')}: ${state.seats.size}/8`;}
function renderBooking() {
  const m=getMovie(state.movieId);if(!m){location.hash='#/';return;}
  const dates=state.config.dates, validTimes=state.config.times.filter(x=>availableTime(state.date,x));
  app.innerHTML=`<div class="fadein"><div class="page-heading"><div class="crumbs"><a href="#/">${t('home')}</a><span>/</span><a href="#/movies">${t('navMovies')}</a><span>/</span><span>${e(movieName(m))}</span></div><h1>${t('bookingTitle')}</h1><p>${t('bookingIntro')}</p></div><div class="booking-grid"><div class="booking-main"><section class="booking-feature"><img src="${e(m.image)}" alt="${e(m.title)}"><div class="booking-feature-copy"><span class="feature-kicker">${t('nowShowing')}</span><h2>${e(movieName(m))}</h2><p>${e(state.lang==='ar'?m.descAr:m.desc)}</p><div class="feature-tags"><span>${genreName(m.genre)}</span><span>${m.runtime} ${t('minutes')}</span><span>★ ${m.rating}</span><span>${m.age}</span></div></div></section><section class="booking-section"><div class="booking-section-head"><span class="step-number">01</span><h3>${t('selectShowing')}</h3></div><div class="time-title">${t('chooseDate')}</div><div class="date-row">${dates.map((d,i)=>`<button type="button" data-date="${d}" class="date-chip ${d===state.date?'selected':''}"><span>${i===0?t('day0'):i===1?t('day1'):weekday(d)}</span><strong>${Number(d.slice(-2))}</strong><span>${new Intl.DateTimeFormat(state.lang==='ar'?'ar-JO':'en-US',{month:'short',timeZone:'UTC'}).format(new Date(d+'T12:00:00Z'))}</span></button>`).join('')}</div><div class="time-title">${t('chooseTime')}</div><div class="time-row">${state.config.times.map(x=>`<button type="button" data-time="${x}" class="time-chip ${x===state.time?'selected':''}" ${!availableTime(state.date,x)?'disabled':''}>${timeLabel(x)}</button>`).join('')}</div>${!validTimes.length?`<p class="seat-note">${t('noShowings')}</p>`:''}</section><section class="booking-section"><div class="booking-section-head"><span class="step-number">02</span><h3>${t('selectSeats')}</h3><small id="seatCount">${t('seatCount')}: ${state.seats.size}/8</small></div><div id="seatRoot"></div></section></div><aside class="summary-card" id="summaryRoot"></aside></div></div>`;
  renderSeats();renderSummary();
}
// تحديث المقاعد المحجوزة قبل تأكيد الاختيار.
async function refreshSeats() {
  if(!state.movieId||!state.date||!state.time)return;
  const signature=`${state.movieId}|${state.date}|${state.time}`;
  try{const data=await request(`/api/seats?movieId=${encodeURIComponent(state.movieId)}&date=${encodeURIComponent(state.date)}&time=${encodeURIComponent(state.time)}`);if(signature!==`${state.movieId}|${state.date}|${state.time}`)return;state.taken=new Set(data.taken);for(const s of state.taken)state.seats.delete(s);renderSeats();renderSummary();}
  catch(err){if(err.status===400){state.taken=new Set();state.seats.clear();renderSeats();renderSummary();}else toast(t('error'),true);}
}
function renderEmpty(kind) {const login=kind==='login';app.innerHTML=`<div class="fadein"><div class="page-heading"><div class="crumbs"><a href="#/">${t('home')}</a><span>/</span><span>${t('myBookings')}</span></div><h1>${t('myBookings')}</h1><p>${t('bookingsDesc')}</p></div><section class="empty-state"><div class="empty-icon">${icons.ticket}</div><h2>${login?t('needAccount'):t('noBookings')}</h2><p>${login?t('needAccountDesc'):t('noBookingsDesc')}</p>${login?btn(t('signIn'),'button-primary','data-action="open-auth"'):`<a href="#/movies" class="button button-primary">${t('explore')} ${dirArrow()}</a>`}</section></div>`;}
async function renderBookings() {
  if(!state.user){renderEmpty('login');return;}
  app.innerHTML=`<div class="loader"><span></span><span></span><span></span></div>`;
  try{const {bookings}=await request('/api/bookings');if(parseRoute()[0]!=='bookings')return;if(!bookings.length){renderEmpty('empty');return;}
  app.innerHTML=`<div class="fadein"><div class="page-heading"><div class="crumbs"><a href="#/">${t('home')}</a><span>/</span><span>${t('myBookings')}</span></div><h1>${t('myBookings')}</h1><p>${t('bookingsDesc')}</p></div><div class="reservation-list">${bookings.map(b=>`<article class="reservation-card"><img src="${e(b.movie.image)}" alt=""><div class="reservation-copy"><h3>${e(state.lang==='ar'?b.movie.titleAr:b.movie.title)}</h3><p>${fmtDate(b.date)} · ${timeLabel(b.time)} · ${e(b.seats.join(', '))}</p><span class="res-code">${e(b.code)}</span></div><div class="res-right"><span class="confirmed">✓ ${t('confirmedStatus')}</span><strong>${money(b.total)}</strong><a class="button button-small button-outline" href="#/ticket/${e(b.id)}">${t('viewTicket')}</a></div></article>`).join('')}</div></div>`;
  }catch{app.innerHTML=`<section class="empty-state"><h2>${t('error')}</h2>${btn(t('reload'),'button-primary','data-action="reload"')}</section>`;}
}
async function renderTicket(id) {
  if(!state.user){renderEmpty('login');return;}
  app.innerHTML=`<div class="loader"><span></span><span></span><span></span></div>`;
  try{const {bookings}=await request('/api/bookings');if(parseRoute()[0]!=='ticket')return;const b=bookings.find(x=>x.id===id);if(!b){location.hash='#/bookings';return;}state.booking=b;
  app.innerHTML=`<div class="ticket-stage fadein"><div class="success-mark">${icons.check}</div><div class="success-heading"><h1>${t('success')}</h1><p>${t('successDesc')}</p></div><article class="ticket"><div class="ticket-top"><span class="ticket-brand">MOVIE<span> HOUSE</span></span><span>${t('entryTicket')}</span></div><div class="ticket-body"><img src="${e(b.movie.image)}" alt="${e(b.movie.title)}"><div><h2>${e(state.lang==='ar'?b.movie.titleAr:b.movie.title)}</h2><p>${genreName(b.movie.genre)} · MOVIE HOUSE CINEMA</p><div class="ticket-meta"><div><small>${t('date')}</small><strong>${fmtDate(b.date)}</strong></div><div><small>${t('time')}</small><strong>${timeLabel(b.time)}</strong></div><div><small>${t('seats')}</small><strong dir="ltr">${e(b.seats.join(' · '))}</strong></div><div><small>${t('total')}</small><strong>${money(b.total)}</strong></div></div></div></div><div class="ticket-dash"></div><div class="ticket-bottom"><div class="ticket-code"><small>${t('ticketId')}</small><strong>${e(b.code)}</strong></div><div class="barcode" aria-label="Decorative ticket barcode"></div></div></article><div class="ticket-action-row">${btn(t('printTicket'),'button-primary','data-action="print"')}<a class="button button-outline" href="#/movies">${t('bookAnother')} ${dirArrow()}</a></div><p class="ticket-disclaimer">${t('ticketDemo')}</p></div>`;
  }catch{app.innerHTML=`<section class="empty-state"><h2>${t('error')}</h2></section>`;}
}
function render() {
  if(!state.config)return;
  updateHeader();const [route,arg]=parseRoute();
  if(route==='movie'){
    if(state.movieId!==arg){state.movieId=arg;state.date=state.config.dates[0];state.time=state.config.times.find(x=>availableTime(state.date,x))||state.config.times[0];state.seats.clear();state.taken.clear();} renderBooking();refreshSeats();
  }else if(route==='bookings')renderBookings();else if(route==='ticket')renderTicket(arg);else renderHome();
}
// شروط كلمة المرور هنا مطابقة لشروط التحقق في الخادم.
// فحص شروط كلمة المرور أثناء التسجيل والاستعادة.
function passwordChecks(password) {
  return {
    length: password.length >= 8 && password.length <= 128,
    lower: /[a-z]/.test(password),
    upper: /[A-Z]/.test(password),
    digit: /[0-9]/.test(password),
    symbol: /[^\p{L}\p{N}\s]/u.test(password)
  };
}
// إظهار نتيجة تحقق كلمة المرور للمستخدم.
function updatePasswordGuidance() {
  const input=$('authPassword');
  const rules=$('passwordRules');
  if (!input || !rules) return;
  const checks=passwordChecks(input.value);
  Object.entries(checks).forEach(([key, ok]) => {
    const li=rules.querySelector(`[data-password-rule="${key}"]`);
    if (!li) return;
    li.classList.toggle('passed',ok);
    li.querySelector('.rule-mark').textContent=ok?'✓':'○';
  });
  const allValid=Object.values(checks).every(Boolean);
  const hint=$('passwordFeedback');
  hint.textContent=allValid?t('pwStrong'):input.value?t('pwKeepGoing'):t('pwPrompt');
  hint.classList.toggle('success',allValid);
  input.setAttribute('aria-invalid',String(input.value.length>0&&!allValid));
  if (allValid) {const error=$('authError');if(error)error.textContent='';}
}
function passwordGuidanceMarkup() {
  const requirements=[['length','pwLength'],['lower','pwLower'],['upper','pwUpper'],['digit','pwDigit'],['symbol','pwSymbol']];
  return `<div class="password-guidance" id="passwordGuidance"><p class="rules-title">${t('passwordRulesTitle')}</p><ul class="password-rules" id="passwordRules">${requirements.map(([name,key])=>`<li data-password-rule="${name}"><span class="rule-mark" aria-hidden="true">○</span><span>${t(key)}</span></li>`).join('')}</ul><p class="password-feedback" id="passwordFeedback" aria-live="polite">${t('pwPrompt')}</p></div>`;
}
function passwordInputMarkup(isNew) {
  return `<div class="form-field"><label class="field-label" for="authPassword">${t(isNew?'newPassword':'password')}</label><div class="password-control"><input id="authPassword" name="password" type="password" autocomplete="${isNew?'new-password':'current-password'}" minlength="${isNew?8:1}" maxlength="128" placeholder="${t(isNew?'passwordPlaceholderStrong':'passwordPlaceholder')}" ${isNew?'aria-describedby="passwordGuidance"':''} required><button class="password-toggle" type="button" data-action="toggle-password" data-target="authPassword" aria-label="${t('showPassword')}" title="${t('showPassword')}" aria-pressed="false">${icons.eye}</button></div></div>`;
}
function renderModal() {
  if(!state.authOpen){modalRoot.innerHTML='';return;}
  const mode=state.authTab, signup=mode==='register', reset=mode==='reset', forgot=mode==='forgot', sent=mode==='forgotSent';
  const recovery=reset||forgot||sent;
  const title=sent?t('resetSentTitle'):forgot?t('resetTitle'):reset?t('newPasswordTitle'):t('welcome');
  const subtitle=sent?t('resetSentMessage'):forgot?t('resetSubtitle'):reset?t('newPasswordSubtitle'):t('welcomeSub');
  const tabs=recovery?'':`<div class="auth-tabs"><button type="button" class="auth-tab ${!signup?'active':''}" data-tab="login">${t('login')}</button><button type="button" class="auth-tab ${signup?'active':''}" data-tab="register">${t('createAccount')}</button></div>`;
  const emailField=`<label class="form-field"><span>${t('email')}</span><input name="email" type="email" autocomplete="email" placeholder="${t('emailPlaceholder')}" maxlength="254" required></label>`;
  let form='';
  if(forgot) {
    form=`<form id="forgotForm">${emailField}<p class="form-error" id="authError" aria-live="polite"></p><button class="button button-primary button-block" type="submit" id="submitAuth">${t('sendResetLink')}</button></form>`;
  } else if(reset) {
    form=`<form id="resetForm">${passwordInputMarkup(true)}<div class="form-field"><label class="field-label" for="confirmPassword">${t('confirmNewPassword')}</label><div class="password-control"><input id="confirmPassword" name="confirmPassword" type="password" autocomplete="new-password" minlength="8" maxlength="128" required><button class="password-toggle" type="button" data-action="toggle-password" data-target="confirmPassword" aria-label="${t('showPassword')}" title="${t('showPassword')}" aria-pressed="false">${icons.eye}</button></div></div>${passwordGuidanceMarkup()}<p class="form-error" id="authError" aria-live="polite"></p><button class="button button-primary button-block" type="submit" id="submitAuth">${t('resetPasswordButton')}</button></form>`;
  } else if(!sent) {
    form=`<form id="authForm">${signup?`<label class="form-field"><span>${t('fullName')}</span><input name="name" type="text" autocomplete="name" placeholder="${t('namePlaceholder')}" minlength="2" maxlength="70" required></label>`:''}${emailField}${passwordInputMarkup(signup)}${signup?passwordGuidanceMarkup():`<div class="forgot-link-row"><button type="button" class="text-action" data-action="forgot-password">${t('forgotPassword')}</button></div>`}<p class="form-error" id="authError" aria-live="polite"></p><button class="button button-primary button-block" type="submit" id="submitAuth">${signup?t('createAccount'):t('login')}</button></form>`;
  }
  const back=recovery?`<div class="auth-back"><button type="button" class="text-action" data-action="back-to-login">${t('backToLogin')}</button></div>`:'';
  modalRoot.innerHTML=`<div class="modal-overlay" id="modalOverlay"><div class="modal" role="dialog" aria-modal="true" aria-labelledby="authTitle"><button type="button" class="modal-close" data-action="close-auth" aria-label="Close">×</button><div class="modal-logo">${icons.lock}</div><h2 id="authTitle">${title}</h2><p class="modal-subtitle">${subtitle}</p>${tabs}${form}${back}${recovery?'':`<p class="auth-foot">${t('authFoot')}</p>`}</div></div>`;
  if(signup||reset)updatePasswordGuidance();
  const input=modalRoot.querySelector('input');if(input)input.focus();
}
function openAuth(tab='login'){state.authTab=tab;state.authOpen=true;renderModal();}
function closeAuth(){state.authOpen=false;state.resetToken=null;renderModal();}
// إرسال طلب استعادة الحساب أو تعيين كلمة مرور جديدة.
async function submitRecovery(form, mode) {
  const button=$('submitAuth'), error=$('authError');
  const data=Object.fromEntries(new FormData(form));
  if(mode==='reset'){
    if(!Object.values(passwordChecks(data.password||'')).every(Boolean)){error.textContent=t('pwError');updatePasswordGuidance();return;}
    if(data.password!==data.confirmPassword){error.textContent=t('passwordMismatch');return;}
    if(!state.resetToken){error.textContent=t('resetInvalid');return;}
  }
  button.disabled=true;button.textContent=t('loading');
  try {
    if(mode==='forgot'){
      await request('/api/auth/forgot-password',{method:'POST',body:JSON.stringify({email:data.email})});
      state.authTab='forgotSent';renderModal();
    } else {
      await request('/api/auth/reset-password',{method:'POST',body:JSON.stringify({token:state.resetToken,password:data.password})});
      state.user=null;state.resetToken=null;openAuth('login');updateHeader();toast(t('resetComplete'));
    }
  } catch(err) {
    error.textContent=err.status===503?t('resetUnavailable'):err.status===429?t('resetTooMany'):err.status===400&&mode==='reset'?t('resetInvalid'):err.message||t('error');
    button.disabled=false;button.textContent=t(mode==='forgot'?'sendResetLink':'resetPasswordButton');
  }
}
// قراءة رابط الاستعادة والتحقق من رمزه.
function openResetLinkIfPresent(){
  const [route,token]=parseRoute();
  if(route!=='reset')return;
  // إخفاء رمز الاستعادة من شريط العنوان بعد قراءته.
  history.replaceState(null,'',location.pathname+location.search+'#/');
  if(!token || !/^[A-Za-z0-9_-]{43}$/.test(token)){openAuth('forgot');toast(t('resetInvalid'),true);return;}
  state.resetToken=token;openAuth('reset');
}
// إرسال بيانات تسجيل الحساب أو الدخول للخادم.
async function submitAuth(form) {
  const data=Object.fromEntries(new FormData(form));
  if (state.authTab==='register' && !Object.values(passwordChecks(data.password||'')).every(Boolean)) {
    const error=$('authError');if(error)error.textContent=t('pwError');
    $('authPassword').focus();
    updatePasswordGuidance();
    return;
  }
  const button=$('submitAuth');button.disabled=true;button.textContent=t('loading');
  try{const result=await request(`/api/auth/${state.authTab==='register'?'register':'login'}`,{method:'POST',body:JSON.stringify(data)});state.user=result.user;closeAuth();updateHeader();toast(t('loginSuccess'));const route=parseRoute()[0];if(route==='bookings'||route==='ticket')render();}
  catch(err){const error=$('authError');if(error)error.textContent=err.message||t('authError');button.disabled=false;button.textContent=t(state.authTab==='register'?'createAccount':'login');}
}
// إرسال الحجز والتحقق من تسجيل الدخول وتعارض المقاعد.
async function confirmBooking() {
  if(!state.seats.size)return toast(t('selectSeatFirst'),true);
  if(!state.user){openAuth();toast(t('needLogin'));return;}
  const button=document.querySelector('[data-action="confirm-booking"]');if(button){button.disabled=true;button.textContent=t('loading');}
  try{const {booking}=await request('/api/bookings',{method:'POST',body:JSON.stringify({movieId:state.movieId,date:state.date,time:state.time,seats:[...state.seats]})});state.booking=booking;toast(t('justBooked'));location.hash=`#/ticket/${booking.id}`;}
  catch(err){if(err.status===409){toast(t('seatConflict'),true);await refreshSeats();}else if(err.status===401){state.user=null;updateHeader();openAuth();}else toast(err.message||t('error'),true);}
  finally{if(button){button.disabled=false;button.textContent=t('confirm');}}
}

// تنفيذ إجراءات المستخدم مثل الحجز والخروج واختيار المقاعد.
document.addEventListener('click',async event=>{
  const target=event.target.closest('[data-action],[data-filter],[data-seat],[data-date],[data-time],[data-tab]');if(!target)return;
  // تنفيذ الإجراء المطلوب بحسب الزر المضغوط.
  if(target.dataset.action){switch(target.dataset.action){case 'open-auth':openAuth();break;case 'close-auth':closeAuth();break;case 'forgot-password':openAuth('forgot');break;case 'back-to-login':state.resetToken=null;openAuth('login');break;case 'toggle-password':{const input=$(target.dataset.target||'authPassword');if(!input)break;const visible=input.type==='password';input.type=visible?'text':'password';target.setAttribute('aria-pressed',String(visible));target.setAttribute('aria-label',t(visible?'hidePassword':'showPassword'));target.title=t(visible?'hidePassword':'showPassword');target.innerHTML=visible?icons.eyeOff:icons.eye;break;}case 'account':location.hash='#/bookings';break;case 'logout':try{await request('/api/auth/logout',{method:'POST',body:'{}'});state.user=null;updateHeader();render();}catch{toast(t('error'),true);}break;case 'confirm-booking':confirmBooking();break;case 'print':window.print();break;case 'reload':render();break;}return;}
  // تصفية الأفلام حسب النوع المختار.
  if(target.dataset.filter){state.filter=target.dataset.filter;renderHome();$('movie-section')?.scrollIntoView({block:'start'});return;}
  // تغيير اليوم وإعادة جلب المقاعد المتاحة.
  if(target.dataset.date){state.date=target.dataset.date;state.time=state.config.times.find(x=>availableTime(state.date,x))||state.config.times[0];state.seats.clear();state.taken.clear();renderBooking();refreshSeats();return;}
  // تغيير وقت العرض وإعادة فحص المقاعد.
  if(target.dataset.time){state.time=target.dataset.time;state.seats.clear();state.taken.clear();renderBooking();refreshSeats();return;}
  // تحديد المقعد أو إلغاء تحديده بحد أقصى ثمانية.
  if(target.dataset.seat){const seat=target.dataset.seat;if(state.taken.has(seat))return;if(state.seats.has(seat))state.seats.delete(seat);else{if(state.seats.size>=8)return toast(t('seatMax'),true);state.seats.add(seat);}renderSeats();renderSummary();return;}
  // تحديد وضع الدخول أو إنشاء الحساب.
  if(target.dataset.tab){state.authTab=target.dataset.tab;renderModal();}
});
// إعادة فحص كلمة المرور عند الكتابة.
modalRoot.addEventListener('input',event=>{if(event.target.id==='authPassword'&&['register','reset'].includes(state.authTab))updatePasswordGuidance();});
// توجيه نماذج الحساب والاستعادة إلى الدوال المناسبة.
modalRoot.addEventListener('submit',event=>{if(event.target.id==='authForm'){event.preventDefault();submitAuth(event.target);}else if(['forgotForm','resetForm'].includes(event.target.id)){event.preventDefault();submitRecovery(event.target,state.authTab);}});
modalRoot.addEventListener('click',event=>{if(event.target.id==='modalOverlay')closeAuth();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&state.authOpen)closeAuth();});
$('langSwitch').addEventListener('click',()=>setLanguage(state.lang==='ar'?'en':'ar'));
window.addEventListener('hashchange',()=>{openResetLinkIfPresent();render();if(!['movies','how'].includes(parseRoute()[0]))window.scrollTo({top:0,behavior:'instant'});});
// تحميل بيانات الأفلام والجلسة عند تشغيل الموقع.
(async function boot(){
  setLanguage(state.lang);
  openResetLinkIfPresent();
  try{const [config,auth]=await Promise.all([request('/api/config'),request('/api/auth/me')]);state.config=config;state.user=auth.user;render();}
  catch(error){app.innerHTML=`<section class="empty-state"><h2>${t('error')}</h2><p>${e(error.message)}</p>${btn(t('reload'),'button-primary','data-action="reload"')}</section>`;}
})();