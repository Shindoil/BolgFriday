# BolgFriday

# 두번째 프로젝트

## AI 컨트롤러 구현

- /api/ai/predict/{text} 엔드포인트 생성
- 입력 텍스트를 플라스크 서버로 전송하여 예측 결과 획득
- 예측 결과를 PredictResponseDTO로 반환
- 예측 결과가 없는 경우 기본 검색 URL 반환

## 결제 관련 컨트롤러 구현

- /api/transactions , payouts 등 엔드포인트 생성
- 결제 트랜잭션 조회, 생성, 수정, 삭제 기능 구현
- 유효성 검사 및 에러 처리

## 서비스 및 DTO 클래스 구현

- PaymentTransactionService 클래스를 통해 결제 트랜잭션 관련 비즈니스 로직 처리
- PaymentTransactionDTO 클래스를 사용하여 결제 트랜잭션 데이터 전송

## 데이터 수집 및 전처리

- 상품명 데이터셋 로드 및 텍스트 전처리
- 형태소 분석을 통한 토큰화
- 데이터 증강 기법 적용 (상품명 검색, 단어 순서 변경, 단어 삭제)

## 특징 추출 및 모델 학습

- TF-IDF 벡터화를 사용하여 텍스트 데이터 변환
- 로지스틱 회귀 모델을 사용한 다중 레이블 분류
- 하이퍼파라미터 튜닝을 위한 그리드 서치와 교차 검증 적용

## 예측 함수 구현

- 입력 텍스트에 대한 전처리 및 피처 벡터화
- 저장된 모델을 사용하여 상품명 예측

# 참고 사이트

로지스틱 회귀 모델: https://ko.wikipedia.org/wiki/%EB%A1%9C%EC%A7%80%EC%8A%A4%ED%8B%B1_%ED%9A%8C%EA%B7%80

TF-IDF 벡터화:https://ko.wikipedia.org/wiki/Tf-idf

데이터셋 출처: https://search.shopping.naver.com/search/all?query={}
