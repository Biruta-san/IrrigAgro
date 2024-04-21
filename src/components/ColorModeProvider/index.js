import React, { createContext, useState, useContext, useEffect } from 'react';
import { setCookie, parseCookies } from 'nookies';
import { isNotNullOrEmpty } from '../../utils/validate';
import { MENU_ITEM_ICON_COLOR } from '../../constants/styleConstants';


const ColorModeContext = createContext();

export const ColorModeProvider = ({ children }) => {
  const [colorMode, setColorMode] = useState(MENU_ITEM_ICON_COLOR);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const cookies = parseCookies();
    isNotNullOrEmpty(cookies.colorMode) ? setColorMode(cookies.colorMode) : setColorMode(MENU_ITEM_ICON_COLOR);
    isNotNullOrEmpty(cookies.theme) ? setTheme(cookies.theme) : setTheme('light');
  }, []);

  const setColorModeOnCookie = (color) => {
    setColorMode(color);
    setCookie(null, 'colorMode', color, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
  }

  const setThemeOnCookie = (theme) => {
    setTheme(theme);
    setCookie(null, 'theme', theme, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
  }

  return (
    <ColorModeContext.Provider value={{ colorMode, setColorMode: setColorModeOnCookie, theme, setTheme: setThemeOnCookie }}>
      {children}
    </ColorModeContext.Provider>
  );
};

export const useColorModeValue = () => useContext(ColorModeContext);