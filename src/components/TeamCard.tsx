import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Clock, Trophy } from "lucide-react";

interface TeamCardProps {
  team: {
    id: string;
    name: string;
    code: string;
    memberCount: number;
    questionsCompleted: number;
    totalQuestions: number;
    lastActivity: string;
  };
  onJoin: () => void;
}

export const TeamCard = ({ team, onJoin }: TeamCardProps) => {
  const completionPercentage = Math.round((team.questionsCompleted / team.totalQuestions) * 100);

  return (
    <Card className="group hover:shadow-card transition-all duration-300 hover:scale-105 border-2 hover:border-spark-purple/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg group-hover:text-spark-purple transition-colors">
              {team.name}
            </CardTitle>
            <CardDescription className="text-sm font-mono bg-muted px-2 py-1 rounded mt-1 inline-block">
              Code: {team.code}
            </CardDescription>
          </div>
          <div className="bg-gradient-subtle p-3 rounded-full">
            <Users className="h-6 w-6 text-spark-purple" />
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{team.memberCount} members</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{team.lastActivity}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-spark-green" />
                <span>Progress</span>
              </div>
              <span className="font-medium">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-gradient-success h-2 rounded-full transition-all duration-500" 
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {team.questionsCompleted} of {team.totalQuestions} questions completed
            </p>
          </div>

          <Button 
            variant="spark" 
            className="w-full" 
            onClick={onJoin}
          >
            Join Team
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};