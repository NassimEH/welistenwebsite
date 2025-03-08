
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Play, X, Heart, Share2, Clock, Music2 } from 'lucide-react';
import WaveAnimation from './WaveAnimation';

interface ArtistData {
  id: number;
  name: string;
  description: string;
  image: string;
  topTracks: { title: string; duration: string }[];
  backgroundColor: string;
}

const artists: ArtistData[] = [
  {
    id: 1,
    name: "Mme Melis",
    description: "Artiste novatrice aux sonorités électroniques uniques, Mme Melis repousse les frontières de la musique expérimentale avec son approche minimaliste et ses mélodies captivantes.",
    image: "https://images.unsplash.com/photo-1528066781375-ec7c29dab4ff?q=80&w=500&auto=format&fit=crop",
    backgroundColor: "#9d4edd",
    topTracks: [
      { title: "Je vais me moucher", duration: "3:24" },
      { title: "J'apprends à conduire", duration: "4:05" },
      { title: "Hey", duration: "2:58" }
    ]
  },
  {
    id: 2,
    name: "JustADog",
    description: "Véritable phénomène de la scène rap underground, JustADog se démarque par ses paroles incisives et ses productions avant-gardistes qui mêlent trap et sons organiques.",
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=500&auto=format&fit=crop",
    backgroundColor: "#4361ee",
    topTracks: [
      { title: "Woof Woof", duration: "2:47" },
      { title: "Canine Flow", duration: "3:32" },
      { title: "Unleashed", duration: "3:18" }
    ]
  },
  {
    id: 3,
    name: "Manglon",
    description: "Explorateur sonore aux influences multiples, Manglon fusionne habilement les genres dans ses compositions hypnotiques et envoûtantes, créant un univers musical unique et immersif.",
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=500&auto=format&fit=crop",
    backgroundColor: "#f77f00",
    topTracks: [
      { title: "Sweet Taste", duration: "3:51" },
      { title: "Honey Loops", duration: "4:22" },
      { title: "Pasta Dream", duration: "3:07" }
    ]
  }
];

interface ArtistModalProps {
  artist: ArtistData | null;
  onClose: () => void;
}

const ArtistModal = ({ artist, onClose }: ArtistModalProps) => {
  if (!artist) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      ></div>
      
      <div 
        className="relative w-full max-w-4xl rounded-2xl overflow-hidden glass border border-white/10 animate-scale-in"
        style={{ maxHeight: '90vh' }}
      >
        <div className="relative">
          <div 
            className="absolute inset-0 opacity-70"
            style={{ background: `linear-gradient(to bottom, ${artist.backgroundColor}60, #0A0A0B)` }}
          ></div>
          <img 
            src={artist.image} 
            alt={artist.name}
            className="w-full h-64 object-cover"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X size={20} />
          </button>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h2 className="text-4xl font-bold mb-2">{artist.name}</h2>
            <div className="flex gap-4 mb-4">
              <button className="px-6 py-2 bg-audio-accent hover:bg-audio-accent-light transition-colors rounded-full font-medium flex items-center gap-2 shadow-neon hover-scale">
                <Play size={18} fill="white" /> Écouter
              </button>
              <button className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-colors">
                <Heart size={18} />
              </button>
              <button className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-colors">
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">À propos</h3>
            <p className="text-audio-light/80">{artist.description}</p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Titres populaires</h3>
            <div className="space-y-2">
              {artist.topTracks.map((track, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 hover:bg-white/5 transition-colors rounded-lg group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 flex items-center justify-center text-audio-light/60 group-hover:opacity-0 group-hover:hidden">
                      {index + 1}
                    </div>
                    <button className="w-8 h-8 rounded-full bg-audio-accent opacity-0 hidden group-hover:flex group-hover:opacity-100 items-center justify-center transition-all duration-300">
                      <Play size={16} fill="white" />
                    </button>
                    <div>
                      <p className="font-medium">{track.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-audio-light/60 text-sm">{track.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ArtistCard = ({ artist }: { artist: ArtistData }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      <div 
        className="rounded-xl overflow-hidden group transition-all duration-500 hover-scale"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsPlaying(false);
        }}
        onClick={() => setShowModal(true)}
      >
        <div className="relative aspect-[4/5]">
          <img 
            src={artist.image} 
            alt={artist.name} 
            className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-110"
          />
          
          <div 
            className={cn(
              "absolute inset-0 transition-opacity duration-300 rounded-xl",
              isHovered ? "opacity-100" : "opacity-0"
            )}
            style={{ background: `linear-gradient(to top, ${artist.backgroundColor}E6, transparent)` }}
          ></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className={cn(
              "text-2xl font-bold mb-2 transition-transform duration-500",
              isHovered ? "translate-y-0" : "translate-y-8 opacity-0"
            )}>
              {artist.name}
            </h3>
            
            <div className={cn(
              "flex gap-4 transition-all duration-500",
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              <button 
                className="w-12 h-12 rounded-full flex items-center justify-center glass border border-white/20 shadow-lg hover:bg-audio-accent transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPlaying(!isPlaying);
                }}
              >
                {isPlaying ? (
                  <WaveAnimation className="h-6" />
                ) : (
                  <Play size={24} fill="white" className="ml-1" />
                )}
              </button>
              
              <button 
                className="w-10 h-10 rounded-full flex items-center justify-center glass border border-white/20 hover:bg-white/20 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Music2 size={18} />
              </button>
            </div>
          </div>
          
          {/* Animated particles effect */}
          <div className={cn(
            "absolute inset-0 pointer-events-none transition-opacity duration-500",
            isHovered ? "opacity-100" : "opacity-0"
          )}>
            {Array.from({ length: 15 }).map((_, i) => (
              <div 
                key={i}
                className="absolute w-1 h-1 rounded-full bg-white/60"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animation: 'float 3s ease-in-out infinite'
                }}
              />
            ))}
          </div>
        </div>
      </div>
      
      {showModal && (
        <ArtistModal artist={artist} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

const ArtistsSection = () => {
  return (
    <section id="discover" className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-audio-dark/90 via-audio-dark to-audio-dark/95"></div>
      </div>
      
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="px-3 py-1 text-xs font-medium rounded-full glass-accent text-audio-accent inline-block mb-4">
            Artistes exclusifs
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter">Découvrez les artistes WeListen</h2>
          <p className="text-audio-light/70 max-w-2xl mx-auto text-balance">
            Explorez notre catalogue d'artistes exclusifs et plongez dans leurs univers sonores uniques.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artists.map(artist => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArtistsSection;
