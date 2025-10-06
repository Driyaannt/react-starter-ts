import React from "react";
import { useLanguage } from "../../context/LanguageContext";

interface UserLandingPageProps {
  onBookingClick?: () => void;
}

const UserLandingPage: React.FC<UserLandingPageProps> = ({
  onBookingClick,
}) => {
  const { t } = useLanguage();

  const handleAdminAccess = () => {
    window.location.href = "/admin/login";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Admin Access Button */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={handleAdminAccess}
          className="bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors"
        >
          Admin Login
        </button>
      </div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to <span className="text-blue-200">MediCare Clinic</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Your trusted healthcare partner providing comprehensive medical
              services with modern facilities and experienced professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onBookingClick}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg"
              >
                Book Appointment
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Medical Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We provide comprehensive healthcare services with state-of-the-art
              equipment and experienced medical professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "General Consultation",
                description:
                  "Comprehensive health check-ups and consultations with experienced doctors.",
                icon: "🩺",
                price: "From $50",
              },
              {
                title: "Specialist Care",
                description:
                  "Expert care from our team of specialist doctors in various medical fields.",
                icon: "👨‍⚕️",
                price: "From $100",
              },
              {
                title: "Diagnostic Services",
                description:
                  "Advanced diagnostic services including lab tests, X-rays, and ultrasounds.",
                icon: "🔬",
                price: "From $30",
              },
              {
                title: "Emergency Care",
                description:
                  "24/7 emergency medical care for urgent health situations.",
                icon: "🚑",
                price: "From $200",
              },
              {
                title: "Preventive Care",
                description:
                  "Regular health screenings and preventive care programs.",
                icon: "💊",
                price: "From $75",
              },
              {
                title: "Telemedicine",
                description:
                  "Remote consultations and follow-up care through secure video calls.",
                icon: "💻",
                price: "From $40",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {service.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">
                    {service.price}
                  </span>
                  <button
                    onClick={onBookingClick}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                  >
                    Book Now →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                About MediCare Clinic
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                For over 20 years, MediCare Clinic has been serving the
                community with exceptional healthcare services. Our team of
                dedicated medical professionals is committed to providing
                personalized care with the latest medical technology.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    20+
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    Years Experience
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    50+
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    Medical Experts
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    10K+
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    Happy Patients
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    24/7
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    Emergency Care
                  </div>
                </div>
              </div>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Learn More About Us
              </button>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-2xl p-8 text-center">
                <div className="text-6xl mb-4">🏥</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Modern Facilities
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  State-of-the-art medical equipment and comfortable facilities
                  designed for your well-being and recovery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Visit Our Clinic
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              We're here to help you with your healthcare needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📍</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Address
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                123 Healthcare Street
                <br />
                Medical District, MD 12345
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📞</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Phone
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Emergency: (555) 911-HELP
                <br />
                Appointments: (555) 123-CARE
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🕒</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Hours
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Mon-Fri: 8:00 AM - 8:00 PM
                <br />
                Weekend: 9:00 AM - 5:00 PM
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Schedule Your Appointment?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Book your appointment online and get the healthcare you deserve. Our
            booking system is secure, fast, and available 24/7.
          </p>
          <button
            onClick={onBookingClick}
            className="bg-white text-blue-600 px-10 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg"
          >
            Book Appointment Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default UserLandingPage;
