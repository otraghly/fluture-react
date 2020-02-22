import { Cancel, ResolveFunction, RejectFunction, FutureInstance } from 'fluture';
export declare const useFuture: <L, R>() => {
    running: boolean;
    cancel: (() => undefined) | undefined;
    cfork: <LT = L, RT = R>(reject: RejectFunction<LT>) => (resolve: ResolveFunction<RT>) => (fluture: FutureInstance<LT, RT>) => Cancel;
};
//# sourceMappingURL=useFuture.d.ts.map