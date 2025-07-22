export const mockTeams = [
  {
    id: "1",
    name: "Marketing Mavericks",
    code: "MKTG2024",
    memberCount: 8,
    questionsCompleted: 12,
    totalQuestions: 15,
    lastActivity: "2 hours ago"
  },
  {
    id: "2", 
    name: "Dev Dream Team",
    code: "CODE99",
    memberCount: 6,
    questionsCompleted: 8,
    totalQuestions: 15,
    lastActivity: "1 day ago"
  },
  {
    id: "3",
    name: "Sales Squad",
    code: "SELL123",
    memberCount: 12,
    questionsCompleted: 15,
    totalQuestions: 15,
    lastActivity: "30 min ago"
  }
];

export const mockQuestions = [
  {
    id: "1",
    text: "If you could have dinner with any historical figure, who would it be and why?",
    type: "icebreaker" as const,
    responseCount: 5,
    isAnswered: false,
    timeRemaining: "18h 32m"
  },
  {
    id: "2",
    text: "What programming language was created by Brendan Eich in just 10 days?",
    type: "trivia" as const,
    responseCount: 3,
    isAnswered: true,
    timeRemaining: "18h 32m"
  },
  {
    id: "3",
    text: "What's your go-to comfort food when you're having a tough day?",
    type: "icebreaker" as const,
    responseCount: 7,
    isAnswered: true,
    timeRemaining: "18h 32m"
  },
  {
    id: "4",
    text: "Which planet is known as the 'Red Planet'?",
    type: "trivia" as const,
    responseCount: 2,
    isAnswered: false,
    timeRemaining: "18h 32m"
  },
  {
    id: "5",
    text: "If you could instantly master any skill, what would it be?",
    type: "icebreaker" as const,
    responseCount: 4,
    isAnswered: false,
    timeRemaining: "18h 32m"
  }
];

export const mockResponses = [
  {
    id: "1",
    questionId: "2",
    userInitials: "JD",
    userName: "John Doe",
    response: "JavaScript! Created in 1995 at Netscape.",
    timestamp: "2 hours ago",
    isCorrect: true
  },
  {
    id: "2", 
    questionId: "2",
    userInitials: "SM",
    userName: "Sarah Miller",
    response: "JavaScript - though it was originally called LiveScript!",
    timestamp: "3 hours ago",
    isCorrect: true
  },
  {
    id: "3",
    questionId: "3",
    userInitials: "MJ",
    userName: "Mike Johnson",
    response: "Pizza! Nothing beats a good slice when the day gets rough 🍕",
    timestamp: "1 day ago"
  },
  {
    id: "4",
    questionId: "3",
    userInitials: "AL",
    userName: "Amy Lee",
    response: "Homemade chocolate chip cookies - they remind me of childhood",
    timestamp: "1 day ago"
  }
];