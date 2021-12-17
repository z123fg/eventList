import { useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";

export default function useAuth() {
    return useContext(NotificationContext);
  }