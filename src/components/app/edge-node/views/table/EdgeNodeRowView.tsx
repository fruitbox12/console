import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

import { EdgeNodeRowView_edgeNode } from './__generated__/EdgeNodeRowView_edgeNode.graphql';
import styles from './Styles';

interface EdgeNodeRowViewProps {
  edgeNode: EdgeNodeRowView_edgeNode;
  showCheckbox: boolean;
}

export const EdgeNodeRowView = React.memo<EdgeNodeRowViewProps>(
  ({
    edgeNode: {
      metadata: { id },
      status: {
        nodeInfo: { kernelVersion, architecture },
        addresses,
      },
    },
    showCheckbox,
  }) => {
    const classes = styles();

    const internalIPAddress = addresses.find((address) => address.nodeAddressType === 'InternalIP');
    const internalIP = internalIPAddress ? internalIPAddress.address : 'Unknown';

    const externalIPAddress = addresses.find((address) => address.nodeAddressType === 'ExternalIP');
    const externalIP = externalIPAddress ? externalIPAddress.address : 'Unknown';

    const hostNameAddress = addresses.find((address) => address.nodeAddressType === 'Hostname');
    const hostname = hostNameAddress ? hostNameAddress.address : 'Unknown';

    return (
      <TableRow className={classes.row}>
        {showCheckbox && (
          <TableCell padding="checkbox">
            <Checkbox checked={false} />
          </TableCell>
        )}
        <TableCell component="th" scope="row" padding="none">
          {id}
        </TableCell>
        <TableCell component="th" scope="row" padding="none">
          {kernelVersion}
        </TableCell>
        <TableCell component="th" scope="row" padding="none">
          {architecture}
        </TableCell>
        <TableCell component="th" scope="row" padding="none">
          {internalIP}
        </TableCell>
        <TableCell component="th" scope="row" padding="none">
          {externalIP}
        </TableCell>
        <TableCell component="th" scope="row" padding="none">
          {hostname}
        </TableCell>
      </TableRow>
    );
  },
);

export default createFragmentContainer(EdgeNodeRowView, {
  edgeNode: graphql`
    fragment EdgeNodeRowView_edgeNode on EdgeClusterNode {
      metadata {
        id
      }
      status {
        nodeInfo {
          kernelVersion
          architecture
        }
        addresses {
          nodeAddressType
          address
        }
      }
    }
  `,
});
