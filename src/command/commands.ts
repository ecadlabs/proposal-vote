import { Tezos } from "@taquito/taquito";
import { createUpdateStorageAction, createContractLoadingAction, createNewContractAction } from "../redux/actions";
import { State } from "../redux/reducers";
import { storage, code } from "../code";

Tezos.setProvider({ rpc: 'https://api.tez.ie/rpc/carthagenet' })

const setupTaquito = async () => {
    const faucetKey = {
        "mnemonic": [
            "satisfy",
            "survey",
            "game",
            "thunder",
            "leaf",
            "rack",
            "adult",
            "fan",
            "stage",
            "choose",
            "pear",
            "swarm",
            "spoil",
            "pupil",
            "because"
        ],
        "secret": "6dc25203599c04aa76e765ab33ff552cff3ae684",
        "amount": "25456890835",
        "pkh": "tz1YsT2ZzRPq66uTT1W9zLmeZF6GZJMmTDwM",
        "password": "JVxRfxU6SD",
        "email": "bplytowq.nrcqojoz@tezos.example.org"
    }
    await Tezos.importKey(faucetKey.email, faucetKey.password, faucetKey.mnemonic.join(" "), faucetKey.secret)
    return faucetKey.pkh;
}

export const originateContract = (proposal: string) => async (dispatch: any) => {
    dispatch(createContractLoadingAction())

    const pkh = await setupTaquito();

    const op = await Tezos.contract.originate({
        code: code,
        init: storage(pkh, proposal)
    })

    const contract = await op.contract();

    dispatch(createNewContractAction(contract.address))
    dispatch(updateStorage)
}

export const addVoter = (address: string) => async (dispatch: any, getState: () => State) => {
    dispatch(createContractLoadingAction())

    await setupTaquito();
    const contractAddress = getState()?.contract?.contractAddress!;
    const contract = await Tezos.contract.at(contractAddress);
    const op = await contract.methods.addVoters({ [address]: "1" }).send()
    await op.confirmation()

    dispatch(createContractLoadingAction(false))
    dispatch(updateStorage)
}

export const updateStorage = async (dispatch: any, getState: () => State) => {
    const contractAddress = getState()?.contract?.contractAddress;

    if (contractAddress) {
        const contract = await Tezos.contract.at(contractAddress)
        const storage = await contract.storage()
        return dispatch(createUpdateStorageAction(storage))
    }
}