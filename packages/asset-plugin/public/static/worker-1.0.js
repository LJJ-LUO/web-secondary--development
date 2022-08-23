importScripts(
  // '/static/lib/xlsx.core-0.14.0.min.js',
  '/static/xlsx.full-0.14.0.min.js',
  '/static/promise-worker.register-2.0.0.min.js'
);

function readAsArrayBufferFromFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = event => {
      resolve(event.target.result);
    };
    reader.readAsArrayBuffer(file);
  });
}

function checkFileType(fileContent) {
  if(fileContent.byteLength <= 4) {
    return false;
  }

  const n = new Uint8Array(fileContent.slice(0, 5));
  switch(n[0]) {
    case 0xD0: return true; // BIFF 5/8 or password-protected XLSX/XLSB or WQ3/QPW
		case 0x09: return true; // BIFF 2/3/4/5
		case 0x3C: return true; // SpreadsheetML / Flat ODS / UOS1 / HTML / plain text
		case 0x49: return false; // XLSB or XLSX/M or ODS or UOS2 or plain text
		case 0x54: return false; // SYLK or plain text
		case 0x50: return true; // DIF or plain text
		case 0xEF: return true; // SpreadsheetML / Flat ODS / UOS1 / HTML / plain text
		case 0xFF: if(n[1] === 0xFE) { return true; } break; // SpreadsheetML / Flat ODS / UOS1 / HTML / plain text
		case 0x00: if(n[1] === 0x00 && n[2] >= 0x02 && n[3] === 0x00) return true; break; // Lotus WK* or Quattro Pro or plain text
		case 0x03: case 0x83: case 0x8B: case 0x8C: return true; // RTF or plain text
		case 0x7B: if(n[1] === 0x5C && n[2] === 0x72 && n[3] === 0x74) return true; break; // SpreadsheetML / Flat ODS / UOS1 / HTML / plain text
		case 0x0A: case 0x0D: case 0x20: return true; // SpreadsheetML / Flat ODS / UOS1 / HTML / plain text
  }
  return false;
}

registerPromiseWorker(async message => {
  const { type, payload } = message;
  switch (type) {
    case 'parse-csv': {
      const { input, parseOptions } = payload;
      return neatCsv(input, parseOptions);
    }
    case 'parse-xlsx': {
      const { file } = payload;
      const fileContent = await readAsArrayBufferFromFile(file);
      const valid = checkFileType(fileContent);
      if (!valid) {
        return { $error: '文件格式和扩展名不匹配。' };
      }
      return XLSX.read(fileContent, { type: 'buffer' });
    }
    case 'sheet-to-json': {
      const { sheet, options = { header: 1 } } = payload;
      return XLSX.utils.sheet_to_json(sheet, options);
    }
    default: {
      break;
    }
  }
});
