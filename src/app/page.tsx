"use client";

import React, { useState } from "react";

export default function HMToursWebsite() {
  const [activeTab, setActiveTab] = useState<"all" | "umrah" | "hajj">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string>("সাধারণ পরামর্শ");
  const [formData, setFormData] = useState({ name: "", phone: "", persons: "1", note: "" });

  const packages = [
    {
      id: "u1",
      category: "umrah",
      tag: "সুপার সেভার",
      tagColor: "bg-emerald-600",
      title: "ইকোনমি উমরাহ প্যাকেজ",
      price: "১,৪৫,০০০",
      priceNote: "জনপ্রতি (খাবারসহ)",
      duration: "১৪ দিন (৭ দিন মক্কা + ৭ দিন মদিনা)",
      makkahHotel: "হোটেল দূরত্ব: ৬০০-৭৫০ মিটার",
      madinahHotel: "হোটেল দূরত্ব: ৪০০-৫০০ মিটার (মারকাজিয়া সংলগ্ন)",
      flight: "ফ্লাইট: ট্রানজিট / সরাসরি (সাউদিয়া / বিমান বাংলাদেশ)",
      food: "খাবার: প্রতিদিন ৩ বেলা সুস্বাদু দেশীয় বুফে খাবার",
      services: "জিয়ারত: মক্কা ও মদিনার ঐতিহাসিক স্থানসমূহ পরিদর্শন",
      guide: "অভিজ্ঞ আলেম ও মোয়াল্লিমের সার্বক্ষণিক তত্ত্বাবধান",
      rating: "৪.৯৮ (১২০+ রিভিউ)",
      popular: false,
    },
    {
      id: "u2",
      category: "umrah",
      tag: "সর্বাধিক জনপ্রিয়",
      tagColor: "bg-amber-500",
      title: "প্রিমিয়াম ভিআইপি উমরাহ প্যাকেজ",
      price: "১,৮৫,০০০",
      priceNote: "জনপ্রতি (হারাম ভিউ)",
      duration: "১৫ দিন (৮ দিন মক্কা + ৭ দিন মদিনা)",
      makkahHotel: "হোটেল: ক্লক টাওয়ার / ৫-স্টার (১০০-২০০ মিটার)",
      madinahHotel: "হোটেল: রওজা শরীফের সন্নিকটে ৫-স্টার (১০০ মিটার)",
      flight: "ফ্লাইট: সরাসরি ডিরেক্ট ফ্লাইট (SV / BG)",
      food: "খাবার: ৫-স্টার লাক্সারি আন্তর্জাতিক বুফে খাবার",
      services: "পরিবহন: ভিআইপি প্রাইভেট লাক্সারি জিএমসি / এসি বাস",
      guide: "ভিআইপি মোয়াল্লিম, জমজম পানি ও বিশেষ উপহার সামগ্রী",
      rating: "৫.০০ (১৮৫+ রিভিউ)",
      popular: true,
    },
    {
      id: "h1",
      category: "hajj",
      tag: "হজ ২০২৭ প্রি-রেজিস্ট্রেশন",
      tagColor: "bg-blue-600",
      title: "স্ট্যান্ডার্ড হজ প্যাকেজ (নন-শিফটিং)",
      price: "৭,৮০,০০০",
      priceNote: "আনুমানিক প্যাকেজ মূল্য",
      duration: "৩০ - ৩৫ দিন",
      makkahHotel: "মক্কা হোটেল: হারাম শরীফের সন্নিকটে (৩৫০ মিটার)",
      madinahHotel: "মদিনা হোটেল: মারকাজিয়া সেন্ট্রাল জোন (২০০ মিটার)",
      flight: "ফ্লাইট: সাউদিয়া / বিমান বাংলাদেশ সরাসরি ডেডিকেটেড ফ্লাইট",
      food: "খাবার: ৩ বেলা উন্নত দেশীয় খাবার + ফলমূল",
      services: "মিনা ও আরাফাত: জোন-১ 'এসি তাঁবু' ও সার্বক্ষণিক সেবা",
      guide: "প্রখ্যাত শরিয়াহ স্কলার ও অভিজ্ঞ হজ গাইড",
      rating: "৪.৯৯ (২৪০+ রিভিউ)",
      popular: true,
    },
    {
      id: "h2",
      category: "hajj",
      tag: "লাক্সারি হজ",
      tagColor: "bg-purple-600",
      title: "ভিআইপি লাক্সারি হজ প্যাকেজ",
      price: "১০,৫০,০০০",
      priceNote: "প্রিমিয়াম ভিআইপি হজ",
      duration: "২৫ - ৩০ দিন (শর্ট প্যাকেজ)",
      makkahHotel: "মক্কা: ক্লক টাওয়ার ফেয়ারমন্ট / সুইসোতেল (হারাম ফ্রন্ট)",
      madinahHotel: "মদিনা: ওবেরয় / দার আল তাকওয়া (মসজিদে নববী গেটের সামনে)",
      flight: "ফ্লাইট: বিজনেস ক্লাস / প্রিমিয়াম ডিরেক্ট ফ্লাইট",
      food: "খাবার: ফুল বোর্ড ৫-স্টার ডাইনিং",
      services: "মিনা: ভিআইপি আপগ্রেডেড তাঁবু ও হাই-স্পিড ট্রেন সার্ভিস",
      guide: "ব্যক্তিগত মোয়াল্লিম ও ডেডিকেটেড প্রটোকল টিম",
      rating: "৫.০০ (৯০+ রিভিউ)",
      popular: false,
    },
  ];

  const filteredPackages =
    activeTab === "all" ? packages : packages.filter((pkg) => pkg.category === activeTab);

  const handleOpenModal = (pkgTitle: string) => {
    setSelectedPackage(pkgTitle);
    setIsModalOpen(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `আসসালামু আলাইকুম, আমি এইচ. এম. ট্যুরস অ্যান্ড ট্রাভেলস-এর "${selectedPackage}" সম্পর্কে বিস্তারিত জানতে আগ্রহী।\nনাম: ${formData.name}\nমোবাইল: ${formData.phone}\nযাত্রী সংখ্যা: ${formData.persons}\nবিশেষ দ্রষ্টব্য: ${formData.note || "নেই"}`;
    window.open(`https://wa.me/8801711416890?text=${encodeURIComponent(msg)}`, "_blank");
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* ১. টপ হেডার বার */}
      <div className="bg-emerald-950 text-white text-xs py-2 px-4 border-b border-emerald-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="bg-amber-500 text-slate-900 font-bold px-2 py-0.5 rounded text-[11px]">
              সরকারি হজ লাইসেন্স নং: ০৮০১
            </span>
            <span className="hidden sm:inline text-emerald-200">
              IATA Accredited • HAAB ও ATAB এর গর্বিত সদস্য
            </span>
          </div>
          <div className="flex items-center gap-4 text-emerald-100">
            <span>
              হটলাইন:{" "}
              <a href="tel:+8801711416890" className="text-amber-400 font-semibold hover:underline">
                +৮৮ ০১৭১১-৪১৬৮৯০
              </a>
            </span>
            <span>ঢাকা পল্টন ও নাটোর আহমেদপুর শাখা</span>
          </div>
        </div>
      </div>

      {/* ২. মূল নেভিগেশন বার */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur shadow-md border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-900 rounded-full flex items-center justify-center text-amber-400 font-serif text-2xl font-black shadow-inner border-2 border-amber-400">
              HM
            </div>
            <div>
              <h1 className="text-xl font-bold text-emerald-950 tracking-tight leading-tight">
                এইচ. এম. ট্যুরস অ্যান্ড ট্রাভেলস
              </h1>
              <p className="text-xs text-amber-700 font-semibold">
                H.M. TOURS & TRAVELS • সরকারি হজ ও উমরাহ কাফেলা
              </p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700">
            <a href="#home" className="hover:text-emerald-700 transition">হোম</a>
            <a href="#packages" className="hover:text-emerald-700 transition">প্যাকেজসমূহ</a>
            <a href="#guide" className="hover:text-emerald-700 transition">উমরাহ নির্দেশিকা</a>
            <a href="#visa" className="hover:text-emerald-700 transition">ভিসা প্রয়োজনীয়তা</a>
            <a href="#whyus" className="hover:text-emerald-700 transition">কেন আমরা</a>
            <a href="#offices" className="hover:text-emerald-700 transition">যোগাযোগ ও অফিস</a>
          </div>

          <button
            onClick={() => handleOpenModal("উমরাহ ও হজ বুকিং")}
            className="bg-emerald-800 hover:bg-emerald-900 text-amber-300 font-bold px-5 py-2.5 rounded-full shadow-lg transition border border-amber-400/40 text-sm flex items-center gap-2"
          >
            <span>প্যাকেজ বুকিং</span>
            <span className="text-xs bg-amber-500 text-emerald-950 px-2 py-0.5 rounded-full">কল করুন</span>
          </button>
        </div>
      </nav>

      {/* ৩. হিরো সেকশন */}
      <section id="home" className="relative bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 text-white py-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-emerald-800/80 border border-amber-400/40 text-amber-300 px-4 py-1.5 rounded-full text-xs font-semibold">
              <span>★ নির্ভরযোগ্য শরিয়াহ সম্মত হজ ও উমরাহ কাফেলা</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight text-white">
              পবিত্র বায়তুল্লাহ ও মদিনা জিয়ারতে আপনার বিশ্বস্ত সঙ্গী
            </h2>
            <p className="text-emerald-100 text-base sm:text-lg leading-relaxed">
              এইচ. এম. ট্যুরস অ্যান্ড ট্রাভেলসের সাথে আপনার আধ্যাত্মিক সফর হোক সম্পূর্ণ দুশ্চিন্তামুক্ত, আরামদায়ক এবং নিরাপদ। হারামাইন শরীফাইনের সন্নিকটে হোটেল, দেশীয় সুস্বাদু খাবার এবং অভিজ্ঞ মোয়াল্লিমের যত্নশীল তত্ত্বাবধান।
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#packages"
                className="bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold px-7 py-3 rounded-lg shadow-lg transition text-base"
              >
                প্যাকেজসমূহ দেখুন
              </a>
              <button
                onClick={() => handleOpenModal("হজ ২০২৭ প্রি-রেজিস্ট্রেশন")}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg border border-white/30 backdrop-blur transition text-base"
              >
                হজ প্রি-রেজিস্ট্রেশন
              </button>
            </div>

            {/* হাইলাইটস স্ট্রিপ */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-emerald-800/80">
              <div className="bg-emerald-900/50 p-3 rounded-lg border border-emerald-700/50">
                <p className="text-2xl font-black text-amber-400">০৮০১</p>
                <p className="text-xs text-emerald-200">সরকারি লাইসেন্স</p>
              </div>
              <div className="bg-emerald-900/50 p-3 rounded-lg border border-emerald-700/50">
                <p className="text-2xl font-black text-amber-400">১৫+ বছর</p>
                <p className="text-xs text-emerald-200">অভিজ্ঞতার পথচলা</p>
              </div>
              <div className="bg-emerald-900/50 p-3 rounded-lg border border-emerald-700/50">
                <p className="text-2xl font-black text-amber-400">১০০%</p>
                <p className="text-xs text-emerald-200">শরিয়াহ গাইডেন্স</p>
              </div>
              <div className="bg-emerald-900/50 p-3 rounded-lg border border-emerald-700/50">
                <p className="text-2xl font-black text-amber-400">২৪/৭</p>
                <p className="text-xs text-emerald-200">সরাসরি হাজি সেবা</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-400/30">
              <img
                src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80"
                alt="Holy Kaaba Makkah"
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent flex flex-col justify-end p-6">
                <span className="bg-amber-500 text-slate-900 text-xs font-bold px-3 py-1 rounded w-fit mb-2">
                  অভিজ্ঞ মোয়াল্লিম টিম
                </span>
                <h3 className="text-white font-bold text-lg">
                  মক্কা-মদিনায় সার্বক্ষণিক নিজস্ব বাংলাভাষী টিম
                </h3>
                <p className="text-xs text-emerald-200">
                  বিমানবন্দর থেকে শুরু করে তাওয়াফ ও ঐতিহাসিক জিয়ারত পর্যন্ত সকল সহায়তা।
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ৪. প্যাকেজ সেকশন (রেফারেন্স ওয়েবসাইটের মতো ট্যাব ও কার্ড) */}
      <section id="packages" className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            পবিত্র সফরের অফারসমূহ
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            আপনার সুবিধাজনক প্যাকেজটি বেছে নিন
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
            প্রত্যেকটি প্যাকেজ আমাদের সম্মানিত হাজীদের স্বাচ্ছন্দ্য, পবিত্রতা ও সর্বোচ্চ সেবার নিশ্চয়তা দিয়ে ডিজাইন করা হয়েছে।
          </p>

          {/* ট্যাব বাটন */}
          <div className="inline-flex p-1 bg-slate-200 rounded-xl mt-4">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-5 py-2 text-sm font-bold rounded-lg transition ${
                activeTab === "all" ? "bg-emerald-800 text-white shadow" : "text-slate-700 hover:text-slate-900"
              }`}
            >
              সকল প্যাকেজ
            </button>
            <button
              onClick={() => setActiveTab("umrah")}
              className={`px-5 py-2 text-sm font-bold rounded-lg transition ${
                activeTab === "umrah" ? "bg-emerald-800 text-white shadow" : "text-slate-700 hover:text-slate-900"
              }`}
            >
              উমরাহ প্যাকেজ
            </button>
            <button
              onClick={() => setActiveTab("hajj")}
              className={`px-5 py-2 text-sm font-bold rounded-lg transition ${
                activeTab === "hajj" ? "bg-emerald-800 text-white shadow" : "text-slate-700 hover:text-slate-900"
              }`}
            >
              হজ প্যাকেজ
            </button>
          </div>
        </div>

        {/* প্যাকেজ গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`bg-white rounded-2xl shadow-lg border overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col justify-between ${
                pkg.popular ? "border-amber-400 ring-2 ring-amber-400/30" : "border-slate-200"
              }`}
            >
              <div>
                {/* কার্ড হেডার */}
                <div className="p-6 bg-slate-50 border-b border-slate-100 flex justify-between items-start">
                  <div>
                    <span className={`${pkg.tagColor} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider`}>
                      {pkg.tag}
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900 mt-2">{pkg.title}</h3>
                    <p className="text-xs text-emerald-800 font-semibold mt-1">
                      ⏱️ {pkg.duration}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 block">প্যাকেজ শুরু</span>
                    <span className="text-2xl font-black text-emerald-900">৳ {pkg.price}</span>
                    <span className="text-[11px] text-slate-500 block">{pkg.priceNote}</span>
                  </div>
                </div>

                {/* স্পেসিফিকেশন তালিকা */}
                <div className="p-6 space-y-3.5 text-sm text-slate-700">
                  <div className="flex items-start gap-3">
                    <span className="text-emerald-700 font-bold">🏨</span>
                    <span><strong>মক্কা:</strong> {pkg.makkahHotel}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-emerald-700 font-bold">🕌</span>
                    <span><strong>মদিনা:</strong> {pkg.madinahHotel}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-emerald-700 font-bold">✈️</span>
                    <span>{pkg.flight}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-emerald-700 font-bold">🍽️</span>
                    <span>{pkg.food}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-emerald-700 font-bold">🚌</span>
                    <span>{pkg.services}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-emerald-700 font-bold">👤</span>
                    <span>{pkg.guide}</span>
                  </div>
                </div>
              </div>

              {/* কার্ড ফুটার ও বাটন */}
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4">
                <span className="text-xs font-semibold text-amber-700 flex items-center gap-1">
                  ⭐ {pkg.rating}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenModal(pkg.title)}
                    className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-5 py-2.5 rounded-lg text-sm transition shadow"
                  >
                    বুকিং আবেদন
                  </button>
                  <a
                    href="tel:+8801711416890"
                    className="bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold px-3 py-2.5 rounded-lg text-sm transition"
                    title="সরাসরি কল দিন"
                  >
                    📞 কল
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ৫. উমরাহ নির্দেশিকা (রেফারেন্স ওয়েবসাইটের মতো আরবি দোয়াসহ পূর্ণাঙ্গ গাইড) */}
      <section id="guide" className="py-16 bg-emerald-950 text-white px-4">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              সহজ হজ ও উমরাহ গাইড
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold">উমরাহ পালনের সহজ ও সহীহ নিয়মাবলী</h2>
            <p className="text-emerald-200 max-w-2xl mx-auto text-sm sm:text-base">
              রাসূলুল্লাহ (সা.)-এর সুন্নাহ অনুযায়ী উমরাহর প্রধান রুকনগুলো ধাপে ধাপে সম্পন্ন করুন।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-emerald-900/60 p-6 rounded-2xl border border-emerald-800 space-y-3">
              <span className="bg-amber-400 text-slate-950 font-bold px-3 py-1 rounded-full text-xs">ধাপ ০১</span>
              <h3 className="text-xl font-bold text-white">ইহরাম ও নিয়ত</h3>
              <p className="text-xs text-emerald-200">
                মিকাত অতিক্রমের পূর্বে পরিচ্ছন্ন হয়ে ইহরামের কাপড় পরিধান ও উমরাহর নিয়ত করা:
              </p>
              <div className="bg-emerald-950 p-3 rounded-lg text-amber-300 font-serif text-sm border border-emerald-800">
                « لَبَّيْكَ اللَّهُمَّ عُمْرَةً »
              </div>
              <p className="text-xs text-slate-300">
                <strong>অর্থ:</strong> “হে আল্লাহ! আমি উমরাহর উদ্দেশ্যে আপনার দরবারে হাজির।”
              </p>
            </div>

            <div className="bg-emerald-900/60 p-6 rounded-2xl border border-emerald-800 space-y-3">
              <span className="bg-amber-400 text-slate-950 font-bold px-3 py-1 rounded-full text-xs">ধাপ ০২</span>
              <h3 className="text-xl font-bold text-white">তালবিয়া পাঠ করা</h3>
              <p className="text-xs text-emerald-200">
                ইহরাম বাঁধার পর থেকে তাওয়াফ শুরুর আগ পর্যন্ত বেশি বেশি তালবিয়া পাঠ করতে হবে:
              </p>
              <div className="bg-emerald-950 p-3 rounded-lg text-amber-300 font-serif text-xs border border-emerald-800 leading-relaxed">
                « لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لاَ شَرِيكَ لَكَ لَبَّيْكَ... »
              </div>
              <p className="text-xs text-slate-300">
                উচ্চস্বরে তালবিয়া পাঠ করা পুরুষদের জন্য সুন্নাত।
              </p>
            </div>

            <div className="bg-emerald-900/60 p-6 rounded-2xl border border-emerald-800 space-y-3">
              <span className="bg-amber-400 text-slate-950 font-bold px-3 py-1 rounded-full text-xs">ধাপ ০৩</span>
              <h3 className="text-xl font-bold text-white">কাবা শরীফ তাওয়াফ</h3>
              <p className="text-xs text-emerald-200">
                হাজরে আসওয়াদ বরাবর দাঁড়িয়ে বিসমিল্লাহি আল্লাহু আকবার বলে কাবা শরীফকে বামে রেখে ৭ চক্কর দেওয়া এবং মাকামে ইবরাহীমের পেছনে ২ রাকাত সালাত আদায় করা।
              </p>
            </div>

            <div className="bg-emerald-900/60 p-6 rounded-2xl border border-emerald-800 space-y-3">
              <span className="bg-amber-400 text-slate-950 font-bold px-3 py-1 rounded-full text-xs">ধাপ ০৪</span>
              <h3 className="text-xl font-bold text-white">সাফা ও মারওয়া সাঈ</h3>
              <p className="text-xs text-emerald-200">
                সাফা পাহাড় থেকে শুরু করে মারওয়া পাহাড়ে গিয়ে শেষ—এভাবে ৭ বার সাঈ করা। পুরুষরা দুই সবুজ বাতির মাঝে দ্রুত গতিতে হাঁটবেন।
              </p>
            </div>

            <div className="bg-emerald-900/60 p-6 rounded-2xl border border-emerald-800 space-y-3">
              <span className="bg-amber-400 text-slate-950 font-bold px-3 py-1 rounded-full text-xs">ধাপ ০৫</span>
              <h3 className="text-xl font-bold text-white">হলক বা কসর (চুল কাটা)</h3>
              <p className="text-xs text-emerald-200">
                সাঈ শেষ করে পুরুষরা মাথা মুণ্ডন (হলক) করবেন অথবা চুল ছোট করবেন। মহিলারা আঙুলের এক কর পরিমাণ চুল কাটবেন। এর মাধ্যমে উমরাহ সমাপ্ত হবে।
              </p>
            </div>

            <div className="bg-emerald-900/60 p-6 rounded-2xl border border-emerald-800 space-y-3">
              <span className="bg-amber-400 text-slate-950 font-bold px-3 py-1 rounded-full text-xs">ধাপ ০৬</span>
              <h3 className="text-xl font-bold text-white">মদিনা মুনাওয়ারা জিয়ারত</h3>
              <p className="text-xs text-emerald-200">
                মসজিদে নববীতে সালাত আদায় এবং রাসূলুল্লাহ (সা.) ও তাঁর দুই সাহাবীর রওজা মোবারকে দরূদ ও সালাম পেশ করা।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ৬. ভিসা প্রসেসিং ও প্রয়োজনীয় কাগজপত্র চেকলিস্ট */}
      <section id="visa" className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
              ভিসা প্রসেসিং সহায়িকা
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              উমরাহ ও হজ ভিসার প্রয়োজনীয় চেকলিস্ট
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              বাংলাদেশি নাগরিকদের জন্য সম্পূর্ণ বৈধ উপায়ে দ্রুততম সময়ে সৌদি উমরাহ ও হজ ভিসা প্রসেসিং নিশ্চিত করে এইচ. এম. ট্যুরস অ্যান্ড ট্রাভেলস।
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-emerald-700 font-bold text-lg">✓</span>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">মূল পাসপোর্ট (কমপক্ষে ৬ মাস মেয়াদ থাকতে হবে)</h4>
                  <p className="text-xs text-slate-500">পাসপোর্টে অন্তত দুটি ফাঁকা পাতা থাকতে হবে।</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-emerald-700 font-bold text-lg">✓</span>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">পাসপোর্ট সাইজ ছবি (২ কপি)</h4>
                  <p className="text-xs text-slate-500">সাদা ব্যাকগ্রাউন্ডে সাম্প্রতিক তোলা ছবি।</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-emerald-700 font-bold text-lg">✓</span>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">জাতীয় পরিচয়পত্র (NID) বা জন্মনিবন্ধনের ফটোকপি</h4>
                  <p className="text-xs text-slate-500">শিশুদের ক্ষেত্রে অনলাইন জন্মনিবন্ধন সনদ বাধ্যতামূলক।</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-emerald-700 font-bold text-lg">✓</span>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">টিকার সনদ ও স্বাস্থ্য তথ্য</h4>
                  <p className="text-xs text-slate-500">মেনিনজাইটিস ও প্রয়োজনীয় স্বাস্থ্য পরীক্ষার অনুমোদন।</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleOpenModal("ভিসা প্রসেসিং সংক্রান্ত তথ্য")}
              className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-6 py-3 rounded-lg shadow transition text-sm"
            >
              ভিসার জন্য যোগাযোগ করুন
            </button>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-900 to-slate-900 p-8 rounded-3xl text-white shadow-xl space-y-6">
            <h3 className="text-2xl font-bold text-amber-300">কেন ভিসা প্রসেসিংয়ে আমাদের বেছে নেবেন?</h3>
            <ul className="space-y-4 text-sm text-emerald-100">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>সরাসরি সৌদি মোয়াফা (Mofa) সিস্টেমের সাথে যুক্ত।</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>কোনো লুকানো চার্জ বা অনাকাঙ্ক্ষিত বিলম্ব নেই।</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>পরিবার, গ্রুপ ও ইন্ডিভিজুয়াল ই-ভিসা দ্রুত অনুমোদন।</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>টিকিট, হোটেল বুকিং ও ভিসা সম্পূর্ণ এক ছাতার নিচে।</span>
              </li>
            </ul>

            <div className="bg-emerald-950/80 p-4 rounded-xl border border-emerald-700">
              <p className="text-xs text-amber-300 font-bold">জরুরি ভিসা পরামর্শে যোগাযোগ:</p>
              <p className="text-lg font-bold text-white mt-1">মোঃ মিজানুর রহমান</p>
              <p className="text-xs text-emerald-300">ম্যানেজার কাস্টমার সার্ভিস (VISA)</p>
              <a href="tel:+8801711416890" className="text-sm font-semibold text-amber-400 block mt-2 hover:underline">
                📞 +৮৮ ০১৭১১-৪১৬৮৯০ (WhatsApp)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ৭. আমাদের অফিস ও যোগাযোগ সেকশন */}
      <section id="offices" className="py-16 bg-slate-100 px-4">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-200/60 px-3 py-1 rounded-full">
              অফিস ঠিকানা ও সেবা কেন্দ্র
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">সরাসরি আমাদের অফিসে আসুন</h2>
            <p className="text-slate-600 text-sm">হজ ও উমরাহ সংক্রান্ত যে কোনো পরামর্শে আমাদের দরজা সর্বদা উন্মুক্ত।</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* প্রধান কার্যালয় - পল্টন */}
            <div className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-emerald-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="bg-emerald-100 text-emerald-900 font-bold px-3 py-1 rounded text-xs">
                  প্রধান কার্যালয় (Head Office)
                </span>
                <span className="text-xs text-slate-400">ঢাকা</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">এইচ. এম. ট্যুরস অ্যান্ড ট্রাভেলস</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                বিজয় টাওয়ার (৮ম তলা), রুম নং ৮/এ, ১০৫/ক, বক্স কালভার্ট রোড, নয়াপল্টন, ঢাকা-১০০০, বাংলাদেশ।
              </p>
              <div className="pt-2 border-t border-slate-100 text-sm space-y-1">
                <p><strong>টেলিফোন:</strong> +৮৮ ০২ ২২২২২২১১৮</p>
                <p><strong>মোবাইল / হোয়াটসঅ্যাপ:</strong> +৮৮ ০১৭১১-৪১৬৮৯০</p>
                <p><strong>ইমেইল:</strong> mizankona@gmail.com</p>
              </div>
            </div>

            {/* শাখা কার্যালয় - নাটোর */}
            <div className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-amber-500 space-y-4">
              <div className="flex items-center justify-between">
                <span className="bg-amber-100 text-amber-900 font-bold px-3 py-1 rounded text-xs">
                  শাখা কার্যালয় (Branch Office)
                </span>
                <span className="text-xs text-slate-400">নাটোর</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">আহমেদপুর শাখা</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                আহমেদপুর (বাসস্ট্যান্ড সংলগ্ন), বড়াইগ্রাম, নাটোর, রাজশাহী বিভাগ, বাংলাদেশ।
              </p>
              <div className="pt-2 border-t border-slate-100 text-sm space-y-1">
                <p><strong>মোবাইল:</strong> +৮৮ ০১৭১১-৪১৬৮৯০ / ০১৭৯৬-৮৫৩৬৯৫</p>
                <p><strong>যোগাযোগের সময়:</strong> সকাল ৯:০০ টা থেকে রাত ৯:০০ টা</p>
                <p><strong>সেবা:</strong> হজ ও উমরাহ রেজিস্ট্রেশন, টিকিট ও পাসপোর্ট জমা</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ৮. ফুটার */}
      <footer className="bg-emerald-950 text-slate-400 text-xs py-12 px-4 border-t border-emerald-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <h4 className="text-white text-base font-bold">এইচ. এম. ট্যুরস অ্যান্ড ট্রাভেলস</h4>
            <p className="text-slate-400 leading-relaxed">
              গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত হজ লাইসেন্স নং ০৮০১। সততা, বিশ্বস্ততা ও আন্তরিক হাজি সেবায় আমাদের অঙ্গীকার।
            </p>
          </div>
          <div>
            <h4 className="text-white text-sm font-bold mb-3">জরুরি লিংক</h4>
            <ul className="space-y-2">
              <li><a href="#packages" className="hover:text-amber-400">উমরাহ প্যাকেজসমূহ</a></li>
              <li><a href="#packages" className="hover:text-amber-400">হজ প্রি-রেজিস্ট্রেশন</a></li>
              <li><a href="#guide" className="hover:text-amber-400">উমরাহ নির্দেশিকা</a></li>
              <li><a href="#visa" className="hover:text-amber-400">ভিসার নিয়মাবলী</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm font-bold mb-3">যোগাযোগ</h4>
            <p><strong>হটলাইন:</strong> +৮৮ ০১৭১১-৪১৬৮৯০</p>
            <p className="mt-1"><strong>ঢাকা:</strong> নয়াপল্টন, ঢাকা-১০০০</p>
            <p className="mt-1"><strong>নাটোর:</strong> আহমেদপুর বাসস্ট্যান্ড, বড়াইগ্রাম</p>
          </div>
          <div>
            <h4 className="text-white text-sm font-bold mb-3">সরাসরি সহায়তা</h4>
            <p className="mb-3">যেকোনো প্রশ্ন বা বিস্তারিত জানতে সরাসরি হোয়াটসঅ্যাপে বার্তা পাঠান।</p>
            <a
              href="https://wa.me/8801711416890"
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-lg text-xs"
            >
              হোয়াটসঅ্যাপে মেসেজ দিন
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-emerald-900 text-center text-slate-500">
          © ২০২৬ এইচ. এম. ট্যুরস অ্যান্ড ট্রাভেলস (H.M. Tours & Travels)। সর্বস্বত্ব সংরক্ষিত।
        </div>
      </footer>

      {/* ৯. বুকিং ও পরামর্শ মডাল (পপ-আপ) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-xl font-bold"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold text-slate-900">প্যাকেজ বুকিং ও অনুসন্ধান ফরম</h3>
            <p className="text-xs text-emerald-800 font-semibold mb-4">
              নির্বাচিত বিষয়: {selectedPackage}
            </p>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">আপনার নাম *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: মোঃ মিজানুর রহমান"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-emerald-800 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">মোবাইল নম্বর *</label>
                  <input
                    type="tel"
                    required
                    placeholder="০১৭১১-XXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-emerald-800 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">যাত্রীর সংখ্যা</label>
                  <select
                    value={formData.persons}
                    onChange={(e) => setFormData({ ...formData, persons: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-emerald-800 outline-none"
                  >
                    <option value="1">১ জন</option>
                    <option value="2">২ জন</option>
                    <option value="3-5">৩ - ৫ জন</option>
                    <option value="5+">৫ জনের বেশি (গ্রুপ)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">মন্তব্য বা বিশেষ চাহিদা (যদি থাকে)</label>
                <textarea
                  rows={3}
                  placeholder="আপনার বিশেষ কোনো তারিখ বা চাহিদা থাকলে লিখতে পারেন..."
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-emerald-800 outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 rounded-lg shadow-lg transition text-sm flex items-center justify-center gap-2"
              >
                <span>হোয়াটসঅ্যাপে সরাসরি পাঠান</span>
                <span>➔</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ১০. ভাসমান হোয়াটসঅ্যাপ বাটন */}
      <a
        href="https://wa.me/8801711416890"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 rounded-full shadow-2xl transition-all transform hover:scale-110 flex items-center gap-2 border-2 border-white"
        title="সরাসরি হোয়াটসঅ্যাপে কথা বলুন"
      >
        <span className="text-xl">💬</span>
        <span className="text-xs font-bold hidden sm:inline">হোয়াটসঅ্যাপ চ্যাট</span>
      </a>
    </div>
  );
}