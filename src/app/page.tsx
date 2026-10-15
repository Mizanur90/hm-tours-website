'use client';

import React, { useState, useEffect } from 'react';
import { packagesData, galleryArchive, PackageDetail } from '@/data/packages';
import { 
  Phone, Mail, MapPin, ShieldCheck, Award, Plane, Hotel, 
  FileText, CheckCircle2, MessageCircle, Clock, Compass, 
  HeartHandshake, Star, X, Utensils, Info, Check, Upload, 
  Trash2, Plus, Edit3, Lock, Unlock 
} from 'lucide-react';

interface GalleryItem {
  id: string | number;
  title: string;
  location: string;
  tag: string;
  img: string;
  isCustom?: boolean;
}

export default function Home() {
  const [packagesList, setPackagesList] = useState<PackageDetail[]>(packagesData);
  const [selectedPkg, setSelectedPkg] = useState<PackageDetail | null>(null);
  const [activeTab, setActiveTab] = useState<'All' | 'Hajj' | 'Umrah'>('All');
  const [galleryFilter, setGalleryFilter] = useState<string>('সব');
  const [galleryList, setGalleryList] = useState<GalleryItem[]>(galleryArchive);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Admin States
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPinModal, setAdminPinModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [editingPkg, setEditingPkg] = useState<PackageDetail | null>(null);
  const [showPkgFormModal, setShowPkgFormModal] = useState(false);

  // Gallery Form State
  const [newTitle, setNewTitle] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newTag, setNewTag] = useState('এজেন্সির স্মৃতি');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Package Form State
  const [pkgFormData, setPkgFormData] = useState<PackageDetail>({
    id: '',
    title: '',
    type: 'Umrah',
    badge: 'বিশেষ অফার',
    duration: '১৪ দিন',
    price: '১,৪৫,০০০ ৳',
    hotelMakkah: 'হারামের নিকটে ৩-স্টার হোটেল',
    hotelMadinah: 'মারকাজিয়া কেন্দ্রীয় এলাকা',
    flight: 'সরাসরি ফ্লাইট',
    food: '৩ বেলা বাংলা খাবার',
    features: ['রিটার্ন টিকিট', 'ওমরাহ ভিসা', 'মক্কা-মদিনা জিয়ারাহ', 'অভিজ্ঞ গাইড'],
    inclusions: ['বিমান টিকিট', 'ভিসা ও ইন্স্যুরেন্স', 'হোটেল কক্ষ'],
    exclusions: ['ব্যক্তিগত কেনাকাটা'],
    popular: false
  });

  useEffect(() => {
    const savedPackages = localStorage.getItem('hm_packages_list');
    if (savedPackages) {
      try { setPackagesList(JSON.parse(savedPackages)); } catch (e) { console.error(e); }
    }
    const savedGallery = localStorage.getItem('hm_custom_gallery');
    if (savedGallery) {
      try {
        const parsed: GalleryItem[] = JSON.parse(savedGallery);
        setGalleryList([...parsed, ...galleryArchive]);
      } catch (e) { console.error(e); }
    }
  }, []);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '1234') {
      setIsAdmin(true);
      setAdminPinModal(false);
      setPinInput('');
      alert('এডমিন মোড চালু হয়েছে! এখন প্যাকেজ এডিট ও নতুন যোগ করতে পারবেন।');
    } else {
      alert('ভুল পিন! সঠিক পিন: 1234');
    }
  };

  const openEditPackage = (pkg: PackageDetail) => {
    setEditingPkg(pkg);
    setPkgFormData({ ...pkg });
    setShowPkgFormModal(true);
  };

  const openAddPackage = () => {
    setEditingPkg(null);
    setPkgFormData({
      id: 'pkg-' + Date.now(),
      title: '',
      type: 'Umrah',
      badge: 'নতুন প্যাকেজ',
      duration: '১৪ দিন',
      price: '',
      hotelMakkah: '',
      hotelMadinah: '',
      flight: 'আন্তর্জাতিক ফ্লাইট',
      food: '৩ বেলা বাংলা খাবার',
      features: ['রিটার্ন এয়ার টিকিট', 'সৌদি ভিসা', 'মক্কা ও মদিনা জিয়ারাহ'],
      inclusions: ['বিমান টিকিট', 'ভিসা ও ইন্স্যুরেন্স', 'হোটেল বুকিং'],
      exclusions: ['ব্যক্তিগত কেনাকাটা'],
      popular: false
    });
    setShowPkgFormModal(true);
  };

  const handleSavePackage = (e: React.FormEvent) => {
    e.preventDefault();
    let updated: PackageDetail[];
    if (editingPkg) {
      updated = packagesList.map(p => p.id === editingPkg.id ? pkgFormData : p);
    } else {
      updated = [pkgFormData, ...packagesList];
    }
    setPackagesList(updated);
    localStorage.setItem('hm_packages_list', JSON.stringify(updated));
    setShowPkgFormModal(false);
  };

  const handleDeletePackage = (id: string) => {
    if (confirm('প্যাকেজটি মুছে ফেলতে চান?')) {
      const updated = packagesList.filter(p => p.id !== id);
      setPackagesList(updated);
      localStorage.setItem('hm_packages_list', JSON.stringify(updated));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewImage || !newTitle) return;
    const newItem: GalleryItem = {
      id: Date.now().toString(),
      title: newTitle,
      location: newLocation || 'সৌদি আরব সফর',
      tag: newTag,
      img: previewImage,
      isCustom: true
    };
    const updated = [newItem, ...galleryList];
    setGalleryList(updated);
    localStorage.setItem('hm_custom_gallery', JSON.stringify(updated.filter(i => i.isCustom)));
    setNewTitle('');
    setNewLocation('');
    setPreviewImage(null);
    setShowUploadModal(false);
  };

  const handleDeletePhoto = (id: string | number) => {
    if (confirm('ছবিটি মুছে ফেলতে চান?')) {
      const updated = galleryList.filter(item => item.id !== id);
      setGalleryList(updated);
      localStorage.setItem('hm_custom_gallery', JSON.stringify(updated.filter(i => i.isCustom)));
    }
  };

  const filteredPackages = activeTab === 'All' ? packagesList : packagesList.filter(p => p.type === activeTab);
  const filteredGallery = galleryFilter === 'সব' ? galleryList : galleryList.filter(g => g.tag === galleryFilter);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-amber-200">
      
      {/* 1. Top Credentials Bar */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-2 px-4 border-b border-amber-600/30">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="flex items-center gap-1.5 text-amber-400 font-bold">
              <ShieldCheck className="w-4 h-4 text-amber-400" /> সরকারি অনুমোদিত হজ লাইসেন্স নং: ০৮০১
            </span>
            <span className="hidden lg:inline text-emerald-700">|</span>
            <span className="hidden lg:inline text-emerald-200">IATA Accredited • HAAB & ATAB Member</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => isAdmin ? setIsAdmin(false) : setAdminPinModal(true)}
              className="inline-flex items-center gap-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 px-3 py-1 rounded-full border border-amber-500/30 transition text-[11px] font-bold cursor-pointer"
            >
              {isAdmin ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
              <span>{isAdmin ? 'এডমিন লগআউট' : 'এডমিন প্যানেল'}</span>
            </button>
            <a href="tel:+8801711416890" className="flex items-center gap-1 text-emerald-200 hover:text-white font-semibold">
              <Phone className="w-3.5 h-3.5 text-amber-400" /> +88 01711416890
            </a>
          </div>
        </div>
      </div>

      {/* 2. Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-900 via-emerald-800 to-amber-600 flex items-center justify-center text-amber-200 shadow-md font-black text-xl border border-amber-400/30">
              HM
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 block leading-tight">
                <span className="text-emerald-800">H.M.</span> Tours & Travels
              </span>
              <p className="text-[11px] text-slate-500 font-semibold">হজ লাইসেন্স নং: ৮০১ • বিশ্বস্ত কাফেলা</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-7 font-bold text-sm text-slate-700">
            <a href="#packages" className="hover:text-emerald-700 transition">প্যাকেজসমূহ</a>
            <a href="#services" className="hover:text-emerald-700 transition">সেবাসমূহ</a>
            <a href="#archive" className="hover:text-emerald-700 transition">স্মৃতি আর্কাইভ</a>
            <a href="#process" className="hover:text-emerald-700 transition">হজের ধাপসমূহ</a>
            <a href="#contact" className="hover:text-emerald-700 transition">যোগাযোগ</a>
          </nav>

          <a 
            href="https://wa.me/8801711416890?text=আসসালামু%20আলাইকুম,%20আমি%20হজ/ওমরাহ%20প্যাকেজ%20সম্পর্কে%20জানতে%20চাই।" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-900 text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md transition"
          >
            <MessageCircle className="w-4 h-4 text-emerald-200" />
            <span>সরাসরি কথা বলুন</span>
          </a>
        </div>
      </header>

      {/* 3. Hero */}
      <section className="relative text-white py-24 px-6 overflow-hidden bg-slate-950">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 transform scale-105 filter blur-[1px]"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=1600&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/95 via-emerald-950/90 to-slate-950/95" />

        <div className="max-w-4xl mx-auto space-y-6 text-center relative z-10">
          <p className="text-amber-300 font-serif text-lg tracking-widest opacity-90">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <div className="inline-flex items-center gap-2 bg-emerald-900/80 border border-amber-400/40 px-5 py-1.5 rounded-full text-xs sm:text-sm text-amber-300 font-bold shadow-lg">
            <Award className="w-4 h-4 text-amber-400" /> সরকার অনুমোদিত বিশ্বস্ত হজ ও ওমরাহ এজেন্সি
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            পবিত্র কাবা ও মদিনার সফরে <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100">
              আপনার বিশ্বস্ত ও আন্তরিক কাফেলা
            </span>
          </h1>
          <p className="text-emerald-100/90 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
            H.M. Tours & Travels দীর্ঘ অভিজ্ঞতা ও সুনামের সাথে হাজীদের সার্বক্ষণিক সেবা, হারামের কাছে উন্নত আবাসন, অভিজ্ঞ আলেম দ্বারা সঠিক দিকনির্দেশনা এবং আরামদায়ক ফ্লাইট নিশ্চিত করে।
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <a href="#packages" className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 text-slate-950 font-black px-8 py-3.5 rounded-xl shadow-xl transition transform hover:-translate-y-0.5">
              প্যাকেজগুলো দেখুন
            </a>
            <a href="#contact" className="bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3.5 rounded-xl border border-white/25 transition">
              অফিসে যোগাযোগ করুন
            </a>
          </div>
        </div>
      </section>

      {/* 4. Badges */}
      <section className="max-w-6xl mx-auto -mt-8 px-4 grid grid-cols-2 lg:grid-cols-4 gap-3 relative z-20">
        {[
          { label: 'হজ লাইসেন্স নম্বর', val: 'Govt. 0801', sub: 'ধর্ম মন্ত্রণালয় অনুমোদিত' },
          { label: 'আন্তর্জাতিক স্বীকৃতি', val: 'IATA Accredited', sub: 'গ্লোবাল স্ট্যান্ডার্ড' },
          { label: 'সদস্যপদ', val: 'HAAB Member', sub: 'হজ এজেন্সিজ অ্যাসোসিয়েশন' },
          { label: 'ট্রাভেল পার্টনার', val: 'ATAB Member', sub: 'অ্যাসোসিয়েশন অব ট্রাভেল এজেন্টস' },
        ].map((badge, idx) => (
          <div key={idx} className="bg-white p-4 sm:p-5 rounded-2xl shadow-xl border-t-4 border-emerald-700 text-center hover:border-amber-500 transition">
            <p className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">{badge.label}</p>
            <p className="text-base sm:text-lg font-black text-emerald-950 mt-1">{badge.val}</p>
            <p className="text-[11px] text-slate-500 mt-0.5">{badge.sub}</p>
          </div>
        ))}
      </section>

      {/* 5. Packages */}
      <section id="packages" className="max-w-6xl mx-auto py-20 px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 border-b border-slate-200 pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest font-extrabold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
              পবিত্র সফর প্যাকেজসমূহ
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-2">আপনার সুবিধার প্যাকেজটি বেছে নিন</h2>
          </div>
          {isAdmin && (
            <button
              onClick={openAddPackage}
              className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-5 py-2.5 rounded-xl shadow-md transition text-sm cursor-pointer"
            >
              <Plus className="w-4 h-4 text-amber-300" />
              <span>নতুন প্যাকেজ তৈরি করুন</span>
            </button>
          )}
        </div>

        <div className="flex justify-center gap-2 mb-10">
          {(['All', 'Umrah', 'Hajj'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === tab 
                  ? 'bg-emerald-900 text-amber-200 shadow-md border border-amber-500/30' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-500'
              }`}
            >
              {tab === 'All' ? 'সকল প্যাকেজ' : tab === 'Umrah' ? 'ওমরাহ প্যাকেজ' : 'হজ প্যাকেজ'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <div 
              key={pkg.id} 
              className={`bg-white rounded-3xl border-2 p-7 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative ${
                pkg.popular ? 'border-amber-400 ring-4 ring-amber-400/10' : 'border-slate-200'
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-3.5 right-6 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-black px-4 py-1 rounded-full shadow-md flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-current" /> {pkg.badge || 'জনপ্রিয় চয়েস'}
                </span>
              )}

              {isAdmin && (
                <div className="mb-4 bg-amber-50 border border-amber-200 p-2 rounded-xl flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-900">এডমিন কন্ট্রোল:</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => openEditPackage(pkg)} 
                      className="flex items-center gap-1 bg-emerald-700 text-white px-2.5 py-1 rounded-lg hover:bg-emerald-800 transition cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> এডিট
                    </button>
                    <button 
                      onClick={() => handleDeletePackage(pkg.id)} 
                      className="flex items-center gap-1 bg-rose-600 text-white px-2.5 py-1 rounded-lg hover:bg-rose-700 transition cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> মুছুন
                    </button>
                  </div>
                </div>
              )}

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg">
                  {pkg.type === 'Hajj' ? 'পবিত্র হজ' : 'ওমরাহ সফর'}
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-3 leading-snug">{pkg.title}</h3>
                <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold mt-2.5">
                  <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{pkg.duration}</span>
                </div>
                <div className="mt-5 mb-6 pb-6 border-b border-slate-100">
                  <span className="text-3xl font-black text-emerald-900">{pkg.price}</span>
                  <span className="text-slate-500 text-xs font-medium"> / জনপ্রতি</span>
                </div>
                <ul className="space-y-3 text-sm text-slate-600">
                  {pkg.features.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 space-y-2 pt-4 border-t border-slate-100">
                <button
                  onClick={() => setSelectedPkg(pkg)}
                  className="w-full py-3 rounded-xl font-bold text-sm bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Info className="w-4 h-4" /> বিস্তারিত সেবা দেখুন
                </button>
                <a
                  href={`https://wa.me/8801711416890?text=আসসালামু%20আলাইকুম,%20আমি%20"${pkg.title}"%20প্যাকেজটিতে%20সিট%20বুকিং/বিস্তারিত%20জানতে%20আগ্রহী।`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3 rounded-xl font-bold text-sm text-center block transition shadow-md ${
                    pkg.popular ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-black' : 'bg-emerald-800 hover:bg-emerald-900 text-white'
                  }`}
                >
                  সিট বুকিং করুন
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Photo Archive */}
      <section id="archive" className="bg-slate-950 text-white py-20 px-6 relative overflow-hidden border-t border-slate-800">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 border-b border-slate-800 pb-8">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest font-extrabold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3.5 py-1.5 rounded-full inline-block">
                ঐতিহাসিক স্থান ও কাফেলা মেমরি
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold">পবিত্র হারামাইন ও জিয়ারাহ স্মৃতি আর্কাইভ</h2>
              <p className="text-slate-400 text-sm max-w-xl">
                সম্মানিত হাজীদের স্মরণীয় মুহূর্ত ও পবিত্র ভূমির আলোকচিত্রমালা।
              </p>
            </div>
            <button
              onClick={() => setShowUploadModal(true)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 text-slate-950 font-black px-5 py-3 rounded-xl shadow-xl transition transform hover:scale-105 shrink-0 text-sm cursor-pointer"
            >
              <Plus className="w-5 h-5 stroke-[2.5]" />
              <span>নতুন ছবি আপলোড করুন</span>
            </button>
          </div>

          <div className="flex justify-center gap-2 mb-8 flex-wrap">
            {['সব', 'মক্কা', 'মদিনা', 'জিয়ারাহ', 'হজ স্মৃতি', 'এজেন্সির স্মৃতি'].map((filter) => (
              <button
                key={filter}
                onClick={() => setGalleryFilter(filter)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  galleryFilter === filter ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-850 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item) => (
              <div key={item.id} className="group relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-lg hover:border-amber-400/50 transition-all duration-300">
                <div className="h-64 overflow-hidden relative">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <span className="absolute top-3 right-3 bg-emerald-800/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-md backdrop-blur-xs">
                    {item.tag}
                  </span>
                  {item.isCustom && (
                    <button
                      onClick={() => handleDeletePhoto(item.id)}
                      title="মুছুন"
                      className="absolute top-3 left-3 bg-rose-600 hover:bg-rose-700 text-white p-2 rounded-lg transition shadow cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="p-4 relative">
                  <p className="text-xs text-amber-400 font-medium">{item.location}</p>
                  <h4 className="text-base font-bold text-white mt-1 group-hover:text-amber-300 transition">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Process */}
      <section id="process" className="max-w-6xl mx-auto py-20 px-6">
        <div className="text-center mb-12 space-y-2">
          <span className="text-xs uppercase tracking-widest font-extrabold text-emerald-800">সহজ নিয়মাবলী</span>
          <h2 className="text-3xl font-extrabold text-slate-900">কীভাবে আমাদের কাফেলায় যুক্ত হবেন?</h2>
          <p className="text-slate-500 text-sm">মাত্র ৫টি সহজ ধাপে আপনার পবিত্র সফরের প্রক্রিয়া সম্পন্ন করুন</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { step: '০১', title: 'প্যাকেজ নির্বাচন', desc: 'পছন্দের তারিখ ও বাজেট অনুসারে প্যাকেজ বেছে নিন।' },
            { step: '০২', title: 'পাসপোর্ট জমা', desc: 'নূন্যতম ৬ মাস মেয়াদী পাসপোর্ট ও ছবি অফিসে জমা দিন।' },
            { step: '০৩', title: 'ভিসা ও টিকিট', desc: 'আমাদের টিম দ্রুততম সময়ে সৌদি ভিসা ও টিকিট নিশ্চিত করবে।' },
            { step: '০৪', title: 'প্রাক-প্রশিক্ষণ', desc: 'অভিজ্ঞ আলেম দ্বারা হজের হুকুম-আহকামের প্রশিক্ষণ নিন।' },
            { step: '০৫', title: 'পবিত্র সফর শুরু', desc: 'আমাদের মোয়াল্লিমের সার্বক্ষণিক তত্ত্বাবধানে দোয়া ও ইবাদত।' },
          ].map((s, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 text-center hover:shadow-md transition">
              <span className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-black text-sm flex items-center justify-center mx-auto mb-3">
                {s.step}
              </span>
              <h4 className="font-bold text-slate-900 text-base mb-1">{s.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Services */}
      <section id="services" className="bg-emerald-50/60 py-20 px-6 border-y border-emerald-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 space-y-2">
            <span className="text-xs uppercase tracking-widest font-bold text-emerald-800">আমাদের দক্ষতাসমূহ</span>
            <h2 className="text-3xl font-bold text-slate-900">যেসব সেবা বিশ্বস্ততার সাথে প্রদান করি</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Compass, title: 'হজ ও ওমরাহ কাফেলা', desc: 'অভিজ্ঞ মোয়াল্লিমের তত্ত্বাবধানে সম্পূর্ণ শরিয়াহসম্মত পরিচালনা।' },
              { icon: Plane, title: 'এয়ার টিকিট (Air Ticket)', desc: 'ঘরোয়া ও আন্তর্জাতিক সকল রুটের সাশ্রয়ী মূল্যে ফ্লাইট টিকিট।' },
              { icon: Hotel, title: 'হোটেল বুকিং (Hotel Booking)', desc: 'মক্কা ও মদিনার হারাম শরীফের কাছে ৩, ৪ ও ৫ স্টার মানের হোটেল।' },
              { icon: FileText, title: 'ভিসা সহায়তা (Visa Support)', desc: 'সৌদি ও অন্যান্য দেশের দ্রুততম ভিসা প্রসেসিং সাপোর্ট।' },
              { icon: HeartHandshake, title: 'হলিডে প্যাকেজ (Holiday Packages)', desc: 'পরিবার ও গ্রুপ ভ্রমণের জন্য স্পেশাল দেশি-বিদেশি ট্যুর প্যাকেজ।' },
              { icon: ShieldCheck, title: 'সার্বক্ষণিক খেদমত', desc: 'সফরকালীন যেকোনো প্রয়োজনে প্রবীণ ও অসুস্থ হাজীদের বিশেষ যত্ন।' },
            ].map((srv, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-400 hover:shadow-lg transition">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center mb-4">
                  <srv.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{srv.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{srv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Contact */}
      <section id="contact" className="py-20 px-6 bg-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 space-y-2">
            <span className="text-xs uppercase tracking-widest font-bold text-emerald-800">অফিসের ঠিকানা ও যোগাযোগ</span>
            <h2 className="text-3xl font-bold text-slate-900">আমাদের সাথে যোগাযোগের মাধ্যম</h2>
            <p className="text-slate-600 text-sm">সরাসরি আমাদের কার্যালয়ে আসুন অথবা ফোনে যেকোনো তথ্য জানুন</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-7 rounded-3xl shadow-md border border-slate-200">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">কাস্টমার সার্ভিস কর্মকর্তা</span>
              <h3 className="text-2xl font-black text-slate-900 mt-4">মোঃ মিজানুর রহমান</h3>
              <p className="text-xs font-semibold text-slate-500">Manager Customer Service (VISA)</p>
              <div className="mt-6 space-y-3.5 text-sm">
                <a href="tel:+8801711416890" className="flex items-center gap-3 text-slate-700 hover:text-emerald-700 font-semibold">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>+88 01711416890</span>
                </a>
                <a href="mailto:mizankona@gmail.com" className="flex items-center gap-3 text-slate-700 hover:text-emerald-700 font-semibold">
                  <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>mizankona@gmail.com</span>
                </a>
                <a 
                  href="https://wa.me/8801711416890" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="mt-5 inline-flex items-center justify-center gap-2 w-full bg-emerald-800 hover:bg-emerald-900 text-white py-3 rounded-xl font-bold text-sm shadow-md transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>হোয়াটসঅ্যাপে সরাসরি মেসেজ</span>
                </a>
              </div>
            </div>

            <div className="bg-white p-7 rounded-3xl shadow-md border border-slate-200">
              <div className="flex items-center gap-2 text-emerald-800 mb-4">
                <MapPin className="w-5 h-5 shrink-0" />
                <h3 className="text-lg font-bold text-slate-900">প্রধান কার্যালয় (Head Office)</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                Cosmic Tower (8th Floor)<br />
                Room # 8A, 106/ka, Box Culvert Road,<br />
                Naya Paltan, Dhaka-1000, Bangladesh.
              </p>
              <div className="mt-6 pt-5 border-t border-slate-100 text-sm text-slate-700 space-y-1">
                <p><strong>টেলিফোন:</strong> +88 02 222222118</p>
                <p><strong>মোবাইল:</strong> +88 01711416890</p>
              </div>
            </div>

            <div className="bg-white p-7 rounded-3xl shadow-md border border-slate-200">
              <div className="flex items-center gap-2 text-emerald-800 mb-4">
                <MapPin className="w-5 h-5 shrink-0" />
                <h3 className="text-lg font-bold text-slate-900"> শাখা কার্যালয় (Branch Office)</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                আহমদপুর, মৌখাড়া রোড,<br />
                বড়াইগ্রাম, নাটোর।
              </p>
              <div className="mt-6 pt-5 border-t border-slate-100 text-sm text-slate-700 space-y-1">
                <p><strong>মোবাইল:</strong> 01716-853895</p>
                <p className="text-xs text-slate-500 mt-2">নাটোর, পাবনা ও রাজশাহী অঞ্চলের গ্রাহকদের বিশেষ সেবা পয়েন্ট</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Package Modal */}
      {selectedPkg && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-2xl rounded-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            <button 
              onClick={() => setSelectedPkg(null)} 
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="pr-6">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md">
                {selectedPkg.type === 'Hajj' ? 'পবিত্র হজ' : 'ওমরাহ কাফেলা'}
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-2">{selectedPkg.title}</h3>
              <p className="text-xl font-extrabold text-emerald-800 mt-1">{selectedPkg.price} <span className="text-xs text-slate-500 font-normal">/ জনপ্রতি</span></p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
              <div className="flex items-start gap-2">
                <Hotel className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div><strong>মক্কার হোটেল:</strong><p className="text-slate-600">{selectedPkg.hotelMakkah}</p></div>
              </div>
              <div className="flex items-start gap-2">
                <Hotel className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div><strong>মদিনার হোটেল:</strong><p className="text-slate-600">{selectedPkg.hotelMadinah}</p></div>
              </div>
              <div className="flex items-start gap-2">
                <Plane className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div><strong>এয়ারলাইন্স:</strong><p className="text-slate-600">{selectedPkg.flight}</p></div>
              </div>
              <div className="flex items-start gap-2">
                <Utensils className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div><strong>খাবার:</strong><p className="text-slate-600">{selectedPkg.food}</p></div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> প্যাকেজে অন্তর্ভুক্ত:</h4>
                <ul className="mt-2 space-y-1.5 text-xs text-slate-600 pl-6 list-disc">{selectedPkg.inclusions.map((inc, i) => <li key={i}>{inc}</li>)}</ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2 text-rose-800"><X className="w-4 h-4 text-rose-600" /> প্যাকেজে অন্তর্ভুক্ত নয়:</h4>
                <ul className="mt-2 space-y-1.5 text-xs text-slate-600 pl-6 list-disc">{selectedPkg.exclusions.map((exc, i) => <li key={i}>{exc}</li>)}</ul>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex gap-3">
              <a 
                href={`https://wa.me/8801711416890?text=আসসালামু%20আলাইকুম,%20আমি%20"${selectedPkg.title}"%20প্যাকেজে%20সিট%20বুকিং%20করতে%20চাই।`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex-1 bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 rounded-xl text-center text-sm shadow-md transition"
              >
                হোয়াটসঅ্যাপে বুকিং করুন
              </a>
              <button onClick={() => setSelectedPkg(null)} className="px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 rounded-xl text-sm transition cursor-pointer">
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 11. Admin Password Modal */}
      {adminPinModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white text-slate-900 w-full max-w-sm rounded-3xl p-6 shadow-2xl relative text-center">
            <button onClick={() => setAdminPinModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer">
              <X className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">এডমিন লগইন</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">প্যাকেজ পরিবর্তনের জন্য পিন দিন (ডিফল্ট: 1234)</p>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <input 
                type="password" 
                maxLength={6} 
                value={pinInput} 
                onChange={(e) => setPinInput(e.target.value)} 
                placeholder="পিন কোড লিখুন" 
                className="w-full text-center tracking-widest text-lg font-bold py-2.5 rounded-xl border border-slate-300 focus:outline-emerald-700" 
                autoFocus 
              />
              <button type="submit" className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-2.5 rounded-xl text-sm transition shadow-md cursor-pointer">
                প্রবেশ করুন
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 12. Package Add/Edit Modal */}
      {showPkgFormModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white text-slate-900 w-full max-w-xl rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button onClick={() => setShowPkgFormModal(false)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 cursor-pointer">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-black mb-1">{editingPkg ? 'প্যাকেজের তথ্য পরিবর্তন করুন' : 'নতুন প্যাকেজ যোগ করুন'}</h3>
            <p className="text-xs text-slate-500 mb-6">নিচের তথ্যগুলো পরিবর্তন করে সংরক্ষণ বাটনে চাপুন</p>

            <form onSubmit={handleSavePackage} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1">প্যাকেজের নাম *</label>
                <input 
                  type="text" 
                  value={pkgFormData.title} 
                  onChange={(e) => setPkgFormData({ ...pkgFormData, title: e.target.value })} 
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-sm focus:outline-emerald-700" 
                  required 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">ধরণ</label>
                  <select 
                    value={pkgFormData.type} 
                    onChange={(e) => setPkgFormData({ ...pkgFormData, type: e.target.value as 'Hajj' | 'Umrah' })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                  >
                    <option value="Umrah">ওমরাহ (Umrah)</option>
                    <option value="Hajj">হজ (Hajj)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1">মূল্য (যেমন: ১,৫০,০০০ ৳) *</label>
                  <input 
                    type="text" 
                    value={pkgFormData.price} 
                    onChange={(e) => setPkgFormData({ ...pkgFormData, price: e.target.value })} 
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm focus:outline-emerald-700" 
                    required 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">সময়কাল (যেমন: ১৪ দিন)</label>
                  <input 
                    type="text" 
                    value={pkgFormData.duration} 
                    onChange={(e) => setPkgFormData({ ...pkgFormData, duration: e.target.value })} 
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm" 
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">ব্যাজ (যেমন: জনপ্রিয় / সাশ্রয়ী)</label>
                  <input 
                    type="text" 
                    value={pkgFormData.badge || ''} 
                    onChange={(e) => setPkgFormData({ ...pkgFormData, badge: e.target.value })} 
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm" 
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">মক্কার হোটেল</label>
                <input 
                  type="text" 
                  value={pkgFormData.hotelMakkah} 
                  onChange={(e) => setPkgFormData({ ...pkgFormData, hotelMakkah: e.target.value })} 
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-sm" 
                />
              </div>

              <div>
                <label className="block font-bold mb-1">মদিনার হোটেল</label>
                <input 
                  type="text" 
                  value={pkgFormData.hotelMadinah} 
                  onChange={(e) => setPkgFormData({ ...pkgFormData, hotelMadinah: e.target.value })} 
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-sm" 
                />
              </div>

              <div>
                <label className="block font-bold mb-1">এয়ারলাইন্স ও ফ্লাইট</label>
                <input 
                  type="text" 
                  value={pkgFormData.flight} 
                  onChange={(e) => setPkgFormData({ ...pkgFormData, flight: e.target.value })} 
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-sm" 
                />
              </div>

              <div>
                <label className="block font-bold mb-1">খাবার ব্যবস্থা</label>
                <input 
                  type="text" 
                  value={pkgFormData.food} 
                  onChange={(e) => setPkgFormData({ ...pkgFormData, food: e.target.value })} 
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-sm" 
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button type="submit" className="flex-1 bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 rounded-xl text-sm transition shadow-md cursor-pointer">
                  সংরক্ষণ করুন
                </button>
                <button type="button" onClick={() => setShowPkgFormModal(false)} className="px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 rounded-xl text-sm transition cursor-pointer">
                  বাতিল
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 13. Photo Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white text-slate-900 w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <button onClick={() => setShowUploadModal(false)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 cursor-pointer">
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><Upload className="w-6 h-6" /></div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">গ্যালারিতে নতুন ছবি আপলোড</h3>
                <p className="text-xs text-slate-500">আপনার কম্পিউটার থেকে ছবি যুক্ত করুন</p>
              </div>
            </div>
            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">ছবি সিলেক্ট করুন *</label>
                <input type="file" accept="image/*" onChange={handleFileChange} className="block w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 border border-slate-200 rounded-xl p-1 cursor-pointer" required />
              </div>
              {previewImage && (
                <div className="relative rounded-xl overflow-hidden h-40 border border-slate-200 bg-slate-100">
                  <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">ছবির শিরোনাম / ক্যাপশন *</label>
                <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="যেমন: আমাদের কাফেলার সম্মানিত হাজীরা" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-emerald-600" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">স্থান / শহর</label>
                <input type="text" value={newLocation} onChange={(e) => setNewLocation(e.target.value)} placeholder="যেমন: মক্কা শরীফ / জেদ্দা এয়ারপোর্ট" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-emerald-600" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">ক্যাটাগরি</label>
                <select value={newTag} onChange={(e) => setNewTag(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-emerald-600 bg-white">
                  <option value="এজেন্সির স্মৃতি">এজেন্সির স্মৃতি</option>
                  <option value="মক্কা">মক্কা</option>
                  <option value="মদিনা">মদিনা</option>
                  <option value="জিয়ারাহ">জিয়ারাহ</option>
                  <option value="হজ স্মৃতি">হজ স্মৃতি</option>
                </select>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="submit" className="flex-1 bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 rounded-xl text-sm transition shadow-md cursor-pointer">
                  গ্যালারিতে যুক্ত করুন
                </button>
                <button type="button" onClick={() => setShowUploadModal(false)} className="px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 rounded-xl text-sm transition cursor-pointer">
                  বাতিল
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 14. Floating WhatsApp */}
      <a 
        href="https://wa.me/8801711416890?text=আসসালামু%20আলাইকুম,%20H.M.%20Tours%20&%20Travels-এর%20হজ%20ও%20ওমরাহ%20প্যাকেজ%20সম্পর্কে%20জানতে%20চাই।" 
        target="_blank" 
        rel="noopener noreferrer" 
        aria-label="WhatsApp Contact"
        className="fixed bottom-6 right-6 bg-emerald-700 hover:bg-emerald-800 text-white p-4 rounded-full shadow-2xl z-40 transition transform hover:scale-110 flex items-center justify-center border-2 border-amber-300"
      >
        <MessageCircle className="w-7 h-7" />
      </a>

      {/* 15. Footer */}
      <footer className="bg-slate-950 text-slate-400 py-10 px-6 text-xs border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <div>
            <p className="font-bold text-slate-200 text-sm">H.M. Tours & Travels</p>
            <p className="mt-1">Govt. Approved Hajj License No. 0801 • IATA Accredited • HAAB & ATAB Member</p>
          </div>
          <p>© {new Date().getFullYear()} সর্বস্বত্ব সংরক্ষিত। H.M. Tours & Travels</p>
        </div>
      </footer>

    </main>
  );
}