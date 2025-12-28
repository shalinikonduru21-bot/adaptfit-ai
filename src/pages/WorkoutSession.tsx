import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Pause, 
  Play, 
  SkipForward, 
  Check,
  Trophy,
  Star,
  Flame
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFitAdapt } from '@/context/FitAdaptContext';
import { Workout, WorkoutExercise, SessionPhase, DifficultyFeedback, CompletedWorkout } from '@/types/fitness';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

export function WorkoutSession() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addCompletedWorkout, unlockAchievement, state } = useFitAdapt();
  
  const workout = location.state?.workout as Workout | undefined;
  
  const [phase, setPhase] = useState<SessionPhase>('countdown');
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(5);
  const [totalElapsed, setTotalElapsed] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [rating, setRating] = useState(0);
  const [difficultyFeedback, setDifficultyFeedback] = useState<DifficultyFeedback | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentExercise = workout?.exercises[currentExerciseIndex];
  const totalExercises = workout?.exercises.length || 0;

  // Play beep sound
  const playBeep = useCallback(() => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      gainNode.gain.value = 0.3;
      
      oscillator.start();
      setTimeout(() => oscillator.stop(), 150);
    } catch (e) {
      console.log('Audio not supported');
    }
  }, []);

  // Text-to-speech
  const speak = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  }, []);

  // Timer logic
  useEffect(() => {
    if (!workout || isPaused || showComplete) return;

    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handlePhaseComplete();
          return 0;
        }
        if (prev === 4 && phase === 'countdown') {
          playBeep();
        }
        if (prev === 11 && phase === 'exercise') {
          playBeep();
        }
        return prev - 1;
      });
      
      if (phase !== 'countdown') {
        setTotalElapsed(prev => prev + 1);
      }
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [workout, isPaused, phase, currentExerciseIndex, currentSet, showComplete]);

  const handlePhaseComplete = () => {
    if (!currentExercise) return;

    if (phase === 'countdown') {
      setPhase('exercise');
      setTimeRemaining(currentExercise.duration);
      speak(currentExercise.name);
      playBeep();
    } else if (phase === 'exercise') {
      if (currentSet < currentExercise.sets) {
        setPhase('rest');
        setTimeRemaining(currentExercise.restSeconds);
        setCurrentSet(prev => prev + 1);
      } else {
        // Move to next exercise
        if (currentExerciseIndex < totalExercises - 1) {
          setPhase('rest');
          setTimeRemaining(currentExercise.restSeconds);
          setCurrentExerciseIndex(prev => prev + 1);
          setCurrentSet(1);
        } else {
          // Workout complete!
          handleWorkoutComplete();
        }
      }
    } else if (phase === 'rest') {
      setPhase('exercise');
      const nextExercise = workout?.exercises[currentExerciseIndex];
      if (nextExercise) {
        setTimeRemaining(nextExercise.duration);
        speak(nextExercise.name);
        playBeep();
      }
    }
  };

  const handleWorkoutComplete = () => {
    setShowComplete(true);
    setPhase('complete');
    
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Check achievements
    if (state.history.totalWorkouts === 0) {
      unlockAchievement('first-workout');
    }
    if (state.history.currentStreak + 1 >= 7) {
      unlockAchievement('7-day-streak');
    }
  };

  const handleSkipExercise = () => {
    if (currentExerciseIndex < totalExercises - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      setCurrentSet(1);
      setPhase('countdown');
      setTimeRemaining(5);
    } else {
      handleWorkoutComplete();
    }
  };

  const handleSkipRest = () => {
    setPhase('exercise');
    if (currentExercise) {
      setTimeRemaining(currentExercise.duration);
      speak(currentExercise.name);
    }
  };

  const handleSaveWorkout = () => {
    if (!workout || !rating || !difficultyFeedback) return;

    const completedWorkout: CompletedWorkout = {
      id: `completed-${Date.now()}`,
      workoutId: workout.id,
      workoutName: workout.name,
      completedAt: new Date(),
      duration: totalElapsed,
      exercisesCompleted: currentExerciseIndex + 1,
      totalExercises,
      rating: rating as 1 | 2 | 3 | 4 | 5,
      difficultyFeedback,
      caloriesBurned: workout.caloriesBurned,
    };

    addCompletedWorkout(completedWorkout);
    navigate('/dashboard');
  };

  const handleExit = () => {
    if (confirm('Are you sure you want to exit? Your progress will be lost.')) {
      navigate('/dashboard');
    }
  };

  if (!workout) {
    navigate('/dashboard');
    return null;
  }

  const progress = ((currentExerciseIndex + (currentSet - 1) / (currentExercise?.sets || 1)) / totalExercises) * 100;

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <div className="p-4 flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={handleExit}>
          <X className="w-6 h-6" />
        </Button>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Exercise {currentExerciseIndex + 1} of {totalExercises}
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          {formatTime(totalElapsed)}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4">
        <div className="h-1 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full gradient-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <AnimatePresence mode="wait">
          {phase === 'countdown' && (
            <motion.div
              key="countdown"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center"
            >
              <p className="text-xl text-muted-foreground mb-4">Get Ready!</p>
              <motion.div
                key={timeRemaining}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-9xl font-bold text-gradient-primary"
              >
                {timeRemaining}
              </motion.div>
              <p className="mt-8 text-lg font-medium">
                Up next: {currentExercise?.name}
              </p>
            </motion.div>
          )}

          {phase === 'exercise' && currentExercise && (
            <motion.div
              key="exercise"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center w-full"
            >
              {/* Timer Circle */}
              <div className="relative w-48 h-48 mx-auto mb-6">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    fill="none"
                    stroke="hsl(var(--muted))"
                    strokeWidth="8"
                  />
                  <motion.circle
                    cx="96"
                    cy="96"
                    r="88"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 88}
                    initial={{ strokeDashoffset: 0 }}
                    animate={{ 
                      strokeDashoffset: 2 * Math.PI * 88 * (1 - timeRemaining / currentExercise.duration)
                    }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl font-bold">{timeRemaining}</span>
                </div>
              </div>

              <h2 className="text-3xl font-bold mb-2">{currentExercise.name}</h2>
              
              {currentExercise.sets > 1 && (
                <p className="text-lg text-primary mb-4">
                  Set {currentSet} of {currentExercise.sets}
                </p>
              )}

              {/* Instructions */}
              <div className="bg-secondary/50 rounded-2xl p-4 mb-6 text-left max-w-md mx-auto">
                {currentExercise.instructions.slice(0, 2).map((instruction, i) => (
                  <p key={i} className="text-sm text-muted-foreground mb-2">
                    {i + 1}. {instruction}
                  </p>
                ))}
              </div>

              {/* Next Exercise Preview */}
              {currentExerciseIndex < totalExercises - 1 && (
                <p className="text-sm text-muted-foreground">
                  Next: {workout.exercises[currentExerciseIndex + 1].name}
                </p>
              )}
            </motion.div>
          )}

          {phase === 'rest' && (
            <motion.div
              key="rest"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <p className="text-xl text-muted-foreground mb-4">Rest Time</p>
              
              {/* Breathing Circle */}
              <div className="w-32 h-32 mx-auto mb-6 rounded-full gradient-primary opacity-60 breathing-circle" />
              
              <p className="text-6xl font-bold mb-4">{timeRemaining}</p>
              
              <Button
                variant="accent"
                size="lg"
                onClick={handleSkipRest}
              >
                Skip Rest
              </Button>

              {/* Next Exercise */}
              <div className="mt-8">
                <p className="text-sm text-muted-foreground mb-2">Up Next</p>
                <p className="text-lg font-semibold">
                  {workout.exercises[currentExerciseIndex]?.name}
                </p>
              </div>
            </motion.div>
          )}

          {showComplete && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center w-full max-w-md"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full gradient-success flex items-center justify-center glow-success">
                <Trophy className="w-12 h-12 text-success-foreground" />
              </div>
              
              <h2 className="text-3xl font-bold mb-2">Workout Complete!</h2>
              <p className="text-muted-foreground mb-8">Great job crushing it today!</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="stat-card text-center">
                  <p className="text-2xl font-bold">{formatTime(totalElapsed)}</p>
                  <p className="text-xs text-muted-foreground">Duration</p>
                </div>
                <div className="stat-card text-center">
                  <p className="text-2xl font-bold">{totalExercises}</p>
                  <p className="text-xs text-muted-foreground">Exercises</p>
                </div>
                <div className="stat-card text-center">
                  <p className="text-2xl font-bold">~{workout.caloriesBurned}</p>
                  <p className="text-xs text-muted-foreground">Calories</p>
                </div>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-3">How was this workout?</p>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={cn(
                        "w-12 h-12 rounded-xl transition-all",
                        rating >= star 
                          ? "bg-yellow-500 text-white" 
                          : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                      )}
                    >
                      <Star className={cn("w-6 h-6 mx-auto", rating >= star && "fill-current")} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty Feedback */}
              <div className="mb-8">
                <p className="text-sm text-muted-foreground mb-3">Difficulty level:</p>
                <div className="flex gap-3 justify-center">
                  {[
                    { value: 'too_easy', label: 'Too Easy', emoji: '😌' },
                    { value: 'just_right', label: 'Just Right', emoji: '😊' },
                    { value: 'too_hard', label: 'Too Hard', emoji: '😰' },
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => setDifficultyFeedback(option.value as DifficultyFeedback)}
                      className={cn(
                        "px-4 py-3 rounded-xl transition-all flex flex-col items-center gap-1",
                        difficultyFeedback === option.value
                          ? "gradient-primary text-primary-foreground"
                          : "bg-secondary hover:bg-secondary/80"
                      )}
                    >
                      <span className="text-xl">{option.emoji}</span>
                      <span className="text-xs">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <Button
                variant="gradient"
                size="xl"
                className="w-full"
                onClick={handleSaveWorkout}
                disabled={!rating || !difficultyFeedback}
              >
                <Check className="w-5 h-5" />
                Save & Continue
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Controls */}
      {!showComplete && (
        <div className="p-6 flex gap-4">
          <Button
            variant="secondary"
            size="lg"
            className="flex-1"
            onClick={() => setIsPaused(!isPaused)}
          >
            {isPaused ? (
              <>
                <Play className="w-5 h-5" />
                Resume
              </>
            ) : (
              <>
                <Pause className="w-5 h-5" />
                Pause
              </>
            )}
          </Button>
          <Button
            variant="glass"
            size="lg"
            onClick={handleSkipExercise}
          >
            <SkipForward className="w-5 h-5" />
            Skip
          </Button>
        </div>
      )}
    </div>
  );
}
