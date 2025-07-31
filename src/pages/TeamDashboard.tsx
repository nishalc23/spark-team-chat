import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QuestionCard } from "@/components/QuestionCard";
import { Share2, Copy, Users, Calendar, Trophy, Sparkles } from "lucide-react";
import { mockQuestions } from "@/data/mockData";
import teamsparkLogo from "@/assets/new-logo.png";

export const TeamDashboard = () => {
  const { teamCode } = useParams();
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState(false);

  // Format today's date
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Load team info from localStorage or set fallback
  const storedTeam = localStorage.getItem(`team-${teamCode}`);
  const team = storedTeam
    ? JSON.parse(storedTeam)
    : {
        name: "Unknown Team",
        code: teamCode,
        memberCount: 0,
        completedQuestions: [],
      };

  // Calculate progress safely
  const questionsCompleted = team.completedQuestions?.length || 0;
  const totalQuestions = mockQuestions.length;
  const completionPercentage =
    totalQuestions > 0
      ? Math.round((questionsCompleted / totalQuestions) * 100)
      : 0;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(team.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleAnswerQuestion = (questionId: string) => {
    navigate(`/team/${teamCode}/question/${questionId}`);
  };

  const handleViewResponses = (questionId: string) => {
    navigate(`/team/${teamCode}/question/${questionId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <img src={teamsparkLogo} alt="TeamSpark" className="w-10 h-10" />
            <div>
              <h1 className="text-3xl font-bold">{team.name}</h1>
              <p className="text-muted-foreground">Team Dashboard</p>
            </div>
          </div>
          <Button variant="spark-outline" onClick={handleCopyCode}>
            {copiedCode ? "Copied!" : "Share Team"}
            <Share2 className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Team Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-2 border-spark-purple/20 shadow-card">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Code</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopyCode}
                className="ml-auto h-8 w-8"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-mono">{team.code}</div>
              <p className="text-xs text-muted-foreground">
                Share this code with team members
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-spark-coral/20 shadow-card">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{team.memberCount}</div>
              <p className="text-xs text-muted-foreground">Active participants</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-spark-green/20 shadow-card">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progress</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completionPercentage}%</div>
              <div className="w-full bg-muted rounded-full h-2 mt-2">
                <div
                  className="bg-gradient-success h-2 rounded-full transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {questionsCompleted}/{totalQuestions} completed
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Daily Questions */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Today's Questions</h2>
              <p className="text-muted-foreground">
                New questions available every 24 hours
              </p>
            </div>
            <Badge
              variant="outline"
              className="ml-auto border-spark-purple text-spark-purple"
            >
              <Calendar className="h-3 w-3 mr-1" />
              {today}
            </Badge>
          </div>

          <div className="grid gap-6">
            {mockQuestions.map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
                onAnswer={() => handleAnswerQuestion(question.id)}
                onViewResponses={() => handleViewResponses(question.id)}
              />
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-12 flex flex-wrap gap-4 justify-center">
          <Button variant="spark-outline">View All Completed</Button>
          <Button variant="ghost">Team Settings</Button>
          <Button variant="ghost">Invite Members</Button>
        </div>
      </div>
    </div>
  );
};
