import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import logo from './assets/logo.png';
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

// Leaflet marker icon fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const locales = {
  uz: {
    home: "Bosh sahifa",
    rentals: "Ijara",
    about: "Biz haqimizda",
    contact: "Aloqa",
    find: "Mukammal ijarani toping",
    search: "Qidirish",
    loginButton: "Kirish",
    signupButton: "Ro'yxatdan o'tish",
    selectLocation: "Hududni tanlang",
    selectPrice: "Narxni tanlang",
    selectBedroom: "Xonalar soni",
    locations: ["Toshkent", "Samarqand", "Buxoro", "Andijon", "Namangan"],
    prices: ["$500-$1000", "$1000-$2000", "$2000+", "Har xil narxlar"],
    bedroomOptions: ["1", "2", "3", "4+"],
    homeIntro: "LeaseON - bu sizning mukammal ijarani topish va mulkingizni osonlik bilan e'lon qilish uchun yagona platformangiz.",
    featuresTitle: "Xususiyatlarimiz",
    feature1Title: "Keng qamrovli baza",
    feature1Text: "Minglab tekshirilgan e'lonlar orasidan o'zingizga mosini toping.",
    feature2Title: "Qulay qidiruv",
    feature2Text: "Manzil, narx, xonalar soni bo'yicha qidiruvni oson sozlang.",
    feature3Title: "Oson e'lon berish",
    feature3Text: "Mulkingizni ijaraga bermoqchimisiz? Bir necha qadamda e'lon joylashtiring.",
    aboutMainText: "LeaseON haqida ko'proq bilib oling. Bizning jamoamiz sizga eng yaxshi xizmatni ko'rsatishga intiladi.",
    aboutCard1Title: "Maqsadimiz",
    aboutCard1Text: "Ijaraga beriladigan mulklar uchun eng qulay platformani yaratish.",
    aboutCard2Title: "Yutuqlarimiz",
    aboutCard2Text: "Minglab mamnun mijozlar va ishonchli hamkorlar.",
    aboutCard3Title: "Jamoamiz",
    aboutCard3Text: "O'z ishining professional va tajribali mutaxassislari.",
    aboutStatsTitle: "Bizning Ko'rsatkichlar",
    stat1Number: "1000+",
    stat1Text: "Foydalanuvchilar",
    stat2Number: "500+",
    stat2Text: "Aktiv E'lonlar",
    stat3Number: "5+",
    stat3Text: "Yillik Tajriba",
    contactFormTitle: "Biz bilan bog'laning",
    sendMessageHeading: "Xabar yuborish",
    contactFormNamePlaceholder: "Ismingiz",
    contactFormEmailPlaceholder: "Emailingiz",
    contactFormMessagePlaceholder: "Xabaringiz",
    contactFormButton: "Yuborish",
    contactInfoTitle: "Bog'lanish ma'lumotlari",
    addressLabel: "Manzil",
    contactAddress: "Farg'ona, Mustaqillik ko'chasi, 185-uy",
    phoneLabel: "Telefon",
    contactPhone1: "+998 90 123 45 67",
    contactPhone2: "+998 90 765 43 21",
    contactEmail1: "info@leaseon.uz",
    contactEmail2: "support@leaseon.uz",
    workingHoursLabel: "Ish vaqti",
    workingHours: "Dushanba-Juma: 9:00-18:00",
    mapTitle: "Ijaralarni Xaritadan Toping",
    nearbyRentalsTitle: "Yaqin atrofdagi ijaralar",
    footerTitle: "LeaseON",
    footerCopy: "© 2025 LeaseON. Barcha huquqlar himoyalangan.",
    footerLinksTitle: "Havolalar",
    footerLinkHome: "Bosh sahifa",
    footerLinkRentals: "Ijara",
    footerLinkAbout: "Biz haqimizda",
    footerLinkContact: "Aloqa",
    footerContactTitle: "Bog'lanish",
    footerAddress: "Farg'ona, Mustaqillik ko'chasi, 185-uy",
    footerPhone: "+998 90 123 45 67",
    footerEmail: "info@leaseon.uz",
    compare: "Solishtirish",
    noRentalsToCompare: "Solishtirish uchun e'lonlar yo'q.",
    clearComparisonButton: "Tozalash",
    emailLabel: "Email:",
    passwordLabel: "Parol:",
    usernameLabel: "Foydalanuvchi nomi:",
    confirmPasswordLabel: "Parolni takrorlash:",
    noImages: "Rasmlar yo'q"
  },
  ru: {
    home: "Главная",
    rentals: "Аренда",
    about: "О нас",
    contact: "Контакты",
    find: "Найдите свою идеальную аренду",
    search: "Поиск",
    loginButton: "Войти",
    signupButton: "Регистрация",
    selectLocation: "Выберите город",
    selectPrice: "Выберите цену",
    selectBedroom: "Кол-во комнат",
    locations: ["Ташкент", "Самарканд", "Бухара", "Андижан", "Наманган"],
    prices: ["$500-$1000", "$1000-$2000", "$2000+", "Любая цена"],
    bedroomOptions: ["1", "2", "3", "4+"],
    homeIntro: "LeaseON - ваша единая платформа для поиска идеальной аренды и легкого размещения вашей недвижимости.",
    featuresTitle: "Наши Преимущества",
    feature1Title: "Обширная база",
    feature1Text: "Найдите то, что подходит вам, среди тысяч проверенных объявлений.",
    feature2Title: "Удобный поиск",
    feature2Text: "Легко настраивайте поиск по местоположению, цене и количеству комнат.",
    feature3Title: "Легкое размещение",
    feature3Text: "Хотите сдать свою недвижимость? Разместите объявление в несколько шагов.",
    aboutMainText: "Узнайте больше о LeaseON. Наша команда стремится предоставить вам лучший сервис.",
    aboutCard1Title: "Наша цель",
    aboutCard1Text: "Создать самую удобную платформу для аренды недвижимости.",
    aboutCard2Title: "Наши достижения",
    aboutCard2Text: "Тысячи довольных клиентов и надежных партнеров.",
    aboutCard3Title: "Наша команда",
    aboutCard3Text: "Профессионалы и опытные специалисты своего дела.",
    aboutStatsTitle: "Наши Показатели",
    stat1Number: "1000+",
    stat1Text: "Пользователей",
    stat2Number: "500+",
    stat2Text: "Активных объявлений",
    stat3Number: "5+",
    stat3Text: "Лет опыта",
    contactFormTitle: "Свяжитесь с нами",
    sendMessageHeading: "Отправить сообщение",
    contactFormNamePlaceholder: "Ваше имя",
    contactFormEmailPlaceholder: "Ваш email",
    contactFormMessagePlaceholder: "Ваше сообщение",
    contactFormButton: "Отправить",
    contactInfoTitle: "Контактная информация",
    addressLabel: "Адрес",
    contactAddress: "Фергана, ул. Мустакиллик, 185",
    phoneLabel: "Телефон",
    contactPhone1: "+998 90 123 45 67",
    contactPhone2: "+998 90 765 43 21",
    contactEmail1: "info@leaseon.uz",
    contactEmail2: "support@leaseon.uz",
    workingHoursLabel: "Рабочее время",
    workingHours: "Понедельник-Пятница: 9:00-18:00",
    mapTitle: "Найдите Аренду на Карте",
    nearbyRentalsTitle: "Аренда поблизости",
    footerTitle: "LeaseON",
    footerCopy: "© 2025 LeaseON. Все права защищены.",
    footerLinksTitle: "Ссылки",
    footerLinkHome: "Главная",
    footerLinkRentals: "Аренда",
    footerLinkAbout: "О нас",
    footerLinkContact: "Контакты",
    footerContactTitle: "Контакты",
    footerAddress: "Фергана, ул. Мустакиллик, 185",
    footerPhone: "+998 90 123 45 67",
    footerEmail: "info@leaseon.uz",
    compare: "Сравнить",
    noRentalsToCompare: "Нет объявлений для сравнения.",
    clearComparisonButton: "Очистить",
    emailLabel: "Email:",
    passwordLabel: "Пароль:",
    usernameLabel: "Имя пользователя:",
    confirmPasswordLabel: "Повторите пароль:",
    noImages: "Нет изображений"
  },
  en: {
    home: "Home",
    rentals: "Rentals",
    about: "About Us",
    contact: "Contact",
    find: "Find your perfect rental",
    search: "Search",
    loginButton: "Log In",
    signupButton: "Sign Up",
    selectLocation: "Select Location",
    selectPrice: "Select Price",
    selectBedroom: "Bedrooms",
    locations: ["Tashkent", "Samarkand", "Bukhara", "Andijan", "Namangan"],
    prices: ["$500-$1000", "$1000-$2000", "$2000+", "Any Price"],
    bedroomOptions: ["1", "2", "3", "4+"],
    homeIntro: "LeaseON is your one-stop platform to find the perfect rental and list your property with ease.",
    featuresTitle: "Our Features",
    feature1Title: "Extensive Database",
    feature1Text: "Find what suits you among thousands of verified listings.",
    feature2Title: "Convenient Search",
    feature2Text: "Easily customize your search by location, price, and number of rooms.",
    feature3Title: "Easy Listing",
    feature3Text: "Want to rent out your property? Post a listing in just a few steps.",
    aboutMainText: "Learn more about LeaseON. Our team is dedicated to providing you with the best service.",
    aboutCard1Title: "Our Goal",
    aboutCard1Text: "To create the most user-friendly platform for rental properties.",
    aboutCard2Title: "Our Achievements",
    aboutCard2Text: "Thousands of satisfied customers and trusted partners.",
    aboutCard3Title: "Our Team",
    aboutCard3Text: "Professionals and experienced specialists in their field.",
    aboutStatsTitle: "Our Metrics",
    stat1Number: "1000+",
    stat1Text: "Users",
    stat2Number: "500+",
    stat2Text: "Active Listings",
    stat3Number: "5+",
    stat3Text: "Years of Experience",
    contactFormTitle: "Contact Us",
    sendMessageHeading: "Send a Message",
    contactFormNamePlaceholder: "Your Name",
    contactFormEmailPlaceholder: "Your Email",
    contactFormMessagePlaceholder: "Your Message",
    contactFormButton: "Send",
    contactInfoTitle: "Contact Information",
    addressLabel: "Address",
    contactAddress: "Fergana, Mustaqillik st, 185",
    phoneLabel: "Phone",
    contactPhone1: "+998 90 123 45 67",
    contactPhone2: "+998 90 765 43 21",
    contactEmail1: "info@leaseon.uz",
    contactEmail2: "support@leaseon.uz",
    workingHoursLabel: "Working Hours",
    workingHours: "Monday-Friday: 9:00 AM - 6:00 PM",
    mapTitle: "Find Rentals on the Map",
    nearbyRentalsTitle: "Nearby Rentals",
    footerTitle: "LeaseON",
    footerCopy: "© 2025 LeaseON. All rights reserved.",
    footerLinksTitle: "Links",
    footerLinkHome: "Home",
    footerLinkRentals: "Rentals",
    footerLinkAbout: "About Us",
    footerLinkContact: "Contact",
    footerContactTitle: "Contact",
    footerAddress: "Fergana, Mustaqillik st, 185",
    footerPhone: "+998 90 123 45 67",
    footerEmail: "info@leaseon.uz",
    compare: "Compare",
    noRentalsToCompare: "No rentals to compare.",
    clearComparisonButton: "Clear",
    emailLabel: "Email:",
    passwordLabel: "Password:",
    usernameLabel: "Username:",
    confirmPasswordLabel: "Confirm Password:",
    noImages: "No images"
  }
};

const rentalsData = {
  uz: [
    { id: 'uz-0', title: "Keng Studio", price: "$1,000 /oy", city: "Toshkent", beds: "2", img: studioImg, lat: 41.2995, lng: 69.2401, images: [studioImg, "/assets/studio2.png", "/assets/studio3.png"], description: "Toshkent markazida joylashgan keng va yorug' studio." },
    { id: 'uz-1', title: "Markazdagi Kvartira", price: "$1,500 /oy", city: "Samarqand", beds: "1", img: apartmentImg, lat: 39.6542, lng: 66.9597, images: [apartmentImg], description: "Samarqand markazida zamonaviy kvartira." },
    { id: 'uz-2', title: "Zamonaviy Loft", price: "$2,000 /oy", city: "Buxoro", beds: "3", img: loftImg, lat: 39.7747, lng: 64.4286, images: [loftImg], description: "Buxoroda joylashgan zamonaviy dizaynga ega loft." },
  ],
  ru: [
    { id: 'ru-0', title: "Просторная Студия", price: "$1,000 /мес", city: "Ташкент", beds: "2", img: studioImg, lat: 41.2995, lng: 69.2401, images: [studioImg], description: "Просторная и светлая студия в центре Ташкента." },
    { id: 'ru-1', title: "Квартира в Центре", price: "$1,500 /мес", city: "Самарканд", beds: "1", img: apartmentImg, lat: 39.6542, lng: 66.9597, images: [apartmentImg], description: "Современная квартира в центре Самарканда." },
    { id: 'ru-2', title: "Современный Лофт", price: "$2,000 /мес", city: "Бухара", beds: "3", img: loftImg, lat: 39.7747, lng: 64.4286, images: [loftImg], description: "Лофт с современным дизайном в Бухаре." },
  ],
  en: [
    { id: 'en-0', title: "Spacious Studio", price: "$1,000 /mo", city: "Tashkent", beds: "2", img: studioImg, lat: 41.2995, lng: 69.2401, images: [studioImg], description: "A spacious and bright studio in the center of Tashkent." },
    { id: 'en-1', title: "Downtown Apartment", price: "$1,500 /mo", city: "Samarkand", beds: "1", img: apartmentImg, lat: 39.6542, lng: 66.9597, images: [apartmentImg], description: "A modern apartment in the center of Samarkand." },
    { id: 'en-2', title: "Modern Loft", price: "$2,000 /mo", city: "Bukhara", beds: "3", img: loftImg, lat: 39.7747, lng: 64.4286, images: [loftImg], description: "A modern loft located in Bukhara." },
  ]
};

const salesData = {
  uz: [
    { id: 'uz-s-0', title: "Yangi uy", price: "$80,000", city: "Toshkent", beds: "3", img: apartmentImg, lat: 41.2995, lng: 69.2401, images: [apartmentImg], description: "Toshkentda yangi, zamonaviy uy. Hovli, garaj va keng xonalar." },
    { id: 'uz-s-1', title: "Villa", price: "$150,000", city: "Samarqand", beds: "5", img: loftImg, lat: 39.6542, lng: 66.9597, images: [loftImg], description: "Samarqandda hashamatli villa. Hovli, basseyn va bog'." },
  ],
  ru: [
    { id: 'ru-s-0', title: "Новый дом", price: "$80,000", city: "Ташкент", beds: "3", img: apartmentImg, lat: 41.2995, lng: 69.2401, images: [apartmentImg], description: "Новый современный дом в Ташкенте. Двор, гараж и просторные комнаты." },
    { id: 'ru-s-1', title: "Вилла", price: "$150,000", city: "Самарканд", beds: "5", img: loftImg, lat: 39.6542, lng: 66.9597, images: [loftImg], description: "Роскошная вилла в Самарканде. Двор, бассейн и сад." },
  ],
  en: [
    { id: 'en-s-0', title: "New House", price: "$80,000", city: "Tashkent", beds: "3", img: apartmentImg, lat: 41.2995, lng: 69.2401, images: [apartmentImg], description: "A new, modern house in Tashkent. Yard, garage, and spacious rooms." },
    { id: 'en-s-1', title: "Villa", price: "$150,000", city: "Samarkand", beds: "5", img: loftImg, lat: 39.6542, lng: 66.9597, images: [loftImg], description: "Luxury villa in Samarkand. Yard, pool, and garden." },
  ]
};

function App() {
  const [activeTab, setActiveTab] = useState('rent'); // 'rent' or 'sale'
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("uz");
  const [rentals, setRentals] = useState(rentalsData[language]);
  const [sales, setSales] = useState(salesData[language]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [compareList, setCompareList] = useState([]);
  const [showRentalModal, setShowRentalModal] = useState(false);
  const [selectedRental, setSelectedRental] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [locationFilter, setLocationFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [bedroomsFilter, setBedroomsFilter] = useState('');
  const [filteredRentals, setFilteredRentals] = useState(rentals);
  const [filteredSales, setFilteredSales] = useState(sales);
  const [mapCenter, setMapCenter] = useState([41.2995, 69.2401]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [nearbyRentals, setNearbyRentals] = useState([]);
  const [nearbySales, setNearbySales] = useState([]);

  const t = locales[language];

  useEffect(() => {
    setRentals(rentalsData[language]);
    setSales(salesData[language]);
    setFilteredRentals(rentalsData[language]);
    setFilteredSales(salesData[language]);
    setCompareList([]);
  }, [language]);

  const handleSearch = useCallback(() => {
    let filtered = activeTab === 'rent' ? rentals : sales;
    if (locationFilter) {
      filtered = filtered.filter(r => r.city === locationFilter);
    }
    if (priceFilter) {
      const [min, max] = priceFilter.replace(/[^0-9-]/g, '').split('-');
      filtered = filtered.filter(r => {
        const price = parseInt(r.price.replace(/[^0-9]/g, ''));
        if (max) return price >= parseInt(min) && price <= parseInt(max);
        return price >= parseInt(min);
      });
    }
    if (bedroomsFilter) {
      if (bedroomsFilter.includes('+')) {
        const minBeds = parseInt(bedroomsFilter.replace('+', ''));
        filtered = filtered.filter(r => parseInt(r.beds) >= minBeds);
      } else {
        filtered = filtered.filter(r => r.beds === bedroomsFilter);
      }
    }
    if (activeTab === 'rent') setFilteredRentals(filtered);
    else setFilteredSales(filtered);
  }, [activeTab, rentals, sales, locationFilter, priceFilter, bedroomsFilter]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode-body' : '';
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const toggleCompare = (item) => {
    setCompareList(prev =>
      prev.find(r => r.id === item.id)
        ? prev.filter(r => r.id !== item.id)
        : [...prev, item]
    );
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
      setCurrentImageIndex(prev => (prev + 1) % selectedRental.images.length);
    }
  };

  const prevImage = () => {
    if (selectedRental) {
      setCurrentImageIndex(prev => (prev - 1 + selectedRental.images.length) % selectedRental.images.length);
    }
  };
  
  const handleLocationSelect = (latlng) => {
    setMapCenter([latlng.lat, latlng.lng]);
    setSelectedLocation(latlng);
    if (activeTab === 'rent') {
      const nearby = rentals.filter(rental => {
        const rentalLatLng = L.latLng(rental.lat, rental.lng);
        const distanceInMeters = latlng.distanceTo(rentalLatLng);
        return distanceInMeters <= 100000;
      });
      setNearbyRentals(nearby);
    } else {
      const nearby = sales.filter(sale => {
        const saleLatLng = L.latLng(sale.lat, sale.lng);
        const distanceInMeters = latlng.distanceTo(saleLatLng);
        return distanceInMeters <= 100000;
      });
      setNearbySales(nearby);
    }
  };
  
  function LocationMarker({ onLocationSelect }) {
    useMapEvents({
        click(e) {
            onLocationSelect(e.latlng);
        },
    });
    return null;
  }

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <header>
        <a href="#home" className="logo">
          <img src={logo} alt="leaseON Logo" />
          leaseON
        </a>
        <nav className="main-nav">
          <a href="#home">{t.home}</a>
          <a href="#rentals">{t.rentals}</a>
          <a href="#about">{t.about}</a>
          <a href="#contact">{t.contact}</a>
        </nav>
        <div className="header-actions">
          <button onClick={() => setShowLoginModal(true)}>{t.loginButton}</button>
          <button onClick={() => setShowRegisterModal(true)}>{t.signupButton}</button>
          <button onClick={toggleDarkMode} className="dark-mode-toggle">
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          <select onChange={handleLanguageChange} value={language} className="lang-select">
            <option value="uz">UZ</option>
            <option value="ru">RU</option>
            <option value="en">EN</option>
          </select>
        </div>
      </header>

      <main>
        <div style={{display:'flex', justifyContent:'center', marginBottom:24}}>
          <button className={activeTab==='rent' ? 'action-btn active' : 'action-btn'} onClick={()=>setActiveTab('rent')}>{t.rentals}</button>
          <button className={activeTab==='sale' ? 'action-btn active' : 'action-btn'} onClick={()=>setActiveTab('sale')}>{t.salesTitle || 'Sotuv'}</button>
        </div>
        <section id="rentals" className="home-section">
          <h2>{activeTab==='rent' ? t.rentals : (t.salesTitle || 'Sotiladigan uylar')}</h2>
          <div className="search-bar">
            <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
              <option value="">{t.selectLocation}</option>
              {t.locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>
            <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
              <option value="">{t.selectPrice}</option>
              {t.prices.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <select value={bedroomsFilter} onChange={(e) => setBedroomsFilter(e.target.value)}>
              <option value="">{t.selectBedroom}</option>
              {t.bedroomOptions.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
            {compareList.length > 1 && (
              <button onClick={() => setShowCompareModal(true)}>
                {t.compare} ({compareList.length})
              </button>
            )}
          </div>
          <div className="rentals">
            {(activeTab==='rent' ? filteredRentals : filteredSales).map((item) => (
              <div key={item.id} className="rental-card" onClick={() => openRentalModal(item)}>
                <img src={item.img} alt={item.title} />
                <div className="rental-info">
                  <h3 className="rental-city">{item.title}</h3>
                  <p>{item.city}</p>
                  <p className="rental-beds">{item.beds} xona</p>
                  <p>{item.price}</p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleCompare(item); }}
                  className={`action-btn ${compareList.find(r => r.id === item.id) ? 'active' : ''}`}
                >
                  {t.compare}
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="map-section">
          <h2>{t.mapTitle}</h2>
          <div className="map-container">
            <MapContainer center={mapCenter} zoom={6} style={{ height: '400px', width: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LocationMarker onLocationSelect={handleLocationSelect} />
              {selectedLocation && <Marker position={selectedLocation} />}
              {(activeTab==='rent' ? filteredRentals : filteredSales).map(item => (
                <Marker key={item.id} position={[item.lat, item.lng]} />
              ))}
            </MapContainer>
            {(activeTab==='rent' ? nearbyRentals.length > 0 : nearbySales.length > 0) && (
              <div className="nearby-rentals">
                <h3>{t.nearbyRentalsTitle}</h3>
                {(activeTab==='rent' ? nearbyRentals : nearbySales).map(item => (
                  <div key={item.id} className="nearby-rental-item" onClick={() => openRentalModal(item)}>
                    <h4>{item.title}</h4>
                    <p>{item.price}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section id="about" className="about-section">
          <h2>{t.about}</h2>
          <p>{t.aboutMainText}</p>
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
          </div>
          <div className="about-stats">
            <div className="stat-item">
              <h2>{t.stat1Number}</h2>
              <p>{t.stat1Text}</p>
            </div>
            <div className="stat-item">
              <h2>{t.stat2Number}</h2>
              <p>{t.stat2Text}</p>
            </div>
            <div className="stat-item">
              <h2>{t.stat3Number}</h2>
              <p>{t.stat3Text}</p>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <h2>{t.contactFormTitle}</h2>
          <div className="contact-container">
            <div className="contact-form">
              <h3>{t.sendMessageHeading}</h3>
              <form>
                <label htmlFor="name">{t.contactFormNamePlaceholder}</label>
                <input type="text" id="name" name="name" />
                <label htmlFor="email">{t.contactFormEmailPlaceholder}</label>
                <input type="email" id="email" name="email" />
                <label htmlFor="message">{t.contactFormMessagePlaceholder}</label>
                <textarea id="message" name="message" className="contact-textarea"></textarea>
                <button type="submit">{t.contactFormButton}</button>
              </form>
            </div>
            <div className="contact-info">
              <h3>{t.contactInfoTitle}</h3>
              <p><FaMapMarkerAlt /> <b>{t.addressLabel}:</b> <span>{t.contactAddress}</span></p>
              <p><FaPhone /> <b>{t.phoneLabel}:</b> <span>{t.contactPhone1}</span></p>
              <p className="second-phone"><span>{t.contactPhone2}</span></p>
              <p><FaEnvelope /> <b>Email:</b> <span>{t.contactEmail1}</span></p>
              <p className="second-phone"><span>{t.contactEmail2}</span></p>
              <p><FaClock /> <b>{t.workingHoursLabel}:</b> <span>{t.workingHours}</span></p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-container">
          <div className="footer-logo">
            <h3>{t.footerTitle}</h3>
            <p>{t.footerCopy}</p>
          </div>
          <div className="footer-links">
            <h4>{t.footerLinksTitle}</h4>
            <ul>
              <li><a href="#home">{t.footerLinkHome}</a></li>
              <li><a href="#rentals">{t.footerLinkRentals}</a></li>
              <li><a href="#about">{t.footerLinkAbout}</a></li>
              <li><a href="#contact">{t.footerLinkContact}</a></li>
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

      {showLoginModal && <LoginModal t={t} closeModal={() => setShowLoginModal(false)} />}
      {showRegisterModal && <RegisterModal t={t} closeModal={() => setShowRegisterModal(false)} />}
      {showCompareModal && <CompareModal t={t} rentals={compareList} closeModal={() => setShowCompareModal(false)} clearComparison={() => setCompareList([])} darkMode={darkMode} />}
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
    </div>
  );
}

export default App;