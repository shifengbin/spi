export enum SpiMode {
  Mode0 = 0, // CPOL=0, CPHA=0
  Mode1 = 1, // CPOL=0, CPHA=1
  Mode2 = 2, // CPOL=1, CPHA=0
  Mode3 = 3, // CPOL=1, CPHA=1
}

export interface SignalData {
  name: string;
  color: string;
  points: { x: number; y: number }[];
}

export interface PinDef {
  name: string;
  fullName: string;
  description: string;
  color: string;
  direction: 'Master → Slave' | 'Slave → Master' | 'Master Controls';
}