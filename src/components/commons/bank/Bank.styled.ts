import SvgIconArrowDown from "@assets/svgs/IconArrowDown";
import { Generators } from "@styles/generator";
import styled, { keyframes } from "styled-components";

// BankBottomSheet
const bottomSheetUp = keyframes`
  0% { transform: translate(-50%, 100%); }
  100% { transform: translate(-50%, 0); }
`;

const bottomSheetDown = keyframes`
  0% { transform: translate(-50%, 0); }
  100% { transform: translate(-50%, 100%); }
`;

export const BankLayout = styled.section<{ $isOpen: boolean }>`
  position: absolute;
  bottom: 0%;
  left: 50%;
  z-index: 1;
  display: block;
  width: 37.5rem;
  margin: 0;
  padding: 2.1rem 2.4rem 0;

  background: ${({ theme }) => theme.colors.gray_800};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  border-radius: 20px 20px 0 0;

  transition: visibility 250ms ease-in-out;
  animation: ${({ $isOpen }) => ($isOpen ? bottomSheetUp : bottomSheetDown)} 250ms ease-in-out;
  animation-fill-mode: forwards;
`;

export const BankTitle = styled.h1`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.heading4}
`;

export const BankWrapper = styled.article`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2rem;
  width: 33rem;
  height: 39.3rem;
  padding-bottom: 2.1rem;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const OutLayout = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background: ${({ theme }) => theme.colors.black};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  opacity: ${({ $isOpen }) => ($isOpen ? 0.7 : 0)};

  transition:
    opacity 250ms ease-in-out,
    visibility 250ms ease-in-out;
`;

// BankBtn
export const BankBtnWrapper = styled.button`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  align-items: center;
  width: 10.2rem;
  height: 10.2rem;
  padding: 1.7rem 0 1.2rem;

  background: ${({ theme }) => theme.colors.gray_700};
  border-radius: 6px;
`;

export const BankName = styled.p`
  color: ${({ theme }) => theme.colors.gray_0};
  ${({ theme }) => theme.fonts["caption1-medi"]};
`;

// InputBank
export const InputBank = styled.div<{ $hasChildren: boolean }>`
  position: relative;
  width: 32.7rem;
  height: 4.8rem;
  padding: 1.2rem 1.6rem;

  color: ${({ theme, $hasChildren }) =>
    $hasChildren ? theme.colors.white : theme.colors.gray_600};

  ${Generators.flexGenerator("column", "start", "center")}

  background: ${({ theme }) => theme.colors.gray_800};
  cursor: pointer;
  border-radius: 6px;
  ${({ theme }) => theme.fonts["body2-normal-medi"]}
`;

export const ToggleIcon = styled(SvgIconArrowDown)`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  width: 2.4rem;

  cursor: pointer;

  transition: transform 0.3s;
`;

// InputAccountWrapper
export const InputAccountWrapper = styled.section`
  width: 100%;
`;

export const InputAccountLabel = styled.label`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts["body1-normal-semi"]}
`;
