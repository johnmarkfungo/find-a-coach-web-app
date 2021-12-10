export default {
    addRequest(state, payload) {
        state.requests.push(payload);
    },
    setCoach(state, payload) {
        state.requests = payload;
    }
}