export type RentalRequest = {
  id: string;
  properties_id: string;
  userId: string;
  move_in_date: string;
  lease_duration: string;
  status: "pending" | "active_completed" | "approved" | "rejected";
  created_at: string;
  updated_at: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    phone: string;
    status: string;
    divison: string;
    district: string;
  };
  properties: {
    id: string;
    title: string;
    description: string | null;
    rent: string;
    bedrooms: string;
    bathrooms: string;
    size_sqft: string;
    floor: string;
    availability: boolean;
    available_from: string;
    address: string;
    division: string;
    images: string;
    userId: string;
    categoriesId: number;
    propertiesId: string | null;
  };
};
