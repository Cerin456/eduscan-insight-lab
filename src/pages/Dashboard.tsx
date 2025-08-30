import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle,
  Edit3,
  Save,
  RotateCcw,
  TrendingUp,
  TrendingDown,
  FileText
} from "lucide-react";

interface GradedAnswer {
  id: string;
  studentName: string;
  question: string;
  studentAnswer: string;
  aiScore: number;
  maxScore: number;
  confidence: number;
  biasAlert: boolean;
  teacherScore?: number;
  teacherFeedback?: string;
  isEditing: boolean;
}

const Dashboard = () => {
  const { toast } = useToast();
  const [gradedAnswers, setGradedAnswers] = useState<GradedAnswer[]>([
    {
      id: "1",
      studentName: "Alice Johnson",
      question: "Explain the process of photosynthesis and its importance in the ecosystem.",
      studentAnswer: "Photosynthesis is the process where plants use sunlight, carbon dioxide, and water to make glucose and oxygen. The chloroplasts in plant cells contain chlorophyll which captures light energy. This process is important because it produces oxygen that we breathe and glucose that serves as food for plants and animals in the food chain.",
      aiScore: 85,
      maxScore: 100,
      confidence: 92,
      biasAlert: false,
      isEditing: false
    },
    {
      id: "2",
      studentName: "Marcus Chen",
      question: "What are the main causes of climate change?",
      studentAnswer: "Climate change is caused by greenhouse gases like CO2 from burning fossil fuels. Also deforestation reduces trees that absorb CO2. Industrial processes and agriculture also contribute.",
      aiScore: 72,
      maxScore: 100,
      confidence: 78,
      biasAlert: true,
      isEditing: false
    },
    {
      id: "3",
      studentName: "Emma Williams",
      question: "Describe the water cycle and its stages.",
      studentAnswer: "Water cycle has evaporation when sun heats water and it becomes vapor. Then condensation makes clouds. Precipitation is rain or snow falling down. Collection is when water goes back to oceans and rivers.",
      aiScore: 68,
      maxScore: 100,
      confidence: 85,
      biasAlert: false,
      isEditing: false
    }
  ]);

  const toggleEdit = (id: string) => {
    setGradedAnswers(prev =>
      prev.map(answer =>
        answer.id === id
          ? { ...answer, isEditing: !answer.isEditing }
          : answer
      )
    );
  };

  const updateScore = (id: string, newScore: number) => {
    setGradedAnswers(prev =>
      prev.map(answer =>
        answer.id === id
          ? { ...answer, teacherScore: newScore }
          : answer
      )
    );
  };

  const updateFeedback = (id: string, feedback: string) => {
    setGradedAnswers(prev =>
      prev.map(answer =>
        answer.id === id
          ? { ...answer, teacherFeedback: feedback }
          : answer
      )
    );
  };

  const saveChanges = (id: string) => {
    const answer = gradedAnswers.find(a => a.id === id);
    toggleEdit(id);
    toast({
      title: "Changes Saved",
      description: `Updated grading for ${answer?.studentName}`,
    });
  };

  const resetToAI = (id: string) => {
    setGradedAnswers(prev =>
      prev.map(answer =>
        answer.id === id
          ? { ...answer, teacherScore: undefined, teacherFeedback: undefined }
          : answer
      )
    );
    toast({
      title: "Reset to AI Score",
      description: "Reverted to original AI grading",
    });
  };

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return "text-success";
    if (percentage >= 60) return "text-warning";
    return "text-error";
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 85) return "bg-success";
    if (confidence >= 70) return "bg-warning";
    return "bg-error";
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">Auto-Grading Dashboard</h1>
        <p className="text-muted-foreground">
          Review AI-generated scores and provide teacher overrides
        </p>
      </motion.div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid md:grid-cols-4 gap-4"
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-foreground">{gradedAnswers.length}</p>
                <p className="text-sm text-muted-foreground">Total Answers</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-success" />
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {Math.round(gradedAnswers.reduce((acc, curr) => acc + curr.aiScore, 0) / gradedAnswers.length)}
                </p>
                <p className="text-sm text-muted-foreground">Average Score</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {Math.round(gradedAnswers.reduce((acc, curr) => acc + curr.confidence, 0) / gradedAnswers.length)}%
                </p>
                <p className="text-sm text-muted-foreground">Avg Confidence</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-warning" />
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {gradedAnswers.filter(a => a.biasAlert).length}
                </p>
                <p className="text-sm text-muted-foreground">Bias Alerts</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Graded Answers */}
      <div className="space-y-6">
        {gradedAnswers.map((answer, index) => (
          <motion.div
            key={answer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <Card className={answer.biasAlert ? "border-warning shadow-medium" : ""}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{answer.studentName}</CardTitle>
                    <CardDescription className="mt-1">
                      {answer.question}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {answer.biasAlert && (
                      <Badge variant="outline" className="border-warning text-warning">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Bias Alert
                      </Badge>
                    )}
                    <Badge
                      variant="outline"
                      className={`${getConfidenceColor(answer.confidence)} text-white`}
                    >
                      {answer.confidence}% confidence
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Student Answer */}
                <div>
                  <Label className="text-sm font-semibold text-muted-foreground">
                    Student Answer:
                  </Label>
                  <p className="text-sm text-foreground mt-1 p-3 bg-muted/30 rounded-lg">
                    {answer.studentAnswer}
                  </p>
                </div>

                {/* Scoring */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-muted-foreground">
                      AI Score:
                    </Label>
                    <div className="flex items-center gap-3">
                      <span className={`text-2xl font-bold ${getScoreColor(answer.aiScore, answer.maxScore)}`}>
                        {answer.aiScore}/{answer.maxScore}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => resetToAI(answer.id)}
                        className="gap-2"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Reset
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-muted-foreground">
                      Teacher Override:
                    </Label>
                    {answer.isEditing ? (
                      <Input
                        type="number"
                        min={0}
                        max={answer.maxScore}
                        value={answer.teacherScore || answer.aiScore}
                        onChange={(e) => updateScore(answer.id, parseInt(e.target.value) || 0)}
                        className="w-24"
                      />
                    ) : (
                      <span className={`text-2xl font-bold ${getScoreColor(answer.teacherScore || answer.aiScore, answer.maxScore)}`}>
                        {answer.teacherScore || answer.aiScore}/{answer.maxScore}
                      </span>
                    )}
                  </div>
                </div>

                {/* Teacher Feedback */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-muted-foreground">
                    Teacher Feedback:
                  </Label>
                  {answer.isEditing ? (
                    <Textarea
                      placeholder="Add personalized feedback for the student..."
                      value={answer.teacherFeedback || ""}
                      onChange={(e) => updateFeedback(answer.id, e.target.value)}
                      className="min-h-[100px]"
                    />
                  ) : (
                    <p className="text-sm text-foreground p-3 bg-muted/30 rounded-lg min-h-[60px]">
                      {answer.teacherFeedback || "No feedback provided yet."}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-2 pt-4 border-t">
                  {answer.isEditing ? (
                    <Button
                      onClick={() => saveChanges(answer.id)}
                      className="gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => toggleEdit(answer.id)}
                      className="gap-2"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit Score & Feedback
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;