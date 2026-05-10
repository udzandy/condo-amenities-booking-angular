export interface AmenityAdminModel {

  amenityId: number;

  name: string;

  description: string;

  price: number;

  imagePath: string;

  routePath: string;

  isActive: boolean;

  units: AmenityUnitModel[];
}

export interface AmenityUnitModel {

  unitId: number;

  unitName: string;

  isActive: boolean;

  slots: AmenitySlotModel[];
}

export interface AmenitySlotModel {

  slotId: number;

  startTime: string;

  endTime: string;

  isActive: boolean;
}