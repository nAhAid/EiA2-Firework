namespace CustomFirework {
    export class Circle extends Firework {

        constructor(_position: Vector, _colour: Colour, _size: number, _lifespan: number) {
            super(_position, _colour, _size, _lifespan);
        }

        draw(): void {
            console.log("Draw Circle");
            let radiusParticle: number = 10 * this.size;
            let radiusCircle: number = 1;

            let particle: Path2D = new Path2D();
            let gradient: CanvasGradient = cc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
            let start: DOMMatrix = cc2.getTransform();
            cc2.translate(this.position.x, this.position.y);

            particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
            gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
            gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");

            cc2.fillStyle = gradient;



            for (let index: number = 0; index < 80; index++) {
                let angle: number = (index / 10) * 360;
                let radius: number = radiusCircle * this.iLifetime;

                let xPosition: number = radius * Math.cos(angle);
                let yPosition: number = radius * Math.sin(angle);

                cc2.save();
                cc2.translate(xPosition, yPosition);
                cc2.fill(particle);
                cc2.restore();
            }

            cc2.setTransform(start);
        }
    }
}