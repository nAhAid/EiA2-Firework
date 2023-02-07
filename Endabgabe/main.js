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
    CustomFirework.currentFirework = {
        name: "Test",
        colour: CustomFirework.colours[12],
        pattern: CustomFirework.Pattern.cross,
        size: 0,
        lifespan: 0,
        id: "",
        serverSaved: false
    };
    async function handleLoad() {
        let create = document.getElementById("create");
        create.addEventListener("change", getInput);
        let save = document.querySelector("#save");
        save.addEventListener("click", handleSaveButton);
        drawBackground();
        background = CustomFirework.cc2.getImageData(0, 0, CustomFirework.cc2.canvas.width, CustomFirework.cc2.canvas.height);
        getInput();
        await requestList();
    }
    async function requestList() {
        let response = await fetch(CustomFirework.url + "?command=find&collection=Firework");
        let list = await response.text();
        let data = JSON.parse(list);
        generateServerlist(data);
    }
    function generateServerlist(_data) {
        CustomFirework.serverFirework = [];
        let keys = Object.keys(_data.data);
        for (let key of keys) {
            let value = _data.data[key];
            let name = value.name;
            let colour = CustomFirework.colours[value.colour];
            let pattern = CustomFirework.patterns[value.pattern];
            let size = value.size;
            let lifespan = value.lifespan;
            let id = key;
            let serverSaved = value.serverSaved;
            CustomFirework.serverFirework.push({ name: name, colour: colour, pattern: pattern, size: size, lifespan: lifespan, id: id, serverSaved: serverSaved });
        }
        console.log(CustomFirework.serverFirework);
        writeServerList();
    }
    function writeServerList() {
        let list = document.querySelector("#uList");
        list.innerHTML = "";
        for (let index = 0; index < CustomFirework.serverFirework.length; index++) {
            list.innerHTML += "<li id=\"serverFirework" + index + "\">" + CustomFirework.serverFirework[index].name + "</li>";
        }
        let serverlist = document.querySelector("#serverList");
        serverlist.addEventListener("click", handleClick);
    }
    function handleClick(_event) {
        let id = _event.target.id;
        if (id.includes("Firework")) {
            if (id.includes("delete")) {
                console.log("delete Item");
            }
            else {
                let newId = cutID(id, 14);
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
        //let position: HTMLInputElement = <HTMLInputElement>document.querySelector("#position");
        let id = document.querySelector("#uniqueId");
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
        id.value = _firework.id;
        CustomFirework.currentFirework.name = _firework.name;
        CustomFirework.currentFirework.colour = _firework.colour;
        CustomFirework.currentFirework.pattern = _firework.pattern;
        CustomFirework.currentFirework.size = _firework.size;
        CustomFirework.currentFirework.lifespan = _firework.lifespan;
        CustomFirework.currentFirework.id = _firework.id;
        CustomFirework.currentFirework.serverSaved = _firework.serverSaved;
    }
    function cutID(_id, _length) {
        let newId = _id.slice(_length);
        return parseInt(newId);
    }
    function getInput() {
        let name = document.querySelector("#name");
        let jColour = document.querySelector("#colours");
        let lifespan = document.querySelector("#lifespan");
        let size = document.querySelector("#size");
        let htmlPattern = document.querySelector("input[name=\"pattern\"]:checked");
        let colour = CustomFirework.colours[jColour.value.toString()];
        let pattern = CustomFirework.patterns[htmlPattern.value];
        CustomFirework.currentFirework.name = name.value;
        CustomFirework.currentFirework.colour = colour;
        CustomFirework.currentFirework.pattern = pattern;
        CustomFirework.currentFirework.lifespan = Number(lifespan.value);
        CustomFirework.currentFirework.size = Number(size.value);
        console.log(CustomFirework.currentFirework);
    }
    function drawBackground() {
        CustomFirework.cc2.beginPath();
        CustomFirework.cc2.fillStyle = "black";
        CustomFirework.cc2.fillRect(0, 0, CustomFirework.cc2.canvas.width, CustomFirework.cc2.canvas.height);
        CustomFirework.cc2.closePath();
    }
    function handleSaveButton() {
        console.log("save Button");
        if (CustomFirework.currentFirework.name == "") {
            alert("Fill in Name!");
        }
        else {
            let id = document.querySelector("#uniqueId");
            for (let firework of CustomFirework.serverFirework) {
                if (firework.id == id.value) {
                    console.log("Update List");
                }
            }
        }
    }
})(CustomFirework || (CustomFirework = {}));
//# sourceMappingURL=main.js.map