import { ENABLE_SOCKET } from "../actions/socket";

const initialState = {
    socketRoot: null
}

const socketReducer = (state = initialState, action) => {
    switch(action.type) {
        case ENABLE_SOCKET:
            return {
                ...state,
                socketRoot: action.root
            }
        default:
            return state
    }
}

export default socketReducer