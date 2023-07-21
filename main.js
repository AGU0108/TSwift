var video = "";
var status = "";
objects = [];

function preload(){
    video = createVideo("august.mp4");
   video.hide();

}
function draw(){
    image(video,0,0,1300,1000)

}
function setup(){
    canvas = createCanvas(1300,1000);
     canvas.center();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = " Status detectando objetos";

}
function modelLoaded(){
    console.log("modelo ok!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, results){
    if (error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}
function draw(){
    image(video, 0,0,1300,1000);
    if(status != ""){
        objectDetector.detect(video, gotResult);

        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "Objects detected";
            document.getElementById("numberofobj").innerHTML = "No. Of Objects Detected" + objects.length;

            r = random(255);
            g = random(255);
            b = random(255);

            fill(r,g,b);
            text(objects[i].label,objects[i].x + 100, objects[i].y + 100s  );

            noFill();
            stroke(r,g,b);
            rect(objects[i].x + 100, objects[i].y + 100, objects[i].width, objects[i].height);

        }
    }
}