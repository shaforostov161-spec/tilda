(() => {
  const GLOBAL_FLAG = '__tildaModsAccordionInit';
  const CONTAINER_FLAG = 'tmAccInit';
  const ITEM_FLAG = 'tmAccItemInit';
  const SELECTOR_CONTAINER = '.tm-acc';
  const SELECTOR_ITEM = '.tm-acc-item';
  const SELECTOR_TRIGGER = '.tm-acc-trigger';
  const SELECTOR_BODY = '.tm-acc-body';

  if (window[GLOBAL_FLAG]) {
    return;
  }
  window[GLOBAL_FLAG] = true;

  const setBodyStyles = (body, isOpen) => {
    if (!body) return;
    if (isOpen) {
      body.style.height = `${body.scrollHeight}px`;
      body.style.opacity = '1';
      window.requestAnimationFrame(() => {
        body.style.height = 'auto';
      });
    } else {
      body.style.height = `${body.scrollHeight}px`;
      body.style.opacity = '0';
      window.requestAnimationFrame(() => {
        body.style.height = '0px';
      });
    }
  };

  const closeItem = (item) => {
    if (!item) return;
    item.classList.remove('is-open');
    const body = item.querySelector(SELECTOR_BODY);
    setBodyStyles(body, false);
  };

  const openItem = (item) => {
    if (!item) return;
    item.classList.add('is-open');
    const body = item.querySelector(SELECTOR_BODY);
    setBodyStyles(body, true);
  };

  const onTransitionEnd = (event) => {
    const body = event.target;
    if (!(body instanceof HTMLElement) || !body.matches(SELECTOR_BODY)) return;
    if (event.propertyName !== 'height') return;
    if (body.style.height === '0px') return;
    if (!body.closest(`${SELECTOR_ITEM}.is-open`)) return;
    body.style.height = 'auto';
  };

  const initItem = (item) => {
    if (!(item instanceof HTMLElement)) return;
    if (item.dataset[ITEM_FLAG]) return;
    item.dataset[ITEM_FLAG] = '1';
    const body = item.querySelector(SELECTOR_BODY);
    const isOpen = item.classList.contains('is-open');
    if (body) {
      body.addEventListener('transitionend', onTransitionEnd);
      if (isOpen) {
        body.style.height = 'auto';
        body.style.opacity = '1';
      } else {
        body.style.height = '0px';
        body.style.opacity = '0';
      }
    }
  };

  const initContainer = (container) => {
    if (!(container instanceof HTMLElement)) return;
    if (container.dataset[CONTAINER_FLAG]) return;
    container.dataset[CONTAINER_FLAG] = '1';

    container.querySelectorAll(SELECTOR_ITEM).forEach(initItem);

    container.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const trigger = target.closest(SELECTOR_TRIGGER);
      if (!trigger || !container.contains(trigger)) return;
      const item = trigger.closest(SELECTOR_ITEM);
      if (!item) return;

      const single = container.getAttribute('data-single') === '1';
      const isOpen = item.classList.contains('is-open');

      if (single) {
        container.querySelectorAll(`${SELECTOR_ITEM}.is-open`).forEach((openItemEl) => {
          if (openItemEl !== item) {
            closeItem(openItemEl);
          }
        });
      }

      if (isOpen) {
        closeItem(item);
      } else {
        openItem(item);
      }
    });
  };

  const init = (root = document) => {
    root.querySelectorAll(SELECTOR_CONTAINER).forEach(initContainer);
  };

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) return;
        if (node.matches(SELECTOR_CONTAINER)) {
          initContainer(node);
        } else if (node.querySelector) {
          init(node);
        }
      });
    });
  });

  const start = () => {
    init(document);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
