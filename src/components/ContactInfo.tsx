import React from 'react';
import { Phone } from 'lucide-react';

export const ContactInfo = React.memo(() => (
  <div className="backdrop-blur-xl bg-gradient-to-br from-blue-500 to-sky-500 rounded-2xl shadow-lg p-6 text-white">
    <div className="flex items-center gap-3 mb-4">
      <Phone className="w-5 h-5" />
      <h3 className="text-xl font-semibold">Need Help?</h3>
    </div>
    <p className="text-white/90 mb-4">
      Our insurance experts are here to guide you through the quote process.
    </p>
    <div className="space-y-2">
      <p className="text-lg font-medium">(800) XXX-XXXX</p>
      <p className="text-sm text-white/80">Mon-Fri 8:00 AM - 6:00 PM PT</p>
    </div>
  </div>
));

ContactInfo.displayName = 'ContactInfo';

export default ContactInfo;
