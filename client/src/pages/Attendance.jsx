import { useSelector, useDispatch } from "react-redux";
import { setSelectedClass, addAttendanceRecord } from "../store/slices/attendanceSlice";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Users, Calendar, CheckCircle, XCircle, Clock } from "lucide-react";

export default function Attendance() {
  const dispatch = useDispatch();
  const { students, records, selectedClass } = useSelector((state) => state.attendance);

  const classes = ["CSE-3A", "CSE-3B", "IT-2A", "ECE-4A"];

  const getAttendanceStatus = (studentId) => {
    const todayRecord = records.find(
      record => record.studentId === studentId && record.date === new Date().toISOString().split('T')[0]
    );
    return todayRecord?.status || 'not-marked';
  };

  const markAttendance = (studentId, status) => {
    const record = {
      id: Date.now().toString(),
      studentId,
      date: new Date().toISOString().split('T')[0],
      status,
      subject: 'Data Structures',
      teacher: 'Dr. Smith'
    };
    dispatch(addAttendanceRecord(record));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'absent': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'late': return <Clock className="w-4 h-4 text-yellow-500" />;
      default: return null;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'present': return <Badge variant="default" className="bg-green-100 text-green-800">Present</Badge>;
      case 'absent': return <Badge variant="destructive">Absent</Badge>;
      case 'late': return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Late</Badge>;
      default: return <Badge variant="outline">Not Marked</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Attendance Management</h1>
          <p className="text-muted-foreground">Track and manage student attendance</p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">{new Date().toLocaleDateString()}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Select value={selectedClass} onValueChange={(value) => dispatch(setSelectedClass(value))}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select Class" />
          </SelectTrigger>
          <SelectContent>
            {classes.map((cls) => (
              <SelectItem key={cls} value={cls}>
                {cls}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Class {selectedClass} - Today's Attendance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {students.filter(student => student.class === selectedClass).map((student) => {
              const status = getAttendanceStatus(student.id);
              return (
                <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-primary">{student.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.rollNumber}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {getStatusBadge(status)}
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => markAttendance(student.id, 'present')}
                        className="text-green-600 border-green-200"
                      >
                        Present
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => markAttendance(student.id, 'late')}
                        className="text-yellow-600 border-yellow-200"
                      >
                        Late
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => markAttendance(student.id, 'absent')}
                        className="text-red-600 border-red-200"
                      >
                        Absent
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
