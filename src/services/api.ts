
import { toast } from "sonner";

const API_BASE_URL = "https://dentist-appointment-server-production.up.railway.app";

export interface Dentist {
  id: string;
  name: string;
  specialty: string;
}

export interface AvailabilityResponse {
  date: string;
  dentistId?: string;
  availableSlots: string[];
}

export interface Patient {
  name: string;
  email: string;
  phone: string;
}

export interface AppointmentRequest {
  dentistId: string;
  date: string;
  time: string;
  patient: Patient;
}

export interface AppointmentResponse {
  appointmentId: string;
  status: string;
}

export const fetchDentists = async (): Promise<Dentist[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/dentists`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch dentists: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching dentists:", error);
    toast.error("Failed to load dentists. Please try again later.");
    return [];
  }
};

export const fetchAvailability = async (
  date: string,
  dentistId?: string
): Promise<AvailabilityResponse> => {
  try {
    let url = `${API_BASE_URL}/availability?date=${date}`;
    
    if (dentistId) {
      url += `&dentistId=${dentistId}`;
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch availability: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching availability:", error);
    toast.error("Failed to load available time slots. Please try again later.");
    return { date, dentistId, availableSlots: [] };
  }
};

export const bookAppointment = async (
  appointment: AppointmentRequest
): Promise<AppointmentResponse | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointment),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to book appointment: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error booking appointment:", error);
    toast.error("Failed to book appointment. Please try again later.");
    return null;
  }
};
