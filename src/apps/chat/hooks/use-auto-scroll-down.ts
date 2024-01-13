import { useEffect } from 'react';
import { scrollToBottom } from '../../../utils/scroll-to-bottom';

export const useAutoScrollDown = () => {
  useEffect(() => {
    const target = document.querySelector('#root');

    if (target) {
      const callback: MutationCallback = (mutationsList) => {
        for (let mutation of mutationsList) {
          if (mutation.type === 'childList') {
            scrollToBottom();
          }
        }
      };

      const observer = new MutationObserver(callback);

      observer.observe(target, { childList: true, subtree: true });

      return () => {
        observer.disconnect();
      };
    }
  }, []);
};
