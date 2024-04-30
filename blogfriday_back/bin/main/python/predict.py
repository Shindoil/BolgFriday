#-*- coding: utf-8 -*-

import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import MultiLabelBinarizer
import re
from konlpy.tag import Okt

# 모델, 벡터라이저, 멀티 레이블 바이너리 인코더 로드
classifier = joblib.load('src/main/resources/python/logistic_model_multilabel.joblib')
vectorizer = joblib.load('src/main/resources/python/vectorizer_multilabel.joblib')
mlb = joblib.load('src/main/resources/python/mlb.joblib')

def clean_text(text):
    # 한글, 영문, 숫자를 제외한 모든 문자 제거
    text = re.sub(r'[^가-힣a-zA-Z0-9\s]', '', text)
    # 영문 소문자 변환
    text = text.lower()
    # 띄어쓰기 교정
    text = ' '.join(text.split())
    return text

def tokenize(text):
    okt = Okt()
    # 텍스트 클린징
    cleaned_text = clean_text(text)
    # 형태소 분석 및 불용어 제거
    tokens_pos = okt.pos(cleaned_text)
    # 필요한 품사의 단어만 추출 (명사, 형용사, 동사)
    tokens = [word for word, pos in tokens_pos if pos in ['Noun', 'Adjective', 'Verb']]
    # 불용어 처리
    stopwords = ['하다', '되다', '이', '있다', '것', '들', '그', '되다', '수', '이다', '보다', '않다', '없다', '나다', '사람', '주다', '등', '같다', '우리', '때', '년', '가다', '한다', '지다', '오다', '말', '일']
    filtered_tokens = [token for token in tokens if token not in stopwords]
    return filtered_tokens

def predict(text, top_n=3):
    # 예측 함수 구현
    cleaned_text = clean_text(text)
    X = vectorizer.transform([cleaned_text])
    predicted_probabilities = classifier.predict_proba(X)[0]
    top_indices = predicted_probabilities.argsort()[-top_n:][::-1]
    top_labels = mlb.classes_[top_indices]
    top_probabilities = predicted_probabilities[top_indices]
    return list(zip(top_labels, top_probabilities))