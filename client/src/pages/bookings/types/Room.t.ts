export type Room = {
  id: number;
  roomNumber: string;
  type: "suite" | "normal" | "premium";
  pricePerNight: number;
  status: "unavailable" | "available" | "occupied" | "maintenance" | "cleaning";
  capacity: number;
  description?: string | null;
  images: RoomImage[];
};

export type RoomImage = {
  id: number;
  name: string;
  type: "normal" | "3d" | "panoramic";
  path?: string | null;
  url?: string | null;
  roomId: number;
};
