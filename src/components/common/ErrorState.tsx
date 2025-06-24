
import React from 'react';
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

/**
 * ErrorState - Reusable error state component
 * @param title - Error title
 * @param message - Error message
 * @param actionLabel - Action button label
 * @param onAction - Action button callback
 */
const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Something went wrong",
  message = "Please try again later",
  actionLabel = "Try Again",
  onAction
}) => {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <p className="text-muted-foreground mb-6">{message}</p>
      {onAction && (
        <Button onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
