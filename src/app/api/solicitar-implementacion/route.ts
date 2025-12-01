import { NextRequest, NextResponse } from "next/server";

// Tipos para los datos del formulario
interface DatosFormulario {
  nombreCompleto: string;
  cargo: string;
  email: string;
  telefono: string;
  institucion: string;
  mensaje: string;
}

// Función para validar email
function esEmailValido(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Función para validar teléfono (formato peruano)
function esTelefonoValido(telefono: string): boolean {
  // Acepta formatos: +51961863783, 961863783, 961-863-783
  const regex = /^(\+51)?[\s-]?[9]\d{8}$/;
  return regex.test(telefono.replace(/[\s-]/g, ""));
}

// Función para validar los datos del formulario
function validarDatosFormulario(datos: any): {
  valido: boolean;
  errores: string[];
  datosLimpios?: DatosFormulario;
} {
  const errores: string[] = [];

  // Validar campos requeridos
  if (!datos.nombreCompleto || datos.nombreCompleto.trim().length === 0) {
    errores.push("El nombre completo es requerido");
  }

  if (!datos.cargo || datos.cargo.trim().length === 0) {
    errores.push("El cargo es requerido");
  }

  if (!datos.email || datos.email.trim().length === 0) {
    errores.push("El email es requerido");
  } else if (!esEmailValido(datos.email)) {
    errores.push("El email no tiene un formato válido");
  }

  if (!datos.telefono || datos.telefono.trim().length === 0) {
    errores.push("El teléfono es requerido");
  } else if (!esTelefonoValido(datos.telefono)) {
    errores.push(
      "El teléfono no tiene un formato válido (debe ser un número peruano)"
    );
  }

  if (!datos.institucion || datos.institucion.trim().length === 0) {
    errores.push("La institución educativa es requerida");
  }

  if (!datos.mensaje || datos.mensaje.trim().length === 0) {
    errores.push("El mensaje es requerido");
  } else if (datos.mensaje.trim().length < 10) {
    errores.push("El mensaje debe tener al menos 10 caracteres");
  }

  if (errores.length > 0) {
    return { valido: false, errores };
  }

  // Limpiar y formatear datos
  const datosLimpios: DatosFormulario = {
    nombreCompleto: datos.nombreCompleto.trim(),
    cargo: datos.cargo.trim(),
    email: datos.email.trim().toLowerCase(),
    telefono: datos.telefono.trim(),
    institucion: datos.institucion.trim(),
    mensaje: datos.mensaje.trim(),
  };

  return { valido: true, errores: [], datosLimpios };
}

// Función para gatillar el workflow de GitHub Actions
async function gatillarWorkflow(datos: DatosFormulario): Promise<{
  success: boolean;
  message: string;
  error?: any;
}> {
  try {
    const GITHUB_TOKEN = process.env.GITHUB_WORKFLOW_PAT;
    const GITHUB_OWNER = process.env.GITHUB_OWNER || "tu-usuario"; // Cambia esto
    const GITHUB_REPO = process.env.GITHUB_REPO || "tu-repositorio"; // Cambia esto

    if (!GITHUB_TOKEN) {
      throw new Error(
        "GITHUB_WORKFLOW_PAT no está configurado en las variables de entorno"
      );
    }

    // Endpoint de GitHub API para repository_dispatch
    const githubApiUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/dispatches`;

    console.log(`🚀 Gatillando workflow en: ${GITHUB_OWNER}/${GITHUB_REPO}`);

    const response = await fetch(githubApiUrl, {
      method: "POST",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event_type: "solicitud-implementacion-siasis",
        client_payload: {
          nombreCompleto: datos.nombreCompleto,
          cargo: datos.cargo,
          email: datos.email,
          telefono: datos.telefono,
          institucion: datos.institucion,
          mensaje: datos.mensaje,
          timestamp: new Date().toISOString(),
        },
      }),
    });

    if (response.status === 204) {
      console.log("✅ Workflow gatillado exitosamente");
      return {
        success: true,
        message: "Workflow gatillado exitosamente",
      };
    } else {
      const errorData = await response.text();
      console.error(
        "❌ Error al gatillar workflow:",
        response.status,
        errorData
      );

      return {
        success: false,
        message: `Error al gatillar workflow: ${response.status}`,
        error: errorData,
      };
    }
  } catch (error: any) {
    console.error("💥 Error inesperado al gatillar workflow:", error);
    return {
      success: false,
      message: "Error inesperado al procesar la solicitud",
      error: error.message,
    };
  }
}

// Handler del endpoint POST
export async function POST(request: NextRequest) {
  try {
    console.log("📥 Recibiendo solicitud de información...");

    // Parsear el body de la solicitud
    const body = await request.json();

    // Validar los datos del formulario
    const validacion = validarDatosFormulario(body);

    if (!validacion.valido) {
      console.log("❌ Validación fallida:", validacion.errores);
      return NextResponse.json(
        {
          success: false,
          message: "Errores de validación en el formulario",
          errores: validacion.errores,
        },
        { status: 400 }
      );
    }

    console.log("✅ Datos validados correctamente");
    console.log(`📧 Email: ${validacion.datosLimpios!.email}`);
    console.log(`🏫 Institución: ${validacion.datosLimpios!.institucion}`);

    // Gatillar el workflow de GitHub Actions
    const resultado = await gatillarWorkflow(validacion.datosLimpios!);

    if (resultado.success) {
      return NextResponse.json(
        {
          success: true,
          message: "Solicitud enviada exitosamente. Te contactaremos pronto.",
          data: {
            nombreCompleto: validacion.datosLimpios!.nombreCompleto,
            institucion: validacion.datosLimpios!.institucion,
          },
        },
        { status: 200 }
      );
    } else {
      console.error("❌ Error al gatillar workflow:", resultado.error);
      return NextResponse.json(
        {
          success: false,
          message:
            "Hubo un problema al procesar tu solicitud. Por favor, intenta nuevamente o contáctanos directamente.",
          error: resultado.message,
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("💥 Error inesperado en el endpoint:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          "Error interno del servidor. Por favor, intenta nuevamente más tarde.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// Método OPTIONS para CORS (si es necesario)
export async function OPTIONS(request: NextRequest) {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}
