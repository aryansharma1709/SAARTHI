import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, BookOpen, FileText, Award, Clock, Upload, 
  User, Briefcase, Star, CheckCircle, Book, Code 
} from 'lucide-react';

const mockWeeklyActivity = [
  { day: 'Monday', completed: true, tasks: 3, minutes: 45, topic: 'Data Structures' },
  { day: 'Tuesday', completed: true, tasks: 5, minutes: 60, topic: 'Algorithms' },
  { day: 'Wednesday', completed: true, tasks: 4, minutes: 30, topic: 'Web Dev' },
  { day: 'Thursday', completed: true, tasks: 6, minutes: 90, topic: 'System Design' },
  { day: 'Friday', completed: true, tasks: 3, minutes: 40, topic: 'DSA Practice' },
  { day: 'Saturday', completed: false, tasks: 0, minutes: 0, topic: '-' },
  { day: 'Sunday', completed: true, tasks: 4, minutes: 55, topic: 'Mock Interview' },
];

const StreakGraph = ({ streakData }) => {
  return (
    <div className="flex items-center space-x-1">
      {mockWeeklyActivity.map((day, index) => (
        <div key={day.day} className="flex flex-col items-center">
          <div 
            className={`h-16 w-8 rounded-t-lg ${
              day.completed ? 'bg-green-500' : 'bg-gray-200'
            }`}
            style={{
              height: `${(day.minutes / 90) * 64}px`,
              minHeight: '16px'
            }}
          />
          <div className="text-xs mt-1 rotate-45 origin-left translate-x-4">
            {day.day.slice(0, 3)}
          </div>
        </div>
      ))}
    </div>
  );
};

const ActivityCard = ({ day, completed, tasks, minutes, topic }) => (
  <Card className={`transform transition-all duration-200 hover:scale-105 ${
    completed ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-gray-200'
  }`}>
    <CardContent className="pt-6">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold text-lg">{day}</h4>
          <p className="text-sm text-gray-600">{topic}</p>
        </div>
        {completed && (
          <CheckCircle className="h-6 w-6 text-green-500" />
        )}
      </div>
      <div className="mt-4 flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-4 w-4 text-blue-500" />
          <span className="text-sm">{tasks} tasks</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-purple-500" />
          <span className="text-sm">{minutes} mins</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

const SaarthiDashboard = ({ userType = 'student' }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const streakCount = 7;

  const StreakSection = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Star className="h-6 w-6 text-orange-500" />
          <span>Learning Streak</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <div className="text-3xl font-bold text-orange-500">{streakCount}</div>
            <div className="text-gray-600">
              days in a row!
            </div>
          </div>
          <StreakGraph streakData={mockWeeklyActivity} />
        </div>
      </CardContent>
    </Card>
  );

  const WeeklyActivitySection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockWeeklyActivity.map((day) => (
          <ActivityCard key={day.day} {...day} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-600">Track your learning journey</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="font-semibold">John Doe</p>
              <p className="text-sm text-gray-600">{userType === 'mentor' ? 'Mentor' : 'Student'}</p>
            </div>
          </div>
        </div>

        {/* Streak Section */}
        <StreakSection />

        {/* Main Content */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-6 w-6 text-blue-500" />
                <span>Weekly Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <WeeklyActivitySection />
            </CardContent>
          </Card>

          {/* Progress Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-6 w-6 text-purple-500" />
                <span>Learning Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Data Structures</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Algorithms</span>
                    <span>60%</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">System Design</span>
                    <span>45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SaarthiDashboard;