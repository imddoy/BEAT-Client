import { IconRoleAdd } from "@assets/svgs";
import Spacing from "@components/commons/spacing/Spacing";
import { useEffect, useState } from "react";
import * as S from "../ModifyManage.styled";
import { Cast, Staff } from "../typings/gigInfo";
import RoleWrapper from "./RoleWrapper";

interface Role {
  makerId: number;
  makerName: string;
  makerRole: string;
  makerPhoto: string;
  isNew?: boolean;
}

interface RoleLayoutProps {
  list: Cast[] | Staff[];
  updateList: (list: any[]) => void;
  title: string;
}

const RoleLayout = ({ list, updateList, title }: RoleLayoutProps) => {
  //결국 맨 상위 castModifyRequests나 staffModifyRequests 로 초기화
  const [makerList, setMakerList] = useState<Role[]>(
    list.map((item, index) => ({
      makerId: "castId" in item ? item.castId : item.staffId, // 공연 수정 페이지 조회 시 가져온 ID로 설정
      makerName: "castName" in item ? item.castName : item.staffName,
      makerRole: "castRole" in item ? item.castRole : item.staffRole,
      makerPhoto: "castPhoto" in item ? item.castPhoto : item.staffPhoto,
    }))
  );

  const handelAddRole = () => {
    setMakerList((prev) => [
      ...prev,
      {
        makerId: Date.now(),
        makerName: "",
        makerRole: "",
        makerPhoto: "",
        isNew: true, //새롭게 추가되었음을 표시
      },
    ]);
  };

  const handleremoveRole = (id: number) => {
    setMakerList((prev) => prev.filter((role) => role.makerId !== id));
  };

  const handleUpdateRole = (id: number, name: string, value: string) => {
    setMakerList((prev) =>
      prev.map((role) => (role.makerId === id ? { ...role, [name]: value } : role))
    );
  };

  useEffect(() => {
    const newMakerList = makerList.map((role) => {
      if (title === "출연진") {
        console.log("출연진:", role.isNew);
        return role.isNew
          ? {
              castName: role.makerName,
              castRole: role.makerRole,
              castPhoto: role.makerPhoto,
            }
          : {
              castId: role.makerId, //기존 id 유지
              castName: role.makerName,
              castRole: role.makerRole,
              castPhoto: role.makerPhoto,
            };
      }
      if (title === "스태프") {
        console.log("스태프:", role.isNew);
        return role.isNew
          ? {
              staffName: role.makerName,
              staffRole: role.makerRole,
              staffPhoto: role.makerPhoto,
            }
          : {
              staffId: role.makerId, //기존 id 유지
              staffName: role.makerName,
              staffRole: role.makerRole,
              staffPhoto: role.makerPhoto,
            };
      }
    });
    updateList(newMakerList);
  }, [makerList]);

  return (
    <S.InputModifyManageBox $marginBottom={2.8}>
      <S.InputTitle>{title}</S.InputTitle>
      <Spacing marginBottom="1.4" />
      <S.RoleListWrapper>
        {makerList.map((role) => (
          <RoleWrapper
            key={role.makerId}
            id={role.makerId}
            role={role}
            removeRole={handleremoveRole}
            onUpdateRole={handleUpdateRole}
          />
        ))}
        <S.RoleAddBtn onClick={handelAddRole}>
          <IconRoleAdd width={"3.2rem"} />
        </S.RoleAddBtn>
      </S.RoleListWrapper>
    </S.InputModifyManageBox>
  );
};

export default RoleLayout;
