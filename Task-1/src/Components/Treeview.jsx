import React, { useState, useEffect, useRef } from 'react';
import { Box, Collapse, List, ListItem, ListItemIcon, ListItemText, Typography, Skeleton, useMediaQuery, useTheme } from '@mui/material';
import { ExpandLess, ExpandMore, Star, Info, CheckCircle } from '@mui/icons-material';
import AgGridComponent from './AgGridComponent';

const TreeView = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);
  const [openNodes, setOpenNodes] = useState({});
  const [selectedNode, setSelectedNode] = useState(null);
  const focusedNodeRef = useRef(null);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setFetchedData(data);
      setIsLoading(false);
    }, 1000);
  }, [data]);

  useEffect(() => {
    if (focusedNodeRef.current) {
      focusedNodeRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      focusedNodeRef.current.focus();
    }
  }, [selectedNode]);

  const toggleNode = (nodeId) => {
    setOpenNodes((prevOpenNodes) => ({
      ...prevOpenNodes,
      [nodeId]: !prevOpenNodes[nodeId],
    }));
  };

  const handleClick = (node) => {
    setSelectedNode(node);
    toggleNode(node.name);
  };

  const getNodeIcon = (description) => {
    switch (description) {
      case 'star':
        return <Star />;
      case 'info':
        return <Info />;
      case 'check':
        return <CheckCircle />;
      default:
        return null;
    }
  };

  const renderNode = (node, level = 0) => {
    const isOpen = !!openNodes[node.name];
    const isSelected = selectedNode === node;

    return (
      <React.Fragment key={node.name}>
        <ListItem
          button
          onClick={() => handleClick(node)}
          ref={isSelected ? focusedNodeRef : null}
          selected={isSelected}
          sx={{ paddingLeft: level * 2, backgroundColor: isSelected ? 'rgba(0, 0, 0, 0.08)' : 'inherit' }}
        >
          <ListItemIcon>
            {getNodeIcon(node.description)}
          </ListItemIcon>
          {isOpen ? <ExpandLess /> : <ExpandMore />}
          <ListItemText primary={node.name} />
        </ListItem>
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <Box pl={2}>
            {node.children && node.children.map((child) => renderNode(child, level + 1))}
          </Box>
        </Collapse>
        {isOpen && (
          <Typography variant="body2" sx={{ paddingLeft: level * 2 }}>
            {/* {node.price} */}
          </Typography>
        )}
      </React.Fragment>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <Box>
          {[1, 2, 3, 4, 5].map((item) => (
            <Skeleton key={item} variant="rectangular" width="100%" height={40} sx={{ marginBottom: 2 }} />
          ))}
        </Box>
      );
    }
    if (!fetchedData) {
      return <div>No data available.</div>;
    }

    return fetchedData.map((node) => renderNode(node));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row' }}>
      <List className='h-full' sx={{ width: '100%', maxWidth: 360, marginRight: isSmallScreen ? '0' : '80px', marginBottom: isSmallScreen ? '16px' : '0' }}>
        {renderContent()}
      </List>
      {selectedNode && (
        <Box sx={{ flexGrow: 1 }}>
          <AgGridComponent rowData={[selectedNode]} />
        </Box>
      )}
    </Box>
  );
};

export default TreeView;
