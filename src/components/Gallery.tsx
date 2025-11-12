
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const images = [
  {
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    alt: "Collaborative workspace with people working on laptops",
  },
  {
    src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    alt: "Person using laptop in modern workspace",
  },
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    alt: "Laptop on glass table in workspace",
  },
  {
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    alt: "Developer workspace with code on screen",
  },
  {
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    alt: "Woman working on laptop in bright workspace",
  },
  {
    src: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    alt: "Comfortable workspace with personal touches",
  },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="mb-3">Explore Our Space</h2>
          <p className="text-gray-600 text-lg">
            Take a visual tour of our beautiful and functional coworking environment.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="cursor-pointer overflow-hidden rounded-lg border shadow-sm hover:shadow-md transition-all"
              onClick={() => setSelectedImage(image.src)}
            >
              <AspectRatio ratio={16 / 9}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover transition-all hover:scale-105 duration-500"
                />
              </AspectRatio>
            </div>
          ))}
        </div>
      </div>
      
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-none">
          <img 
            src={selectedImage || ''} 
            alt="Enlarged view"
            className="w-full h-full object-contain"
          />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Gallery;
