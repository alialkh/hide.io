
function returnGameMode(num){
    let res;

    if(num === "1"){
        res = "Lover's Paradise";
    }else if(num === "2"){
        res = "Do you want to build a snowman?";
    }else if(num === "3"){
        res = "Love is an open door";
    }

    return res;
}

function returnGameTime(num){
    let res;

    if(num === "1"){
        res = "3 mins";
    }else if(num === "2"){
        res = "4 mins";
    }else if(num === "3"){
        res = "5 mins";
    }

    return res;
}

function returnGameMap(num){
    let res;

    if(num === "1"){
        res = "Never gonna give you up";
    }else if(num === "2"){
        res = "Never gonna let you down";
    }else if(num === "3"){
        res = "Never gonna run around and desert you";
    }

    return res;
}

export {returnGameMode, returnGameMap, returnGameTime };