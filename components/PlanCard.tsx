
import React from 'react';
import { PricingPlan } from '../types';

interface PlanCardProps {
  plan: PricingPlan;
  isSelected?: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, isSelected }) => {
  const isDark = plan.name !== 'Starter';
  
  return (
    <div className={`relative p-6 rounded-3xl transition-all duration-300 border ${
      isSelected ? 'ring-2 ring-indigo-500 ring-offset-2' : 'border-slate-200'
    } ${isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'} shadow-sm`}>
      {plan.popular && (
        <span className="absolute -top-3 left-6 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Best Value
        </span>
      )}
      
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          {plan.description}
        </p>
      </div>

      <div className="mb-6">
        <span className="text-3xl font-bold">{plan.price}</span>
        {plan.price !== 'Custom' && <span className="text-sm opacity-60"> / month</span>}
      </div>

      <ul className="space-y-3 mb-8">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-sm">
            <svg className={`w-5 h-5 flex-shrink-0 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>{feature}</span>
          </li>
        ))}
      </ul>

      <button className={`w-full py-3 rounded-xl font-semibold transition-colors ${
        plan.name === 'Business Pro' 
          ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
          : isDark ? 'bg-white text-slate-900 hover:bg-slate-100' : 'bg-slate-900 text-white hover:bg-slate-800'
      }`}>
        Choose {plan.name}
      </button>
    </div>
  );
};

export default PlanCard;
