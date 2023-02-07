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
            console.log("J Colour");
            console.log(jColour);
            
            colour = colours.jColour;
            console.log("Colour");
            console.log(colour);
            
            jPattern = item[2];
            size = Number(item[3]);
            lifespan = Number(item[4]);
            id = keys[index];
            serverSaved = JSON.parse(item[6]);


            console.log(jPattern);
            if (jPattern.includes("circle")) {
                pattern = Pattern.circle;
            }  
            else if (jPattern.includes("star")) {
                pattern = Pattern.star;
            }   
            else if (jPattern.includes("cross")) {
                pattern = Pattern.cross;
            }     


            serverFirework.push({ name: name, colour: colour, pattern: pattern, size: size, lifespan: lifespan, id: id, serverSaved: serverSaved });
        }
        console.log(serverFirework);
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