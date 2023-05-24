import styled from "styled-components";

interface Props{
    children:any
}

export function NavBar({children}:Props){
    return(
        <Container>
            {children}
        </Container>
    )
}

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
  margin-top: 20px;
  margin-left: 15px;
`;
const TabElement = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  padding: 9px 20px;
  font-size: 18px;
  /* box-shadow: 2px 5px 25px -3px ${(props) => props.theme.textShadow}; */
  border-radius: 10px;
  /* background-color: ${(props) => props.theme.tabsBackColor};
  //  color: ${(props) => props.theme.paginationButtonColor}; */
  cursor: pointer;
`;

