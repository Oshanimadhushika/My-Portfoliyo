var girl=document.getElementById("girl");
idleImageNumber=1;
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






runImageNumber=1;
runAnimationNumber=0;

function runAnimation() {

    runImageNumber=runImageNumber+1;

    if (runImageNumber==11){
        runImageNumber=1;
    }

    girl.src="resourses/images/Run("+runImageNumber+").png"
}

function runAnimationStart() {

    runAnimationNumber=setInterval(runAnimation,150);

    clearInterval(idleAnimationNumber);

}

jumpAnimationNumber=0;
jumpImageNumber=1;
girlTop=399;
function jumpAnimation() {

    jumpImageNumber=jumpImageNumber+1;

    if (jumpImageNumber<=6){
        girlTop=girlTop-20;
        girl.style.top=girlTop+"px";
    }

    if (jumpImageNumber>=7){
        girlTop=girlTop+20;
        girl.style.top=girlTop+"px";
    }


    if (jumpImageNumber==11){
        jumpImageNumber=1;
        clearInterval(jumpAnimationNumber);
        jumpAnimationNumber=0;
        runImageNumber=0;
        runAnimationStart();
    }
    girl.src="resourses/images/Jump("+jumpImageNumber+").png"
}
function jumpAnimationStart() {
    clearInterval(idleAnimationNumber);
    runImageNumber=0;
    clearInterval(runAnimationNumber);
    jumpAnimationNumber=setInterval(jumpAnimation,150);

}


function keyCheck(event) {
    /*alert(event.which);
    enter=13
    space=32*/

    var keyCode=event.which;

    if (keyCode==13){
        if (runAnimationNumber==0){
            runAnimationStart();
        }


    if (moveBackgroundAnimationId==0){
        moveBackgroundAnimationId=setInterval(moveBackground,180)
    }
}
    if (keyCode==32){
        if (jumpAnimationNumber==0)
        {
            jumpAnimationStart();
        }
        if (moveBackgroundAnimationId==0){
            moveBackgroundAnimationId=setInterval(moveBackground,180)
        }
    }
}

var backgroundImagePositionX=0;
var moveBackgroundAnimationId=0;

function moveBackground() {

    backgroundImagePositionX=backgroundImagePositionX-20;

    document.getElementById("backgroundID").style.backgroundPositionX=backgroundImagePositionX+"px";

}