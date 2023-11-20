var roh_sc_selectedFields;

if (!roh_sc_fieldClicked) {
  var roh_sc_fieldClicked = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (event.target && (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA')) {
      if (roh_sc_selectedFields.includes(event.target)) {
        roh_sc_selectedFields.splice(roh_sc_selectedFields.indexOf(event.target), 1);
        event.target.classList.remove('roh-sc-selected');
      } else {
        roh_sc_selectedFields.push(event.target);
        event.target.classList.add('roh-sc-selected');
      }
    }

    return false;
  };
}

{
  let style = document.getElementsByClassName('roh-sc-style')[0];
  let head = document.getElementsByTagName('head')[0];
  let body = document.getElementsByTagName('body')[0];
  let fields = getFields(body);

  if (style) {
    copyToClipboard(roh_sc_selectedFields);
    unload(head, body, fields);
  } else {
    roh_sc_selectedFields = [];
    load(head, body, fields);
  }

  function load(head, body, fields) {
    let style = document.createElement('style');
    style.className = 'roh-sc-style';
    style.innerHTML = loadCss();
    head.appendChild(style);

    addEventListeners(fields);
  }

  function unload(head, body, fields) {
    let style = document.getElementsByClassName('roh-sc-style')[0];
    head.removeChild(style);

    removeEventListeners(fields);
  }

  function loadCss() {
    return `
      .roh-sc-selected {
        outline: 2px solid purple;
        outline-offset: 2px;
      }
    `.trim();
  }

  function getFields(body) {
    let inputs = body.getElementsByTagName('input');
    let textareas = body.getElementsByTagName('textarea');

    return [...inputs, ...textareas];
  }

  function addEventListeners(fields) {
    for (let field of fields) {
      field.addEventListener('mousedown', roh_sc_fieldClicked);
    }
  }

  function removeEventListeners(fields) {
    for (let field of fields) {
      field.removeEventListener('mousedown', roh_sc_fieldClicked);
    }
  }

  function copyToClipboard(selectedFields) {
    let values = [];

    for (let selectedField of selectedFields) {
      values.push(selectedField.value);
    }

    navigator.clipboard.writeText(JSON.stringify(values));
  }
}
