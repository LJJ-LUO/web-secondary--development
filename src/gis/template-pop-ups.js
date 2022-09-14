import intl from 'react-intl-universal';
/**
 * video{intl.get('COMM.VIDEO_PLAYBACK')}
 * @param {{intl.get('COMM.VAF')}} columns
 * @param {{intl.get('COMM.DATA_CONTENT')}} data
 */
function playVideo(columns, data) {
  let result = data.filter(k =>
    columns.find(v => v.value === k.label || v.label === k.label)
  );

  const url = result[0]?.value;
  const rtspReg = /^rtsp:\/\//gi;
  const videoReg = /\.(mp4|webm|ogg|m3u8)$/gi;
  const rtmpReg = /^(rtmp:\/\/)/gi;

  if (url && rtspReg.test(url)) {
    return `<object rtspurl="${url}" classid="clsid:067A4418-EBAC-4394-BFBE-8C533BA6503A" id="h3c_IMOS_ActiveX" events="true" width="100%"></object>`;
  } else if (url && (videoReg.test(url) || rtmpReg)) {
    return `<div style="width: 100%"><iframe width="100%" height="400" src="/player.html?url=${url}"></iframe></div>`;
  }

  return null;
}

const pageSize = 10;

export const getTemplate1 = (
  data,
  width,
  height,
  attach,
  fontSize,
  detail = {}
) => {
  let { hIndex } = detail;
  if (!data) {
    return `<div class="pop-up-text">${intl.get(
      'analysis.map.asset.warn'
    )}</div>`;
  }
  const { form = [], table = [] } = data;
  const total_page = Math.ceil((table.length - 1) / 10);

  let isVideo = [];
  let isTitle = [];
  let isChain = [];
  let isLink = [];
  (attach || []).forEach(e => {
    if (e.isVideo && e.isVideo === '2') {
      isVideo.push(e);
    } else if (e.isTitle && e.isTitle === '2') {
      isTitle.push(e);
    } else if (e.isChain && e.isChain === '2') {
      isChain.push(e);
    } else if (e.isLink && e.isLink === '2') {
      isLink.push(e);
    }
  });
  let formElements = [];
  let videoHTML = '';
  let headerElement = '';
  let bodyElement = '';
  let titleElements = '';
  const linkIndex = [];
  const header = table[0] || [];
  header.forEach((label, index) => {
    if (isLink.find(link => link.label === label)) {
      linkIndex.push(index);
    }
  });

  if (isTitle.length) {
    let titleForms = form.filter(e => isTitle.find(k => k.label === e.label));
    titleElements += titleForms.map(m => `<h5>${m.value || ''}</h5>`).join('');
  }

  if (form.length > 0) {
    let videoHTML = isVideo.length && playVideo(isVideo, form);

    if (videoHTML) {
      formElements = videoHTML;
    } else {
      formElements = form
        .filter(
          e =>
            !isTitle.find(k => k.label === e.label) &&
            !isChain.find(k => k.label === e.label)
        )
        .map(form => {
          const link =
            isLink.length && isLink.find(k => k.label === form.label);

          if (link) {
            return `<div class="pop-up-form-item"><span class="form-label" title="${
              form.value
            }"><span><a href="${
              form.value
            }" style="color: #20fdfa; text-decoration: underline;">${intl.get(
              'COMM.DETAILS'
            )}</a></span></div>`;
          }

          return `<div class="pop-up-form-item"><span class="form-label" title="${
            form.label
          }">${form.label ||
            ''}:${'    '}</span><span class="form-value">${form.value ||
            ''}</span></div>`;
        });
      formElements = formElements.join('');
    }
  }
  const linkReg = /([\s\S]*)\[([^\]]*)\]/g;
  const createTableElement = page => {
    let rowElements = table
      .slice((page - 1) * pageSize + 1, page * pageSize + 1)
      .map(row => {
        let tds = row.map((item, index) => {
          if (linkIndex.includes(index)) {
            if (typeof item === 'string') {
              let regRes = [...item.matchAll(linkReg)];
              if (regRes.length) {
                let text = regRes[0][1];
                let href = regRes[0][2] ? regRes[0][2] : '';
                return `<td><a href='${href}' target='_blank' class='pop-up-table-link'>${text}</a></td>`;
              } else {
                return `<td>${item || ''}</td>`;
              }
            } else {
              return `<td>${item || ''}</td>`;
            }
          }
          return `<td>${item || ''}</td>`;
        });
        tds = tds.join('');
        return `<tr>${tds}</tr>`;
      });
    return rowElements.join('');
  };

  if (table.length > 0) {
    let data = table[0].map((item, index) => ({
      label: item,
      value: table[1][index],
    }));
    let videoHTML = isVideo.length && playVideo(isVideo, data);

    if (!videoHTML) {
      headerElement = table.slice(0, 1).map(row => {
        let ths = row.map(item => `<th>${item || ''}</th>`);
        ths = ths.join('');
        return `<tr>${ths}</tr>`;
      });

      bodyElement = createTableElement(1);
    }
  }

  const changePage = status => {
    const now_page = document.querySelector(
      `.pop-up-pagination-${hIndex} .page`
    );
    const tbody = document.querySelector(
      `.pop-up-table-${hIndex} >table>.tbody`
    );
    let now = Number(now_page.innerHTML);
    let next = now;
    if (status === 'prev') {
      next = now - 1;
      if (next < 1) {
        next = now;
      }
    } else {
      next = now + 1;
      if (next > total_page) {
        next = now;
      }
    }
    now_page.innerText = next;
    let bodyElement = createTableElement(next);
    tbody.innerHTML = bodyElement;
  };

  const H = height - 105;

  const popDiv = document.createElement('div');
  popDiv.style = `height: ${
    H <= 0 ? 'auto' : `${H}px`
  }; overflow: auto; margin-top: 20px; font-size: ${fontSize || 16}px`;

  const titleDiv = document.createElement('div');
  titleDiv.className = 'pop-up-title';
  titleDiv.innerText = titleElements;

  const formDiv = document.createElement('div');
  formDiv.className = `pop-up-form ${width <= 400 ? 'small-popup' : ''}`;
  formDiv.innerHTML = formElements;

  const tableDiv = document.createElement('div');
  tableDiv.className = `pop-up-table pop-up-table-${hIndex}`;
  if (videoHTML) {
    tableDiv.innerHTML = videoHTML;
  } else {
    tableDiv.innerHTML = `<table><thead>${headerElement}</thead><tbody class='tbody'>${bodyElement}</tbody> </table>`;
  }

  const paginationDiv = document.createElement('div');
  paginationDiv.className = ` pop-up-pagination pop-up-pagination-${hIndex}`;

  const prevBtn = document.createElement('button');
  prevBtn.className = 'prev';
  prevBtn.innerText = intl.get('COMM.PREVIOUS_PAGE');
  prevBtn.onclick = () => {
    changePage('prev');
  };

  const pageSpan = document.createElement('span');
  pageSpan.className = 'page';
  pageSpan.innerText = 1;

  const nextBtn = document.createElement('button');
  nextBtn.className = 'next';
  nextBtn.innerText = intl.get('COMM.NEXT_PAGE');
  nextBtn.onclick = () => {
    changePage('next');
  };

  const totalDiv = document.createElement('span');
  totalDiv.className = 'total_page';
  totalDiv.innerText = `${intl.get('REPO.TOTAL')}${total_page}页`;

  paginationDiv.appendChild(prevBtn);
  paginationDiv.appendChild(pageSpan);
  paginationDiv.appendChild(nextBtn);
  paginationDiv.appendChild(totalDiv);

  popDiv.appendChild(titleDiv);
  popDiv.appendChild(formDiv);
  popDiv.appendChild(tableDiv);

  if (bodyElement !== '' && total_page > 1) {
    popDiv.appendChild(paginationDiv);
  }

  return popDiv;
};
