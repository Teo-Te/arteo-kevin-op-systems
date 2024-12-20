"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import FCFSGanttChart from "./FCFSGanttChart";
import SJFPreemptiveGanttChart from "./SJFPreemptiveGanttChart";

const ResultsTable = ({ title, processes, avgWT, totalTAT, algorithm }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="p-6 rounded-xl bg-white/10 backdrop-blur-lg shadow-xl mb-6"
    >
      <motion.h2
        variants={item}
        className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent mb-6"
      >
        {title}
      </motion.h2>

      <Table
        aria-label="Process results table"
        className="mb-6"
        shadow="sm"
        isStriped
        layout="fixed"
      >
        <TableHeader>
          <TableColumn>PID</TableColumn>
          <TableColumn>T.A.T</TableColumn>
          <TableColumn>W.T</TableColumn>
        </TableHeader>
        <TableBody>
          {processes.map((p, index) => (
            <TableRow key={index}>
              <TableCell>P{p.id}</TableCell>
              <TableCell>{p.turnaroundTime.toFixed(3)}</TableCell>
              <TableCell>{p.waitingTime.toFixed(3)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {algorithm === "FCFS" ? (
        <FCFSGanttChart processes={processes} />
      ) : (
        <SJFPreemptiveGanttChart processes={processes} />
      )}

      <motion.div
        variants={item}
        className="flex gap-6 justify-end mt-6 text-sm"
      >
        <div className="p-4 rounded-lg bg-blue-500/10">
          <p className="font-medium">Average Waiting Time</p>
          <p className="text-2xl font-bold">{avgWT}</p>
        </div>
        <div className="p-4 rounded-lg bg-violet-500/10">
          <p className="font-medium">Total Turnaround Time</p>
          <p className="text-2xl font-bold">{totalTAT}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResultsTable;
