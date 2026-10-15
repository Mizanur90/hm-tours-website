import React from 'react';
import { Package } from '@/data/packages';
import { Check, Star, Clock } from 'lucide-react';

export default function PackageCard({ pkg }: { pkg: Package }) {
  return (
    <div className={`relative bg-white rounded-2xl border p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${pkg.popular ? 'border-amber-500 ring-2 ring-amber-500/20' : 'border-slate-200'}`}>
      {pkg.popular && (
        <span className="absolute -top-3 right-6 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <Star className="w-3.5 h-3.5 fill-current" /> জনপ্রিয় চয়েস
        </span>
      )}
      
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
          {pkg.type}
        </span>
        <h3 className="text-xl font-bold text-slate-900 mt-3">{pkg.title}</h3>
        
        <div className="flex items-center gap-2 text-slate-500 text-sm mt-2">
          <Clock className="w-4 h-4 text-emerald-600" />
          <span>{pkg.duration}</span>
        </div>

        <div className="mt-4 mb-6">
          <span className="text-3xl font-extrabold text-slate-900">{pkg.price}</span>
          <span className="text-slate-500 text-sm"> / ব্যক্তি</span>
        </div>

        <ul className="space-y-3 border-t border-slate-100 pt-5">
          {pkg.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <button className={`w-full mt-8 py-3 rounded-xl font-semibold transition-all duration-200 ${
        pkg.popular 
          ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-md' 
          : 'bg-slate-100 hover:bg-emerald-50 text-slate-800 hover:text-emerald-700'
      }`}>
        বুকিং বা বিস্তারিত জানুন
      </button>
    </div>
  );
}