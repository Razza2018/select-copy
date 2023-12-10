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
    pasteFromClipboard(roh_sc_selectedFields);
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

    let background = document.createElement('div');
    background.className = 'roh-sc-background';
    body.appendChild(background);

    addEventListeners(fields);
  }

  function unload(head, body, fields) {
    removeSelection(roh_sc_selectedFields);

    let style = document.getElementsByClassName('roh-sc-style')[0];
    head.removeChild(style);

    let background = document.getElementsByClassName('roh-sc-background')[0];
    body.removeChild(background);

    removeEventListeners(fields);
  }

  function loadCss() {
    return `
      .roh-sc-background {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: #000;
        opacity: 0.5;
        z-index: 500000;
      }

      input,
      textarea {
        z-index: 500001 !important;
        cursor: pointer;
      }

      .roh-sc-selected {
        background-color: #ffaa00;
      }
    `.trim();
  }

  function getFields(body) {
    let inputs = body.getElementsByTagName('input');
    let textareas = body.getElementsByTagName('textarea');

    return [...inputs, ...textareas];
  }

  function removeSelection(fields) {
    for (let field of fields) {
      field.classList.remove('roh-sc-selected');
    }
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

  async function pasteFromClipboard(selectedFields) {
    let clipboardContent = await navigator.clipboard.readText();
    let values = JSON.parse(clipboardContent);
    let focusEvent = new Event('focus');
    let inputEvent = new Event('input');
    let changeEvent = new Event('change');
    let blurEvent = new Event('blur');

    if (Array.isArray(values)) {
      if (values.length === selectedFields.length) {
        for (let i = 0; i < selectedFields.length; i++) {
          selectedFields[i].dispatchEvent(focusEvent);
          selectedFields[i].value = values[i];
          selectedFields[i].dispatchEvent(inputEvent);
          selectedFields[i].dispatchEvent(changeEvent);
          selectedFields[i].dispatchEvent(blurEvent);
        }
      }
    }
  }
}
