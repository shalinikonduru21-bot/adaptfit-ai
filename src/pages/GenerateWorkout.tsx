import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Clock, 
  MapPin, 
  Target, 
  Sparkles, 
  Play,
  ChevronRight,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AppLayout } from '@/components/layout/AppLayout';
import { useFitAdapt } from '@/context/FitAdaptContext';
import { generateWorkout } from '@/lib/workoutGenerator';
import { Workout } from '@/types/fitness';
import { cn } from '@/lib/utils';

type WorkoutFocus = 'upper' | 'lower' | 'full' | 'core' | 'cardio';
type WorkoutLocation = 'home' | 'gym' | 'outdoor';

export function GenerateWorkout() {
  const navigate = useNavigate();
  const { state } = useFitAdapt();
  const { user, history } = state;

  const [duration, setDuration] = useState<15 | 30 | 45 | 60>(user?.availableTime || 30);
  const [location, setLocation] = useState<WorkoutLocation>(user?.preferredLocations[0] || 'home');
  const [focus, setFocus] = useState<WorkoutFocus | undefined>(undefined);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedWorkout, setGeneratedWorkout] = useState<Workout | null>(null);

  const durations = [15, 30, 45, 60] as const;
  const locations: { value: WorkoutLocation; label: string; icon: string }[] = [
    { value: 'home', label: 'Home', icon: '🏠' },
    { value: 'gym', label: 'Gym', icon: '🏋️' },
    { value: 'outdoor', label: 'Outdoor', icon: '🌳' },
  ];
  const focuses: { value: WorkoutFocus; label: string; icon: string }[] = [
    { value: 'full', label: 'Full Body', icon: '💪' },
    { value: 'upper', label: 'Upper Body', icon: '🎯' },
    { value: 'lower', label: 'Lower Body', icon: '🦵' },
    { value: 'core', label: 'Core', icon: '🔥' },
    { value: 'cardio', label: 'Cardio', icon: '❤️' },
  ];

  const handleGenerate = () => {
    if (!user) return;
    setIsGenerating(true);

    setTimeout(() => {
      const workout = generateWorkout(user, history, {
        duration,
        location,
        focus,
      });
      setGeneratedWorkout(workout);
      setIsGenerating(false);
    }, 1200);
  };

  return (
    <AppLayout>
      <div className="p-4 pb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold mb-2">Generate Workout</h1>
          <p className="text-muted-foreground">Customize your perfect session</p>
        </motion.div>

        {!generatedWorkout ? (
          <>
            {/* Duration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-primary" />
                <h2 className="font-semibold">How much time do you have?</h2>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {durations.map(d => (
                  <button
                    key={d}
                    onClick={() => setDuration(d)}
                    className={cn(
                      'py-4 rounded-xl font-semibold transition-all duration-200',
                      duration === d
                        ? 'gradient-primary text-primary-foreground glow-primary'
                        : 'bg-secondary hover:bg-secondary/80'
                    )}
                  >
                    {d}m
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-primary" />
                <h2 className="font-semibold">Where are you working out?</h2>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {locations.map(loc => (
                  <button
                    key={loc.value}
                    onClick={() => setLocation(loc.value)}
                    className={cn(
                      'py-5 rounded-xl text-center transition-all duration-200 flex flex-col items-center gap-2',
                      location === loc.value
                        ? 'gradient-primary text-primary-foreground glow-primary'
                        : 'bg-secondary hover:bg-secondary/80'
                    )}
                  >
                    <span className="text-2xl">{loc.icon}</span>
                    <span className="text-sm font-medium">{loc.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Focus Area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-primary" />
                <h2 className="font-semibold">Any focus areas? (optional)</h2>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {focuses.map(f => (
                  <button
                    key={f.value}
                    onClick={() => setFocus(focus === f.value ? undefined : f.value)}
                    className={cn(
                      'py-4 rounded-xl text-center transition-all duration-200 flex flex-col items-center gap-1',
                      focus === f.value
                        ? 'gradient-accent text-accent-foreground glow-accent'
                        : 'bg-secondary hover:bg-secondary/80'
                    )}
                  >
                    <span className="text-xl">{f.icon}</span>
                    <span className="text-xs font-medium">{f.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Generate Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                variant="gradient"
                size="xl"
                className="w-full"
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-5 h-5 animate-pulse" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Workout
                  </>
                )}
              </Button>
            </motion.div>

            {isGenerating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 text-center"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full gradient-primary flex items-center justify-center animate-pulse">
                  <Sparkles className="w-10 h-10 text-primary-foreground" />
                </div>
                <p className="text-muted-foreground">
                  AI is crafting your personalized workout...
                </p>
              </motion.div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Generated Workout */}
            <div className="workout-card mb-6">
              <div className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-primary">YOUR CUSTOM WORKOUT</span>
                </div>

                <h2 className="text-2xl font-bold mb-2">{generatedWorkout.name}</h2>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {generatedWorkout.totalDuration} min
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Zap className="w-4 h-4" />
                    ~{generatedWorkout.caloriesBurned} cal
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3].map(i => (
                      <div
                        key={i}
                        className={cn(
                          "w-2 h-2 rounded-full",
                          i <= generatedWorkout.difficulty ? "gradient-accent" : "bg-muted"
                        )}
                      />
                    ))}
                  </div>
                </div>

                <div className="bg-secondary/50 rounded-xl p-4 mb-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {generatedWorkout.aiReasoning}
                  </p>
                </div>

                {/* Exercise List */}
                <div className="space-y-2 mb-4">
                  {generatedWorkout.exercises.map((exercise, index) => (
                    <div
                      key={exercise.id}
                      className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl"
                    >
                      <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{exercise.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {exercise.sets > 1 
                            ? `${exercise.sets} sets × ${exercise.reps} reps`
                            : `${exercise.duration}s`
                          }
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="secondary"
                size="lg"
                className="flex-1"
                onClick={() => setGeneratedWorkout(null)}
              >
                Regenerate
              </Button>
              <Button
                variant="gradient"
                size="lg"
                className="flex-1"
                onClick={() => navigate('/workout-session', { state: { workout: generatedWorkout } })}
              >
                <Play className="w-5 h-5" />
                Start Now
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
}
