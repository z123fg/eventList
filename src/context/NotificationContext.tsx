import { Alert, AlertColor } from "@mui/material";
import {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
interface INotificationProviderProps {
  children: ReactNode;
}

export const NotificationContext = createContext<any>({
  notification: { type: "success", content: "" },
  showNotification: () => {},
  removeNotification: () => {},
  isShowNotification: false,
});

const NotificationProvider: FC<INotificationProviderProps> = ({ children }) => {
  const [isShowNotification, setIsShowNotification] = useState<boolean>(false);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const [notification, setNotification] = useState<{
    type: AlertColor;
    content: string;
  }>({ type: "success", content: "" });
  useEffect(() => {
    if (isShowNotification) {
      timersRef.current.push(setTimeout(removeNotification, 15000));
    }
    return () => {
      timersRef.current.forEach((timeout) => {
        clearTimeout(timeout);
      });
    };
  }, [isShowNotification]);

  const showNotification = (type: AlertColor, content: string) => {
    setIsShowNotification(true);
    setNotification({ type, content });
  };

  const removeNotification = () => {
    setIsShowNotification(false);
  };

  let value = {
    notification,
    showNotification,
    removeNotification,
    isShowNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
