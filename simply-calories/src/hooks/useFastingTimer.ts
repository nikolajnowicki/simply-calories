import { useState, useEffect } from "react";

const useFastingTimer = (
  initialEndTime: Date | null,
  totalDuration: number | null
) => {
  const [endTime, setEndTime] = useState<Date | null>(initialEndTime);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (endTime && totalDuration) {
      const startTime = new Date(endTime.getTime() - totalDuration);
      interval = setInterval(() => {
        const now = new Date();
        const elapsed = now.getTime() - startTime.getTime();
        const totalTime = endTime.getTime() - startTime.getTime();
        const remainingTime = totalTime - elapsed;

        if (remainingTime <= 0) {
          clearInterval(interval);
          setProgress(100);
        } else {
          const progressPercent = (elapsed / totalTime) * 100;
          setProgress(progressPercent);
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [endTime, totalDuration]);

  return { progress, setEndTime };
};

export default useFastingTimer;
