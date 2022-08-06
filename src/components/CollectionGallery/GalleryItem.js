import { Backdrop, Box, Fade, Modal, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';

import LabelStack from 'components/LabelStack';
import SelectableMedia from 'components/SelectableMedia';

const ellipseAddress = (address = "", width = 10) => `${address.slice(0, width)}...${address.slice(-width)}`;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center'
};

const GalleryItem = ({ token }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <SelectableMedia
        key={token.name}
        selected={false}
        title={token.name}
        imageUrl={token.image}
        imageAlt={token.name}
        onSelect={handleOpen}
      />
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box sx={{ p: 2 }}>
              <SelectableMedia
                key={token.name}
                selected={false}
                imageUrl={token.image}
                imageAlt={token.name}
              />
            </Box>
            <Box sx={{ p: 2, pl: 4, pr: 4 }}>
              <LabelStack sx={{ mb: 1 }} label="Name" content={token.name} />
              <LabelStack sx={{ mb: 1 }} label="Image URL" content={token.image} />
              <LabelStack sx={{ mb: 1 }} label="DNA" content={
                <Tooltip title={btoa(token.dna)}>
                  <Typography component="span">{ellipseAddress(btoa(token.dna), 5)}</Typography>
                </Tooltip>
              } />
            </Box>
            <Box sx={{ p: 2 }}>
              <Typography variant="overline">Attributes</Typography>
              {token.attributes.map(({ trait_type, value }) => <LabelStack key={`${trait_type}:${value}`} sx={{ mb: 1 }} label={trait_type} content={value} />)}
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}

export default GalleryItem;