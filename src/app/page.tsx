"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  ChevronRight,
  CheckCircle,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Contact,
} from "lucide-react";
import SchoolModal, { SchoolData } from "../components/school-modal";
import ContactSectionWithAPI from "../components/ContactSection";

const contactData = {
  email: "juanchavezsaldana1@gmail.com",
  celular: "+51 961 863 783",
};

const schools: SchoolData[] = [
  {
    id: 1,
    name: "I.E. 20935 Asunción 8",
    location: "Imperial, Cañete",
    image: "/images/png/ColegioIE20935.png",
    logo: "/images/png/LogoColegioIE20935.png",
    students: 450,
    teachers: 35,
    implementationYear: 2025,
    reduction: "16% a 5%",
    description:
      "Institución educativa líder en innovación tecnológica en la región de Cañete, pionera en implementar sistemas de control de asistencia inteligente.",
    highlights: [
      "Reducción de ausentismo del 16% al 5%",
      "Mejora en la comunicación con padres",
      "Automatización de reportes administrativos",
    ],
    testimonial:
      "SIASIS ha transformado completamente nuestra gestión de asistencia. Lo que antes nos tomaba horas ahora se hace en minutos.",
    testimonialAuthor: "Lic. María González",
    testimonialRole: "Directora",
    media: [
      {
        type: "image",
        url: "/images/jpg/ImplementacionSistemaIE20935-1.jpg",
        description:
          "Luego de una Capacitación del personal docente para usar el sistema",
      },
      {
        type: "video",
        url: "https://www.youtube.com/watch?v=LxDBGEZLN3Y",
        description: "Profesora registrando su Asistencia en el Sistema",
      },
      {
        type: "video",
        url: "https://www.youtube.com/watch?v=zLLryQSyFzM",
        description:
          "Auxiliar registrando asistencias de estudiantes mediante QR",
      },
    ],
  },
];

export default function SIASISLanding() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState("");
  const [selectedSchool, setSelectedSchool] = useState<SchoolData | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("Gracias por tu mensaje. Nos pondremos en contacto pronto.");
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setFormStatus(""), 3000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      {/* Navigation - Updated colors to blue/teal from purple */}
      <nav
        className={`fixed w-full z-16 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 dark:bg-black/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                <img
                  src={"/images/png/SiasisLogo.png"}
                  className="text-white font-bold text-xl"
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                SIASIS
              </span>
            </div>
            <div className="hidden md:flex gap-8">
              <a
                href="#caracteristicas"
                className="hover:text-blue-600 transition text-sm font-medium"
              >
                Características
              </a>
              <a
                href="#beneficios"
                className="hover:text-blue-600 transition text-sm font-medium"
              >
                Beneficios
              </a>
              <a
                href="#colegios"
                className="hover:text-blue-600 transition text-sm font-medium"
              >
                Casos de Éxito
              </a>
              <a
                href="#contacto"
                className="hover:text-blue-600 transition text-sm font-medium"
              >
                Contacto
              </a>
            </div>
            <button className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition">
              Demo
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-black overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-teal-200 dark:bg-teal-900/20 rounded-full blur-3xl opacity-20"></div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-block mb-6 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              🎯 Transformando la Gestión Educativa
            </p>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-balance">
            Control Automatizado de
            <span className="block bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Asistencia Institucional
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-black/70 dark:text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed text-balance">
            Sistema integral con geolocalización, notificaciones automáticas y
            reportes en tiempo real para instituciones educativas
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="#contacto"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition transform hover:scale-105"
            >
              Solicitar Demo <ArrowRight size={20} />
            </a>
            <a
              href="#caracteristicas"
              className="inline-flex items-center justify-center gap-2 border-2 border-black/20 dark:border-white/20 px-8 py-4 rounded-full font-semibold text-lg hover:bg-black/5 dark:hover:bg-white/5 transition"
            >
              Conocer Más <ChevronRight size={20} />
            </a>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-12 border-t border-black/10 dark:border-white/10">
            <div>
              <p className="text-3xl font-bold text-blue-600">98%</p>
              <p className="text-sm text-black/60 dark:text-white/60 mt-2">
                Precisión en Registros
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-teal-600">80%</p>
              <p className="text-sm text-black/60 dark:text-white/60 mt-2">
                Menos Tiempo Admin
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">5m</p>
              <p className="text-sm text-black/60 dark:text-white/60 mt-2">
                Geolocalización
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Showcase Section */}
      <section
        id="caracteristicas"
        className="py-24 px-4 bg-white dark:bg-black"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Características Principales
            </h2>
            <p className="text-xl text-black/60 dark:text-white/60 max-w-2xl mx-auto">
              Todo lo que necesitas para gestionar asistencia de forma
              inteligente y eficiente
            </p>
          </div>

          {/* Feature 1 */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20 group">
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="/images/jpg/control-de-asistencia-en-tiempo-real-con-geolocali.jpg"
                alt="Control en tiempo real"
                className="w-full h-96 object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-6">
                Control de Asistencia para Personal
              </h3>
              <p className="text-lg text-black/70 dark:text-white/70 mb-8 leading-relaxed text-[1.05rem]">
                Gestiona la puntualidad y asistencia de todo el personal docente
                y administrativo. Calcula desfases horarios y permite a los
                directivos supervisar el cumplimiento de horarios laborales en
                tiempo real desde cualquier dispositivo.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <span>
                    <b>Registro flexible:</b> Directivos registran asistencia o
                    cada personal marca su propia entrada/salida
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <span>
                    <b>Acceso individual:</b> Cada miembro del personal tiene su
                    cuenta propia para registrar asistencia de forma autónoma
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <span>
                    <b>Validación por GPS:</b> Solo permite registrar asistencia
                    dentro del perímetro del colegio mediante geolocalización
                    del dispositivo
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <span>
                    <b>Cálculo automático:</b> Compara horarios establecidos vs.
                    reales y genera alertas por tardanzas o faltas(cuando el
                    personal no se registra o realmente falta)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <span>
                    <b>Reportes exportables:</b> Genera reportes mensuales por
                    personal descargables en Excel{" | "}
                    <a
                      href="/files/excel/Asistencia_Juan_Gonzalez_Noviembre_2025.xlsx"
                      className="underline text-blue-600"
                      download
                    >
                      Descargar Ejemplo
                    </a>
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20 group">
            <div className="order-2 md:order-1">
              <h3 className="text-4xl font-bold mb-4">
                Control de Asistencia de Estudiantes
              </h3>
              <p className="text-lg text-black/70 dark:text-white/70 mb-8 leading-relaxed text-[1rem]">
                Automatiza el registro de asistencia mediante códigos QR únicos.
                El auxiliar escanea con su celular y el sistema determina
                automáticamente si es puntual, tardanza o falta según el horario
                establecido.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                  <span>
                    <b>Toma de asistencia con tarjetas QR:</b> El sistema
                    permite crear tarjetas con código QR único para cada
                    estudiante, listas para imprimir y distribuir. Los
                    estudiantes las presentan diariamente para marcar asistencia
                    en segundos
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                  <span>
                    <b>Funciona sin internet:</b> Si se cae el internet, el
                    sistema sigue funcionando. Guarda los registros en el
                    celular y los envía automáticamente cuando vuelva la
                    conexión
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                  <span>
                    <b>Seguimiento para padres en tiempo real:</b> Los padres
                    revisan desde su celular la asistencia diaria y mensual de
                    sus hijos, con hora exacta de llegada y contacto directo con
                    el profesors
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                  <span>
                    <b>Reportes automáticos descargables:</b>Genera reportes
                    completos por aula en Excel con asistencias, tardanzas y
                    faltas del mes.{" "}
                    <a
                      className="text-blue-500 underline"
                      href="/files/excel/Asistencias_Secundaria_3A_Noviembre_2025.xlsx"
                      download
                    >
                      Descargar Ejemplo
                    </a>
                  </span>
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2 overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="/images/png/TarjetasQRs.png"
                alt="Notificaciones automáticas"
                className="w-full h-96 object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
          </div>

          {/* Feature 3 */}
          <div className="grid md:grid-cols-2 gap-12 items-center group mb-20">
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="/images/jpg/reportes-inteligentes-an-lisis-datos-dashboard.jpg"
                alt="Reportes inteligentes"
                className="w-full h-96 object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-6">Reportes Inteligentes</h3>
              <p className="text-lg text-black/70 dark:text-white/70 mb-8 leading-relaxed">
                Genera reportes detallados con un solo clic. Visualiza
                tendencias, identifica patrones y toma decisiones basadas en
                datos reales.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <span>Reportes mensuales y diarios automatizados</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <span>Exportación en Excel</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <span>Dashboard con métricas en tiempo real</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20 group">
            <div className="order-2 md:order-1">
              <h3 className="text-4xl font-bold mb-6">
                Notificaciones Automáticas
              </h3>
              <p className="text-lg text-black/70 dark:text-white/70 mb-8 leading-relaxed">
                Sistema inteligente que notifica automáticamente a directivos y
                tutores sobre inasistencias y tardanzas recurrentes por correo.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                  <span>
                    Alertas por 3 faltas o tardanzas consecutivas (la cantidad
                    maxima es configurable)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                  <span>Notificaciones a directivos y tutores por email</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                  <span>Reportes automáticos diarios</span>
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2 overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="/images/png/NotificacionPorCorreo.png"
                alt="Notificaciones automáticas"
                className="w-full h-96 object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        id="beneficios"
        className="py-24 px-4 bg-slate-50 dark:bg-slate-900/50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Beneficios Comprobados
            </h2>
            <p className="text-xl text-black/60 dark:text-white/60 max-w-2xl mx-auto">
              Instituciones que implementaron SIASIS han experimentado mejoras
              significativas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "📊",
                title: "Reducción del Ausentismo",
                description:
                  "Disminución de 16% a 4% mediante seguimiento automatizado y notificaciones oportunas.",
              },
              {
                icon: "⏱️",
                title: "Ahorro de Tiempo",
                description:
                  "Reduce hasta 80% el tiempo en procesos administrativos manuales.",
              },
              {
                icon: "✓",
                title: "Mayor Precisión",
                description:
                  "Elimina errores humanos con verificación automática y geolocalización precisa.",
              },
            ].map((benefit, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-black/50 p-8 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition duration-300 border border-black/5 dark:border-white/5"
              >
                <p className="text-4xl mb-4">{benefit.icon}</p>
                <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                <p className="text-black/70 dark:text-white/70 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="colegios" className="py-24 px-4 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Colegios Implementados
            </h2>
            <p className="text-xl text-black/60 dark:text-white/60 max-w-2xl mx-auto">
              Conoce las instituciones educativas que ya confían en SIASIS para
              mejorar su gestión
            </p>
          </div>

          <div className="grid md:grid-cols-1 gap-8">
            {schools.map((school) => (
              <div
                key={school.id}
                className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition border border-black/5 dark:border-white/5"
              >
                <div className="grid md:grid-cols-3 gap-8 p-8">
                  <div className="md:col-span-2">
                    <h3 className="text-3xl font-bold mb-2 flex items-center justify-center">
                      {school.name}{" "}
                      <img
                        src={school.logo}
                        alt={`${school.name} logo`}
                        className="inline-block aspect-square w-12 ml-4"
                      />
                    </h3>
                    <p className="text-lg text-black/60 dark:text-white/60 mb-6 flex items-center gap-2">
                      <MapPin size={20} className="text-blue-600" />
                      {school.location}
                    </p>

                    <p className="text-lg text-black/70 dark:text-white/70 mb-6 leading-relaxed">
                      {school.description}
                    </p>

                    <div className="grid grid-cols-3 gap-4 mb-8">
                      <div className="bg-white dark:bg-black/50 p-4 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">
                          {school.students}
                        </p>
                        <p className="text-sm text-black/60 dark:text-white/60">
                          Estudiantes
                        </p>
                      </div>
                      <div className="bg-white dark:bg-black/50 p-4 rounded-lg">
                        <p className="text-2xl font-bold text-teal-600">
                          {school.teachers}
                        </p>
                        <p className="text-sm text-black/60 dark:text-white/60">
                          Docentes
                        </p>
                      </div>
                      <div className="bg-white dark:bg-black/50 p-4 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">
                          {school.reduction}
                        </p>
                        <p className="text-sm text-black/60 dark:text-white/60">
                          Reducción
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedSchool(school)}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition transform hover:scale-105"
                    >
                      Ver Detalles <ArrowRight size={20} />
                    </button>
                  </div>

                  <div className="overflow-hidden rounded-xl shadow-lg">
                    <img
                      src={school.image || "/placeholder.svg"}
                      alt={school.name}
                      className="w-full h-64 md:h-80 object-cover hover:scale-105 transition duration-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactSectionWithAPI />

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-4 dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                  <img
                    src={"/images/png/SiasisLogoSoloBlanco.png"}
                    className="text-black font-bold text-xl"
                  />
                </div>
                <span className="text-xl font-bold">SIASIS</span>
              </div>
              <p className="text-white/70">
                Sistema Integral de Asistencia y Seguimiento Institucional
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Producto</h3>
              <ul className="space-y-2 text-white/70">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Características
                  </a>
                </li>
                {/* <li>
                  <a href="#" className="hover:text-white transition">
                    Precios
                  </a>
                </li> */}
                <li>
                  <a href="#colegios" className="hover:text-white transition">
                    Casos de Éxito
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Recursos</h3>
              <ul className="space-y-2 text-white/70">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Documentación
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Soporte
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contacto</h3>
              <ul className="space-y-2 text-white/70">
                <li>Cañete, Perú</li>
                <li>{contactData.email}</li>
                <li>{contactData.celular}</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-white/60">
            <p>
              &copy; 2025 SIASIS - Sistema Integral de Asistencia y Seguimiento
              Institucional. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>

      <SchoolModal
        school={selectedSchool}
        onClose={() => setSelectedSchool(null)}
      />
    </div>
  );
}
