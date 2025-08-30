import { useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  TrendingUp,
  AlertTriangle,
  Users,
  Target,
  Award,
  BarChart3
} from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  // Performance Trends Data
  const performanceData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Class Average',
        data: [72, 75, 78, 74, 81, 85],
        borderColor: 'hsl(217, 91%, 60%)',
        backgroundColor: 'hsl(217, 91%, 60%, 0.1)',
        tension: 0.4,
      },
      {
        label: 'AI Confidence',
        data: [88, 85, 90, 87, 92, 94],
        borderColor: 'hsl(142, 71%, 45%)',
        backgroundColor: 'hsl(142, 71%, 45%, 0.1)',
        tension: 0.4,
      }
    ],
  };

  // Subject Performance Data
  const subjectData = {
    labels: ['Mathematics', 'Science', 'English', 'History', 'Geography'],
    datasets: [
      {
        label: 'Average Score',
        data: [85, 78, 82, 75, 80],
        backgroundColor: [
          'hsl(217, 91%, 60%)',
          'hsl(142, 71%, 45%)',
          'hsl(25, 95%, 53%)',
          'hsl(0, 84%, 60%)',
          'hsl(271, 81%, 56%)'
        ],
        borderWidth: 2,
        borderColor: 'hsl(var(--background))',
      },
    ],
  };

  // Bias Detection Data
  const biasData = {
    labels: ['No Bias Detected', 'Low Risk', 'Medium Risk', 'High Risk'],
    datasets: [
      {
        data: [78, 15, 5, 2],
        backgroundColor: [
          'hsl(142, 71%, 45%)',
          'hsl(25, 95%, 53%)',
          'hsl(0, 84%, 60%)',
          'hsl(0, 84%, 40%)'
        ],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Performance insights, trends, and bias detection reports
        </p>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">248</p>
                <p className="text-sm text-muted-foreground">Total Students</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">79.5%</p>
                <p className="text-sm text-muted-foreground">Average Score</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">89.2%</p>
                <p className="text-sm text-muted-foreground">AI Accuracy</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-error/10 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-error" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">7%</p>
                <p className="text-sm text-muted-foreground">Bias Alerts</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Performance Trends
              </CardTitle>
              <CardDescription>
                Class average scores and AI confidence over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <Line data={performanceData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Subject Performance
              </CardTitle>
              <CardDescription>
                Average scores across different subjects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <Bar data={subjectData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                Bias Detection
              </CardTitle>
              <CardDescription>
                Distribution of bias risk levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <Doughnut data={biasData} options={doughnutOptions} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-success" />
                Key Insights
              </CardTitle>
              <CardDescription>
                AI-generated insights and recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 bg-success/5 border border-success/20 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-success mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-success">Strong Performance Trend</h4>
                    <p className="text-sm text-muted-foreground">Class average has improved by 18% over the last 6 weeks, showing consistent upward trajectory.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-warning/5 border border-warning/20 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-warning">Areas for Attention</h4>
                    <p className="text-sm text-muted-foreground">History and Geography subjects show lower average scores. Consider additional support resources.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <Target className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-primary">High AI Confidence</h4>
                    <p className="text-sm text-muted-foreground">94% average confidence in AI scoring suggests reliable automated grading for most assignments.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Fairness Report */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-primary" />
              Fairness & Bias Detection Report
            </CardTitle>
            <CardDescription>
              Comprehensive analysis of potential bias in AI scoring
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-success/5 border border-success/20 rounded-lg">
                <p className="text-2xl font-bold text-success">93%</p>
                <p className="text-sm text-muted-foreground">Bias-Free Scores</p>
                <Badge variant="outline" className="mt-2 border-success text-success">
                  Excellent
                </Badge>
              </div>

              <div className="text-center p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <p className="text-2xl font-bold text-primary">Equal</p>
                <p className="text-sm text-muted-foreground">Gender Parity</p>
                <Badge variant="outline" className="mt-2 border-primary text-primary">
                  Balanced
                </Badge>
              </div>

              <div className="text-center p-4 bg-success/5 border border-success/20 rounded-lg">
                <p className="text-2xl font-bold text-success">No</p>
                <p className="text-sm text-muted-foreground">Cultural Bias</p>
                <Badge variant="outline" className="mt-2 border-success text-success">
                  Clear
                </Badge>
              </div>

              <div className="text-center p-4 bg-warning/5 border border-warning/20 rounded-lg">
                <p className="text-2xl font-bold text-warning">2</p>
                <p className="text-sm text-muted-foreground">Manual Reviews</p>
                <Badge variant="outline" className="mt-2 border-warning text-warning">
                  Pending
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Analytics;