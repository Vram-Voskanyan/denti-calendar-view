
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { formatDisplayDate, formatDisplayTime } from "@/utils/dateUtils";
import { Dentist, AppointmentResponse, Patient } from "@/services/api";

interface AppointmentConfirmationProps {
  appointmentResponse: AppointmentResponse;
  dentist: Dentist | null;
  date: Date;
  time: string;
  patient: Patient;
  onClose: () => void;
}

const AppointmentConfirmation: React.FC<AppointmentConfirmationProps> = ({
  appointmentResponse,
  dentist,
  date,
  time,
  patient,
  onClose,
}) => {
  return (
    <div className="p-6 bg-white rounded-lg border border-dentist-border max-w-md mx-auto">
      <div className="text-center mb-6">
        <CheckCircle size={60} className="mx-auto text-green-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800">Appointment Confirmed!</h2>
        <p className="text-gray-600 mt-2">
          Your appointment has been successfully booked.
        </p>
      </div>
      
      <div className="bg-dentist-light p-4 rounded-md mb-6">
        <h3 className="font-semibold text-lg mb-2">Appointment Details</h3>
        <div className="space-y-2">
          <p><span className="font-medium">Appointment ID:</span> {appointmentResponse.appointmentId}</p>
          <p><span className="font-medium">Status:</span> {appointmentResponse.status}</p>
          <p><span className="font-medium">Dentist:</span> {dentist?.name || "Not specified"}</p>
          <p><span className="font-medium">Date:</span> {formatDisplayDate(date)}</p>
          <p><span className="font-medium">Time:</span> {formatDisplayTime(time)}</p>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-md mb-6">
        <h3 className="font-semibold text-lg mb-2">Patient Information</h3>
        <div className="space-y-2">
          <p><span className="font-medium">Name:</span> {patient.name}</p>
          <p><span className="font-medium">Email:</span> {patient.email}</p>
          <p><span className="font-medium">Phone:</span> {patient.phone}</p>
        </div>
      </div>
      
      <div className="text-center space-y-3">
        <p className="text-sm text-gray-500">
          A confirmation email has been sent to {patient.email}
        </p>
        <Button 
          onClick={onClose}
          className="w-full bg-dentist-primary hover:bg-dentist-secondary"
        >
          Book Another Appointment
        </Button>
      </div>
    </div>
  );
};

export default AppointmentConfirmation;
