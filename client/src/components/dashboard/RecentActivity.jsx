import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";
import { Clock, UserCheck, Calendar, ClipboardList, Users } from "lucide-react";

const activityIcons = {
  attendance: UserCheck,
  timetable: Calendar,
  exam: ClipboardList,
  user: Users,
};

const activityColors = {
  attendance: 'bg-success/10 text-success border-success/20',
  timetable: 'bg-primary/10 text-primary border-primary/20',
  exam: 'bg-warning/10 text-warning border-warning/20',
  user: 'bg-accent/10 text-accent border-accent/20',
};

export function RecentActivity() {
  const { recentActivities } = useSelector((state) => state.dashboard);

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity) => {
            const Icon = activityIcons[activity.type];
            return (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activityColors[activity.type]}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground">by {activity.user}</p>
                    <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs capitalize">
                  {activity.type}
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}