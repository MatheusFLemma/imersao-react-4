import { Box, TextField } from "@skynexui/components";
import { useEffect, useState } from "react";
import appConfig from "../../config.json";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";

import { Header } from "../components/Header";
import { MessageList } from "../components/MessageList";
import { SendSticker } from "../components/SendSticker";

export default function Chat({ SUPABASE_ANON_KEY, SUPABASE_URL }) {
  // LOGIN USING USERNAME
  const router = useRouter();
  const userLoggedIn = router.query.username;

  // STATES
  const [message, setMessage] = useState("");
  const [listMessage, setListMessage] = useState([]);

  //SUPABASE
  //SUPABASE AUTH CONFIG
  const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  //SUPABASE GET MESSAGE
  useEffect(() => {
    supabaseClient
      .from("message")
      .select("*")
      .order("id", { ascending: false })
      .then(({ data }) => {
        setListMessage(data);
      });

    const subscription = updateMessageInRealTime((newMessage) => {
      setListMessage((listValue) => {
        return [newMessage, ...listValue];
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  //UPDATING IN REAL TIME MESSAGE
  function updateMessageInRealTime(addMessage) {
    return supabaseClient
      .from("message")
      .on("INSERT", (response) => {
        addMessage(response.new);
      })
      .subscribe();
  }

  function changeMessage(event) {
    const value = event.target.value;

    setMessage(value);
  }

  function handleNewMessage(newMessage) {
    const message = {
      from: userLoggedIn,
      content: newMessage,
    };

    //SUPABASE POST MESSAGE
    supabaseClient
      .from("message")
      .insert([message])
      .then(({ data }) => {
        console.log(data);
      });

    setMessage("");
  }

  function keyPress(event) {
    if (event.key === "Enter") {
      event.preventDefault();

      handleNewMessage(message);
    }
  }

  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: `url(https://cdn.wallpapersafari.com/34/55/8ciD7v.png)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        color: appConfig.theme.colors.neutrals["000"],
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          borderRadius: "5px",
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: "100%",
          maxWidth: "95%",
          maxHeight: "95vh",
          padding: "2rem",
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: "column",
            borderRadius: "5px",
            padding: "1rem",
          }}
        >
          <MessageList message={listMessage} />

          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              value={message}
              onChange={changeMessage}
              onKeyPress={keyPress}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "5px",
                padding: ".375rem .5rem",
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: ".75rem",
                color: appConfig.theme.colors.neutrals[200],
              }}
            />

            <SendSticker
              onStickerClick={(sticker) =>
                handleNewMessage(`:sticker: ${sticker}`)
              }
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export const getServerSideProps = async () => {
  const { SUPABASE_ANON_KEY, SUPABASE_URL } = process.env;

  return {
    props: {
      SUPABASE_ANON_KEY,
      SUPABASE_URL,
    },
  };
};
