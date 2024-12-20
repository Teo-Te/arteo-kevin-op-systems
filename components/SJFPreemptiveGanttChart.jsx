"use client";
import { motion } from "framer-motion";

const SJFPreemptiveGanttChart = ({ processes }) => {
  // Create timeline segments showing interruptions
  const createTimelineSegments = () => {
    const segments = [];
    const timeline = [...processes].sort(
      (a, b) => a.arrivalTime - b.arrivalTime
    );
    let currentTime = 0;
    let completed = 0;
    const n = timeline.length;

    // Deep copy processes to track remaining times
    const runningProcesses = timeline.map((p) => ({
      ...p,
      remainingTime: p.burstTime,
    }));

    while (completed < n) {
      // Find next process to run
      let selectedProcess = null;
      let shortestTime = Infinity;

      for (const process of runningProcesses) {
        if (
          process.arrivalTime <= currentTime &&
          process.remainingTime > 0 &&
          process.remainingTime < shortestTime
        ) {
          selectedProcess = process;
          shortestTime = process.remainingTime;
        }
      }

      if (selectedProcess) {
        const startTime = currentTime;
        // Find next interruption point
        const nextArrival = runningProcesses.find(
          (p) =>
            p.arrivalTime > currentTime &&
            p.arrivalTime < currentTime + selectedProcess.remainingTime &&
            p.burstTime < selectedProcess.remainingTime
        );

        const executionTime = nextArrival
          ? nextArrival.arrivalTime - currentTime
          : selectedProcess.remainingTime;

        segments.push({
          id: selectedProcess.id,
          startTime: startTime,
          endTime: startTime + executionTime,
        });

        selectedProcess.remainingTime -= executionTime;
        currentTime += executionTime;

        if (selectedProcess.remainingTime === 0) {
          completed++;
        }
      } else {
        currentTime++;
      }
    }

    return segments;
  };

  const processSegments = createTimelineSegments();
  const totalTime = Math.max(...processes.map((p) => p.completionTime));
  const timeMarkers = processSegments.map((s) => s.endTime);

  return (
    <div className="mt-6 p-4 rounded-xl bg-white/10 backdrop-blur-lg">
      <h3 className="text-lg font-semibold mb-4">SJF Preemptive Timeline</h3>
      <div className="relative w-full overflow-x-auto">
        <div className="min-w-[600px]">
          <div className="relative h-12 bg-gray-800/20 rounded-lg mb-4">
            {processSegments.map((segment, index) => (
              <motion.div
                key={`${segment.id}-${index}`}
                className="absolute h-full flex items-center justify-center text-sm font-medium"
                style={{
                  left: `${(segment.startTime / totalTime) * 100}%`,
                  width: `${
                    ((segment.endTime - segment.startTime) / totalTime) * 100
                  }%`,
                  backgroundColor: `hsla(${segment.id * 50}, 70%, 50%, 0.5)`,
                  borderRight: "1px solid rgba(255,255,255,0.1)",
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: index * 0.2 }}
              >
                P{segment.id}
              </motion.div>
            ))}
          </div>

          <div className="relative h-8 border-t border-gray-700">
            <span
              className="absolute top-2 text-sm text-gray-400 transform -translate-x-1/2"
              style={{ left: "0%" }}
            >
              0
            </span>
            {timeMarkers.map((time, index) => (
              <span
                key={index}
                className="absolute top-2 text-sm text-gray-400 transform -translate-x-1/2"
                style={{ left: `${(time / totalTime) * 100}%` }}
              >
                {Math.round(time)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SJFPreemptiveGanttChart;
