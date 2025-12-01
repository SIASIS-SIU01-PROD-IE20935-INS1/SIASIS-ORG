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
          <div className="bg-white dark:bg-black rounded-3xl shadow-2xl w-full max-w-3xl relative border border-black/10 dark:border-white/10 max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="sticky top-0 right-0 m-6 p-2 bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 rounded-full transition z-50 float-right"
            >
              <X size={24} />
            </button>

            {/* Content */}
            <div className="p-8 md:p-10 pt-6">
              {/* Header */}
              <div className="mb-8">
                <h2 className="text-4xl md:text-5xl font-bold mb-2">
                  {school.name}
                </h2>
                <p className="text-lg text-black/60 dark:text-white/60 mb-4">
                  {school.location}
                </p>
                <div className="flex gap-4 flex-wrap">
                  <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold">
                    {school.students} estudiantes
                  </span>
                  <span className="px-4 py-2 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full text-sm font-semibold">
                    {school.teachers} docentes
                  </span>
                  <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold">
                    Implementado en {school.implementationYear}
                  </span>
                </div>
              </div>

              {/* Media Gallery */}
              <div className="mb-10">
                <div className="relative bg-black/50 dark:bg-white/5 rounded-2xl overflow-hidden mb-4">
                  {currentMedia?.type === "image" && (
                    <img
                      src={currentMedia.url || "/placeholder.svg"}
                      alt={`Media ${currentMediaIndex + 1}`}
                      className="w-full h-96 object-cover"
                    />
                  )}
                  {currentMedia?.type === "video" && (
                    <div className="w-full h-96 bg-black/20 flex items-center justify-center">
                      <Play size={64} className="text-white/50" />
                    </div>
                  )}

                  {/* Navigation buttons */}
                  {school.media.length > 1 && (
                    <>
                      <button
                        onClick={handlePrev}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 rounded-full transition"
                      >
                        <ChevronLeft size={24} className="text-white" />
                      </button>
                      <button
                        onClick={handleNext}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 rounded-full transition"
                      >
                        <ChevronRight size={24} className="text-white" />
                      </button>
                    </>
                  )}

                  {/* Media counter */}
                  <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                    {currentMediaIndex + 1} / {school.media.length}
                  </div>
                </div>

                {/* Thumbnail navigation */}
                {school.media.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto">
                    {school.media.map((media, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentMediaIndex(idx)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                          idx === currentMediaIndex
                            ? "border-blue-600"
                            : "border-black/20 dark:border-white/20 hover:border-black/40 dark:hover:border-white/40"
                        }`}
                      >
                        {media.type === "image" && (
                          <img
                            src={media.url || "/placeholder.svg"}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        )}
                        {media.type === "video" && (
                          <div className="w-full h-full bg-black/50 flex items-center justify-center">
                            <Play size={20} className="text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4">Descripción</h3>
                <p className="text-lg text-black/70 dark:text-white/70 leading-relaxed">
                  {school.description}
                </p>
              </div>

              {/* Highlights */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4">
                  Resultados Destacados
                </h3>
                <ul className="space-y-3">
                  {school.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-600 to-teal-600 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">✓</span>
                      </div>
                      <span className="text-lg text-black/70 dark:text-white/70">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Testimonial */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-6 rounded-r-lg">
                <p className="text-lg text-black/70 dark:text-white/70 italic mb-4">
                  "{school.testimonial}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                    {school.testimonialAuthor
                      .split(" ")
                      .map((word) => word[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-semibold">{school.testimonialAuthor}</p>
                    <p className="text-sm text-black/60 dark:text-white/60">
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
