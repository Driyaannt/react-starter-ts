import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  ArrowLeft,
  Calendar as CalendarIcon,
  Clock,
  User,
  CreditCard,
  CheckCircle,
  AlertCircle,
  Phone,
  MapPin,
} from "lucide-react";
import { format, addDays, isBefore, isSameDay } from "date-fns";

interface BookingFormData {
  selectedDate: Date | undefined;
  selectedTime: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  service: string;
  notes: string;
}

interface BookingPageProps {
  onBack?: () => void;
}

const BookingPage: React.FC<BookingPageProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);
  const [bookingFormData, setBookingFormData] = useState<BookingFormData>({
    selectedDate: undefined,
    selectedTime: "",
    patientName: "",
    patientPhone: "",
    patientEmail: "",
    service: "",
    notes: "",
  });

  const services = [
    {
      id: "general",
      name: "General Consultation",
      price: 50,
      duration: "30 min",
    },
    {
      id: "specialist",
      name: "Specialist Care",
      price: 100,
      duration: "45 min",
    },
    {
      id: "diagnostic",
      name: "Diagnostic Services",
      price: 75,
      duration: "60 min",
    },
    {
      id: "preventive",
      name: "Preventive Care",
      price: 60,
      duration: "30 min",
    },
    { id: "telemedicine", name: "Telemedicine", price: 40, duration: "20 min" },
  ];

  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
  ];

  const selectedService = services.find(
    (s) => s.id === bookingFormData.service
  );
  const depositAmount = selectedService ? selectedService.price * 0.3 : 0; // 30% deposit

  const handleDateSelect = (date: Date | undefined) => {
    setBookingFormData((prev) => ({ ...prev, selectedDate: date }));
  };

  const handleTimeSelect = (time: string) => {
    setBookingFormData((prev) => ({ ...prev, selectedTime: time }));
  };

  const handleInputChange = (field: keyof BookingFormData, value: string) => {
    setBookingFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePayDeposit = () => {
    setShowPaymentDialog(false);
    setShowBookingSuccess(true);
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return (
          bookingFormData.selectedDate &&
          bookingFormData.selectedTime &&
          bookingFormData.service
        );
      case 2:
        return (
          bookingFormData.patientName &&
          bookingFormData.patientPhone &&
          bookingFormData.patientEmail
        );
      case 3:
        return true;
      default:
        return false;
    }
  };

  const disabledDays = (date: Date) => {
    return isBefore(date, new Date()) || isSameDay(date, new Date());
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="ghost"
                onClick={() => (onBack ? onBack() : window.history.back())}
                className="mr-4 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Book Appointment
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Schedule your medical consultation
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step === currentStep
                      ? "bg-blue-600 text-white"
                      : step < currentStep
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {step < currentStep ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    step
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Select Date & Time */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-2" />
                    Select Date & Time
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Service Selection */}
                  <div>
                    <Label className="text-base font-medium mb-3 block">
                      Select Service
                    </Label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {services.map((service) => (
                        <div
                          key={service.id}
                          onClick={() =>
                            handleInputChange("service", service.id)
                          }
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            bookingFormData.service === service.id
                              ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                              : "border-gray-200 dark:border-gray-700 hover:border-blue-300"
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {service.name}
                            </h3>
                            <Badge variant="secondary">
                              {service.duration}
                            </Badge>
                          </div>
                          <p className="text-blue-600 dark:text-blue-400 font-semibold">
                            ${service.price}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Date Selection */}
                  <div>
                    <Label className="text-base font-medium mb-3 block">
                      Select Date
                    </Label>
                    <div className="flex justify-center">
                      <Calendar
                        mode="single"
                        selected={bookingFormData.selectedDate}
                        onSelect={handleDateSelect}
                        disabled={disabledDays}
                        className="rounded-lg border border-gray-200 dark:border-gray-700"
                        fromDate={addDays(new Date(), 1)}
                      />
                    </div>
                  </div>

                  {/* Time Selection */}
                  {bookingFormData.selectedDate && (
                    <div>
                      <Label className="text-base font-medium mb-3 block">
                        Select Time
                      </Label>
                      <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                        {timeSlots.map((time) => (
                          <Button
                            key={time}
                            variant={
                              bookingFormData.selectedTime === time
                                ? "default"
                                : "outline"
                            }
                            onClick={() => handleTimeSelect(time)}
                            className="h-12"
                          >
                            <Clock className="h-4 w-4 mr-2" />
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Step 2: Patient Information */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Patient Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="patientName">Full Name *</Label>
                      <Input
                        id="patientName"
                        value={bookingFormData.patientName}
                        onChange={(e) =>
                          handleInputChange("patientName", e.target.value)
                        }
                        placeholder="Enter full name"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="patientPhone">Phone Number *</Label>
                      <Input
                        id="patientPhone"
                        value={bookingFormData.patientPhone}
                        onChange={(e) =>
                          handleInputChange("patientPhone", e.target.value)
                        }
                        placeholder="Enter phone number"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="patientEmail">Email Address *</Label>
                    <Input
                      id="patientEmail"
                      type="email"
                      value={bookingFormData.patientEmail}
                      onChange={(e) =>
                        handleInputChange("patientEmail", e.target.value)
                      }
                      placeholder="Enter email address"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <textarea
                      id="notes"
                      value={bookingFormData.notes}
                      onChange={(e) =>
                        handleInputChange("notes", e.target.value)
                      }
                      placeholder="Any special requirements or symptoms to mention..."
                      className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white resize-none"
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Payment & Confirmation */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Payment & Confirmation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-3" />
                      <div>
                        <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">
                          Deposit Required
                        </h3>
                        <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                          A deposit of ${depositAmount.toFixed(2)} (30% of
                          service fee) is required to confirm your booking. The
                          remaining amount will be paid during your visit.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Payment Methods
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg cursor-not-allowed opacity-50">
                        <div className="flex items-center mb-2">
                          <CreditCard className="h-5 w-5 mr-2" />
                          <span className="font-medium">Credit/Debit Card</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Currently disabled - Coming Soon
                        </p>
                      </div>
                      <div className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg cursor-not-allowed opacity-50">
                        <div className="flex items-center mb-2">
                          <Phone className="h-5 w-5 mr-2" />
                          <span className="font-medium">Mobile Payment</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Currently disabled - Coming Soon
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                      Booking Summary
                    </h3>
                    <div className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                      <div className="flex justify-between">
                        <span>Service:</span>
                        <span>{selectedService?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Date:</span>
                        <span>
                          {bookingFormData.selectedDate
                            ? format(bookingFormData.selectedDate, "PPP")
                            : "Not selected"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Time:</span>
                        <span>{bookingFormData.selectedTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Patient:</span>
                        <span>{bookingFormData.patientName}</span>
                      </div>
                      <hr className="border-blue-200 dark:border-blue-700" />
                      <div className="flex justify-between font-semibold">
                        <span>Deposit Amount:</span>
                        <span>${depositAmount.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={handlePrevStep}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              {currentStep < 3 ? (
                <Button
                  onClick={handleNextStep}
                  disabled={!isStepValid(currentStep)}
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={() => setShowPaymentDialog(true)}
                  disabled={!isStepValid(currentStep)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Confirm & Pay Deposit
                </Button>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Clinic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Address
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      123 Healthcare Street
                      <br />
                      Medical District, MD 12345
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Phone
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      (555) 123-CARE
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Hours
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Mon-Fri: 8:00 AM - 8:00 PM
                      <br />
                      Weekend: 9:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Payment Dialog */}
      <AlertDialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Payment</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to pay a deposit of ${depositAmount.toFixed(2)} for
              your appointment booking. Please note that payment processing is
              currently disabled for demo purposes.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handlePayDeposit}>
              Process Payment (Demo)
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Booking Success Dialog */}
      <AlertDialog
        open={showBookingSuccess}
        onOpenChange={setShowBookingSuccess}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center text-green-600">
              <CheckCircle className="h-6 w-6 mr-2" />
              Booking Confirmed!
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>Your appointment has been successfully booked.</p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mt-4">
                <h4 className="font-semibold mb-2">Booking Details:</h4>
                <p>
                  <strong>Service:</strong> {selectedService?.name}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {bookingFormData.selectedDate
                    ? format(bookingFormData.selectedDate, "PPP")
                    : "Not selected"}
                </p>
                <p>
                  <strong>Time:</strong> {bookingFormData.selectedTime}
                </p>
                <p>
                  <strong>Patient:</strong> {bookingFormData.patientName}
                </p>
                <p>
                  <strong>Booking ID:</strong> MC-
                  {Date.now().toString().slice(-6)}
                </p>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                A confirmation email has been sent to{" "}
                {bookingFormData.patientEmail}
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                setShowBookingSuccess(false);
                if (onBack) {
                  onBack();
                } else {
                  window.history.back();
                }
              }}
            >
              Back to Home
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BookingPage;
