"use client";

import { useState, FormEvent } from "react";
import {
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

interface FormData {
  nombreCompleto: string;
  cargo: string;
  email: string;
  telefono: string;
  institucion: string;
  mensaje: string;
}

interface FormStatus {
  type: "idle" | "loading" | "success" | "error";
  message: string;
}

export default function ContactSectionWithAPI() {
  const [formData, setFormData] = useState<FormData>({
    nombreCompleto: "",
    cargo: "",
    email: "",
    telefono: "",
    institucion: "",
    mensaje: "",
  });

  const [formStatus, setFormStatus] = useState<FormStatus>({
    type: "idle",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      nombreCompleto: "",
      cargo: "",
      email: "",
      telefono: "",
      institucion: "",
      mensaje: "",
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Cambiar estado a "cargando"
    setFormStatus({
      type: "loading",
      message: "Enviando tu solicitud...",
    });

    try {
      // Enviar los datos al endpoint API
      const response = await fetch("/api/solicitar-implementacion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // Éxito
        setFormStatus({
          type: "success",
          message:
            data.message ||
            "¡Solicitud enviada exitosamente! Te contactaremos pronto.",
        });

        // Resetear el formulario después de 5 segundos
        setTimeout(() => {
          resetForm();
          setFormStatus({ type: "idle", message: "" });
        }, 5000);
      } else {
        // Error del servidor con mensaje
        setFormStatus({
          type: "error",
          message:
            data.message ||
            "Hubo un problema al enviar tu solicitud. Por favor, intenta nuevamente.",
        });

        // Mostrar errores de validación si existen
        if (data.errores && data.errores.length > 0) {
          console.error("Errores de validación:", data.errores);
        }
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setFormStatus({
        type: "error",
        message:
          "Error de conexión. Por favor, verifica tu conexión a internet e intenta nuevamente.",
      });
    }
  };

  return (
    <section
      id="contacto"
      className="py-24 px-4 bg-slate-50 dark:bg-slate-900/50"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Listo para Transformar tu Institución?
          </h2>
          <p className="text-xl text-black/60 dark:text-white/60">
            Contáctanos y descubre cómo SIASIS puede mejorar la gestión de
            asistencia
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <Mail className="text-blue-600" />
            </div>
            <div>
              <p className="font-semibold">Email</p>
              <p className="text-black/60 dark:text-white/60 text-[0.85rem]">
                juanchavezsaldana1@gmail.com
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center">
              <Phone className="text-teal-600" />
            </div>
            <div>
              <p className="font-semibold">Teléfono</p>
              <p className="text-black/60 dark:text-white/60">
                +51 961 863 783
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <MapPin className="text-blue-600" />
            </div>
            <div>
              <p className="font-semibold">Ubicación</p>
              <p className="text-black/60 dark:text-white/60">
                Imperial, Cañete, Perú
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-black p-8 md:p-12 rounded-2xl shadow-xl border border-black/5 dark:border-white/5"
        >
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block font-semibold mb-2">
                Nombre Completo *
              </label>
              <input
                type="text"
                name="nombreCompleto"
                value={formData.nombreCompleto}
                onChange={handleInputChange}
                required
                disabled={formStatus.type === "loading"}
                className="w-full px-4 py-3 rounded-lg border border-black/20 dark:border-white/20 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900/50 outline-none transition bg-white dark:bg-black/50 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Juan Pérez"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Cargo *</label>
              <input
                type="text"
                name="cargo"
                value={formData.cargo}
                onChange={handleInputChange}
                required
                disabled={formStatus.type === "loading"}
                className="w-full px-4 py-3 rounded-lg border border-black/20 dark:border-white/20 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900/50 outline-none transition bg-white dark:bg-black/50 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Director(a)"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block font-semibold mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={formStatus.type === "loading"}
                className="w-full px-4 py-3 rounded-lg border border-black/20 dark:border-white/20 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900/50 outline-none transition bg-white dark:bg-black/50 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="correo@institucion.edu.pe"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Teléfono *</label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                required
                disabled={formStatus.type === "loading"}
                className="w-full px-4 py-3 rounded-lg border border-black/20 dark:border-white/20 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900/50 outline-none transition bg-white dark:bg-black/50 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="+51 961 863 783"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-2">
              Institución Educativa *
            </label>
            <input
              type="text"
              name="institucion"
              value={formData.institucion}
              onChange={handleInputChange}
              required
              disabled={formStatus.type === "loading"}
              className="w-full px-4 py-3 rounded-lg border border-black/20 dark:border-white/20 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900/50 outline-none transition bg-white dark:bg-black/50 disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="I.E. Nombre de la Institución"
            />
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-2">Mensaje *</label>
            <textarea
              name="mensaje"
              value={formData.mensaje}
              onChange={handleInputChange}
              required
              rows={5}
              disabled={formStatus.type === "loading"}
              className="w-full px-4 py-3 rounded-lg border border-black/20 dark:border-white/20 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900/50 outline-none transition bg-white dark:bg-black/50 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Cuéntanos sobre tu institución y cómo podemos ayudarte..."
            />
          </div>

          {/* Mensaje de estado */}
          {formStatus.type !== "idle" && (
            <div
              className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
                formStatus.type === "success"
                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                  : formStatus.type === "error"
                  ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                  : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
              }`}
            >
              {formStatus.type === "success" && (
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              )}
              {formStatus.type === "error" && (
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              )}
              {formStatus.type === "loading" && (
                <Loader2 className="w-5 h-5 flex-shrink-0 mt-0.5 animate-spin" />
              )}
              <p>{formStatus.message}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={formStatus.type === "loading"}
            className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
          >
            {formStatus.type === "loading" ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Enviando...
              </>
            ) : (
              "Solicitar Información"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
