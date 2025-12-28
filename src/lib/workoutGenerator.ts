import { exercises } from '@/data/exercises';
import { 
  UserProfile, 
  Workout, 
  WorkoutExercise, 
  Exercise,
  WorkoutHistory,
  MuscleGroup,
  ExerciseCategory
} from '@/types/fitness';

interface GenerationOptions {
  duration: 15 | 30 | 45 | 60;
  location: 'home' | 'gym' | 'outdoor';
  focus?: 'upper' | 'lower' | 'full' | 'core' | 'cardio';
}

interface AdaptationFactors {
  recentDifficultyFeedback: ('too_easy' | 'just_right' | 'too_hard')[];
  missedWorkouts: number;
  currentStreak: number;
  recentMuscleGroups: MuscleGroup[];
}

// Workout name generators
const workoutNames = {
  upper: ['Power Push', 'Upper Burn', 'Arm Assault', 'Shoulder Shred', 'Chest & Back Attack'],
  lower: ['Leg Day Legend', 'Glute Grind', 'Quad Crusher', 'Lower Power', 'Leg Blaster'],
  full: ['Total Body Torch', 'Full Force', 'Complete Circuit', 'Body Blitz', 'Ultimate Fusion'],
  core: ['Core Crusher', 'Ab Assault', 'Core Fire', 'Center Strength', 'Six Pack Circuit'],
  cardio: ['Cardio Blast', 'Heart Racer', 'Sweat Session', 'Endurance Engine', 'HIIT It Hard'],
};

function getRandomWorkoutName(focus: string): string {
  const names = workoutNames[focus as keyof typeof workoutNames] || workoutNames.full;
  return names[Math.floor(Math.random() * names.length)];
}

// Map difficulty level to sets/reps
function getSetRepScheme(difficulty: 1 | 2 | 3, fitnessLevel: string, category: ExerciseCategory) {
  const baseSchemes = {
    beginner: { sets: 2, reps: 10, rest: 60 },
    intermediate: { sets: 3, reps: 12, rest: 45 },
    advanced: { sets: 4, reps: 15, rest: 30 },
  };

  const scheme = baseSchemes[fitnessLevel as keyof typeof baseSchemes] || baseSchemes.intermediate;
  
  // Adjust for cardio/flexibility
  if (category === 'cardio' || category === 'warmup' || category === 'cooldown') {
    return { sets: 1, reps: 1, rest: 15 };
  }
  
  if (category === 'flexibility') {
    return { sets: 1, reps: 1, rest: 10 };
  }

  // Adjust based on exercise difficulty
  if (difficulty === 3) {
    return { ...scheme, reps: Math.max(scheme.reps - 4, 6) };
  }
  if (difficulty === 1) {
    return { ...scheme, reps: scheme.reps + 2 };
  }

  return scheme;
}

// Calculate estimated calories
function estimateCalories(exercises: WorkoutExercise[], fitnessLevel: string): number {
  const baseMultiplier = {
    beginner: 5,
    intermediate: 6,
    advanced: 7,
  };

  const multiplier = baseMultiplier[fitnessLevel as keyof typeof baseMultiplier] || 6;
  const totalMinutes = exercises.reduce((acc, e) => acc + (e.duration * e.sets) / 60, 0);
  
  return Math.round(totalMinutes * multiplier);
}

// Filter exercises based on available equipment
function filterByEquipment(exerciseList: Exercise[], equipment: string[]): Exercise[] {
  return exerciseList.filter(e => 
    e.equipment.some(eq => equipment.includes(eq) || eq === 'none')
  );
}

// Filter by difficulty with tolerance
function filterByDifficulty(exerciseList: Exercise[], level: string): Exercise[] {
  const difficultyMap = { beginner: 1, intermediate: 2, advanced: 3 };
  const userLevel = difficultyMap[level as keyof typeof difficultyMap] || 2;
  
  return exerciseList.filter(e => 
    Math.abs(e.difficulty - userLevel) <= 1
  );
}

// Get exercises for specific muscle groups
function getExercisesForMuscleGroups(
  exerciseList: Exercise[], 
  muscleGroups: MuscleGroup[]
): Exercise[] {
  return exerciseList.filter(e =>
    e.muscleGroups.some(mg => muscleGroups.includes(mg))
  );
}

// Avoid recently trained muscle groups
function avoidRecentMuscles(
  exerciseList: Exercise[], 
  recentMuscles: MuscleGroup[]
): Exercise[] {
  if (recentMuscles.length === 0) return exerciseList;
  
  // Prefer exercises that don't hit recent muscles, but keep some variety
  const fresh = exerciseList.filter(e =>
    !e.muscleGroups.some(mg => recentMuscles.includes(mg))
  );
  
  return fresh.length >= 5 ? fresh : exerciseList;
}

// Apply adaptation logic
function applyAdaptations(
  scheme: { sets: number; reps: number; rest: number },
  factors: AdaptationFactors
): { sets: number; reps: number; rest: number; adaptationNotes: string[] } {
  const notes: string[] = [];
  let { sets, reps, rest } = scheme;

  // Check recent difficulty feedback
  const recentHard = factors.recentDifficultyFeedback.filter(f => f === 'too_hard').length;
  const recentEasy = factors.recentDifficultyFeedback.filter(f => f === 'too_easy').length;

  if (recentHard >= 2) {
    sets = Math.max(sets - 1, 2);
    reps = Math.max(reps - 2, 6);
    rest += 15;
    notes.push('Reduced intensity based on your recent feedback');
  } else if (recentEasy >= 2) {
    sets = Math.min(sets + 1, 5);
    reps += 2;
    rest = Math.max(rest - 10, 20);
    notes.push('Increased challenge since you\'ve been crushing it!');
  }

  // Comeback workout after missed sessions
  if (factors.missedWorkouts >= 2) {
    sets = Math.max(sets - 1, 2);
    reps = Math.max(reps - 3, 6);
    rest += 20;
    notes.push('Gentle comeback workout - welcome back!');
  }

  // High streak - suggest recovery focus
  if (factors.currentStreak >= 7) {
    notes.push('Great streak! Consider taking a rest day soon');
  }

  return { sets, reps, rest, adaptationNotes: notes };
}

// Generate AI reasoning
function generateReasoning(
  user: UserProfile,
  options: GenerationOptions,
  adaptationNotes: string[],
  targetMuscles: MuscleGroup[]
): string {
  const parts: string[] = [];

  // Duration reasoning
  parts.push(`This ${options.duration}-minute ${options.focus || 'mixed'} workout is designed for your ${user.fitnessLevel} fitness level.`);

  // Location/equipment
  if (options.location === 'home') {
    parts.push('Selected exercises that work great at home with your available equipment.');
  } else if (options.location === 'gym') {
    parts.push('Taking advantage of gym equipment for maximum effectiveness.');
  } else {
    parts.push('Outdoor-friendly moves to enjoy your workout in the fresh air.');
  }

  // Goal alignment
  const goalText = {
    lose_weight: 'Higher intensity exercises to maximize calorie burn',
    build_muscle: 'Strength-focused movements for muscle building',
    improve_endurance: 'Cardio and endurance exercises for stamina',
    general_fitness: 'Balanced mix for overall fitness improvement',
  };
  parts.push(goalText[user.goal] + '.');

  // Muscle focus
  if (targetMuscles.length > 0) {
    const muscleNames = targetMuscles.slice(0, 3).join(', ');
    parts.push(`Today's focus: ${muscleNames}.`);
  }

  // Adaptation notes
  if (adaptationNotes.length > 0) {
    parts.push(adaptationNotes[0]);
  }

  return parts.join(' ');
}

// Main generation function
export function generateWorkout(
  user: UserProfile,
  history: WorkoutHistory,
  options: GenerationOptions
): Workout {
  const { duration, location, focus } = options;

  // Determine equipment based on location
  let availableEquipment = [...user.equipment];
  if (location === 'outdoor') {
    availableEquipment = ['none'];
  }

  // Get adaptation factors from history
  const recentWorkouts = history.completedWorkouts.slice(0, 5);
  const adaptationFactors: AdaptationFactors = {
    recentDifficultyFeedback: recentWorkouts.map(w => w.difficultyFeedback),
    missedWorkouts: calculateMissedWorkouts(history),
    currentStreak: history.currentStreak,
    recentMuscleGroups: history.muscleGroupsTrainedThisWeek,
  };

  // Start with all exercises
  let availableExercises = [...exercises];

  // Filter by equipment
  availableExercises = filterByEquipment(availableExercises, availableEquipment);

  // Filter by difficulty
  availableExercises = filterByDifficulty(availableExercises, user.fitnessLevel);

  // Determine target muscle groups based on focus
  let targetMuscles: MuscleGroup[] = [];
  if (focus === 'upper') {
    targetMuscles = ['chest', 'back', 'shoulders', 'biceps', 'triceps'];
  } else if (focus === 'lower') {
    targetMuscles = ['quadriceps', 'hamstrings', 'glutes', 'calves'];
  } else if (focus === 'core') {
    targetMuscles = ['core'];
  } else if (focus === 'cardio') {
    // Filter for cardio exercises
    availableExercises = availableExercises.filter(e => e.category === 'cardio');
  }

  // Apply muscle group focus
  if (targetMuscles.length > 0) {
    const focused = getExercisesForMuscleGroups(availableExercises, targetMuscles);
    if (focused.length >= 4) {
      availableExercises = focused;
    }
  }

  // Avoid recently trained muscles
  availableExercises = avoidRecentMuscles(availableExercises, adaptationFactors.recentMuscleGroups);

  // Calculate number of exercises based on duration
  const exerciseCount = Math.max(4, Math.floor(duration / 6));

  // Select exercises with variety
  const selectedExercises: Exercise[] = [];
  
  // Always include warmup
  const warmups = availableExercises.filter(e => e.category === 'warmup');
  if (warmups.length > 0) {
    selectedExercises.push(warmups[Math.floor(Math.random() * warmups.length)]);
  }

  // Main exercises
  const mainPool = availableExercises.filter(e => 
    e.category !== 'warmup' && e.category !== 'cooldown'
  );
  
  // Shuffle and select
  const shuffled = [...mainPool].sort(() => Math.random() - 0.5);
  for (const exercise of shuffled) {
    if (selectedExercises.length >= exerciseCount - 1) break;
    if (!selectedExercises.find(e => e.id === exercise.id)) {
      selectedExercises.push(exercise);
    }
  }

  // Add cooldown
  const cooldowns = availableExercises.filter(e => e.category === 'cooldown');
  if (cooldowns.length > 0) {
    selectedExercises.push(cooldowns[Math.floor(Math.random() * cooldowns.length)]);
  }

  // Convert to workout exercises with sets/reps
  const allAdaptationNotes: string[] = [];
  const workoutExercises: WorkoutExercise[] = selectedExercises.map(exercise => {
    const baseScheme = getSetRepScheme(exercise.difficulty, user.fitnessLevel, exercise.category);
    const { sets, reps, rest, adaptationNotes } = applyAdaptations(baseScheme, adaptationFactors);
    allAdaptationNotes.push(...adaptationNotes);
    
    return {
      ...exercise,
      sets,
      reps,
      restSeconds: rest,
    };
  });

  // Calculate totals
  const totalDuration = workoutExercises.reduce((acc, e) => 
    acc + (e.duration * e.sets) + (e.restSeconds * (e.sets - 1)), 0
  );

  const workoutMuscles = [...new Set(
    workoutExercises.flatMap(e => e.muscleGroups)
  )];

  const avgDifficulty = Math.round(
    workoutExercises.reduce((acc, e) => acc + e.difficulty, 0) / workoutExercises.length
  ) as 1 | 2 | 3;

  const reasoning = generateReasoning(
    user, 
    options, 
    [...new Set(allAdaptationNotes)],
    workoutMuscles
  );

  return {
    id: `workout-${Date.now()}`,
    name: getRandomWorkoutName(focus || 'full'),
    description: `A ${duration}-minute ${focus || 'full body'} workout`,
    exercises: workoutExercises,
    totalDuration: Math.round(totalDuration / 60), // Convert to minutes
    difficulty: avgDifficulty,
    category: focus === 'cardio' ? 'cardio' : 'strength',
    targetMuscleGroups: workoutMuscles,
    caloriesBurned: estimateCalories(workoutExercises, user.fitnessLevel),
    aiReasoning: reasoning,
    createdAt: new Date(),
    isFavorite: false,
  };
}

// Helper to calculate missed workouts
function calculateMissedWorkouts(history: WorkoutHistory): number {
  if (!history.lastWorkoutDate) return 0;
  
  const daysSinceLastWorkout = Math.floor(
    (Date.now() - new Date(history.lastWorkoutDate).getTime()) / (1000 * 60 * 60 * 24)
  );
  
  return Math.max(0, daysSinceLastWorkout - 1);
}

// Quick workout generation with defaults
export function generateQuickWorkout(
  user: UserProfile,
  history: WorkoutHistory
): Workout {
  return generateWorkout(user, history, {
    duration: user.availableTime,
    location: user.preferredLocations[0] || 'home',
  });
}
