
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Memberships from "@/components/Memberships";
import Amenities from "@/components/Amenities";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      
      <section id="about" className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-4">Uma maneira melhor de trabalhar</h2>
              <p className="text-gray-600 mb-4">
                Fundada em 2025, a CoworkSpace nasceu com uma missão simples: fornecer espaços de trabalho bonitos e funcionais que inspirem a criatividade, promovam a comunidade e aumentem a produtividade.
              </p>
              <p className="text-gray-600 mb-4">
               Nossos espaços são cuidadosamente projetados para atender às necessidades de profissionais modernos,
freelancers, trabalhadores remotos, startups e pequenas empresas.
              </p>
              <p className="text-gray-600">
                Mais do que apenas uma mesa, estamos construindo uma comunidade diversificada de profissionais com ideias semelhantes
que valorizam a colaboração, a inovação e o equilíbrio entre vida pessoal e profissional.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-video overflow-hidden rounded-lg shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                  alt="Person working at CoworkSpace" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-2/3 aspect-square overflow-hidden rounded-lg shadow-lg hidden md:block">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                  alt="Collaborative meeting at CoworkSpace" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Memberships />
      <Amenities />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
