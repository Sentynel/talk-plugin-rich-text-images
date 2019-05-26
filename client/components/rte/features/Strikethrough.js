import createToggle from '../factories/createToggle';
import { findIntersecting, findAncestor } from '../lib/dom';

const strikethroughTags = ['DEL', 'STRIKE'];

function execCommand() {
  return document.execCommand('strikethrough');
}
function isActive() {
  return this.focused && document.queryCommandState('strikethrough');
}
function isDisabled() {
  if (!this.focused) {
    return false;
  }
  // Disable whenever the strikethrough styling came from a different
  // tag than those we control.
  return !!findIntersecting(
    n =>
      n.nodeName !== '#text' &&
      window.getComputedStyle(n).getPropertyValue('text-decoration') === 'line-through' &&
      !strikethroughTags.includes(n.tagName) &&
      !findAncestor(n, n => strikethroughTags.includes(n.tagName), this.container),
    this.container
  );
}
function onShortcut(e) {
}

const Strikethrough = createToggle(execCommand, { isActive, isDisabled, onShortcut });

Strikethrough.defaultProps = {
  children: 'Strikethrough',
};

export default Strikethrough;
