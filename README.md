# Blogfriday

Blogfriday는 AI 챗봇과 블로그형 쇼핑몰 웹사이트를 결합한 프로젝트입니다. 사용자는 챗봇과 대화를 통해 원하는 상품을 검색하고, 관련 상품 정보를 확인할 수 있습니다. 또한, 블로그형 쇼핑몰 기능을 통해 상품을 구매하고 결제할 수 있습니다.

## 주요 기능
- AI 챗봇을 통한 상품 검색 및 추천
- 블로그형 쇼핑몰 기능 (상품 목록, 상세 정보, 장바구니, 결제 등)
- 사용자 인증 및 권한 관리
- 판매자 기능 (상품 등록, 관리)
- 구매자 기능 (상품 구매, 구매 내역 확인)

## 사용 기술 및 라이브러리
### 백엔드
- Java
- Spring Boot 프레임워크
- My-batis (데이터베이스 연동)
- Python (AI 모델 및 예측)
- Flask (Python 백엔드)

### 프런트엔드
- React
- React Router
- Axios (HTTP 통신 라이브러리)
- Redux (상태 관리 라이브러리)
- Bootstrap (CSS 프레임워크)

### AI 및 머신러닝
- scikit-learn (머신러닝 라이브러리)
- konlpy (한국어 형태소 분석 라이브러리)
- pickle (모델 저장 및 로드)

### 데이터베이스
- MySQL

## 프로젝트 구조
- `controller/`: Spring Boot 컨트롤러 클래스
- `service/`: 서비스 클래스
- `repository/`: 리포지토리 클래스
- `mapper/`: MyBatis 매퍼 인터페이스
- `dto/`: DTO (Data Transfer Object) 클래스
- `App.js`: React 프런트엔드 애플리케이션 파일입니다.
- `components/`: React 컴포넌트 디렉토리
 - `chat/`: 챗봇 관련 컴포넌트
 - `product/`: 상품 관련 컴포넌트
 - `search/`: 검색 관련 컴포넌트
 - `pay/`: 결제 관련 컴포넌트
 - `user/`: 사용자 관련 컴포넌트
- `models/`: 머신러닝 모델 파일
- `static/`: 정적 파일 (CSS, 이미지 등)
- `templates/`: Spring Boot 템플릿 파일
- `python/`: Python 스크립트 및 Flask 애플리케이션 파일

## 설치 및 실행 방법
1. 프로젝트 저장소를 클론합니다: git clone https://github.com/your-username/blogfriday.git
2. 프로젝트 디렉토리로 이동합니다: cd blogfriday
3. 필요한 종속성을 설치합니다: Spring Boot 종속성 설치
- mvn install
- React 종속성 설치
- cd frontend
- npm install
4. 데이터베이스를 설정하고 필요한 테이블을 생성합니다.
5. Spring Boot 백엔드 서버를 실행합니다: mvn spring-boot:run
6. Flask 백엔드 서버를 실행합니다:
- cd python
- python app.py
7. React 프런트엔드 개발 서버를 실행합니다:
- cd frontend
- npm start

  8. 웹 브라우저에서 `http://localhost:3000`으로 접속하여 애플리케이션을 사용합니다.

## 기여자
- 신도일 ( NLP, 결제 )
- 김은주 ( 로그인 관련 )
- 김규연 ( 채팅, 상품 )
