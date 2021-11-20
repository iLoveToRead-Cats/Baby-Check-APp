alarm="";
objects=[];
status="";
function preload() {
    alarm=loadSound('ringtone.mp3');
}

function setup() {
    canvas=createCanvas(380, 300);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380, 300);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML= "Status: Detecting Objects";
}

function modelLoaded() {
    console.log("DA MODAL IZ LOADEDD!!!!!!!");
    status=true;
}

function gotResult(error, results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects=results;
}

function draw() {
    image(video, 0, 0, 380, 300);
    if (status!="") {
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video, gotResult);
        for(i=0; i<objects.length; i++) {
            document.getElementById("status").innerHTML="Status: Person is Detected";
            fill(r, g, b);
            percent=floor(objects[i].confidence * 100);
            text(objects[i].label+ " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            
            if (objects[i].label == "person") {
                document.getElementById("status").innerHTML="Person is Found";
                console.log("STOP");
                alarm.stop();
            }
            else {
                document.getElementById("status").innerHTML="Person is NOT FOUND";
                console.log("PLAY");
                alarm.play();
            }
        }
        if (objects.length==0) {
            document.getElementById("status").innerHTML="Person is NOT FOUND";
                console.log("PLAY");
                alarm.play();
        }
    }
}