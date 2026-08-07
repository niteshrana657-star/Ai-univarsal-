/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * UI Framework Module
 * Exports
 * File: index.ts
 * -------------------------------------------------------------
 */

export {
  default as UIManager
} from "./UIManager";

export type {
  ThemeMode,
  UITheme,
  UILayout
} from "./UIManager";

export {
  default as ThemeManager,
  ThemeType
} from "./ThemeManager";

export type {
  ThemeConfig
} from "./ThemeManager";

export {
  default as LayoutManager,
  LayoutType
} from "./LayoutManager";

export type {
  LayoutConfig
} from "./LayoutManager";

export {
  default as AnimationManager,
  AnimationType
} from "./AnimationManager";

export type {
  AnimationConfig
} from "./AnimationManager";

export {
  default as ComponentRegistry
} from "./ComponentRegistry";

export type {
  UIComponent
} from "./ComponentRegistry";
