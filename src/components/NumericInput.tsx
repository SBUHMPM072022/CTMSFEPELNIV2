import React, { useState, useEffect } from 'react';

interface NumericInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string | number;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function NumericInput({ value, onChange, onBlur, onFocus, name, ...props }: NumericInputProps) {
  const [displayValue, setDisplayValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const formatNumber = (val: string | number | undefined | null) => {
    if (val === null || val === undefined || val === '') return '';
    const strVal = val.toString();
    const parts = strVal.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.length > 1 ? parts.join('.') : parts[0];
  };

  useEffect(() => {
    if (!isFocused) {
      setDisplayValue(formatNumber(value));
    }
  }, [value, isFocused]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value.replace(/,/g, '');
    
    // Only allow digits, minus sign, and dot
    rawValue = rawValue.replace(/[^0-9.-]/g, '');

    // Prevent multiple dots
    const dotParts = rawValue.split('.');
    if (dotParts.length > 2) {
      rawValue = dotParts[0] + '.' + dotParts.slice(1).join('');
    }

    // Prevent multiple minuses, ensure it's only at the start
    const isNegative = rawValue.startsWith('-');
    rawValue = rawValue.replace(/-/g, '');
    if (isNegative) {
      rawValue = '-' + rawValue;
    }

    setDisplayValue(e.target.value);

    if (onChange) {
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          name: name || "",
          value: rawValue
        }
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    setDisplayValue(value !== undefined && value !== null ? value.toString() : "");
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setDisplayValue(formatNumber(value));
    if (onBlur) onBlur(e);
  };

  return (
    <input
      name={name}
      value={displayValue}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...props}
    />
  );
}
