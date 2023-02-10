namespace CustomFirework {

    export interface FireworkComponents {
        name: string;
        colour: Colour;
        pattern: Pattern;
        size: number;
        lifespan: number;
        id: string;
        serverSaved: boolean;
    }
    export interface ServerFireworkComponents {
        name: string;
        colour: string;
        pattern: string;
        size: number;
        lifespan: number;
        id: string;
        serverSaved: boolean;
    }

    
}