namespace CustomFirework {
    window.addEventListener("load", handleLoad);

    let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");
    export let cc2: CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas.getContext("2d");
    let background: ImageData;

    export let url: string = "https://webuser.hs-furtwangen.de/~haiderna/Database/index.php";
    export let fireworks: string = "FireworkPresets";

    export let serverFirework: FireworkComponents[];
    export let currentFirework: FireworkComponents;
    export let localFirework: FireworkComponents[];

    export let explosives: Firework[] = [];

    interface Data {
        [id: string]: ServerFireworkComponents;
    }

    interface ReturnedJSON {
        status: string;
        data: Data;
    }


    currentFirework = {
        name: "Test",
        colour: colours[12],
        pattern: Pattern.cross,
        size: 0,
        lifespan: 0,
        id: "",
        serverSaved: false
    };

    async function handleLoad() {
        let create: HTMLDivElement = <HTMLDivElement>document.getElementById("create");
        create.addEventListener("change", getInput);


        drawBackground();
        background = cc2.getImageData(0, 0, cc2.canvas.width, cc2.canvas.height);
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
            let id: string = value.id;
            let serverSaved: boolean = value.serverSaved;
            serverFirework.push({ name: name, colour: colour, pattern: pattern, size: size, lifespan: lifespan, id: id, serverSaved: serverSaved });
        }
        writeServerList();
    }


    function writeServerList(): void {
        let list: HTMLElement = <HTMLElement>document.querySelector("#uList");
        list.innerHTML = "";

        for (let index: number = 0; index < serverFirework.length; index++) {

            list.innerHTML += "<li id=\"serverFirework" + index + "\">" + serverFirework[index].name + "</li>";

        }

        let serverlist: HTMLElement = <HTMLElement>document.querySelector("#serverList");
        serverlist.addEventListener("click", handleClick);
    }

    function handleClick(_event: MouseEvent): void {
        let id: string = (_event.target as Element).id;

        if (id.includes("Firework")) {
            if (id.includes("delete")) {
                console.log("delete Item");
            }
            else {
                let newId: number = cutID(id, 14);
                useFirework(serverFirework[newId], "serverFirework", newId);
            }
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
        let list: HTMLInputElement = <HTMLInputElement>document.querySelector("#list");

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
        position.value = _position.toString();
        list.value = _array.toString();

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
        console.log(currentFirework);
    }

    function drawBackground(): void {
        cc2.beginPath();
        cc2.fillStyle = "black";
        cc2.fillRect(0, 0, cc2.canvas.width, cc2.canvas.height);
        cc2.closePath();
    }
}