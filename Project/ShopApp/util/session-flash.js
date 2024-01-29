function getSessionData(req) {
    const sessionData = req.session.flashedData;
    req.session.flashedData = null;
    console.log(sessionData);
    return sessionData;
}

function flashDataToSession(req, data, action) {
    req.session.flashedData = data;
    req.session.save(action);
}

export default {
    getSessionData: getSessionData,
    flashDataToSession: flashDataToSession
}