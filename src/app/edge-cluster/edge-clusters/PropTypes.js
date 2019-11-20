import PropTypes from 'prop-types';

export const edgeClusterProp = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  clusterSecret: PropTypes.string.isRequired,
});

export const edgeClustersProp = PropTypes.arrayOf(edgeClusterProp);

export const edgeClusterEdgeProp = PropTypes.shape({
  cursor: PropTypes.string.isRequired,
  node: edgeClusterProp.isRequired,
});

export const edgeClusterEdgesProp = PropTypes.arrayOf(edgeClusterEdgeProp);

export const relayEdgeClusters = PropTypes.shape({
  edges: edgeClusterEdgesProp.isRequired,
});

export const userEdgeClusters = PropTypes.shape({
  id: PropTypes.string.isRequired,
  edgeClusters: relayEdgeClusters.isRequired,
});
