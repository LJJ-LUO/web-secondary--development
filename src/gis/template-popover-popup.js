import intl from 'react-intl-universal';
/**
 * intl.get('COMM.EPMP')
 */
export const renderPopoverTemplate = ({ title, summary }, callback) => {
  const popoverDiv = document.createElement('div');
  popoverDiv.className = 'popover-popup-content';
  popoverDiv.innerHTML = `
    <div class="popover-title"><h3>${title}</h3></div>
    <div class="popover-content" title="${summary}">${summary}</div>
  `;

  const moreBtn = document.createElement('span');
  moreBtn.className = 'watch-more';
  moreBtn.innerText = intl.get('COMM.SEE');

  const hideBtn = document.createElement('span');
  hideBtn.className = 'hide-popover';
  hideBtn.innerText = intl.get('COMM.IGNORE');
  hideBtn.onclick = () => {
    callback();
  };

  popoverDiv.appendChild(moreBtn);
  popoverDiv.appendChild(hideBtn);

  return popoverDiv;
};
