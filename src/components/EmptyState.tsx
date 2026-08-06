import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionText,
  onAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-xl border border-slate-200 border-dashed my-6">
      <div className="bg-slate-50 p-4 rounded-full text-slate-400 mb-4 shrink-0 flex items-center justify-center">
        {icon || <HelpCircle className="h-10 w-10" />}
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-1 font-heading">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mb-6">{description}</p>
      {actionText && onAction && (
        <Button onClick={onAction} variant="outline" size="sm">
          {actionText}
        </Button>
      )}
    </div>
  );
};
