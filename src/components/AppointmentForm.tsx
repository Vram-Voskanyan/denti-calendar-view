
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formatDisplayDate, formatDisplayTime } from "@/utils/dateUtils";
import { Patient } from "@/services/api";
import { Dentist } from "@/services/api";

const phoneRegex = /^\+?[0-9\s\-()]{7,15}$/;

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().regex(phoneRegex, "Please enter a valid phone number"),
});

interface AppointmentFormProps {
  selectedDentist: Dentist | null;
  selectedDate: Date;
  selectedTime: string;
  onSubmit: (patient: Patient) => void;
  isLoading: boolean;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  selectedDentist,
  selectedDate,
  selectedTime,
  onSubmit,
  isLoading,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit({
      name: values.name,
      email: values.email,
      phone: values.phone,
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg border border-dentist-border">
      <h2 className="text-xl font-semibold mb-4">Book Appointment</h2>
      
      <div className="mb-6 p-4 bg-dentist-light rounded-md">
        <div className="mb-2">
          <span className="font-medium">Date:</span> {formatDisplayDate(selectedDate)}
        </div>
        <div className="mb-2">
          <span className="font-medium">Time:</span> {formatDisplayTime(selectedTime)}
        </div>
        <div>
          <span className="font-medium">Dentist:</span> {selectedDentist?.name || "No dentist selected"}
        </div>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john.doe@example.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="+1 234 567 8901" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full bg-dentist-primary hover:bg-dentist-secondary"
            disabled={isLoading}
          >
            {isLoading ? "Booking..." : "Book Appointment"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AppointmentForm;
