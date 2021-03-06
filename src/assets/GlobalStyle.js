import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    a, a:active, a:link{
        text-decoration: none;
        color: white;
    }

    body {
        background-color: #333;
    }
`;

export default GlobalStyle;