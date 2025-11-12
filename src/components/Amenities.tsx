
import { 
  Briefcase, 
  Wifi, 
  Coffee, 
  Users, 
  UserSquare2,
  Store,
  BriefcaseBusiness,
  Building2,
  UsersRound,
  Armchair
} from "lucide-react";

const amenities = [
  {
    icon: Wifi,
    title: "High-Speed Internet",
    description: "Gigabit fiber internet with backup redundancy to keep you connected.",
  },
  {
    icon: Coffee,
    title: "Premium Coffee & Tea",
    description: "Complimentary barista-grade coffee and assorted teas all day long.",
  },
  {
    icon: UserSquare2,
    title: "Meeting Rooms",
    description: "Fully-equipped meeting rooms with video conferencing technology.",
  },
  {
    icon: Armchair,
    title: "Ergonomic Workspace",
    description: "Comfortable ergonomic chairs and adjustable desks for your comfort.",
  },
  {
    icon: Store,
    title: "On-site Café",
    description: "Convenient on-site café with healthy snacks and lunch options.",
  },
  {
    icon: UsersRound,
    title: "Community Events",
    description: "Regular networking events, workshops and learning opportunities.",
  },
  {
    icon: Building2,
    title: "24/7 Access",
    description: "Secure access to the building and your workspace around the clock.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Business Services",
    description: "Mail handling, printing, scanning, and administrative support.",
  },
];

const Amenities = () => {
  return (
    <section id="amenities" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="mb-3">Workspace Amenities</h2>
          <p className="text-gray-600 text-lg">
            Everything you need to stay productive and comfortable in our spaces.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {amenities.map((amenity, index) => (
            <div 
              key={amenity.title}
              className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-all"
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <amenity.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{amenity.title}</h3>
              <p className="text-gray-600">{amenity.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Amenities;
