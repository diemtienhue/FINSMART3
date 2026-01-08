
import React, { useState, useEffect } from 'react';
import { INITIAL_PROJECTS } from '../constants';
import { partnerService } from '../services/partnerService';
import { PartnerLogo } from '../types';

const PartnerSlider: React.FC = () => {
  const [partnerLogos, setPartnerLogos] = useState<PartnerLogo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartnerLogos = async () => {
      try {
        const logos = await partnerService.getAll();
        setPartnerLogos(logos);
      } catch (error) {
        console.error('Failed to fetch partner logos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPartnerLogos();
  }, []);

  // Get logos from existing projects
  const existingLogos = INITIAL_PROJECTS.map(p => ({
    id: p.id,
    logo: p.logo,
    name: p.name
  }));

  // Combine project logos + partner logos from Supabase
  const allPartners = [
    ...existingLogos,
    ...partnerLogos.map(p => ({ id: p.id, logo: p.logoUrl, name: '' }))
  ];

  if (loading || allPartners.length === 0) {
    return null; // Or return a loading skeleton
  }

  return (
    <div className="w-full bg-white py-8 overflow-hidden">
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
                alt=""
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
