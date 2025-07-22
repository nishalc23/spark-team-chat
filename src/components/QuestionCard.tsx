import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Users, Clock } from "lucide-react";

interface QuestionCardProps {
  question: {
    id: string;
    text: string;
    type: "icebreaker" | "trivia";
    responseCount: number;
    isAnswered: boolean;
    timeRemaining?: string;
  };
  onAnswer: () => void;
  onViewResponses: () => void;
}

export const QuestionCard = ({ question, onAnswer, onViewResponses }: QuestionCardProps) => {
  return (
    <Card className="group hover:shadow-card transition-all duration-300 border-2 hover:border-spark-coral/20">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge 
                variant={question.type === "icebreaker" ? "default" : "secondary"}
                className={question.type === "icebreaker" 
                  ? "bg-gradient-warm text-white" 
                  : "bg-gradient-primary text-white"
                }
              >
                {question.type === "icebreaker" ? "Icebreaker" : "Trivia"}
              </Badge>
              {question.timeRemaining && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {question.timeRemaining}
                </div>
              )}
            </div>
            <CardTitle className="text-base leading-relaxed group-hover:text-spark-coral transition-colors">
              {question.text}
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{question.responseCount} responses</span>
            </div>
            {question.isAnswered && (
              <Badge variant="outline" className="border-spark-green text-spark-green">
                ✓ Answered
              </Badge>
            )}
          </div>

          <div className="flex gap-2">
            {!question.isAnswered ? (
              <Button 
                variant="warm" 
                className="flex-1" 
                onClick={onAnswer}
              >
                Answer Question
              </Button>
            ) : (
              <Button 
                variant="spark-outline" 
                className="flex-1" 
                onClick={onAnswer}
              >
                Update Answer
              </Button>
            )}
            
            {question.responseCount > 0 && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onViewResponses}
                className="hover:bg-spark-purple/10 hover:text-spark-purple"
              >
                <MessageCircle className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};