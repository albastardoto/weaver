import React, { FC, useRef, useEffect } from "react";
import YouTube from "react-youtube";
import "./VideoPlayer.scss";
import { ActiveSuggestion } from "../../../store/room/suggestions/types";
import { useDispatch } from "react-redux";
import { updateActiveSuggestion } from "../../../store/room/suggestions/actions";
export interface VideoPlayerProps {
  suggestion?: ActiveSuggestion;
}

const VideoPlayer: FC<VideoPlayerProps> = (props) => {
  const opts: any = {
    width: "100%",
    height: "100%",
    playerVars: { autoplay: 1 },
  };

  const dispatch = useDispatch();
  const videoRef = useRef(null);
  //@ts-ignore
  const videoPlayer = videoRef?.current?.internalPlayer;
  const suggestion = props.suggestion;
  const prevSuggestion: ActiveSuggestion | undefined = usePrevious(
    props.suggestion
  );
  if (prevSuggestion !== suggestion && videoPlayer) {
    if (suggestion.playing) {
      const startTime =
        0.001 * (new Date().getUTCMilliseconds() - suggestion.startTime);
      videoPlayer.seekTo(startTime, true);
      videoPlayer.playVideo();
    } else {
      videoPlayer.seekTo(suggestion.stopTime, true);
      videoPlayer.pauseVideo();
    }
  }
  const setPlaying = async () => {
    const startTime =
      new Date().getUTCMilliseconds() -
      (await videoPlayer.getCurrentTime()) * 1000;
    dispatch(
      updateActiveSuggestion({
        id: props.suggestion!.id,
        playing: true,
        startTime,
      })
    );
  };

  let previousAction: number;
  let previousTime: number;
  const onStateChange = async (e: any) => {
    console.log(e.data + " ; " + suggestion?.playing);
    const currentTime =
      new Date().getUTCMilliseconds() -
      (await videoPlayer.getCurrentTime()) * 1000;

    switch (e.data) {
      case 1:
        if (!suggestion?.playing) {
          console.log("playing");
          setPlaying();
        }
        break;
      case 2:
        if (suggestion?.playing && (!previousAction || previousAction !== 2)) {
          console.log("pausing");
          dispatch(
            updateActiveSuggestion({
              id: props.suggestion!.id,
              playing: false,
              stopTime: await videoPlayer.getCurrentTime(),
            })
          );
        } else if (
          previousTime === undefined ||
          Math.abs(previousTime - currentTime) > 1000
        ) {
          console.log("seeking");
          setPlaying();
        }
        break;
      default:
        break;
    }
    if (e.data !== 3) {
      console.log("setting previous time " + currentTime);
      previousAction = e.data;
      previousTime = currentTime;
    }
  };

  if (!props.suggestion) return null;
  return (
    <div className="iframeDiv">
      <YouTube
        videoId={props.suggestion ? props.suggestion.sourceId : ""}
        opts={opts}
        ref={videoRef}
        onStateChange={onStateChange}
      />
    </div>
  );
};

function usePrevious(value: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default VideoPlayer;
