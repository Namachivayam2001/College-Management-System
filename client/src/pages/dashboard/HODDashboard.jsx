import { useSelector } from "react-redux";
import { StatsCard } from "../../components/dashboard/StatsCard";
import { RecentActivity } from "../../components/dashboard/RecentActivity";
import {
  Users,
  GraduationCap,
  BookOpen,
  TrendingUp,
  ClipboardList,
  Calendar,
  FileText
} from "lucide-react";

export default function HodDashboard() {
  const { stats } = useSelector((state) => state.dashboard);
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          HOD Dashboard
        </h1>
        <p className="text-muted-foreground">
          Department overview and management for {user?.department || 'Computer Science'} Department.
        </p>
      </div>

      {/* HOD Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Department Students"
          value="425"
          icon={GraduationCap}
          variant="primary"
          trend={{
            value: 5.2,
            label: "vs last semester",
            isPositive: true,
          }}
        />
        <StatsCard
          title="Department Teachers"
          value="18"
          icon={Users}
          variant="accent"
        />
        <StatsCard
          title="Active Courses"
          value="12"
          icon={BookOpen}
          variant="success"
        />
        <StatsCard
          title="Dept Attendance"
          value="91.3%"
          icon={TrendingUp}
          variant="warning"
          trend={{
            value: 2.8,
            label: "vs last month",
            isPositive: true,
          }}
        />
      </div>

      {/* Department Specific Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <StatsCard
          title="Exam Duties Assigned"
          value="45"
          icon={ClipboardList}
          variant="accent"
        />
        <StatsCard
          title="Pending Approvals"
          value="8"
          icon={FileText}
          variant="warning"
        />
        <StatsCard
          title="Faculty Meetings"
          value="2"
          icon={Calendar}
        />
      </div>

      {/* Department Overview */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        <div className="space-y-6">
          {/* Department Quick Actions */}
          <div className="bg-card rounded-lg border p-6">
            <h3 className="font-semibold mb-4">Department Actions</h3>
            <div className="space-y-3">
              <div className="p-3 bg-secondary/30 rounded-lg">
                <p className="font-medium text-sm">Schedule Faculty Meeting</p>
              </div>
              <div className="p-3 bg-secondary/30 rounded-lg">
                <p className="font-medium text-sm">Review Teacher Performance</p>
              </div>
              <div className="p-3 bg-secondary/30 rounded-lg">
                <p className="font-medium text-sm">Approve Course Changes</p>
              </div>
              <div className="p-3 bg-secondary/30 rounded-lg">
                <p className="font-medium text-sm">Generate Department Report</p>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-card rounded-lg border p-6">
            <h3 className="font-semibold mb-4">Upcoming Events</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Faculty Review Meeting</p>
                  <p className="text-xs text-muted-foreground">March 28, 2024</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Mid-term Evaluations</p>
                  <p className="text-xs text-muted-foreground">April 1-5, 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}