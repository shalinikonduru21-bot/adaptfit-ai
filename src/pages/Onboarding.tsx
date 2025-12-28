import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft,
  Dumbbell, 
  Target, 
  Clock, 
  MapPin, 
  Wrench,
  Flame
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFitAdapt } from '@/context/FitAdaptContext';
import { UserProfile, FitnessLevel, FitnessGoal, WorkoutLocation, Equipment } from '@/types/fitness';
import { cn } from '@/lib/utils';

const fitnessLevels: { value: FitnessLevel; label: string; description: string }[] = [
  { value: 'beginner', label: 'Beginner', description: 'New to fitness or returning after a break' },
  { value: 'intermediate', label: 'Intermediate', description: 'Work out 2-3 times per week' },
  { value: 'advanced', label: 'Advanced', description: 'Consistent training 4+ times per week' },
];

const fitnessGoals: { value: FitnessGoal; label: string; icon: string }[] = [
  { value: 'lose_weight', label: 'Lose Weight', icon: '🔥' },
  { value: 'build_muscle', label: 'Build Muscle', icon: '💪' },
  { value: 'improve_endurance', label: 'Improve Endurance', icon: '🏃' },
  { value: 'general_fitness', label: 'General Fitness', icon: '⭐' },
];

const workoutDurations = [15, 30, 45, 60] as const;

const locations: { value: WorkoutLocation; label: string; icon: string }[] = [
  { value: 'home', label: 'Home', icon: '🏠' },
  { value: 'gym', label: 'Gym', icon: '🏋️' },
  { value: 'outdoor', label: 'Outdoor', icon: '🌳' },
];

const equipmentOptions: { value: Equipment; label: string }[] = [
  { value: 'none', label: 'No Equipment' },
  { value: 'dumbbells', label: 'Dumbbells' },
  { value: 'barbell', label: 'Barbell' },
  { value: 'kettlebell', label: 'Kettlebell' },
  { value: 'resistance_bands', label: 'Resistance Bands' },
  { value: 'pull_up_bar', label: 'Pull-up Bar' },
  { value: 'bench', label: 'Bench' },
  { value: 'yoga_mat', label: 'Yoga Mat' },
  { value: 'jump_rope', label: 'Jump Rope' },
];

export function Onboarding() {
  const navigate = useNavigate();
  const { setUser, completeOnboarding } = useFitAdapt();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    fitnessLevel: 'intermediate' as FitnessLevel,
    goal: 'general_fitness' as FitnessGoal,
    availableTime: 30 as 15 | 30 | 45 | 60,
    preferredLocations: ['home'] as WorkoutLocation[],
    equipment: ['none', 'yoga_mat'] as Equipment[],
    weeklyGoal: 3,
  });

  const steps = [
    { title: 'Welcome', icon: Flame },
    { title: 'Your Level', icon: Dumbbell },
    { title: 'Your Goal', icon: Target },
    { title: 'Time & Place', icon: Clock },
    { title: 'Equipment', icon: Wrench },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      // Complete onboarding
      const user: UserProfile = {
        id: `user-${Date.now()}`,
        name: formData.name || 'Athlete',
        fitnessLevel: formData.fitnessLevel,
        goal: formData.goal,
        availableTime: formData.availableTime,
        preferredLocations: formData.preferredLocations,
        equipment: formData.equipment,
        weeklyGoal: formData.weeklyGoal,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setUser(user);
      completeOnboarding();
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const toggleEquipment = (eq: Equipment) => {
    setFormData(prev => ({
      ...prev,
      equipment: prev.equipment.includes(eq)
        ? prev.equipment.filter(e => e !== eq)
        : [...prev.equipment, eq],
    }));
  };

  const toggleLocation = (loc: WorkoutLocation) => {
    setFormData(prev => ({
      ...prev,
      preferredLocations: prev.preferredLocations.includes(loc)
        ? prev.preferredLocations.filter(l => l !== loc)
        : [...prev.preferredLocations, loc],
    }));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress bar */}
      <div className="p-4">
        <div className="flex gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={cn(
                'h-1 flex-1 rounded-full transition-all duration-300',
                i <= step ? 'gradient-primary' : 'bg-muted'
              )}
            />
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-2 text-center">
          Step {step + 1} of {steps.length}
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col"
          >
            {step === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 rounded-3xl gradient-primary flex items-center justify-center mb-8 glow-primary">
                  <Flame className="w-12 h-12 text-primary-foreground" />
                </div>
                <h1 className="text-4xl font-bold mb-4">
                  Welcome to <span className="text-gradient-primary">FitAdapt</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-8 max-w-md">
                  AI-powered workouts that adapt to your life. No more static plans that don't fit your schedule.
                </p>
                <div className="w-full max-w-sm">
                  <input
                    type="text"
                    placeholder="What's your name? (optional)"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-14 px-6 rounded-2xl bg-secondary border-0 text-center text-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="flex-1 flex flex-col">
                <h2 className="text-3xl font-bold mb-2">Your Fitness Level</h2>
                <p className="text-muted-foreground mb-8">
                  We'll match workouts to where you are now
                </p>
                <div className="space-y-4 flex-1">
                  {fitnessLevels.map(level => (
                    <button
                      key={level.value}
                      onClick={() => setFormData({ ...formData, fitnessLevel: level.value })}
                      className={cn(
                        'w-full p-5 rounded-2xl text-left transition-all duration-200',
                        formData.fitnessLevel === level.value
                          ? 'gradient-primary text-primary-foreground glow-primary'
                          : 'bg-secondary hover:bg-secondary/80'
                      )}
                    >
                      <div className="font-semibold text-lg">{level.label}</div>
                      <div className={cn(
                        'text-sm mt-1',
                        formData.fitnessLevel === level.value 
                          ? 'text-primary-foreground/80' 
                          : 'text-muted-foreground'
                      )}>
                        {level.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex-1 flex flex-col">
                <h2 className="text-3xl font-bold mb-2">What's Your Goal?</h2>
                <p className="text-muted-foreground mb-8">
                  We'll prioritize exercises that help you get there
                </p>
                <div className="grid grid-cols-2 gap-4 flex-1">
                  {fitnessGoals.map(goal => (
                    <button
                      key={goal.value}
                      onClick={() => setFormData({ ...formData, goal: goal.value })}
                      className={cn(
                        'p-6 rounded-2xl text-center transition-all duration-200 flex flex-col items-center justify-center',
                        formData.goal === goal.value
                          ? 'gradient-primary text-primary-foreground glow-primary'
                          : 'bg-secondary hover:bg-secondary/80'
                      )}
                    >
                      <span className="text-4xl mb-3">{goal.icon}</span>
                      <span className="font-semibold">{goal.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="flex-1 flex flex-col">
                <h2 className="text-3xl font-bold mb-2">Time & Location</h2>
                <p className="text-muted-foreground mb-8">
                  How long do you have and where will you train?
                </p>
                
                <div className="mb-8">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Typical workout duration
                  </h3>
                  <div className="grid grid-cols-4 gap-3">
                    {workoutDurations.map(duration => (
                      <button
                        key={duration}
                        onClick={() => setFormData({ ...formData, availableTime: duration })}
                        className={cn(
                          'py-4 rounded-xl font-semibold transition-all duration-200',
                          formData.availableTime === duration
                            ? 'gradient-primary text-primary-foreground'
                            : 'bg-secondary hover:bg-secondary/80'
                        )}
                      >
                        {duration}m
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Where do you work out?
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {locations.map(loc => (
                      <button
                        key={loc.value}
                        onClick={() => toggleLocation(loc.value)}
                        className={cn(
                          'py-5 rounded-xl text-center transition-all duration-200 flex flex-col items-center gap-2',
                          formData.preferredLocations.includes(loc.value)
                            ? 'gradient-primary text-primary-foreground'
                            : 'bg-secondary hover:bg-secondary/80'
                        )}
                      >
                        <span className="text-2xl">{loc.icon}</span>
                        <span className="text-sm font-medium">{loc.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Weekly workout goal</h3>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => setFormData({ 
                        ...formData, 
                        weeklyGoal: Math.max(1, formData.weeklyGoal - 1) 
                      })}
                    >
                      -
                    </Button>
                    <div className="flex-1 text-center">
                      <span className="text-4xl font-bold text-primary">
                        {formData.weeklyGoal}
                      </span>
                      <span className="text-muted-foreground ml-2">
                        workouts/week
                      </span>
                    </div>
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => setFormData({ 
                        ...formData, 
                        weeklyGoal: Math.min(7, formData.weeklyGoal + 1) 
                      })}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="flex-1 flex flex-col">
                <h2 className="text-3xl font-bold mb-2">Your Equipment</h2>
                <p className="text-muted-foreground mb-8">
                  Select all equipment you have access to
                </p>
                <div className="grid grid-cols-2 gap-3 flex-1">
                  {equipmentOptions.map(eq => (
                    <button
                      key={eq.value}
                      onClick={() => toggleEquipment(eq.value)}
                      className={cn(
                        'p-4 rounded-xl text-center transition-all duration-200 font-medium',
                        formData.equipment.includes(eq.value)
                          ? 'gradient-primary text-primary-foreground'
                          : 'bg-secondary hover:bg-secondary/80'
                      )}
                    >
                      {eq.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="p-6 flex gap-4">
        {step > 0 && (
          <Button
            variant="secondary"
            size="lg"
            onClick={handleBack}
            className="flex-1"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </Button>
        )}
        <Button
          variant="gradient"
          size="lg"
          onClick={handleNext}
          className="flex-1"
        >
          {step === steps.length - 1 ? 'Get Started' : 'Continue'}
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
