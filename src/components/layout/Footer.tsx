import React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: t.footer.dashboard, href: "#dashboard" },
      { label: t.footer.users, href: "#users" },
      { label: t.footer.products, href: "#products" },
      { label: t.footer.orders, href: "#orders" },
    ],
    support: [
      { label: t.footer.helpCenter, href: "#help" },
      { label: t.footer.contactUs, href: "#contact" },
      { label: t.footer.privacyPolicy, href: "#privacy" },
      { label: t.footer.termsOfService, href: "#terms" },
    ],
    company: [
      { label: t.footer.aboutUs, href: "#about" },
      { label: t.footer.blog, href: "#blog" },
      { label: t.footer.careers, href: "#careers" },
      { label: t.footer.press, href: "#press" },
    ],
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              MyApp
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Your reliable application solution for managing users, products,
              and analytics with modern design and powerful features.
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
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
              {t.footer.product}
            </h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
              {t.footer.support}
            </h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
              {t.footer.company}
            </h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
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
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} MyApp. {t.footer.allRightsReserved}
          </p>
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            <span>{t.footer.madeWith}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
