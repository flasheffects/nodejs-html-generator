const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs")
const data = require("./data/data.json");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

const port = process.env.PORT || 3000;

app.listen(`${port}`, () => {
    console.log("Server running at port " + `${port}`);
});


//////////  Production  //////////////////////
//////////////////////////////////////////////

app.use(express.static(__dirname + "/client/"));

//////////  Generator  ///////////////////////
//////////////////////////////////////////////
let {
    id: rootElementId, name: root, settings: {}, type: rootElementType,
    children: [{
        id: sectionId, name: section, settings: sectionSettings, type: sectionType,
        children: [{
            id: columnId, name: column, settings: columnSettings, type: columnType,
            children: [{id: headingId, name: heading, settings: headingSettings, type: headingType, children: []}]
        }]
    }]
} = data;

//////////  Template  ////////////////////////
//////////////////////////////////////////////

let template = ` <!DOCTYPE html>
 <html lang="en">
    <head> 
    </head>
    <body id="root">   
     <section class="section">
      <div class="column">
        <h1 class="heading">
 ${headingSettings.text}
</h1>
</div> 
</section>
</body>
</html> `

//////////  End Template  ////////////////////
//////////////////////////////////////////////

////////// End Generator  ////////////////////
//////////////////////////////////////////////

//////////  Method GET   /////////////////////
//////////////////////////////////////////////

app.get('/', async (req, res) => {
    fs.writeFile(__dirname + '/client/index.html', template, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
    return res.status(200).send(template)
})

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "index.html"));
});

//////////  End Production  //////////////////
//////////////////////////////////////////////


