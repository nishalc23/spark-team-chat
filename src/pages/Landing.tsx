import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, Users, MessageCircle, Trophy } from "lucide-react";
import teamsparkLogo from "@/assets/teamspark-logo.png";
import { useNavigate } from "react-router-dom";


export const Landing = () => {
  const [teamName, setTeamName] = useState("");
  const [joinCode, setJoinCode] = useState("");

  const handleCreateTeam = () => {
    if (teamName.trim()) {
      // Navigate to team dashboard with new team
      console.log("Creating team:", teamName);
    }
  };

  const handleJoinTeam = () => {
    if (joinCode.trim()) {
      // Navigate to team dashboard
      console.log("Joining team with code:", joinCode);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex flex-col items-center justify-center mb-6">
            <img 
              src={teamsparkLogo} 
              alt="TeamSpark" 
              className="w-16 h-16 mb-4 animate-galaxy-pulse"
            />
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              TeamSpark
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ignite meaningful connections with daily icebreakers and trivia questions. 
            Build stronger teams, one conversation at a time.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center hover:shadow-card transition-all duration-300">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Daily Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Fresh icebreakers and trivia delivered every 24 hours to keep conversations flowing
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-card transition-all duration-300">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-gradient-warm rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Team Bonding</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                See everyone's responses in real-time and discover new things about your teammates
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-card transition-all duration-300">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-gradient-success rounded-full flex items-center justify-center mb-4">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Track Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Keep track of completed conversations and watch your team connections grow
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Action Cards */}
        <div className="max-w-2xl mx-auto">
          <Tabs defaultValue="create" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="create" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white">
                Create Team
              </TabsTrigger>
              <TabsTrigger value="join" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white">
                Join Team
              </TabsTrigger>
            </TabsList>

            <TabsContent value="create">
              <Card className="shadow-card border-2 hover:border-spark-purple/20 transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4 animate-spark-glow">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">Start Your Team Journey</CardTitle>
                  <CardDescription>
                    Create a new team and get a unique code to share with your members
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="team-name">Team Name</Label>
                    <Input
                      id="team-name"
                      placeholder="Enter your team name"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <Button 
                    variant="spark" 
                    size="lg" 
                    className="w-full"
                    onClick={handleCreateTeam}
                    disabled={!teamName.trim()}
                  >
                    Create Team
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="join">
              <Card className="shadow-card border-2 hover:border-spark-coral/20 transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center mb-4 animate-spark-glow">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">Join Your Team</CardTitle>
                  <CardDescription>
                    Enter the team code shared by your team leader
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="join-code">Team Code</Label>
                    <Input
                      id="join-code"
                      placeholder="Enter team code"
                      value={joinCode}
                      onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                      className="mt-2 font-mono text-center text-lg"
                    />
                  </div>
                  <Button 
                    variant="warm" 
                    size="lg" 
                    className="w-full"
                    onClick={handleJoinTeam}
                    disabled={!joinCode.trim()}
                  >
                    Join Team
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-muted-foreground">
          <p>© 2024 TeamSpark - Building connections, one conversation at a time</p>
        </div>
      </div>
    </div>
  );
};