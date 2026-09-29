import React, { createContext, useContext, useState } from 'react';

const ShowroomContext = createContext(null);

export function ShowroomProvider({ children }) {
  const [activeProductDetail, setActiveProductDetail] = useState(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);

  const openProductDetail = (product) => {
    setActiveProductDetail(product);
    document.body.style.overflow = 'hidden';
  };

  const closeProductDetail = () => {
    setActiveProductDetail(null);
    document.body.style.overflow = '';
  };

  return (
    <ShowroomContext.Provider
      value={{
        activeProductDetail,
        openProductDetail,
        closeProductDetail,
        activeVideoIndex,
        setActiveVideoIndex,
        searchOpen,
        setSearchOpen
      }}
    >
      {children}
    </ShowroomContext.Provider>
  );
}

export function useShowroom() {
  const ctx = useContext(ShowroomContext);
  if (!ctx) throw new Error('useShowroom must be used within ShowroomProvider');
  return ctx;
}
