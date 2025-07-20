import type { Metadata } from "next";
import JobPage from "@/components/user/jobs/page";

export const metadata: Metadata = {
  title: "Jobs | Hirify",
  description: "Manage and track your job applications in Hirify.",
};

export default function Page() {
  return <JobPage />;
}