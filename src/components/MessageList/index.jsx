import { Box, Text, Image } from "@skynexui/components";
import appConfig from "../../../config.json";

export default function MessageList(props) {
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: "scroll",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "1rem",
      }}
    >
      {props.message.map((message) => {
        return (
          <Text
            key={message.id}
            tag="li"
            styleSheet={{
              borderRadius: "5px",
              padding: ".375rem",
              marginBottom: ".75rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              },
            }}
          >
            <Box
              styleSheet={{
                marginBottom: ".5rem",
                alignItems: "center",
              }}
            >
              <Image
                styleSheet={{
                  width: "1.25rem",
                  height: "1.25rem",
                  borderRadius: "50%",
                  display: "block",
                  marginRight: ".5rem",
                }}
                src={`https://github.com/${message.from}.png`}
              />
              <Text tag="strong">{message.from}</Text>
              <Text
                styleSheet={{
                  fontSize: ".625rem",
                  marginLeft: ".5rem",
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {new Date().toLocaleDateString()}
              </Text>
            </Box>
            {message.content}
          </Text>
        );
      })}
    </Box>
  );
}
