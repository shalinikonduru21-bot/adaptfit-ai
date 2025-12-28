import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { 
  UserProfile, 
  WorkoutHistory, 
  ScheduledWorkout, 
  Achievement, 
  CompletedWorkout,
  FitAdaptState 
} from '@/types/fitness';

// Initial achievements
const initialAchievements: Achievement[] = [
  { id: 'first-workout', name: 'First Step', description: 'Complete your first workout', icon: '🎯', isUnlocked: false },
  { id: '7-day-streak', name: 'Week Warrior', description: '7-day workout streak', icon: '🔥', isUnlocked: false },
  { id: '30-day-streak', name: 'Monthly Master', description: '30-day workout streak', icon: '💪', isUnlocked: false },
  { id: '50-workouts', name: 'Half Century', description: 'Complete 50 workouts', icon: '🏆', isUnlocked: false },
  { id: '100-workouts', name: 'Century Club', description: 'Complete 100 workouts', icon: '👑', isUnlocked: false },
  { id: 'early-bird', name: 'Early Bird', description: 'Work out before 7 AM', icon: '🌅', isUnlocked: false },
  { id: 'night-owl', name: 'Night Owl', description: 'Work out after 8 PM', icon: '🦉', isUnlocked: false },
  { id: 'weekend-warrior', name: 'Weekend Warrior', description: 'Complete workouts on both Sat & Sun', icon: '💥', isUnlocked: false },
  { id: 'consistency-king', name: 'Consistency King', description: 'Hit weekly goal 4 weeks in a row', icon: '🥇', isUnlocked: false },
];

const initialHistory: WorkoutHistory = {
  completedWorkouts: [],
  currentStreak: 0,
  longestStreak: 0,
  totalWorkouts: 0,
  totalMinutes: 0,
  totalCalories: 0,
  weeklyWorkouts: 0,
  muscleGroupsTrainedThisWeek: [],
};

const initialState: FitAdaptState = {
  user: null,
  isOnboarded: false,
  history: initialHistory,
  scheduledWorkouts: [],
  favoriteWorkouts: [],
  achievements: initialAchievements,
  theme: 'dark',
};

type Action =
  | { type: 'SET_USER'; payload: UserProfile }
  | { type: 'UPDATE_USER'; payload: Partial<UserProfile> }
  | { type: 'SET_ONBOARDED'; payload: boolean }
  | { type: 'ADD_COMPLETED_WORKOUT'; payload: CompletedWorkout }
  | { type: 'SCHEDULE_WORKOUT'; payload: ScheduledWorkout }
  | { type: 'REMOVE_SCHEDULED_WORKOUT'; payload: string }
  | { type: 'TOGGLE_FAVORITE'; payload: string }
  | { type: 'UNLOCK_ACHIEVEMENT'; payload: string }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' | 'system' }
  | { type: 'LOAD_STATE'; payload: FitAdaptState }
  | { type: 'RESET_STATE' };

function reducer(state: FitAdaptState, action: Action): FitAdaptState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    
    case 'UPDATE_USER':
      return { 
        ...state, 
        user: state.user ? { ...state.user, ...action.payload } : null 
      };
    
    case 'SET_ONBOARDED':
      return { ...state, isOnboarded: action.payload };
    
    case 'ADD_COMPLETED_WORKOUT': {
      const workout = action.payload;
      const now = new Date();
      const lastWorkout = state.history.lastWorkoutDate 
        ? new Date(state.history.lastWorkoutDate) 
        : null;
      
      // Calculate streak
      let newStreak = state.history.currentStreak;
      if (lastWorkout) {
        const daysDiff = Math.floor(
          (now.getTime() - lastWorkout.getTime()) / (1000 * 60 * 60 * 24)
        );
        if (daysDiff === 1) {
          newStreak += 1;
        } else if (daysDiff > 1) {
          newStreak = 1;
        }
      } else {
        newStreak = 1;
      }
      
      // Calculate weekly workouts
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - now.getDay());
      weekStart.setHours(0, 0, 0, 0);
      
      const weeklyWorkouts = state.history.completedWorkouts.filter(w => 
        new Date(w.completedAt) >= weekStart
      ).length + 1;

      return {
        ...state,
        history: {
          ...state.history,
          completedWorkouts: [workout, ...state.history.completedWorkouts],
          currentStreak: newStreak,
          longestStreak: Math.max(newStreak, state.history.longestStreak),
          totalWorkouts: state.history.totalWorkouts + 1,
          totalMinutes: state.history.totalMinutes + Math.floor(workout.duration / 60),
          totalCalories: state.history.totalCalories + workout.caloriesBurned,
          weeklyWorkouts,
          lastWorkoutDate: workout.completedAt,
        }
      };
    }
    
    case 'SCHEDULE_WORKOUT':
      return {
        ...state,
        scheduledWorkouts: [...state.scheduledWorkouts, action.payload],
      };
    
    case 'REMOVE_SCHEDULED_WORKOUT':
      return {
        ...state,
        scheduledWorkouts: state.scheduledWorkouts.filter(w => w.id !== action.payload),
      };
    
    case 'TOGGLE_FAVORITE':
      return {
        ...state,
        favoriteWorkouts: state.favoriteWorkouts.includes(action.payload)
          ? state.favoriteWorkouts.filter(id => id !== action.payload)
          : [...state.favoriteWorkouts, action.payload],
      };
    
    case 'UNLOCK_ACHIEVEMENT':
      return {
        ...state,
        achievements: state.achievements.map(a =>
          a.id === action.payload ? { ...a, isUnlocked: true, unlockedAt: new Date() } : a
        ),
      };
    
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    
    case 'LOAD_STATE':
      return action.payload;
    
    case 'RESET_STATE':
      return initialState;
    
    default:
      return state;
  }
}

interface FitAdaptContextType {
  state: FitAdaptState;
  dispatch: React.Dispatch<Action>;
  setUser: (user: UserProfile) => void;
  updateUser: (updates: Partial<UserProfile>) => void;
  completeOnboarding: () => void;
  addCompletedWorkout: (workout: CompletedWorkout) => void;
  scheduleWorkout: (workout: ScheduledWorkout) => void;
  removeScheduledWorkout: (id: string) => void;
  toggleFavorite: (workoutId: string) => void;
  unlockAchievement: (achievementId: string) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  resetApp: () => void;
}

const FitAdaptContext = createContext<FitAdaptContextType | undefined>(undefined);

const STORAGE_KEY = 'fitadapt-state';

export function FitAdaptProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Convert date strings back to Date objects
        if (parsed.history?.completedWorkouts) {
          parsed.history.completedWorkouts = parsed.history.completedWorkouts.map((w: any) => ({
            ...w,
            completedAt: new Date(w.completedAt)
          }));
        }
        if (parsed.history?.lastWorkoutDate) {
          parsed.history.lastWorkoutDate = new Date(parsed.history.lastWorkoutDate);
        }
        if (parsed.user?.createdAt) {
          parsed.user.createdAt = new Date(parsed.user.createdAt);
        }
        if (parsed.user?.updatedAt) {
          parsed.user.updatedAt = new Date(parsed.user.updatedAt);
        }
        dispatch({ type: 'LOAD_STATE', payload: parsed });
      }
    } catch (error) {
      console.error('Error loading state:', error);
    }
  }, []);

  // Save state to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Error saving state:', error);
    }
  }, [state]);

  // Apply theme
  useEffect(() => {
    const root = document.documentElement;
    if (state.theme === 'dark') {
      root.classList.add('dark');
    } else if (state.theme === 'light') {
      root.classList.remove('dark');
    } else {
      // System preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [state.theme]);

  const contextValue: FitAdaptContextType = {
    state,
    dispatch,
    setUser: (user) => dispatch({ type: 'SET_USER', payload: user }),
    updateUser: (updates) => dispatch({ type: 'UPDATE_USER', payload: updates }),
    completeOnboarding: () => dispatch({ type: 'SET_ONBOARDED', payload: true }),
    addCompletedWorkout: (workout) => dispatch({ type: 'ADD_COMPLETED_WORKOUT', payload: workout }),
    scheduleWorkout: (workout) => dispatch({ type: 'SCHEDULE_WORKOUT', payload: workout }),
    removeScheduledWorkout: (id) => dispatch({ type: 'REMOVE_SCHEDULED_WORKOUT', payload: id }),
    toggleFavorite: (workoutId) => dispatch({ type: 'TOGGLE_FAVORITE', payload: workoutId }),
    unlockAchievement: (achievementId) => dispatch({ type: 'UNLOCK_ACHIEVEMENT', payload: achievementId }),
    setTheme: (theme) => dispatch({ type: 'SET_THEME', payload: theme }),
    resetApp: () => {
      localStorage.removeItem(STORAGE_KEY);
      dispatch({ type: 'RESET_STATE' });
    },
  };

  return (
    <FitAdaptContext.Provider value={contextValue}>
      {children}
    </FitAdaptContext.Provider>
  );
}

export function useFitAdapt() {
  const context = useContext(FitAdaptContext);
  if (context === undefined) {
    throw new Error('useFitAdapt must be used within a FitAdaptProvider');
  }
  return context;
}
