import { Actions, Action } from "./actions"
import { BigNumber } from 'bignumber.js'
import { MichelsonMap } from "@taquito/taquito";

export interface MonoVoteStorage {
    voters: MichelsonMap<string, BigNumber>,
    votes:  MichelsonMap<"1" | "2" | "3", BigNumber>,

    admins: string[],
    enddate: string,
    proposal: string
}
export interface State {
    contract: {
        loading: boolean;
        contractAddress?: string
        storage?: MonoVoteStorage
    }
}

export const initialState: State = {
    contract: {
        loading: false,
        // contractAddress: 'KT19yhL2VjMpUdvWg4GFVvQ82BLJzbsfYCju',
    }
}

export function taquitoApp(state: State | undefined, action: Actions) {
    if (typeof state === 'undefined') {
        return initialState
    }

    const { contract } = state;
    switch (action.type) {
        case Action.NEW_CONTRACT:
            return {
                contract: {
                    loading: false,
                    contractAddress: action.address
                }
            }
        case Action.UPDATE_STORAGE:

            return {
                ...state,
                contract: {
                    ...contract,
                    storage: action.storage,
                }
            }
        case Action.CONTRACT_LOADING:
            return {
                ...state,
                contract: {
                    ...contract,
                    loading: action.loading,
                }
            }
        default:
            return state
    }
}