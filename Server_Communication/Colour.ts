namespace CustomFirework {
    export interface Colour {
        fColour: string;
        hColour: string;
        name: string;
    }


    export let colours: { [key: string]: Colour } = {
        "yellow": {
            fColour: "hsla(63, 100%, 50%, 1)",
            hColour: "hsla(63, 100%, 50%, 0.5)",
            name: "yellow"
        },
        "red": {
            fColour: "hsla(0, 100%, 50%, 1)",
            hColour: "hsla(0, 100%, 50%, 0.5)",
            name: "red"
        },
        "blue": {
            fColour: "hsla(238, 100%, 50%, 1)",
            hColour: "hsla(238, 100%, 50%, 0.5)",
            name: "blue"
        },
        "green": {
            fColour: "hsla(113, 100%, 50%, 1)",
            hColour: "hsla(113, 100%, 50%, 0.5)",
            name: "green"
        },
        "white": {
            fColour: "hsla(0, 100%, 100%, 1)",
            hColour: "hsla(0, 100%, 100%, 0.5)",
            name: "white"
        }

    };
}