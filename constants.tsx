
import { PricingPlan, Step } from './types';

export const PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$0',
    description: 'Perfect for side hustles and small stalls.',
    features: [
      '1 Register',
      'Basic Sales Reports',
      'Inventory Management',
      'Digital Receipts'
    ],
    color: 'bg-slate-100'
  },
  {
    id: 'pro',
    name: 'Business Pro',
    price: '$29',
    description: 'The standard for growing retail shops.',
    features: [
      'Unlimited Registers',
      'Advanced Analytics',
      'Staff Management',
      'Offline Mode',
      'Priority Support'
    ],
    popular: true,
    color: 'bg-indigo-600'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    description: 'Robust solutions for multi-location brands.',
    features: [
      'Custom Integrations',
      'Dedicated Account Manager',
      'Multi-store Sync',
      'White-label Receipts',
      'Custom Training'
    ],
    color: 'bg-slate-900'
  }
];

export const HOW_IT_WORKS: Step[] = [
  {
    id: 1,
    title: 'Download & Pair',
    description: 'Install the SwiftPOS app and pair your card reader via Bluetooth in seconds.',
    icon: '📱'
  },
  {
    id: 2,
    title: 'Catalog Setup',
    description: 'Add products, variants, and taxes. Import CSVs or use the built-in scanner.',
    icon: '📦'
  },
  {
    id: 3,
    title: 'Accept Payments',
    description: 'Swipe, dip, or tap. SwiftPOS handles all major credit cards and digital wallets.',
    icon: '💳'
  },
  {
    id: 4,
    title: 'Insights & Growth',
    description: 'Monitor sales trends, stock levels, and staff performance from anywhere.',
    icon: '📈'
  }
];
