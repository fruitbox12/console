import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Project {
  projectId: string;
  name: string;
}

export interface Global {
  currentSelectedProject?: Project;
}

const currentSelectedProjectKey = 'currentSelectedProject';
const currentSelectedProject = localStorage.getItem(currentSelectedProjectKey);
const initialState: Global = { currentSelectedProject: JSON.parse(String(currentSelectedProject)) };

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    changeSelectedProject: (state: Global, payloadAction: PayloadAction<Project>) => {
      state.currentSelectedProject = payloadAction.payload;
      localStorage.setItem(currentSelectedProjectKey, JSON.stringify(state.currentSelectedProject));
    },
    clearSelectedProject: (state: Global) => {
      state.currentSelectedProject = undefined;
    },
  },
});

export const selectState = ({ global }: { global: Global }) => ({
  currentSelectedProject: global.currentSelectedProject,
});

export const { changeSelectedProject, clearSelectedProject } = globalSlice.actions;

export default globalSlice.reducer;
