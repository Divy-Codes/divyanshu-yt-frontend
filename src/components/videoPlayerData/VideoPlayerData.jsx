import "./_videoPlayerData.scss";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import numeral from "numeral";
import { useEffect, useReducer, useState } from "react";
import { VscThumbsdown } from "react-icons/vsc";
import { VscThumbsdownFilled } from "react-icons/vsc";
import { VscThumbsup } from "react-icons/vsc";
import { VscThumbsupFilled } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import {
  getChannelById,
  getSubscriptionStatus,
} from "../../redux/slices/channelById";

export default function VideoPlayerData({ video, videoId }) {
  const { title, publishedAt, description, channelTitle, channelId } =
    video.snippet;
  const { viewCount, likeCount } = video.statistics;

  const [liked, toggleLiked] = useReducer((value) => !value, false);
  const [disliked, toggleDisliked] = useReducer((value) => !value, false);
  const [showMore, toggleShowMore] = useReducer((value) => !value, false);
  const [channelSnippet, setChannelSnippet] = useState({});
  const [channelStatistics, setChannelStatistics] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getChannelById(channelId));
    dispatch(getSubscriptionStatus(channelId));
  }, [dispatch, channelId]);

  const channel = useSelector(
    (state) => state?.selectedChannelDetails?.channel
  );

  useEffect(() => {
    if (channel) {
      setChannelSnippet(channel.snippet);
      setChannelStatistics(channel.statistics);
    }
  }, [channel]);

  const subscribed = useSelector(
    (state) => state.selectedChannelDetails.subscriptionStatus
  );
  // const subscribed = true;

  return (
    <div className="videoData">
      <div className="title">
        <h4 className="videoTitle">{title}</h4>
        {/* <h4 className="videoTitle">Vidoe title here</h4> */}
      </div>
      <div className="channelDetailsContainer d-flex justify-content-between align-items-center ">
        <div className="channelDetails d-flex align-items-center gap-2">
          {channelSnippet && (
            <img
              src={channelSnippet?.thumbnails?.default?.url}
              // src="https://yt3.ggpht.com/ytc/AIf8zZRa_GyvmUD5k59-H2EPR41y0YF_LhRy9gJTgOGR=s88-c-k-c0x00ffffff-no-rj"
              alt="Youtube channel thumbail image"
              className="channelImage rounded-circle"
            />
          )}
          <div className="channel d-flex flex-column ">
            {/* <span className="channelTitle">channel Title</span> */}
            <span className="channelTitle">{channelTitle}</span>
            {channelStatistics && (
              <span className="subscribers">
                {numeral(channelStatistics?.subscriberCount).format("0.a")}
                &nbsp;
                {/* {numeral(150000).format("0.a")}&nbsp; */}subscribers
              </span>
            )}
          </div>
        </div>
        <div className="subscribeAndLike d-flex gap-3">
          <button className="likeUnlike">
            <span onClick={toggleLiked} className="likeButton">
              {liked ? (
                <span>
                  <VscThumbsupFilled size={26} />
                </span>
              ) : (
                <span>
                  <VscThumbsup size={26} />
                </span>
              )}
              &nbsp;
              {/* {numeral(123000).format("0.a")} */}
              {numeral(likeCount).format("0.a")}
            </span>
            <span>|</span>
            <span onClick={toggleDisliked} className="dislikeButton">
              {disliked ? (
                <span>
                  <VscThumbsdownFilled size={26} />
                </span>
              ) : (
                <span>
                  <VscThumbsdown size={26} />
                </span>
              )}
            </span>
          </button>
          <div className="subscribeButton">
            <button
              className={`subscribe ${subscribed && "channelIsSubscribed"}`}
            >
              {subscribed ? "Subscribed" : "Subscribe"}
            </button>
          </div>
        </div>
      </div>
      <div className="description">
        <span>
          <strong>{numeral(viewCount).format("0.a")} views &#x2022;</strong>
          {/* <strong>{numeral(500000).format("0.a")}</strong> */}
        </span>
        &nbsp;
        <span>
          <strong>{dayjs(publishedAt).fromNow()}</strong>
          {/* <strong>{dayjs("2020-02-13").fromNow()}</strong> */}
        </span>
        &nbsp;
        <p
          className={!showMore ? "showLess descriptionText" : "descriptionText"}
        >
          {description}
          {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
          voluptas nulla officia, a esse sint. Nemo deserunt praesentium, soluta
          asperiores eius cupiditate voluptatem cum amet laboriosam officiis ea
          numquam magni! */}
        </p>
        <span className="showMore" onClick={toggleShowMore}>
          {showMore ? "Show Less" : "Show More"}
        </span>
      </div>
    </div>
  );
}
