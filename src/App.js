import React, { useState, useEffect } from "react";
import "./App.css";
import studioImg from './assets/studio.png';
import apartmentImg from './assets/apartment.png';
import loftImg from './assets/loft.png';
import { FaSun, FaMoon, FaEnvelope, FaMapMarkerAlt, FaPhone, FaClock } from 'react-icons/fa';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import CompareModal from './components/CompareModal';
import RentalModal from './components/RentalModal';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Leaflet uchun marker ikonini to'g'rilash
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const locales = {
  uz: {
    home: "Bosh sahifa",
    rentals: "Ijara e'lonlar",
    find: "Mukammal ijara toping",
    search: "Qidirish",
    explore: "Ijaralarni ko'rish",
    generate: "E'lonlar yaratish",
    simplify: "Ijarani oson qidiring",
    save: "Avtomatlashtirish bilan vaqtni tejang",
    ease: "E'lonni oson yarating",
    login: "Kirish",
    signup: "Ro'yxatdan o'tish",
    bedrooms: "Xonalar",
    selectLocation: "Hududni tanlang",
    selectPrice: "Narxni tanlang",
    selectBedroom: "Xonalar soni",
    emailLabel: "Email:",
    passwordLabel: "Parol:",
    usernameLabel: "Foydalanuvchi nomi:",
    confirmPasswordLabel: "Parolni takrorlash:",
    loginButton: "Kirish",
    signupButton: "Ro'yxatdan o'tish",
    clearFilter: "Tozalash",
    locations: ["Toshkent", "Samarqand", "Buxoro", "Andijon", "Namangan"],
    prices: ["$500-$1000", "$1000-$2000", "$2000+", "Har xil narxlar"],
    bedroomOptions: ["1", "2", "3", "4+"],
    homeIntro: "LeaseON - bu sizning mukammal ijarani topish va mulkingizni osonlik bilan e'lon qilish uchun yagona platformangiz. Biz sizga tez, xavfsiz va qulay xizmat ko'rsatishni maqsad qilganmiz.",
    feature1Title: "Keng qamrovli ma'lumotlar bazasi",
    feature1Text: "Minglab tekshirilgan e'lonlar orasidan o'zingizga mosini toping. Batafsil tavsiflar, yuqori sifatli fotosuratlar va joylashuv ma'lumotlari sizga to'g'ri tanlov qilishda yordam beradi.",
    feature2Title: "Qulay qidiruv filtrlari",
    feature2Text: "Manzil, narx, xonalar soni va boshqa ko'plab parametrlar bo'yicha qidiruvni sozlang. Vaqtingizni tejang va faqat sizga mos keladigan variantlarni ko'ring.",
    feature3Title: "Tez va oson e'lon berish",
    feature3Text: "Mulkingizni ijaraga bermoqchimisiz? LeaseON orqali bir necha qadamda e'lon joylashtiring. Biz sizga potentsial ijarachilarni topishga yordam beramiz.",
    aboutCard1Title: "Maqsadimiz",
    aboutCard1Text: "Bizning maqsadimiz - ijaraga berilgan mulklar haqida ma'lumotlar bazasini yaratish va ijaraga berilgan mulklar haqida ma'lumotlar bazasini yaratish.",
    aboutCard2Title: "Yutuqlarimiz",
    aboutCard2Text: "Bizning yutuqlarimiz - bizning jamoamizning tajribasi va professional mutaxassislaridan iborat.",
    aboutCard3Title: "Jamoamiz",
    aboutCard3Text: "Bizning jamoamiz - professional va tajribali mutaxassislardan iborat.",
    aboutCard4Title: "Qamrov",
    aboutCard4Text: "Bizning qamrovimiz - butun O'zbekiston bo'ylab efir va onlayn uzatish.",
    stat1Number: "1000+",
    stat1Text: "Kunlik Foydalanuvchilarimiz",
    stat2Number: "10+",
    stat2Text: "Aktiv E'lonlar",
    stat3Number: "8+",
    stat3Text: "Yillik Tajriba",
    stat4Number: "2+",
    stat4Text: "Toifalar",
    about: "Biz haqimizda",
    contact: "Aloqa",
    compare: "Solishtirish",
    share: "Ulashish",
    shareTitle: "Ushbu e'lonni ulashish uchun platformani tanlang:",
    saveButton: "Saqlash",
    locationLabel: "Joylashuv",
    priceLabel: "Narx",
    noRentalsToCompare: "Solishtirish uchun e'lon tanlanmagan.",
    clearComparisonButton: "Solishtiruvni tozalash",
    savedButton: "Saqlangan",
    noImages: "Rasmlar yo'q",
    aboutMainText: "LeaseON haqida ko'proq bilib oling. Bizning jamoamiz sizga eng yaxshi xizmatni ko'rsatishga intiladi.",
    aboutStatsTitle: "Bizning Ko'rsatkichlar",
    contactFormTitle: "Biz bilan bog'laning",
    contactFormNamePlaceholder: "Ismingiz",
    contactFormEmailPlaceholder: "Emailingiz",
    contactFormMessagePlaceholder: "Xabaringiz",
    contactFormButton: "Yuborish",
    contactInfoTitle: "Bog'lanish ma'lumotlari",
    addressLabel: "Manzil",
    contactAddress: "Farg'ona viloyati Farg'ona shahar Mustaqillik ko'chasi 185-uy",
    phoneLabel: "Telefon",
    contactPhone1: "+998 90 123 45 67",
    contactPhone2: "+998 90 765 43 21",
    contactEmail1: "info@leaseon.uz",
    contactEmail2: "reklama@leaseon.uz",
    workingHoursLabel: "Ish vaqti",
    workingHours: "Dushanba-Juma: 9:00-18:00 Shanba: 10:00-15:00",
    newsTitle: "Oxirgi Yangiliklar",
    newsPlaceholder: "Hozircha yangiliklar mavjud emas.",
    sendMessageHeading: "Xabar yuborish",
    footerTitle: "LeaseON",
    footerLinksTitle: "Havolalar",
    footerContactTitle: "Bog'lanish",
    footerLinkHome: "Bosh sahifa",
    footerLinkRentals: "Ijara e'lonlar",
    footerLinkAbout: "Biz haqimizda",
    footerLinkContact: "Aloqa",
    footerAddress: "Farg'ona viloyati Farg'ona shahar Mustaqillik ko'chasi 185-uy",
    footerPhone: "+998 90 123 45 67",
    footerEmail: "info@leaseon.uz",
    footerCopy: "© 2025 LeaseON. Barcha huquqlar himoyalangan."
  },
  ru: {
    home: "Главная",
    rentals: "Объявления аренды",
    find: "Найдите идеальную аренду",
    search: "Поиск",
    explore: "Посмотреть аренду",
    generate: "Создать объявления",
    simplify: "Упростите поиск аренды",
    save: "Экономьте время с автоматизацией",
    ease: "Легко создавайте объявления",
    login: "Войти",
    signup: "Регистрация",
    bedrooms: "спальни",
    selectLocation: "Выберите город",
    selectPrice: "Выберите цену",
    selectBedroom: "Количество комнат",
    emailLabel: "Email:",
    passwordLabel: "Пароль:",
    usernameLabel: "Имя пользователя:",
    confirmPasswordLabel: "Повторите пароль:",
    loginButton: "Войти",
    signupButton: "Зарегистрироваться",
    clearFilter: "Очистить",
    locations: ["Ташкент", "Самарканд", "Бухара", "Андижан", "Наманган"],
    prices: ["$500-$1000", "$1000-$2000", "$2000+", "Разные цены"],
    bedroomOptions: ["1", "2", "3", "4+"],
    homeIntro: "LeaseON - это инновационная онлайн-платформа, созданная для упрощения процесса аренды и сдачи недвижимости.",
    feature1Title: "Обширная база данных",
    feature1Text: "Найдите то, что подходит именно вам, среди тысяч проверенных объявлений. Подробные описания, высококачественные фотографии и информация о местоположении помогут вам сделать правильный выбор.",
    feature2Title: "Удобные фильтры поиска",
    feature2Text: "Настройте поиск по местоположению, цене, количеству комнат и многим другим параметрам. Экономьте время и просматривайте только те варианты, которые вам подходят.",
    feature3Title: "Быстрое и простое размещение объявлений",
    feature3Text: "Хотите сдать свою недвижимость? Разместите объявление на LeaseON в just a few steps. Мы поможем вам найти потенциальных арендаторов.",
    aboutCard1Title: "Наша Цель",
    aboutCard1Text: "Наша цель - создать базу данных объявлений о сдаче недвижимости и предоставить нашим пользователям максимальное количество информации для принятия правильного решения.",
    aboutCard2Title: "Наши Достижения",
    aboutCard2Text: "Наши ",
    aboutCard3Title: "Наша Команда",
    aboutCard3Text: "Команда профессионалов и опытных специалистов (Placeholder)",
    aboutCard4Title: "Охват",
    aboutCard4Text: "Вещание и онлайн-трансляция по всему Узбекистану (Placeholder)",
    stat1Number: "1000+",
    stat1Text: "Ежедневных Пользователей",
    stat2Number: "10+",
    stat2Text: "Активных Объявлений",
    stat3Number: "8+",
    stat3Text: "Лет Опыта",
    stat4Number: "2+",
    stat4Text: "Категорий",
    about: "О нас",
    contact: "Контакты",
    compare: "Сравнить",
    share: "Поделиться",
    shareTitle: "Выберите платформу для публикации этого объявления:",
    saveButton: "Сохранить",
    locationLabel: "Местоположение",
    priceLabel: "Цена",
    noRentalsToCompare: "Не выбрано объявлений для сравнения.",
    clearComparisonButton: "Очистить сравнение",
    savedButton: "Сохранено",
    noImages: "Нет изображений",
    aboutMainText: "Узнайте больше о LeaseON. Наша команда стремится предоставить вам лучший сервис.",
    aboutStatsTitle: "Наши Показатели",
    contactFormTitle: "Свяжитесь с нами",
    contactFormNamePlaceholder: "Ваше имя",
    contactFormEmailPlaceholder: "Ваш email",
    contactFormMessagePlaceholder: "Ваше сообщение",
    contactFormButton: "Отправить",
    contactInfoTitle: "Контактная информация",
    addressLabel: "Адрес",
    contactAddress: "Ферганская область, г. Фергана, ул. Мустакиллик, дом 185",
    phoneLabel: "Телефон",
    contactPhone1: "+998 90 123 45 67",
    contactPhone2: "+998 90 765 43 21",
    contactEmail1: "info@leaseon.uz",
    contactEmail2: "reklama@leaseon.uz",
    workingHoursLabel: "Время работы",
    workingHours: "Понедельник-Пятница: 9:00-18:00 Суббота: 10:00-15:00",
    newsTitle: "Последние Новости",
    newsPlaceholder: "Новостей пока нет.",
    sendMessageHeading: "Отправить сообщение",
    footerTitle: "LeaseON",
    footerLinksTitle: "Ссылки",
    footerContactTitle: "Контакты",
    footerLinkHome: "Главная",
    footerLinkRentals: "Объявления аренды",
    footerLinkAbout: "О нас",
    footerLinkContact: "Контакты",
    footerAddress: "Ферганская область, г. Фергана, ул. Мустакиллик, дом 185",
    footerPhone: "+998 90 123 45 67",
    footerEmail: "info@leaseon.uz",
    footerCopy: "© 2025 LeaseON. Все права защищены."
  },
  en: {
    home: "Home",
    rentals: "Rental Listings",
    find: "Find your perfect rental",
    search: "Search",
    explore: "Explore Rentals",
    generate: "Generate listings",
    simplify: "Simplify your rental search",
    save: "Save time with automation",
    ease: "Generate listing with ease",
    login: "Log in",
    signup: "Sign up",
    bedrooms: "bedrooms",
    selectLocation: "Select location",
    selectPrice: "Select price",
    selectBedroom: "Bedrooms",
    emailLabel: "Email:",
    passwordLabel: "Password:",
    usernameLabel: "Username:",
    confirmPasswordLabel: "Confirm Password:",
    loginButton: "Log in",
    signupButton: "Sign up",
    clearFilter: "Clear",
    locations: ["Tashkent", "Samarkand", "Bukhara", "Andijan", "Namangan"],
    prices: ["$500-$1000", "$1000-$2000", "$2000+", "Any price"],
    bedroomOptions: ["1", "2", "3", "4+"],
    homeIntro: "LeaseON is an innovative online platform designed to simplify the process of renting and listing properties.",
    feature1Title: "Extensive Database",
    feature1Text: "Find what suits you among thousands of verified listings. Detailed descriptions, high-quality photos, and location information will help you make the right choice.",
    feature2Title: "Convenient Search Filters",
    feature2Text: "Customize your search by location, price, number of bedrooms, and many other parameters. Save time and view only the options that suit you.",
    feature3Title: "Fast and Easy Listing",
    feature3Text: "Want to rent out your property? Post a listing on LeaseON in just a few steps. We will help you find potential tenants.",
    aboutCard1Title: "Our Goal",
    aboutCard1Text: "To provide our audience with the highest quality and engaging content (Placeholder)",
    aboutCard2Title: "Our Achievements",
    aboutCard2Text: "Our achievements and awards in the media industry (Placeholder)",
    aboutCard3Title: "Our Team",
    aboutCard3Text: "A team of professionals and experienced specialists (Placeholder)",
    aboutCard4Title: "Coverage",
    aboutCard4Text: "Broadcasting and online streaming throughout Uzbekistan (Placeholder)",
    stat1Number: "1000+",
    stat1Text: "Daily Users",
    stat2Number: "10+",
    stat2Text: "Active Listings",
    stat3Number: "8+",
    stat3Text: "Years of Experience",
    stat4Number: "2+",
    stat4Text: "Categories",
    about: "About",
    contact: "Contact",
    compare: "Compare",
    share: "Share",
    shareTitle: "Choose a platform to share this listing:",
    saveButton: "Save",
    locationLabel: "Location",
    priceLabel: "Price",
    noRentalsToCompare: "No rentals selected for comparison.",
    clearComparisonButton: "Clear comparison",
    savedButton: "Saved",
    noImages: "No images",
    aboutMainText: "Learn more about LeaseON. Our team is dedicated to providing you with the best service.",
    aboutStatsTitle: "Our Metrics",
    contactFormTitle: "Contact Us",
    contactFormNamePlaceholder: "Your Name",
    contactFormEmailPlaceholder: "Your Email",
    contactFormMessagePlaceholder: "Your Message",
    contactFormButton: "Send Message",
    contactInfoTitle: "Contact Information",
    addressLabel: "Address",
    contactAddress: "185 Mustaqillik St, Fergana city, Fergana region",
    phoneLabel: "Phone",
    contactPhone1: "+998 90 123 45 67",
    contactPhone2: "+998 90 765 43 21",
    contactEmail1: "info@leaseon.uz",
    contactEmail2: "reklama@leaseon.uz",
    workingHoursLabel: "Working Hours",
    workingHours: "Monday-Friday: 9:00-18:00 Saturday: 10:00-15:00",
    newsTitle: "Latest News",
    newsPlaceholder: "No news available yet.",
    sendMessageHeading: "Send Message",
    footerTitle: "LeaseON",
    footerLinksTitle: "Links",
    footerContactTitle: "Contact",
    footerLinkHome: "Home",
    footerLinkRentals: "Rental Listings",
    footerLinkAbout: "About",
    footerLinkContact: "Contact",
    footerAddress: "185 Mustaqillik St, Fergana city, Fergana region",
    footerPhone: "+998 90 123 45 67",
    footerEmail: "info@leaseon.uz",
    footerCopy: "© 2025 LeaseON. All rights reserved."
  }
};

const rentalsData = {
  uz: [
    {
      id: 'uz-0',
      title: "Keng Xonalar",
      price: "$1,000 /oy",
      city: "Toshkent, Yunusobod tumani, Amir Temur ko'chasi 12-uy",
      beds: "2 xona",
      img: studioImg,
      images: [studioImg, "/assets/studio2.png", "/assets/studio3.png"],
      description: "Toshkent markazida joylashgan keng va yorug' studio. Barcha qulayliklar mavjud: zamonaviy mebel, tezkor Wi-Fi, avtoturargoh, yaqin atrofda supermarket va park. Xavfsiz va osoyishta hudud, oilaviy va yolg'iz yashash uchun juda qulay."
    },
    {
      id: 'uz-1',
      title: "Markazdagi kvartira",
      price: "$1,500 /oy",
      city: "Samarqand, Registon ko'chasi 45-uy, 3-xonadon",
      beds: "1 xona",
      img: apartmentImg,
      images: [apartmentImg],
      description: "Samarqand markazida zamonaviy kvartira. Yangi ta'mir, barcha qulayliklar, keng balkon, konditsioner, lift va 24/7 qo'riqlash. Yaqin atrofda restoran va do'konlar mavjud."
    },
    {
      id: 'uz-2',
      title: "Zamonaviy dizaynli xona",
      price: "$2,000 /oy",
      city: "Buxoro, Mustaqillik ko'chasi 7-uy, 5-qavat",
      beds: "3 xona",
      img: loftImg,
      images: [loftImg],
      description: "Buxoroda joylashgan zamonaviy dizaynga asoslangan xonalar. Keng va yorug' xonalar, ochiq oshxona, zamonaviy texnika, sport zali va basseyn. Yaqin atrofda maktab va bolalar bog'chasi bor."
    },
  ],
  ru: [
    {
      id: 'ru-0',
      title: "Просторные квартиры",
      price: "$1,000 /мес",
      city: "Ташкент, Юнусабадский район, ул. Амира Темура, дом 12",
      beds: "2 комнаты",
      img: studioImg,
      images: [studioImg],
      description: "Просторная и светлая студия в центре Ташкента. Современная мебель, быстрый Wi-Fi, парковка, рядом супермаркет и парк. Безопасный и спокойный район, идеально для семьи и одиночек."
    },
    {
      id: 'ru-1',
      title: "Квартиры в центре",
      price: "$1,500 /мес",
      city: "Самарканд, ул. Регистан, дом 45, кв. 3",
      beds: "1 комната",
      img: apartmentImg,
      images: [apartmentImg],
      description: "Современная квартира в центре Самарканда. Новый ремонт, все удобства, большой балкон, кондиционер, лифт и круглосуточная охрана. Рядом рестораны и магазины."
    },
    {
      id: 'ru-2',
      title: "Современные квартиры",
      price: "$2,000 /мес",
      city: "Бухара, ул. Мустакиллик, дом 7, 5 этаж",
      beds: "3 комнаты",
      img: loftImg,
      images: [loftImg],
      description: "Современный лофт в Бухаре. Просторные и светлые комнаты, открытая кухня, современная техника, спортзал и бассейн. Рядом школа и детский сад."
    },
  ],
  en: [
  {
    id: 'en-0',
    title: "Spacious Apartments",
    price: "$1,000 /mo",
      city: "Tashkent, Yunusabad district, Amir Temur street 12",
      beds: "2 beds",
      img: studioImg,
      images: [studioImg],
      description: "A spacious and bright studio in the center of Tashkent. Modern furniture, fast Wi-Fi, parking, supermarket and park nearby. Safe and quiet area, perfect for families and singles."
  },
  {
    id: 'en-1',
    title: "Apartments in the Center",
    price: "$1,500 /mo",
      city: "Samarkand, Registan street 45, apt. 3",
    beds: "1 bed",
      img: apartmentImg,
      images: [apartmentImg],
      description: "A modern apartment in the center of Samarkand. New renovation, all amenities, large balcony, air conditioning, elevator, and 24/7 security. Restaurants and shops nearby."
  },
  {
      id: 'en-2',
      title: "Modern Apartments",
    price: "$2,000 /mo",
      city: "Bukhara, Mustaqillik street 7, 5th floor",
    beds: "3 beds",
      img: loftImg,
      images: [loftImg],
      description: "A modern loft located in Bukhara. Spacious and bright rooms, open kitchen, modern appliances, gym, and swimming pool. School and kindergarten nearby."
  },
  ]
};

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("uz");
  const [rentals, setRentals] = useState(rentalsData[language]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [compareList, setCompareList] = useState([]);
  const [showRentalModal, setShowRentalModal] = useState(false);
  const [selectedRental, setSelectedRental] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [savedRentals, setSavedRentals] = useState([]);
  const [ratings, setRatings] = useState({});
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareRentalId, setShareRentalId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [bedroomsFilter, setBedroomsFilter] = useState('');
  const [mapCenter, setMapCenter] = useState([40.7128, -74.0060]); 
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const t = locales[language];

  useEffect(() => {
    setRentals(rentalsData[language]);
  }, [language]);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const openLoginModal = () => setShowLoginModal(true);
  const openRegisterModal = () => setShowRegisterModal(true);

  const toggleCompare = (rental) => {
    setCompareList((prev) =>
      prev.find((r) => r.id === rental.id)
        ? prev.filter((r) => r.id !== rental.id)
        : [...prev, rental]
    );
  };

  const openCompareModal = () => {
    if (compareList.length > 0) {
      setShowCompareModal(true);
    }
  };

  const clearComparison = () => {
    setCompareList([]);
    setShowCompareModal(false);
  };

  const openRentalModal = (rental) => {
    setSelectedRental(rental);
    setCurrentImageIndex(0); 
    setShowRentalModal(true);
  };

  const closeRentalModal = () => {
    setShowRentalModal(false);
    setSelectedRental(null);
  };

  const nextImage = () => {
    if (selectedRental) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === selectedRental.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedRental) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? selectedRental.images.length - 1 : prevIndex - 1
      );
    }
  };

  const toggleSave = (rentalId) => {
    setSavedRentals((prev) =>
      prev.includes(rentalId)
        ? prev.filter((id) => id !== rentalId)
        : [...prev, rentalId]
    );
  };

  const handleRating = (rentalId, rating) => {
    setRatings((prev) => ({ ...prev, [rentalId]: rating }));
  };

  const openShareModal = (rentalId) => {
    setShareRentalId(rentalId);
    setShowShareModal(true);
  };

  const closeShareModal = () => {
    setShowShareModal(false);
  };

  const shareOnSocialMedia = (platform) => {
    const rentalUrl = `${window.location.origin}/rental/${shareRentalId}`;
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(rentalUrl)}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(rentalUrl)}&text=Check out this rental!`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(rentalUrl)}&text=Check out this rental!`;
        break;
      default:
        break;
    }
    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
    closeShareModal();
  };

  const handleSearch = () => {
    let filtered = rentals;

    if (searchTerm) {
      filtered = filtered.filter(rental =>
        rental.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (locationFilter) {
      filtered = filtered.filter(rental => rental.location === locationFilter);
    }
    if (priceFilter) {
      const [min, max] = priceFilter.replace(/[^0-9-]/g, '').split('-');
      filtered = filtered.filter(rental => {
        const price = parseInt(rental.price.replace(/[^0-9]/g, ''));
        if (max) {
          return price >= parseInt(min) && price <= parseInt(max);
        }
        return price >= parseInt(min);
      });
    }
    if (bedroomsFilter) {
      if (bedroomsFilter.includes('+')) {
        const minBeds = parseInt(bedroomsFilter.replace('+', ''));
        filtered = filtered.filter(rental => rental.bedrooms >= minBeds);
      } else {
        filtered = filtered.filter(
          (rental) => rental.bedrooms === parseInt(bedroomsFilter)
        );
      }
    }
    setSearchResults(filtered);
  };

  const findNearbyRentals = (lat, lng) => {
    const nearby = rentals.filter(rental => {
      const distance = L.latLng(lat, lng).distanceTo(L.latLng(rental.lat, rental.lng));
      return distance < 5000; // 5 km radius
    });
    setSearchResults(nearby);
  };


  const handleLocationSelect = (latlng) => {
    setMapCenter([latlng.lat, latlng.lng]);
    findNearbyRentals(latlng.lat, latlng.lng);
    setSelectedLocation(latlng);
  };


  return (
    <div className={`App ${darkMode ? "dark-mode" : "light-mode"}`}>
      <header className="header">
        <nav className="navbar">
          <div className="navbar-left">
          <a href="#home" className="brand">leaseON</a>
          </div>
          <div className="navbar-center">
            <a href="#home" className="nav-link">
              {t.home}
            </a>
            <a href="#rentals" className="nav-link">
              {t.rentals}
            </a>
            <a href="#about" className="nav-link">
              {t.about}
            </a>
            <a href="#contact" className="nav-link">
              {t.contact}
            </a>
          </div>
          <div className="navbar-right">
            <button onClick={openLoginModal} className="btn-login">
              {t.loginButton}
            </button>
            <button onClick={openRegisterModal} className="btn-signup">
              {t.signupButton}
            </button>
            <button onClick={toggleDarkMode} className="dark-mode-toggle">
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
            <select onChange={handleLanguageChange} value={language}>
              <option value="uz">UZ</option>
              <option value="ru">RU</option>
              <option value="en">EN</option>
            </select>
          </div>
        </nav>
      </header>
      <main>
        {/* Hero Section */}
        <section id="home" className="hero-section">
          <div className="hero-content">
            <h1>{t.find}</h1>
            <p>{t.homeIntro}</p>
            <div className="search-bar-container">
              <input
                type="text"
                placeholder={t.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
                <option value="">{t.selectLocation}</option>
                {t.locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
              </select>
              <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
                <option value="">{t.selectPrice}</option>
                {t.prices.map(price => <option key={price} value={price}>{price}</option>)}
              </select>
              <select value={bedroomsFilter} onChange={(e) => setBedroomsFilter(e.target.value)}>
                <option value="">{t.selectBedroom}</option>
                {t.bedroomOptions.map(bed => <option key={bed} value={bed}>{bed}</option>)}
              </select>
              <button onClick={handleSearch}>{t.search}</button>
            </div>
          </div>
        </section>


        {/* Features Section */}
        <section className="features-section">
          <div className="feature">
            <h3>{t.feature1Title}</h3>
            <p>{t.feature1Text}</p>
          </div>
          <div className="feature">
            <h3>{t.feature2Title}</h3>
            <p>{t.feature2Text}</p>
          </div>
          <div className="feature">
            <h3>{t.feature3Title}</h3>
            <p>{t.feature3Text}</p>
          </div>
        </section>

        {/* Rentals Section */}
        <section id="rentals" className="rentals-section">
          <h2>{t.rentals}</h2>
          <div className="rental-list">
            {(searchResults.length > 0 ? searchResults : rentals).map((rental) => (
              <div key={rental.id} className="rental-card">
                <img
                  src={rental.img}
                  alt={rental.title}
                  onClick={() => openRentalModal(rental)}
                />
                <div className="rental-info">
                  <h3>{rental.title}</h3>
                  <p>
                    {rental.city} | {rental.beds}
                  </p>
                  <p>{rental.price}</p>
                  <div className="rental-actions">
                    <button
                      onClick={() => toggleCompare(rental)}
                      className={compareList.find((r) => r.id === rental.id) ? 'active' : ''}
                    >
                      {t.compare}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {compareList.length > 0 && (
            <button onClick={openCompareModal} className="compare-btn">
              {t.compare} ({compareList.length})
            </button>
          )}
        </section>

        {/* About Section */}
        <section id="about" className="about-section">
          <div className="about-content">
            <h2>{t.about}</h2>
            <p>{t.aboutMainText}</p>
          </div>
          <div className="about-cards">
            <div className="about-card">
              <h3>{t.aboutCard1Title}</h3>
              <p>{t.aboutCard1Text}</p>
            </div>
            <div className="about-card">
              <h3>{t.aboutCard2Title}</h3>
              <p>{t.aboutCard2Text}</p>
            </div>
            <div className="about-card">
              <h3>{t.aboutCard3Title}</h3>
              <p>{t.aboutCard3Text}</p>
            </div>
            <div className="about-card">
              <h3>{t.aboutCard4Title}</h3>
              <p>{t.aboutCard4Text}</p>
            </div>
          </div>
          <div className="stats-section">
            <h3>{t.aboutStatsTitle}</h3>
            <div className="stats-container">
              <div className="stat-item">
                <span className="stat-number">{t.stat1Number}</span>
                <span className="stat-text">{t.stat1Text}</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{t.stat2Number}</span>
                <span className="stat-text">{t.stat2Text}</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{t.stat3Number}</span>
                <span className="stat-text">{t.stat3Text}</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{t.stat4Number}</span>
                <span className="stat-text">{t.stat4Text}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact-section">
            <div className="contact-container">
                <div className="contact-form-container">
                    <h3>{t.sendMessageHeading}</h3>
                    <form className="contact-form">
                        <div className="form-group">
                            <label htmlFor="name">{t.contactFormNamePlaceholder}</label>
                            <input type="text" id="name" placeholder={t.contactFormNamePlaceholder} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">{t.contactFormEmailPlaceholder}</label>
                            <input type="email" id="email" placeholder={t.contactFormEmailPlaceholder} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">{t.contactFormMessagePlaceholder}</label>
                            <textarea id="message" rows="5" placeholder={t.contactFormMessagePlaceholder}></textarea>
                        </div>
                        <button type="submit">{t.contactFormButton}</button>
                    </form>
                </div>
                <div className="contact-info-container">
                    <h3>{t.contactInfoTitle}</h3>
                    <div className="contact-info-item">
                        <FaMapMarkerAlt className="contact-icon" />
                        <div>
                            <strong>{t.addressLabel}:</strong>
                            <p>{t.contactAddress}</p>
                        </div>
                    </div>
                    <div className="contact-info-item">
                        <FaPhone className="contact-icon" />
                        <div>
                            <strong>{t.phoneLabel}:</strong>
                            <p>{t.contactPhone1}</p>
                            <p>{t.contactPhone2}</p>
                        </div>
                    </div>
                    <div className="contact-info-item">
                        <FaEnvelope className="contact-icon" />
                        <div>
                            <strong>Email:</strong>
                            <p><a href={`mailto:${t.contactEmail1}`}>{t.contactEmail1}</a></p>
                            <p><a href={`mailto:${t.contactEmail2}`}>{t.contactEmail2}</a></p>
                        </div>
                    </div>
                    <div className="contact-info-item">
                        <FaClock className="contact-icon" />
                        <div>
                            <strong>{t.workingHoursLabel}:</strong>
                            <p>{t.workingHours}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Map Section */}
        <section className="map-section">
            <h2>{t.selectLocation}</h2>
            <MapContainer center={mapCenter} zoom={13} style={{ height: '400px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationMarker onLocationSelect={handleLocationSelect} />
                {selectedLocation && <Marker position={selectedLocation} />}
            </MapContainer>
        </section>

      </main>

      {showLoginModal && (
        <LoginModal t={t} closeModal={() => setShowLoginModal(false)} />
      )}
      {showRegisterModal && (
        <RegisterModal t={t} closeModal={() => setShowRegisterModal(false)} />
      )}
      {showCompareModal && (
        <CompareModal
          t={t}
          rentals={compareList}
          closeModal={() => setShowCompareModal(false)}
          clearComparison={clearComparison}
          darkMode={darkMode}
        />
      )}
      {selectedRental && showRentalModal && (
        <RentalModal
          t={t}
          rental={selectedRental}
          closeModal={closeRentalModal}
          nextImage={nextImage}
          prevImage={prevImage}
          currentImageIndex={currentImageIndex}
          darkMode={darkMode}
        />
      )}

      {showShareModal && (
        <div className="modal-overlay" onClick={closeShareModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={closeShareModal}>
              &times;
            </span>
            <h3>{t.shareTitle}</h3>
            <div className="share-options">
              <button onClick={() => shareOnSocialMedia('facebook')}>Facebook</button>
              <button onClick={() => shareOnSocialMedia('telegram')}>Telegram</button>
              <button onClick={() => shareOnSocialMedia('twitter')}>Twitter</button>
            </div>
          </div>
        </div>
      )}

      <footer className="footer-section">
      <div className="footer-content">
        <div className="footer-logo">
          <h2>{t.footerTitle}</h2>
        </div>
        <div className="footer-links">
          <h3>{t.footerLinksTitle}</h3>
          <ul>
            <li><a href="#home">{t.footerLinkHome}</a></li>
            <li><a href="#rentals">{t.footerLinkRentals}</a></li>
            <li><a href="#about">{t.footerLinkAbout}</a></li>
            <li><a href="#contact">{t.footerLinkContact}</a></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h3>{t.footerContactTitle}</h3>
          <p><FaMapMarkerAlt /> {t.footerAddress}</p>
          <p><FaPhone /> {t.footerPhone}</p>
          <p><FaEnvelope /> {t.footerEmail}</p>
        </div>
      </div>
      <div className="footer-copy">
        <p>{t.footerCopy}</p>
      </div>
    </footer>
    </div>
  );
}

function LocationMarker({ onLocationSelect }) {
    useMapEvents({
        click(e) {
            onLocationSelect(e.latlng);
        },
    });
    return null;
}

export default App;