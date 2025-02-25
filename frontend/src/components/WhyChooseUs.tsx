import React from 'react';
import { Shield, Clock, FileText } from 'lucide-react';

const features = [
  {
    Icon: Shield,
    iconColor: 'text-blue-500',
    title: 'Multiple Carriers',
    description: 'Compare rates from leading insurers'
  },
  {
    Icon: Clock,
    iconColor: 'text-sky-500',
    title: 'Quick Response',
    description: 'Get your quote within 24 hours'
  },
  {
    Icon: FileText,
    iconColor: 'text-pink-500',
    title: 'Expert Guidance',
    description: 'Professional support throughout the process'
  }
] as const;

const Feature = React.memo(({ Icon, iconColor, title, description }: typeof features[number]) => (
  <div className="flex items-start gap-3">
    <div className="flex-shrink-0">
      <Icon className={`w-5 h-5 ${iconColor}`} />
    </div>
    <div>
      <h4 className="font-medium text-gray-900 dark:text-white">{title}</h4>
      <p className="text-sm text-gray-700 dark:text-gray-300">{description}</p>
    </div>
  </div>
));

Feature.displayName = 'Feature';

export const WhyChooseUs = React.memo(() => (
  <div className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
      Why Choose Us?
    </h3>
    <div className="space-y-4">
      {features.map((feature) => (
        <Feature key={feature.title} {...feature} />
      ))}
    </div>
  </div>
));

WhyChooseUs.displayName = 'WhyChooseUs';

export default WhyChooseUs;
