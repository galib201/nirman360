
export interface MockProperty {
  id: string;
  title: string;
  ownerName: string;
  ownerEmail: string;
  price: number;
  trustScore: number;
  verificationStatus: 'pending' | 'approved' | 'rejected';
  location: string;
  type: string;
  postedDate: string;
}

export interface MockUser {
  id: string;
  email: string;
  name: string;
  joinDate: string;
  lastActive: string;
  propertiesViewed: number;
  bookingsMade: number;
}

export interface MockUserActivity {
  id: string;
  userEmail: string;
  propertyTitle: string;
  action: 'visited' | 'unlocked' | 'booked';
  date: string;
}

export interface MockLawFirm {
  id: string;
  name: string;
  contact: string;
  email: string;
  status: 'active' | 'inactive';
  specialization: string;
}

export const mockProperties: MockProperty[] = [
  {
    id: 'p1',
    title: 'Luxury Apartment in Gulshan',
    ownerName: 'Ahmed Rahman',
    ownerEmail: 'ahmed@example.com',
    price: 8500000,
    trustScore: 85,
    verificationStatus: 'pending',
    location: 'Gulshan, Dhaka',
    type: 'Apartment',
    postedDate: '2024-01-15'
  },
  {
    id: 'p2',
    title: 'Modern Villa in Uttara',
    ownerName: 'Fatima Khan',
    ownerEmail: 'fatima@example.com',
    price: 12000000,
    trustScore: 92,
    verificationStatus: 'approved',
    location: 'Uttara, Dhaka',
    type: 'Villa',
    postedDate: '2024-01-10'
  },
  {
    id: 'p3',
    title: 'Commercial Space in Dhanmondi',
    ownerName: 'Mohammad Ali',
    ownerEmail: 'mohammad@example.com',
    price: 15000000,
    trustScore: 78,
    verificationStatus: 'pending',
    location: 'Dhanmondi, Dhaka',
    type: 'Commercial',
    postedDate: '2024-01-20'
  },
  {
    id: 'p4',
    title: 'Family House in Banani',
    ownerName: 'Sarah Ahmed',
    ownerEmail: 'sarah@example.com',
    price: 9500000,
    trustScore: 67,
    verificationStatus: 'rejected',
    location: 'Banani, Dhaka',
    type: 'House',
    postedDate: '2024-01-12'
  }
];

export const mockUsers: MockUser[] = [
  {
    id: 'u1',
    email: 'john.doe@example.com',
    name: 'John Doe',
    joinDate: '2024-01-01',
    lastActive: '2024-01-25',
    propertiesViewed: 15,
    bookingsMade: 2
  },
  {
    id: 'u2',
    email: 'jane.smith@example.com',
    name: 'Jane Smith',
    joinDate: '2024-01-05',
    lastActive: '2024-01-24',
    propertiesViewed: 8,
    bookingsMade: 1
  },
  {
    id: 'u3',
    email: 'robert.wilson@example.com',
    name: 'Robert Wilson',
    joinDate: '2024-01-10',
    lastActive: '2024-01-23',
    propertiesViewed: 22,
    bookingsMade: 3
  }
];

export const mockUserActivities: MockUserActivity[] = [
  {
    id: 'a1',
    userEmail: 'john.doe@example.com',
    propertyTitle: 'Luxury Apartment in Gulshan',
    action: 'visited',
    date: '2024-01-25'
  },
  {
    id: 'a2',
    userEmail: 'jane.smith@example.com',
    propertyTitle: 'Modern Villa in Uttara',
    action: 'unlocked',
    date: '2024-01-24'
  },
  {
    id: 'a3',
    userEmail: 'robert.wilson@example.com',
    propertyTitle: 'Commercial Space in Dhanmondi',
    action: 'booked',
    date: '2024-01-23'
  },
  {
    id: 'a4',
    userEmail: 'john.doe@example.com',
    propertyTitle: 'Family House in Banani',
    action: 'visited',
    date: '2024-01-22'
  }
];

export const mockLawFirms: MockLawFirm[] = [
  {
    id: 'l1',
    name: 'Rahman & Associates',
    contact: '+880-1711-123456',
    email: 'info@rahmanlaw.com',
    status: 'active',
    specialization: 'Property Law'
  },
  {
    id: 'l2',
    name: 'Legal Solutions BD',
    contact: '+880-1712-789012',
    email: 'contact@legalsolutions.com',
    status: 'active',
    specialization: 'Real Estate'
  },
  {
    id: 'l3',
    name: 'Khan Law Firm',
    contact: '+880-1713-345678',
    email: 'office@khanlaw.com',
    status: 'inactive',
    specialization: 'Property Documentation'
  }
];
