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
        [id: number]: FireworkComponents[];
    }

    interface ReturnedJSON {
        status: string;
        data: Data;
    }

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


    currentFirework = {
        name: "Test",
        colour: colours[12],
        pattern: Pattern.cross,
        size: 0,
        lifespan: 0,
        id: "HALLO",
        serverSaved: false
    };

    async function handleLoad() {
        console.log("start");

        let create: HTMLDivElement = <HTMLDivElement>document.getElementById("create");
        create.addEventListener("change", handleInputChange);


        drawBackground();
        background = cc2.getImageData(0, 0, cc2.canvas.width, cc2.canvas.height);
        //console.log(currentFirework.pattern);
        console.log(colours.Yellow);

        await requestList();
    }

    async function requestList() {
        let response: Response = await fetch(url + "?command=find&collection=Firework");
        let list: string = await response.text();
        let data: ReturnedJSON = JSON.parse(list);
        console.log(data);
        generateServerlist(data);
    }

    function generateServerlist(_data: ReturnedJSON) {
        console.log("generate Serverlist");

        serverFirework = [];
        let keys: string[] = Object.keys(_data.data);
        let values: string[] = Object.values(_data.data);


        for (let index: number = 0; index < keys.length; index++) {

            let item: string[] = Object.values(values[index]);
            let name: string;
            let jColour: string;
            let colour: Colour;
            let jPattern: string;
            let pattern: Pattern = Pattern.cross;
            let size: number;
            let lifespan: number;
            let id: string;
            let serverSaved: boolean;

            name = item[0];
            jColour = item[1];
            colour = colours.Red;


            jPattern = item[2];
            size = Number(item[3]);
            lifespan = Number(item[4]);
            id = keys[index];
            serverSaved = JSON.parse(item[6]);


            console.log(jPattern);
            if (jPattern.includes("circle")) {
                pattern = Pattern.circle;
            }
            if (jPattern.includes("star")) {
                pattern = Pattern.star;
            }
            if (jPattern.includes("cross")) {
                pattern = Pattern.cross;
            }

            switch (jColour) {
                case "Yellow":
                    colour = colours.Yellow;
                    break;
                case "Red":
                    colour = colours.Red;
                    break;
                case "Blue":
                    colour = colours.Blue;
                    break;
                case "Green":
                    colour = colours.Green;
                    break;
                case "White":
                    colour = colours.White;
                    break;
            }
            serverFirework.push({ name: name, colour: colour, pattern: pattern, size: size, lifespan: lifespan, id: id, serverSaved: serverSaved });
        }
        console.log(serverFirework);
        writeServerList();
    }


    function writeServerList(): void {
        let list: HTMLElement = <HTMLElement>document.querySelector("#uList");
        list.innerHTML = "";

        for (let index: number = 0; index < serverFirework.length; index++) {
            console.log("write List");
            list.innerHTML += "<li id=\"serverFirework" + index + "\">" + serverFirework[index].name + "</li>";

        }

        let serverlist: HTMLElement = <HTMLElement>document.querySelector("#serverList");
        serverlist.addEventListener("click", handleClick);
    }

    function handleClick(_event: MouseEvent): void {
        console.log(_event.clientX, _event.clientY);
        let id: string = (_event.target as Element).id;
        console.log(id);

        if (id.includes("server")) {
            if (id.includes("delete")) {
                console.log("delte Item");
            }
            else {
                let newId: number = cutID(id, 14);
                console.log(newId);
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
    }


    function cutID(_id: string, _length: number): number {
        let newId: string = _id.slice(_length);
        return parseInt(newId);
    }


    function handleInputChange(_event: Event): void {
        console.log("InputChange");
    }



    function drawBackground(): void {
        cc2.beginPath();
        cc2.fillStyle = "black";
        cc2.fillRect(0, 0, cc2.canvas.width, cc2.canvas.height);
        cc2.closePath();
    }
}