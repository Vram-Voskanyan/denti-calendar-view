
import React, { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope, Calendar } from "lucide-react";

interface Appointment {
  _id: string;
  dentist_id: string;
  date: string;
  time: string;
  patient_name: string;
  patient_email: string;
  patient_phone: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const DoctorsAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("https://dentist-appointment-server-production.up.railway.app/appointments");
        
        if (!response.ok) {
          throw new Error(`Failed to fetch appointments: ${response.status}`);
        }
        
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        toast({
          title: "Error",
          description: "Failed to load appointments. Please try again later.",
          variant: "destructive",
        });
        // Fallback to mock data in case of error
        setAppointments([
          {
            _id: "67f9feb70bdd6ca62cf8ea79",
            dentist_id: "67f012ba04c64e0ed01d8869",
            date: "2025-04-14T23:59:59.999Z",
            time: "09:00",
            patient_name: "Loveable client",
            patient_email: "v@gmail.com",
            patient_phone: "+37499999999",
            status: "confirmed",
            createdAt: "2025-04-12T05:48:39.263Z",
            updatedAt: "2025-04-12T05:48:39.263Z"
          },
          {
            _id: "67f9feb80bdd6ca62cf8ea80",
            dentist_id: "67f012ba04c64e0ed01d8869",
            date: "2025-04-15T23:59:59.999Z",
            time: "10:30",
            patient_name: "Jane Smith",
            patient_email: "jane@example.com",
            patient_phone: "+12345678901",
            status: "confirmed",
            createdAt: "2025-04-12T05:50:22.361Z",
            updatedAt: "2025-04-12T05:50:22.361Z"
          },
          {
            _id: "67f9feb90bdd6ca62cf8ea81",
            dentist_id: "67f012ba04c64e0ed01d8869",
            date: "2025-04-16T23:59:59.999Z",
            time: "14:00",
            patient_name: "Michael Johnson",
            patient_email: "michael@example.com",
            patient_phone: "+10987654321",
            status: "confirmed",
            createdAt: "2025-04-12T05:51:45.612Z",
            updatedAt: "2025-04-12T05:51:45.612Z"
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAppointments();
  }, [toast]);
  
  const formatDateTime = (dateString: string, timeString: string) => {
    try {
      const date = parseISO(dateString);
      return `${format(date, "MMM d, yyyy")} at ${timeString}`;
    } catch (error) {
      return `${dateString} at ${timeString}`;
    }
  };
  
  return (
    <div className="container mx-auto py-6 px-4">
      <Card className="shadow-md">
        <CardHeader className="bg-dentist-light rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Stethoscope className="mr-2 h-6 w-6 text-dentist-primary" />
              <CardTitle>Doctor's Appointments</CardTitle>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="mr-1 h-4 w-4" />
              <span>Today: {format(new Date(), "MMMM d, yyyy")}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex justify-center items-center h-48">
              <p className="text-gray-500">Loading appointments...</p>
            </div>
          ) : appointments.length === 0 ? (
            <div className="flex justify-center items-center h-48">
              <p className="text-gray-500">No appointments found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow key={appointment._id}>
                      <TableCell className="font-medium">
                        {appointment.patient_name}
                      </TableCell>
                      <TableCell>
                        <div>{appointment.patient_email}</div>
                        <div className="text-xs text-gray-500">{appointment.patient_phone}</div>
                      </TableCell>
                      <TableCell>
                        {formatDateTime(appointment.date, appointment.time)}
                      </TableCell>
                      <TableCell>
                        <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          {appointment.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorsAppointments;
