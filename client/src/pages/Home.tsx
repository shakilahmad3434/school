import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Benefits from '../components/Benefits';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';

function Home() {

  return (
    <div className="min-h-screen bg-white">
        <Header />
        <Hero />
        <Features />
        <Benefits />
        <Testimonials />
        <Pricing />
        <Footer />
    </div>
  );
}

export default Home;