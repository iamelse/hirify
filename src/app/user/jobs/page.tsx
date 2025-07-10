import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Jobs | Hirify",
  description: "Manage and track your job applications in Hirify.",
};

export default function UserJobsPage() {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="p-5 md:p-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Jobs
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage and track your job applications here.
          </p>
        </div>

        {/* Optional Right Side Actions */}
        <div>
          {/* You can add a button here */}
          {/* <button className="btn btn-primary">Add New Job</button> */}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-4 md:gap-6 w-full px-5 md:px-6">
        {/* Example component/card goes here */}
        {/* <div className="col-span-12 md:col-span-6 lg:col-span-4">
          <JobCard />
        </div> */}
      </div>
    </div>
  );
}