function fcfs(processes, csDelay) {
  // Deep Copy of processes array cause I was getting a bug
  const processesCopy = processes.map((p) => ({
    ...p,
    remainingTime: p.burstTime, // Reset remaining time
    completionTime: 0.0,
    turnaroundTime: 0.0,
    waitingTime: 0.0,
    isRunning: false,
  }));

  let currentTime = 0.0;
  let totalTAT = 0.0;
  let totalWT = 0.0;
  let prevProcessId = -1;

  // Sort by arrival time
  processesCopy.sort((a, b) => a.arrivalTime - b.arrivalTime);

  // Process each job
  processesCopy.forEach((p) => {
    // Add context switch delay if needed
    if (prevProcessId !== -1) {
      currentTime += csDelay;
    }

    // Wait if process hasn't arrived yet
    if (currentTime < p.arrivalTime) {
      currentTime = p.arrivalTime;
    }

    currentTime += p.burstTime;

    // Calculate times
    p.completionTime = currentTime;
    p.turnaroundTime = p.completionTime - p.arrivalTime;
    p.waitingTime = p.turnaroundTime - p.burstTime;

    // Update totals
    totalTAT += p.turnaroundTime;
    totalWT += p.waitingTime;

    // Save current process ID for next iteration
    prevProcessId = p.id;
  });

  // Return averages
  return {
    processes: processesCopy,
    totalTAT,
    averageWaitingTime: totalWT / processes.length,
  };
}

function sjfPreemptive(processes, csDelay) {
  // Deep Copy of processes array cause i was gettin a bug
  const processesCopy = processes.map((p) => ({
    ...p,
    remainingTime: p.burstTime, // Reset remaining time
    completionTime: 0.0,
    turnaroundTime: 0.0,
    waitingTime: 0.0,
    isRunning: false,
  }));

  let currentTime = 0.0;
  let completed = 0;
  const n = processesCopy.length;
  let totalTAT = 0.0;
  let totalWT = 0.0;
  let prevProcessId = -1;

  // Main scheduling loop
  while (completed < n) {
    let idx = -1;
    let minBurst = Infinity;

    // Find process with shortest remaining time
    for (let i = 0; i < n; i++) {
      if (
        processesCopy[i].arrivalTime <= currentTime &&
        processesCopy[i].remainingTime > 0
      ) {
        if (processesCopy[i].remainingTime < minBurst) {
          minBurst = processesCopy[i].remainingTime;
          idx = i;
        }
      }
    }

    if (idx !== -1) {
      // Add context switch delay if switching between processes
      if (prevProcessId !== -1 && prevProcessId !== processesCopy[idx].id) {
        currentTime += csDelay;
      }

      processesCopy[idx].remainingTime--;
      currentTime += 1.0;
      prevProcessId = processesCopy[idx].id;

      // Check if process completed
      if (processesCopy[idx].remainingTime === 0) {
        completed++;
        processesCopy[idx].completionTime = currentTime;
        processesCopy[idx].turnaroundTime =
          processesCopy[idx].completionTime - processesCopy[idx].arrivalTime;
        processesCopy[idx].waitingTime =
          processesCopy[idx].turnaroundTime - processesCopy[idx].burstTime;
        totalTAT += processesCopy[idx].turnaroundTime;
        totalWT += processesCopy[idx].waitingTime;
      }
    } else {
      currentTime += 1.0;
    }
  }

  // Calculate and return averages
  return {
    processes: processesCopy,
    totalTAT,
    averageWaitingTime: totalWT / n,
  };
}

export { fcfs, sjfPreemptive };
