var cueData = {
    person: [
        {name: "Oshani", color: "red"},
        {name: "Achini", color: "yellow"},
        {name: "Hesh", color: "green"}
    ]
}


function renderDivs(){
    $('#container').empty();
    for (let i=0; i<cueData.person.length; i++){
        $('#container').append(`<div style="background-color:${cueData.person[i].color}"><h1>${cueData.person[i].name}</h1></div>`);
    }
    nextPerson();
}

function nextPerson(){
    var lastPerson = cueData.person.pop();
    cueData.person.unshift(lastPerson);
}

setInterval(renderDivs,500);

$('#btnAdd').click(function (){
    let inputName = $('#name').val();
    let selectColor = $('#color').val();
    var person = {name:inputName,color:selectColor};

    cueData.person.unshift(person);
});