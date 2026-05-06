import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";


export const metadata = {
  title: "GLF Auto - Service et Réparation Mécanique",
  description: "Garage GLF Auto - Vente de véhicules et pièces d'occasion, service et réparation mécanique.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}