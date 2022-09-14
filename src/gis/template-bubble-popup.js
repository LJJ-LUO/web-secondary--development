export const renderTemplate = data => {
  const { form = [], table = [] } = data;
  let formElements = [];
  let tableElement = '';
  if (form.length > 0) {
    formElements = form.map(
      form => `<p><span>${form.label}: </span><span>${form.value}</span></p>`
    );
  }
  formElements = formElements.join('');

  if (table.length > 0) {
    let rowElements = table.map(row => {
      let spans = row.map(item => `<span>${item}</span>`).join('');
      return `<p>${spans}</p>`;
    });
    rowElements = rowElements.join('');
    tableElement = `<div>${rowElements}</div>`;
  }

  return `<div><div>${formElements}</div><div>${tableElement}</div></div>`;
};
