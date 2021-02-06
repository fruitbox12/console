import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { TenantsView_user } from './__generated__/TenantsView_user.graphql';
import Styles from './Styles';
import TenantTableHeader from './TenantTableHeader';
import TenantView from './TenantView';

interface TenantsViewProps {
  user: TenantsView_user;
  onTenantClick: (id: string) => void;
  onCreateTenantClick: () => void;
}

export const TenantsView = React.memo<TenantsViewProps>(({ user, onTenantClick, onCreateTenantClick }) => {
  const classes = Styles();

  const getTenantsView = (user: TenantsView_user) => {
    // @ts-ignore: Object is possibly 'null'.
    return user.tenants.edges.map((edge) => <TenantView key={edge.node.id} tenant={edge.node} onTenantClick={onTenantClick} />);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle" size="medium" aria-label="enhanced table">
            <TenantTableHeader />
            <TableBody>{getTenantsView(user)}</TableBody>
          </Table>
        </div>
      </Paper>

      <Fab color="primary" aria-label="add" className={classes.fab} size="large" onClick={onCreateTenantClick}>
        <AddIcon />
      </Fab>
    </div>
  );
});

export default createFragmentContainer(TenantsView, {
  user: graphql`
    fragment TenantsView_user on User {
      tenants(first: 1000) @connection(key: "User_tenants") {
        edges {
          node {
            id
            ...TenantView_tenant
          }
        }
      }
    }
  `,
});
