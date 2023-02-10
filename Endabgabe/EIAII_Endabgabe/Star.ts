namespace CustomFirework {
    export class Star extends Firework {

        constructor(_position: Vector, _colour: Colour, _size: number, _lifespan: number) {
            super(_position, _colour, _size, _lifespan);
        }

        draw(): void {
            let radiusParticle: number = 1 * this.size / 10;
            let starCircle: number = 1;
            let starHelper: number;

            let particle: Path2D = new Path2D();
            let gradient: CanvasGradient = cc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
            let start: DOMMatrix = cc2.getTransform();
            cc2.translate(this.position.x, this.position.y);
            cc2.rotate(this.randomRotation * Math.PI / 180);

            particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);

            for (let k: number = 3; k >= 0; k--) {
                cc2.save();
                cc2.scale(1 - (k / 10), 1 - (k / 10));
                gradient.addColorStop(0, this.colour.fColour);
                gradient.addColorStop(1, this.colour.hColour);
                cc2.fillStyle = gradient;
                for (let i: number = 0; i < 5; i++) {
                    cc2.save();
                    cc2.rotate(i * 72 * Math.PI / 180);
                    for (let j: number = 0; j < 4; j++) {
                        cc2.save();
                        cc2.rotate(j * 18 * Math.PI / 180);
                        let radius: number = starCircle * this.iLifetime;
                        switch (j) {
                            case 0:
                                starHelper = 2;
                                break;
                            case 1:
                                starHelper = 1.5;
                                break;
                            case 2:
                                starHelper = 1;
                                break;
                            case 3:
                                starHelper = 1.5;
                                break;
                            default:
                                starHelper = 1;
                                break;
                        }
                        cc2.translate(radius * starHelper, 0);
                        cc2.fill(particle);
                        cc2.restore();
                    }
                    cc2.restore();
                }
                cc2.restore();
            }
            cc2.setTransform(start);

        }
    }
}