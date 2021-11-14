import styled from 'styled-components'

export const HeaderContainer = styled.header`
  height: 4rem;
  margin: 0px;
  width: 100%;
  background-color: #fcfcfc;
`

export const HeaderContent = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px auto;

  width: 1728px;
  @media (max-width: 1919px) {
    width: 1376px;
  }
  @media (max-width: 1440px) {
    width: 1024px;
  }
  @media (max-width: 1056px) {
    width: calc(100% - 2rem);
  }
`
