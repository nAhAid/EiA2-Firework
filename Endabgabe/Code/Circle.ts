namespace CustomFirework {
    export class Circle extends Firework {

        constructor(_position: Vector, _colour: Colour, _size: number, _lifespan: number) {
            super(_position, _colour, _size, _lifespan);
        }

        draw(): void {
            let radiusParticle: number = 1 * this.size / 10;
            let circle: number = 1;

            let particle: Path2D = new Path2D();
            let gradient: CanvasGradient = cc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
            let start: DOMMatrix = cc2.getTransform();
            cc2.translate(this.position.x, this.position.y);

            particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);

            for (let k: number = 3; k >= 0; k--) {
                cc2.save();
                cc2.scale(1 - (k / 5), 1 - (k / 5));
                gradient.addColorStop(0, this.colour.fColour);
                gradient.addColorStop(1, this.colour.hColour);
                cc2.fillStyle = gradient;
                for (let j: number = 0; j < 18; j++) {
                    cc2.save();
                    cc2.rotate(j * 20 * Math.PI / 180);
                    let radius: number = circle * this.iLifetime;
                    cc2.translate(radius, 0);
                    cc2.fill(particle);
                    cc2.restore();
                }
                cc2.restore();
            }
            cc2.setTransform(start);
        }
    }
}