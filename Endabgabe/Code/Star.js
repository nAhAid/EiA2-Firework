"use strict";
var CustomFirework;
(function (CustomFirework) {
    class Star extends CustomFirework.Firework {
        constructor(_position, _colour, _size, _lifespan) {
            super(_position, _colour, _size, _lifespan);
        }
        draw() {
            let radiusParticle = 1 * this.size / 10;
            let starCircle = 1;
            let starHelper;
            let particle = new Path2D();
            let gradient = CustomFirework.cc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
            let start = CustomFirework.cc2.getTransform();
            CustomFirework.cc2.translate(this.position.x, this.position.y);
            CustomFirework.cc2.rotate(this.randomRotation * Math.PI / 180);
            particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
            for (let k = 3; k >= 0; k--) {
                CustomFirework.cc2.save();
                CustomFirework.cc2.scale(1 - (k / 10), 1 - (k / 10));
                gradient.addColorStop(0, this.colour.fColour);
                gradient.addColorStop(1, this.colour.hColour);
                CustomFirework.cc2.fillStyle = gradient;
                for (let i = 0; i < 5; i++) {
                    CustomFirework.cc2.save();
                    CustomFirework.cc2.rotate(i * 72 * Math.PI / 180);
                    for (let j = 0; j < 4; j++) {
                        CustomFirework.cc2.save();
                        CustomFirework.cc2.rotate(j * 18 * Math.PI / 180);
                        let radius = starCircle * this.iLifetime;
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
                        CustomFirework.cc2.translate(radius * starHelper, 0);
                        CustomFirework.cc2.fill(particle);
                        CustomFirework.cc2.restore();
                    }
                    CustomFirework.cc2.restore();
                }
                CustomFirework.cc2.restore();
            }
            CustomFirework.cc2.setTransform(start);
        }
    }
    CustomFirework.Star = Star;
})(CustomFirework || (CustomFirework = {}));
//# sourceMappingURL=Star.js.map