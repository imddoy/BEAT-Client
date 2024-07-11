import { IconPhotoDelete } from "@assets/svgs";
import { Generators } from "@styles/generator";
import { ComponentType } from "react";
import styled from "styled-components";

// 페이지 전체 레이아웃
export const RegisterContainer = styled.main`
  padding: 0 2.4rem;
`;

// 입력 Box
export const InputRegisterBox = styled.section<{ $marginBottom: number }>`
  padding: 2.4rem 0 ${(props) => props.$marginBottom}rem;
`;

export const StepperRegisterBox = styled.section<{ $marginBottom: number }>`
  ${Generators.flexGenerator("row", "center", "space-between")}
  padding: 2.4rem 0 ${(props) => props.$marginBottom}rem;
`;

export const TimePickerRegisterBox = styled.section<{ $marginBottom: number }>`
  padding: 2.4rem 0 ${(props) => props.$marginBottom}rem;
`;
export const BankRegisterBox = styled.section<{ $marginBottom: number }>`
  padding: 2.4rem 0 ${(props) => props.$marginBottom}rem;
`;

export const InputTitle = styled.h1`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.heading4};
`;

export const InputDescription = styled.p`
  color: ${({ theme }) => theme.colors.gray_300};
  ${({ theme }) => theme.fonts["body2-long"]};
`;

export const FileInputWrapper = styled.div`
  position: relative;

  ${Generators.flexGenerator("row", "center", "start")}
  gap: 1.4rem;
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const CustomFileInput = styled.label`
  ${Generators.flexGenerator()}
  width: 10.8rem;
  height: 15.4rem;

  background: ${({ theme }) => theme.colors.gray_800};
  cursor: pointer;
  border-radius: 6px;
`;

export const PreviewImageWrapper = styled.article`
  position: relative;
  width: 10.8rem;
  height: 15.4rem;
`;

export const PreviewImage = styled.img`
  width: 10.8rem;
  height: 15.4rem;
  object-fit: cover;

  border-radius: 10px;
`;

export const RemoveImageButton = styled(IconPhotoDelete)`
  position: absolute;
  top: 0.4rem;
  right: 0.4rem;
  width: 2.4rem;

  cursor: pointer;
`;

export const GenreContainer = styled.section`
  ${Generators.flexGenerator("row", "center", "space-between")}
`;

export const GenreItem = styled.article<{ selected: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-end;
  width: 7.2rem;
  height: 7.2rem;
  padding: 1rem 2rem;
  padding: 11px 8px 6px;
  ${({ theme }) => theme.fonts["caption1-semi"]}

  color: ${({ selected, theme }) => (selected ? theme.colors.gray_900 : theme.colors.gray_400)};

  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.gray_0 : theme.colors.gray_800};
  cursor: pointer;
  border-radius: 6px;
`;

export const StyledIcon = (IconComponent: ComponentType) => styled(IconComponent)<{
  selected: boolean;
}>`
  fill: ${({ theme, selected }) => (selected ? theme.colors.main_pink_400 : theme.colors.gray_500)};
`;
