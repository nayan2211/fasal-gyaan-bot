import { Sprout, Phone, Mail, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-earth-brown text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sprout className="h-8 w-8 text-earth-gold" />
              <span className="text-2xl font-bold">CropAI</span>
            </div>
            <p className="text-white/80">
              Empowering farmers with AI-driven insights for sustainable and profitable agriculture.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-earth-gold">Quick Links</h4>
            <ul className="space-y-2 text-white/80">
              <li><a href="#" className="hover:text-earth-gold transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-earth-gold transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-earth-gold transition-colors">Crop Recommendations</a></li>
              <li><a href="#" className="hover:text-earth-gold transition-colors">About Us</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-earth-gold">Services</h4>
            <ul className="space-y-2 text-white/80">
              <li><a href="#" className="hover:text-earth-gold transition-colors">Soil Analysis</a></li>
              <li><a href="#" className="hover:text-earth-gold transition-colors">Weather Intelligence</a></li>
              <li><a href="#" className="hover:text-earth-gold transition-colors">Market Insights</a></li>
              <li><a href="#" className="hover:text-earth-gold transition-colors">Yield Forecasting</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-earth-gold">Contact Us</h4>
            <div className="space-y-3 text-white/80">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+91 1800-XXX-XXXX</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>support@cropai.gov.in</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Ranchi, Jharkhand</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
          <p>© 2024 CropAI - Government of Jharkhand. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Powered by Department of Higher and Technical Education, Jharkhand
          </p>
        </div>
      </div>
    </footer>
  );
};