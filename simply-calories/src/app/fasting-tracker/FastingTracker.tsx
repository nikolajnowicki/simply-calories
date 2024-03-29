import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import useFastingTimer from "../../hooks/useFastingTimer";
import { BiStopwatch } from "react-icons/bi";
import { GoGoal } from "react-icons/go";
import { useSession } from "next-auth/react";
import { saveFastingData } from "../../app/actions/users/saveFastingData";

type FastingTrackerProps = {};

export const FastingTrackerCalc: React.FC<FastingTrackerProps> = () => {
  const { register, handleSubmit, reset, watch } = useForm<{
    customHour: number;
    customMinute: number;
  }>();
  const predefinedPeriods = [16, 18, 20, 24, 36];
  const [selectedPeriod, setSelectedPeriod] = useState<number | null>(null);
  const [fastingEndTime, setFastingEndTime] = useState<Date | null>(null);
  const [fasting, setFasting] = useState(false);
  const [totalDuration, setTotalDuration] = useState<number | null>(null);
  const [fastingStartTime, setFastingStartTime] = useState<Date | null>(null);
  const [fastCompleted, setFastCompleted] = useState<boolean>(false);
  const [elapsedFastingTime, setElapsedFastingTime] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const { data: session } = useSession();

  const { setEndTime } = useFastingTimer(fastingEndTime, totalDuration);

  const storeFastingStateInLocalStorage = useCallback(() => {
    const fastingState = {
      fasting,
      fastingStartTime: fastingStartTime?.getTime(),
      fastingEndTime: fastingEndTime?.getTime(),
      totalDuration,
    };
    localStorage.setItem("fastingState", JSON.stringify(fastingState));
  }, [fasting, fastingStartTime, fastingEndTime, totalDuration]);

  const loadFastingStateFromLocalStorage = () => {
    const fastingState = localStorage.getItem("fastingState");
    if (fastingState) {
      const parsedState = JSON.parse(fastingState);
      const {
        fasting: savedFasting,
        fastingStartTime: savedFastingStartTime,
        fastingEndTime: savedFastingEndTime,
        totalDuration: savedTotalDuration,
      } = parsedState;

      if (savedFasting) {
        const currentTime = new Date().getTime();
        const elapsedDuration = currentTime - savedFastingStartTime;
        const remainingDuration = savedTotalDuration - elapsedDuration;
        const newFastingEndTime = new Date(currentTime + remainingDuration);

        setFasting(savedFasting);
        setFastingStartTime(new Date(savedFastingStartTime));
        setFastingEndTime(newFastingEndTime);
        setTotalDuration(savedTotalDuration);

        const progressPercent = (elapsedDuration / savedTotalDuration) * 100;
        setProgress(progressPercent);
      }
    }
  };

  useEffect(() => {
    loadFastingStateFromLocalStorage();
  }, []);

  useEffect(() => {
    if (fasting) {
      storeFastingStateInLocalStorage();
    }
  }, [
    fasting,
    fastingStartTime,
    fastingEndTime,
    totalDuration,
    storeFastingStateInLocalStorage,
  ]);

  const endFast = useCallback(
    async (automaticallyEnded: boolean = false) => {
      if (fasting) {
        const now = new Date();
        let elapsedTime =
          now.getTime() - (fastingStartTime?.getTime() ?? now.getTime());
        elapsedTime = Math.max(elapsedTime, 0);

        const elapsedHours = Math.floor(elapsedTime / (1000 * 60 * 60));
        elapsedTime -= elapsedHours * (1000 * 60 * 60);
        const elapsedMinutes = Math.floor(elapsedTime / (1000 * 60));

        const fastingDuration = `${elapsedHours
          .toString()
          .padStart(2, "0")}:${elapsedMinutes.toString().padStart(2, "0")}`;
        setElapsedFastingTime(fastingDuration);
        setFastCompleted(true);
        setFasting(false);
        setEndTime(null);
        setTotalDuration(null);
        setFastingStartTime(null);

        localStorage.removeItem("fastingState");

        if (session?.user?.email) {
          try {
            await saveFastingData({
              email: session.user.email,
              fastingDuration,
            });
          } catch (error) {
            console.error("Failed to save fasting data", error);
          }
        }
      }
    },
    [fasting, fastingStartTime, setEndTime, session?.user?.email]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      if (fastingEndTime && now >= fastingEndTime && fasting) {
        endFast(true);
      } else if (fastingStartTime && fastingEndTime && fasting) {
        const currentTime = now.getTime();
        const elapsedDuration = currentTime - fastingStartTime.getTime();
        const remainingDuration = fastingEndTime.getTime() - currentTime;

        if (remainingDuration >= 0) {
          const progressPercent =
            (elapsedDuration / (totalDuration || 1)) * 100;
          setProgress(progressPercent);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [fastingEndTime, fastingStartTime, totalDuration, fasting, endFast]);

  const startFast = ({
    customHour,
    customMinute,
  }: {
    customHour: number;
    customMinute: number;
  }) => {
    if (!fasting) {
      const hourValue = selectedPeriod !== null ? selectedPeriod : +customHour;
      const minuteValue = +customMinute || 0;

      if (hourValue >= 0 && minuteValue >= 0) {
        const startTime = new Date();
        const endTime = new Date(
          startTime.getTime() + hourValue * 3600000 + minuteValue * 60000
        );

        setFastingStartTime(startTime);
        setFastingEndTime(endTime);
        setTotalDuration(hourValue * 3600000 + minuteValue * 60000);
        setFasting(true);
        setEndTime(endTime);
        reset();

        setFastCompleted(false);
        setElapsedFastingTime("");
      }
    }
  };

  const handleCustomPeriodFocus = () => {
    setSelectedPeriod(null);
  };

  function calculateRemainingTime(): string {
    if (!fastingEndTime || !totalDuration) return "00:00:00";
    const now = new Date();
    let remainingTime = fastingEndTime.getTime() - now.getTime();
    if (remainingTime <= 0) return "00:00:00";

    const hours = Math.floor(remainingTime / (1000 * 60 * 60));
    remainingTime -= hours * (1000 * 60 * 60);
    const minutes = Math.floor(remainingTime / (1000 * 60));
    remainingTime -= minutes * (1000 * 60);
    const seconds = Math.floor(remainingTime / 1000);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  watch((value, { name }) => {
    if (name === "customHour" || name === "customMinute") {
      handleCustomPeriodFocus();
    }
  });

  return (
    <div className="pt-2 md:pt-4">
      <div className="flex flex-col items-center justify-center">
        {!fasting && (
          <div className="mb-4 flex flex-col items-center justify-center">
            <p className="font-bold pt-10">How long are you fasting?</p>
            <div className="flex py-8 text-LightTextCol dark:text-DarkTextCol">
              {predefinedPeriods.map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`m-1 p-2 border-2 ${
                    selectedPeriod === period
                      ? "border-blue-500"
                      : "border-gray-300 dark:border-DarkTextCol/30 "
                  } rounded`}
                >
                  {period}h
                </button>
              ))}
            </div>
            <div className="flex flex-col items-center">
              <form
                onSubmit={handleSubmit(startFast)}
                className="flex flex-col items-center space-y-4"
              >
                <p className="font-bold">Enter custom time</p>
                <div className="flex justify-center items-center space-x-2 pb-2">
                  <input
                    type="number"
                    {...register("customHour", { min: 0 })}
                    className="m-1 p-2 border border-gray-300 dark:border-DarkUiCol rounded w-1/4 md:w-1/6"
                    placeholder="Hours"
                    onFocus={handleCustomPeriodFocus}
                  />
                  <input
                    type="number"
                    {...register("customMinute", { min: 0, max: 59 })}
                    className="m-1 p-2 border border-gray-300 dark:border-DarkUiCol rounded w-1/4 md:w-1/6"
                    placeholder="Minutes"
                    onFocus={handleCustomPeriodFocus}
                  />
                </div>
                <button
                  type="submit"
                  className="m-1 p-2  bg-blue-500 text-white rounded w-32 h-12 md:w-auto"
                >
                  Start Fast
                </button>
              </form>
            </div>
          </div>
        )}

        {fasting && (
          <div className="mb-4">
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-row justify-center items-center pt-8 pb-4">
                <div className="flex flex-wrap items-center pl-1">
                  <div className="text-3xl pr-1 ">
                    <BiStopwatch />
                  </div>

                  <p className="font-bold pl-1">
                    Fast started at:{" "}
                    {fastingStartTime
                      ? fastingStartTime.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <div className="pr-2">
              <div className="flex flex-wrap justify-center items-center pt-8 pb-12">
                <div className="text-2xl pr-3">
                  <GoGoal />
                </div>
                <p className="font-bold ">
                  Fast will end:{" "}
                  {fastingEndTime
                    ? fastingEndTime.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })
                    : "N/A"}
                </p>
              </div>
            </div>

            <div className="pb-8">
              <div className="font-bold flex justify-center">
                Remaining Time: {calculateRemainingTime()}
              </div>
              <div className="w-full mt-4 bg-gray-300 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => endFast(false)}
                className="m-1 p-2 bg-red-500 text-white rounded"
              >
                End Fast
              </button>
            </div>
          </div>
        )}

        {fastCompleted && (
          <div className="flex flex-col justify-center items-center pt-8 b-4">
            <p className="font-bold pb-2">Fast is complete!</p>
            <div className="flex flex-wrap">
              <p>You fasted for:</p>
              <p className="font-semibold pl-2">{elapsedFastingTime}</p>
            </div>
          </div>
        )}

        {!fastCompleted && !fasting && elapsedFastingTime && (
          <div className="flex flex-col justify-center items-center pt-8 b-4">
            <p className="font-bold pb-2">Fast ended early.</p>
            <div className="flex flex-wrap">
              <p>You fasted for:</p>
              <p className="font-semibold pl-2">{elapsedFastingTime}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FastingTrackerCalc;
