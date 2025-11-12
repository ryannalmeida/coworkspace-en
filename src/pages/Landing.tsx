
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowRight, Check } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container-custom flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold text-primary">CoworkSpace</h1>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Modern workspaces for <span className="text-primary">Modern Professionals</span>
              </h1>
              <p className="text-xl text-gray-600">
                Reserve your ideal workspace and boost your productivity with our integrated reservation system.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link to="/register">
                  <Button size="lg" className="text-base px-6">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="text-base px-6">
                    Existing Users
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="aspect-video overflow-hidden rounded-lg shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1605565348518-bef3e7d6fed8" 
                  alt="Modern coworking space" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-2/3 aspect-square overflow-hidden rounded-lg shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1497215842964-222b430dc094" 
                  alt="People working in a coworking space" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Why Choose CoworkSpace</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
             Our reservation system makes booking and managing your workspaces simple and efficient.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Booking</h3>
              <p className="text-gray-600">
                Reserve your workspace with just a few clicks, choose your preferred time and manage your reservations easily.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <Bell className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Notifications</h3>
              <p className="text-gray-600">
                Receive timely reminders about your upcoming reservations and important updates through our notification system.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <BarChart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Usage Reports</h3>
              <p className="text-gray-600">
               Access detailed reports about your workspace usage, helping you analyze patterns and optimize your reservations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Simple Pricing</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the membership that best meets your needs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-medium">Basic</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold">$99</span>
                  <span className="ml-2 text-gray-500">/month</span>
                </div>
                <p className="mt-4 text-gray-600">Perfect for occasional use and freelancers</p>
              </div>
              <div className="border-t border-gray-200 px-6 py-4">
                <ul className="space-y-3">
                  {['5 days per month', 'Access to common areas', 'High-speed Wi-Fi', 'Coffee and snacks'].map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul> 
              </div>
              <div className="border-t border-gray-200 px-6 py-4">
                <Link to="/register">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden relative transform scale-105 z-10">
              <div className="absolute top-0 inset-x-0 bg-primary text-white text-center py-1 text-sm">POPULAR</div>
              <div className="p-6 pt-9">
                <h3 className="text-lg font-medium">Professional</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold">$199</span>
                  <span className="ml-2 text-gray-500">/month</span>
                </div>
                <p className="mt-4 text-gray-600">Ideal for regular users and small teams</p>
              </div>
              <div className="border-t border-gray-200 px-6 py-4">
                <ul className="space-y-3">
                  {[
                    'Unlimited access',
                    'Dedicated desk',
                    'Meeting room credits (5h/month)',
                    'Business address',
                    '24/7 building access'
                  ].map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-gray-200 px-6 py-4">
                <Link to="/register">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-medium">Enterprise</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold">$499</span>
                  <span className="ml-2 text-gray-500">/month</span>
                </div>
                <p className="mt-4 text-gray-600">For growing teams and companies</p>
              </div>
              <div className="border-t border-gray-200 px-6 py-4">
                <ul className="space-y-3">
                  {[
                    'Private office space',
                    'Team meeting rooms',
                    'Unlimited meeting room reservations',
                    'Brand customization options',
                    'Receptionist services',
                    'Enterprise support' 
                  ].map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-gray-200 px-6 py-4">
                <Link to="/register">
                  <Button className="w-full">Contact Sales</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Get Started?</h2>
            <p className="mt-4 text-xl opacity-90">
             Join thousands of professionals who have already discovered the benefits of CoworkSpace.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/register">
                <Button variant="outline" size="lg" className="text-primary border-white hover:bg-white/10 font-semibold">
                  Create an Account
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="text-primary border-white hover:bg-white/10">
                 Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white text-xl font-bold mb-4">CoworkSpace</h3>
              <p className="mb-4 opacity-75">
                Modern workspaces for a new way of working. Reserve, manage and enjoy premium coworking spaces.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['Home', 'About Us', 'Pricing', 'Location', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href="#" className="opacity-75 hover:opacity-100 hover:text-primary transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact Us</h4>
              <address className="not-italic opacity-75">
                <p>Workspace</p>
                <p>Belo Horizonte, Brazil</p>
                <p className="mt-2">support@coworkspace.com</p>
                <p>(31) 91234-5678</p>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center opacity-60 text-sm">
            <p>&copy; {new Date().getFullYear()} CoworkSpace. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const Calendar = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);

const Bell = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

const BarChart = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" x2="12" y1="20" y2="10" />
    <line x1="18" x2="18" y1="20" y2="4" />
    <line x1="6" x2="6" y1="20" y2="16" />
  </svg>
);

export default Landing;
