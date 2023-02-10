"use strict";
var CustomFirework;
(function (CustomFirework) {
    class Firework {
        position;
        colour;
        size;
        lifespan;
        expandable = false;
        iLifetime = 1;
        randomRotation;
        constructor(_position, _colour, _size, _lifespan) {
            this.position = _position.copy();
            this.colour = _colour;
            this.size = _size;
            this.lifespan = _lifespan;
            this.randomRotation = CustomFirework.randomBetween(0, 90);
        }
        explode() {
            if (this.iLifetime <= this.lifespan * 10) {
                this.iLifetime++;
            }
            else {
                this.expandable = true;
            }
        }
    }
    CustomFirework.Firework = Firework;
})(CustomFirework || (CustomFirework = {}));
//# sourceMappingURL=Firework.js.map