import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Zap,
  Shield,
  TrendingUp,
  Users,
  Globe,
  CheckCircle,
  Award,
  Target,
  Heart
} from "lucide-react";
import heroImage from "@/assets/hero-education.jpg";

const About = () => {
  const features = [
    {
      icon: Zap,
      title: "Fast AI Processing",
      description: "Grade hundreds of papers in minutes with advanced OCR and AI analysis"
    },
    {
      icon: Shield,
      title: "Bias-Free Evaluation",
      description: "Sophisticated algorithms detect and prevent unfair grading practices"
    },
    {
      icon: TrendingUp,
      title: "Transparent Scoring",
      description: "Clear explanations for every grade with confidence levels"
    },
    {
      icon: Users,
      title: "Teacher Collaboration",
      description: "Human oversight with easy override and feedback capabilities"
    }
  ];

  const impacts = [
    {
      icon: Globe,
      title: "Global Education Access",
      description: "Making quality assessment available to underserved communities worldwide",
      stat: "50K+ students reached"
    },
    {
      icon: Target,
      title: "Reduced Teacher Workload",
      description: "Freeing educators to focus on teaching rather than repetitive grading",
      stat: "75% time savings"
    },
    {
      icon: Award,
      title: "Improved Learning Outcomes",
      description: "Faster feedback loops help students learn more effectively",
      stat: "23% grade improvement"
    },
    {
      icon: Heart,
      title: "Educational Equity",
      description: "Ensuring fair assessment regardless of background or location",
      stat: "Zero bias incidents"
    }
  ];

  const sdgGoals = [
    {
      number: 4,
      title: "Quality Education",
      description: "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all"
    },
    {
      number: 10,
      title: "Reduced Inequalities",
      description: "Reduce inequality within and among countries through fair assessment practices"
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl"
      >
        <div 
          className="relative h-[500px] bg-gradient-hero flex items-center justify-center"
          style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.8), rgba(37, 99, 235, 0.8)), url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center max-w-4xl px-6"
          >
            <h1 className="text-5xl font-bold text-primary-foreground mb-6">
              Why EduScan AI Matters
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
              Transforming education through AI-powered assessment that is fair, fast, and transparent.
              Empowering teachers and students with technology that serves humanity.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="outline" className="bg-white/10 border-white/20 text-white text-lg px-6 py-2">
                Fair Assessment
              </Badge>
              <Badge variant="outline" className="bg-white/10 border-white/20 text-white text-lg px-6 py-2">
                Instant Feedback
              </Badge>
              <Badge variant="outline" className="bg-white/10 border-white/20 text-white text-lg px-6 py-2">
                Bias-Free Technology
              </Badge>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Core Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-foreground mb-4">Core Features</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Built with cutting-edge AI technology to revolutionize educational assessment
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <Card className="h-full hover:shadow-medium transition-all duration-200">
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Impact Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-foreground mb-4">Real-World Impact</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Measuring our contribution to global education and equality
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {impacts.map((impact, index) => (
          <motion.div
            key={impact.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + index * 0.1 }}
          >
            <Card className="text-center h-full">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <impact.icon className="w-8 h-8 text-success" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{impact.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{impact.description}</p>
                <Badge variant="outline" className="bg-success/5 border-success text-success">
                  {impact.stat}
                </Badge>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* SDG Goals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="bg-gradient-card border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl mb-2">Supporting UN Sustainable Development Goals</CardTitle>
            <CardDescription className="text-base">
              Our commitment to global educational equity and sustainable development
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              {sdgGoals.map((goal, index) => (
                <motion.div
                  key={goal.number}
                  initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-primary-foreground">{goal.number}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">SDG {goal.number}: {goal.title}</h3>
                    <p className="text-muted-foreground">{goal.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Mission Statement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="text-center"
      >
        <Card className="bg-gradient-primary text-primary-foreground">
          <CardContent className="p-12">
            <GraduationCap className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl leading-relaxed max-w-4xl mx-auto">
              To democratize quality education assessment through ethical AI technology, 
              ensuring every student receives fair, fast, and transparent evaluation 
              regardless of their background, location, or circumstances.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Bias-Free AI</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Teacher Empowerment</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Student Success</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="text-center"
      >
        <Card>
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Transform Education?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of educators who are already using EduScan AI to create more 
              equitable and efficient assessment practices.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="gap-2">
                <Users className="w-5 h-5" />
                Get Started Today
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <Globe className="w-5 h-5" />
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default About;