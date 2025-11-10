export const server = import.meta.env.VITE_BACKEND_URL;


export const API_PATHS = {
    USER: {
        LOGIN: '/users/login',
        SIGNUP: '/users/signup',
    },
    EVENTS: {
        GETALL: '/events',
        GETDETAILS:(id)=> `/events/${id}`,
        CREATE:'/events',
        UPDATE:(id)=>`/events/${id}`,
        DELETE:(id)=>`/events/${id}`,
        JOIN:(id)=>`/events/${id}/join`,
        LEAVE:(id)=>`/events/${id}/leave`,
    
    },
    
}