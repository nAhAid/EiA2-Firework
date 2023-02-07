namespace CustomFirework {
    export abstract class Firework {
        position: Vector;
        colour: Colour;
        size: number;
        lifespan: number;
        expendable: boolean = false;
        iLifetime: number = 1;

        constructor(_position: Vector, _colour: Colour, _size: number, _lifespan: number) {
            this.position = _position.copy();
            this.colour = _colour;
            this.size = _size;
            this.lifespan = _lifespan;
        }

        abstract draw(): void;

        explode(): void {
            console.log("Update iLifetime");
            if (this.iLifetime <= this.lifespan) {
                this.iLifetime++;
            }

            else {
                this.expendable = true;
            }
        }

    }
}