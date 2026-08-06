import React from 'react';

interface BaseInputProps {
  label: string;
  error?: string;
  helperText?: string;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, BaseInputProps {}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `input-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={inputId} className="block text-sm font-semibold text-slate-700 mb-1">
        {label}
      </label>
      <input
        id={inputId}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-hidden focus:ring-2 transition-all duration-150 text-sm bg-white text-slate-800
          ${error 
            ? 'border-red-300 focus:ring-red-200 focus:border-red-500' 
            : 'border-slate-300 focus:ring-primary/20 focus:border-primary'
          }
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-xs text-red-600 font-medium">{error}</p>
      )}
      {!error && helperText && (
        <p className="mt-1 text-xs text-slate-500">{helperText}</p>
      )}
    </div>
  );
};

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, BaseInputProps {}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  className = '',
  id,
  rows = 4,
  ...props
}) => {
  const textareaId = id || `textarea-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={textareaId} className="block text-sm font-semibold text-slate-700 mb-1">
        {label}
      </label>
      <textarea
        id={textareaId}
        rows={rows}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-hidden focus:ring-2 transition-all duration-150 text-sm bg-white text-slate-800
          ${error 
            ? 'border-red-300 focus:ring-red-200 focus:border-red-500' 
            : 'border-slate-300 focus:ring-primary/20 focus:border-primary'
          }
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-xs text-red-600 font-medium">{error}</p>
      )}
      {!error && helperText && (
        <p className="mt-1 text-xs text-slate-500">{helperText}</p>
      )}
    </div>
  );
};

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement>, BaseInputProps {
  options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  helperText,
  options,
  className = '',
  id,
  ...props
}) => {
  const selectId = id || `select-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={selectId} className="block text-sm font-semibold text-slate-700 mb-1">
        {label}
      </label>
      <select
        id={selectId}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-hidden focus:ring-2 transition-all duration-150 text-sm bg-white text-slate-800 cursor-pointer
          ${error 
            ? 'border-red-300 focus:ring-red-200 focus:border-red-500' 
            : 'border-slate-300 focus:ring-primary/20 focus:border-primary'
          }
        `}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-xs text-red-600 font-medium">{error}</p>
      )}
      {!error && helperText && (
        <p className="mt-1 text-xs text-slate-500">{helperText}</p>
      )}
    </div>
  );
};
