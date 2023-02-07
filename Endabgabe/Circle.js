"use strict";
var CustomFirework;
(function (CustomFirework) {
    class Circle extends CustomFirework.Firework {
        constructor(_position, _colour, _size, _lifespan) {
            super(_position, _colour, _size, _lifespan);
        }
        draw() {
            console.log("Draw Circle");
            let radiusParticle = 10 * this.size;
            let radiusCircle = 1;
            let particle = new Path2D();
            let gradient = CustomFirework.cc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
            let start = CustomFirework.cc2.getTransform();
            CustomFirework.cc2.translate(this.position.x, this.position.y);
            particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
            gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
            gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
            CustomFirework.cc2.fillStyle = gradient;
            for (let index = 0; index < 80; index++) {
                let angle = (index / 10) * 360;
                let radius = radiusCircle * this.iLifetime;
                let xPosition = radius * Math.cos(angle);
                let yPosition = radius * Math.sin(angle);
                CustomFirework.cc2.save();
                CustomFirework.cc2.translate(xPosition, yPosition);
                CustomFirework.cc2.fill(particle);
                CustomFirework.cc2.restore();
            }
            CustomFirework.cc2.setTransform(start);
        }
    }
    CustomFirework.Circle = Circle;
})(CustomFirework || (CustomFirework = {}));
//# sourceMappingURL=Circle.js.map