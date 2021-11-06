export default function MessageItem({ message }) {
  return (
    <div className="messageCard">
      {message.isBot ? (
        <div
          className="botCard"
          style={{
            backgroundColor: "skyblue",
            borderRadius: "10px",
            width: "fit-content",
            textAlign: "left",
          }}
        >
          <p
            style={{
              paddingLeft: "16px",
              paddingRight: "10px",
              paddingTop: "10px",
              paddingBottom: "10px",
              fontWeight: 700,
            }}
          >
            {message.text}
          </p>
        </div>
      ) : (
        <div
          className="userCard"
          style={{
            backgroundColor: "greenyellow",
            borderRadius: "10px",
            width: "fit-content",
            textAlign: "end",
          }}
        >
          <p
            style={{
              paddingLeft: "16px",
              paddingRight: "10px",
              fontWeight: 700,
            }}
          >
            {message.text}
          </p>
        </div>
      )}
    </div>
  );
}
