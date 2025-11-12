
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';
import { useReservations } from '../contexts/ReservationContext';
import { Button } from '../components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Calendar } from '../components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { cn } from '../lib/utils';
import { CalendarIcon, Loader } from 'lucide-react';
import Layout from '../components/Layout';

// Available spaces for reservation
const availableSpaces = [
  { id: 'desk-1', name: 'Desk 1', type: 'desk' },
  { id: 'desk-2', name: 'Desk 2', type: 'desk' },
  { id: 'desk-3', name: 'Desk 3', type: 'desk' },
  { id: 'meeting-a', name: 'Meeting Room A', type: 'room' },
  { id: 'meeting-b', name: 'Meeting Room B', type: 'room' },
  { id: 'conference', name: 'Conference Room', type: 'room' },
  { id: 'office-1', name: 'Private Office 1', type: 'office' },
  { id: 'office-2', name: 'Private Office 2', type: 'office' },
];

const formSchema = z.object({
  date: z.date({
    required_error: "Please select a date",
  }),
  startTime: z.string().min(1, { message: "Please select a start time" }),
  endTime: z.string().min(1, { message: "Please select an end time" }),
  space: z.string().min(1, { message: "Please select a space" }),
}).refine(data => {
  // Validate that end time is after start time
  return data.startTime < data.endTime;
}, {
    message: "End time must be after start time",
  path: ["endTime"],
});

type FormValues = z.infer<typeof formSchema>;

const generateTimeSlots = () => {
  const times = [];
  for (let hour = 8; hour <= 20; hour++) {
    for (let minute of [0, 30]) {
      const formattedHour = hour.toString().padStart(2, '0');
      const formattedMinute = minute.toString().padStart(2, '0');
      times.push(`${formattedHour}:${formattedMinute}`);
    }
  }
  return times;
};

const timeSlots = generateTimeSlots();

const NewReservation = () => {
  const { user, loading: authLoading } = useAuth();
  const { createReservation } = useReservations();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [spaceType, setSpaceType] = useState<string>("all");

  useEffect(() => {
    
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

 
  const filteredSpaces = spaceType === "all" 
    ? availableSpaces 
    : availableSpaces.filter(space => space.type === spaceType);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: undefined,
      startTime: "",
      endTime: "",
      space: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      const { date, startTime, endTime, space } = values;
     
      const spaceName = availableSpaces.find(s => s.id === space)?.name || space;
      
      const formattedDate = date.toISOString().split('T')[0];
      
      await createReservation(formattedDate, startTime, endTime, spaceName);
      navigate('/reservations');
    } catch (error) {
      console.error('Reservation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">New Reservation</h1>
          <p className="text-muted-foreground">
            Reserve your workspace and be productive
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Reserve a Space</CardTitle>
            <CardDescription>
             Select a date, time and space to reserve
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Date Selection */}
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Choose a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => {
                              
                              const today = new Date();
                              today.setHours(0, 0, 0, 0);
                              return date < today;
                            }}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Select a date for your reservation
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Time Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Start Time */}
                  <FormField
                    control={form.control}
                    name="startTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Time</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select start time" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={`start-${time}`} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* End Time */}
                  <FormField
                    control={form.control}
                    name="endTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Time</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select end time" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem 
                                key={`end-${time}`} 
                                value={time}
                                disabled={time <= form.getValues("startTime")}
                              >
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Space Type Filter */}
                <div>
                  <FormLabel>Space Type</FormLabel>
                  <Select
                    value={spaceType}
                    onValueChange={setSpaceType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Spaces</SelectItem>
                      <SelectItem value="desk">Desks</SelectItem>
                      <SelectItem value="room">Meeting Rooms</SelectItem>
                      <SelectItem value="office">Private Offices</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground mt-1">
                    Filter spaces by type
                  </p>
                </div>

                {/* Space Selection */}
                <FormField
                  control={form.control}
                  name="space"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Space</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a space" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {filteredSpaces.map((space) => (
                            <SelectItem key={space.id} value={space.id}>
                              {space.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Creating reservation...
                    </>
                  ) : (
                    'Create Reservation'
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => navigate('/reservations')}>
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default NewReservation;
