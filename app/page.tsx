
import Footer from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { AboutUs } from '@/components/AboutUs';
import Products from '@/components/Products';

export default function Home() {
  return (
      <div>
          <Header />
          <Hero />
          <About />
          <Products />
          <AboutUs />
          <Footer />
          
     </div>
    
  );
}
