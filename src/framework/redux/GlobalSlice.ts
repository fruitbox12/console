import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Project {
  projectId: string;
  name: string;
}

export interface Global {
  project?: Project;
}

const currentSelectedProjectKey = 'currentSelectedProject';
const currentSelectedProject = localStorage.getItem(currentSelectedProjectKey);
const initialState: Global = { project: JSON.parse(String(currentSelectedProject)) };

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    changeSelectedProject: (state: Global, payloadAction: PayloadAction<Project>) => {
      state.project = payloadAction.payload;
      localStorage.setItem(currentSelectedProjectKey, JSON.stringify(state.project));
    },
    clearSelectedProject: (state: Global) => {
      state.project = undefined;
    },
  },
});

export const selectState = ({ global }: { global: Global }) => ({
  project: global.project,
});

export const { changeSelectedProject, clearSelectedProject } = globalSlice.actions;

export default globalSlice.reducer;
