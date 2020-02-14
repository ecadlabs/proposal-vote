import { localForger } from "@taquito/local-forging";
import { InMemorySigner } from "@taquito/signer";
import { Forger, RpcForger, Signer, TezosOperationError, TezosToolkit } from "@taquito/taquito";
import { TezBridgeSigner } from "@taquito/tezbridge-signer";
import { Box, Button, FormField, List, RadioButtonGroup, Text } from "grommet";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { State } from "../redux/reducers";
import { OperationProgress } from "./progress";
import styled from 'styled-components';

const CustomRadioButtonGroup = styled(RadioButtonGroup)`
    transform: scale(0.7) translate(-20%, -20%)
`;

const fromCamelToSentence = (text: string) => {
    var result = text.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
}

const createTaquito = (signerType: string, forgerType: string) => {
    const taquito = new TezosToolkit()
    let signer: Signer = new InMemorySigner('edsk4TjJWEszkHKono7XMnepVqwi37FrpbVt1KCsifJeAGimxheShG')
    let forger: Forger = taquito.getFactory(RpcForger)();
    if (signerType === 'tezbridge') {
        signer = new TezBridgeSigner()
    }

    if (forgerType === 'local') {
        forger = localForger
    }

    taquito.setProvider({ rpc: 'https://api.tez.ie/rpc/carthagenet', signer, forger })
    return taquito
}

export const VoterPanel: React.FC = () => {
    const [signer, setSigner] = useState('in-memory');
    const [forger, setForger] = useState('rpc');
    const taquito = createTaquito(signer, forger)

    return <>
        <Box direction='row' gap='small'>
            <Box flex>
                <FormField name="signer" label="Signer" />
                <CustomRadioButtonGroup
                    name="signer"
                    options={['tezbridge', 'in-memory']}
                    value={signer}
                    onChange={({ target }) => setSigner(target.value)}>
                </CustomRadioButtonGroup>
            </Box>
            <Box flex >
                <FormField name="Forger" label="Forger" />
                <CustomRadioButtonGroup
                    name="forger"

                    options={['local', 'rpc']}
                    value={forger}
                    onChange={({ target }) => setForger(target.value)}>
                </CustomRadioButtonGroup>
            </Box>
        </Box>
        <br></br>
        <VotingForm taquito={taquito}></VotingForm>
    </>
}

export const VotingForm: React.FC<{ taquito: TezosToolkit }> = ({ taquito }) => {
    const [pkh, setPKH] = useState();
    const [error, setError] = useState();
    const [voting, setVoting] = useState(false);
    const [receipt, setReceipt] = useState<Partial<{ opHash: string, consumedGas: string, fee: number, storage: string }> | null>(null)
    const { contractAddress } = useSelector((state: State) => state.contract)

    const sendVoteOperation = async (vote: 1 | 2 | 3) => {
        const contract = await taquito.contract.at(contractAddress!);
        return await contract.methods.vote(vote).send()
    }

    const vote = async (vote: 1 | 2 | 3) => {
        try {
            setError('')
            setVoting(true);
            const op = await sendVoteOperation(vote);
            setReceipt({
                opHash: op.hash
            })
            await op.confirmation();
            setReceipt({
                opHash: op.hash,
                consumedGas: op.consumedGas,
                fee: op.fee,
                storage: op.storageDiff
            })
        }
        catch (ex) {
            if (ex instanceof TezosOperationError) {
                setError(ex.message)
            } else {
                setError('Unknown error')
            }
        }
        finally {
            setVoting(false)
        }
    }

    useEffect(() => {
        taquito.signer.publicKeyHash().then((pkh) => {
            setPKH(pkh);
        })
    }, [taquito])

    return <>
        {error ? <Box margin={{ bottom: 'small' }} background='status-critical' pad='small'>
            {error}
        </Box> : null}
        <Text size="small">Address: {pkh}</Text>
        <br></br>
        {voting && (<><OperationProgress></OperationProgress><br></br></>)}
        <Box gap='xsmall'>
            <Button label='Vote yay' primary disabled={voting} onClick={() => vote(1)} />
            <Button label='Vote nay' primary disabled={voting} onClick={() => vote(2)} />
            <Button label='Pass' primary disabled={voting} onClick={() => vote(3)} />
        </Box>
        <br></br>
        <List
            primaryKey="key"
            secondaryKey="value"
            data={Object.keys(receipt ?? {}).map((x) => ({ key: fromCamelToSentence(x), value: (receipt as any)?.[x] }))}
        />
    </>
}