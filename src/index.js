const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());
const userArr = require("./InitialData")

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here
let newId = userArr.length+1
app.get("/api/student", (req,res) => {
    try{
        res.json({
            status : "success",
            userArr})

    } catch(e){
        res.status(400).json({
            status : "Failed",
            message : e.message
        })
    }
})

app.get("/api/student/:id", (req,res) => {
    try{
        const index = userArr.findIndex((obj => obj.id === req.params.id))
        res.json({
            status : "success",
            data : userArr[index]
        })

    } catch(e){
        res.status(400).json({
            status : "Failed",
            message : e.message
        })
    }
})


app.post("/api/student", (req,res) => {
    try{  
        if(req.body.name || req.body.currentClass || req.body.division){
            return res.status(400).json({
                status : "Failed",
                messgage : "Incomplete Data"
            })
        }      
        userArr.push({
            id: newId,
            name: req.body.name,
            currentClass: req.body.currentClass,
            division: req.body.division
        })
        newId++;
        res.json({
            status : "success",
            id : newId
        })
    } catch(e){
        res.status(400).json({
            status : "Failed",
            message : e.message
        })
    }
})

app.put("/api/student/:id", (req,res) => {
    try{  
        const idx = userArr.findIndex((obj => obj.id === req.params.id))

        if(id == -1){
            return res.status(400).json({
                status : "Failed",
                messgage : "Incomplete Data"
            })
        }      

          userArr[idx].name = req.body.name,
          userArr[idx].currentClass = req.body.currentClass,
          userArr[idx].division = req.body.division
              
        res.json({
            status : "success",
            data : userArr[idx]
        })
    } catch(e){
        res.status(400).json({
            status : "Failed",
            message : e.message
        })
    }
})
app.delete("/api/student/:id", (req,res) => {
    try{  
        const idx = userArr.findIndex((obj => obj.id === req.params.id))

        if(id == -1){
            return res.status(400).json({
                status : "Failed",
                messgage : "Incomplete Data"
            })
        }      
        userArr.splice(idx,1)
      
        res.json({
            status : "success",
            data : "Recorded successfully deleted"
        })
    } catch(e){
        res.status(400).json({
            status : "Failed",
            message : e.message
        })
    }
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   