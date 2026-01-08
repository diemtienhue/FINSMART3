
import React from 'react';
import { INITIAL_PROJECTS } from '../constants';

const PartnerSlider: React.FC = () => {
  // Get logos from existing projects
  const existingLogos = INITIAL_PROJECTS.map(p => ({
    id: p.id,
    logo: p.logo,
    name: p.name
  }));

  // Add new partners
  const newPartners = [
    { id: 'partner-mfast', logo: '/partners/partner-1.png', name: 'Mfast' },
    { id: 'partner-cnext', logo: '/partners/partner-2.png', name: 'Cnext' },
    { id: 'partner-finconnect', logo: '/partners/partner-3.jpg', name: 'Finconnect' },
  ];

  const allPartners = [...existingLogos, ...newPartners];

  return (
    <div className="w-full bg-white border-t border-slate-100 py-8 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 mb-4">
            <p className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest">Đối tá liên kết</p>
        </div>
      <div className="relative w-full">
        {/* Gradients for smooth fade effect at edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Sliding container */}
        <div className="flex w-max animate-scroll">
          {/* Double the list to create seamless loop */}
          {[...allPartners, ...allPartners].map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="flex-shrink-0 mx-6 sm:mx-10 w-24 h-16 sm:w-32 sm:h-20 flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
            animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default PartnerSlider;
