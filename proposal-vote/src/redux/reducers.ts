import { Actions, Action } from "./actions"
import { BigNumber } from 'bignumber.js'

export interface State {
    contract: {
        loading: boolean;
        contractAddress?: string
        storage?: {
            voters: { [key: string]: BigNumber },
            votes: {
                "1": BigNumber,
                "2": BigNumber,
                "3": BigNumber,
            }
            admins: string[],
            enddate: string,
            proposal: string
        }
    }
}

export const initialState: State = {
    contract: {
        contractAddress: 'KT1Pic6XJcKLCfurvGTzB5RXqTorVZB2x7dz',
        loading: false
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