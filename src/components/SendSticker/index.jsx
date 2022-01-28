import { Box, Button, Text, Image } from "@skynexui/components";
import { useState } from "react";
import appConfig from "../../../config.json";

export function SendSticker(props) {
  const [isOpen, setOpenState] = useState("");

  return (
    <Box
      styleSheet={{
        position: "relative",
      }}
    >
      <Button
        styleSheet={{
          borderRadius: "50%",
          padding: "0 .1875rem 0 0",
          minWidth: "3.125rem",
          minHeight: "3.125rem",
          fontSize: "1.25rem",
          marginBottom: ".5rem",
          lineHeight: "0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: appConfig.theme.colors.neutrals[300],
          filter: isOpen ? "grayscale(0)" : "grayscale(1)",
          hover: {
            filter: "grayscale(0)",
          },
        }}
        label="😋"
        onClick={() => setOpenState(!isOpen)}
      />
      {isOpen && (
        <Box
          styleSheet={{
            display: "flex",
            flexDirection: "column",
            borderRadius: ".3125rem",
            position: "absolute",
            backgroundColor: appConfig.theme.colors.neutrals[800],
            width: {
              xs: "12.5rem",
              sm: "18.125rem",
            },
            height: "18.75rem",
            right: "1.875rem",
            bottom: "1.875rem",
            padding: "1rem",
            boxShadow:
              "rgba(4, 4, 5, 0.15) 0px 0px 0px 1px, rgba(0, 0, 0, 0.24) 0px .5rem 16px 0px",
          }}
          onClick={() => setOpenState(false)}
        >
          <Text
            styleSheet={{
              color: appConfig.theme.colors.neutrals["000"],
              fontWeight: "bold",
            }}
          >
            Stickers
          </Text>
          <Box
            tag="ul"
            styleSheet={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              flex: 1,
              paddingTop: "1rem",
              overflow: "scroll",
            }}
          >
            {appConfig.stickers.map((sticker) => (
              <Text
                onClick={() => {
                  if (Boolean(props.onStickerClick)) {
                    props.onStickerClick(sticker);
                  }
                }}
                tag="li"
                key={sticker}
                styleSheet={{
                  width: "50%",
                  borderRadius: ".3125rem",
                  padding: ".625rem",
                  focus: {
                    backgroundColor: appConfig.theme.colors.neutrals[600],
                  },
                  hover: {
                    backgroundColor: appConfig.theme.colors.neutrals[600],
                  },
                }}
              >
                <Image src={sticker} />
              </Text>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
