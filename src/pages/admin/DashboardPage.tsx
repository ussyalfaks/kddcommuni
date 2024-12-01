import React from 'react';
import { useStats } from '../../hooks/useStats';
import { StatsCard } from '../../components/admin/StatsCard';
import { RecentPosts } from '../../components/admin/RecentPosts';
import { ReportedContent } from '../../components/admin/ReportedContent';

export function DashboardPage() {
  const { data: stats, isLoading } = useStats();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="Total Posts"
          value={stats?.totalPosts}
          change={stats?.postsChange}
          trend="up"
        />
        <StatsCard
          title="Active Reports"
          value={stats?.activeReports}
          change={stats?.reportsChange}
          trend="down"
        />
        <StatsCard
          title="User Engagement"
          value={`${stats?.engagement}%`}
          change={stats?.engagementChange}
          trend="up"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentPosts />
        <ReportedContent />
      </div>
    </div>
  );
}