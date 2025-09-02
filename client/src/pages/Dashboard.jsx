import { useSelector } from "react-redux";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import {
  Users,
  GraduationCap,
  BookOpen,
  TrendingUp,
  ClipboardList
} from "lucide-react";

export default function Dashboard() {
  // Removed the TypeScript type annotations for `state`
  const { stats } = useSelector(state => state.dashboard);
  const { user } = useSelector(state => state.auth);

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening at your college today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Students"
          value={stats.totalStudents.toLocaleString()}
          icon={GraduationCap}
          variant="primary"
          trend={{
            value: 8.2,
            label: "vs last month",
            isPositive: true,
          }}
        />
        <StatsCard
          title="Total Teachers"
          value={stats.totalTeachers}
          icon={Users}
          variant="accent"
          trend={{
            value: 2.1,
            label: "vs last month",
            isPositive: true,
          }}
        />
        <StatsCard
          title="Active Classes"
          value={stats.activeClasses}
          icon={BookOpen}
          variant="success"
        />
        <StatsCard
          title="Today's Attendance"
          value={`${stats.todayAttendance}%`}
          icon={TrendingUp}
          variant="warning"
          trend={{
            value: 3.1,
            label: "vs yesterday",
            isPositive: true,
          }}
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <StatsCard
          title="Pending Exam Duties"
          value={stats.pendingExamDuties}
          icon={ClipboardList}
        />
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        <div className="space-y-6">
          {/* Quick Actions could go here */}
        </div>
      </div>
    </div>
  );
}
