// User Profile Types
export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';
export type FitnessGoal = 'lose_weight' | 'build_muscle' | 'improve_endurance' | 'general_fitness';
export type WorkoutLocation = 'home' | 'gym' | 'outdoor';
export type Equipment = 'none' | 'dumbbells' | 'barbell' | 'kettlebell' | 'resistance_bands' | 'pull_up_bar' | 'bench' | 'yoga_mat' | 'jump_rope' | 'treadmill' | 'stationary_bike';

export interface UserProfile {
  id: string;
  name: string;
  fitnessLevel: FitnessLevel;
  goal: FitnessGoal;
  availableTime: 15 | 30 | 45 | 60;
  preferredLocations: WorkoutLocation[];
  equipment: Equipment[];
  weeklyGoal: number;
  createdAt: Date;
  updatedAt: Date;
}

// Exercise Types
export type ExerciseCategory = 'strength' | 'cardio' | 'flexibility' | 'core' | 'warmup' | 'cooldown';
export type MuscleGroup = 'chest' | 'back' | 'shoulders' | 'biceps' | 'triceps' | 'forearms' | 'core' | 'quadriceps' | 'hamstrings' | 'glutes' | 'calves' | 'full_body';

export interface Exercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  muscleGroups: MuscleGroup[];
  equipment: Equipment[];
  difficulty: 1 | 2 | 3;
  duration: number; // seconds
  instructions: string[];
  tips: string[];
  imageUrl?: string;
  videoUrl?: string;
}

// Workout Types
export interface WorkoutExercise extends Exercise {
  sets: number;
  reps: number;
  restSeconds: number;
}

export interface Workout {
  id: string;
  name: string;
  description: string;
  exercises: WorkoutExercise[];
  totalDuration: number;
  difficulty: 1 | 2 | 3;
  category: ExerciseCategory;
  targetMuscleGroups: MuscleGroup[];
  caloriesBurned: number;
  aiReasoning: string;
  createdAt: Date;
  isFavorite: boolean;
}

// Workout History Types
export type DifficultyFeedback = 'too_easy' | 'just_right' | 'too_hard';

export interface CompletedWorkout {
  id: string;
  workoutId: string;
  workoutName: string;
  completedAt: Date;
  duration: number;
  exercisesCompleted: number;
  totalExercises: number;
  rating: 1 | 2 | 3 | 4 | 5;
  difficultyFeedback: DifficultyFeedback;
  notes?: string;
  caloriesBurned: number;
}

export interface WorkoutHistory {
  completedWorkouts: CompletedWorkout[];
  currentStreak: number;
  longestStreak: number;
  totalWorkouts: number;
  totalMinutes: number;
  totalCalories: number;
  weeklyWorkouts: number;
  lastWorkoutDate?: Date;
  muscleGroupsTrainedThisWeek: MuscleGroup[];
}

// Workout Session Types
export type SessionPhase = 'countdown' | 'exercise' | 'rest' | 'complete';

export interface WorkoutSession {
  workout: Workout;
  currentExerciseIndex: number;
  currentSet: number;
  phase: SessionPhase;
  timeRemaining: number;
  elapsedTime: number;
  isPaused: boolean;
  startedAt: Date;
}

// Scheduled Workout Types
export interface ScheduledWorkout {
  id: string;
  workoutId: string;
  workoutName: string;
  scheduledDate: Date;
  scheduledTime?: string;
  reminder: boolean;
  isCompleted: boolean;
}

// Achievement Types
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  isUnlocked: boolean;
}

// App State
export interface FitAdaptState {
  user: UserProfile | null;
  isOnboarded: boolean;
  history: WorkoutHistory;
  scheduledWorkouts: ScheduledWorkout[];
  favoriteWorkouts: string[];
  achievements: Achievement[];
  theme: 'light' | 'dark' | 'system';
}
