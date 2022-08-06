import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Paper,
} from '@mui/material';
import React, { useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ScrollableBox from './ScrollableBox';
import { styled } from '@mui/material/styles';

const LeftColumn = styled((props) => <Paper elevation={5} {...props}></Paper>)(
  ({ theme }) => ({
    minWidth: 300,
    width: 300,
    marginRight: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
  })
);

const ColumnBox = ({ children }) =>
  <Box
    sx={{
      m: 0,
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
    }}>
    <ScrollableBox sx={{ flexDirection: 'column' }}>
      {children}
    </ScrollableBox>
  </Box>


const ColumnAccordion = ({ title, children, sx }) => {

  const [expanded, setExpanded] = useState(false);

  const handleChange = (event) => {
    setExpanded(!expanded);
  };

  const accordionStyles = {
    flexShrink: 1,
    mr: 0,
    '& .MuiAccordionSummary-root': {
      pr: 1.3,
    },
    ...sx
  }

  return (
    <Accordion
      expanded={expanded}
      sx={accordionStyles}
      onChange={handleChange}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        {title}
      </AccordionSummary>
      <AccordionDetails>
        {children}
      </AccordionDetails>
    </Accordion>
  );
};

LeftColumn.ColumnBox = ColumnBox;
LeftColumn.ColumnAccordion = ColumnAccordion;

export default LeftColumn;
