import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next.use(LanguageDetector).init({
  interpolation: {
    escapeValue: false,
  },
  lng: 'en_NZ',
  resources: {
    en_NZ: {
      translation: {
        signUp: { title: 'Sign up', label: 'Sign up', button: 'Sign up' },
        signIn: { title: 'Sign in', label: 'Sign in', button: 'Sign in' },
        signOut: { title: 'Sign out', label: 'Sign out', button: 'Sign out' },
        dashboard: { title: 'Dashboard', label: 'Dashboard' },
        projectManagement: { title: 'Project Management', label: 'Project Management' },
        edgeClusterManagement: { title: 'Edge Cluster Management', label: 'Edge Cluster Management' },
        profile: { label: 'Profile' },
        name: { title: 'Name', label: 'Name' },
        type: { title: 'Type', label: 'Type' },
        secret: { title: 'Secret', label: 'Secret' },
        create: { label: 'Create', button: 'Create' },
        update: { label: 'Update', button: 'Update' },
        cancel: { label: 'Cancel', button: 'Cancel' },
        createProject: { title: 'Create Project' },
        updateProject: { title: 'Update Project' },
        createEdgeCluster: { title: 'Create Edge Cluster' },
        updateEdgeCluster: { title: 'Update Edge Cluster' },
      },
    },
  },
});

export default i18next;
