import { Box, Text, Button } from "@skynexui/components";

export function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text variant="heading5">Chat</Text>
        <Button
          variant="tertiary"
          colorVariant="neutral"
          label="Logout"
          href="/"
        />
      </Box>
    </>
  );
}
