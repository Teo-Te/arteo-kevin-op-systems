"use client";
import { useState } from "react";
import { fcfs, sjfPreemptive } from "@/lib/schedulingAlgorithms";
import {
  Input,
  Button,
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableColumn,
  TableRow,
} from "@nextui-org/react";
import ResultsTable from "@/components/ResultsTable";
import { motion } from "framer-motion";

const HomePage = () => {
  const [processes, setProcesses] = useState([]);
  const [arrivalTime, setArrivalTime] = useState("");
  const [burstTime, setBurstTime] = useState("");
  const [priority, setPriority] = useState("");
  const [resultsFCFS, setResultsFCFS] = useState(null);
  const [resultsSJF, setResultsSJF] = useState(null);
  const [csDelay, setCsDelay] = useState("");
  const [isDelaySet, setIsDelaySet] = useState(false);

  const addProcess = () => {
    if (arrivalTime === "" || burstTime === "" || priority === "") {
      setArrivalTime(0);
      setBurstTime(0);
      setPriority(0);
    }
    setProcesses([
      ...processes,
      {
        id: processes.length + 1,
        arrivalTime: parseFloat(arrivalTime),
        burstTime: parseFloat(burstTime),
        remainingTime: parseFloat(burstTime),
        completionTime: 0.0,
        turnaroundTime: 0.0,
        waitingTime: 0.0,
        priority: parseInt(priority),
        isRunning: false,
      },
    ]);
    setArrivalTime("");
    setBurstTime("");
    setPriority("");
  };

  const handleFCFS = () => {
    if (csDelay === "") {
      setCsDelay(0);
    }
    const result = fcfs(processes, csDelay);
    setResultsFCFS(result);
  };

  const handleSJFPreemptive = () => {
    if (csDelay === "") {
      setCsDelay(0);
    }
    const result = sjfPreemptive(processes, csDelay);
    setResultsSJF(result);
  };

  const deleteProcess = (processId) => {
    setProcesses(processes.filter((p) => p.id !== processId));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-full mx-auto p-8"
    >
      <motion.h1
        className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Scheduling Algorithms
      </motion.h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          className="grid gap-6 p-6 rounded-xl bg-white/10 backdrop-blur-lg shadow-xl h-fit"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="number"
              value={csDelay}
              onChange={(e) => setCsDelay(e.target.value)}
              label="Context Switch Delay (ms)"
              labelPlacement="outside"
              className="w-full"
              size="lg"
              variant="bordered"
              isDisabled={isDelaySet}
            />
            {!isDelaySet ? (
              <Button
                onPress={() => {
                  setCsDelay(parseFloat(csDelay) / 1000);
                  setIsDelaySet(true);
                }}
                className="bg-gradient-to-r md:mt-7 from-blue-500 to-violet-500 text-white"
                size="lg"
              >
                Set Delay
              </Button>
            ) : (
              <Button
                onPress={() => {
                  setCsDelay("");
                  setIsDelaySet(false);
                }}
                className="bg-gradient-to-r md:mt-7 from-red-500 to-rose-500 text-white"
                size="lg"
              >
                Reset Delay
              </Button>
            )}
          </div>
          {/* Process Input Section */}
          <div className="grid gap-6 p-6 rounded-xl bg-white/10 backdrop-blur-lg shadow-xl mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                type="number"
                placeholder="Arrival Time"
                value={arrivalTime}
                onChange={(e) => setArrivalTime(e.target.value)}
                size="lg"
                variant="bordered"
                startContent={<span className="text-default-400">AT</span>}
              />
              <Input
                type="number"
                placeholder="Burst Time"
                value={burstTime}
                onChange={(e) => setBurstTime(e.target.value)}
                size="lg"
                variant="bordered"
                startContent={<span className="text-default-400">BT</span>}
              />
              <Input
                type="number"
                placeholder="Priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                size="lg"
                variant="bordered"
                startContent={<span className="text-default-400">P</span>}
              />
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
            <Button
              onPress={addProcess}
              className="bg-gradient-to-r from-blue-500 to-violet-500 text-white hover:scale-105"
              size="lg"
              startContent={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width={24}
                  height={24}
                  color={"#ffffff"}
                  fill={"none"}
                >
                  <path
                    d="M12 8V16M16 12L8 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              }
            >
              Add Process
            </Button>

            <Button
              onPress={handleFCFS}
              className="bg-gradient-to-r from-emerald-500 to-teal-700 text-white hover:scale-105"
              size="lg"
            >
              Run FCFS
            </Button>

            <Button
              onPress={handleSJFPreemptive}
              className="bg-gradient-to-r from-emerald-500 to-teal-700 text-white hover:scale-105"
              size="lg"
            >
              Run SJF Preemptive
            </Button>
          </div>
        </motion.div>
        <motion.div
          className="p-6 rounded-xl bg-white/10 backdrop-blur-lg shadow-xl overflow-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Table
            aria-label="Processes table"
            className="mb-6"
            shadow="sm"
            isStriped
            layout="fixed"
          >
            <TableHeader>
              <TableColumn>PID</TableColumn>
              <TableColumn>A.T</TableColumn>
              <TableColumn>B.T</TableColumn>
              <TableColumn>P</TableColumn>
              <TableColumn></TableColumn>
            </TableHeader>
            <TableBody>
              {processes.map((p, index) => (
                <TableRow key={index}>
                  <TableCell>P{p.id}</TableCell>
                  <TableCell>{p.arrivalTime.toFixed(3)}</TableCell>
                  <TableCell>{p.burstTime.toFixed(3)}</TableCell>
                  <TableCell>{p.priority}</TableCell>
                  <TableCell>
                    <Button
                      isIconOnly
                      color="danger"
                      variant="flat"
                      onPress={() => deleteProcess(p.id)}
                      size="sm"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width={20}
                        height={20}
                        fill={"none"}
                      >
                        <path
                          d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {resultsFCFS && (
            <ResultsTable
              title="First Come First Served (FCFS)"
              processes={resultsFCFS.processes}
              avgWT={resultsFCFS.averageWaitingTime.toFixed(3)}
              totalTAT={resultsFCFS.totalTAT.toFixed(3)}
              algorithm="FCFS"
            />
          )}
          {resultsSJF && (
            <ResultsTable
              title="Shortest Job First (SJF) Preemptive"
              processes={resultsSJF.processes}
              avgWT={resultsSJF.averageWaitingTime.toFixed(3)}
              totalTAT={resultsSJF.totalTAT.toFixed(3)}
              algorithm="SJF"
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HomePage;
