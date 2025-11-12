
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckIcon } from "lucide-react";

const membershipPlans = [
  {
    name: "Hot Desk",
    price: "$149",
    description: "For individuals who need a flexible workspace",
    features: [
      "Access during business hours",
      "Shared workspace",
      "High-speed internet",
      "Coffee & tea included",
      "Access to events",
    ],
    popular: false,
  },
  {
    name: "Dedicated Desk",
    price: "$299",
    description: "For those who need their own permanent space",
    features: [
      "24/7 access",
      "Your own desk & chair",
      "Lockable storage",
      "Mail & package handling",
      "Meeting room credits (2 hrs/week)",
      "All amenities included",
    ],
    popular: true,
  },
  {
    name: "Private Office",
    price: "$599",
    description: "For teams who need privacy and their own space",
    features: [
      "24/7 access",
      "Private lockable office",
      "Dedicated high-speed internet",
      "Meeting room credits (5 hrs/week)",
      "Mail & package handling",
      "All amenities included",
      "Company branding options",
    ],
    popular: false,
  },
];

const Memberships = () => {
  return (
    <section id="memberships" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="mb-3">Memberships</h2>
          <p className="text-gray-600 text-lg">
            Choose from our flexible membership options to find the perfect fit for your needs.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {membershipPlans.map((plan) => (
            <Card 
              key={plan.name}
              className={`flex flex-col h-full transition-all ${
                plan.popular ? "border-primary shadow-lg shadow-primary/10 scale-105" : ""
              }`}
            >
              {plan.popular && (
                <div className="bg-primary text-primary-foreground text-sm font-medium text-center py-1">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-1">/month</span>
                </div>
                <CardDescription className="mt-3">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2 mt-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-primary shrink-0 mr-2 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  variant={plan.popular ? "default" : "outline"} 
                  className="w-full"
                >
                 Choose Plan
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Memberships;
