import { useSelector } from "react-redux";
import { StatsCard } from "../../components/dashboard/StatsCard";
import {
  Calendar,
  BookOpen,
  TrendingUp,
  Clock,
  Award,
  User
} from "lucide-react";

export default function StudentDashboard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Welcome, {user?.name}!
        </h1>
        <p className="text-muted-foreground">
          Track your academic progress and stay updated with your schedule.
        </p>
      </div>

      {/* Student Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Attendance Rate"
          value="87.5%"
          icon={TrendingUp}
          variant="primary"
          trend={{
            value: 2.3,
            label: "vs last month",
            isPositive: true,
          }}
        />
        <StatsCard
          title="Subjects Enrolled"
          value="6"
          icon={BookOpen}
          variant="accent"
        />
        <StatsCard
          title="Classes Today"
          value="4"
          icon={Clock}
          variant="warning"
        />
        <StatsCard
          title="Current CGPA"
          value="8.2"
          icon={Award}
          variant="success"
        />
      </div>

      {/* Today's Schedule */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-card rounded-lg border p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Today's Classes
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
              <div>
                <p className="font-medium">Mathematics</p>
                <p className="text-sm text-muted-foreground">Room 101</p>
              </div>
              <span className="text-sm font-medium">9:00 AM</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
              <div>
                <p className="font-medium">Physics</p>
                <p className="text-sm text-muted-foreground">Lab 203</p>
              </div>
              <span className="text-sm font-medium">11:00 AM</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
              <div>
                <p className="font-medium">Computer Science</p>
                <p className="text-sm text-muted-foreground">Room 305</p>
              </div>
              <span className="text-sm font-medium">2:00 PM</span>
            </div>
          </div>
        </div>

        {/* Recent Grades */}
        <div className="bg-card rounded-lg border p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Award className="w-5 h-5" />
            Recent Grades
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
              <div>
                <p className="font-medium">Mathematics Quiz</p>
                <p className="text-sm text-muted-foreground">March 15, 2024</p>
              </div>
              <span className="text-sm font-medium text-primary">A</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
              <div>
                <p className="font-medium">Physics Lab Report</p>
                <p className="text-sm text-muted-foreground">March 12, 2024</p>
              </div>
              <span className="text-sm font-medium text-primary">A-</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
              <div>
                <p className="font-medium">CS Assignment</p>
                <p className="text-sm text-muted-foreground">March 10, 2024</p>
              </div>
              <span className="text-sm font-medium text-primary">B+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}