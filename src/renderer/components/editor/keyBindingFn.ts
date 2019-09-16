import { getDefaultKeyBinding, KeyBindingUtil } from "draft-js";

const { hasCommandModifier } = KeyBindingUtil;
export function editorKeyBindingFn(e: any) {
  if (
    e.ctrlKey &&
    e.keyCode === 13 &&
    hasCommandModifier(e) /* `command + enter` key */
  ) {
    return "split-block";
  }
  if (e.keyCode === 13 /* `enter` key */) {
    return "log";
  }

  return getDefaultKeyBinding(e);
}
