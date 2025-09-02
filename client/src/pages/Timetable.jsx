  import { useSelector, useDispatch } from "react-redux";
  import { addTimeSlot, deleteTimeSlot, setSelectedClass } from "../store/slices/timetableSlice";
  import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
  import { Button } from "../components/ui/button";
  import { Badge } from "../components/ui/badge";
  import { Calendar, Clock, MapPin, User, Plus, Trash2 } from "lucide-react";

  export default function Timetable() {
    const dispatch = useDispatch();
    const { timeSlots, selectedClass } = useSelector((state) => state.timetable);

    const classes = ["CSE-3A", "CSE-3B", "IT-2A", "ECE-4A"];
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    const classTimeSlots = timeSlots.filter(slot => slot.class === selectedClass);

    const getTimeSlotsByDay = (day) => {
      return classTimeSlots
        .filter(slot => slot.day === day)
        .sort((a, b) => a.startTime.localeCompare(b.startTime));
    };

    const addNewTimeSlot = () => {
      const newSlot = {
        id: Date.now().toString(),
        day: "Monday",
        startTime: "09:00",
        endTime: "10:00",
        subject: "New Subject",
        teacher: "Teacher Name",
        classroom: "Room 101",
        class: selectedClass
      };
      dispatch(addTimeSlot(newSlot));
    };

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Timetable Management</h1>
            <p className="text-muted-foreground">Create and manage class schedules</p>
          </div>
          <Button onClick={addNewTimeSlot} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Time Slot
          </Button>
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

        <div className="grid gap-6">
          {days.map((day) => {
            const daySlots = getTimeSlotsByDay(day);
            return (
              <Card key={day}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    {day}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {daySlots.length > 0 ? (
                    <div className="space-y-3">
                      {daySlots.map((slot) => (
                        <div key={slot.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="w-4 h-4" />
                              <span className="font-medium">{slot.startTime} - {slot.endTime}</span>
                            </div>
                            <div>
                              <p className="font-medium">{slot.subject}</p>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <User className="w-3 h-3" />
                                  {slot.teacher}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {slot.classroom}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{slot.class}</Badge>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => dispatch(deleteTimeSlot(slot.id))}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No classes scheduled for {day}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }
