import React, { createContext, useState, useContext, useEffect } from 'react';
import { setCookie,parseCookies } from 'nookies';
import { isNotNullOrEmpty } from '../../utils/validate';
import { MENU_ITEM_ICON_COLOR } from '../../constants/colorConstants';


const ColorModeContext = createContext();

export const ColorModeProvider = ({ children }) => {
  const [colorMode, setColorMode] = useState(MENU_ITEM_ICON_COLOR);

  useEffect(() => {
    const cookies = parseCookies();
    isNotNullOrEmpty(cookies.colorMode) ? setColorMode(cookies.colorMode) : setColorMode(MENU_ITEM_ICON_COLOR);

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