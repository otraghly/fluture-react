import { Cancel, ResolveFunction, RejectFunction, FutureInstance } from 'fluture';
export declare const useFuture: <L, R>() => {
    running: boolean;
    cancel: (() => undefined) | undefined;
    cfork: <LT = L>(reject: RejectFunction<LT>) => <RT = R>(resolve: ResolveFunction<RT>) => (fluture: FutureInstance<LT, RT>) => Cancel;
};
//# sourceMappingURL=useFuture.d.ts.map