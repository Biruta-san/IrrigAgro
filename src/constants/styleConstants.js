import hexToRgba from "hex-to-rgba";

export const MENU_BG_LIGHT_COLOR = "#f6f7f9";
export const MENU_BG_BORDER_LIGHT_COLOR = "#c3c4c5";
export const MENU_BG_BORDER_DARK_COLOR = "#464646";
export const MENU_BG_DARK_COLOR = "#202020";
export const MENU_WIDE_WIDTH = "220px";
export const MENU_WIDE_WIDTH_COLLAPSED = "60px";
export const MENU_TRANSITION = "width 0.5s, margin 0.5s";

export const BG_LIGHT_COLOR = "#FCFCFC";
export const BG_DARK_COLOR = "#191919";

export const MENU_ITEM_BG_LIGHT_COLOR = MENU_BG_LIGHT_COLOR;
export const MENU_ITEM_BG_DARK_COLOR = MENU_BG_DARK_COLOR;
export const MENU_ITEM_BG_LIGHT_COLOR_ACTIVE = "#191919";
export const MENU_ITEM_BG_DARK_COLOR_ACTIVE = "#6c6c6c";
export const MENU_ITEM_BG_LIGHT_COLOR_HOVER = hexToRgba(MENU_ITEM_BG_LIGHT_COLOR_ACTIVE, 0.5);
export const MENU_ITEM_BG_DARK_COLOR_HOVER = hexToRgba(MENU_ITEM_BG_DARK_COLOR_ACTIVE, 0.5);
export const MENU_ITEM_TEXT_LIGHT_COLOR = "#000";
export const MENU_ITEM_TEXT_DARK_COLOR = "#FFF";
export const MENU_ITEM_ACTIVE_LIGHT_TEXT_COLOR = "#FFF";
export const MENU_ITEM_ACTIVE_DARK_TEXT_COLOR = "#000";
export const MENU_ITEM_ICON_COLOR = "#DD2E44"

export const MENU_TEXT_LIGHT_COLOR = "#000";
export const MENU_TEXT_DARK_COLOR = "#FFF";
export const PLACEHOLDER_TEXT_LIGHT_COLOR = "#aaabac";    
export const PLACEHOLDER_TEXT_DARK_COLOR = "#6c6c6c";

export const PASSWORD_ADDON_COLOR = MENU_ITEM_ICON_COLOR;
export const PASSWORD_ADDON_COLOR_HOVER = '#aa2334';
export const PASSWORD_BUTTON_SUBMIT_COLOR = MENU_ITEM_ICON_COLOR;
export const PASSWORD_BUTTON_TEXT_COLOR = MENU_ITEM_ACTIVE_LIGHT_TEXT_COLOR;

export const TABS_TEXT_COLOR = MENU_ITEM_ICON_COLOR;

export const PANEL_LIGHT_COLOR = MENU_BG_LIGHT_COLOR;
export const PANEL_DARK_COLOR = MENU_BG_DARK_COLOR;