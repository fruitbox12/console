import styled from "styled-components";

type Props = {
  primary?: boolean;
  mega?: boolean;
};

const Button = styled.button`
  padding: ${(props: Props) => (props.mega ? "1.6rem 4rem" : "1.1rem 1.8rem")};
  border: var(--primary);
  border: 1px solid var(--primary);
  background-color: ${(props: Props) =>
    props.primary ? "var(--primary)" : "transparent"};
  color: ${(props: Props) =>
    props.primary ? "var(--light)" : "var(--primary)"};
  border-radius: 0.5rem;
  font-size: ${(props: Props) => (props.mega ? "1.8rem" : "1.1rem")};
  text-transform: uppercase;
  font-weight: ${(props: Props) => (props.mega ? "500" : "500")};
  box-shadow: ${(props: Props) => (props.mega ? "var(--glow)" : "none")};
`;

export default Button;
