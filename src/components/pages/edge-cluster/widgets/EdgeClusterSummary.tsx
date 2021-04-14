import React, { useState } from 'react';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import LockIcon from '@material-ui/icons/Lock';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import GetAppIcon from '@material-ui/icons/GetApp';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import FileSaver from 'file-saver';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { EdgeClusterSummary_edgeCluster } from './__generated__/EdgeClusterSummary_edgeCluster.graphql';
import EdgeClusterEditName from './EdgeClusterEditName';
import EdgeClusterEditClusterSecret from './EdgeClusterEditClusterSecret';

export const enNZTranslation = {
  clusterBasics: 'Cluster basics',
  name: 'Name',
  type: 'Type',
  secret: 'Secret',
  networking: 'Networking',
  ips: 'IP(s)',
  ports: 'Port(s)',
  kubeconfig: 'Kubeconfig',
  copyToClipboard: 'Copy to clipboard',
  download: 'Download',
  editClusterName: 'Edit cluster name',
  editClusterSecret: 'Edit cluster secret',
  clusterTypeIsImmutable: 'Cluster type is immutable',
};

const styles = makeStyles((theme) => ({
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  row: {
    height: 40,
  },
  titleCell: {
    borderBottom: 'none',
  },
  dialog: {
    minWidth: 500,
  },
}));

interface EdgeClustersSummaryProps {
  edgeCluster: EdgeClusterSummary_edgeCluster;
}

export const EdgeClustersSummary = React.memo<EdgeClustersSummaryProps>(
  ({ edgeCluster: { id, name, clusterType, clusterSecret, provisionDetails } }) => {
    const classes = styles();
    const { t } = useTranslation();
    const [openEditName, setOpenEditName] = useState(false);
    const [openEditClusterSecret, setOpenEditClusterSecret] = useState(false);

    let ips = '';
    let ports = '';

    if (provisionDetails.loadBalancer !== null) {
      ips = provisionDetails.loadBalancer.ingress
        .reduce((reduction, value) => {
          if (value.ip === '') {
            return '';
          }

          return `${reduction}, ${value.ip}`;
        }, '')
        .replace(',', '')
        .trim();
    }

    ports = provisionDetails.ports
      .reduce((reduction, value) => {
        const valueStr = value.toString();

        if (valueStr === '' || valueStr === '0') {
          return '';
        }

        return `${reduction}, ${valueStr}`;
      }, '')
      .replace(',', '')
      .trim();

    const kubeconfig = provisionDetails?.kubeconfigContent ? provisionDetails?.kubeconfigContent : '';

    const handleDownloadKubeconfigFile = () => {
      // @ts-ignore: Object is possibly 'undefined'.
      const file = new File([kubeconfig], `${provisionDetails.loadBalancer.ingress[0].ip}.config`, { type: 'text/plain' });

      FileSaver.saveAs(file);
    };

    const handleEditNameOpenClick = () => {
      setOpenEditName(true);
    };

    const handleEditNameCloseClick = () => {
      setOpenEditName(false);
    };

    const handleEditClusterSecretOpenClick = () => {
      setOpenEditClusterSecret(true);
    };

    const handleEditClusterSecretCloseClick = () => {
      setOpenEditClusterSecret(false);
    };

    return (
      <React.Fragment>
        <Paper className={classes.paper}>
          <Table size="small">
            <TableBody>
              <TableRow className={classes.row}>
                <TableCell className={classes.titleCell}>
                  <Typography variant="h5">{t('edgeClusterSummary.clusterBasics')}</Typography>
                </TableCell>
              </TableRow>
              <TableRow className={classes.row}>
                <TableCell>{t('edgeClusterSummary.name')}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>
                  <Tooltip title={<React.Fragment>{t('edgeClusterSummary.editClusterName')}</React.Fragment>}>
                    <IconButton color="inherit" onClick={handleEditNameOpenClick}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
              <TableRow className={classes.row}>
                <TableCell>{t('edgeClusterSummary.type')}</TableCell>
                <TableCell>{clusterType}</TableCell>
                <TableCell>
                  <Tooltip title={<React.Fragment>{t('edgeClusterSummary.clusterTypeIsImmutable')}</React.Fragment>}>
                    <IconButton color="inherit">
                      <LockIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
              <TableRow className={classes.row}>
                <TableCell>{t('edgeClusterSummary.secret')}</TableCell>
                <TableCell>{clusterSecret}</TableCell>
                <TableCell>
                  <Tooltip title={<React.Fragment>{t('edgeClusterSummary.editClusterSecret')}</React.Fragment>}>
                    <IconButton color="inherit" onClick={handleEditClusterSecretOpenClick}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
              <TableRow className={classes.row}>
                <TableCell>{t('edgeClusterSummary.kubeconfig')}</TableCell>
                <TableCell>
                  {kubeconfig && (
                    <React.Fragment>
                      <Tooltip title={<React.Fragment>{t('edgeClusterSummary.copyToClipboard')}</React.Fragment>}>
                        <CopyToClipboard text={kubeconfig}>
                          <IconButton color="inherit">
                            <FileCopyIcon />
                          </IconButton>
                        </CopyToClipboard>
                      </Tooltip>

                      <Tooltip title={<React.Fragment>{t('edgeClusterSummary.download')}</React.Fragment>}>
                        <IconButton color="inherit" onClick={handleDownloadKubeconfigFile}>
                          <GetAppIcon />
                        </IconButton>
                      </Tooltip>
                    </React.Fragment>
                  )}
                </TableCell>
                <TableCell />
              </TableRow>
              <TableRow>
                <TableCell className={classes.titleCell}>
                  <Typography variant="h5">{t('edgeClusterSummary.networking')}</Typography>
                </TableCell>
              </TableRow>
              <TableRow className={classes.row}>
                <TableCell>{t('edgeClusterSummary.ips')}</TableCell>
                <TableCell>{ips}</TableCell>
                <TableCell />
              </TableRow>
              <TableRow className={classes.row}>
                <TableCell>{t('edgeClusterSummary.ports')}</TableCell>
                <TableCell>{ports}</TableCell>
                <TableCell />
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
        <Dialog open={openEditName} keepMounted onClose={handleEditNameCloseClick}>
          <DialogTitle className={classes.dialog}>{t('edgeClusterSummary.editClusterName')}</DialogTitle>
          <DialogContent>
            <EdgeClusterEditName edgeClusterID={id} onClose={handleEditNameCloseClick} />
          </DialogContent>
        </Dialog>
        <Dialog open={openEditClusterSecret} keepMounted onClose={handleEditClusterSecretCloseClick}>
          <DialogTitle className={classes.dialog}>{t('edgeClusterSummary.editClusterSecret')}</DialogTitle>
          <DialogContent>
            <EdgeClusterEditClusterSecret edgeClusterID={id} onClose={handleEditClusterSecretCloseClick} />
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  },
);

export default createFragmentContainer(EdgeClustersSummary, {
  edgeCluster: graphql`
    fragment EdgeClusterSummary_edgeCluster on EdgeCluster {
      id
      name
      clusterType
      clusterSecret
      provisionDetails {
        loadBalancer {
          ingress {
            ip
            hostname
            portStatus {
              port
            }
          }
        }
        kubeconfigContent
        ports
      }
    }
  `,
});
