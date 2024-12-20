"use client";
import { motion } from "framer-motion";

const FCFSGanttChart = ({ processes }) => {
  // Calculate sequential process positions
  const processPositions = processes.reduce((acc, curr) => {
    const prevProcess = acc[acc.length - 1];
    const startTime = prevProcess ? prevProcess.endTime : 0;

    return [
      ...acc,
      {
        id: curr.id,
        startTime: startTime,
        endTime: startTime + curr.burstTime,
      },
    ];
  }, []);

  const totalTime = processPositions[processPositions.length - 1]?.endTime || 0;
  const timeMarkers = processPositions.map((p) => p.endTime);

  return (
    <div className="mt-6 p-4 rounded-xl bg-white/10 backdrop-blur-lg">
      <h3 className="text-lg font-semibold mb-4">FCFS Timeline</h3>
      <div className="relative w-full overflow-x-auto">
        <div className="min-w-[600px]">
          <div className="relative h-12 bg-gray-800/20 rounded-lg mb-4">
            {processPositions.map((process, index) => (
              <motion.div
                key={`${process.id}-${index}`}
                className="absolute h-full flex items-center justify-center text-sm font-medium"
                style={{
                  left: `${(process.startTime / totalTime) * 100}%`,
                  width: `${
                    ((process.endTime - process.startTime) / totalTime) * 100
                  }%`,
                  backgroundColor: `hsla(${index * 50}, 70%, 50%, 0.5)`,
                  borderRight: "1px solid rgba(255,255,255,0.1)",
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: index * 0.2 }}
              >
                P{process.id}
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

export default FCFSGanttChart;
