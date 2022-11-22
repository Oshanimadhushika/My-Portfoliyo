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

    runAnimationNumber=setInterval(runAnimation,120);

    clearInterval(idleAnimationNumber);

}

jumpAnimationNumber=0;
jumpImageNumber=1;
girlTop=366;
function jumpAnimation() {

    jumpImageNumber=jumpImageNumber+1;

    if (jumpImageNumber<=6){
        girlTop=girlTop-45;
        girl.style.top=girlTop+"px";
    }

    if (jumpImageNumber>=7){
        girlTop=girlTop+45;
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
    jumpAnimationNumber=setInterval(jumpAnimation,200);

}

boxLeft=1700;
function createBoxes() {

    for (var i=0; i<=10; i++) {
        var box = document.createElement("div");
        box.className = "box";
        document.getElementById("backgroundID").appendChild(box);
        box.style.left = boxLeft + "px";
        box.id="box"+i;

       // boxLeft=boxLeft+500;
        if (i<5){
            boxLeft=boxLeft+2000;
        }
        if (i>=5){
            boxLeft=boxLeft+1000;
        }
    }
}


var boxAnimationID=0;
function boxAnimation() {

    for (var i=0; i<10; i++){
        var box=document.getElementById("box"+i);
        var currentLeft=getComputedStyle(box).left;
        var newLeft=parseInt(currentLeft)-35;
        box.style.left=newLeft+"px";

        if (newLeft>= -110 && newLeft<=100){
            if (girlTop>300){
                clearInterval(boxAnimationID);

                clearInterval(runAnimationNumber);
                runAnimationNumber=-1;

                clearInterval(jumpAnimationNumber);
                jumpAnimationNumber=-1;

                clearInterval(moveBackgroundAnimationId);
                moveBackgroundAnimationId=-1;

                deadAnimationNumber=setInterval(girlDeadAnimation,150);
            }
        }

    }
}

deadImageNumber=1;
deadAnimationNumber=0;
function girlDeadAnimation() {

    deadImageNumber=deadImageNumber+1;

    if (deadImageNumber==11){
        deadImageNumber=10;
    }


    girl.src="resourses/images/Dead("+deadImageNumber+").png";

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
        if (boxAnimationID==0){
            boxAnimationID=setInterval(boxAnimation,180);
        }
}
    if (keyCode==32){
        if (jumpAnimationNumber==0)
        {
            jumpAnimationStart();
        }
        if (moveBackgroundAnimationId==0){
            moveBackgroundAnimationId=setInterval(moveBackground,180);
        }
        if (boxAnimationID==0){
            boxAnimationID=setInterval(boxAnimation,180);
        }
    }
}

var backgroundImagePositionX=0;
var moveBackgroundAnimationId=0;

function moveBackground() {

    backgroundImagePositionX=backgroundImagePositionX-20;

    document.getElementById("backgroundID").style.backgroundPositionX=backgroundImagePositionX+"px";

}