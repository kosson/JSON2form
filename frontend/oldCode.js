function arrToForm(arr, prop, fieldset){

  for(var i = 0, y = arr.length; i < y; i++){

    if(typeof arr[i] === 'number' || typeof arr[i] === 'string'){
      var fInputTxt   = document.createElement('input');
      fInputTxt.type  = 'text';
      fInputTxt.id    = prop;                 // pune id
      fInputTxt.className = 'dynArrElemNo';
      fInputTxt.setAttribute('name', arr[i]);   // pune name
      fInputTxt.setAttribute('value', arr[i]);  // pune value
    };

    if(arr[i] === true){
      var fInputChkBx1  = document.createElement('input'),
          // fInputChkBxTxt = document.createTextNode(arr[i]),
          fInputChkBxLab = document.createElement('label')
          fInputChkBxLabTxt = document.createTextNode(i)
          ;

      fInputChkBx1.type = 'checkbox';
      // fInputChkBx1.id = prop;
      // fInputChkBx1.className = 'dynArrElemChk1';
      fInputChkBx1.setAttribute('checked', 'checked');
      fInputChkBx1.setAttribute('value', 'true');

      fInputChkBxLab.appendChild(fInputChkBxLabTxt);
      fInputChkBx1.appendChild(fInputChkBxTxt);
      fInputChkBx1.appendChild(fInputChkBxLab);

      fieldset.appendChild(fInputChkBx1);
    };

    if(arr[i] === false){
      var fInputChkBx  = document.createElement('input');
      fInputChkBx.type = 'checkbox';
      fInputChkBx.className = 'dynArrElemChk0';
      fInputChkBx.setAttribute('value', 'false');
      fieldset.appendChild(fInputChkBx);
    };

    if(arr[i] === undefined){
      var fInputChkBx  = document.createElement('input');
      fInputChkBx.className = 'dynArrElemChk0';
      fInputChkBx.type = 'text';
      fInputChkBx.setAttribute('value', 'false');
      fieldset.appendChild(fInputChkBx);
    };

    if(Array.isArray(arr[i])){
      fieldset.appendChild(arrToForm(arr[i], form));
    };

    return fieldset;
  };
};

function objToForm(obj, divId){

  // SETARI INIȚIALE PENTRU GENERAREA FORM-ULUI
  var targetInDOM = document.getElementById(divId);

  for (var prop in obj) {

    /**
     * OBIECT --> fieldset
     * pentru fiecare proprietate din obiect, creează un fieldset cu legend
     */
    var fFieldset   = document.createElement('fieldset'),
        fLegend     = document.createElement('legend'),
        fLegendTxt  = document.createTextNode(prop),
        fInForm     = document.createElement('form');

    fFieldset.id = prop;
    fLegend.appendChild(fLegendTxt);
    fFieldset.appendChild(fLegend);

    if (obj.hasOwnProperty(prop)) {           // obj[prop] ESTE obiectul unic JSON

      // ARRAY SIMPLU DE VALORI
      // if(Array.isArray(obj[prop])){
      //   fInForm.appendChild(arrToForm(obj[prop], prop, fFieldset));
      // };

      // STRING
      if(typeof obj[prop] === 'string'){
        fFieldset.appendChild(propsToInputs(obj[prop], prop, fInForm));
      };

      // NUMBER
      if(typeof obj[prop] === 'number'){
        fFieldset.appendChild(propsToInputs(obj[prop], prop, fInForm));
      };

      // BOOLEAN
      if(typeof obj[prop] === 'boolean'){
        fFieldset.appendChild(propsToInputs(obj[prop], prop, fInForm));
      };

      // OBJECT
      if(typeof obj[prop] === 'object'){
        targetInDOM.appendChild(propObjsToInputs(obj[prop], fFieldset));
      };

      targetInDOM.appendChild(fInForm);
    };
  };


  function propObjsToInputs(object, fieldset){

    for (var key in object) {

      // pentru fiecare proprietate din obiectul primit, creează un fieldset
      var inForm = document.createElement('form'),            // creează un form
          inFieldset   = document.createElement('fieldset'),  // creează un fieldset
          inLegend     = document.createElement('legend'),    // creează un legend
          inLegendTxt  = document.createTextNode(key);        // creează text din valoarea key
      inFieldset.id = key;                                    // dă-i id lui fieldset
      inLegend.appendChild(inLegendTxt);                      // în legend pui textul legend
      inFieldset.appendChild(inLegend);                       // în fieldset pui legend

      // OBJECT
      if(typeof object[key] === 'object'){
        inFieldset = propObjsToInputs(object[key], inFieldset);
        fieldset.appendChild(inFieldset);
      }

      // BOOLEAN
      if(typeof object[key] === 'boolean' || (object[key] === true || object[key] === true)){
        inFieldset.appendChild(propsToInputs(object[key], key, inForm));
      };

      if(Array.isArray(object[key])) {
      //  inFieldset.appendChild(propsToInputs(object[key], key, inForm));
      //  inFieldset.appendChild(propObjsToInputs(object[key], inFieldset));
       inFieldset.appendChild(arrToForm(object[key], key, inFieldset));
      }

      // else {
      //   inFieldset.appendChild(propsToInputs(object[key], key, inForm));
      // }

      fieldset.appendChild(inFieldset);
    };
    return fieldset;
  };

  function propsToInputs(val, nProp, fInForm){

    // BOOLEAN
    if(typeof val === 'boolean' || (val === 'true' || val === 'false')){
      if(val === true){
        var fInputChkBx1  = document.createElement('input');
        fInputChkBx1.type = 'checkbox';
        fInputChkBx1.className = 'dynArrElemChk1';
        fInputChkBx1.setAttribute('checked', 'checked');
        fInputChkBx1.setAttribute('value', val);
        fInForm.appendChild(fInputChkBx1);
      } else if(val === 'false' || val === false){
        var fInputChkBx0  = document.createElement('input');
        fInputChkBx0.type = 'checkbox';
        fInputChkBx0.className = 'dynArrElemChk0';
        fInputChkBx0.setAttribute('value', val);
        fInForm.appendChild(fInputChkBx0);
      };
    } else {
      var fInputTxt   = document.createElement('input'),
          fInputCont  = document.createTextNode(val),
          fLabel      = document.createElement('label'),
          fLabelCont  = document.createTextNode(nProp);

      fInputTxt.type  = 'text';
      fInputTxt.id    = val;                 // pune id
      fInputTxt.setAttribute('name', nProp);   // pune nameval
      fInputTxt.setAttribute('value', val);  // pune value
      fInputTxt.className = 'dynInputsFrm';

      fInputTxt.appendChild(fInputCont);
      fLabel.appendChild(fLabelCont);
      fInForm.appendChild(fLabel);
      fInForm.appendChild(fInputTxt);
    };

    return fInForm;
  };

};

objToForm(objDeTest, 'inputDataTable'); // PASEZI OBICTUL ȘI DIVUL TARGETAT
