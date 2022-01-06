song_1 = " ";
song_2 = " ";

song_1_status = " ";
song_2_status = " ";

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;
function preload()
{
    song_1 = loadSound("Young Shahrukh - Tesher.mp3");
    song_2 = loadSound("Whoopty Song Download Mp3 2021(SongsZilla.Net).mp3");
}
function setup()
{
    canvas = createCanvas(600,500);
    canvas.position(350,200);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses);
}
function modelLoaded()
{
    console.log("poseNet is initaialized");
}
function gotPoses(results)
{
    if(results.length > 0)
    {
        rightWristX = results[0].pose.rightWrist.x 
        rightWristY = results[0].pose.rightWrist.y
        console.log("right wrist x = " + rightWristX + "right wrist x = " + rightWristY);

        leftWristX = results[0].pose.leftWrist.x 
        leftWristY = results[0].pose.leftWrist.y
        console.log("left wrist x = " + leftWristX + "left wrist x = " + leftWristY);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("score right wrist = "+ scoreRightWrist +"score left wrist = "+ scoreLeftWrist);
        console.log(results);
    }
  
}

function draw()
{
   image(video,0,0,600,500);
   song_1_status = song_1.isPlaying();
   song_2_status = song_2.isPlaying();

   fill("#FF0000");
   stroke("#FF0000");

   if(scoreLeftWrist > 0.2)
   {
       circle(leftWristY,leftWristX,20);
       song_1.stop();

       if(song_2_status == false)
       {
         song_2.play();
         document.getElementById("music").innerHTML = "playing-whoopty";
       }
   }
   if(scoreRightWrist > 0.2)
   {
       circle(rightWristY,rightWristX,20);
       song_2.stop();

       if(song_1_status == false)
       {
         song_1.play();
         document.getElementById("music").innerHTML = "playing young-shahrukh";
       }
   }
}
function play()
{
    song.play()
}