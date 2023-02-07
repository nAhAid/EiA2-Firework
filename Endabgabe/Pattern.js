"use strict";
var CustomFirework;
(function (CustomFirework) {
    let Pattern;
    (function (Pattern) {
        Pattern["circle"] = "circle";
        Pattern["star"] = "star";
        Pattern["cross"] = "cross";
    })(Pattern = CustomFirework.Pattern || (CustomFirework.Pattern = {}));
    CustomFirework.patterns = {
        "circle": Pattern.circle,
        "star": Pattern.star,
        "cross": Pattern.cross
    };
})(CustomFirework || (CustomFirework = {}));
//# sourceMappingURL=Pattern.js.map