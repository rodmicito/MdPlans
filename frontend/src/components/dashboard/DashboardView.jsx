import React from 'react';
import DashboardLayout from './DashboardLayout';
import KPIGrid from './KPIGrid';
import AnalyticsRow from './AnalyticsRow';
import MiniTimeline from './MiniTimeline';

export default function DashboardView() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 w-full h-full">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col gap-6 min-w-0 pb-6">
          <KPIGrid />
          <AnalyticsRow />
          <MiniTimeline />
        </div>
      </div>
    </DashboardLayout>
  );
}
