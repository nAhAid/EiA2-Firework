"use strict";
var CustomFirework;
(function (CustomFirework) {
    window.addEventListener("load", handleLoad);
    let canvas = document.querySelector("canvas");
    CustomFirework.cc2 = canvas.getContext("2d");
    let background;
    CustomFirework.url = "https://webuser.hs-furtwangen.de/~haiderna/Database/index.php";
    CustomFirework.fireworks = "FireworkPresets";
    CustomFirework.localFirework = [];
    CustomFirework.explosives = [];
    CustomFirework.iLocalArray = 0;
    CustomFirework.currentFirework = {
        name: "",
        colour: CustomFirework.colours[12],
        pattern: CustomFirework.Pattern.circle,
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
        let createButton = document.querySelector("#createButton");
        createButton.addEventListener("click", handleCreateButton);
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
        let list = document.querySelector("#uListServer");
        list.innerHTML = "";
        for (let index = 0; index < CustomFirework.serverFirework.length; index++) {
            list.innerHTML += "<li id=\"serverFirework" + index + "\">" + CustomFirework.serverFirework[index].name + "</li>";
        }
        let serverlist = document.querySelector("#serverList");
        serverlist.addEventListener("click", handleClick);
    }
    function handleClick(_event) {
        let id = _event.target.id;
        if (id.includes("localFirework")) {
            if (id.includes("delete")) {
                console.log("delete Item");
            }
            else {
                let newId = cutID(id, 13);
                useFirework(CustomFirework.localFirework[newId], "localFirework", newId);
            }
        }
        else if (id.includes("serverFirework")) {
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
        let position = document.querySelector("#position");
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
        position.value = _position.toString();
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
            if (checkList(CustomFirework.serverFirework) == true) {
                console.log("Update List");
                let position = document.querySelector("#position");
                let element = Number(position.value);
                CustomFirework.serverFirework[element] = { name: CustomFirework.currentFirework.name, colour: CustomFirework.currentFirework.colour, pattern: CustomFirework.currentFirework.pattern, size: CustomFirework.currentFirework.size, lifespan: CustomFirework.currentFirework.lifespan, id: CustomFirework.currentFirework.id, serverSaved: true };
                console.log(CustomFirework.serverFirework);
                sendListElement("Defined" + element, "update");
                return;
            }
            else {
                let name = CustomFirework.currentFirework.name;
                let colour = CustomFirework.currentFirework.colour;
                let pattern = CustomFirework.currentFirework.pattern;
                let size = CustomFirework.currentFirework.size;
                let lifespan = CustomFirework.currentFirework.lifespan;
                let id = CustomFirework.currentFirework.id;
                let serverSaved = true;
                CustomFirework.serverFirework.push({ name, colour, pattern, size, lifespan, id, serverSaved });
                console.log(CustomFirework.serverFirework);
                sendListElement("Undefined", "insert");
                return;
            }
        }
    }
    function checkList(_fireworks) {
        let id = document.querySelector("#uniqueId");
        let saved = false;
        if (_fireworks == undefined) {
            saved = false;
        }
        else {
            for (let firework of _fireworks) {
                if (saved == true) {
                    return saved;
                }
                else {
                    if (firework.id == id.value && CustomFirework.currentFirework.name == firework.name) {
                        saved = true;
                    }
                    else {
                        saved = false;
                    }
                }
            }
        }
        return saved;
    }
    async function sendListElement(_element, _command) {
        let name;
        let colour;
        let pattern;
        let size;
        let lifespan;
        let id;
        let serverSaved;
        if (_element.includes("Defined") && _command != "delete") {
            let newElement = cutID(_element, 7);
            name = CustomFirework.serverFirework[newElement].name;
            colour = CustomFirework.serverFirework[newElement].colour.name;
            pattern = CustomFirework.serverFirework[newElement].pattern;
            size = CustomFirework.serverFirework[newElement].size;
            lifespan = CustomFirework.serverFirework[newElement].lifespan;
            id = CustomFirework.serverFirework[newElement].id;
            serverSaved = CustomFirework.serverFirework[newElement].serverSaved;
            let json = ({ name, colour, pattern, size, lifespan, id, serverSaved });
            let query = new URLSearchParams();
            query.set("command", _command);
            query.set("collection", "Firework");
            query.set("data", JSON.stringify(json));
            console.log(JSON.stringify(json));
            query.set("id", CustomFirework.serverFirework[newElement].id);
            let response = await fetch(CustomFirework.url + "?" + query.toString());
            let responseText = await response.text();
            if (responseText.includes("success")) {
                alert("Item Updated!");
            }
            else {
                alert("Error! Try again!");
            }
        }
        else if (_element == "Undefined") {
            let newElement = CustomFirework.serverFirework.length - 1;
            name = CustomFirework.serverFirework[newElement].name;
            colour = CustomFirework.serverFirework[newElement].colour.name;
            pattern = CustomFirework.serverFirework[newElement].pattern;
            size = CustomFirework.serverFirework[newElement].size;
            lifespan = CustomFirework.serverFirework[newElement].lifespan;
            id = CustomFirework.serverFirework[newElement].id;
            serverSaved = CustomFirework.serverFirework[newElement].serverSaved;
            let json = ({ name, colour, pattern, size, lifespan, id, serverSaved });
            let query = new URLSearchParams();
            query.set("command", _command);
            query.set("collection", "Firework");
            query.set("data", JSON.stringify(json));
            let response = await fetch(CustomFirework.url + "?" + query.toString());
            let responseText = await response.text();
            if (responseText.includes("success")) {
                alert("Item added!");
            }
            else {
                alert("Error! Try again!");
            }
        }
        else if (_element.includes("Defined") && _command == "delete") {
            let newElement = cutID(_element, 7);
            let query = new URLSearchParams();
            query.set("command", _command);
            query.set("collection", "Data");
            query.set("id", CustomFirework.serverFirework[newElement].id);
            let response = await fetch(CustomFirework.url + "?" + query.toString());
            let responseText = await response.text();
            if (responseText.includes("success")) {
                alert("Item delted!");
            }
            else {
                alert("Error! Try again!");
            }
        }
        requestList();
    }
    function handleCreateButton() {
        console.log("create Button!");
        if (CustomFirework.currentFirework.name == "") {
            alert("Fill in Name!");
        }
        else {
            if (checkList(CustomFirework.localFirework) == true) {
                console.log("Update Local List");
                let position = document.querySelector("#position");
                let htmlId = document.querySelector("#uniqueId");
                let element = Number(position.value);
                CustomFirework.localFirework[element] = { name: CustomFirework.currentFirework.name, colour: CustomFirework.currentFirework.colour, pattern: CustomFirework.currentFirework.pattern, size: CustomFirework.currentFirework.size, lifespan: CustomFirework.currentFirework.lifespan, id: CustomFirework.currentFirework.id, serverSaved: true };
                htmlId.value = CustomFirework.currentFirework.id;
                position.value = (CustomFirework.localFirework.length - 1).toString();
                console.log(CustomFirework.localFirework);
                wirteLocalList();
                return;
            }
            else {
                let name = CustomFirework.currentFirework.name;
                let colour = CustomFirework.currentFirework.colour;
                let pattern = CustomFirework.currentFirework.pattern;
                let size = CustomFirework.currentFirework.size;
                let lifespan = CustomFirework.currentFirework.lifespan;
                let id = "local" + CustomFirework.iLocalArray.toString();
                let serverSaved = true;
                CustomFirework.iLocalArray++;
                let htmlId = document.querySelector("#uniqueId");
                let position = document.querySelector("#position");
                CustomFirework.localFirework.push({ name, colour, pattern, size, lifespan, id, serverSaved });
                htmlId.value = id;
                position.value = (CustomFirework.localFirework.length - 1).toString();
                console.log(CustomFirework.localFirework);
                wirteLocalList();
                return;
            }
        }
    }
    function wirteLocalList() {
        console.log("Write Local List");
        let list = document.querySelector("#uListLocal");
        list.innerHTML = "";
        for (let index = 0; index < CustomFirework.localFirework.length; index++) {
            list.innerHTML += "<li id=\"localFirework" + index + "\">" + CustomFirework.localFirework[index].name + "</li>";
        }
        let serverlist = document.querySelector("#localList");
        serverlist.addEventListener("click", handleClick);
    }
})(CustomFirework || (CustomFirework = {}));
//# sourceMappingURL=main.js.map