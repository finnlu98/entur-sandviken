import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './loading-button.css';
import { useLoading } from '../../hooks/use-loading';

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loadingKey?: string;
  isLoading?: boolean;
  loadingText?: string;
  children: ReactNode;
}

const LoadingButton = ({
  loadingKey,
  isLoading: externalLoading,
  loadingText,
  children,
  disabled,
  className = '',
  ...props
}: LoadingButtonProps) => {
  const { isLoading: checkLoading } = useLoading();

  const isCurrentlyLoading = externalLoading ?? (loadingKey ? checkLoading(loadingKey) : false);

  return (
    <button
      {...props}
      disabled={disabled || isCurrentlyLoading}
      className={`loading-button ${isCurrentlyLoading ? 'loading' : ''} ${className}`}
    >
      {isCurrentlyLoading ? (
        <>
          <span className="loading-button-spinner"></span>
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default LoadingButton;
