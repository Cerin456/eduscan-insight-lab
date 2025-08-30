import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import {
  Send,
  Sparkles,
  User,
  Clock,
  CheckCircle,
  MessageSquare,
  Lightbulb,
  Target
} from "lucide-react";

interface StudentFeedback {
  id: string;
  studentName: string;
  subject: string;
  score: number;
  maxScore: number;
  aiGeneratedFeedback: string;
  customFeedback: string;
  status: 'draft' | 'sent' | 'pending';
  lastModified: string;
}

const Feedback = () => {
  const { toast } = useToast();
  const [feedbacks, setFeedbacks] = useState<StudentFeedback[]>([
    {
      id: "1",
      studentName: "Alice Johnson",
      subject: "Biology",
      score: 85,
      maxScore: 100,
      aiGeneratedFeedback: "Excellent understanding of photosynthesis! Your explanation clearly demonstrates the process steps and ecological importance. To further improve, consider adding more specific examples of different plant types and their photosynthetic adaptations.",
      customFeedback: "",
      status: 'draft',
      lastModified: "2024-01-15 10:30 AM"
    },
    {
      id: "2",
      studentName: "Marcus Chen",
      subject: "Environmental Science",
      score: 72,
      maxScore: 100,
      aiGeneratedFeedback: "Good grasp of climate change causes. Your answer covers the main factors effectively. However, expanding on the interconnections between different causes and their relative impacts would strengthen your response. Consider including more recent data and examples.",
      customFeedback: "Marcus, I particularly liked how you mentioned industrial processes. For next time, try to include specific examples like the Paris Agreement or recent climate initiatives.",
      status: 'pending',
      lastModified: "2024-01-15 09:15 AM"
    },
    {
      id: "3",
      studentName: "Emma Williams",
      subject: "Earth Science",
      score: 68,
      maxScore: 100,
      aiGeneratedFeedback: "You've covered the basic stages of the water cycle well. Your understanding of evaporation, condensation, and precipitation is clear. To improve, focus on explaining the driving forces behind each stage and how human activities can impact the water cycle.",
      customFeedback: "",
      status: 'draft',
      lastModified: "2024-01-15 08:45 AM"
    }
  ]);

  const [selectedStudent, setSelectedStudent] = useState<StudentFeedback | null>(null);

  const generateAIFeedback = (studentId: string) => {
    const aiSuggestions = [
      "Consider elaborating on the scientific principles behind your answer.",
      "Great work! Adding real-world examples would make your response even stronger.",
      "Your understanding is solid. Try connecting your ideas to current research or applications.",
      "Excellent critical thinking! Consider exploring counterarguments to show deeper analysis.",
      "Good foundation. Expanding on the implications and consequences would enhance your response."
    ];

    const randomSuggestion = aiSuggestions[Math.floor(Math.random() * aiSuggestions.length)];
    
    setFeedbacks(prev =>
      prev.map(feedback =>
        feedback.id === studentId
          ? {
              ...feedback,
              aiGeneratedFeedback: feedback.aiGeneratedFeedback + " " + randomSuggestion,
              lastModified: new Date().toLocaleString()
            }
          : feedback
      )
    );

    toast({
      title: "AI Feedback Enhanced",
      description: "Additional personalized suggestions have been generated.",
    });
  };

  const updateCustomFeedback = (studentId: string, feedback: string) => {
    setFeedbacks(prev =>
      prev.map(f =>
        f.id === studentId
          ? { ...f, customFeedback: feedback, lastModified: new Date().toLocaleString() }
          : f
      )
    );
  };

  const sendFeedback = (studentId: string) => {
    setFeedbacks(prev =>
      prev.map(f =>
        f.id === studentId
          ? { ...f, status: 'sent' as const, lastModified: new Date().toLocaleString() }
          : f
      )
    );

    const student = feedbacks.find(f => f.id === studentId);
    toast({
      title: "Feedback Sent",
      description: `Personalized feedback sent to ${student?.studentName}`,
    });
  };

  const getStatusColor = (status: StudentFeedback['status']) => {
    switch (status) {
      case 'sent':
        return 'bg-success text-success-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return "text-success";
    if (percentage >= 60) return "text-warning";
    return "text-error";
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">Teacher Feedback</h1>
        <p className="text-muted-foreground">
          Create personalized comments and AI-enhanced feedback for students
        </p>
      </motion.div>

      {/* Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid md:grid-cols-4 gap-4"
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-foreground">{feedbacks.length}</p>
                <p className="text-sm text-muted-foreground">Total Feedbacks</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-success" />
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {feedbacks.filter(f => f.status === 'sent').length}
                </p>
                <p className="text-sm text-muted-foreground">Sent</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-warning" />
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {feedbacks.filter(f => f.status === 'pending').length}
                </p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Target className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {Math.round(feedbacks.reduce((acc, curr) => acc + curr.score, 0) / feedbacks.length)}%
                </p>
                <p className="text-sm text-muted-foreground">Avg Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Feedback Cards */}
      <div className="space-y-6">
        {feedbacks.map((feedback, index) => (
          <motion.div
            key={feedback.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{feedback.studentName}</CardTitle>
                      <CardDescription>
                        {feedback.subject} • Score: {" "}
                        <span className={`font-semibold ${getScoreColor(feedback.score, feedback.maxScore)}`}>
                          {feedback.score}/{feedback.maxScore}
                        </span>
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(feedback.status)}>
                      {feedback.status === 'sent' && <CheckCircle className="w-3 h-3 mr-1" />}
                      {feedback.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                      {feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* AI Generated Feedback */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      AI-Generated Feedback:
                    </Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => generateAIFeedback(feedback.id)}
                      className="gap-2"
                    >
                      <Lightbulb className="w-4 h-4" />
                      Enhance
                    </Button>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-lg">
                    <p className="text-sm text-foreground">{feedback.aiGeneratedFeedback}</p>
                  </div>
                </div>

                {/* Custom Teacher Feedback */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-muted-foreground">
                    Your Personal Message:
                  </Label>
                  <Textarea
                    placeholder="Add your personalized feedback and encouragement for the student..."
                    value={feedback.customFeedback}
                    onChange={(e) => updateCustomFeedback(feedback.id, e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>

                {/* Preview Combined Feedback */}
                {feedback.customFeedback && (
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-muted-foreground">
                      Combined Feedback Preview:
                    </Label>
                    <div className="p-4 bg-muted/30 border border-border rounded-lg">
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs font-semibold text-primary uppercase tracking-wide">AI Analysis</p>
                          <p className="text-sm text-foreground">{feedback.aiGeneratedFeedback}</p>
                        </div>
                        <div className="border-l-2 border-primary pl-4">
                          <p className="text-xs font-semibold text-primary uppercase tracking-wide">Teacher's Note</p>
                          <p className="text-sm text-foreground">{feedback.customFeedback}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <p className="text-xs text-muted-foreground">
                    Last modified: {feedback.lastModified}
                  </p>
                  <div className="flex gap-2">
                    {feedback.status !== 'sent' && (
                      <Button
                        onClick={() => sendFeedback(feedback.id)}
                        className="gap-2"
                        disabled={!feedback.customFeedback.trim()}
                      >
                        <Send className="w-4 h-4" />
                        Send Feedback
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;