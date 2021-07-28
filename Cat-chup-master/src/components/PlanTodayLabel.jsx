const PlanTodayLabel = (props) => {
  const Info = props.Info;
  return (
    <div className="planTodayBox_card">
      <div className="planTodayBox_card_time">
        {/* <p>{new Date(Info.content.start).toLocaleString().slice(0, -10)}</p> */}

        {/* <p>{new Date(Info.content.start).toLocaleString().slice(-9, -3)}</p> */}
        {/* <p>&nbsp;-&nbsp;</p>
        <p>
          {new Date(Date(Info.content.end)).toISOString().slice(-13, -8)}
        </p> */}
      </div>
      {/* {(() => {
        switch (mood) {
          case "happy":
            return (
              <div className="event_label_happy">
                <div className="event_label_markcolor_happy"></div>
                <div className="event_label_title">{Info.content.caption}</div>
              </div>
            );
          case "sad":
            return (
              <div className="event_label_sad">
                <div className="event_label_markcolor_sad"></div>
                <div className="event_label_title">{Info.content.caption}</div>
              </div>
            );
          case "angry":
            return (
              <div className="event_label_angry">
                <div className="event_label_markcolor_angry"></div>
                <div className="event_label_title">{Info.content.caption}</div>
              </div>
            );
          case "fear":
            return (
              <div className="event_label_fear">
                <div className="event_label_markcolor_fear"></div>
                <div className="event_label_title">{Info.content.caption}</div>
              </div>
            );
          case "disgust":
            return (
              <div className="event_label_disgust">
                <div className="event_label_markcolor_disgust"></div>
                <div className="event_label_title">{Info.content.caption}</div>
              </div>
            );
          default:
            return (
              <div className="event_label">
                <div className="event_label_markcolor"></div>
                <div className="event_label_title">{Info.content.caption}</div>
              </div>
            );
        }
      })()} */}
      <div className="event_label">
        <div className="event_label_markcolor"></div>
        <div className="event_label_title">
          <p
            style={{
              margin: 0,
              whiteSpace: "nowrap",
              overflow: "scroll",
            }}
          >
            {Info.content.title}
          </p>
        </div>
        <div style={{ fontSize: "12px" }}>{`${new Date(Info.start)
          .toLocaleString("en-GB")
          .slice(11, -3)}`}</div>
        {/* {minutes > 60 ? (
          <div style={{ float: "right" }}>{hours}&nbsp;hour</div>
        ) : (
          <div style={{ float: "right" }}>{minutes}&nbsp;min</div>
        )} */}
      </div>
    </div>
  );
};

export default PlanTodayLabel;
