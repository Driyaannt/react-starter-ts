import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export interface Booking {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  service: string;
  date: Date;
  timeSlot: string;
  status: "pending" | "confirmed" | "cancelled";
  totalAmount: number;
  downPayment: number;
  paymentStatus: "pending" | "partial" | "completed";
  createdAt: Date;
  notes?: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  downPaymentPercentage: number;
}

interface BookingContextType {
  bookings: Booking[];
  services: Service[];
  availableTimeSlots: TimeSlot[];
  selectedDate: Date | null;
  selectedService: Service | null;
  selectedTimeSlot: string | null;

  // Actions
  setSelectedDate: (date: Date | null) => void;
  setSelectedService: (service: Service | null) => void;
  setSelectedTimeSlot: (timeSlot: string | null) => void;
  getAvailableTimeSlots: (date: Date) => TimeSlot[];
  createBooking: (
    bookingData: Omit<Booking, "id" | "createdAt" | "status">
  ) => Promise<string>;
  updateBookingStatus: (bookingId: string, status: Booking["status"]) => void;
  getBookingById: (id: string) => Booking | null;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

// Default services
const defaultServices: Service[] = [
  {
    id: "consultation",
    name: "Konsultasi Umum",
    description: "Pemeriksaan kesehatan umum dan konsultasi dengan dokter",
    duration: 30,
    price: 150000,
    downPaymentPercentage: 30,
  },
  {
    id: "dental",
    name: "Perawatan Gigi",
    description: "Pemeriksaan dan perawatan gigi oleh dokter gigi",
    duration: 60,
    price: 300000,
    downPaymentPercentage: 50,
  },
  {
    id: "specialist",
    name: "Konsultasi Spesialis",
    description: "Konsultasi dengan dokter spesialis",
    duration: 45,
    price: 500000,
    downPaymentPercentage: 40,
  },
  {
    id: "checkup",
    name: "Medical Check-up",
    description: "Pemeriksaan kesehatan menyeluruh",
    duration: 120,
    price: 800000,
    downPaymentPercentage: 25,
  },
];

// Generate time slots (9 AM - 5 PM)
const generateTimeSlots = (): string[] => {
  const slots = [];
  for (let hour = 9; hour < 17; hour++) {
    slots.push(`${hour.toString().padStart(2, "0")}:00`);
    if (hour < 16) {
      // Don't add 17:30
      slots.push(`${hour.toString().padStart(2, "0")}:30`);
    }
  }
  return slots;
};

interface BookingProviderProps {
  children: ReactNode;
}

export const BookingProvider: React.FC<BookingProviderProps> = ({
  children,
}) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [services] = useState<Service[]>(defaultServices);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  // Load bookings from localStorage on mount
  useEffect(() => {
    const savedBookings = localStorage.getItem("clinic-bookings");
    if (savedBookings) {
      try {
        const parsed = JSON.parse(savedBookings);
        // Convert date strings back to Date objects
        const bookingsWithDates = parsed.map((booking: any) => ({
          ...booking,
          date: new Date(booking.date),
          createdAt: new Date(booking.createdAt),
        }));
        setBookings(bookingsWithDates);
      } catch (error) {
        console.error("Error loading bookings:", error);
      }
    }
  }, []);

  // Save bookings to localStorage whenever bookings change
  useEffect(() => {
    if (bookings.length > 0) {
      localStorage.setItem("clinic-bookings", JSON.stringify(bookings));
    }
  }, [bookings]);

  const getAvailableTimeSlots = (date: Date): TimeSlot[] => {
    const allSlots = generateTimeSlots();
    const bookedSlots = bookings
      .filter(
        (booking) =>
          booking.date.toDateString() === date.toDateString() &&
          booking.status !== "cancelled"
      )
      .map((booking) => booking.timeSlot);

    return allSlots.map((time) => ({
      time,
      available: !bookedSlots.includes(time),
    }));
  };

  const createBooking = async (
    bookingData: Omit<Booking, "id" | "createdAt" | "status">
  ): Promise<string> => {
    const newBooking: Booking = {
      ...bookingData,
      id: `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      status: "pending",
      createdAt: new Date(),
    };

    setBookings((prev) => [...prev, newBooking]);

    // Reset selections
    setSelectedDate(null);
    setSelectedService(null);
    setSelectedTimeSlot(null);

    return newBooking.id;
  };

  const updateBookingStatus = (
    bookingId: string,
    status: Booking["status"]
  ) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === bookingId ? { ...booking, status } : booking
      )
    );
  };

  const getBookingById = (id: string): Booking | null => {
    return bookings.find((booking) => booking.id === id) || null;
  };

  const value: BookingContextType = {
    bookings,
    services,
    availableTimeSlots: selectedDate ? getAvailableTimeSlots(selectedDate) : [],
    selectedDate,
    selectedService,
    selectedTimeSlot,
    setSelectedDate,
    setSelectedService,
    setSelectedTimeSlot,
    getAvailableTimeSlots,
    createBooking,
    updateBookingStatus,
    getBookingById,
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
