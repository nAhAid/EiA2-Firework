"use strict";
var CustomFirework;
(function (CustomFirework) {
    window.addEventListener("load", handleLoad);
    let canvas = document.querySelector("canvas");
    CustomFirework.cc2 = canvas.getContext("2d");
    let background;
    CustomFirework.url = "https://webuser.hs-furtwangen.de/~haiderna/Database/index.php";
    CustomFirework.fireworks = "FireworkPresets";
    CustomFirework.explosives = [];
    /*
        currentFirework = {
            name: "Redstar",
            colour: colours[1],
            pattern: Pattern.circle,
            size: 1,
            lifespan: 100,
            id: "",
            serverSaved: true
        }; */
    CustomFirework.currentFirework = {
        name: "Test",
        colour: CustomFirework.colours[12],
        pattern: CustomFirework.Pattern.cross,
        size: 0,
        lifespan: 0,
        id: "HALLO",
        serverSaved: false
    };
    async function handleLoad() {
        console.log("start");
        let create = document.getElementById("create");
        create.addEventListener("change", handleInputChange);
        drawBackground();
        background = CustomFirework.cc2.getImageData(0, 0, CustomFirework.cc2.canvas.width, CustomFirework.cc2.canvas.height);
        //console.log(currentFirework.pattern);
        console.log(CustomFirework.colours.Yellow);
        await requestList();
    }
    async function requestList() {
        let response = await fetch(CustomFirework.url + "?command=find&collection=Firework");
        let list = await response.text();
        let data = JSON.parse(list);
        console.log(data);
        generateServerlist(data);
    }
    function generateServerlist(_data) {
        console.log("generate Serverlist");
        CustomFirework.serverFirework = [];
        let keys = Object.keys(_data.data);
        let values = Object.values(_data.data);
        for (let index = 0; index < keys.length; index++) {
            let item = Object.values(values[index]);
            let name;
            let jColour;
            let colour;
            let jPattern;
            let pattern = CustomFirework.Pattern.cross;
            let size;
            let lifespan;
            let id;
            let serverSaved;
            name = item[0];
            jColour = item[1];
            colour = CustomFirework.colours.Red;
            jPattern = item[2];
            size = Number(item[3]);
            lifespan = Number(item[4]);
            id = keys[index];
            serverSaved = JSON.parse(item[6]);
            console.log(jPattern);
            if (jPattern.includes("circle")) {
                pattern = CustomFirework.Pattern.circle;
            }
            if (jPattern.includes("star")) {
                pattern = CustomFirework.Pattern.star;
            }
            if (jPattern.includes("cross")) {
                pattern = CustomFirework.Pattern.cross;
            }
            switch (jColour) {
                case "Yellow":
                    colour = CustomFirework.colours.Yellow;
                    break;
                case "Red":
                    colour = CustomFirework.colours.Red;
                    break;
                case "Blue":
                    colour = CustomFirework.colours.Blue;
                    break;
                case "Green":
                    colour = CustomFirework.colours.Green;
                    break;
                case "White":
                    colour = CustomFirework.colours.White;
                    break;
            }
            CustomFirework.serverFirework.push({ name: name, colour: colour, pattern: pattern, size: size, lifespan: lifespan, id: id, serverSaved: serverSaved });
        }
        console.log(CustomFirework.serverFirework);
        writeServerList();
    }
    function writeServerList() {
        let list = document.querySelector("#uList");
        list.innerHTML = "";
        for (let index = 0; index < CustomFirework.serverFirework.length; index++) {
            console.log("write List");
            list.innerHTML += "<li id=\"serverFirework" + index + "\">" + CustomFirework.serverFirework[index].name + "</li>";
        }
        let serverlist = document.querySelector("#serverList");
        serverlist.addEventListener("click", handleClick);
    }
    function handleClick(_event) {
        console.log(_event.clientX, _event.clientY);
        let id = _event.target.id;
        console.log(id);
        if (id.includes("server")) {
            if (id.includes("delete")) {
                console.log("delte Item");
            }
            else {
                let newId = cutID(id, 14);
                console.log(newId);
                useFirework(CustomFirework.serverFirework[newId], "serverFirework", newId);
            }
        }
    }
    function useFirework(_firework, _array, _position) {
        let name = document.querySelector("#name");
        let colour = document.querySelector("#colours");
        let circle = document.querySelector("#circle");
        let star = document.querySelector("#star");
        let cross = document.querySelector("#cross");
        let lifespan = document.querySelector("#lifespan");
        let size = document.querySelector("#size");
        let position = document.querySelector("#position");
        let list = document.querySelector("#list");
        if (_firework.pattern == CustomFirework.Pattern.circle) {
            circle.checked = true;
        }
        else if (_firework.pattern == CustomFirework.Pattern.star) {
            star.checked = true;
        }
        else if (_firework.pattern == CustomFirework.Pattern.cross) {
            cross.checked = true;
        }
        name.value = _firework.name;
        colour.value = _firework.colour.name;
        lifespan.value = _firework.lifespan.toString();
        size.value = _firework.size.toString();
        position.value = _position.toString();
        list.value = _array.toString();
    }
    function cutID(_id, _length) {
        let newId = _id.slice(_length);
        return parseInt(newId);
    }
    function handleInputChange(_event) {
        console.log("InputChange");
    }
    function drawBackground() {
        CustomFirework.cc2.beginPath();
        CustomFirework.cc2.fillStyle = "black";
        CustomFirework.cc2.fillRect(0, 0, CustomFirework.cc2.canvas.width, CustomFirework.cc2.canvas.height);
        CustomFirework.cc2.closePath();
    }
})(CustomFirework || (CustomFirework = {}));
//# sourceMappingURL=main.js.map