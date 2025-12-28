import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Flame, 
  Play, 
  RefreshCw, 
  Clock, 
  Zap, 
  TrendingUp,
  Calendar,
  Sparkles,
  ChevronRight,
  Dumbbell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AppLayout } from '@/components/layout/AppLayout';
import { useFitAdapt } from '@/context/FitAdaptContext';
import { generateQuickWorkout } from '@/lib/workoutGenerator';
import { Workout } from '@/types/fitness';
import { cn } from '@/lib/utils';

export function Dashboard() {
  const navigate = useNavigate();
  const { state } = useFitAdapt();
  const { user, history } = state;
  const [todaysWorkout, setTodaysWorkout] = useState<Workout | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (user && !todaysWorkout) {
      generateNewWorkout();
    }
  }, [user]);

  const generateNewWorkout = () => {
    if (!user) return;
    setIsGenerating(true);
    
    // Simulate AI thinking
    setTimeout(() => {
      const workout = generateQuickWorkout(user, history);
      setTodaysWorkout(workout);
      setIsGenerating(false);
    }, 800);
  };

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const motivationalMessages = [
    "Ready to crush it today?",
    "Every workout counts!",
    "Your body will thank you!",
    "Let's make today count!",
    "Progress, not perfection!",
  ];

  const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];

  const weeklyProgress = Math.min((history.weeklyWorkouts / (user?.weeklyGoal || 3)) * 100, 100);

  return (
    <AppLayout>
      <div className="p-4 pb-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold">
            {greeting()}, <span className="text-gradient-primary">{user?.name || 'Athlete'}</span>
          </h1>
          <p className="text-muted-foreground">{randomMessage}</p>
        </motion.div>

        {/* Streak & Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-3 mb-6"
        >
          {/* Streak Card */}
          <div className="stat-card">
            <div className="flex items-center gap-2 mb-2">
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center",
                history.currentStreak > 0 ? "gradient-accent" : "bg-muted"
              )}>
                <Flame className={cn(
                  "w-4 h-4",
                  history.currentStreak > 0 ? "text-accent-foreground streak-flame" : "text-muted-foreground"
                )} />
              </div>
              <span className="text-sm text-muted-foreground">Streak</span>
            </div>
            <div className="text-3xl font-bold">
              {history.currentStreak}
              <span className="text-lg text-muted-foreground ml-1">days</span>
            </div>
          </div>

          {/* Weekly Progress */}
          <div className="stat-card">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-sm text-muted-foreground">This Week</span>
            </div>
            <div className="text-3xl font-bold">
              {history.weeklyWorkouts}
              <span className="text-lg text-muted-foreground ml-1">/ {user?.weeklyGoal || 3}</span>
            </div>
            <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${weeklyProgress}%` }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="h-full gradient-primary rounded-full"
              />
            </div>
          </div>

          {/* Total Workouts */}
          <div className="stat-card">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-success/20 flex items-center justify-center">
                <Dumbbell className="w-4 h-4 text-success" />
              </div>
              <span className="text-sm text-muted-foreground">Total</span>
            </div>
            <div className="text-3xl font-bold">{history.totalWorkouts}</div>
          </div>

          {/* Active Minutes */}
          <div className="stat-card">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Minutes</span>
            </div>
            <div className="text-3xl font-bold">{history.totalMinutes}</div>
          </div>
        </motion.div>

        {/* Today's Workout Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="workout-card mb-6"
        >
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-primary">AI-GENERATED FOR YOU</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={generateNewWorkout}
                disabled={isGenerating}
                className="text-muted-foreground"
              >
                <RefreshCw className={cn("w-4 h-4", isGenerating && "animate-spin")} />
              </Button>
            </div>

            {isGenerating ? (
              <div className="py-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-primary flex items-center justify-center animate-pulse">
                  <Sparkles className="w-8 h-8 text-primary-foreground" />
                </div>
                <p className="text-muted-foreground">Generating your perfect workout...</p>
              </div>
            ) : todaysWorkout ? (
              <>
                <h2 className="text-2xl font-bold mb-2">{todaysWorkout.name}</h2>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {todaysWorkout.totalDuration} min
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Zap className="w-4 h-4" />
                    ~{todaysWorkout.caloriesBurned} cal
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3].map(i => (
                      <div
                        key={i}
                        className={cn(
                          "w-2 h-2 rounded-full",
                          i <= todaysWorkout.difficulty ? "gradient-accent" : "bg-muted"
                        )}
                      />
                    ))}
                  </div>
                </div>

                <div className="bg-secondary/50 rounded-xl p-4 mb-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {todaysWorkout.aiReasoning}
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="gradient"
                    size="lg"
                    className="flex-1"
                    onClick={() => navigate('/workout-session', { state: { workout: todaysWorkout } })}
                  >
                    <Play className="w-5 h-5" />
                    Start Workout
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => navigate('/generate')}
                  >
                    Customize
                  </Button>
                </div>
              </>
            ) : null}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 gap-3 mb-6"
        >
          <Button
            variant="glass"
            size="lg"
            className="h-auto py-4 flex-col items-start"
            onClick={() => navigate('/generate')}
          >
            <Sparkles className="w-6 h-6 text-primary mb-2" />
            <span className="font-semibold">Generate</span>
            <span className="text-xs text-muted-foreground">Custom workout</span>
          </Button>
          <Button
            variant="glass"
            size="lg"
            className="h-auto py-4 flex-col items-start"
            onClick={() => navigate('/library')}
          >
            <Dumbbell className="w-6 h-6 text-accent mb-2" />
            <span className="font-semibold">Browse</span>
            <span className="text-xs text-muted-foreground">Workout library</span>
          </Button>
          <Button
            variant="glass"
            size="lg"
            className="h-auto py-4 flex-col items-start"
            onClick={() => navigate('/schedule')}
          >
            <Calendar className="w-6 h-6 text-success mb-2" />
            <span className="font-semibold">Schedule</span>
            <span className="text-xs text-muted-foreground">Plan your week</span>
          </Button>
          <Button
            variant="glass"
            size="lg"
            className="h-auto py-4 flex-col items-start"
            onClick={() => navigate('/progress')}
          >
            <TrendingUp className="w-6 h-6 text-primary mb-2" />
            <span className="font-semibold">Progress</span>
            <span className="text-xs text-muted-foreground">View stats</span>
          </Button>
        </motion.div>

        {/* Recent Workouts */}
        {history.completedWorkouts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Recent Workouts</h3>
              <Button variant="ghost" size="sm" onClick={() => navigate('/progress')}>
                See all
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-3">
              {history.completedWorkouts.slice(0, 3).map(workout => (
                <div
                  key={workout.id}
                  className="glass-card rounded-xl p-4 flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-medium">{workout.workoutName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {new Date(workout.completedAt).toLocaleDateString()} • {Math.round(workout.duration / 60)} min
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(i => (
                      <span key={i} className={i <= workout.rating ? 'text-yellow-500' : 'text-muted'}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
}
