import { useState, useEffect } from "react";

interface TimeBasedRouterProps {
  children: React.ReactNode;
  alternativeContent: React.ReactNode;
  startHour?: number;
  endHour?: number;
}

const TimeBasedRouter = ({ 
  children, 
  alternativeContent,
  startHour = 9,
  endHour = 18
}: TimeBasedRouterProps) => {
  const [showPrimary, setShowPrimary] = useState(true);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const currentHour = now.getHours();
      
      const isPrimaryTime = currentHour >= startHour && currentHour < endHour;
      setShowPrimary(isPrimaryTime);
    };

    checkTime();
    const interval = setInterval(checkTime, 60000);

    return () => clearInterval(interval);
  }, [startHour, endHour]);

  return <>{showPrimary ? children : alternativeContent}</>;
};

export default TimeBasedRouter;
