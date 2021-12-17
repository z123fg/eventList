import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { getEventsAPI, postEventAPI } from "../../apis/eventApis";
import useAuth from "../../hooks/useAuth";
import useNotification from "../../hooks/useNotification";
import Event, { EventEdit, IEvent } from "./Event/Event";

const EventList = () => {
  const [eventList, setEventList] = useState<IEvent[]>();

  const [isAddingEvent, setIsAddingEvent] = useState<boolean>();

  const { showNotification } = useNotification();

  const [inputs, setInputs] = useState({
    from: "",
    to: "",
    content: "",
    isCompleted: false,
  });

  const {
    userData: { token },
  } = useAuth();

  useEffect(() => {
    getEventsAPI(token).then((res) => {
      setEventList(res.data.result);
    });
  }, []);
  

  const refreshEventsList = async () => {
    const updatedEvents = await getEventsAPI(token);
    setEventList(updatedEvents.data.result);
  };

  useEffect(() => {}, [isAddingEvent]);

  const handleAddEvent = (event: MouseEvent) => {
    event.stopPropagation();
    setIsAddingEvent(true);
  };

  const handleBlurOut = () => {
    setIsAddingEvent(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({
      ...prev,
      [e.target?.name]:
        e.target.name === "isCompleted" ? e.target.checked : e.target?.value,
    }));
  };

  const handleSave = async () => {
    try {
      await postEventAPI(token, inputs);
      await refreshEventsList();
      setIsAddingEvent(false);
      setInputs({
        from: "",
        to: "",
        content: "",
        isCompleted: false,
      });
      console.log("success");
    } catch (err: any) {
      console.dir(err)
      showNotification("error", err?.response?.data?.message);
    }
  };

  return (
    <Container
      onClick={handleBlurOut}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <TableContainer sx={{ minWidth: 1100, maxWidth: 1200 }} component={Paper}>
        <Button
          onClick={handleAddEvent}
          variant="contained"
          style={{ margin: "10px" }}
        >
          Add event
        </Button>
        <Table style={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 281 }}>From</TableCell>
              <TableCell sx={{ width: 281 }}>To</TableCell>
              <TableCell sx={{ minWidth: 156 }}>Content</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {isAddingEvent && (
              <TableRow
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <EventEdit handleChange={handleChange} inputs={inputs} />
                <TableCell>
                  <Button onClick={handleSave} variant="contained">
                    Save
                  </Button>
                </TableCell>
              </TableRow>
            )}
            {eventList?.map((event) => (
              <Event event={event} refreshEventsList={refreshEventsList} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default EventList;
