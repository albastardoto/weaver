import React, { Component } from "react";

export interface RoomPageProps {
  roomData?:Room
}
export type Room={
  name:string,
  code:string
}
export interface RoomPageState {}

export default class RoomPage extends Component<RoomPageProps, RoomPageState> {
  constructor(props: RoomPageProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return <h1>{this.props.roomData ? this.props.roomData.name : ""}</h1>;
  }
}
