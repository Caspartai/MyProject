/********
 * Chceklist
 * =======================
 * - [ ] import the packages
 * - [ ] implement the middleware
 * - [ ] grab the html
 *      - [ ] js function
 * - [ ] create the routes
 *      -[ ] get route 
 *      -[ ] post route 
 *      -[ ] get image route
 * - [ ] readFile and writeFile function
 * 

 **********/


const express = require("express");
const bodyParser = require("body-parser");
const expressFileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");
const { response } = require("express");
const port = 3001;

//express connects routes to data
const app = express();
// dropbox/uploaded
const uploadDirectory = __dirname + path.sep + "uploaded" + path.sep; 
//function that we utilize for our requests and responses
app.use(bodyParser.urlencoded({extended:false}));
app.use(expressFileUpload({limits:{ fileSize: 5000 * 1024 * 1024 },
})
);

//static page --> html.css.images
app.use(express.static("uploaded"));
app.use(express.static("/"));


//{key(name)::value(data)}
//make it easier for the user to access these file if they have already before
let caches = {}; 

//gets my index.html page
app.get("/",(req,res) => {
    res.sendFile(__dirname + path.sep + "index.html")
});

//read file
//given th file 
//read and contents of the file

function readFile(name){
    //fancier way to write callbacks
       return new Promise((resolve,reject) => {
           //readfile(directoryname,callback)
        fs.readFile(uploadDirectory +  name,
            (err,data) => {
            if(err){
                console.log("error",err) 
                reject(err);
            } else {
                resolve(data);
            }
        });
    }).catch ((error) => {
        console.log("error",error)
    })
}

//given name and body
//write the file into the folder
function writeFile(name,body){
    // fs.writeFile(location(x),the body ,call back)
    return new Promise((resolve,reject) => {
        // dropbox / uploaded / memes.png
        fs.writeFile(uploadDirectory + name,body,(err) =>{
            if (err){
                reject(err);
            } else {
                resolve(name);
            }
        })
    }).then(readFile)
}

//request 
// <form action="/files" method="post">
//    <input type="file" name="dropbox"></input>
//    <input type="submit" value="submit"></input>
// </form>
var newJson = [];
app.post("/files",(req,res) => {
    let file = req.files.dropbox;
    console.log("Getting files in backend",file);
    res.write(`<div class="row" style="display:flex">
    <div class="col-lg-4" style="min-height:100vh">`)
    //if it's an array(that means there is more than one file within theuploaded functionality )
     if (file instanceof Array) {
        //loop through each item,grab the name and the data
        for (let i = 0;i < file.length;i++) {
        //writeFile promise (which will allow us to write the name and the data into the folder)
        let fileName = file[i].name;
        let fileData = file[i].data;
        let fileInfo = {
            name: file[i].name,
            size: file[i].size
        }
        fs.readFile("./download.json",function(err,data){
            if(err){
                return console.error(err);
            }
            console.log(file)
           
            newJson.push(fileInfo)
            // Object.assign(newJson,fileInfo)
            var fileDataJson = JSON.stringify(newJson);
            fs.appendFile("download.json",fileDataJson, function(err){
                if(err){
                    console.error(err);
                }
                if(newJson.includes(fileInfo)){
                    return console.log("that data repeat")
                }
            })
        })

        res.write(` 
        <table style="border:2px solid;border-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);border-image-slice: 10;">
        <tr>
         <th>file</th>
         <th>size</th> 
         <th>download</th>    
        </tr>
        <tr>
            <td>${fileName}</td>
            <td>${file[i].size}  bytes</td>
            <td><a href="http://127.0.0.1:3001/download/${fileName}"><button style="border: 0;
            width:100px;
            height: 30px;
            color:white;
            border-radius:20px;
            background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);">Download</button></a></td>
        </tr>
        <tr>
        <td style="text-align:center">display</td>
        <td><img src="http://localhost:3001/${fileName}" alt="pic" width="100" height="100"></img></td>
        </tr>

    </table>
    <br/>
        `)
        //object[key] = value;
        //value = fileItem
            //promises -> append the then method to then get the item
            //fs.readFile(string,callback)
            //implement the code in the callback because he couldn't the print the line(which is the outside the callback function)
            caches[fileName] = writeFile(fileName,fileData);
            caches[fileName].then((object) => {
                console.log("it works")
                //#TODO: try send object back later
                // res.send("it works")
                // setTimeout(function(){alert("Hello")},3000)
            
            })
        } 
        res.write(`</div>`)
        res.write(`<div class="col-lg-6" style="width:100vw;height:100vh">
        <iframe src="http://localhost:3001/"title="index"style="width:100%;height:100%"></iframe>
        </div>
        </div>`)
        res.end();
     } else {
            //if it's not an array
             let fileName = file.name
             let fileData = file.data
             let fileInfo = {
                 name: fileName,
                 size: file.size
             }
             // saving the filename and the data into our cache
             caches[fileName] = writeFile(fileName,fileData);
             caches[fileName].then((object) => {
                console.log("it works")
            
            fs.readFile("./download.json",function(err,data){
                if(err){
                    return console.error(err);
                }
                console.log(file)
               
                newJson.push(fileInfo)
                // Object.assign(newJson,fileInfo)
                var fileDataJson = JSON.stringify(newJson);
                fs.appendFile("download.json",fileDataJson, function(err){
                    if(err){
                        console.error(err);
                    }
                    if(newJson.includes(fileInfo)){
                        return console.log("that data repeat")
                    }
                })
            })
            res.write(` 
            <table style="border:2px solid;border-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);border-image-slice: 10;">
            <tr>
             <th>file</th>
             <th>size</th> 
             <th>download</th>    
            </tr>
            <tr>
                <td>${fileName}</td>
                <td>${file.size}  bytes</td>
                <td><a href="http://127.0.0.1:3001/download/${fileName}"><button style="border:0;
                width:100px;
                height: 30px;
                color:white;
                border-radius:20px;
                background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);">Download</button></a></td>
            </tr>
            <tr>
            <td style="text-align:center">display</td>
            <td><img src="http://localhost:3001/${fileName}" alt="pic" width="100" height="100"></img></td>
            </tr>
    
        </table>
        <br/>
            `)
            res.write(`</div>`)
            res.write(`<div class="col-lg-6" style="width:100vw;height:100vh">
            <iframe src="http://localhost:3001/"title="index"style="width:100%;height:100%"></iframe>
            </div>
            </div>`)
            res.end();
                
                // )
                // let fileDataJson = JSON.stringify(file)
                // console.log(fileDataJson)
                // fs.writeFileSync("download.json",fileDataJson)
                // res.sendFile(__dirname + path.sep + "index.html")
                // res.redirect("/")
            
                //#TODO: try send object back later
                // res.send("it works")
            }).catch((error) => {
                console.log("error",error)
            })
              //call the write file function
     }
    
    


   
});
//get the file from my uploaded foleder
//and then send that file back
app.get("/uploaded/:fileName",(req,res) => {
    let name = req.params.fileName;
    response.sendFile(path.join(__dirname,"uploaded",fileName));
  
});

app.get("/cache/:name",(req,res) => {
    let url = req.params.name;
    caches[req.params.name] = readFile(req.params.name);
    caches[req.params.name]
        .then((data) => {
            res.send(data);
        })
        .catch((error) => {
            res.send(error)
        })

})


//allows me to download that file onto my computer
app.get("/download/:name",(req,res) => {
    let url = req.params.name;
    // let object = {};
    readFile(req.params.name).then((object) => {
        res.send(object);
    })
    //   return new Promise((resolve,reject) => {
    //     fs.readFile(__dirname + path.sep + name,
    //         (err,data) => {
    //         if(err){
    //             reject(err);
    //         } else {
    //             resolve(data);
    //         }
    //     });
    // }).then((object) => {
    //     res.send(object);
    // })
    //   .catch((error) => {
    //       console.log("Error,error")
    //   })
})

app.listen(port,() =>{
    console.log(`app listening to port ${port}`);
})