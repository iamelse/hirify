"use client";

import React, { useEffect, useState } from "react";
import JobListTable from "@/components/user/jobs/table";

interface Job {
  id: string;
  company: string;
  position: string;
  location?: string;
  status: "APPLIED" | "INTERVIEW" | "REJECTED" | "OFFERED";
  appliedAt: string;
}

export default function UserJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/jobs");
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error("Failed to fetch jobs", err);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="space-y-6">
      <div className="p-5 md:p-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Jobs
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage and track your job applications here.
          </p>
        </div>
      </div>

      <div className="px-5 md:px-6">
        <JobListTable jobs={jobs} />
      </div>
    </div>
  );
}