import nodemailer from 'nodemailer';

// Validar variables de entorno críticas al inicio
const requiredEnvVars = {
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_APPLICATION_PASSWORD: process.env.EMAIL_APPLICATION_PASSWORD,
  CORREO_DESTINO: process.env.CORREO_DESTINO
};

// Verificar que todas las variables críticas estén definidas
const missingVars = Object.entries(requiredEnvVars)
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missingVars.length > 0) {
  console.error('❌ Error: Faltan las siguientes variables de entorno:');
  missingVars.forEach(varName => console.error(`   - ${varName}`));
  console.error('\nAsegúrate de configurar estas variables en GitHub Secrets.');
  process.exit(1);
}

// Ahora podemos usar las variables con seguridad de tipo
const EMAIL_USER = process.env.EMAIL_USER!;
const EMAIL_APPLICATION_PASSWORD = process.env.EMAIL_APPLICATION_PASSWORD!;
const CORREO_DESTINO = process.env.CORREO_DESTINO!;

// Configuración del transporter de nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_APPLICATION_PASSWORD
  }
});

// Datos del formulario desde las variables de entorno
const datosFormulario = {
  nombreCompleto: process.env.NOMBRE_COMPLETO || 'No proporcionado',
  cargo: process.env.CARGO || 'No proporcionado',
  email: process.env.EMAIL_SOLICITANTE || 'No proporcionado',
  telefono: process.env.TELEFONO || 'No proporcionado',
  institucion: process.env.INSTITUCION || 'No proporcionado',
  mensaje: process.env.MENSAJE || 'No proporcionado'
};

// Obtener fecha y hora actual en formato legible
const obtenerFechaHora = (): string => {
  const ahora = new Date();
  const opciones: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Lima'
  };
  return ahora.toLocaleString('es-PE', opciones);
};

// Plantilla HTML del correo
const htmlTemplate = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nueva Solicitud SIASIS</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f3f4f6;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #2563eb 0%, #14b8a6 100%); padding: 40px 20px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">
        🎓 Nueva Solicitud de Implementación
      </h1>
      <p style="color: #e0f2fe; margin: 10px 0 0 0; font-size: 16px;">
        Sistema SIASIS
      </p>
    </div>

    <!-- Content -->
    <div style="padding: 40px 30px;">
      
      <!-- Fecha y hora -->
      <div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 15px; margin-bottom: 30px; border-radius: 4px;">
        <p style="margin: 0; color: #1e40af; font-size: 14px;">
          📅 <strong>Fecha de solicitud:</strong> ${obtenerFechaHora()}
        </p>
      </div>

      <!-- Datos del solicitante -->
      <h2 style="color: #1e293b; font-size: 20px; margin: 0 0 20px 0; padding-bottom: 10px; border-bottom: 2px solid #e2e8f0;">
        👤 Datos del Solicitante
      </h2>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
            <strong style="color: #475569;">Nombre Completo:</strong>
          </td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right; color: #1e293b;">
            ${datosFormulario.nombreCompleto}
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
            <strong style="color: #475569;">Cargo:</strong>
          </td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right; color: #1e293b;">
            ${datosFormulario.cargo}
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
            <strong style="color: #475569;">Email:</strong>
          </td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
            <a href="mailto:${datosFormulario.email}" style="color: #2563eb; text-decoration: none;">
              ${datosFormulario.email}
            </a>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
            <strong style="color: #475569;">Teléfono:</strong>
          </td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
            <a href="tel:${datosFormulario.telefono}" style="color: #2563eb; text-decoration: none;">
              ${datosFormulario.telefono}
            </a>
          </td>
        </tr>
      </table>

      <!-- Institución -->
      <h2 style="color: #1e293b; font-size: 20px; margin: 0 0 20px 0; padding-bottom: 10px; border-bottom: 2px solid #e2e8f0;">
        🏫 Institución Educativa
      </h2>

      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
        <p style="margin: 0; color: #1e293b; font-size: 18px; font-weight: bold;">
          ${datosFormulario.institucion}
        </p>
      </div>

      <!-- Mensaje -->
      <h2 style="color: #1e293b; font-size: 20px; margin: 0 0 20px 0; padding-bottom: 10px; border-bottom: 2px solid #e2e8f0;">
        💬 Mensaje
      </h2>

      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #14b8a6; margin-bottom: 30px;">
        <p style="margin: 0; color: #334155; line-height: 1.6; white-space: pre-wrap;">
${datosFormulario.mensaje}
        </p>
      </div>

      <!-- Call to action -->
      <div style="background: linear-gradient(135deg, #dbeafe 0%, #ccfbf1 100%); padding: 25px; border-radius: 8px; text-align: center;">
        <p style="margin: 0 0 15px 0; color: #0f172a; font-size: 16px;">
          <strong>¿Listo para responder?</strong>
        </p>
        <a href="mailto:${datosFormulario.email}?subject=Re: Solicitud de Implementación SIASIS - ${datosFormulario.institucion}" 
           style="display: inline-block; background: linear-gradient(135deg, #2563eb 0%, #14b8a6 100%); color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;">
          📧 Responder al Solicitante
        </a>
      </div>

    </div>

    <!-- Footer -->
    <div style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
      <p style="margin: 0 0 10px 0; color: #64748b; font-size: 14px;">
        Este correo fue generado automáticamente desde el sitio web de SIASIS
      </p>
      <p style="margin: 0; color: #94a3b8; font-size: 12px;">
        Sistema Integral de Asistencia y Seguimiento Institucional
      </p>
      <p style="margin: 10px 0 0 0; color: #94a3b8; font-size: 12px;">
        I.E. 20935 Asunción 8 - Imperial, Cañete, Perú
      </p>
    </div>

  </div>
</body>
</html>
`;

// Configuración del correo
const mailOptions = {
  from: {
    name: 'SIASIS - Solicitudes',
    address: EMAIL_USER
  },
  to: CORREO_DESTINO,
  subject: `🎓 Nueva Solicitud de Implementación - ${datosFormulario.institucion}`,
  html: htmlTemplate,
  replyTo: datosFormulario.email,
  // Texto plano como alternativa
  text: `
Nueva Solicitud de Implementación SIASIS

Fecha: ${obtenerFechaHora()}

DATOS DEL SOLICITANTE:
- Nombre: ${datosFormulario.nombreCompleto}
- Cargo: ${datosFormulario.cargo}
- Email: ${datosFormulario.email}
- Teléfono: ${datosFormulario.telefono}

INSTITUCIÓN EDUCATIVA:
${datosFormulario.institucion}

MENSAJE:
${datosFormulario.mensaje}

---
Este correo fue generado automáticamente desde el sitio web de SIASIS.
  `.trim()
};

// Función principal para enviar el correo
async function enviarCorreo(): Promise<{ success: boolean; messageId: string }> {
  try {
    console.log('📧 Iniciando envío de correo...');
    console.log(`📬 Destinatario: ${CORREO_DESTINO}`);
    console.log(`👤 Solicitante: ${datosFormulario.nombreCompleto} (${datosFormulario.email})`);
    console.log(`🏫 Institución: ${datosFormulario.institucion}`);

    const info = await transporter.sendMail(mailOptions);

    console.log('✅ Correo enviado exitosamente');
    console.log(`📨 Message ID: ${info.messageId}`);
    console.log(`📊 Response: ${info.response}`);
    
    return {
      success: true,
      messageId: info.messageId
    };

  } catch (error: any) {
    console.error('❌ Error al enviar el correo:', error);
    
    // Log detallado del error
    if (error?.response) {
      console.error('Server Response:', error.response);
    }
    if (error?.code) {
      console.error('Error Code:', error.code);
    }
    
    throw error;
  }
}

// Ejecutar el script
enviarCorreo()
  .then(() => {
    console.log('🎉 Proceso completado con éxito');
    process.exit(0);
  })
  .catch((error: any) => {
    console.error('💥 Proceso fallido:', error?.message || error);
    process.exit(1);
  });