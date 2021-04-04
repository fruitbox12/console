import React from 'react';
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

import { EdgeClusterSummary_edgeCluster } from './__generated__/EdgeClusterSummary_edgeCluster.graphql';

export const enNZTranslation = {
  clusterBasics: 'Cluster basics',
  name: 'Name',
  type: 'Type',
  secret: 'Secret',
  networking: 'Networking',
  ip: 'IP',
  port: 'Port',
  kubeconfig: 'Kubeconfig',
  copyToClipboard: 'Copy to clipboard',
  download: 'Download',
  editClusterName: 'Edit cluster name',
  editClusterSecret: 'Edit cluster secret',
  clusterTypeIsImmutable: 'Cluster type is immutable',
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
  titleCell: {
    borderBottom: 'none',
  },
}));

interface EdgeClustersSummaryProps {
  edgeCluster: EdgeClusterSummary_edgeCluster;
}

export const EdgeClustersSummary = React.memo<EdgeClustersSummaryProps>(({ edgeCluster: { name, clusterType, clusterSecret, provisionDetail } }) => {
  const { t } = useTranslation();
  const classes = styles();

  // @ts-ignore: Object is possibly 'undefined'.
  const ip = provisionDetail?.ingress?.length > 0 ? provisionDetail?.ingress[0].ip : '';
  // @ts-ignore: Object is possibly 'undefined'.
  const port = provisionDetail?.ports?.length > 0 ? provisionDetail?.ports[0].port : '';
  const kubeconfig = provisionDetail?.kubeconfigContent ? provisionDetail?.kubeconfigContent : '';

  const handleDownloadKubeconfigFile = () => {
    const file = new File([kubeconfig], `${ip}.config`, { type: 'text/plain' });

    FileSaver.saveAs(file);
  };

  return (
    <div className={classes.root}>
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
                  <IconButton color="inherit">
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
                  <IconButton color="inherit">
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
              <TableCell>{t('edgeClusterSummary.ip')}</TableCell>
              <TableCell>{ip}</TableCell>
              <TableCell />
            </TableRow>
            <TableRow className={classes.row}>
              <TableCell>{t('edgeClusterSummary.port')}</TableCell>
              <TableCell>{port}</TableCell>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
});

export default createFragmentContainer(EdgeClustersSummary, {
  edgeCluster: graphql`
    fragment EdgeClusterSummary_edgeCluster on EdgeCluster {
      id
      name
      clusterType
      clusterSecret
      provisionDetail {
        ingress {
          ip
        }
        ports {
          port
        }
        kubeconfigContent
      }
    }
  `,
});
