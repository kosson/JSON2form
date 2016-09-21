/**
 * JSON TO FORM
 */

// OBIECT DE TEST
var objDeTest = {
    "test": [1, 'altceva', true, false, [1, 20, true, ['din interior', false]]],
    "_id" : "56dabb268fcd207c7557e7a5",
    "type" : "Feature",
    "properties" : {
        "connectors" : [
            {
                "connector" : ""
            }
        ],
        "budget" : [
            {
                "year" : "2011",
                "amount" : "12322.45"
            }
        ],
        "services" : {
            "opening_hours" : "",
            "webpage_url" : "http://www.bjastrasibiu.ro",
            "social" : {
                "twitter" : [
                    ""
                ],
                "instagram" : [
                    ""
                ],
                "youtube" : [
                    ""
                ],
                "facebook" : [
                    ""
                ],
                "blogspot" : [
                    ""
                ],
                "wordpress" : [
                    ""
                ]
            },
            "syndication_feeds" : [
                {
                    "name_feed" : "",
                    "url_feed" : "",
                    "_id" : "56dabb268fcd207c7557e7a6"
                }
            ],
            "repository" : [
                {
                    "name" : "",
                    "url" : "",
                    "query_url" : "",
                    "api_url" : ""
                }
            ],
            "catalog" : {
                "url" : "http://www.bjastrasibiu.ro/Liberty3/gateway/gateway.exe?application=Liberty3&amp;displayform=opac/main",
                "query_url" : "",
                "api_url" : ""
            }
        },
        "identifiers" : {
            "code_zone" : 7,
            "code_county" : 32,
            "code_siruta" : 143450,
            "LMI" : ""
        },
        "address" : [
            {
                "loc" : "Sibiu",
                "street" : "George Barițiu, Nr. 5-7",
                "postal_code" : "",
                "obs" : "",
                "date" : "2016-03-05T10:55:34.175Z"
            }
        ],
        "qualifiers" : {
            "is_branch" : false,
            "is_city" : false,
            "is_county" : true,
            "is_municipal" : false,
            "is_museum" : false,
            "is_national" : false,
            "is_school" : false,
            "is_university" : false,
            "is_village" : false,
            "testInqualif": [1, 'altceva', true, false, [1, 20, true, ['din interior', false]]]
        },
        "name" : [
            {
                "official_name" : "Biblioteca Județeană „Astra”",
                "name_mark" : "Astra",
                "date" : "2016-03-05T10:55:34.175Z"
            }
        ]
    },
    "geometry" : {
        "type" : "Point",
        "coordinates" : [
            24.14625,
            45.793396
        ]
    },
    "__v" : 0
};

/**
 * O funcție care generează checkbox-uri
 * @param  {boolean} boolean primește valoarea booleană
 * @param  {object} form     obiectul formular primit
 * @return {object} form     formular îmbogățit cu un checkbox
 */
function checkBoxGen(boolean, key, form){
  // creează un checkbox generic
  let checkbox = document.createElement('input'),
      label    = document.createElement('label'),
      labelIn  = document.createTextNode(key);
  checkbox.type = 'checkbox';
  checkbox.id = key;
  label.appendChild(labelIn);

  if(boolean === true){
    // generează un checkbox cu checked
    checkbox.setAttribute('checked', 'checked');
    checkbox.setAttribute('value', 'true');
    form.appendChild(label);
    form.appendChild(checkbox);
  };
  if(boolean === false){
    // generează un checkbox fără checked
    checkbox.setAttribute('value', 'false');
    form.appendChild(label);
    form.appendChild(checkbox);
  };
  return form;
};

/**
 * Preia un obiect a cărui valoare este un string, un nr sau un boolean.
 * Construiește un input tip text sau checkbox
 * @param  {object} v   valoarea un obiect cu o singură pereche k:v
 * @param  {string} k   numele cheii a pentru acea valoare
 * @param  {object} form obiectul form la care se adaugă input
 * @return {object} form form îmbogățit cu un input
 */
function kv2input(v, k, form){
  // discriminează între inputurile string/number și boolean
  if(typeof v === 'number' || typeof v === 'string'){
    var input    = document.createElement('input'), // 1. creează input-ul
        inputIn  = document.createTextNode(v),      // 2. ce conține input
        label    = document.createElement('label'), // 3. creează label
        labelIn  = document.createTextNode(k);      // 4. ce conține label

    input.type  = 'text';             // 5. definește tip text
    input.id    = v;                  // 6. pune id
    input.setAttribute('name', k);    // 7. pune nameval
    input.setAttribute('value', v);   // 8. pune value
    input.className = 'kv2input';     // 9. pune-i clasă

    input.appendChild(inputIn);       // 10. adaugă conținut în input
    label.appendChild(labelIn);       // 11. adaugă conținut în label
    form.appendChild(label);          // 12. adaugă label în form primit
    form.appendChild(input);          // 13. adaugă input în form primit
  } else if(typeof v === 'boolean'){
    form = checkBoxGen(v, k, form);
  };
  return form;
};

/**
 * Primește obiectele care sunt ca valori k:{} sau k:[]
 * @param {object} obj  este un obiect sau un array cu obiecte
 * @param {string} k    numele cheii a cărei valoare a fost primită ca obj
 * @param {object} hook returnează obiectul DOM gazdă pentru fieldset-uri
 */
function obj2fieldset(obj, k, hook){
  let fieldset = document.createElement('fieldset'),
      legend = document.createElement('legend'),
      legendIn = document.createTextNode(k);

  fieldset.appendChild(legend);
  legend.appendChild(legendIn);

  for(let prop in obj) {
    if(typeof obj[prop] === 'object'){
      hook.appendChild(obj2fieldset(obj[prop], prop, fieldset));
    } else{
      hook.appendChild(kv2input(obj[prop], prop, fieldset));
    };
  };

  return hook;
};

/**
 * Primește un obiect pe care-l transformă într-un formular
 * @param  {object} obj obiect JSON
 * @param  {string} id  id-ul elementului unde se va injecta formularul
 */
function objToForm(obj, hook, id){
  var targetInDOM = document.getElementById(hook),    // 1. punct de atașare în DOM
      form = document.createElement('form');          // 2. FORM-ul gazdă - constructie
  form.id = id;                                       // 3. introdu id-ul furnizat de apelant

  for (var prop in obj) {                             // 4. CICLEAZĂ OBIECTELE care sunt ca valori
    // DOAR PENTRU PROPRIETĂȚILE PERSONALE
    if (obj.hasOwnProperty(prop)) {
                                                      // 5. obj[prop] --> [string/number/boolean]
      if(typeof obj[prop] === 'string' || typeof obj[prop] === 'number' || typeof obj[prop] === 'boolean'){
        form = kv2input(obj[prop], prop, form);       // 6. formul este suprascris cu varianta îmbogățită
      };

      if(typeof obj[prop] === 'object'){              // 7. obj[prop] --> OBJECT k:v[object]
        let div = document.createElement('div');      // 8. conținutul obj și array ca valori, vor fi div-uri
        div.id = prop;                                // 9. setează id-ul cu numele cheii
        div.className = 'frmContent';                 // 10. numele clasei este hardcodată

        div = obj2fieldset(obj[prop], prop, div);     // 11.div-ul este suprascris cu varianta îmbogățită

        form.appendChild(div);                        // 12. injectează div-urile înapoi în form
      };
    };
  };
  targetInDOM.appendChild(form);                      // 13. injectează formularul în DOM
};

objToForm(objDeTest, 'inputDataTable', 'exodus');
