import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Plus, Search, Filter, MoreHorizontal, GraduationCap } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

// Mock data
const students = [
  {
    id: "1",
    name: "John Doe",
    rollNumber: "CS2101",
    email: "john@college.edu",
    class: "CSE-3A",
    phone: "+1 234 567 890",
    status: "active",
    attendance: 85.5,
  },
  {
    id: "2",
    name: "Jane Smith",
    rollNumber: "CS2102",
    email: "jane@college.edu",
    class: "CSE-3A",
    phone: "+1 234 567 891",
    status: "active",
    attendance: 92.3,
  },
  {
    id: "3",
    name: "Mike Johnson",
    rollNumber: "CS2103",
    email: "mike@college.edu",
    class: "CSE-3A",
    phone: "+1 234 567 892",
    status: "inactive",
    attendance: 78.9,
  },
  {
    id: "4",
    name: "Sarah Wilson",
    rollNumber: "CS2104",
    email: "sarah@college.edu",
    class: "CSE-3B",
    phone: "+1 234 567 893",
    status: "active",
    attendance: 94.7,
  },
];

export default function Students() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAttendanceBadge = (attendance) => {
    if (attendance >= 90) return "success";
    if (attendance >= 75) return "warning";
    return "destructive";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-primary" />
            Students Management
          </h1>
          <p className="text-muted-foreground">
            Manage student records and information
          </p>
        </div>
        <Button className="bg-gradient-primary hover:bg-primary-hover transition-all shadow-elegant">
          <Plus className="w-4 h-4 mr-2" />
          Add Student
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-soft">
        <CardContent className="p-6">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Students List ({filteredStudents.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Roll Number</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id} className="hover:bg-secondary/50 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono">{student.rollNumber}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{student.class}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">{student.phone}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge variant={getAttendanceBadge(student.attendance)}>
                        {student.attendance}%
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={student.status === 'active' ? 'default' : 'secondary'}
                      className={student.status === 'active' ? 'bg-success text-success-foreground' : ''}
                    >
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Student</DropdownMenuItem>
                        <DropdownMenuItem>View Attendance</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Deactivate
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
