import React, { Fragment, useContext, useState } from 'react';

import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeGrid } from 'react-window';
import TraitFilterContext from 'contexts/TraitFilterContext';

const TokenImage = ({ width, token, onClick, showTokenName = false }) => {
  const styles = {
    image: {
      borderRadius: '0.5rem'
    },
    wrapper: {
      position: 'relative',
      display: 'inline-block'
    },
    tokeName: {
      position: 'absolute',
      top: '0.75rem',
      left: '0.75rem'
    }
  }

  return (
    <div style={styles.wrapper}>
      {showTokenName && <div style={styles.tokeName}>
        {token.name}
      </div>}
      <img
        width={width}
        height="auto"
        src={token.image}
        alt={token.name}
        crossOrigin="anonymous"
        {...(onClick
          ? {
            onClick,
            style: {
              ...styles.image,
              cursor: 'pointer'
            }
          }
          : {
            style: styles.image
          })} />
    </div>
  )
}

const BasicModal = ({ imageWidth, token, onClose }) => {
  const styles = {
    modal: {
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 9999,
      background: 'rgb(25 25 25 / 80%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    content: {
      borderRadius: 3,
      padding: '3rem',
      paddingTop: '2rem',
      background: '#523878'
    },
    attributes: {
      padding: '0 0 0 2rem'
    }
  }
  return (
    <div style={styles.modal}>
      <div style={styles.content}>
        <div style={{ textAlign: 'right', paddingBottom: '0.5rem' }}>
          <a href="#" style={{ textDecoration: 'none', color: 'white' }} onClick={onClose}>Close</a>
        </div>
        <h3 style={{ textAlign: 'left' }}>{token.name}</h3>
        <div style={{ display: 'flex' }}>
          <TokenImage
            width={imageWidth}
            token={token} />
          <div style={styles.attributes}>
            <h3>Attributes</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {token.attributes.map(({ trait_type, value }) =>
                <li key={`${trait_type}:${value}`}>
                  {trait_type} - {value}
                </li>)}
            </ul>
          </div>
        </div>
      </div>
    </div >
  )
}

const DefaultTokensLayout = () => {
  const ROW_GUTTER = 20;
  const COLUMN_GUTTER = 20;
  const CARD_WIDTH = 250;
  const CARD_HEIGHT = 290;

  const { filteredTokens } = useContext(TraitFilterContext)
  const [selectedToken, setSelectedToken] = useState({});
  const [open, setOpen] = useState(false);
  const showModal = () => setOpen(true);
  const hideModal = () => setOpen(false);

  const onSelect = (token) => {
    showModal();
    setSelectedToken(token);
  }

  return (
    <Fragment>
      {open && <BasicModal imageWidth={CARD_WIDTH} token={selectedToken} onClose={hideModal} />}
      {<AutoSizer>
        {({ height, width }) => {
          const columnCount = Math.floor(width / (CARD_WIDTH + COLUMN_GUTTER));
          const rowCount = Math.ceil(filteredTokens.length / columnCount);

          return (
            <FixedSizeGrid
              columnCount={columnCount}
              columnWidth={width / columnCount}
              height={height}
              rowCount={rowCount}
              rowHeight={CARD_HEIGHT + ROW_GUTTER}
              width={width}
            >
              {({ columnIndex, rowIndex, style }) => {
                const token = filteredTokens[rowIndex * columnCount + columnIndex];

                if (!token) {
                  return null;
                }

                return (
                  <div style={style}>
                    <TokenImage
                      key={token.name}
                      width={CARD_WIDTH}
                      token={token}
                      onClick={() => onSelect(token)}
                      showTokenName={true} />
                  </div>
                );
              }}
            </FixedSizeGrid>
          );
        }}
      </AutoSizer>}
    </Fragment>
  )
}
export default DefaultTokensLayout;