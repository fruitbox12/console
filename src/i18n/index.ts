import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { enNZTranslation as enNZEdgeClusterCreate } from '../components/pages/edge-cluster/EdgeClusterCreate';
import { enNZTranslation as enNZEdgeClustersTable } from '../components/pages/edge-cluster/widgets/EdgeClustersTable';
import { enNZTranslation as enNZEdgeClusterSummary } from '../components/pages/edge-cluster/widgets/EdgeClusterSummary';
import { enNZTranslation as enNZEdgeClusterNodes } from '../components/pages/edge-cluster/widgets/EdgeClusterNodes';
import { enNZTranslation as enNZEdgeClusterWorkloads } from '../components/pages/edge-cluster/widgets/EdgeClusterWorkloads';
import { enNZTranslation as enNZEdgeClusterEditName } from '../components/pages/edge-cluster/widgets/EdgeClusterEditName';
import { enNZTranslation as enNZEdgeClusterEditClusterSecret } from '../components/pages/edge-cluster/widgets/EdgeClusterEditClusterSecret';

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
        create: { label: 'Create', button: 'Create' },
        update: { label: 'Update', button: 'Update' },
        cancel: { label: 'Cancel', button: 'Cancel' },
        createProject: { title: 'Create Project' },
        updateProject: { title: 'Update Project' },
        createEdgeCluster: { title: 'Create Edge Cluster' },
        updateEdgeCluster: { title: 'Update Edge Cluster' },
        selectProject: { title: 'Select a project', label: 'Select a project' },
        newProject: { button: 'New project' },
        nodeId: { title: 'Node ID' },
        kernelVersion: { title: 'Kernel Version' },
        architecture: { title: 'Architecture' },
        internalIP: { title: 'Internal IP' },
        externalIP: { title: 'External IP' },
        hostName: { title: 'Host Name' },
        ip: { title: 'IP' },
        port: { title: 'Port' },
        kubeconfig: { title: 'Kubeconfig' },
        numberOfNodes: { title: 'Number of nodes' },
        summary: { title: 'Summary' },
        nodes: { title: 'Nodes' },
        workloads: { title: 'Workloads' },
        edgeClusterCreate: enNZEdgeClusterCreate,
        edgeClustersTable: enNZEdgeClustersTable,
        edgeClusterSummary: enNZEdgeClusterSummary,
        edgeClusterNodes: enNZEdgeClusterNodes,
        edgeClusterWorkloads: enNZEdgeClusterWorkloads,
        edgeClusterEditName: enNZEdgeClusterEditName,
        edgeClusterEditClusterSecret: enNZEdgeClusterEditClusterSecret,
      },
    },
  },
});

export default i18next;
