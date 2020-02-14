import React, { useState, useEffect } from "react";

import { Tezos } from "@taquito/taquito";

import { Meter } from "grommet";
import { baseConfig } from "../utils";
Tezos.setProvider({ ...baseConfig })

export const OperationProgress: React.FC = () => {
    const [progress, setProgress] = useState(0);
    const [timestamp, setTimestamp] = useState<Date | null>(null);
    useEffect(() => {
        Tezos.rpc.getBlockHeader().then(({ timestamp }) => {
            setTimestamp(new Date(timestamp))
        })
    }, [])

    useEffect(() => {
        let buffer = 1;
        let init = 1;
        const step = 0.95;
        const interval = setInterval(() => {
            const diff = (new Date().getTime()) - (timestamp?.getTime() ?? 0);
            const progress = Math.min(((diff / 1000) / 30) * 80, 80);
            setProgress(progress + buffer);
            init *= step;
            buffer = buffer + init;
        }, 1000)

        return () => clearInterval(interval)
    }, [timestamp])

    return <Meter margin={{ top: '10px' }} size='full' values={[{
        value: progress,
        label: 'Progress',
    }]}></Meter>
}