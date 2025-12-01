import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SIASIS - Sistema de Control de Asistencia Institucional",
  description:
    "Solución integral para gestión de asistencia escolar con geolocalización, notificaciones automáticas y reportes en tiempo real",
  icons: {
    icon: ["/images/icons/favicon.ico"],

  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans antialiased`}>
        {children}
        
      </body>
    </html>
  )
}
