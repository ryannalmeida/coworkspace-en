
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      <div className="container-custom min-h-[90vh] flex flex-col items-center justify-center py-20 relative z-10">
        <div className="max-w-3xl text-center space-y-6">
          <h1 className="animate-fade-in font-bold text-5xl md:text-6xl lg:text-7xl">
            Where <span className="text-primary">Innovation</span> Meets Productivity
          </h1>
          <p className="animate-fade-in-delay-1 text-xl text-gray-600 md:text-2xl max-w-2xl mx-auto">
           Modern coworking spaces designed to inspire creativity and promote collaboration.
          </p>
          <div className="animate-fade-in-delay-2 pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-base px-6">Schedule a Visit</Button>
            <Button size="lg" variant="outline" className="text-base px-6">View Membership</Button>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c')] bg-cover bg-center opacity-10"></div>
      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Hero;
