import React, { useState, useEffect } from "react";
import "./App.css";
import studioImg from './assets/studio.png';
import apartmentImg from './assets/apartment.png';
import loftImg from './assets/loft.png';
import logoImg from './assets/logo.png';
import { FaSun, FaMoon, FaEnvelope, FaMapMarkerAlt, FaPhone, FaClock } from 'react-icons/fa';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import CompareModal from './components/CompareModal';
import RentalModal from './components/RentalModal';

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
    feature3Text: "Хотите сдать свою недвижимость? Разместите объявление на LeaseON всего за несколько шагов. Мы поможем вам найти потенциальных арендаторов.",
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
  const [currentLanguage, setCurrentLanguage] = useState('uz');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [rentals, setRentals] = useState(rentalsData[currentLanguage]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [rentalsToCompare, setRentalsToCompare] = useState([]);
  const [showRentalModal, setShowRentalModal] = useState(false);
  const [selectedRental, setSelectedRental] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [savedRentals, setSavedRentals] = useState([]);
  const [searchResults, setSearchResults] = useState(rentalsData[currentLanguage]);

  const t = locales[currentLanguage];

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

   useEffect(() => {
    setRentals(rentalsData[currentLanguage].map(rental => ({ ...rental, isSaved: rental.isSaved || false, rating: rental.rating || 0 })));
    setSearchResults(rentalsData[currentLanguage].map(rental => ({ ...rental, isSaved: rental.isSaved || false, rating: rental.rating || 0 })));
  }, [currentLanguage]);


  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      localStorage.setItem('theme', 'light');
    } else {
      localStorage.setItem('theme', 'dark');
    }
  };

  const handleLanguageChange = (event) => {
    setCurrentLanguage(event.target.value);
  };

  const openLoginModal = () => setShowLoginModal(true);
  const openRegisterModal = () => setShowRegisterModal(true);

  const toggleCompare = (rental) => {
    setRentalsToCompare(prev =>
      prev.find(item => item.id === rental.id)
        ? prev.filter(item => item.id !== rental.id)
        : [...prev, rental]
    );
  };

  const openCompareModal = () => {
    if (rentalsToCompare.length > 0) {
      setShowCompareModal(true);
    }
  };

  const clearComparison = () => {
    setRentalsToCompare([]);
  };

  const openRentalModal = (rental) => {
    setSelectedRental(rental);
    setShowRentalModal(true);
    setCurrentImageIndex(0);
  };

  const closeRentalModal = () => {
    setSelectedRental(null);
    setShowRentalModal(false);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedRental && selectedRental.images) {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % selectedRental.images.length
      );
    }
  };

  const prevImage = () => {
    if (selectedRental && selectedRental.images) {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex - 1 + selectedRental.images.length) % selectedRental.images.length
      );
    }
  };

  const toggleSave = (rentalId) => {
    setRentals(prevRentals =>
      prevRentals.map(rental =>
        rental.id === rentalId ? { ...rental, isSaved: !rental.isSaved } : rental
      )
    );
  };

  const handleRating = (rentalId, rating) => {
    setRentals(prevRentals =>
      prevRentals.map(rental =>
        rental.id === rentalId ? { ...rental, rating: rating } : rental
      )
    );
  };

  const [showShareModal, setShowShareModal] = useState(false);
  const [sharingRentalId, setSharingRentalId] = useState(null);

  const openShareModal = (rentalId) => {
    setSharingRentalId(rentalId);
    setShowShareModal(true);
  };

  const closeShareModal = () => {
    setSharingRentalId(null);
    setShowShareModal(false);
  };

  const shareOnSocialMedia = (platform) => {
    console.log(`Sharing rental ${sharingRentalId} on ${platform}`);
    closeShareModal();
  };

  const [searchTermCity, setSearchTermCity] = useState('');
  const [searchTermBeds, setSearchTermBeds] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');

  const handleSearch = () => {
    const filteredRentals = rentals.filter(rental => {
      const cityMatch = searchTermCity === '' || rental.city.toLowerCase().includes(searchTermCity.toLowerCase());
      const bedsMatch = searchTermBeds === '' || (rental.beds && rental.beds.toString() === searchTermBeds);
      const priceMatch = selectedPrice === '' || rental.price === selectedPrice;
      return cityMatch && bedsMatch && priceMatch;
    });
    setSearchResults(filteredRentals);
  };

  useEffect(() => {
    handleSearch();
  }, [searchTermCity, searchTermBeds, selectedPrice, rentals]);


  return (
    <div className={`app ${isDarkMode ? 'dark' : ''}`}>
      <header>
        <a href="#" className="logo">
          <img src={logoImg} alt="LeaseON Logo" />
          LeaseON
        </a>
        <nav className="main-nav">
          <a href="#home-section">{t.home}</a>
          <a href="#rentals-section">{t.rentals}</a>
          <a href="#about-section">{t.about}</a>
          <a href="#about-section">{t.contact}</a>
        </nav>
        <div className="header-actions">
          <button onClick={openLoginModal}>{t.loginButton}</button>
          <button onClick={openRegisterModal}>{t.signupButton}</button>
          <button onClick={toggleDarkMode} className="dark-mode-toggle">
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
          <select value={currentLanguage} onChange={handleLanguageChange} className="lang-select">
            <option value="uz">UZ</option>
            <option value="ru">RU</option>
            <option value="en">EN</option>
          </select>
        </div>
      </header>
      <main>

        <section id="home-section" className="home-section">
          <div className="hero-content">
            <h1>{t.homeIntro}</h1>
            <div className="home-features">
              <div className="feature-item">
                <h3>{t.feature1Title}</h3>
                <p>{t.feature1Text}</p>
              </div>
              <div className="feature-item">
                <h3>{t.feature2Title}</h3>
                <p>{t.feature2Text}</p>
              </div>
              <div className="feature-item">
                <h3>{t.feature3Title}</h3>
                <p>{t.feature3Text}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="rentals-section" className="rentals-section">
          <h2>{t.rentals}</h2>
          <div className="search-bar">
            <select value={searchTermCity} onChange={(e) => setSearchTermCity(e.target.value)}>
              <option value="">{t.selectLocation}</option>
              {locales[currentLanguage].locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
            <select value={searchTermBeds} onChange={(e) => setSearchTermBeds(e.target.value)}>
              <option value="">{t.selectBedroom}</option>
              {locales[currentLanguage].bedroomOptions.map(beds => (
                <option key={beds} value={beds}>{beds}</option>
              ))}
            </select>
            <select value={selectedPrice} onChange={(e) => setSelectedPrice(e.target.value)}>
              <option value="">{t.selectPrice}</option>
              {locales[currentLanguage].prices.map(price => (
                <option key={price} value={price}>{price}</option>
              ))}
            </select>
            <button onClick={openCompareModal} disabled={rentalsToCompare.length < 2}>
              {t.compare} ({rentalsToCompare.length})
            </button>
          </div>

          <div className="rentals">
            {searchResults.map(rental => (
              <div key={rental.id} className="rental-card" onClick={() => openRentalModal(rental)}>
                <img src={rental.images[0]} alt={rental.title} />
                <div className="rental-info">
                  <h3>{rental.title}</h3>
                  <p className="rental-city">{rental.city}</p>
                  <p className="rental-beds">{rental.beds} beds</p>
                  <p className="rental-price">{rental.price}{rental.currency}</p>
                  <div className="rental-actions" onClick={(e) => e.stopPropagation()}>
                  <button
                    className={`action-btn ${rentalsToCompare.find(item => item.id === rental.id) ? 'active' : ''}`}
                    onClick={() => toggleCompare(rental)}
                  >
                    {t.compare}
                  </button>
                </div>
                </div>

              </div>
            ))}
          </div>
        </section>

        <section id="about-section" className="about-section">
          <h2>{t.about}</h2>
          <p>{t.aboutMainText}</p>
          <div className="about-cards">
            <div className="about-card">
              <h3>{locales[currentLanguage].aboutCard1Title}</h3>
              <p>{locales[currentLanguage].aboutCard1Text}</p>
            </div>
            <div className="about-card">
              <h3>{locales[currentLanguage].aboutCard2Title}</h3>
              <p>{locales[currentLanguage].aboutCard2Text}</p>
            </div>
            <div className="about-card">
              <h3>{locales[currentLanguage].aboutCard3Title}</h3>
              <p>{locales[currentLanguage].aboutCard3Text}</p>
            </div>
            <div className="about-card">
              <h3>{locales[currentLanguage].aboutCard4Title}</h3>
              <p>{locales[currentLanguage].aboutCard4Text}</p>
            </div>
          </div>
          <div className="about-stats">
            <div className="stat-item">
              <h2>{locales[currentLanguage].stat1Number}</h2>
              <p>{locales[currentLanguage].stat1Text}</p>
            </div>
            <div className="stat-item">
              <h2>{locales[currentLanguage].stat2Number}</h2>
              <p>{locales[currentLanguage].stat2Text}</p>
            </div>
            <div className="stat-item">
              <h2>{locales[currentLanguage].stat3Number}</h2>
              <p>{locales[currentLanguage].stat3Text}</p>
            </div>
            <div className="stat-item">
              <h2>{locales[currentLanguage].stat4Number}</h2>
              <p>{locales[currentLanguage].stat4Text}</p>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <h2>{t.contactFormTitle}</h2>
        <div className="contact-container">
          <div className="contact-form">
            <div className="form-group">
              <label htmlFor="contact-name">{t.contactFormNamePlaceholder}</label>
              <input type="text" id="contact-name" placeholder={t.contactFormNamePlaceholder} />
            </div>
            <div className="form-group">
              <label htmlFor="contact-email">{t.contactFormEmailPlaceholder}</label>
              <input type="email" id="contact-email" placeholder={t.contactFormEmailPlaceholder} />
            </div>
            <div className="form-group">
              <label htmlFor="contact-message">{t.contactFormMessagePlaceholder}</label>
              <textarea id="contact-message" placeholder={t.contactFormMessagePlaceholder} className="contact-textarea"></textarea>
            </div>
            <button type="submit">{t.contactFormButton}</button>
          </div>
          <div className="contact-info">
            <h3>{t.contactInfoTitle}</h3>
            <p><FaMapMarkerAlt /> <b>{t.addressLabel}:</b> {t.contactAddress}</p>
            <p><FaPhone /> <b>{t.phoneLabel}:</b> {t.contactPhone1}</p>
            <p style={{ marginLeft: '28px' }}>{t.contactPhone2}</p>
            <p><FaEnvelope /> <b>{t.emailLabel}:</b> {t.contactEmail1}</p>
            <p style={{ marginLeft: '28px' }}>{t.contactEmail2}</p>
            <p><FaClock /> <b>{t.workingHoursLabel}:</b> {t.workingHours}</p>
          </div>
        </div>

      </main>

      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} t={t} />}
      {showRegisterModal && <RegisterModal onClose={() => setShowRegisterModal(false)} t={t} />}
      {showCompareModal && <CompareModal onClose={() => { setShowCompareModal(false); clearComparison(); }} rentalsToCompare={rentalsToCompare} clearComparison={clearComparison} t={t} />}
      {showRentalModal && selectedRental && (
        <RentalModal
          rental={selectedRental}
          onClose={closeRentalModal}
          currentImageIndex={currentImageIndex}
          nextImage={nextImage}
          prevImage={prevImage}
          toggleSave={toggleSave}
          handleRating={handleRating}
          toggleCompare={toggleCompare}
          openShareModal={openShareModal}
          t={t}
        />
      )}
      {showShareModal && (
        <div className="modal-overlay">
          <div className="modal-content share-modal">
            <button className="modal-close" onClick={closeShareModal}>&times;</button>
            <h2>{t.share}</h2>
            <p>{t.shareTitle}</p>
            <div className="share-options">
              <button onClick={() => shareOnSocialMedia('facebook')}>Facebook</button>
              <button onClick={() => shareOnSocialMedia('twitter')}>Twitter</button>
              <button onClick={() => shareOnSocialMedia('linkedin')}>LinkedIn</button>
            </div>
          </div>
        </div>
      )}
      <footer>
        <div className="footer-container">
          <div className="footer-logo">
            <h3>{t.footerTitle}</h3>
            <p>{t.footerCopy}</p>
          </div>
          <div className="footer-links">
            <h4>{t.footerLinksTitle}</h4>
            <ul>
              <li><a href="#home-section">{t.footerLinkHome}</a></li>
              <li><a href="#rentals-section">{t.footerLinkRentals}</a></li>
              <li><a href="#about-section">{t.footerLinkAbout}</a></li>
              <li><a href="#about-section">{t.footerLinkContact}</a></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4>{t.footerContactTitle}</h4>
            <p><FaMapMarkerAlt /> {t.footerAddress}</p>
            <p><FaPhone /> {t.footerPhone}</p>
            <p><FaEnvelope /> {t.footerEmail}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;