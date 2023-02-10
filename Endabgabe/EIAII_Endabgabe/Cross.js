"use strict";
var CustomFirework;
(function (CustomFirework) {
    class Cross extends CustomFirework.Firework {
        constructor(_position, _colour, _size, _lifespan) {
            super(_position, _colour, _size, _lifespan);
        }
        draw() {
            let radiusParticle = 1 * this.size / 10;
            let cross = 1;
            let particle = new Path2D();
            let gradient = CustomFirework.cc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
            let start = CustomFirework.cc2.getTransform();
            CustomFirework.cc2.translate(this.position.x, this.position.y);
            CustomFirework.cc2.rotate(this.randomRotation * Math.PI / 180);
            particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
            for (let k = 3; k >= 0; k--) {
                CustomFirework.cc2.save();
                CustomFirework.cc2.scale(1 - (k / 5), 1 - (k / 5));
                gradient.addColorStop(0, this.colour.fColour);
                gradient.addColorStop(1, this.colour.hColour);
                CustomFirework.cc2.fillStyle = gradient;
                for (let j = 0; j < 4; j++) {
                    CustomFirework.cc2.save();
                    CustomFirework.cc2.rotate(j * 90 * Math.PI / 180);
                    let radius = cross * this.iLifetime;
                    CustomFirework.cc2.translate(radius, 0);
                    CustomFirework.cc2.fill(particle);
                    CustomFirework.cc2.save();
                    CustomFirework.cc2.translate(0, -radius / 10);
                    CustomFirework.cc2.fill(particle);
                    CustomFirework.cc2.restore();
                    CustomFirework.cc2.save();
                    CustomFirework.cc2.translate(0, radius / 10);
                    CustomFirework.cc2.fill(particle);
                    CustomFirework.cc2.restore();
                    CustomFirework.cc2.restore();
                }
                CustomFirework.cc2.restore();
            }
            CustomFirework.cc2.setTransform(start);
        }
    }
    CustomFirework.Cross = Cross;
})(CustomFirework || (CustomFirework = {}));
//# sourceMappingURL=Cross.js.map