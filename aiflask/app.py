from flask import Flask, request, jsonify
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import MultiLabelBinarizer
import re
from konlpy.tag import Okt, Kkma
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def preprocess_text(text):
    # 특수 문자 제거
    text = re.sub(r'[^가-힣a-zA-Z0-9\s]', '', text)
    # 불용어 제거
    stopwords = ['은', '는', '이', '가', '을', '를', '의', '에', '에서', '부터', '까지', '이다', '입니다']
    text = ' '.join([word for word in text.split() if word not in stopwords])
    return text

def tokenize(text):
    okt = Okt()
    kkma = Kkma()
    okt_tokens = okt.morphs(text)
    kkma_tokens = kkma.morphs(text)
    return okt_tokens + kkma_tokens

# 모델, 벡터라이저, 멀티 레이블 바이너리 인코더 로드
with open('best_classifier.pkl', 'rb') as f:
    classifier = pickle.load(f)

with open('vectorizer.pkl', 'rb') as f:
    vectorizer = pickle.load(f)

with open('mlb.pkl', 'rb') as f:
    mlb = pickle.load(f)

def predict(text, top_n=3):
    # 예측 함수 구현
    cleaned_text = preprocess_text(text)
    X = vectorizer.transform([cleaned_text])
    predicted_probabilities = classifier.predict_proba(X)[0]
    top_indices = predicted_probabilities.argsort()[-top_n:][::-1]
    top_labels = mlb.classes_[top_indices]
    top_probabilities = predicted_probabilities[top_indices]
    return list(zip(top_labels, top_probabilities))

# API 엔드포인트
@app.route('/predict', methods=['POST'])
def predict_endpoint():
    data = request.get_json()
    text = data['text']
    predicted_labels = predict(text)
    predicted_product_name = predicted_labels[0][0]
    response = {
        'predictedProductName': predicted_product_name
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)