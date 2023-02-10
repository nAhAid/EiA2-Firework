namespace CustomFirework {
    window.addEventListener("load", handleLoad);

    let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");
    export let cc2: CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas.getContext("2d");
    let background: ImageData;

    export let url: string = "https://webuser.hs-furtwangen.de/~haiderna/Database/index.php";
    export let fireworks: string = "FireworkPresets";

    export let serverFirework: FireworkComponents[];
    export let currentFirework: FireworkComponents;
    export let localFirework: FireworkComponents[] = [];

    export let explosives: Firework[] = [];
    export let iLocalArray: number = 0;

    interface Data {
        [id: string]: ServerFireworkComponents;
    }

    interface ReturnedJSON {
        status: string;
        data: Data;
    }


    currentFirework = {
        name: "",
        colour: colours[12],
        pattern: Pattern.circle,
        size: 0,
        lifespan: 0,
        id: "",
        serverSaved: false
    };

    async function handleLoad() {
        let create: HTMLDivElement = <HTMLDivElement>document.getElementById("Firework_Creation");
        create.addEventListener("change", getInput);
        let save: HTMLInputElement = <HTMLInputElement>document.querySelector("#save");
        save.addEventListener("click", handleSaveButton);
        let createButton: HTMLInputElement = <HTMLInputElement>document.querySelector("#createButton");
        createButton.addEventListener("click", handleCreateButton);
        let resetButton: HTMLInputElement = <HTMLInputElement>document.querySelector("#resetButton");
        resetButton.addEventListener("click", handleResetButton);

        canvas.addEventListener("click", handleCanvasClick);


        drawBackground();
        background = cc2.getImageData(0, 0, cc2.canvas.width, cc2.canvas.height);
        window.setInterval(update, 30);
        getInput();
        await requestList();
    }

    async function requestList() {
        let response: Response = await fetch(url + "?command=find&collection=Firework");
        let list: string = await response.text();
        let data: ReturnedJSON = JSON.parse(list);
        generateServerlist(data);
    }

    function generateServerlist(_data: ReturnedJSON): void {
        serverFirework = [];
        let keys: string[] = Object.keys(_data.data);

        for (let key of keys) {
            let value: ServerFireworkComponents = _data.data[key];
            let name: string = value.name;
            let colour: Colour = colours[value.colour];
            let pattern: Pattern = patterns[value.pattern];
            let size: number = value.size;
            let lifespan: number = value.lifespan;
            let id: string = key;
            let serverSaved: boolean = value.serverSaved;
            serverFirework.push({ name: name, colour: colour, pattern: pattern, size: size, lifespan: lifespan, id: id, serverSaved: serverSaved });
        }
        writeServerList();
    }


    function writeServerList(): void {
        let list: HTMLElement = <HTMLElement>document.querySelector("#uListServer");
        list.innerHTML = "";

        for (let index: number = 0; index < serverFirework.length; index++) {

            //list.innerHTML += "<li id=\"serverFirework" + index + "\">" + serverFirework[index].name + "<img id=\"serverFireworkDelete" + index + "\" class=\"trash\" src=\"Ressources/trash.png\">" + "</li>";

            let newLi: HTMLLIElement = document.createElement("li");
            newLi.setAttribute("id", "serverFirework" + String(index));

            let newInfoDiv: HTMLDivElement = document.createElement("div");
            newInfoDiv.classList.add("List_Info_Element");
            let newNameSpan: HTMLSpanElement = document.createElement("span");
            newNameSpan.innerHTML = serverFirework[index].name;
            newNameSpan.classList.add("List_Name_Span");
            newInfoDiv.append(newNameSpan);

            let newPresetDiv: HTMLDivElement = document.createElement("div");
            newPresetDiv.style.backgroundColor = serverFirework[index].colour.name;
            newPresetDiv.classList.add("List_Preset_Element");
            newInfoDiv.append(newPresetDiv);

            newPresetDiv.innerHTML += "<img \" class=\"List_Pattern\" src=\"Ressources/" + String(serverFirework[index].pattern) + ".png\">";

            let newSizeSpan: HTMLSpanElement = document.createElement("span");
            let newDurationSpan: HTMLSpanElement = document.createElement("span");
            newSizeSpan.classList.add("List_Size_Span");
            newDurationSpan.classList.add("List_Duration_Span");
            newSizeSpan.innerHTML = String(serverFirework[index].size);
            newDurationSpan.innerHTML = String(serverFirework[index].lifespan);
            newPresetDiv.append(newSizeSpan);
            newPresetDiv.append(newDurationSpan);

            let newTrashSpan: HTMLSpanElement = document.createElement("span");
            newTrashSpan.innerHTML += "<img id=\"serverFireworkDelete" + index + "\" class=\"trash\" src=\"Ressources/trash.png\">";
            newTrashSpan.classList.add("List_Trash");
            newInfoDiv.append(newTrashSpan);

            newLi.append(newInfoDiv);            
            
            list.append(newLi);
        }

        let serverlist: HTMLElement = <HTMLElement>document.querySelector("#List_Server");
        serverlist.addEventListener("click", handleClick);
    }

    function handleClick(_event: MouseEvent): void {
        let target: Element = (_event.target as Element);
        let targetFound: boolean = false;
        while(targetFound == false)
        {
            if (target.id.includes("Delete"))
            {
                targetFound = true;
            }
            else
            if(target.tagName == "LI")
            {
                targetFound = true;
            }
            else
            {
                target = target.parentElement;
            }
        }
        let id: string = target.id;
        

        if (id.includes("localFirework")) {
            if (id.includes("Delete")) {
                let newId: number = cutID(id, 19);
                deleteFirework("localFirework", newId);
            }
            else {
                let newId: number = cutID(id, 13);
                useFirework(localFirework[newId], "localFirework", newId);
                getInput();
            }
        }
        else if (id.includes("serverFirework")) {

            if (id.includes("Delete")) {
                let newId: number = cutID(id, 20);
                deleteFirework("serverFirework", newId);
            }
            else {
                let newId: number = cutID(id, 14);
                useFirework(serverFirework[newId], "serverFirework", newId);
                getInput();
            }
        }

    }


    function deleteFirework(_name: string, _element: number): void {
        if (_name == "serverFirework") {
            console.log("delete Element");
            sendListElement("Defined" + _element, "delete");
        }

        else {
            localFirework.splice(_element, 1);
            wirteLocalList();
        }
    }



    function useFirework(_firework: FireworkComponents, _array: string, _position: number): void {
        let name: HTMLInputElement = <HTMLInputElement>document.querySelector("#name");
        let colour: HTMLSelectElement = <HTMLSelectElement>document.querySelector("#colours");
        let circle: HTMLInputElement = <HTMLInputElement>document.querySelector("#circle");
        let star: HTMLInputElement = <HTMLInputElement>document.querySelector("#star");
        let cross: HTMLInputElement = <HTMLInputElement>document.querySelector("#cross");
        let lifespan: HTMLInputElement = <HTMLInputElement>document.querySelector("#lifespan");
        let size: HTMLInputElement = <HTMLInputElement>document.querySelector("#size");
        let position: HTMLInputElement = <HTMLInputElement>document.querySelector("#position");
        let id: HTMLInputElement = <HTMLInputElement>document.querySelector("#uniqueId");

        if (_firework.pattern == Pattern.circle) {
            circle.checked = true;
        }
        else if (_firework.pattern == Pattern.star) {
            star.checked = true;
        }
        else if (_firework.pattern == Pattern.cross) {
            cross.checked = true;
        }

        name.value = _firework.name;
        colour.value = _firework.colour.name;
        lifespan.value = _firework.lifespan.toString();
        size.value = _firework.size.toString();
        id.value = _firework.id;
        position.value = _position.toString();

        currentFirework.name = _firework.name;
        currentFirework.colour = _firework.colour;
        currentFirework.pattern = _firework.pattern;
        currentFirework.size = _firework.size;
        currentFirework.lifespan = _firework.lifespan;
        currentFirework.id = _firework.id;
        currentFirework.serverSaved = _firework.serverSaved;
    }


    function cutID(_id: string, _length: number): number {
        let newId: string = _id.slice(_length);
        return parseInt(newId);
    }


    function getInput(): void {
        let name: HTMLInputElement = <HTMLInputElement>document.querySelector("#name");
        let jColour: HTMLSelectElement = <HTMLSelectElement>document.querySelector("#colours");
        let lifespan: HTMLInputElement = <HTMLInputElement>document.querySelector("#lifespan");
        let size: HTMLInputElement = <HTMLInputElement>document.querySelector("#size");
        let htmlPattern: HTMLInputElement = <HTMLInputElement>document.querySelector("input[name=\"pattern\"]:checked");

        let colour: Colour = colours[jColour.value.toString()];
        let pattern: Pattern = patterns[htmlPattern!.value];

        currentFirework.name = name.value;
        currentFirework.colour = colour;
        currentFirework.pattern = pattern;
        currentFirework.lifespan = Number(lifespan.value);
        currentFirework.size = Number(size.value);
        let currentSize: HTMLSpanElement = document.querySelector("#creation_current_size");
        currentSize.innerHTML = String(currentFirework.size);
        let currentLifespan: HTMLSpanElement = document.querySelector("#creation_current_lifespan");
        currentLifespan.innerHTML = String(currentFirework.lifespan);
        let currentColor: HTMLSpanElement = document.querySelector("#creation_current_color");
        currentColor.style.backgroundColor = currentFirework.colour.name;
        let currentPattern: HTMLSpanElement = document.querySelector("#creation_current_pattern");
        currentPattern.innerHTML = "<img \" class=\"List_Pattern\" src=\"Ressources/" + String(currentFirework.pattern) + ".png\">";
    }

    function drawBackground(): void {
        cc2.beginPath();
        cc2.fillStyle = "black";
        cc2.fillRect(0, 0, cc2.canvas.width, cc2.canvas.height);
        cc2.closePath();
    }

    function handleSaveButton(): void {
        console.log("save Button");
        if (currentFirework.name == "") {
            alert("Fill in Name!");
        }
        else {
            if (checkList(serverFirework) == true) {
                console.log("Update List");
                let position: HTMLInputElement = <HTMLInputElement>document.querySelector("#position");
                let element: number = Number(position.value);
                serverFirework[element] = { name: currentFirework.name, colour: currentFirework.colour, pattern: currentFirework.pattern, size: currentFirework.size, lifespan: currentFirework.lifespan, id: currentFirework.id, serverSaved: true };
                console.log(serverFirework);
                sendListElement("Defined" + element, "update");
                return;
            }

            else {
                let name: string = currentFirework.name;
                let colour: Colour = currentFirework.colour;
                let pattern: Pattern = currentFirework.pattern;
                let size: number = currentFirework.size;
                let lifespan: number = currentFirework.lifespan;
                let id: string = currentFirework.id;
                let serverSaved: boolean = true;

                serverFirework.push({ name, colour, pattern, size, lifespan, id, serverSaved });
                console.log(serverFirework);
                sendListElement("Undefined", "insert");
                return;
            }
        }
    }

    function checkList(_fireworks: FireworkComponents[]): Boolean {
        let id: HTMLInputElement = <HTMLInputElement>document.querySelector("#uniqueId");
        let saved: Boolean = false;

        if (_fireworks == undefined) {
            saved = false;
        }

        else {
            for (let firework of _fireworks) {
                if (saved == true) {
                    return saved;
                }
                else {
                    if (firework.id == id.value && currentFirework.name == firework.name) {
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

    async function sendListElement(_element: string, _command: string): Promise<void> {
        let name: string;
        let colour: string;
        let pattern: string;
        let size: number;
        let lifespan: number;
        let id: string;
        let serverSaved: boolean;


        if (_element.includes("Defined") && _command != "delete") {
            let newElement: number = cutID(_element, 7);
            name = serverFirework[newElement].name;
            colour = serverFirework[newElement].colour.name;
            pattern = serverFirework[newElement].pattern;
            size = serverFirework[newElement].size;
            lifespan = serverFirework[newElement].lifespan;
            id = serverFirework[newElement].id;
            serverSaved = serverFirework[newElement].serverSaved;

            let json: ServerFireworkComponents = ({ name, colour, pattern, size, lifespan, id, serverSaved });

            let query: URLSearchParams = new URLSearchParams();
            query.set("command", _command);
            query.set("collection", "Firework");
            query.set("data", JSON.stringify(json));
            console.log(JSON.stringify(json));
            query.set("id", serverFirework[newElement].id);
            let response: Response = await fetch(url + "?" + query.toString());
            let responseText: string = await response.text();
            if (responseText.includes("success")) {
                alert("Item Updated!");
            }
            else {
                alert("Error! Try again!");
            }
        }

        else if (_element == "Undefined") {
            let newElement: number = serverFirework.length - 1;
            name = serverFirework[newElement].name;
            colour = serverFirework[newElement].colour.name;
            pattern = serverFirework[newElement].pattern;
            size = serverFirework[newElement].size;
            lifespan = serverFirework[newElement].lifespan;
            id = serverFirework[newElement].id;
            serverSaved = serverFirework[newElement].serverSaved;

            let json: ServerFireworkComponents = ({ name, colour, pattern, size, lifespan, id, serverSaved });


            let query: URLSearchParams = new URLSearchParams();
            query.set("command", _command);
            query.set("collection", "Firework");
            query.set("data", JSON.stringify(json));
            let response: Response = await fetch(url + "?" + query.toString());
            let responseText: string = await response.text();

            if (responseText.includes("success")) {
                alert("Item added!");
            }
            else {
                alert("Error! Try again!");
            }
        }

        else if (_element.includes("Defined") && _command == "delete") {
            let newElement: number = cutID(_element, 7);
            console.log("Send List delete");

            let query: URLSearchParams = new URLSearchParams();
            query.set("command", _command);
            query.set("collection", "Firework");
            query.set("id", serverFirework[newElement].id);
            let response: Response = await fetch(url + "?" + query.toString());
            let responseText: string = await response.text();
            if (responseText.includes("success")) {
                alert("Item deleted!");
            }
            else {
                alert("Error! Try again!");
            }
        }

        requestList();

    }

    function handleCreateButton(): void {
        console.log("create Button!");
        if (currentFirework.name == "") {
            alert("Fill in Name!");
        }
        else {
            if (checkList(localFirework) == true) {
                console.log("Update Local List");
                let position: HTMLInputElement = <HTMLInputElement>document.querySelector("#position");
                let htmlId: HTMLInputElement = <HTMLInputElement>document.querySelector("#uniqueId");
                let element: number = Number(position.value);

                localFirework[element] = { name: currentFirework.name, colour: currentFirework.colour, pattern: currentFirework.pattern, size: currentFirework.size, lifespan: currentFirework.lifespan, id: currentFirework.id, serverSaved: true };

                htmlId.value = currentFirework.id;
                position.value = (localFirework.length - 1).toString();

                console.log(localFirework);
                wirteLocalList();
                return;
            }

            else {
                let name: string = currentFirework.name;
                let colour: Colour = currentFirework.colour;
                let pattern: Pattern = currentFirework.pattern;
                let size: number = currentFirework.size;
                let lifespan: number = currentFirework.lifespan;
                let id: string = "local" + iLocalArray.toString();
                let serverSaved: boolean = true;
                iLocalArray++;

                let htmlId: HTMLInputElement = <HTMLInputElement>document.querySelector("#uniqueId");
                let position: HTMLInputElement = <HTMLInputElement>document.querySelector("#position");

                localFirework.push({ name, colour, pattern, size, lifespan, id, serverSaved });

                htmlId.value = id;
                position.value = (localFirework.length - 1).toString();

                console.log(localFirework);
                wirteLocalList();
                return;
            }
        }
    }


    function wirteLocalList(): void {
        let list: HTMLElement = <HTMLElement>document.querySelector("#uListLocal");
        list.innerHTML = "";

        for (let index: number = 0; index < localFirework.length; index++) {

            let newLi: HTMLLIElement = document.createElement("li");
            newLi.setAttribute("id", "localFirework" + String(index));

            let newInfoDiv: HTMLDivElement = document.createElement("div");
            newInfoDiv.classList.add("List_Info_Element");
            let newNameSpan: HTMLSpanElement = document.createElement("span");
            newNameSpan.innerHTML = localFirework[index].name;
            newNameSpan.classList.add("List_Name_Span");
            newInfoDiv.append(newNameSpan);

            let newPresetDiv: HTMLDivElement = document.createElement("div");
            newPresetDiv.style.backgroundColor = localFirework[index].colour.name;
            newPresetDiv.classList.add("List_Preset_Element");
            newInfoDiv.append(newPresetDiv);

            newPresetDiv.innerHTML += "<img \" class=\"List_Pattern\" src=\"Ressources/" + String(localFirework[index].pattern) + ".png\">";

            let newSizeSpan: HTMLSpanElement = document.createElement("span");
            let newDurationSpan: HTMLSpanElement = document.createElement("span");
            newSizeSpan.classList.add("List_Size_Span");
            newDurationSpan.classList.add("List_Duration_Span");
            newSizeSpan.innerHTML = String(localFirework[index].size);
            newDurationSpan.innerHTML = String(localFirework[index].lifespan);
            newPresetDiv.append(newSizeSpan);
            newPresetDiv.append(newDurationSpan);

            let newTrashSpan: HTMLSpanElement = document.createElement("span");
            newTrashSpan.innerHTML += "<img id=\"localFireworkDelete" + index + "\" class=\"trash\" src=\"Ressources/trash.png\">";
            newTrashSpan.classList.add("List_Trash");
            newInfoDiv.append(newTrashSpan);

            newLi.append(newInfoDiv);            
            
            list.append(newLi);

        }

        let serverlist: HTMLElement = <HTMLElement>document.querySelector("#List_Local");
        serverlist.addEventListener("click", handleClick, true);
    }


    function handleResetButton(): void {
        localFirework = [];
        wirteLocalList();
    }


    function handleCanvasClick(_event: MouseEvent): void {
        if (currentFirework.pattern == Pattern.circle) {
            let position: Vector = new Vector(_event.offsetX, _event.offsetY);

            let circleFirework: Circle = new Circle(position, currentFirework.colour, currentFirework.size, currentFirework.lifespan);
            circleFirework.draw();
            explosives.push(circleFirework);
        }

        if (currentFirework.pattern == Pattern.star) {
            let position: Vector = new Vector(_event.offsetX, _event.offsetY);

            let starFirework: Star = new Star(position, currentFirework.colour, currentFirework.size, currentFirework.lifespan);
            starFirework.draw();
            explosives.push(starFirework);
        }

        if (currentFirework.pattern == Pattern.cross) {
            let position: Vector = new Vector(_event.offsetX, _event.offsetY);

            let crossFirework: Cross = new Cross(position, currentFirework.colour, currentFirework.size, currentFirework.lifespan);
            crossFirework.draw();
            explosives.push(crossFirework);
        }
    }

    function update(): void {
        cc2.putImageData(background, 0, 0);
        console.log("update");

        for (let explosive of explosives) {
            explosive.explode();
            explosive.draw();
        }
        deleteExpandables();
    }
    function deleteExpandables(): void {
        for (let i: number = explosives.length - 1; i >= 0; i--) {
            if (explosives[i].expandable)
                explosives.splice(i, 1);
        }
    }
    export function randomBetween(min: number, max: number): number
    {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

}