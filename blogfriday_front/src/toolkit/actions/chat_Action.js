import axios from "axios";
import { chatRoomReducers } from "../reducers/chatReducer";
import { useDispatch } from "react-router-dom";
//친구추가

function getFriendInsert(user_id2) {
  return async (dispatch) => {
    await axios
      .post(`/api/chat/friendinsert`, user_id2)
      .then((response) => {
        const data = response.data;
        console.log(data);
        alert(data);
        return data;
      })

      .catch((error) => {
        console.log(error);
        alert("친구추가실패");
      });
  };
}

//친구목록
function getFriendList(user_id1) {
  return async (dispatch) => {
    const data = await axios
      .get(`/api/chat/friendlist/${user_id1}`)
      .then((Response) => Response.data);
    console.log("Map", data);

    dispatch(chatRoomReducers.getFriendList(data));
  };
}

function getNLPsearch(text) {
  return async (dispatch) => {
    try {
      // 줄바꿈 문자 제거 또는 변환
      text = text.replace(/\n/g, " ");

      // 특수 문자 제거 (필요한 경우)
      text = text.replace(/[^a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣\s]/g, "");

      const response = await axios.post(
        `/api/ai/predict/${encodeURIComponent(text)}`
      );
      const data = response.data;
      console.log("NLP 예측 결과:", data);

      // 예측 결과를 사용하여 필요한 작업 수행
      const predictedProductName = data.predictedProductName;

      if (predictedProductName && predictedProductName.trim() !== "") {
        const keyword = predictedProductName;
        const searchUrl = `https://search.wemakeprice.com/search?keyword=${encodeURIComponent(
          keyword
        )}`;

        // 검색 결과 페이지로 이동
        window.open(searchUrl, "_blank");
      } else {
        console.log("예측 결과가 없습니다.");
      }

      // 필요한 경우 리듀서를 호출하여 상태 업데이트
      // dispatch(chatRoomReducers.updatePredictedProductName(predictedProductName));
    } catch (error) {
      console.error("NLP 예측 오류:", error);
      // 오류 처리
    }
  };
}

function getNLPsearch1(text) {
  return async (dispatch) => {
    try {
      // 줄바꿈 문자 제거 또는 변환
      text = text.replace(/\n/g, " ");

      // 특수 문자 제거 (필요한 경우)
      text = text.replace(/[^a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣\s]/g, "");

      const response = await axios.post(
        `/api/ai/predict/${encodeURIComponent(text)}`
      );
      const data = response.data;
      console.log("NLP 예측 결과:", data);

      // 예측 결과를 사용하여 필요한 작업 수행
      const predictedProductName = data.predictedProductName;

      if (predictedProductName && predictedProductName.trim() !== "") {
        const keyword = predictedProductName;
        const searchUrl = `http://112.169.231.62:3030/search/${encodeURIComponent(
          keyword
        )}`;

        // 검색 결과 페이지로 이동
        window.open(searchUrl, "_blank");
      } else {
        console.log("예측 결과가 없습니다.");
      }

      // 필요한 경우 리듀서를 호출하여 상태 업데이트
      // dispatch(chatRoomReducers.updatePredictedProductName(predictedProductName));
    } catch (error) {
      console.error("NLP 예측 오류:", error);
      // 오류 처리
    }
  };
}

export const chatActions = {
  getFriendInsert,
  getFriendList,
  getNLPsearch,
  getNLPsearch1,
};
