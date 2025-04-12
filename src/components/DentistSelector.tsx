
import React, { useEffect } from "react";
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
  // Set first dentist as default if no dentist is selected
  useEffect(() => {
    if (!selectedDentist && dentists.length > 0) {
      onDentistChange(dentists[0].id);
    }
  }, [dentists, selectedDentist, onDentistChange]);

  return (
    <div className="w-full max-w-xs">
      <Select
        value={selectedDentist || ""}
        onValueChange={(value) => onDentistChange(value)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a dentist" />
        </SelectTrigger>
        <SelectContent>
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
