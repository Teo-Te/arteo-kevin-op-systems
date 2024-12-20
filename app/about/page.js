"use client";
import { motion } from "framer-motion";
import { Card, CardBody } from "@nextui-org/react";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-8"
    >
      <motion.h1
        className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Assignment Details
      </motion.h1>
      <Card className="bg-white/10 backdrop-blur-lg mb-8">
        <CardBody>
          <h2 className="text-xl font-semibold mb-4">Authors:</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Kevin Fejzo - Group 1 BSE, Third Year</li>
            <li>Arteo Fejzo - Group 1 BSE, Third Year</li>
          </ul>
        </CardBody>
      </Card>

      <Card className="bg-white/10 backdrop-blur-lg">
        <CardBody className="gap-4">
          <h2 className="text-xl font-semibold mb-4">Task Requirements:</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Process Details:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Number of processes: 5 (P1, P2, P3, P4, P5)</li>
                <li>Arrival times: 0, 2, 4, 5, 7</li>
                <li>Burst times (ms): 3, 4, 2, 12, 8</li>
                <li>
                  Priority values: 4, 3, 1, 5, 2 (lowest value = highest
                  priority)
                </li>
                <li>Context switch: 2ms</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium">Required Calculations:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Average Waiting Time (AWT)</li>
                <li>Total Turnaround Time (TAT)</li>
                <li>Compare final results</li>
                <li>Explain findings</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium">Implementation Requirements:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Print generalities in C++</li>
                <li>
                  Implement one scheduling algorithm in C++ or another language
                </li>
                <li>
                  Optional: Code a simulator for SJF preemptive scheduling
                </li>
              </ul>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card className="bg-white/10 backdrop-blur-lg mt-8">
        <CardBody className="gap-4">
          <h2 className="text-xl font-semibold mb-4">
            Algorithm Explanations:
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium">First Come First Serve (FCFS):</h3>
              <p className="pl-6">
                FCFS is the simplest scheduling algorithm. Processes are
                executed in the order they arrive in the ready queue. It is
                non-preemptive, meaning once a process starts executing, it
                continues until completion. While simple to implement, it can
                lead to longer average waiting times if a long process arrives
                early.
              </p>
            </div>

            <div>
              <h3 className="font-medium">
                Shortest Job First Preemptive (SJF):
              </h3>
              <p className="pl-6">
                SJF Preemptive (also known as Shortest Remaining Time First)
                selects the process with the shortest remaining burst time. It
                is preemptive, meaning a running process can be interrupted if a
                new process arrives with a shorter burst time. This leads to
                minimum average waiting time among all scheduling algorithms but
                requires prediction of burst time and can cause starvation for
                processes with longer burst times.
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default About;
