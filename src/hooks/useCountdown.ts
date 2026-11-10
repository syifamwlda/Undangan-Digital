import { useState, useEffect } from 'react';

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPassed: boolean;
  totalSeconds: number;
}

export function useCountdown(targetDateIso: string): CountdownTime {
  const calculateTimeLeft = (): CountdownTime => {
    const target = new Date(targetDateIso).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (isNaN(target) || difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isPassed: true,
        totalSeconds: 0,
      };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return {
      days,
      hours,
      minutes,
      seconds,
      isPassed: false,
      totalSeconds: Math.floor(difference / 1000),
    };
  };

  const [timeLeft, setTimeLeft] = useState<CountdownTime>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDateIso]);

  return timeLeft;
}

