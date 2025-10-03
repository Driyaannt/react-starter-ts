import React from "react";
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: "Dashboard", href: "#dashboard" },
      { label: "Users", href: "#users" },
      { label: "Products", href: "#products" },
      { label: "Orders", href: "#orders" },
    ],
    support: [
      { label: "Help Center", href: "#help" },
      { label: "Contact Us", href: "#contact" },
      { label: "Privacy Policy", href: "#privacy" },
      { label: "Terms of Service", href: "#terms" },
    ],
    company: [
      { label: "About Us", href: "#about" },
      { label: "Blog", href: "#blog" },
      { label: "Careers", href: "#careers" },
      { label: "Press", href: "#press" },
    ],
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">MyApp</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Your reliable application solution for managing users, products, and analytics with modern design and powerful features.
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                <span className="text-sm">📘</span>
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                <span className="text-sm">🐦</span>
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                <span className="text-sm">💼</span>
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                <span className="text-sm">🐙</span>
              </Button>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Support
            </h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-sm text-gray-600">
            © {currentYear} MyApp. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>Made with ❤️ using React & shadcn/ui</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;