import { create } from 'zustand';

interface SignInProps {
  userRole: string;
  hoveredOption: string | null;

  setUserRole: (username: string) => void;
  setHoveredOption: (hoveredOption: string | null) => void;
}

const initialState = {
  userRole: '',
  hoveredOption: null,
};

export const signInStore = create<SignInProps>((set) => ({
  ...initialState,
  setUserRole: (userRole) => set({ userRole }),
  setHoveredOption: (hoveredOption) => set({ hoveredOption }),
  clearState: () => set(initialState),
}));
