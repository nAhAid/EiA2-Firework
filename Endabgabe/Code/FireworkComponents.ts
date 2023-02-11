namespace CustomFirework {

    export interface FireworkComponents {
        name: string;
        colour: Colour;
        pattern: Pattern;
        size: number;
        lifespan: number;
        id: string;
    }
    export interface ServerFireworkComponents {
        name: string;
        colour: string;
        pattern: string;
        size: number;
        lifespan: number;
        id: string;
    }

    
}