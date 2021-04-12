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

import { EdgeClusterServices_edgeCluster } from './__generated__/EdgeClusterServices_edgeCluster.graphql';
import { EdgeClusterServices_service } from './__generated__/EdgeClusterServices_service.graphql';

export const enNZTranslation = {
  name: 'Name',
  namespace: 'Namespace',
  ips: 'IP(s)',
  ports: 'Port(s)',
  clusterIPs: 'Cluster IP(s)',
  externalIPs: 'External IP(s)',
  externalName: 'External name',
};

const styles = makeStyles((theme) => ({
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
        <TableCell>{t('edgeClusterServices.name')}</TableCell>
        <TableCell>{t('edgeClusterServices.namespace')}</TableCell>
        <TableCell>{t('edgeClusterServices.ips')}</TableCell>
        <TableCell>{t('edgeClusterServices.ports')}</TableCell>
        <TableCell>{t('edgeClusterServices.clusterIPs')}</TableCell>
        <TableCell>{t('edgeClusterServices.externalIPs')}</TableCell>
        <TableCell>{t('edgeClusterServices.externalName')}</TableCell>
      </TableRow>
    </TableHead>
  );
});

interface EdgeClusterServiceRowProps {
  service: EdgeClusterServices_service;
}

const EdgeClusterServiceRow = React.memo<EdgeClusterServiceRowProps>(
  ({
    service: {
      metadata: { name, namespace },
      status: { loadBalancer },
      spec: { ports: specPorts, clusterIPs: specClusterIPs, externalIPs: specExternalIPs, externalName },
    },
  }) => {
    const classes = styles();

    let ips = '';
    let ports = '';

    if (loadBalancer !== null) {
      ips = loadBalancer.ingress
        .reduce((reduction, value) => `${reduction}, ${value.ip}`, '')
        .replace(',', '')
        .trim();

      ports = specPorts
        .reduce((reduction, value) => {
          let finalValue = value.port.toString().replace('0', '');

          if (finalValue === '') {
            return '';
          }

          return `${reduction}, ${finalValue}`;
        }, '')
        .replace(',', '')
        .trim();
    }

    const clusterIPs = specClusterIPs
      .reduce((reduction, value) => {
        if (value === '') {
          return '';
        }

        return `${reduction}, ${value}`;
      }, '')
      .replace(',', '')
      .trim();

    const externalIPs = specExternalIPs
      .reduce((reduction, value) => {
        if (value === '') {
          return '';
        }

        return `${reduction}, ${value}`;
      }, '')
      .replace(',', '')
      .trim();

    return (
      <TableRow className={classes.row}>
        <TableCell>{name}</TableCell>
        <TableCell>{namespace}</TableCell>
        <TableCell>{ips}</TableCell>
        <TableCell>{ports}</TableCell>
        <TableCell>{clusterIPs}</TableCell>
        <TableCell>{externalIPs}</TableCell>
        <TableCell>{externalName}</TableCell>
      </TableRow>
    );
  },
);

const EdgeClusterServiceRowRelayed = createFragmentContainer(EdgeClusterServiceRow, {
  service: graphql`
    fragment EdgeClusterServices_service on EdgeClusterService {
      metadata {
        name
        namespace
      }
      status {
        loadBalancer {
          ingress {
            ip
          }
        }
      }
      spec {
        ports {
          name
          port
        }
        clusterIPs
        externalIPs
        externalName
      }
    }
  `,
});

interface EdgeClustersNodesProps {
  edgeCluster: EdgeClusterServices_edgeCluster;
}

const EdgeClustersNodes = React.memo<EdgeClustersNodesProps>(({ edgeCluster: { services } }) => {
  const classes = styles();

  return (
    <Paper className={classes.paper}>
      <Table size="small">
        <Header />
        <TableBody>
          {services.map((service) => (
            <EdgeClusterServiceRowRelayed key={service.metadata.id} service={service} />
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
});

export default createFragmentContainer(EdgeClustersNodes, {
  edgeCluster: graphql`
    fragment EdgeClusterServices_edgeCluster on EdgeCluster {
      services {
        metadata {
          id
        }
        ...EdgeClusterServices_service
      }
    }
  `,
});
