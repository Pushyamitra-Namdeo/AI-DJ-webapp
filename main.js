song="";
leftWristx=0;
leftWristy=0;
score= 0;

rightWristx=0;
rightWristy=0;

function preload(){
song= loadSound("music.mp3");
}

function setup(){
canvas= createCanvas(600,500);
canvas.center();
video= createCapture(VIDEO);
video.hide();

posenet= ml5.poseNet(video,model_loaded);
posenet.on('pose', got_poses);
}

function draw(){
    image(video,0,0,600,500);

    fill("#eb0707");
    stroke("#eb0707");

    if(score > 0.2)
    {
    circle(leftWristx,leftWristy,20);
    inNumberLeftWristY= Number(leftWristy);
    remove_decimals= floor(inNumberLeftWristY);
    volume= remove_decimals/500;
    document.getElementById("volume").innerHTML= "Volume = "+ volume;
    song.setVolume(volume);
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function model_loaded(){
    console.log("Model is Loaded");
}

function got_poses(results){
if(results.length>0){

console.log(results);
score= results[0].pose.keypoints[9].score;
console.log("Score = "+score);

leftWristx= results[0].pose.leftWrist.x;
leftWristy= results[0].pose.leftWrist.y;

rightWristx= results[0].pose.rightWrist.x;
rightWristy= results[0].pose.rightWrist.y;
console.log("leftWristx = "+ leftWristx+"leftWrisrty"+leftWristy);
console.log("rightWristx = "+ rightWristx+"rightWrisrty"+rightWristy)
}
}
    

