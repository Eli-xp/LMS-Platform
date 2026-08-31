import { ChartAreaInteractive } from "@/components/AdminDashboard_sidebar/chart-area-interactive";
import { DataTable } from "@/components/AdminDashboard_sidebar/data-table";
import { SectionCards } from "@/components/AdminDashboard_sidebar/section-cards";

import data from "./data.json";

export default function AdminPage() {
  return (
    <>
      <SectionCards />
      <ChartAreaInteractive />
      <DataTable data={data} />
    </>
  );
}
