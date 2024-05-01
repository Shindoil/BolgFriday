# Blogfriday
- Blogfriday는 AI 챗봇과 블로그형 쇼핑몰 웹사이트를 결합한 프로젝트입니다. 사용자는 챗봇과 대화를 통해 원하는 상품을 검색하고, 관련 상품 정보를 확인할 수 있습니다. 또한, 블로그형 쇼핑몰 기능을 통해 상품을 구매하고 결제할 수 있습니다.

# 주요 기능
- AI 챗봇을 통한 상품 검색 및 추천
- 블로그형 쇼핑몰 기능 (상품 목록, 상세 정보, 장바구니, 결제 등)
- 사용자 인증 및 권한 관리
- 판매자 기능 (상품 등록, 관리)
- 구매자 기능 (상품 구매, 구매 내역 확인)

# 사용 기술 및 라이브러리
## 백엔드
- Python
- Flask 웹 프레임워크
- scikit-learn (머신러닝 라이브러리)
- konlpy (한국어 형태소 분석 라이브러리)
- pickle (모델 저장 및 로드)

## 프런트엔드
- React
- React Router
- Axios
- Redux
- Bootstrap

## 데이터베이스
- MySQL

# 프로젝트 구조
## 프론트 엔드
- app.py: Flask 백엔드 애플리케이션 파일
- App.js: React 프런트엔드 애플리케이션 파일
- components/: React 컴포넌트 디렉토리
-- chat/: 챗봇 관련 컴포넌트
-- product/: 상품 관련 컴포넌트
-- search/: 검색 관련 컴포넌트
-- pay/: 결제 관련 컴포넌트
-- user/: 사용자 관련 컴포넌트
-- models/: 머신러닝 모델 파일
-- routes/: Flask 라우트 및 API 엔드포인트 파일
-- static/: 정적 파일 (CSS, 이미지 등)
-- templates/: Flask 템플릿 파일

# 설치 및 실행 방법
- 프로젝트 저장소를 클론합니다:
-- git clone https://github.com/your-username/blogfriday.git
- 프로젝트 디렉토리로 이동합니다:
-- cd blogfriday
- 필요한 종속성을 설치합니다:
-- pip install -r requirements.txt
- npm install
- 데이터베이스를 설정하고 필요한 테이블을 생성합니다.
- Flask 백엔드 서버를 실행합니다:
-- python app.py
- React 프런트엔드 개발 서버를 실행합니다:
-- npm start

- 웹 브라우저에서 http://localhost:3000으로 접속하여 애플리케이션을 사용합니다.

# 기여자
- 김규연 : 채팅, 상품관리
- 신도일 : 자연어 처리, 결제관리
- 김은주 : 로그인, 회원관리 
