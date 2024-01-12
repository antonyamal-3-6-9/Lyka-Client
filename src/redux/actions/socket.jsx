export const ENABLE_SOCKET = "ENABLE SOCKET"
export const GET_SOCKET = "GET_SOCKET"


export const enableSocket = (socket) => ({
    type: ENABLE_SOCKET,
    root: socket
})

