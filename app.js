'use strict';

/**
 * REQUIRE - DEPENDINȚE
 */
var express     = require('express'),
    app         = express();

app.use(express.static('frontend')); // setarea caii către fișierele statice (fisiere

app.listen(3000, function(){
  console.log('Server pornit pe 3000');;
});
