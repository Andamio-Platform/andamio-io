import YouTube from "react-youtube";

export default function VideoPlayer({ videoId }: { videoId: string }) {
  let _videoId = videoId
  if (videoId.startsWith("https://www.youtube.com/watch?v=")) {
    _videoId = videoId.substring(32)
  }

  return (
    // <div className="h-auto w-full max-w-full rounded-lg border border-gray-200 dark:border-gray-700">
    <YouTube
      videoId={_videoId} // defaults -> ''
      // id={string}                       // defaults -> ''
      // className={'w-full'}                // defaults -> ''
      iframeClassName={
        "aspect-video h-auto w-full max-w-full rounded-lg border border-gray-200 dark:border-gray-700 shadow-md"
      } // defaults -> ''
      // style={object}                    // defaults -> {}
      // title={string}                    // defaults -> ''
      // loading={string}                  // defaults -> undefined
      // opts={obj}                        // defaults -> {}
      // onReady={func}                    // defaults -> noop
      // onPlay={func}                     // defaults -> noop
      // onPause={func}                    // defaults -> noop
      // onEnd={func}                      // defaults -> noop
      // onError={func}                    // defaults -> noop
      // onStateChange={func}              // defaults -> noop
      // onPlaybackRateChange={func}       // defaults -> noop
      // onPlaybackQualityChange={func}    // defaults -> noop
    />
    // </div>
  );
}
