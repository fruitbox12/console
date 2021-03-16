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
      NodeInfo: { MachineID, KernelVersion, Architecture },
      Addresses,
    },
    showCheckbox,
  }) => {
    const classes = styles();

    const internalIPAddress = Addresses?.find((address) => address.NodeAddressType === 'InternalIP');
    const internalIP = internalIPAddress ? internalIPAddress.Address : 'Unknown';

    const externalIPAddress = Addresses?.find((address) => address.NodeAddressType === 'ExternalIP');
    const externalIP = externalIPAddress ? externalIPAddress.Address : 'Unknown';

    const hostNameAddress = Addresses?.find((address) => address.NodeAddressType === 'Hostname');
    const hostname = hostNameAddress ? hostNameAddress.Address : 'Unknown';

    return (
      <TableRow className={classes.row}>
        {showCheckbox && (
          <TableCell padding="checkbox">
            <Checkbox checked={false} />
          </TableCell>
        )}
        <TableCell component="th" scope="row" padding="none">
          {MachineID}
        </TableCell>
        <TableCell component="th" scope="row" padding="none">
          {KernelVersion}
        </TableCell>
        <TableCell component="th" scope="row" padding="none">
          {Architecture}
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
    fragment EdgeNodeRowView_edgeNode on EdgeClusterNodeStatus {
      NodeInfo {
        MachineID
        KernelVersion
        Architecture
      }
      Addresses {
        NodeAddressType
        Address
      }
    }
  `,
});
