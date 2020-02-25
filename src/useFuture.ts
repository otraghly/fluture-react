import { Cancel, fork, ResolveFunction, RejectFunction, FutureInstance } from 'fluture'
import { useState, useCallback, useMemo, useRef, useEffect } from 'react'
interface CancelInfo {
    cancel_fork: Cancel
}

export const useFuture = <L, R>() => {
    const last_cancel_fork_ref = useRef<Cancel>()
    const [cancel_info, set_cancel_info] = useState<CancelInfo>()

    const cancel = useMemo(
        () => cancel_info ? (() => {
            if (last_cancel_fork_ref.current !== cancel_info.cancel_fork) return undefined
            cancel_info.cancel_fork()
            last_cancel_fork_ref.current = undefined
            set_cancel_info(undefined)
        }) : undefined,
        [cancel_info]
    )

    useEffect(() => cancel, [cancel])

    const cfork = useCallback(
        <LT = L>(reject: RejectFunction<LT>) => <RT = R>(resolve: ResolveFunction<RT>) =>
            (fluture: FutureInstance<LT, RT>): Cancel => {
                let finished = false
                const cancel_fork = fork
                    <LT>
                    (rejection => {
                        finished = true
                        reject(rejection)
                        last_cancel_fork_ref.current = undefined
                        set_cancel_info(undefined)
                    })
                    <RT>
                    (resolution => {
                        finished = true
                        resolve(resolution)
                        last_cancel_fork_ref.current = undefined
                        set_cancel_info(undefined)
                    })
                    (fluture)

                // Already finished, returning noop cancel
                if (finished) return () => undefined

                last_cancel_fork_ref.current = cancel_fork

                set_cancel_info({
                    cancel_fork,
                })

                return () => {
                    cancel_fork()

                    if (last_cancel_fork_ref.current === cancel_fork)
                        set_cancel_info(undefined)
                }
            },
        []
    )

    return {
        running: !!cancel,
        cancel,
        cfork,
    }
}