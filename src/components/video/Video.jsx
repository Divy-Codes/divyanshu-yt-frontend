import "./_video.scss";
import { AiFillEye } from "react-icons/ai";
import numeral from "numeral";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import { useEffect, useState } from "react";
import request from "../../utils/api";
dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(utc);

// function convertViewCount(views) {
//   if (views >= 1000000) return `${Math.floor(views / 1000000)}m`;
//   else if (views >= 1000) return `${Math.floor(views / 1000)}k`;
// }

export default function Video({ video }) {
  const {
    id,
    snippet: {
      title,
      channelTitle,
      publishedAt,
      channelId,
      thumbnails: { medium },
    },
    // contentDetails: { duration },
    // statistics: { viewCount },
  } = video;

  //Inconsistent API. When reusing this component to display searched videos, the "items" returned does not contain "contentDetails" & "statistics". Therefore, we will have to make an extra API call for these two. We need "duration" & "viewCount" from these two
  const [duration, setDuration] = useState("");
  const [viewCount, setViewCount] = useState("");

  //In "/video" API call, the id is simple string property. But in "/search" API call, the id is an object and the id is inside the "videoId" property of "id". To factor both in we need the following
  const videoId = id?.videoId || id;

  useEffect(() => {
    (async () => {
      const { data } = await request("/videos", {
        params: {
          part: "snippet,contentDetails,statistics",
          id: videoId,
        },
      });
      setDuration(data.items[0].contentDetails.duration);
      setViewCount(data.items[0].statistics.viewCount);
    })();
  }, [videoId]);

  const seconds = dayjs.duration(duration).asSeconds();
  const videoDuration = dayjs.utc(seconds * 1000).format("mm:ss");

  // Need another API call to get channel thumbnail
  let [channelThumbnailURL, setChannelThumbnail] = useState();
  useEffect(() => {
    (async () => {
      const { data } = await request("/channels", {
        params: {
          part: "snippet",
          id: channelId,
        },
      });
      setChannelThumbnail(data.items[0].snippet.thumbnails.default.url);
    })();
  }, [channelId]);

  return (
    <div className="videoContainer">
      <div className="video">
        <img src={medium.url} alt="video Thumbnail" />
        <span>{videoDuration}</span>
      </div>
      <div className="detailsContainer">
        <div className="channelImage">
          <img src={channelThumbnailURL} alt="Channel Image" />
        </div>
        <div className="details">
          <div className="videoTitle">{title}</div>
          <div className="videoDetails">
            <span className="videoChannel">{channelTitle}</span>
            <span>
              <AiFillEye />
              &nbsp;
              {numeral(viewCount).format("0.a")} &bull;&nbsp;
              {dayjs(publishedAt).fromNow()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// const thumbnailURL = video.snippet.thumbnails.medium.url;
// const videoTitle = video.snippet.title;
// const channelTitle = video.snippet.channelTitle;
// const viewCount = parseInt(video.statistics.viewCount);
// const views = convertViewCount(viewCount);
