import React, { FC } from "react";
import { UserStatus } from "../../store/system/types";
import {
  makeStyles,
  createStyles,
  Chip,
  Avatar,
  Tooltip,
} from "@material-ui/core";

export interface UsersListProps {
  users: UserStatus[];
}

const UsersList: FC<UsersListProps> = (props) => {
  const classes = makeStyles(() =>
    createStyles({
      root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        overflow: "hidden",
        width: "95%",
        margin: "0 auto",
      },
    })
  )();
  return (
    <div className={classes.root}>
      {props.users
        .sort((a, b) => {
          if (a.last_changed === undefined || b.last_changed === undefined)
            return 0;
          return b.last_changed.valueOf() - a.last_changed.valueOf();
        })
        .sort((a, b) => {
          if (a.active && !b.active) {
            return -1;
          } else if (!a.active && b.active) {
            return 1;
          }
          return 0;
        })
        .map((user: UserStatus) => {
          return (
            <Tooltip
              title={
                (user.active ? "online" : "offline") +
                " since : " +
                getDateString(user.last_changed)
              }
              key={user.id}
            >
              <Chip
                avatar={<Avatar />}
                label={
                  user.displayName !== null
                    ? user.displayName
                    : "Guest(" + user.id + ")"
                }
                color={user.active ? "primary" : "secondary"}
                clickable
              />
            </Tooltip>
          );
        })}
    </div>
  );
};
function getDateString(date: Date): string {
  if (date === undefined) return "";
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  return date.toLocaleString("en-US", options);
}
export default UsersList;
