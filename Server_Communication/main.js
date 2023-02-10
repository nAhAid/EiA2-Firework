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
        let resetButton = document.querySelector("#resetButton");
        resetButton.addEventListener("click", handleResetButton);
        canvas.addEventListener("click", handleCanvasClick);
        drawBackground();
        background = CustomFirework.cc2.getImageData(0, 0, CustomFirework.cc2.canvas.width, CustomFirework.cc2.canvas.height);
        window.setInterval(update, 30);
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
        writeServerList();
    }
    function writeServerList() {
        let list = document.querySelector("#uListServer");
        list.innerHTML = "";
        for (let index = 0; index < CustomFirework.serverFirework.length; index++) {
            list.innerHTML += "<li id=\"serverFirework" + index + "\">" + CustomFirework.serverFirework[index].name + "<img id=\"serverFireworkDelete" + index + "\" class=\"trash\" src=\"Ressources/trash.png\">" + "</li>";
        }
        let serverlist = document.querySelector("#serverList");
        serverlist.addEventListener("click", handleClick);
    }
    function handleClick(_event) {
        let id = _event.target.id;
        if (id.includes("localFirework")) {
            if (id.includes("Delete")) {
                let newId = cutID(id, 19);
                deleteFirework("localFirework", newId);
            }
            else {
                let newId = cutID(id, 13);
                useFirework(CustomFirework.localFirework[newId], "localFirework", newId);
            }
        }
        else if (id.includes("serverFirework")) {
            if (id.includes("Delete")) {
                let newId = cutID(id, 20);
                deleteFirework("serverFirework", newId);
            }
            else {
                let newId = cutID(id, 14);
                useFirework(CustomFirework.serverFirework[newId], "serverFirework", newId);
            }
        }
    }
    function deleteFirework(_name, _element) {
        if (_name == "serverFirework") {
            console.log("delete Element");
            sendListElement("Defined" + _element, "delete");
        }
        else {
            CustomFirework.localFirework.splice(_element, 1);
            wirteLocalList();
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
            console.log("Send List delete");
            let query = new URLSearchParams();
            query.set("command", _command);
            query.set("collection", "Firework");
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
        let list = document.querySelector("#uListLocal");
        list.innerHTML = "";
        for (let index = 0; index < CustomFirework.localFirework.length; index++) {
            list.innerHTML += "<li id=\"localFirework" + index + "\">" + CustomFirework.localFirework[index].name + "<img id=\"localFireworkDelete" + index + "\" class=\"trash\" src=\"Ressources/trash.png\">" + "</li>";
        }
        let serverlist = document.querySelector("#localList");
        serverlist.addEventListener("click", handleClick);
    }
    function handleResetButton() {
        CustomFirework.localFirework = [];
        wirteLocalList();
    }
    function handleCanvasClick(_event) {
        if (CustomFirework.currentFirework.pattern == CustomFirework.Pattern.circle) {
            let position = new CustomFirework.Vector(_event.clientX - CustomFirework.cc2.canvas.offsetLeft, _event.clientY - CustomFirework.cc2.canvas.offsetTop);
            let circleFirework = new CustomFirework.Circle(position, CustomFirework.currentFirework.colour, CustomFirework.currentFirework.size, CustomFirework.currentFirework.lifespan);
            circleFirework.draw();
            CustomFirework.explosives.push(circleFirework);
        }
        if (CustomFirework.currentFirework.pattern == CustomFirework.Pattern.star) {
            let position = new CustomFirework.Vector(_event.clientX - CustomFirework.cc2.canvas.offsetLeft, _event.clientY - CustomFirework.cc2.canvas.offsetTop);
            let starFirework = new CustomFirework.Star(position, CustomFirework.currentFirework.colour, CustomFirework.currentFirework.size, CustomFirework.currentFirework.lifespan);
            starFirework.draw();
            CustomFirework.explosives.push(starFirework);
        }
        if (CustomFirework.currentFirework.pattern == CustomFirework.Pattern.cross) {
            let position = new CustomFirework.Vector(_event.clientX - CustomFirework.cc2.canvas.offsetLeft, _event.clientY - CustomFirework.cc2.canvas.offsetTop);
            let crossFirework = new CustomFirework.Cross(position, CustomFirework.currentFirework.colour, CustomFirework.currentFirework.size, CustomFirework.currentFirework.lifespan);
            crossFirework.draw();
            CustomFirework.explosives.push(crossFirework);
        }
    }
    function update() {
        CustomFirework.cc2.putImageData(background, 0, 0);
        console.log("update");
        for (let explosive of CustomFirework.explosives) {
            explosive.explode();
            explosive.draw();
        }
        deleteExpandables();
    }
    function deleteExpandables() {
        for (let i = CustomFirework.explosives.length - 1; i >= 0; i--) {
            if (CustomFirework.explosives[i].expandable)
                CustomFirework.explosives.splice(i, 1);
        }
    }
})(CustomFirework || (CustomFirework = {}));
//# sourceMappingURL=main.js.map