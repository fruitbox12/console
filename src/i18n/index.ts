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
        edgeCloud: { title: 'Edge Cloud' },
        signIn: { title: 'Sign in', label: 'Sign in', button: 'Sign in' },
        signOut: { title: 'Sign out', label: 'Sign out', button: 'Sign out' },
        dashboard: { title: 'Dashboard', label: 'Dashboard' },
        project: { title: 'Project', label: 'Project' },
        edgeCluster: { title: 'Edge Cluster', label: 'Edge Cluster' },
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
