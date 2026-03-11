import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Activities from "@/components/Activities";
import Benefits from "@/components/Benefits";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import KakaoFloatingButton from "@/components/KakaoFloatingButton";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Activities />
      <Benefits />
      <ContactForm />
      <Footer />
      <KakaoFloatingButton />
    </main>
  );
}
