import { useState } from "react";
import { Landing } from "./Landing";
import { TeamDashboard } from "./TeamDashboard"; 
import { QuestionDetail } from "./QuestionDetail";

const Index = () => {
  const [currentView, setCurrentView] = useState<"landing" | "dashboard" | "question">("landing");

  // Simple navigation for demo
  if (currentView === "dashboard") {
    return <TeamDashboard />;
  }
  
  if (currentView === "question") {
    return <QuestionDetail />;
  }

  return <Landing />;
};

export default Index;
