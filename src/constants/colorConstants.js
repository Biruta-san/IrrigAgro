import hexToRgba from "hex-to-rgba";

export const MENU_BG_COLOR = "#f6f7f9";
export const MENU_WIDE_WIDTH = "12vw";
export const MENU_WIDE_WIDTH_COLLAPSED = "3.2vw";
export const MENU_TRANSITION = "width 0.5s";

export const MENU_ITEM_BG_COLOR = MENU_BG_COLOR;
export const MENU_ITEM_BG_COLOR_ACTIVE = "#191919";
export const MENU_ITEM_BG_COLOR_HOVER = hexToRgba(MENU_ITEM_BG_COLOR_ACTIVE, 0.5);
export const MENU_ITEM_TEXT_COLOR = "#000";
export const MENU_ITEM_ACTIVE_TEXT_COLOR = "#FFF";
export const MENU_ITEM_ICON_COLOR = "#DD2E44"

export const PASSWORD_ADDON_COLOR = MENU_ITEM_ICON_COLOR;
export const PASSWORD_ADDON_COLOR_HOVER = '#aa2334';
export const PASSWORD_BUTTON_SUBMIT_COLOR = MENU_ITEM_ICON_COLOR;
export const PASSWORD_BUTTON_TEXT_COLOR = MENU_ITEM_ACTIVE_TEXT_COLOR;

export const TABS_TEXT_COLOR = MENU_ITEM_ICON_COLOR;