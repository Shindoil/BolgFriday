# BolgFriday

# 로지스틱 회귀모델

이 프로젝트는 자연어 처리(NLP)와 머신러닝 기술을 활용하여 이커머스 플랫폼을 위한 상품 추천 시스템을 개발하는 것을 목표로 합니다. 이 시스템은 사용자의 질의를 분석하고 예측된 상품 카테고리를 기반으로 관련 상품을 추천합니다.

## 데이터셋

이 프로젝트에서 사용된 데이터셋은 이커머스 웹사이트에서 수집한 사용자 질의와 해당하는 상품명으로 구성되어 있습니다. 데이터셋은 전처리되고 증강되어 모델의 성능과 일반화 능력을 향상시킵니다.

## 방법론

프로젝트에서 다음과 같은 단계를 수행합니다:

1. 데이터 전처리:

   - 텍스트 정제 및 정규화
   - Okt와 Kkma 형태소 분석기를 사용한 토큰화
   - 데이터 증강 기법 (상품명 검색, 단어 순서 섞기, 단어 삭제)

2. 특성 추출:

   - TF-IDF 벡터화
   - N-gram 범위: 유니그램과 바이그램
   - 최소 및 최대 문서 빈도 임계값

3. 모델 학습:

   - One-vs-Rest 분류기를 사용한 로지스틱 회귀
   - 그리드 서치와 K-Fold 교차 검증을 사용한 하이퍼파라미터 튜닝
   - L1 및 L2 정규화 기법

4. 모델 평가:
   - 정확도, 정밀도, 재현율, F1 점수 메트릭
   - 상세한 성능 분석을 위한 분류 보고서

## 결과

학습된 모델은 다음과 같은 성능 메트릭을 달성했습니다:

- 정확도: [정확도 점수 삽입]
- 정밀도: [정밀도 점수 삽입]
- 재현율: [재현율 점수 삽입]
- F1 점수: [F1 점수 삽입]

분류 보고서는 각 상품 카테고리에 대한 모델의 성능 세부 정보를 제공합니다.

## 이론적 배경

이 프로젝트는 NLP와 추천 시스템 분야의 관련 연구 논문에서 개념과 기술을 차용하고 있습니다. 주요 아이디어는 다음과 같습니다:

- TF-IDF 벡터화: "Term-Weighting Approaches in Automatic Text Retrieval" by G. Salton and C. Buckley (1988)
- 로지스틱 회귀: "Logistic Regression: A Self-Learning Text" by D.W. Hosmer Jr., S. Lemeshow, and R.X. Sturdivant (2013)
- One-vs-Rest 분류기: "A Comparative Study of Multi-Class Classification Algorithms" by M. Aly (2005)
- 정규화 기법: "Regularization and Variable Selection via the Elastic Net" by H. Zou and T. Hastie (2005)

이러한 논문들은 프로젝트에 사용된 기술에 대한 이론적 기반과 정당성을 제공합니다.



## 사용 방법

학습된 모델을 사용하여 상품 추천을 수행하려면 다음 단계를 따르세요:

1. `requirements.txt`에 나열된 필요한 종속성을 설치합니다.
2. 제공된 pickle 파일을 사용하여 학습된 모델, 벡터라이저, 레이블 인코더를 로드합니다.
3. `preprocess_text` 함수를 사용하여 사용자 질의를 전처리합니다.
4. 로드된 벡터라이저를 사용하여 전처리된 질의를 특성 벡터로 변환합니다.
5. 로드된 모델을 사용하여 상품 카테고리를 예측합니다.
6. 로드된 레이블 인코더를 사용하여 예측된 레이블을 디코딩합니다.


# 백 엔드

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

## 향후 계획

프로젝트의 잠재적인 개선 및 확장 사항은 다음과 같습니다:

- 개인화된 추천을 위해 사용자 프로필과 구매 내역 통합
- 텍스트 분류를 위한 합성곱 신경망(CNN) 또는 순환 신경망(RNN)과 같은 심층 학습 기술 탐구
- 상호작용적인 상품 추천을 위한 사용자 인터페이스 구현
- 실제 시나리오에서 추천 시스템의 효과를 평가하기 위한 A/B 테스트 수행


# 참고 사이트

로지스틱 회귀 모델: https://ko.wikipedia.org/wiki/%EB%A1%9C%EC%A7%80%EC%8A%A4%ED%8B%B1_%ED%9A%8C%EA%B7%80

TF-IDF 벡터화:https://ko.wikipedia.org/wiki/Tf-idf

데이터셋 출처: https://search.shopping.naver.com/search/all?query={}
