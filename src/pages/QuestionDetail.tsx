import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Send, Users, MessageCircle, Clock, CheckCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { mockQuestions, mockResponses } from "@/data/mockData";

export const QuestionDetail = () => {
  const { teamCode, questionId } = useParams();
  const navigate = useNavigate();
  const [response, setResponse] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🔍 Debugging
  console.log("🔍 questionId from URL:", questionId);
  console.log("🧩 All mockQuestions IDs:", mockQuestions.map((q) => q.id));
  console.log("🧩 Type of q.id:", typeof mockQuestions[0]?.id);

  // Ensure id match even if types differ (string vs number)
  const question = mockQuestions.find((q) => q.id.toString() === questionId);
  const questionResponses = mockResponses.filter((r) => r.questionId.toString() === questionId);

  if (!question) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Question Not Found</h1>
            <p className="text-muted-foreground mb-4">
              Looking for question ID: "{questionId}"
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Available questions: {mockQuestions.map((q) => q.id).join(", ")}
            </p>
            <Button onClick={() => navigate(`/team/${teamCode}`)}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmitResponse = async () => {
    if (!response.trim()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setResponse("");

    const teamKey = `team-${teamCode}`;
    const stored = localStorage.getItem(teamKey);
    if (stored) {
      const teamData = JSON.parse(stored);
      if (!teamData.completedQuestions) teamData.completedQuestions = [];

      if (!teamData.completedQuestions.includes(questionId)) {
        teamData.completedQuestions.push(questionId);
        teamData.questionsCompleted = teamData.completedQuestions.length;
        teamData.totalQuestions = mockQuestions.length;
        localStorage.setItem(teamKey, JSON.stringify(teamData));
      }
    }

    navigate(`/team/${teamCode}`);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(`/team/${teamCode}`)}
            className="hover:bg-spark-purple/10"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Question Detail</h1>
            <p className="text-muted-foreground">Share your thoughts with the team</p>
          </div>
        </div>

        {/* Question Card */}
        <Card className="mb-8 shadow-card border-2 border-spark-purple/20">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge variant="default" className="bg-gradient-primary text-white">
                    {question.type}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {question.timeRemaining || "24h"} remaining
                  </div>
                </div>
                <CardTitle className="text-lg leading-relaxed">{question.text}</CardTitle>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{questionResponses.length} responses</span>
              </div>
              <Badge variant="outline" className="border-spark-green text-spark-green">
                <CheckCircle className="h-3 w-3 mr-1" />
                You're answering
              </Badge>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Response Form */}
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-spark-coral" />
                  Your Answer
                </CardTitle>
                <CardDescription>
                  Share your thoughts and see what your teammates think
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Type your response here..."
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  className="min-h-[120px] resize-none"
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {response.length}/500 characters
                  </span>
                  <Button
                    variant="warm"
                    onClick={handleSubmitResponse}
                    disabled={!response.trim() || isSubmitting}
                    className="min-w-[100px]"
                  >
                    {isSubmitting ? "Submitting..." : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Submit
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Team Responses */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-spark-purple" />
              <h3 className="text-lg font-semibold">Team Responses</h3>
              <Badge variant="outline">{questionResponses.length}</Badge>
            </div>

            {questionResponses.length > 0 ? (
              <div className="space-y-4">
                {questionResponses.map((resp) => (
                  <Card key={resp.id} className="hover:shadow-card transition-all duration-300">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-gradient-primary text-white font-medium">
                            {resp.userInitials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{resp.userName}</span>
                            <span className="text-xs text-muted-foreground">{resp.timestamp}</span>
                            {resp.isCorrect && (
                              <Badge
                                variant="outline"
                                className="border-spark-green text-spark-green text-xs"
                              >
                                ✓ Correct
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm leading-relaxed">{resp.response}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No responses yet</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Be the first to share your thoughts!
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
