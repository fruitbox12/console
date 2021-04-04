import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import { EdgeClusterNodes_edgeCluster } from './__generated__/EdgeClusterNodes_edgeCluster.graphql';
import { EdgeClusterNodes_node } from './__generated__/EdgeClusterNodes_node.graphql';

export const enNZTranslation = {
  name: 'Name',
  internalIP: 'Internal IP',
  externalIP: 'External IP',
  kernelVersion: 'Kernel version',
  architecture: 'Architecture',
  osImage: 'OS image',
  containerRuntimeVersion: 'Container runtime version',
  kubeletVersion: 'Kubelet version',
  kubeProxyVersion: 'Kube proxy version',
  operatingSystem: 'Operating system',
};

const styles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    marginTop: theme.spacing(3),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  row: {
    height: 40,
  },
}));

const Header = React.memo(() => {
  const { t } = useTranslation();

  return (
    <TableHead>
      <TableRow>
        <TableCell>{t('edgeClusterNodes.name')}</TableCell>
        <TableCell>{t('edgeClusterNodes.internalIP')}</TableCell>
        <TableCell>{t('edgeClusterNodes.externalIP')}</TableCell>
        <TableCell>{t('edgeClusterNodes.kernelVersion')}</TableCell>
        <TableCell>{t('edgeClusterNodes.architecture')}</TableCell>
        <TableCell>{t('edgeClusterNodes.osImage')}</TableCell>
        <TableCell>{t('edgeClusterNodes.containerRuntimeVersion')}</TableCell>
        <TableCell>{t('edgeClusterNodes.kubeletVersion')}</TableCell>
        <TableCell>{t('edgeClusterNodes.kubeProxyVersion')}</TableCell>
        <TableCell>{t('edgeClusterNodes.operatingSystem')}</TableCell>
      </TableRow>
    </TableHead>
  );
});

interface EdgeClustersNodeRowProps {
  node: EdgeClusterNodes_node;
}

const EdgeClustersNodeRow = React.memo<EdgeClustersNodeRowProps>(
  ({
    node: {
      metadata: { name },
      status: {
        addresses,
        nodeInfo: { kernelVersion, architecture, osImage, containerRuntimeVersion, kubeletVersion, kubeProxyVersion, operatingSystem },
      },
    },
  }) => {
    const classes = styles();

    const internalIPAddress = addresses.find((address) => address.nodeAddressType === 'InternalIP');
    const internalIP = internalIPAddress ? internalIPAddress.address : 'Unknown';

    const externalIPAddress = addresses.find((address) => address.nodeAddressType === 'ExternalIP');
    const externalIP = externalIPAddress ? externalIPAddress.address : 'Unknown';

    return (
      <TableRow className={classes.row}>
        <TableCell>{name}</TableCell>
        <TableCell>{internalIP}</TableCell>
        <TableCell>{externalIP}</TableCell>
        <TableCell>{kernelVersion}</TableCell>
        <TableCell>{architecture}</TableCell>
        <TableCell>{osImage}</TableCell>
        <TableCell>{containerRuntimeVersion}</TableCell>
        <TableCell>{kubeletVersion}</TableCell>
        <TableCell>{kubeProxyVersion}</TableCell>
        <TableCell>{operatingSystem}</TableCell>
      </TableRow>
    );
  },
);

const EdgeClustersNodeRowRelayed = createFragmentContainer(EdgeClustersNodeRow, {
  node: graphql`
    fragment EdgeClusterNodes_node on EdgeClusterNode {
      metadata {
        name
      }
      status {
        nodeInfo {
          kernelVersion
          architecture
          osImage
          containerRuntimeVersion
          kubeletVersion
          kubeProxyVersion
          operatingSystem
        }
        addresses {
          nodeAddressType
          address
        }
      }
    }
  `,
});

interface EdgeClustersNodesProps {
  edgeCluster: EdgeClusterNodes_edgeCluster;
}

const EdgeClustersNodes = React.memo<EdgeClustersNodesProps>(({ edgeCluster: { nodes } }) => {
  const classes = styles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Table size="small">
          <Header />
          <TableBody>
            {nodes.map((node) => (
              <EdgeClustersNodeRowRelayed key={node.metadata.id} node={node} />
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
});

export default createFragmentContainer(EdgeClustersNodes, {
  edgeCluster: graphql`
    fragment EdgeClusterNodes_edgeCluster on EdgeCluster {
      nodes {
        metadata {
          id
        }
        ...EdgeClusterNodes_node
      }
    }
  `,
});
