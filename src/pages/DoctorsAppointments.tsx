import React, { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope, Calendar } from "lucide-react";
import { fetchAppointments, fetchDentists, Appointment, Dentist } from "@/services/api";

const DoctorsAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch both appointments and dentists in parallel
        const [appointmentsData, dentistsData] = await Promise.all([
          fetchAppointments(),
          fetchDentists()
        ]);
        
        setAppointments(appointmentsData);
        setDentists(dentistsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: "Failed to load appointments data. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
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
                    <TableHead>Doctor</TableHead>
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
                        {appointment.dentist_id.name}
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
