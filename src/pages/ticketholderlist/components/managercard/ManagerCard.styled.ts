import { IconCheckboxSelectedOn, IconCheckboxUnselectedOn } from "@assets/svgs";
import styled, { keyframes } from "styled-components";

const expandAnimation = keyframes`
  0% {
    height: 7.4rem;
  }

  100% {
    height: 14.6rem;
  }
`;

const unexpandAnimation = keyframes`
  0% {
    height: 14.6rem;
  }

  100% {
    height: 7.4rem;
  }
`;

const revealAnimation = keyframes`
  0% {
    transform: translateY(-20px);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const unrevealAnimation = keyframes`
  0% {
    transform: translateY(0);
    opacity: 0;
  }

  100% {
    transform: translateY(-20px);
    opacity: 0;
  }
`;

export const ManagerCardWrapper = styled.article<{ $isDetail: boolean }>`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 32.6rem;
  max-height: ${({ $isDetail }) => ($isDetail ? "14.6rem" : "7.4rem")};
  padding-left: 0.4rem;
`;

export const ManagerCardLayout = styled.div<{ $isDetail: boolean; $isDeleteMode: boolean }>`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: 1.6rem;
  align-items: flex-start;
  width: ${({ $isDeleteMode }) => ($isDeleteMode ? "22.2rem" : "25.2rem")};
  height: ${({ $isDetail }) => ($isDetail ? "14.6rem" : "7.4rem")};
  padding: 1.6rem;

  background-color: ${({ theme }) => theme.colors.gray_800};
  border-right: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: 6px;

  transition: max-height 0.5s ease;
`;

export const ManagerCardBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  align-items: flex-start;
  align-self: stretch;
`;

export const ManagerCardDetailBox = styled.div<{ $isDetail: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  align-items: flex-start;
  align-self: stretch;

  background-color: ${({ theme, $isDetail }) => $isDetail && theme.colors.gray_800};
  opacity: ${({ $isDetail }) => ($isDetail ? "1" : "0")};

  transition: background-color 0.25s ease;
  animation: ${({ $isDetail }) => ($isDetail ? revealAnimation : unrevealAnimation)} 0.7s ease;
`;

export const ManagerCardDetailLayout = styled.div<{ $isDetail: boolean; $isDeleteMode: boolean }>`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: 1.6rem;
  align-items: flex-start;
  width: ${({ $isDeleteMode }) => ($isDeleteMode ? "22.2rem" : "25.2rem")};
  height: ${({ $isDetail }) => ($isDetail ? "14.6rem" : "7.4rem")};
  padding: 1.6rem;

  background-color: ${({ theme }) => theme.colors.gray_800};
  opacity: ${({ $isDetail }) => ($isDetail ? "1" : "0")};
  border-right: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: 6px;
`;

export const ManagerCardTextBox = styled.div`
  display: flex;
  gap: 2.2rem;
  align-items: center;
  justify-content: space-between;
`;

export const ManagerCardTextTitle = styled.span`
  width: 3.7rem;

  color: ${({ theme }) => theme.colors.gray_400};
  ${({ theme }) => theme.fonts["body2-normal-medi"]};
`;

export const ManagerCardTextContent = styled.span`
  width: 17.3rem;

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts["body2-normal-medi"]};
`;

export const ManagerCardRadioLayout = styled.div<{ $isDetail: boolean; $isPaid: boolean }>`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 7.4rem;
  height: ${({ $isDetail }) => ($isDetail ? "14.6rem" : "7.4rem")};
  padding: 1.5rem 1.5rem 1.5rem 1.6rem;

  background-color: ${({ theme, $isPaid }) =>
    $isPaid ? theme.colors.pink_600 : theme.colors.gray_800};
  border-radius: 6px;
`;

export const ManagerCardRadioBox = styled.div<{ $isDeleteMode: boolean; $editBlock: boolean }>`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: 1rem;
  align-items: center;
  width: 4.3rem;

  cursor: ${({ $isDeleteMode, $editBlock }) =>
    $isDeleteMode || $editBlock ? "default" : "pointer"};
`;

export const SelectedIcon = styled(IconCheckboxSelectedOn)`
  width: 1.8rem;
  height: 1.8rem;
`;

export const UnselectedIcon = styled(IconCheckboxUnselectedOn)`
  width: 1.8rem;
  height: 1.8rem;
`;

export const ManagerCardRadioText = styled.span`
  color: ${({ theme }) => theme.colors.white};
  text-align: center;

  ${({ theme }) => theme.fonts["caption1-semi"]};
`;
