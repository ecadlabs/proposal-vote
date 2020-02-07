export enum Action {
    NEW_CONTRACT = 'NEW_CONTRACT',
    CONTRACT_LOADING = 'CONTRACT_LOADING',
    UPDATE_STORAGE = 'UPDATE_STORAGE',
    SET_FORGER = 'SET_FORGER',
    SET_SIGNER = 'SET_SIGNER'
}

export interface NewContractAction {
    type: Action.NEW_CONTRACT;
    address: string
}

export interface ContractLoadingAction {
    type: Action.CONTRACT_LOADING
    loading: boolean;
}

export interface UpdateStorageAction {
    type: Action.UPDATE_STORAGE
    storage: any
}

export interface SetForger {
    type: Action.UPDATE_STORAGE
    storage: any
}

export function createNewContractAction(address: string) {
    return {
        type: Action.NEW_CONTRACT,
        address
    }
}

export function createContractLoadingAction(loading = true) {
    return {
        type: Action.CONTRACT_LOADING,
        loading
    }
}

export function createUpdateStorageAction(storage: any) {
    return {
        type: Action.UPDATE_STORAGE,
        storage
    }
}

export type Actions = NewContractAction | ContractLoadingAction | UpdateStorageAction