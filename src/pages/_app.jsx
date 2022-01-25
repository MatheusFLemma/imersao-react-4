import { Provider } from '@skynexui/components'

import GlobalStyle from "../style/GlobalStyle";

export default function App({ Component, pageProps }) {
  return (
    <Provider
      theme={{
        components: {
          textField: {
            variant: 'basicBordered', // or put "bottomBorder"
          },
        },
      }}
    >
      <GlobalStyle />
      <Component {...pageProps} />
    </Provider>
  )
}
