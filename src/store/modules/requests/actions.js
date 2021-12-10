export default {
    async contactCoach(context, payload) {
        const newRequest = {
            userEmail: payload.email,
            message: payload.message
        };

        const response = await fetch(`https://vue-find-a-coach-d7acb-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`, {
            method: 'POST',
            body: JSON.stringify(newRequest)
        });

        if (!response.ok) {
            const error = new Error(response.message || 'Failed to send request.');
            throw error;
        }

        newRequest.id = await response.name;
        newRequest.coachId = payload.coachId;

        context.commit('addRequest', newRequest);
    },
    async fetchRequests(context) {
        const coachId = context.rootGetters.userId;
        const token = context.rootGetters.getToken;
        const response = await fetch(`https://vue-find-a-coach-d7acb-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=` + token);
        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(response.message || 'Failed to fetch requests.');
            throw error;
        }

        const requests = [];

        for (const key in responseData) {
            const request = {
                id: key,
                coachId: coachId,
                userEmail: responseData[key].userEmail,
                message: responseData[key].message
            }
            requests.push(request);
        }
        context.commit('setCoach', requests);
    }

}