
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, BarChart, Users, TrendingUp, Play, ArrowUpRight, Music, Calendar, Disc, X, Image, MusicIcon, CheckCircle2, Heart, Headphones, Album, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { playSoundEffect } from '@/utils/soundEffects';
import StarBackground from '@/components/StarBackground';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import ArtistBanner from '@/components/creator/ArtistBanner';

const CreatorDashboard = () => {
  const [hoveredTrack, setHoveredTrack] = useState<string | null>(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadFormData, setUploadFormData] = useState({
    title: '',
    description: '',
    releaseDate: '',
    duration: '',
    tags: '',
    genre: '',
    explicit: false
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };
  
  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 }
  };
  
  const handleTrackHover = (id: string | null) => {
    if (id !== hoveredTrack) {
      playSoundEffect('hover', 0.1);
    }
    setHoveredTrack(id);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setUploadFormData({
        ...uploadFormData,
        [name]: target.checked
      });
    } else {
      setUploadFormData({
        ...uploadFormData,
        [name]: value
      });
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    // Simuler le téléchargement
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          setShowUploadForm(false);
          setUploadProgress(0);
          setUploadFormData({
            title: '',
            description: '',
            releaseDate: '',
            duration: '',
            tags: '',
            genre: '',
            explicit: false
          });
          toast({
            title: "Titre téléchargé avec succès",
            description: `"${uploadFormData.title}" est maintenant disponible à l'écoute.`,
          });
        }, 500);
      }
    }, 100);
  };
  
  // Informations de l'artiste
  const artistInfo = {
    name: "Your Artist Name",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop",
    bio: "Artiste indépendant explorant les frontières sonores entre l'électronique, le hip-hop et la musique ambiante. Basé à Paris, je cherche à créer des paysages sonores qui racontent des histoires.",
    stats: {
      followers: "3.5K",
      tracks: 24,
      albums: 3,
      monthlyListeners: "8.2K"
    }
  };
  
  // Mock data for top tracks
  const topTracks = [
    { id: '1', title: 'DKR', streams: '850K', duration: '3:15', cover: 'https://i1.sndcdn.com/artworks-000224127351-494034-t500x500.jpg' },
    { id: '2', title: 'GIMS', streams: '720K', duration: '4:05', cover: 'https://i1.sndcdn.com/artworks-sLK6Oe4dvKWLvVLB-U8S6mg-t500x500.jpg' },
    { id: '3', title: 'Longueur d\'avance', streams: '540K', duration: '2:55', cover: 'https://cdn.alza.cz/Foto/ImgGalery/Image/booba-ultra-cover.jpg' },
    { id: '4', title: 'Pitbull', streams: '480K', duration: '3:45', cover: 'https://pbs.twimg.com/media/D9XTKcYWwAEAA0W.jpg' },
  ];

  // Mock data for recent uploads
  const recentUploads = [
    { title: 'Freestyle #12', date: '15 juin 2023', streams: '45K', cover: 'https://i.scdn.co/image/ab67616d00001e02b0fe40a6e1692822115acfce' },
    { title: 'En direct du tier', date: '2 mai 2023', streams: '120K', cover: 'https://i.scdn.co/image/ab67616d00001e02a8142ce89cebb0da0505a2a5' },
    { title: 'Ratpi World', date: '20 avril 2023', streams: '350K', cover: 'https://i.scdn.co/image/ab67616d00001e022dafecade03c775ac1c1fbf0' },
  ];
  
  return (
    <div className="min-h-screen overflow-x-hidden pb-20">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-audio-dark via-audio-dark/95 to-audio-dark"></div>
        <StarBackground intensity={0.3} speed={0.2} />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-audio-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>
      
      {/* Content */}
      <div className="max-w-6xl mx-auto relative pt-6">
        {/* Artist Banner */}
        <ArtistBanner 
          name={artistInfo.name}
          image={artistInfo.image}
          bio={artistInfo.bio}
          stats={artistInfo.stats}
        />

        {/* Tabs navigation */}
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="bg-audio-surface/20 border border-white/5 backdrop-blur-sm p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-audio-accent/20 data-[state=active]:text-audio-accent">
              Vue d'ensemble
            </TabsTrigger>
            <TabsTrigger value="uploads" className="data-[state=active]:bg-audio-accent/20 data-[state=active]:text-audio-accent">
              Vos titres
            </TabsTrigger>
            <TabsTrigger value="audience" className="data-[state=active]:bg-audio-accent/20 data-[state=active]:text-audio-accent">
              Audience
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-audio-accent/20 data-[state=active]:text-audio-accent">
              Activité
            </TabsTrigger>
          </TabsList>

          {/* Tab Content: Overview */}
          <TabsContent value="overview" className="mt-6 px-6">
            {/* Quick actions */}
            <motion.section 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <div className="flex flex-wrap gap-3">
                <Button 
                  variant="accent"
                  size="pill"
                  className="gap-2"
                  onClick={() => {
                    setShowUploadForm(true);
                    playSoundEffect('click');
                  }}
                >
                  <Upload size={14} />
                  Télécharger un titre
                </Button>
                <Button 
                  variant="outline" 
                  size="pill"
                  className="gap-2 text-audio-light/70"
                  onClick={() => playSoundEffect('click')}
                >
                  <BarChart size={14} />
                  Statistiques
                </Button>
                <Button 
                  variant="outline" 
                  size="pill"
                  className="gap-2 text-audio-light/70"
                  onClick={() => playSoundEffect('click')}
                >
                  <Users size={14} />
                  Communauté
                </Button>
              </div>
            </motion.section>
            
            {/* Recent uploads section */}
            <motion.section
              variants={container}
              initial="hidden"
              animate="show" 
              className="mb-8"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-medium">Téléchargements récents</h2>
                <button 
                  className="text-audio-accent hover:text-audio-accent-light flex items-center gap-1 text-sm"
                  onMouseEnter={() => playSoundEffect('hover')}
                  onClick={() => playSoundEffect('click')}
                >
                  Voir tout <ArrowUpRight size={14} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recentUploads.map((upload, index) => (
                  <motion.div
                    key={index}
                    variants={item}
                    className="backdrop-blur-sm border border-white/5 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-audio-accent/5 transition-shadow duration-300"
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  >
                    <div className="relative aspect-square">
                      <img 
                        src={upload.cover} 
                        alt={upload.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button 
                          className="w-10 h-10 rounded-full bg-audio-accent/90 flex items-center justify-center hover:bg-audio-accent transition-colors"
                          onClick={() => playSoundEffect('click')}
                        >
                          <Play size={18} fill="white" className="text-white ml-0.5" />
                        </button>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-base">{upload.title}</h3>
                      <div className="flex justify-between items-center mt-2 text-audio-light/60 text-xs">
                        <div className="flex items-center gap-1">
                          <Calendar size={12} />
                          <span>{upload.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Play size={12} />
                          <span>{upload.streams}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
            
            {/* Top tracks - Fixed to remove gray background */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-medium">Titres populaires</h2>
                <a 
                  href="#" 
                  className="text-sm text-audio-accent hover:text-audio-accent-light flex items-center gap-1"
                  onClick={() => playSoundEffect('hover')}
                >
                  Voir tout <ArrowUpRight size={14} />
                </a>
              </div>
              
              <Card className="backdrop-blur-sm border-white/5 bg-transparent">
                <CardContent className="p-4">
                  <div className="space-y-1">
                    {topTracks.map((track) => (
                      <div 
                        key={track.id}
                        className="flex items-center justify-between hover:bg-white/5 p-2 rounded-lg transition-colors cursor-pointer"
                        onMouseEnter={() => handleTrackHover(track.id)}
                        onMouseLeave={() => handleTrackHover(null)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img 
                              src={track.cover} 
                              alt={track.title} 
                              className="w-10 h-10 object-cover rounded"
                            />
                            {hoveredTrack === track.id ? (
                              <button 
                                className="absolute inset-0 flex items-center justify-center bg-black/40"
                                onClick={() => playSoundEffect('click')}
                              >
                                <Play size={16} className="text-white" />
                              </button>
                            ) : null}
                          </div>
                          <div>
                            <h3 className="font-medium text-sm">{track.title}</h3>
                            <p className="text-xs text-audio-light/60">{track.streams} streams</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="w-24">
                            <Progress value={80} className="h-1 bg-audio-surface/30" />
                          </div>
                          <span className="text-xs text-audio-light/60">{track.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          </TabsContent>

          {/* Upload tab content - Improved with transparent styling */}
          <TabsContent value="uploads" className="mt-6 px-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-medium">Vos titres</h2>
              <Button 
                variant="accent"
                size="pill"
                className="gap-2"
                onClick={() => {
                  setShowUploadForm(true);
                  playSoundEffect('click');
                }}
              >
                <Upload size={14} />
                Télécharger
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
              <Card className="flex flex-col items-center justify-center p-6 h-48 backdrop-blur-sm bg-transparent border-dashed border-white/10">
                <Music size={32} className="text-audio-light/30 mb-2" />
                <h3 className="text-base font-medium text-audio-light/70 mb-1">Musique</h3>
                <p className="text-xs text-audio-light/50 text-center mb-4">Tous vos titres musicaux</p>
                <Button 
                  variant="outline" 
                  size="pill"
                  className="text-xs"
                >
                  Gérer
                </Button>
              </Card>
              
              <Card className="flex flex-col items-center justify-center p-6 h-48 backdrop-blur-sm bg-transparent border-dashed border-white/10">
                <Album size={32} className="text-audio-light/30 mb-2" />
                <h3 className="text-base font-medium text-audio-light/70 mb-1">Albums</h3>
                <p className="text-xs text-audio-light/50 text-center mb-4">Vos compilations et albums</p>
                <Button 
                  variant="outline" 
                  size="pill"
                  className="text-xs"
                >
                  Gérer
                </Button>
              </Card>
              
              <Card className="flex flex-col items-center justify-center p-6 h-48 backdrop-blur-sm bg-transparent border-dashed border-white/10">
                <List size={32} className="text-audio-light/30 mb-2" />
                <h3 className="text-base font-medium text-audio-light/70 mb-1">Playlists</h3>
                <p className="text-xs text-audio-light/50 text-center mb-4">Vos playlists personnalisées</p>
                <Button 
                  variant="outline" 
                  size="pill"
                  className="text-xs"
                >
                  Gérer
                </Button>
              </Card>
            </div>
          </TabsContent>

          {/* Tab content: Audience */}
          <TabsContent value="audience" className="mt-6 px-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-medium">Votre audience</h2>
            </div>
            
            <div className="p-8 rounded-lg backdrop-blur-sm border border-white/5 bg-transparent text-center">
              <Users size={32} className="mx-auto mb-3 text-audio-light/30" />
              <p className="text-audio-light/70 mb-2 text-sm">Voyez qui vous écoute et d'où vient votre audience</p>
              <p className="text-audio-light/50 mb-4 text-xs">Les données d'audience sont mises à jour quotidiennement</p>
              <Button variant="accent" size="pill">
                Analyser mon audience
              </Button>
            </div>
          </TabsContent>
          
          {/* Tab content: Activity */}
          <TabsContent value="activity" className="mt-6 px-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-medium">Activité récente</h2>
            </div>
            
            <div className="p-8 rounded-lg backdrop-blur-sm border border-white/5 bg-transparent text-center">
              <Heart size={32} className="mx-auto mb-3 text-audio-light/30" />
              <p className="text-audio-light/70 mb-2 text-sm">Voyez qui interagit avec votre musique</p>
              <p className="text-audio-light/50 mb-4 text-xs">Likes, partages, commentaires et plus encore</p>
              <Button variant="accent" size="pill">
                Voir l'activité
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Improved Upload Modal - Apple-inspired design with transparent elements */}
      {showUploadForm && (
        <motion.div 
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-transparent backdrop-blur-xl border border-white/10 rounded-xl w-full max-w-md overflow-hidden"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="font-medium text-audio-light text-sm">Nouveau titre</h3>
              <button 
                className="text-audio-light/60 hover:text-audio-light transition-colors rounded-full w-6 h-6 flex items-center justify-center hover:bg-white/5"
                onClick={() => setShowUploadForm(false)}
              >
                <X size={16} />
              </button>
            </div>
            
            <form onSubmit={handleUpload} className="p-5">
              {isUploading ? (
                <div className="text-center py-6">
                  <div className="mb-4">
                    <Progress value={uploadProgress} className="h-0.5 bg-audio-surface/30" />
                    <p className="text-xs mt-2 text-audio-light/70">Téléchargement en cours... {uploadProgress}%</p>
                  </div>
                  {uploadProgress === 100 && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex flex-col items-center"
                    >
                      <CheckCircle2 className="text-green-400 mb-2" size={28} />
                      <p className="font-medium text-sm">Téléchargement réussi!</p>
                    </motion.div>
                  )}
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-5 text-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <div className="col-span-2 md:col-span-1">
                        <label className="block text-xs text-audio-light/70 mb-1">Titre *</label>
                        <input
                          type="text"
                          name="title"
                          value={uploadFormData.title}
                          onChange={handleInputChange}
                          className="w-full bg-audio-surface/20 border border-white/10 rounded-md px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-audio-accent/50"
                          required
                        />
                      </div>
                      
                      <div className="col-span-2 md:col-span-1">
                        <label className="block text-xs text-audio-light/70 mb-1">Genre *</label>
                        <select
                          name="genre"
                          value={uploadFormData.genre}
                          onChange={handleInputChange}
                          className="w-full bg-audio-surface/20 border border-white/10 rounded-md px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-audio-accent/50 appearance-none"
                          required
                        >
                          <option value="">Sélectionner</option>
                          <option value="rap">Rap</option>
                          <option value="pop">Pop</option>
                          <option value="rock">Rock</option>
                          <option value="electronic">Électronique</option>
                          <option value="jazz">Jazz</option>
                          <option value="classical">Classique</option>
                          <option value="other">Autre</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs text-audio-light/70 mb-1">Description</label>
                      <textarea
                        name="description"
                        value={uploadFormData.description}
                        onChange={handleInputChange}
                        className="w-full bg-audio-surface/20 border border-white/10 rounded-md px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-audio-accent/50 min-h-[60px] resize-none"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-audio-light/70 mb-1">Date de sortie *</label>
                        <input
                          type="date"
                          name="releaseDate"
                          value={uploadFormData.releaseDate}
                          onChange={handleInputChange}
                          className="w-full bg-audio-surface/20 border border-white/10 rounded-md px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-audio-accent/50"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs text-audio-light/70 mb-1">Durée *</label>
                        <input
                          type="text"
                          name="duration"
                          value={uploadFormData.duration}
                          onChange={handleInputChange}
                          placeholder="Ex: 3:45"
                          className="w-full bg-audio-surface/20 border border-white/10 rounded-md px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-audio-accent/50"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs text-audio-light/70 mb-1">Tags (séparés par des virgules)</label>
                      <input
                        type="text"
                        name="tags"
                        value={uploadFormData.tags}
                        onChange={handleInputChange}
                        placeholder="Ex: hip-hop, rap français, summer"
                        className="w-full bg-audio-surface/20 border border-white/10 rounded-md px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-audio-accent/50"
                      />
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="explicit"
                        name="explicit"
                        checked={uploadFormData.explicit}
                        onChange={(e) => handleInputChange(e as any)}
                        className="mr-2 h-3.5 w-3.5"
                      />
                      <label htmlFor="explicit" className="text-xs text-audio-light/70">Contenu explicite</label>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                      <div className="space-y-1">
                        <label className="block text-xs text-audio-light/70 mb-1">Fichier audio *</label>
                        <div className="border border-dashed border-white/10 rounded-md p-4 text-center">
                          <MusicIcon size={20} className="mx-auto mb-2 text-audio-light/40" />
                          <button 
                            type="button"
                            className="px-3 py-1 border border-audio-accent/30 bg-transparent text-audio-accent rounded-full text-xs hover:bg-audio-accent/10 transition-colors"
                          >
                            Parcourir
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <label className="block text-xs text-audio-light/70 mb-1">Image de couverture *</label>
                        <div className="border border-dashed border-white/10 rounded-md p-4 text-center">
                          <Image size={20} className="mx-auto mb-2 text-audio-light/40" />
                          <button 
                            type="button"
                            className="px-3 py-1 border border-audio-accent/30 bg-transparent text-audio-accent rounded-full text-xs hover:bg-audio-accent/10 transition-colors"
                          >
                            Parcourir
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="text-xs rounded-full"
                      onClick={() => setShowUploadForm(false)}
                    >
                      Annuler
                    </Button>
                    <Button
                      type="submit"
                      variant="accent" 
                      size="sm"
                      className="text-xs rounded-full"
                    >
                      Télécharger
                    </Button>
                  </div>
                </>
              )}
            </form>
          </motion.div>
        </motion.div>
      )}
      
      {/* Synthwave neon light effect - Enhanced */}
      <div className="fixed bottom-0 left-0 right-0 h-[70px] pointer-events-none overflow-hidden opacity-40">
        <div className="absolute bottom-0 left-[-10%] right-[-10%] h-[300px] bg-gradient-to-t from-purple-500/10 via-audio-accent/5 to-transparent rounded-[100%_100%_0_0] animate-pulse-soft"></div>
        <div className="absolute bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-audio-accent/50 to-transparent animate-pulse-soft"></div>
        <div className="absolute bottom-3 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent animate-pulse-soft"></div>
        <div className="absolute bottom-6 w-full h-[1px] bg-gradient-to-r from-transparent via-audio-accent/20 to-transparent animate-pulse-soft" style={{ animationDelay: '0.5s' }}></div>
      </div>
    </div>
  );
};

export default CreatorDashboard;
