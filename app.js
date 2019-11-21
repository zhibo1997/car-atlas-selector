var express=require("express");
var app=express();
var fs=require("fs");
app.use(express.static('./www'));

app.get("/api",function(req,res){
    //结构
    var dajson = {};

    fs.readdir("./www/assets/images/Corolla/" , function(err,data){
        data.forEach((color)=>{
            dajson[color] = {};

            var data2 = fs.readdirSync("./www/assets/images/Corolla/" + color ); 

            data2.forEach((album)=>{
                var data3 = fs.readdirSync("./www/assets/images/Corolla/" + color + "/" + album);
                dajson[color][album] = data3;
            });
        });

        //输出大json
        res.json({ "results": dajson });
    });   
});

app.listen(3000)