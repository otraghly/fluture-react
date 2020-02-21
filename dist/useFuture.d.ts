import { Cancel, ResolveFunction, RejectFunction, FutureInstance } from 'fluture';
export declare const useFuture: <L, R>() => {
    running: boolean;
    cancel: (() => undefined) | undefined;
    cfork: (reject: RejectFunction<L>) => (resolve: ResolveFunction<R>) => (fluture: FutureInstance<L, R>) => Cancel;
};
//# sourceMappingURL=useFuture.d.ts.map