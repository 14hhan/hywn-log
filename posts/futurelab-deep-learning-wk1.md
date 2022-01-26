---
title: 미래연구소 딥러닝 입문 스터디 1주차
date: 2022-01-27
preview: "WK1: Introduction to Deep Learning"
---

**미래연구소: https://futurelab.creatorlink.net/**

## 1. Machine Learning
머신러닝, 딥러닝 → AI의 한 분야
머신러닝에 대해서는 다양한 정의가 있으나 종합해보면 아래와 같음
- 기존 방식: 입력 데이터(= x)가 있을 시 handcrafted model(= f)로 데이터를 처리함(= 사람의 생각이 들어간 규칙을 일일이 만들어 주어야 함)
- 머신러닝: 입력 데이터(= x)와 결과값(= y)만 주면 알아서 배우는 방식 → 데이터를 주면 규칙을 찾음

## 2. Deep Learning
- 머신러닝 중에 뉴럴 네트워크를 사용하는 모델이 있음 → 뉴럴 네트워크를 깊게 쌓은 경우 그 성능이 좋았음 → Deep Learning  
- 완전히 새로운 컨셉이 아님 → 7, 80 년대에도 존재했던 기술이었으나 컴퓨팅 파워가 받쳐주지 못해 발전하지 못했음

## 3. Machine Learning의 범주
### Supervised learning - 지도 학습
- x에 대한 y(label)이 있고 이들 간의 관계를 학습
- label이라는 지도자가 존재
- 현재 산업에서 사용하는 90% 이상이 지도 학습
### Unsupervised learning - 비지도 학습
- label이 존재하지 않음
- 내부를 self-supervised learning으로 나누기도 함
### Reinforcement learning - 강화 학습
- 현재의 상태에서 어떤 행동을 취하는 것이 최적인지를 보상에 의해 학습
- 난이도가 매우 높아 성공 사례가 게임과 같은 일부 분야에만 국한
### Transfer learning - 전이 학습
- 하나의 작업을 위해 훈련된 모델을 유사 작업 수행 모델의 시작점으로 활용하는 딥러닝 접근법

#### 참고
사람의 노동(labeling)이 들어가는 것은 한계가 있으므로 Unsupervised learning, Reinforcement learning, Transfer learning과 같은 것들이 점점 더욱 발전하는 추세에 있음

## 4. Supervised Learning
### 특징
1. x, y가 한 쌍이 된 데이터(training data)를 받음
2. 이를 통해 규칙을 학습
3. 학습된 규칙을 통해 unseen x에 대해 y를 잘 예측할 수 있음
### 하위 범주
분류 기준: y의 종류 == class의 종류
- label: y 자체 (성별 예측 예시 - 성별)
- class: y의 종류 (성별 예측 예시 - 남자, 여자)
1. Regression: y의 종류가 continuous - 시험 점수 예측, 기온 예측
2. Binary classification: y의 종류가 2가지 - pass/fail 예측, 인물 사진을 통한 성별 예측
3. Multi-class classification: y의 종류가 discrete - predicting letter grade, 숫자 인식

## 5. 용어
- x == input == feature
- y == label (y의 종류 각각은 class)
- data == sample == (x, y) 한 쌍 == labeled tata == training sample data

## 6. Deep Learning의 특징
### Blackbox 모델
- 내부에서 어떤 일이 일어나는지 알 수 없음
- data를 기반으로 하는 귀납적 추론 → 명확한 연역적인 근거가 없음
- 딥러닝의 단점 중 하나 but 극복하고자 하는 연구들이 많이 일어나고 있음
### Feature Engineering이 필요 없음
- ML이 복잡한 이유 중 하나: feature engineering
- ML은 rule은 알아서 정하지만 data는 사람이 직접 feature를 뽑아줌 → 사람의 주관이 반영된 data 처리
- DL은 사람의 주관적인 data 처리 없이 모델이 알아서 필요 없는 feature 가중치를 줄임

## 7. Deep Learning 발전의 원동력
1. Data
	- 데이터가 점점 많아지고 있음
2. Computation 능력
	- computation 능력을 통해 train(연산) 속도를 향상
	- GPU의 존재
3. Algorithm 발전
	- Neural Net 개념은 오래 전부터 있었으나 알고리즘적 문제로 실제 data에 적용되기 어려웠음

## 8. Regression
- Linear Regression: 데이터를 가장 잘 설명해 주는 선을 찾는 것
### 최적의 함수에 대한 기준
- “data들이 직선을 따를 것이다” 가정(선형 회귀)에서 출발
- 가설 함수(Hypothesis Function): H(x) = Wx + b 
- data를 가장 잘 설명해 주는 W, b를 찾는 것
#### Linear Regression
- H(x_i), y_i 의 차를 줄이기
	- 절댓값, 제곱의 방식이 있는데 미분이 용이한 제곱의 방식 선택
- Loss Function: Loss(x) = (y - y’)^2 = (y - Wx - b)^2 → (Squared Error, SE)
- Loss(x) 값이 가장 작음 → data를 가장 잘 설명함
- Loss Function값의 평균: Cost Function
	- Cost(W, b; (x, y)) = (1/n) * Sigma(k=1 to n) Loss(x_i) (n: data 수) → (Mean Squared Error, MSE)
- 최종 목표: Minimize Cost((x, y)) by W, b 바꿔나가면서
- Cost Function을 전개하면 W^2, b^2에 대한 함수가 될 것 (그래프가 이차함수꼴)
- How to minimize Cost? → Gradient Descent
#### Gradient Descent
- Gradient Descent 진행 방법
	1. x_0라는 첫 점을 랜덤하게 잡음 (→ Cost(x))
	2. x = x_0에서 미분계수 구함
	3. x = x_0 - a * Cost’(x_0) (a: 보통 alpha, Learning Rate)
	4. x = x_1, x_2, …로 다시 2번~3번 반복
- 언제 계산을 그만 두나? 미분값이 0이랑 충분히 가깝거나 Cost가 충분히 작으면

### 주요 내용 정리
- Linear Regression: H(x) = Wx + b에서 data를 가장 잘 설명하는 (W\*, b\*)(→ parameter)를 찾는 것
  - 찾는 과정: Optimization
  - Optimization: Cost(Loss Function의 평균)을 minimize
  - (W\*, b\*)를 찾을 때 사용하는 방법: Gradient Descent
  - Gradient Descent: 미분계수를 이용하여 parameter를 업데이트 하는 것
