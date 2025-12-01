"use client";
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";

export interface SchoolData {
  id: number;
  name: string;
  location: string;
  logo: string;
  image: string;
  students: number;
  teachers: number;
  implementationYear: number;
  reduction: string;
  description: string;
  highlights: string[];
  testimonial: string;
  testimonialAuthor: string;
  testimonialRole: string;
  media: Array<{ type: "image" | "video"; url: string; description?: string }>;
}

interface SchoolModalProps {
  school: SchoolData | null;
  onClose: () => void;
}

// Función para extraer ID de video de YouTube
const getYouTubeVideoId = (url: string): string | null => {
  // Soporta múltiples formatos de URL de YouTube
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/, // ID directo de YouTube
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
};

// Función para determinar si es un video de YouTube
const isYouTubeUrl = (url: string): boolean => {
  return (
    url.includes("youtube.com") ||
    url.includes("youtu.be") ||
    getYouTubeVideoId(url) !== null
  );
};

export default function SchoolModal({ school, onClose }: SchoolModalProps) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (school) {
      setIsOpen(true);
      setCurrentMediaIndex(0);
      document.body.style.overflow = "hidden";
    } else {
      setIsOpen(false);
      document.body.style.overflow = "unset";
    }
  }, [school]);

  if (!isOpen || !school) return null;

  const currentMedia = school.media[currentMediaIndex];

  const handleNext = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % school.media.length);
  };

  const handlePrev = () => {
    setCurrentMediaIndex(
      (prev) => (prev - 1 + school.media.length) % school.media.length
    );
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 300);
  };

  // Renderizar video según el tipo
  const renderVideo = (media: { type: string; url: string }) => {
    if (isYouTubeUrl(media.url)) {
      // Video de YouTube
      const videoId = getYouTubeVideoId(media.url);
      if (!videoId) {
        return (
          <div className="w-full h-96 bg-black/20 flex items-center justify-center">
            <p className="text-white">URL de YouTube inválida</p>
          </div>
        );
      }

      return (
        <div className="w-full h-96 relative">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      );
    } else {
      // Video local del servidor
      return (
        <div className="w-full h-96 relative bg-black">
          <video
            controls
            className="w-full h-full object-contain"
            preload="metadata"
          >
            <source src={media.url} type="video/mp4" />
            <source src={media.url} type="video/webm" />
            <source src={media.url} type="video/ogg" />
            Tu navegador no soporta la reproducción de videos.
          </video>
        </div>
      );
    }
  };

  return (
    <>
      {/* Backdrop with animation */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* Modal with animation */}
      <div
        className={`fixed inset-0 z-50 overflow-y-auto transition-all duration-300 transform ${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="flex items-start justify-center min-h-screen px-4 pt-8 pb-8 md:pt-20">
          <div className="bg-white dark:bg-black rounded-3xl shadow-2xl w-full max-w-4xl relative border border-black/10 dark:border-white/10 max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="sticky top-0 right-0 m-6 p-2 bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 rounded-full transition z-50 float-right"
              aria-label="Cerrar modal"
            >
              <X size={24} />
            </button>

            {/* Content */}
            <div className="p-8 md:p-10 pt-6">
              {/* Header */}
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                  {school.name}
                </h2>
                <p className="text-base md:text-lg text-black/60 dark:text-white/60 mb-4">
                  {school.location}
                </p>
                <div className="flex gap-3 flex-wrap">
                  <span className="px-3 md:px-4 py-1.5 md:py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs md:text-sm font-semibold">
                    {school.students} estudiantes
                  </span>
                  <span className="px-3 md:px-4 py-1.5 md:py-2 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full text-xs md:text-sm font-semibold">
                    {school.teachers} docentes
                  </span>
                  <span className="px-3 md:px-4 py-1.5 md:py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs md:text-sm font-semibold">
                    Implementado en {school.implementationYear}
                  </span>
                </div>
              </div>

              {/* Media Gallery */}
              <div className="mb-8 md:mb-10">
                
                {currentMedia?.description && <p className="mb-4 mt-[-1rem]">{currentMedia.description}</p>}

                <div className="relative bg-black/5 dark:bg-white/5 rounded-2xl overflow-hidden mb-4">
                  {/* Renderizar imagen */}
                  {currentMedia?.type === "image" && (
                    <img
                      src={currentMedia.url || "/placeholder.svg"}
                      alt={
                        currentMedia.description ||
                        `Media ${currentMediaIndex + 1}`
                      }
                      className="w-full h-64 sm:h-80 md:h-96 object-cover"
                    />
                  )}

                  {/* Renderizar video */}
                  {currentMedia?.type === "video" && renderVideo(currentMedia)}

                  {/* Navigation buttons */}
                  {school.media.length > 1 && (
                    <>
                      <button
                        onClick={handlePrev}
                        className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-black/80 hover:bg-white dark:hover:bg-black p-2 rounded-full transition shadow-lg"
                        aria-label="Media anterior"
                      >
                        <ChevronLeft size={20} className="md:w-6 md:h-6" />
                      </button>
                      <button
                        onClick={handleNext}
                        className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-black/80 hover:bg-white dark:hover:bg-black p-2 rounded-full transition shadow-lg"
                        aria-label="Media siguiente"
                      >
                        <ChevronRight size={20} className="md:w-6 md:h-6" />
                      </button>
                    </>
                  )}

                  {/* Media counter */}
                  <div className="absolute bottom-3 md:bottom-4 right-3 md:right-4 bg-black/70 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium">
                    {currentMediaIndex + 1} / {school.media.length}
                  </div>
                </div>

                {/* Thumbnail navigation */}
                {school.media.length > 1 && (
                  <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2">
                    {school.media.map((media, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentMediaIndex(idx)}
                        className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition ${
                          idx === currentMediaIndex
                            ? "border-blue-600 ring-2 ring-blue-200 dark:ring-blue-800"
                            : "border-black/20 dark:border-white/20 hover:border-black/40 dark:hover:border-white/40"
                        }`}
                        aria-label={`Ver media ${idx + 1}`}
                      >

                        {media.type === "image" && (
                          <img
                            src={media.url || "/placeholder.svg"}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        )}
                        {media.type === "video" && (
                          <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                            <Play
                              size={16}
                              className="text-white md:w-5 md:h-5"
                            />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {/* Media description */}
                {currentMedia?.description && (
                  <p className="text-sm text-black/60 dark:text-white/60 mt-3 text-center italic">
                    {currentMedia.description}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
                  Descripción
                </h3>
                <p className="text-base md:text-lg text-black/70 dark:text-white/70 leading-relaxed">
                  {school.description}
                </p>
              </div>

              {/* Highlights */}
              <div className="mb-8">
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
                  Resultados Destacados
                </h3>
                <ul className="space-y-3">
                  {school.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-blue-600 to-teal-600 flex items-center justify-center flex-shrink-0 mt-0.5 md:mt-1">
                        <span className="text-white text-xs md:text-sm font-bold">
                          ✓
                        </span>
                      </div>
                      <span className="text-base md:text-lg text-black/70 dark:text-white/70">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Testimonial */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-l-4 border-blue-600 p-5 md:p-6 rounded-r-lg">
                <p className="text-base md:text-lg text-black/70 dark:text-white/70 italic mb-4">
                  "{school.testimonial}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm md:text-base flex-shrink-0">
                    {school.testimonialAuthor
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-sm md:text-base">
                      {school.testimonialAuthor}
                    </p>
                    <p className="text-xs md:text-sm text-black/60 dark:text-white/60">
                      {school.testimonialRole}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
