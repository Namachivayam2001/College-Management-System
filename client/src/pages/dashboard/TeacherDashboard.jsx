import { useSelector } from "react-redux";
import { StatsCard } from "../../components/dashboard/StatsCard";
import {
  GraduationCap,
  BookOpen,
  Calendar,
  ClipboardList,
  Clock,
  TrendingUp
} from "lucide-react";

export default function TeacherDashboard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Teacher Dashboard
        </h1>
        <p className="text-muted-foreground">
          Manage your classes, track student progress, and handle exam duties.
        </p>
      </div>

      {/* Teacher Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Students"
          value="156"
          icon={GraduationCap}
          variant="primary"
        />
        <StatsCard
          title="Subjects Teaching"
          value="3"
          icon={BookOpen}
          variant="accent"
        />
        <StatsCard
          title="Classes Today"
          value="5"
          icon={Clock}
          variant="warning"
        />
        <StatsCard
          title="Average Attendance"
          value="89.2%"
          icon={TrendingUp}
          variant="success"
          trend={{
            value: 4.1,
            label: "vs last week",
            isPositive: true,
          }}
        />
      </div>

      {/* Teacher Specific Stats */}
      <div className="grid gap-6 md:grid-cols-2">
        <StatsCard
          title="Pending Evaluations"
          value="12"
          icon={ClipboardList}
          variant="warning"
        />
        <StatsCard
          title="Upcoming Exam Duties"
          value="2"
          icon={Calendar}
          variant="accent"
        />
      </div>

      {/* Today's Schedule & Tasks */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-card rounded-lg border p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Today's Classes
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
              <div>
                <p className="font-medium">Mathematics - Class X</p>
                <p className="text-sm text-muted-foreground">Room 101 • 45 students</p>
              </div>
              <span className="text-sm font-medium">9:00 AM</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
              <div>
                <p className="font-medium">Algebra - Class XI</p>
                <p className="text-sm text-muted-foreground">Room 102 • 38 students</p>
              </div>
              <span className="text-sm font-medium">11:00 AM</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
              <div>
                <p className="font-medium">Calculus - Class XII</p>
                <p className="text-sm text-muted-foreground">Room 103 • 42 students</p>
              </div>
              <span className="text-sm font-medium">2:00 PM</span>
            </div>
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="bg-card rounded-lg border p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <ClipboardList className="w-5 h-5" />
            Pending Tasks
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-secondary/30 rounded-lg">
              <p className="font-medium">Grade Assignment Submissions</p>
              <p className="text-sm text-muted-foreground">Class XI - Due tomorrow</p>
            </div>
            <div className="p-3 bg-secondary/30 rounded-lg">
              <p className="font-medium">Prepare Exam Questions</p>
              <p className="text-sm text-muted-foreground">Mid-term Mathematics</p>
            </div>
            <div className="p-3 bg-secondary/30 rounded-lg">
              <p className="font-medium">Submit Attendance Report</p>
              <p className="text-sm text-muted-foreground">Monthly report - March</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}