import React, { createContext, useState, useContext, useEffect } from 'react';
import { setCookie,parseCookies } from 'nookies';
import { isNotNullOrEmpty } from '../../utils/validate';

const ColorModeContext = createContext();

export const ColorModeProvider = ({ children }) => {
  const [colorMode, setColorMode] = useState('red.500');

  useEffect(() => {
    const cookies = parseCookies();

    isNotNullOrEmpty(cookies.colorMode) ? setColorMode(cookies.colorMode) : setColorMode('red.500');

  }, []);

    const setColorModeOnCookie = (color) => {
        setColorMode(color);
        setCookie(null, 'colorMode', color, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
        });
    }

  return (
    <ColorModeContext.Provider value={{ colorMode, setColorMode: setColorModeOnCookie }}>
      {children}
    </ColorModeContext.Provider>
  );
};

export const useColorModeValue = () => useContext(ColorModeContext);