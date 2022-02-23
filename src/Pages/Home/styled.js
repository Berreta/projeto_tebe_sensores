import styled from "styled-components";

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Button = styled.button`
    heignt: 1.5rem;
    border: 1px solid #2A7EF8;
    background: #2A7EF8;
    color: #000;
    border-radius: 0 .25rem .25rem 0; 

    &:focus,
    &:active {
        outline: none;
        box-shadow: none;
    }
`;