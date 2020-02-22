"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fluture_1 = require("fluture");
var react_1 = require("react");
exports.useFuture = function () {
    var last_cancel_fork_ref = react_1.useRef();
    var _a = react_1.useState(), cancel_info = _a[0], set_cancel_info = _a[1];
    var cancel = react_1.useMemo(function () { return cancel_info ? (function () {
        if (last_cancel_fork_ref.current !== cancel_info.cancel_fork)
            return undefined;
        cancel_info.cancel_fork();
        last_cancel_fork_ref.current = undefined;
        set_cancel_info(undefined);
    }) : undefined; }, [cancel_info]);
    react_1.useEffect(function () { return cancel; }, [cancel]);
    var cfork = react_1.useCallback(function (reject) { return function (resolve) {
        return function (fluture) {
            var finished = false;
            var cancel_fork = fluture_1.fork(function (rejection) {
                finished = true;
                reject(rejection);
                last_cancel_fork_ref.current = undefined;
                set_cancel_info(undefined);
            })(function (resolution) {
                finished = true;
                resolve(resolution);
                last_cancel_fork_ref.current = undefined;
                set_cancel_info(undefined);
            })(fluture);
            // Already finished, returning noop cancel
            if (finished)
                return function () { return undefined; };
            last_cancel_fork_ref.current = cancel_fork;
            set_cancel_info({
                cancel_fork: cancel_fork,
            });
            return function () {
                cancel_fork();
                if (last_cancel_fork_ref.current === cancel_fork)
                    set_cancel_info(undefined);
            };
        };
    }; }, []);
    return {
        running: !!cancel,
        cancel: cancel,
        cfork: cfork,
    };
};
//# sourceMappingURL=useFuture.js.map