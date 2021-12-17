import axios from "axios";
import { IEvent } from "../components/EventList/Event/Event";

const HOST = "http://localhost:4000/api/event";

export const getEventsAPI = (token: string) => {
  console.log("token",token)
  return axios.get(`${HOST}`, {
    headers: { "Authorization": token ? `Bearer ${token}` : "" },
  });
};

export const postEventAPI = (token:string,event:IEvent) => {
  return axios.post(HOST, event,{
    headers:{ "Authorization": token ? `Bearer ${token}` : "" }
  })
}

export const updateEventAPI = (token:string, event:IEvent) => {
  return axios.put(`${HOST}/${event._id}`, event,{
    headers:{ "Authorization": token ? `Bearer ${token}` : "" }
  })
}

export const deleteEventAPI = (token:string,id:string) => {
  return axios.delete(`${HOST}/${id}`,{
    headers:{ "Authorization": token ? `Bearer ${token}` : "" }
  })
}
