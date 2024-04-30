import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./JoinAdd.css";

const JoinAdd = () => {
  const navigate = useNavigate();
  const [phoneNumberError, setPhoneNumberError] = useState(false); // 연락처 오류 상태 추가
  const [allFieldsFilled, setAllFieldsFilled] = useState(false); // 모든 필드가 입력되었는지 여부 상태 추가

  const [user, setUser] = useState({
    user_idemail: "",
    user_password: "",
    user_name: "",
    user_phonenumber: "",
    user_nickname: "",
    user_profile: null,
    previewImage: "/basicicon/no-profile.png",
    user_findhome: "",
    user_findname: "",
  });

  useEffect(() => {
    // 모든 필수 항목이 입력되었는지 확인
    const allFilled =
      user.user_idemail &&
      user.user_password &&
      user.user_name &&
      user.user_phonenumber &&
      user.user_nickname &&
      user.user_findhome &&
      user.user_findname;

    setAllFieldsFilled(allFilled);
  }, [user]); // user 상태가 변경될 때마다 실행

  const handleValueChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUser((prev) => {
      return {
        ...prev,
        user_profile: file,
        previewImage: URL.createObjectURL(file),
      };
    });
  };

  const handleResetImage = () => {
    setUser((prev) => ({
      ...prev,
      previewImage: "/basicicon/no-profile.png",
      user_profile: null,
      fileName: "", // 파일명 초기화
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!allFieldsFilled) {
      // 모든 필수 항목이 입력되지 않았을 때 알림창 표시
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("user_idemail", user.user_idemail);
    formData.append("user_password", user.user_password);
    formData.append("user_name", user.user_name);
    formData.append("user_phonenumber", user.user_phonenumber);
    formData.append("user_nickname", user.user_nickname);
    formData.append("user_profile", user.user_profile);
    formData.append("user_findhome", user.user_findhome);
    formData.append("user_findname", user.user_findname);

    try {
      const response = await axios.post(`/user/signup`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      alert("회원가입을 축하합니다.");
      navigate("/");
    } catch (error) {
      if (error.response.status == 400) {
        alert("이미 존재하는 이메일입니다.");
      } else {
        console.log(error);
      }
    }
  };

  const validatePhoneNumber = () => {
    // 입력된 연락처가 11자리인지 확인
    if (user.user_phonenumber.length === 11) {
      setPhoneNumberError(false); // 11자리면 오류 해제
    } else {
      setPhoneNumberError(true); // 11자리가 아니면 오류 표시
    }
  };

  return (
    <div className="join-add-container">
      <form onSubmit={onSubmit} className="join-add-form">
        <h1 className="join-add-title">회원가입</h1>
        <div className="join-add-form-group">
          <input
            type="email"
            className="join-add-form-control"
            name="user_idemail"
            placeholder="E-mail"
            onChange={handleValueChange}
          />
        </div>
        <div className="join-add-form-group">
          <input
            type="password"
            className="join-add-form-control"
            name="user_password"
            placeholder="Password"
            onChange={handleValueChange}
          />
        </div>
        <div className="join-add-form-group">
          <input
            type="text"
            className="join-add-form-control"
            name="user_name"
            placeholder="이름"
            onChange={handleValueChange}
          />
        </div>
        <div className="join-add-form-group">
          <input
            type="text"
            className={`join-add-form-control ${
              phoneNumberError ? "error" : ""
            }`}
            name="user_phonenumber"
            placeholder="연락처"
            onChange={handleValueChange}
            onBlur={validatePhoneNumber} // 입력 완료 시 유효성 검사
          />

          {phoneNumberError && (
            <span className="error-message">
              연락처는 11자리로 입력해주세요. ex)01012341234
            </span>
          )}
        </div>
        <div className="join-add-form-group">
          <input
            type="text"
            className="join-add-form-control"
            name="user_nickname"
            placeholder="닉네임"
            onChange={handleValueChange}
          />
        </div>
        <div className="join-add-question">
          아래의 두 질문은 아이디/비번찾기에 사용됩니다.
          <input
            type="text"
            className="join-add-form-control"
            name="user_findhome"
            placeholder="고향은?"
            onChange={handleValueChange}
          />
        </div>
        <div className="join-add-form-group">
          <input
            type="text"
            className="join-add-form-control"
            name="user_findname"
            placeholder="어릴적 별명은?"
            onChange={handleValueChange}
          />
        </div>
        <div className="join-add-form-group">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="join-add-file-input"
          />
        </div>
        <div className="join-add-form-group">
          <img
            src={user.previewImage}
            alt="다시 기본이미지로 돌아가기"
            className="join-add-profile-preview"
          />
        </div>
        {user.user_profile && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleResetImage}
          >
            기본이미지로 설정
          </button>
        )}
        <button
          type="submit"
          className={`join-add-btn-primary ${allFieldsFilled ? "active" : ""}`}
          disabled={!allFieldsFilled}
        >
          가입 완료
        </button>
      </form>
    </div>
  );
};

export default JoinAdd;
