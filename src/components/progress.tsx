import React, { useState, useEffect } from "react";

import { Tezos } from "@taquito/taquito";

import { Meter } from "grommet";
Tezos.setProvider({ rpc: 'https://api.tez.ie/rpc/carthagenet' })

export const OperationProgress: React.FC = () => {
    const [progress, setProgress] = useState(0);
    const [timestamp, setTimestamp] = useState<Date | null>(null);
    useEffect(() => {
        Tezos.rpc.getBlockHeader().then(({ timestamp }) => {
            setTimestamp(new Date(timestamp))
        })
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            const diff = (new Date().getTime()) - (timestamp?.getTime() ?? 0);
            setProgress(((diff / 1000) / 40) * 100);
        }, 1000)

        return () => clearInterval(interval)
    }, [timestamp])

    return <Meter margin={{ top: '10px' }} size='full' values={[{
        value: progress,
        label: 'Progress',
    }]}></Meter>
}