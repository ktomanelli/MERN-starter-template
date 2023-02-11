
export const requestLogin = (payload) => post(`/login`, {...payload});
export const signup = (payload) => post(`/signup`, {...payload});
export const verifyToken = () => get('/verifyToken');

export const getSubscription = (id) => get(`/subscription/${id}`);
export const getSubscriptions = () => get('/subscription');
export const newSubscription = () => post('/subscription');

export const getWebhook = (id) => get(`/webhook/${id}`);
export const getWebhooks = () => get('/webhook');
export const newWebhook = () => post('/webhook');

export const getActions = (id) => get(`/action/${id}`);
export const getAction = () => get('/action');
export const newAction = () => post('/action');

export const getWorkspace = (id) => get(`/workspace/${id}`);
export const getWorkspaces = () => get('/workspace');
export const newWorkspace = () => post('/workspace');

export const getIntegration = (id) => get(`/integration/${id}`);
export const getIntegrations = () => get('/integration');
export const newIntegration = () => post('/integration');

export const getPages = () => get('/pages');
export const getDatabases = () => get('/databases');

const refreshToken = () => get('/refreshToken')

function get(route,payload){
    return fetchData(route, 'GET', payload)
}

function post(route,payload){
    return fetchData(route, 'POST', payload)
}

async function fetchData(route,method,payload){
    const r = await fetch(`https://api.dev.notiontools.dev${route}`,{
        credentials: "include",
        body:JSON.stringify(payload),
        method,
        headers:{
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.token}`
        }
    })
    
    if(r.status === 200) {
        const data = await r.json()
        return data;
    }
    else if(r.status === 401 && route !== '/refreshToken'){
        try{
            const newToken = await refreshToken();
            localStorage.token = newToken;
            return fetchData(route,method,payload)
        }catch(e){
            console.log('clearing tokens')
            localStorage.clear();
            sessionStorage.clear();
            return null;
        }
    }
    else throw new Error(`Received ${r.status} when requesting ${route}`)
}