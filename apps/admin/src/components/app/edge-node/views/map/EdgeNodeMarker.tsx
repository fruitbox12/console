import React from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

interface EdgeNodeRowViewProps {
  ip: string;
  hostname?: string;
  city?: string;
  region?: string;
  country?: string;
  lat?: number;
  lng?: number;
}

export default React.memo<EdgeNodeRowViewProps>(({ ip, hostname, city, region, country }) => {
  return (
    <Tooltip
      title={
        <React.Fragment>
          <Typography color="inherit">{hostname}</Typography>
          <Typography color="inherit">{ip}</Typography>
          <Typography color="inherit">{city}</Typography>
          <Typography color="inherit">{region}</Typography>
          <Typography color="inherit">{country}</Typography>
        </React.Fragment>
      }
    >
      <Button>{hostname}</Button>
    </Tooltip>
  );
});
