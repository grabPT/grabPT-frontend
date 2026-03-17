import { useEffect } from 'react';

const PORTONE_SCRIPT_SRC = 'https://cdn.iamport.kr/v1/iamport.js';

export const usePortOneScript = () => {
  useEffect(() => {
    let script = document.querySelector<HTMLScriptElement>(`script[src="${PORTONE_SCRIPT_SRC}"]`);

    if (!script) {
      script = document.createElement('script');
      script.src = PORTONE_SCRIPT_SRC;
      script.async = true;
      document.body.appendChild(script);
    }

    return () => {
      if (script?.parentNode === document.body) {
        document.body.removeChild(script);
      }
    };
  }, []);
};
