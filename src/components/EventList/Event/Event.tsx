import {
  Button,
  ButtonGroup,
  Checkbox,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { ChangeEvent, FC, Fragment, useEffect, useState } from "react";
import { deleteEventAPI, updateEventAPI } from "../../../apis/eventApis";
import useAuth from "../../../hooks/useAuth";
import useNotification from "../../../hooks/useNotification";

interface IEventProps {
  event: IEvent;
  refreshEventsList: () => Promise<void>;
}
export interface IEvent {
  from: string;
  to: string;
  content: string;
  isCompleted: boolean;
  _id?: string;
}

const Event: FC<IEventProps> = ({ event, refreshEventsList }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const { showNotification } = useNotification();

  const {
    userData: { token },
  } = useAuth();

  const [inputs, setInputs] = useState({
    from: event.from,
    to: event.to,
    content: event.content,
    isCompleted: event.isCompleted,
  });

  useEffect(()=>{
    setInputs({
      from: event.from,
      to: event.to,
      content: event.content,
      isCompleted: event.isCompleted,
    });
    setIsEdit(false);
  },[event])

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({
      ...prev,
      [e.target?.name]:
        e.target.name === "isCompleted" ? e.target.checked : e.target?.value,
    }));
  };
  const handleSave = async () => {
    console.log("inputs", inputs);
    try {
      const res = await updateEventAPI(token, { ...inputs, _id: event._id });
      showNotification("success", res.data.message);
      await refreshEventsList();
      setIsEdit(false);
    } catch (err: any) {
      showNotification("error", err.response?.data?.message || err.message);
    }
  };
  const handleDelete = async () => {
    try {
      const res = await deleteEventAPI(token, event._id!);
      showNotification("success", res.data.message);
      await refreshEventsList();
    } catch (err: any) {
      showNotification("error", err.response?.data?.message || err.message);
    }
  };
  console.log("id", event._id);
  return (
    <Fragment key={event._id}>
      <TableRow>
        {isEdit ? (
          <EventEdit inputs={inputs} handleChange={handleChange} />
        ) : (
          <>
            <TableCell><Typography variant="body1" gutterBottom>{new Date(event.from).toLocaleString()}</Typography></TableCell>
            <TableCell><Typography variant="body1" gutterBottom>{new Date(event.to).toLocaleString()}</Typography></TableCell>
            <TableCell><Typography variant="body1" gutterBottom>{event.content}</Typography></TableCell>
            <TableCell><Typography variant="body1" gutterBottom>{event.isCompleted ? "completed" : "pending"}</Typography></TableCell>
          </>
        )}
        <TableCell>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              height: "100%",
            }}
          >
            {!isEdit ? (
              <Button onClick={handleEdit} variant="contained">
                Edit
              </Button>
            ) : (
              <ButtonGroup variant="contained">
                <Button onClick={handleSave}>Save</Button>
                <Button onClick={handleDelete} color="error">
                  Delete
                </Button>
              </ButtonGroup>
            )}
          </div>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

const isoToLocale = (isoString: string) => {
  
  if (!isoString) return "";
  var tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
  const DSTOffset = 3600000
  const isDST = moment(isoString).isDST();
  console.log("isDST",isDST)
  return new Date(new Date(isoString).getTime() - tzoffset+(isDST?DSTOffset:0))
    .toISOString()
    .slice(0, -1);
};

interface IEventEditProps {
  inputs: { from: string; to: string; content: string; isCompleted: boolean };
  handleChange: (e: ChangeEvent<HTMLInputElement>) => any;
}

export const EventEdit: FC<IEventEditProps> = ({ inputs, handleChange }) => {
  
  return (
    <>
      <TableCell>
        <TextField
          size="small"
          defaultValue={isoToLocale(inputs.from)}
          name="from"
          type="datetime-local"
          onChange={handleChange}
        />
        {/* <DateTimePicker
          value={inputs.from}
          onChange={(newDate) => {
            handleChange(newDate, "from");
          }}
          renderInput={(params) => <TextField {...params} />}
        /> */}
      </TableCell>
      <TableCell>
        <TextField
          size="small"
          defaultValue={isoToLocale(inputs.to)}
          name="to"
          type="datetime-local"
          onChange={handleChange}
        />
        {/* <DateTimePicker

          value={inputs.to}
          onChange={(newDate) => {
            handleChange(newDate, "to");
          }}
          renderInput={(params) => <TextField {...params} />}
        /> */}
      </TableCell>
      <TableCell>
        <TextField
          size="small"
          name="content"
          onChange={handleChange}
          value={inputs.content}
        />
      </TableCell>
      <TableCell>
        <Checkbox
          name="isCompleted"
          checked={inputs.isCompleted}
          onChange={handleChange}
        />
      </TableCell>
    </>
  );
};

export default Event;
