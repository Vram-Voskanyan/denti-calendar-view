
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dentist } from "@/services/api";

interface DentistSelectorProps {
  dentists: Dentist[];
  selectedDentist: string | null;
  onDentistChange: (dentistId: string | null) => void;
}

const DentistSelector: React.FC<DentistSelectorProps> = ({
  dentists,
  selectedDentist,
  onDentistChange,
}) => {
  const handleChange = (value: string) => {
    if (value === "all") {
      onDentistChange(null);
    } else {
      onDentistChange(value);
    }
  };

  return (
    <div className="w-full max-w-xs">
      <Select
        value={selectedDentist || "all"}
        onValueChange={handleChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a dentist" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Dentists</SelectItem>
          {dentists.map((dentist) => (
            <SelectItem key={dentist.id} value={dentist.id}>
              {dentist.name} - {dentist.specialty}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DentistSelector;
