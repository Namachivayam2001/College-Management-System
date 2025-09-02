import { useSelector, useDispatch } from "react-redux";
import { updateExamDutyStatus, addExamDuty } from "../store/slices/timetableSlice";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Calendar, Clock, MapPin, User, Plus, CheckCircle, XCircle, AlertCircle } from "lucide-react";

export default function ExamDuties() {
  const dispatch = useDispatch();
  const { examDuties } = useSelector((state) => state.timetable);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'accepted': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'declined': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'assigned': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default: return null;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'accepted': return <Badge className="bg-green-100 text-green-800">Accepted</Badge>;
      case 'declined': return <Badge variant="destructive">Declined</Badge>;
      case 'assigned': return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const updateStatus = (id, status) => {
    dispatch(updateExamDutyStatus({ id, status }));
  };

  const addNewExamDuty = () => {
    const newDuty = {
      id: Date.now().toString(),
      teacherId: 'T003',
      teacherName: 'Prof. Wilson',
      examDate: '2024-03-01',
      examTime: '09:00-12:00',
      subject: 'Mathematics',
      classroom: 'Room 201',
      status: 'assigned'
    };
    dispatch(addExamDuty(newDuty));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Exam Duties Management</h1>
          <p className="text-muted-foreground">Assign and manage teacher exam duties</p>
        </div>
        <Button onClick={addNewExamDuty} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Assign New Duty
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{examDuties.filter(d => d.status === 'assigned').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Accepted</p>
                <p className="text-2xl font-bold">{examDuties.filter(d => d.status === 'accepted').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Declined</p>
                <p className="text-2xl font-bold">{examDuties.filter(d => d.status === 'declined').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Duties</p>
                <p className="text-2xl font-bold">{examDuties.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Exam Duties List */}
      <Card>
        <CardHeader>
          <CardTitle>Exam Duties</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {examDuties.map((duty) => (
              <div key={duty.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(duty.status)}
                    <div>
                      <p className="font-medium">{duty.teacherName}</p>
                      <p className="text-sm text-muted-foreground">ID: {duty.teacherId}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">{duty.subject}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {duty.examDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {duty.examTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {duty.classroom}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {getStatusBadge(duty.status)}
                  {duty.status === 'assigned' && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => updateStatus(duty.id, 'accepted')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateStatus(duty.id, 'declined')}
                        className="text-red-600 border-red-200"
                      >
                        Decline
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
