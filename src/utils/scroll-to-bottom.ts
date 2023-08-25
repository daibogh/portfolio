import { throttle } from 'lodash';
function _scrollToBottom() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth',
  });
}

export const scrollToBottom = throttle(_scrollToBottom, 1000);
