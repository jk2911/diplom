import { CSSProperties, FC } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

interface TextProps {
    text?: string
    style?: CSSProperties
    type?: 'label' | 'title'
    link?: { href: string; text: string }
  }
  
  const Text: FC<TextProps> = ({ text, link, style, ...props }) => {
    return (
      <StyledText style={style} {...props}>
        {text}
        {!!link && <StyledLink to={link.href}>{'\u00A0' + link.text}</StyledLink>}
      </StyledText>
    )
  }
  
  const StyledText = styled.div<TextProps>`
    display: flex;
    font-family: 'Inter Medium';
    line-height: 28px;
    font-size: 16px;
    text-align: left;
  
    ${(props) =>
      props.type === 'label' &&
      css`
        font-family: 'Inter Medium';
        line-height: 19px;
        font-size: 16px;
      `}
  
    ${(props) =>
      props.type === 'title' &&
      css`
        font-family: 'Inter Bold';
        font-size: 30px;
        line-height: 36px;
      `}
  `
  
  const StyledLink = styled(Link)`
    text-decoration: none;
  `
  
  export default Text