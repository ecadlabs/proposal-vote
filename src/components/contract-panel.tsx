import BigNumber from 'bignumber.js';
import { Box, List, Meter, Text, Form, FormField, Button } from 'grommet';
import React, { useState } from 'react';
import { State } from '../redux/reducers';
import { useSelector } from 'react-redux';

export const VoteMeter: React.FC<{ label: string, value: number }> = ({ label, value }) => {
    return <Box gap='small' justify='between' direction='row'>
        <Text>{label}</Text>
        <Meter
            values={[{
                value: value,
                label: label,
            }]}
            aria-label="meter"
        />
    </Box>
}

export const StorageView: React.FC<{ storage: State['contract']['storage'] }> = ({ storage }) => {
    const votesLeft = Array.from(storage?.voters.values()!);
    const votesDone = Array.from(storage?.votes.values()!);
    const total = [...votesLeft, ...votesDone].reduce((prev: BigNumber, current: BigNumber) => prev.plus(current), new BigNumber(0))

    const toPercent = (bigNum?: BigNumber) => {
        if (!bigNum) { return 0; }
        return bigNum.dividedBy(total).multipliedBy(100).toNumber();
    }

    return <div>
        <Box>
            <p>Details</p>
            <List
                primaryKey="key"
                secondaryKey="value"
                data={[
                    { key: 'Proposal', value: storage?.proposal },
                    { key: 'End Date', value: storage?.enddate },
                ]}
            />
        </Box>
        <br></br>
        <Box gap='small'>
            <VoteMeter label='Yay' value={toPercent(storage?.votes?.get("1"))}></VoteMeter>
            <VoteMeter label='Nay' value={toPercent(storage?.votes?.get("2"))}></VoteMeter>
            <VoteMeter label='Pass' value={toPercent(storage?.votes?.get("3"))}></VoteMeter>
        </Box>
        <br></br>
        {Object.keys(storage?.voters ?? []).length !== 0 &&
            <Box>
                <p>Voters</p>
                <List
                    primaryKey="key"
                    secondaryKey="value"
                    data={(Array.from(storage?.voters.entries()!) ?? []).map(([key, value]) => ({ key, value: value.toString() }))}
                />
            </Box>}
    </div>
}

export const AddVoterForm: React.FC<{ onSubmit: (address: string) => void }> = ({ onSubmit }) => {
    const [address, setAddress] = useState('');
    const loading = useSelector((state: State) => state.contract.loading);

    return <Form onSubmit={() => onSubmit(address)}>
        <FormField label="Voter address" value={address} onChange={({ target: { value } }) => setAddress(value)} />
        <Button disabled={!address || loading} type="submit" primary label="Add" />
    </Form>
}

export const OriginateForm: React.FC<{ onSubmit: (proposalHash: string) => void }> = ({ onSubmit }) => {
    const [proposal, setProposal] = useState('');
    const loading = useSelector((state: State) => state.contract.loading);

    return <Form onSubmit={() => onSubmit(proposal)}>
        <FormField label="Proposal" value={proposal} onChange={({ target: { value } }) => setProposal(value)} />
        <Button disabled={!proposal || loading} type="submit" primary label="Originate" />
    </Form>
}