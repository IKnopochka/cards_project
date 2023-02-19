const initialState = {}

export const fakeReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case '':
            return {...state}
        default:
            return state
    }
}

//Action Creators

//Thunk Creators

//types
type InitialStateType = typeof initialState
export type ActionTypes = any
