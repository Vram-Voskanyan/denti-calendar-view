
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import CalendarHeader from "@/components/Calendar/CalendarHeader";
import MonthView from "@/components/Calendar/MonthView";
import DentistSelector from "@/components/DentistSelector";
import TimeSlots from "@/components/TimeSlots";
import AppointmentForm from "@/components/AppointmentForm";
import AppointmentConfirmation from "@/components/AppointmentConfirmation";
import { fetchDentists, fetchAvailability, bookAppointment } from "@/services/api";
import { formatDate } from "@/utils/dateUtils";
import { Dentist, AppointmentResponse, Patient } from "@/services/api";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  // State for calendar
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  // State for dentists and appointments
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [selectedDentist, setSelectedDentist] = useState<string | null>(null);
  const [selectedDentistObj, setSelectedDentistObj] = useState<Dentist | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  // State for appointment flow
  const [isLoadingSlots, setIsLoadingSlots] = useState<boolean>(false);
  const [isBookingAppointment, setIsBookingAppointment] = useState<boolean>(false);
  const [appointmentResponse, setAppointmentResponse] = useState<AppointmentResponse | null>(null);
  const [patientInfo, setPatientInfo] = useState<Patient | null>(null);
  
  // Fetch dentists on component mount
  useEffect(() => {
    const loadDentists = async () => {
      const data = await fetchDentists();
      setDentists(data);
      // Select first dentist by default if none is selected
      if (data.length > 0 && !selectedDentist) {
        setSelectedDentist(data[0].id);
      }
    };
    
    loadDentists();
  }, [selectedDentist]);
  
  // Load available slots when date or dentist changes
  useEffect(() => {
    const loadAvailability = async () => {
      if (!selectedDentist) return;
      
      setIsLoadingSlots(true);
      setAvailableSlots([]);
      setSelectedTime(null);
      
      const formattedDate = formatDate(selectedDate);
      const data = await fetchAvailability(formattedDate, selectedDentist);
      
      setAvailableSlots(data.availableSlots);
      setIsLoadingSlots(false);
    };
    
    loadAvailability();
  }, [selectedDate, selectedDentist]);
  
  // Update selected dentist object when ID changes
  useEffect(() => {
    if (selectedDentist) {
      const dentist = dentists.find(d => d.id === selectedDentist) || null;
      setSelectedDentistObj(dentist);
    } else {
      setSelectedDentistObj(null);
    }
  }, [selectedDentist, dentists]);
  
  const handleDateChange = (date: Date) => {
    setCurrentDate(date);
  };
  
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };
  
  const handleDentistChange = (dentistId: string | null) => {
    setSelectedDentist(dentistId);
  };
  
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };
  
  const handleAppointmentSubmit = async (patient: Patient) => {
    if (!selectedDentist || !selectedTime) {
      toast.error("Please select a dentist and time slot");
      return;
    }
    
    setIsBookingAppointment(true);
    setPatientInfo(patient);
    
    const appointment = {
      dentistId: selectedDentist,
      date: formatDate(selectedDate),
      time: selectedTime,
      patient,
    };
    
    const response = await bookAppointment(appointment);
    
    setIsBookingAppointment(false);
    
    if (response) {
      setAppointmentResponse(response);
      toast.success("Appointment booked successfully!");
    }
  };
  
  const handleResetBooking = () => {
    setSelectedTime(null);
    setPatientInfo(null);
    setAppointmentResponse(null);
  };
  
  // Determine which view to show
  const showConfirmation = appointmentResponse && patientInfo;
  const showForm = selectedTime && !showConfirmation;
  
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar and Time Slots Section */}
        <div className="lg:col-span-2">
          <Card className="shadow-md">
            <CardContent className="p-0">
              <CalendarHeader
                currentDate={currentDate}
                onDateChange={handleDateChange}
                onTodayClick={() => handleDateSelect(new Date())}
              />
              
              <div className="p-4 border-b border-dentist-border">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <DentistSelector
                    dentists={dentists}
                    selectedDentist={selectedDentist}
                    onDentistChange={handleDentistChange}
                  />
                  <div className="text-sm text-gray-500">
                    Selected Date: <span className="font-medium">{format(selectedDate, "MMMM d, yyyy")}</span>
                  </div>
                </div>
              </div>
              
              <Tabs defaultValue="calendar" className="w-full">
                <div className="px-4 border-b border-dentist-border">
                  <TabsList className="grid w-full max-w-md grid-cols-2">
                    <TabsTrigger value="calendar">Calendar</TabsTrigger>
                    <TabsTrigger value="times">Available Times</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="calendar" className="mt-0">
                  <MonthView
                    currentDate={currentDate}
                    selectedDate={selectedDate}
                    onDateSelect={handleDateSelect}
                  />
                </TabsContent>
                
                <TabsContent value="times" className="mt-0 p-4">
                  <h3 className="text-lg font-medium mb-3">
                    Available Time Slots for {format(selectedDate, "MMMM d, yyyy")}
                  </h3>
                  {isLoadingSlots ? (
                    <div className="py-8 text-center">
                      <p className="text-gray-500">Loading available time slots...</p>
                    </div>
                  ) : (
                    <TimeSlots
                      availableSlots={availableSlots}
                      selectedTime={selectedTime}
                      onTimeSelect={handleTimeSelect}
                    />
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        {/* Booking Form Section */}
        <div className="lg:col-span-1">
          <Card className="shadow-md">
            <CardContent className="p-0">
              {showConfirmation && appointmentResponse && patientInfo ? (
                <AppointmentConfirmation
                  appointmentResponse={appointmentResponse}
                  dentist={selectedDentistObj}
                  date={selectedDate}
                  time={selectedTime!}
                  patient={patientInfo}
                  onClose={handleResetBooking}
                />
              ) : showForm ? (
                <AppointmentForm
                  selectedDentist={selectedDentistObj}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  onSubmit={handleAppointmentSubmit}
                  isLoading={isBookingAppointment}
                />
              ) : (
                <div className="p-6 text-center">
                  <h2 className="text-xl font-semibold mb-4">Book Your Appointment</h2>
                  <p className="text-gray-600 mb-4">
                    To book an appointment, please select a date and time from the calendar.
                  </p>
                  <div className="p-4 bg-dentist-light rounded-md text-left">
                    <h3 className="font-medium mb-2">How it works:</h3>
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                      <li>Select a date from the calendar</li>
                      <li>Choose an available dentist</li>
                      <li>Pick an available time slot</li>
                      <li>Fill in your details</li>
                      <li>Confirm your appointment</li>
                    </ol>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
