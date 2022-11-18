var girl=document.getElementById("girl");
idleImageNumber=0;
idleAnimationNumber=0;

function idleAnimation() {
  idleImageNumber=idleImageNumber+1;

    if (idleImageNumber==11){

        idleImageNumber=1;
    }


   girl.src="resourses/images/Idle("+idleImageNumber+").png";
}

function idleAnimationStart() {

    idleAnimationNumber=setInterval(idleAnimation,180);
}






runImageNumber=0;
runAnimationNumber=0;

function runAnimation() {

    runImageNumber=runImageNumber+1;

    if (runImageNumber==11){
        runImageNumber=1;
    }

    girl.src="resourses/images/Run("+runImageNumber+").png"
}

function runAnimationStart() {
    clearInterval(idleAnimationNumber);
    runAnimationNumber=setInterval(runAnimation,150);


}


function keyCheck(event) {
    /*alert(event.which);
    enter=13*/

    var keyCode=event.which;

    if (keyCode==13){
        if (runAnimationNumber==0){
            runAnimationStart();
        }

    }

    if (moveBackgroundAnimationId==0){
        moveBackgroundAnimationId=setInterval(moveBackground,150)
    }

}

var backgroundImagePositionX=0;
var moveBackgroundAnimationId=0;

function moveBackground() {

    backgroundImagePositionX=backgroundImagePositionX-20;

    document.getElementById("backgroundID").style.backgroundPositionX=backgroundImagePositionX+"px";

}