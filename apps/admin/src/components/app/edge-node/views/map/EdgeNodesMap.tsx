import React, { useState, useEffect } from 'react';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import GoogleMap from 'google-map-react';

import { EdgeNodesMap_user } from './__generated__/EdgeNodesMap_user.graphql';
import styles from './Styles';
import EdgeNodeMarker from './EdgeNodeMarker';

interface EdgeNodesMapProps {
  user: EdgeNodesMap_user;
}

interface IP2Location {
  ip: string;
  city?: string;
  region?: string;
  country?: string;
  lat: number;
  lng: number;
}

export const EdgeNodesMap = React.memo<EdgeNodesMapProps>(({ user }) => {
  const classes = styles();
  const [ip2Locations, setIP2Locations] = useState<IP2Location[]>([]);

  const fecthIP2Locations = async () => {
    if (!window._env_.IPINFO_ACCESS_TOKEN) {
      return;
    }

    try {
      const result = await Promise.all(
        // @ts-ignore: Object is possibly 'null'.
        user.edgeCluster?.nodes
          // @ts-ignore: Object is possibly 'null'.
          ?.map((node) => {
            const externalIPAddress = node.Addresses?.find((address) => address.NodeAddressType === 'ExternalIP');

            return externalIPAddress ? externalIPAddress.Address : '';
          })
          .filter((ip) => ip !== '')
          .map(async (ip) => {
            const response = await fetch(`https://ipinfo.io/${ip}`, {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${window._env_.IPINFO_ACCESS_TOKEN}`,
              },
            });

            if (response.status === 429) {
              const error = await response.json();

              console.error(`${error.error.title}: ${error.error.message}`);

              return undefined;
            }

            if (response.status !== 200) {
              console.error(response.statusText);

              return undefined;
            }

            return await response.json();
          }),
      );

      const fecthIP2Locations = result
        .filter((item) => item)
        .map((info: any) => {
          const splitLocation = info.loc.split(',');

          const ip2Location: IP2Location = {
            ip: info.ip,
            city: info.city,
            region: info.region,
            country: info.country,
            lat: parseFloat(splitLocation[0]),
            lng: parseFloat(splitLocation[1]),
          };

          return ip2Location;
        });

      setIP2Locations(fecthIP2Locations);
    } catch {}
  };

  useEffect(() => {
    fecthIP2Locations();
  });

  const getEdgeNodesTableView = (user: EdgeNodesMap_user) => {
    // @ts-ignore: Object is possibly 'null'.
    return user.edgeCluster.nodes.map((node) => {
      const externalIPAddress = node.Addresses?.find((address) => address.NodeAddressType === 'ExternalIP');
      const externalIP = externalIPAddress ? externalIPAddress.Address : '';

      const hostNameAddress = node.Addresses?.find((address) => address.NodeAddressType === 'Hostname');
      const hostname = hostNameAddress ? hostNameAddress.Address : 'Unknown';

      const foundInfo = ip2Locations.find((info) => info.ip === externalIP);

      return (
        <EdgeNodeMarker
          key={node.NodeInfo.MachineID}
          ip={externalIP}
          hostname={hostname}
          city={foundInfo ? foundInfo.city : undefined}
          region={foundInfo ? foundInfo.region : undefined}
          country={foundInfo ? foundInfo.country : undefined}
          lat={foundInfo ? foundInfo.lat : undefined}
          lng={foundInfo ? foundInfo.lng : undefined}
        />
      );
    });
  };

  return (
    <div className={classes.root}>
      {window._env_.GOOGLE_MAP_API_KEY && (
        <GoogleMap
          bootstrapURLKeys={{
            key: window._env_.GOOGLE_MAP_API_KEY,
          }}
          zoom={10}
          center={{ lat: -36.632553, lng: 174.733878 }}
        >
          {getEdgeNodesTableView(user)}
        </GoogleMap>
      )}
    </div>
  );
});

export default createFragmentContainer(EdgeNodesMap, {
  user: graphql`
    fragment EdgeNodesMap_user on User {
      edgeCluster(edgeClusterID: $edgeClusterID) {
        id
        nodes {
          NodeInfo {
            MachineID
          }
          Addresses {
            NodeAddressType
            Address
          }
        }
      }
    }
  `,
});
