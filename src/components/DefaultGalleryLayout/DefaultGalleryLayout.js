import React from 'react';

const styles = {
  wrapper: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    padding: '1rem',
    backgroundColor: '#1E1E1E',
  },
  content: {
    display: 'flex',
    flexDirecetion: 'row',
    height: '100%'
  },
  leftColumn: {
    minWidth: 300,
    width: 300,
    paddingRight: '1rem',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
  },
  rightColumn: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  }
}

const DefaultGalleryLayout = ({ TraitFilterContextConsumer, FiltersLayout, TokensLayout, CurrentFiltersLayout }) =>
  <div style={styles.wrapper}>
    <div style={styles.content}>
      <div style={styles.leftColumn}>
        <FiltersLayout />
      </div>
      <div style={styles.rightColumn}>
        <CurrentFiltersLayout />
        <TokensLayout />
      </div>
    </div>
  </div>


export default DefaultGalleryLayout;