var knightRider = {
    count:0,
    tempArray:[],
    rightColorAr : ['white','white','white','white','white','white','#b9a7a7', '#a67d7d', '#966161', '#bc6060', '#b84747', '#dc4141'],
    leftColorAr : ['white','white','white','white','white','white','#dc4141','#b84747','#bc6060','#966161', '#a67d7d','#b9a7a7'],
    animationLeft : function (){
        var lastColor = this.tempArray.pop();
        this.tempArray.unshift(lastColor);
    },

    animationRight : function (){
        var firstColor = this.tempArray.shift();
        this.tempArray.push(firstColor);
    },

    animate:function (){
        this.count++;
        if(this.count<=this.leftColorAr.length){
            this.tempArray=this.leftColorAr;
            this.animationLeft();
        }else{
            if (this.count>=(this.rightColorAr.length*2)){
                this.count=0;
            }
            this.tempArray=this.rightColorAr;
            this.animationRight();
        }
    }
}

renderDives();
function renderDives(){
    $('#knight').empty();
    for (let i=0; i<knightRider.tempArray.length/2; i++){
        $('#knight').append(`<div style="background-color: ${knightRider.tempArray[i]}"></div>`);
    }
    knightRider.animate();
}

var id=setInterval(renderDives, 90);

$("#btnStart").click(function (){
    clearInterval(id);
    id=setInterval(renderDives, 90);
});

$("#btnEnd").click(function (){
    clearInterval(id);
});