import { Montserrat } from "next/font/google";
import localFont from "next/font/local"

import "./globals.css";
import NavBar from "@/Components/NavBar";
import Providers from "@/Components/Providers/Providers";

const montse = Montserrat({ subsets: ["latin"] , variable:'--font-montse', weight: ['200', '300', '400', '500', '600', '700', '800']});

const helvetica = localFont({src:[{path:'../../public/fonts/Helvetica.otf',weight:'400',style:'normal'},
  {path:'../../public/fonts/Helvetica-Light.otf',weight:'300',style:'normal'},
  {path:'../../public/fonts/Helvetica-Thin.otf',weight:'200',style:'normal'},
  {path:'../../public/fonts/Helvetica-UltraLight.otf',weight:'100',style:'normal'},
  ]
  , display: 'swap', variable: '--font-helvetica'});

export const metadata = {
  title: "AdminSeg",
  description: "Catálogo de productos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${montse.variable} ${helvetica.variable} `}>
        <Providers>
        {children}
        </Providers>
        </body>
    </html>
  );
}
