import { Exercise } from '@/types/fitness';

export const exercises: Exercise[] = [
  // WARMUP EXERCISES
  {
    id: 'jumping-jacks',
    name: 'Jumping Jacks',
    category: 'warmup',
    muscleGroups: ['full_body'],
    equipment: ['none'],
    difficulty: 1,
    duration: 60,
    instructions: [
      'Stand with feet together and arms at sides',
      'Jump and spread legs while raising arms overhead',
      'Jump back to starting position',
      'Repeat at a steady pace'
    ],
    tips: ['Keep core engaged', 'Land softly on the balls of your feet']
  },
  {
    id: 'high-knees',
    name: 'High Knees',
    category: 'warmup',
    muscleGroups: ['quadriceps', 'core'],
    equipment: ['none'],
    difficulty: 1,
    duration: 45,
    instructions: [
      'Stand tall with feet hip-width apart',
      'Drive one knee up toward chest',
      'Quickly switch legs',
      'Pump arms in running motion'
    ],
    tips: ['Keep your back straight', 'Stay on the balls of your feet']
  },
  {
    id: 'arm-circles',
    name: 'Arm Circles',
    category: 'warmup',
    muscleGroups: ['shoulders'],
    equipment: ['none'],
    difficulty: 1,
    duration: 30,
    instructions: [
      'Extend arms out to sides',
      'Make small circles forward',
      'Gradually increase circle size',
      'Reverse direction'
    ],
    tips: ['Keep shoulders down', 'Maintain steady breathing']
  },
  {
    id: 'leg-swings',
    name: 'Leg Swings',
    category: 'warmup',
    muscleGroups: ['hamstrings', 'quadriceps'],
    equipment: ['none'],
    difficulty: 1,
    duration: 45,
    instructions: [
      'Stand next to a wall for support',
      'Swing one leg forward and back',
      'Keep leg straight',
      'Switch legs after 20 seconds'
    ],
    tips: ['Control the movement', 'Keep core tight']
  },

  // STRENGTH - CHEST
  {
    id: 'push-ups',
    name: 'Push-Ups',
    category: 'strength',
    muscleGroups: ['chest', 'triceps', 'shoulders'],
    equipment: ['none'],
    difficulty: 2,
    duration: 45,
    instructions: [
      'Start in plank position with hands shoulder-width apart',
      'Lower your body until chest nearly touches floor',
      'Push back up to starting position',
      'Keep body in straight line throughout'
    ],
    tips: ['Keep core engaged', 'Don\'t let hips sag']
  },
  {
    id: 'wide-push-ups',
    name: 'Wide Push-Ups',
    category: 'strength',
    muscleGroups: ['chest', 'shoulders'],
    equipment: ['none'],
    difficulty: 2,
    duration: 45,
    instructions: [
      'Start in plank with hands wider than shoulders',
      'Lower chest toward the ground',
      'Push back up maintaining wide hand position',
      'Focus on squeezing chest muscles'
    ],
    tips: ['Keep elbows at 45-degree angle', 'Control the descent']
  },
  {
    id: 'dumbbell-chest-press',
    name: 'Dumbbell Chest Press',
    category: 'strength',
    muscleGroups: ['chest', 'triceps', 'shoulders'],
    equipment: ['dumbbells', 'bench'],
    difficulty: 2,
    duration: 60,
    instructions: [
      'Lie on bench with dumbbells at chest level',
      'Press dumbbells up until arms are extended',
      'Lower slowly back to starting position',
      'Keep feet flat on floor'
    ],
    tips: ['Squeeze chest at top', 'Don\'t lock elbows']
  },
  {
    id: 'diamond-push-ups',
    name: 'Diamond Push-Ups',
    category: 'strength',
    muscleGroups: ['triceps', 'chest'],
    equipment: ['none'],
    difficulty: 3,
    duration: 45,
    instructions: [
      'Form diamond shape with hands under chest',
      'Lower body keeping elbows close',
      'Push back up focusing on triceps',
      'Maintain plank position'
    ],
    tips: ['Keep core tight', 'Go slow on the way down']
  },

  // STRENGTH - BACK
  {
    id: 'superman',
    name: 'Superman',
    category: 'strength',
    muscleGroups: ['back', 'glutes'],
    equipment: ['yoga_mat'],
    difficulty: 1,
    duration: 45,
    instructions: [
      'Lie face down with arms extended forward',
      'Lift arms, chest, and legs off the ground',
      'Hold for 2-3 seconds',
      'Lower back down with control'
    ],
    tips: ['Look at the floor to keep neck neutral', 'Squeeze glutes']
  },
  {
    id: 'bent-over-rows',
    name: 'Dumbbell Bent-Over Rows',
    category: 'strength',
    muscleGroups: ['back', 'biceps'],
    equipment: ['dumbbells'],
    difficulty: 2,
    duration: 60,
    instructions: [
      'Hinge at hips with dumbbells hanging down',
      'Pull weights to ribcage squeezing shoulder blades',
      'Lower with control',
      'Keep back flat throughout'
    ],
    tips: ['Don\'t round your back', 'Lead with elbows']
  },
  {
    id: 'pull-ups',
    name: 'Pull-Ups',
    category: 'strength',
    muscleGroups: ['back', 'biceps'],
    equipment: ['pull_up_bar'],
    difficulty: 3,
    duration: 45,
    instructions: [
      'Hang from bar with overhand grip',
      'Pull body up until chin clears bar',
      'Lower with control',
      'Full extension at bottom'
    ],
    tips: ['Engage lats before pulling', 'Avoid swinging']
  },

  // STRENGTH - SHOULDERS
  {
    id: 'shoulder-press',
    name: 'Dumbbell Shoulder Press',
    category: 'strength',
    muscleGroups: ['shoulders', 'triceps'],
    equipment: ['dumbbells'],
    difficulty: 2,
    duration: 60,
    instructions: [
      'Hold dumbbells at shoulder height',
      'Press weights overhead until arms extended',
      'Lower back to shoulders',
      'Keep core engaged'
    ],
    tips: ['Don\'t arch back', 'Press in slight arc']
  },
  {
    id: 'lateral-raises',
    name: 'Lateral Raises',
    category: 'strength',
    muscleGroups: ['shoulders'],
    equipment: ['dumbbells'],
    difficulty: 2,
    duration: 45,
    instructions: [
      'Stand with dumbbells at sides',
      'Raise arms out to sides until shoulder height',
      'Lower with control',
      'Keep slight bend in elbows'
    ],
    tips: ['Lead with elbows', 'Don\'t swing the weights']
  },
  {
    id: 'pike-push-ups',
    name: 'Pike Push-Ups',
    category: 'strength',
    muscleGroups: ['shoulders', 'triceps'],
    equipment: ['none'],
    difficulty: 2,
    duration: 45,
    instructions: [
      'Start in downward dog position',
      'Bend elbows and lower head toward ground',
      'Push back up to starting position',
      'Keep hips high throughout'
    ],
    tips: ['Look at your feet', 'Keep core tight']
  },

  // STRENGTH - ARMS
  {
    id: 'bicep-curls',
    name: 'Bicep Curls',
    category: 'strength',
    muscleGroups: ['biceps'],
    equipment: ['dumbbells'],
    difficulty: 1,
    duration: 45,
    instructions: [
      'Stand with dumbbells at sides, palms forward',
      'Curl weights toward shoulders',
      'Lower with control',
      'Keep elbows pinned to sides'
    ],
    tips: ['Don\'t swing body', 'Full range of motion']
  },
  {
    id: 'tricep-dips',
    name: 'Tricep Dips',
    category: 'strength',
    muscleGroups: ['triceps'],
    equipment: ['bench'],
    difficulty: 2,
    duration: 45,
    instructions: [
      'Grip edge of bench behind you',
      'Lower body by bending elbows',
      'Push back up until arms straight',
      'Keep back close to bench'
    ],
    tips: ['Keep shoulders down', 'Go to 90 degrees']
  },
  {
    id: 'hammer-curls',
    name: 'Hammer Curls',
    category: 'strength',
    muscleGroups: ['biceps', 'forearms'],
    equipment: ['dumbbells'],
    difficulty: 1,
    duration: 45,
    instructions: [
      'Hold dumbbells with palms facing each other',
      'Curl weights while maintaining grip position',
      'Lower with control',
      'Keep elbows stationary'
    ],
    tips: ['Control the movement', 'Don\'t lean back']
  },

  // STRENGTH - LEGS
  {
    id: 'bodyweight-squats',
    name: 'Bodyweight Squats',
    category: 'strength',
    muscleGroups: ['quadriceps', 'glutes', 'hamstrings'],
    equipment: ['none'],
    difficulty: 1,
    duration: 60,
    instructions: [
      'Stand with feet shoulder-width apart',
      'Lower hips back and down',
      'Keep chest up and knees over toes',
      'Stand back up'
    ],
    tips: ['Go as low as comfortable', 'Push through heels']
  },
  {
    id: 'goblet-squats',
    name: 'Goblet Squats',
    category: 'strength',
    muscleGroups: ['quadriceps', 'glutes', 'core'],
    equipment: ['dumbbells', 'kettlebell'],
    difficulty: 2,
    duration: 60,
    instructions: [
      'Hold weight at chest level',
      'Squat down keeping chest up',
      'Drive through heels to stand',
      'Keep core braced'
    ],
    tips: ['Elbows between knees at bottom', 'Control the descent']
  },
  {
    id: 'lunges',
    name: 'Forward Lunges',
    category: 'strength',
    muscleGroups: ['quadriceps', 'glutes', 'hamstrings'],
    equipment: ['none'],
    difficulty: 2,
    duration: 60,
    instructions: [
      'Step forward with one leg',
      'Lower until both knees at 90 degrees',
      'Push back to starting position',
      'Alternate legs'
    ],
    tips: ['Keep front knee over ankle', 'Don\'t let back knee hit ground']
  },
  {
    id: 'romanian-deadlift',
    name: 'Romanian Deadlift',
    category: 'strength',
    muscleGroups: ['hamstrings', 'glutes', 'back'],
    equipment: ['dumbbells', 'barbell'],
    difficulty: 2,
    duration: 60,
    instructions: [
      'Hold weight in front of thighs',
      'Hinge at hips pushing them back',
      'Lower weight along legs',
      'Stand up squeezing glutes'
    ],
    tips: ['Keep back flat', 'Slight knee bend']
  },
  {
    id: 'calf-raises',
    name: 'Calf Raises',
    category: 'strength',
    muscleGroups: ['calves'],
    equipment: ['none'],
    difficulty: 1,
    duration: 45,
    instructions: [
      'Stand with feet hip-width apart',
      'Rise up onto balls of feet',
      'Lower heels with control',
      'Full range of motion'
    ],
    tips: ['Pause at the top', 'Use wall for balance if needed']
  },
  {
    id: 'jump-squats',
    name: 'Jump Squats',
    category: 'strength',
    muscleGroups: ['quadriceps', 'glutes', 'calves'],
    equipment: ['none'],
    difficulty: 3,
    duration: 45,
    instructions: [
      'Start in squat position',
      'Explode up into a jump',
      'Land softly back in squat',
      'Immediately repeat'
    ],
    tips: ['Land with bent knees', 'Keep core tight']
  },

  // CORE EXERCISES
  {
    id: 'plank',
    name: 'Plank',
    category: 'core',
    muscleGroups: ['core'],
    equipment: ['yoga_mat'],
    difficulty: 2,
    duration: 60,
    instructions: [
      'Start in forearm plank position',
      'Keep body in straight line',
      'Engage core and glutes',
      'Hold for duration'
    ],
    tips: ['Don\'t let hips sag', 'Breathe steadily']
  },
  {
    id: 'mountain-climbers',
    name: 'Mountain Climbers',
    category: 'core',
    muscleGroups: ['core', 'shoulders', 'quadriceps'],
    equipment: ['none'],
    difficulty: 2,
    duration: 45,
    instructions: [
      'Start in push-up position',
      'Drive one knee toward chest',
      'Quickly switch legs',
      'Maintain steady pace'
    ],
    tips: ['Keep hips low', 'Core engaged throughout']
  },
  {
    id: 'bicycle-crunches',
    name: 'Bicycle Crunches',
    category: 'core',
    muscleGroups: ['core'],
    equipment: ['yoga_mat'],
    difficulty: 2,
    duration: 45,
    instructions: [
      'Lie on back with hands behind head',
      'Bring opposite elbow to knee',
      'Extend other leg out',
      'Alternate sides'
    ],
    tips: ['Don\'t pull on neck', 'Control the movement']
  },
  {
    id: 'dead-bug',
    name: 'Dead Bug',
    category: 'core',
    muscleGroups: ['core'],
    equipment: ['yoga_mat'],
    difficulty: 1,
    duration: 45,
    instructions: [
      'Lie on back with arms up and knees at 90 degrees',
      'Lower opposite arm and leg',
      'Return to start',
      'Alternate sides'
    ],
    tips: ['Keep lower back pressed to floor', 'Move slowly']
  },
  {
    id: 'russian-twists',
    name: 'Russian Twists',
    category: 'core',
    muscleGroups: ['core'],
    equipment: ['yoga_mat'],
    difficulty: 2,
    duration: 45,
    instructions: [
      'Sit with knees bent, lean back slightly',
      'Rotate torso side to side',
      'Touch ground on each side',
      'Keep feet elevated for challenge'
    ],
    tips: ['Rotate from core not arms', 'Keep chest up']
  },
  {
    id: 'leg-raises',
    name: 'Leg Raises',
    category: 'core',
    muscleGroups: ['core'],
    equipment: ['yoga_mat'],
    difficulty: 2,
    duration: 45,
    instructions: [
      'Lie on back with legs straight',
      'Lift legs to 90 degrees',
      'Lower with control',
      'Don\'t let feet touch ground'
    ],
    tips: ['Press lower back into floor', 'Keep legs straight']
  },

  // CARDIO
  {
    id: 'burpees',
    name: 'Burpees',
    category: 'cardio',
    muscleGroups: ['full_body'],
    equipment: ['none'],
    difficulty: 3,
    duration: 45,
    instructions: [
      'Start standing',
      'Drop to squat and place hands on floor',
      'Jump feet back to plank',
      'Do a push-up, jump feet forward, jump up'
    ],
    tips: ['Modify by stepping instead of jumping', 'Full extension on jump']
  },
  {
    id: 'jumping-lunges',
    name: 'Jumping Lunges',
    category: 'cardio',
    muscleGroups: ['quadriceps', 'glutes', 'calves'],
    equipment: ['none'],
    difficulty: 3,
    duration: 45,
    instructions: [
      'Start in lunge position',
      'Jump and switch legs mid-air',
      'Land softly in lunge',
      'Repeat alternating'
    ],
    tips: ['Land with bent knees', 'Keep torso upright']
  },
  {
    id: 'box-jumps',
    name: 'Box Jumps',
    category: 'cardio',
    muscleGroups: ['quadriceps', 'glutes', 'calves'],
    equipment: ['bench'],
    difficulty: 3,
    duration: 45,
    instructions: [
      'Stand facing box or bench',
      'Jump up landing on top',
      'Stand fully on box',
      'Step down and repeat'
    ],
    tips: ['Land softly with bent knees', 'Use arm swing for momentum']
  },
  {
    id: 'skaters',
    name: 'Skaters',
    category: 'cardio',
    muscleGroups: ['glutes', 'quadriceps'],
    equipment: ['none'],
    difficulty: 2,
    duration: 45,
    instructions: [
      'Start standing on one leg',
      'Leap sideways to other leg',
      'Touch back foot behind',
      'Leap back and forth'
    ],
    tips: ['Stay low', 'Swing arms for balance']
  },
  {
    id: 'jump-rope',
    name: 'Jump Rope',
    category: 'cardio',
    muscleGroups: ['calves', 'shoulders', 'core'],
    equipment: ['jump_rope'],
    difficulty: 2,
    duration: 60,
    instructions: [
      'Hold rope handles at hip level',
      'Swing rope overhead',
      'Jump just high enough to clear rope',
      'Land on balls of feet'
    ],
    tips: ['Keep elbows close to body', 'Jump low and quick']
  },

  // FLEXIBILITY
  {
    id: 'forward-fold',
    name: 'Standing Forward Fold',
    category: 'flexibility',
    muscleGroups: ['hamstrings', 'back'],
    equipment: ['yoga_mat'],
    difficulty: 1,
    duration: 30,
    instructions: [
      'Stand with feet hip-width apart',
      'Hinge at hips and fold forward',
      'Let head hang heavy',
      'Grab opposite elbows if desired'
    ],
    tips: ['Bend knees if needed', 'Relax neck and shoulders']
  },
  {
    id: 'cat-cow',
    name: 'Cat-Cow Stretch',
    category: 'flexibility',
    muscleGroups: ['back', 'core'],
    equipment: ['yoga_mat'],
    difficulty: 1,
    duration: 45,
    instructions: [
      'Start on hands and knees',
      'Arch back looking up (cow)',
      'Round spine looking at navel (cat)',
      'Flow between positions'
    ],
    tips: ['Move with breath', 'Keep movements smooth']
  },
  {
    id: 'childs-pose',
    name: 'Child\'s Pose',
    category: 'flexibility',
    muscleGroups: ['back', 'shoulders'],
    equipment: ['yoga_mat'],
    difficulty: 1,
    duration: 45,
    instructions: [
      'Kneel with toes together, knees apart',
      'Sit back on heels',
      'Extend arms forward',
      'Rest forehead on ground'
    ],
    tips: ['Breathe deeply', 'Relax completely']
  },
  {
    id: 'hip-flexor-stretch',
    name: 'Hip Flexor Stretch',
    category: 'flexibility',
    muscleGroups: ['quadriceps', 'glutes'],
    equipment: ['yoga_mat'],
    difficulty: 1,
    duration: 45,
    instructions: [
      'Kneel on one knee',
      'Front foot flat, back knee on ground',
      'Push hips forward',
      'Hold and switch sides'
    ],
    tips: ['Keep torso upright', 'Squeeze back glute']
  },
  {
    id: 'pigeon-pose',
    name: 'Pigeon Pose',
    category: 'flexibility',
    muscleGroups: ['glutes', 'hamstrings'],
    equipment: ['yoga_mat'],
    difficulty: 2,
    duration: 60,
    instructions: [
      'From downward dog, bring knee forward',
      'Lower hips toward ground',
      'Extend back leg behind',
      'Fold forward over front leg'
    ],
    tips: ['Use block for support', 'Keep hips square']
  },

  // COOLDOWN
  {
    id: 'deep-breathing',
    name: 'Deep Breathing',
    category: 'cooldown',
    muscleGroups: ['core'],
    equipment: ['yoga_mat'],
    difficulty: 1,
    duration: 60,
    instructions: [
      'Lie on back with knees bent',
      'Place hands on belly',
      'Inhale deeply through nose',
      'Exhale slowly through mouth'
    ],
    tips: ['Feel belly rise and fall', 'Let go of tension']
  },
  {
    id: 'supine-twist',
    name: 'Supine Twist',
    category: 'cooldown',
    muscleGroups: ['back', 'core'],
    equipment: ['yoga_mat'],
    difficulty: 1,
    duration: 45,
    instructions: [
      'Lie on back with arms out',
      'Drop both knees to one side',
      'Turn head opposite direction',
      'Hold and switch sides'
    ],
    tips: ['Keep shoulders grounded', 'Breathe into the stretch']
  },
  {
    id: 'seated-forward-fold',
    name: 'Seated Forward Fold',
    category: 'cooldown',
    muscleGroups: ['hamstrings', 'back'],
    equipment: ['yoga_mat'],
    difficulty: 1,
    duration: 45,
    instructions: [
      'Sit with legs extended',
      'Hinge at hips reaching for feet',
      'Keep back as flat as possible',
      'Hold and breathe'
    ],
    tips: ['Bend knees if needed', 'Don\'t force the stretch']
  }
];

export const getExercisesByCategory = (category: string) => 
  exercises.filter(e => e.category === category);

export const getExercisesByMuscleGroup = (muscleGroup: string) =>
  exercises.filter(e => e.muscleGroups.includes(muscleGroup as any));

export const getExercisesByEquipment = (equipment: string[]) =>
  exercises.filter(e => e.equipment.some(eq => equipment.includes(eq)));

export const getExercisesByDifficulty = (level: 1 | 2 | 3) =>
  exercises.filter(e => e.difficulty === level);

export const getExerciseById = (id: string) =>
  exercises.find(e => e.id === id);
