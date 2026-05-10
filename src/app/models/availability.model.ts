export interface AmenityAvailability {
  unitId: number;
  unitName: string;
  slots: AvailabilitySlot[];
}

export interface AvailabilitySlot {
  slotId: number;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}