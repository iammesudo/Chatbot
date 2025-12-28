
import React from 'react';
import { Step } from '../types';

interface StepItemProps {
  step: Step;
}

const StepItem: React.FC<StepItemProps> = ({ step }) => {
  return (
    <div className="flex gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
      <div className="w-12 h-12 flex-shrink-0 bg-slate-50 rounded-xl flex items-center justify-center text-2xl">
        {step.icon}
      </div>
      <div>
        <h4 className="font-semibold text-slate-900 mb-1">{step.id}. {step.title}</h4>
        <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
      </div>
    </div>
  );
};

export default StepItem;
